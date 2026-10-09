import { useCallback, useEffect, useRef, useState } from "react";
import type { KeyboardEvent, UIEvent } from "react";
import {
  enqueuePythonRun,
  INPUT_SHIM_SOURCE,
  loadPyodideEngine,
} from "./pyodide";
import type { PyodideInstance } from "./pyodide";

export type RunnerLanguage = "python" | "js";

type CodeRunnerProps = {
  language: RunnerLanguage;
  initialCode: string;
};

type OutputLine = {
  id: number;
  kind: "log" | "error";
  text: string;
};

type RunStatus = "idle" | "loading" | "running" | "done" | "timeout" | "error";

type IframeMessage = {
  source?: string;
  runId?: number;
  kind?: "log" | "warn" | "error" | "done";
  text?: string;
};

const RUN_TIMEOUT_MS = 10_000;
const MESSAGE_SOURCE = "penedu-code-runner";

let outputIdCounter = 0;

function nextOutputId(): number {
  outputIdCounter += 1;
  return outputIdCounter;
}

/**
 * 사용자 코드를 iframe <script> 안에 실행 가능한 형태로 그대로 넣어요.
 * `</script` 시퀀스만 `<\/script`로 치환해 HTML 파서가 스크립트를 조기 종료하지 않게 해요.
 * (JS 문자열·템플릿 리터럴·정규식에서 `\/`는 `/`와 같아서 코드 의미는 그대로예요.)
 */
function toEmbeddedScript(code: string): string {
  return code.replace(/<\/script/gi, "<\\/script");
}

function buildJsDocument(code: string, runId: number): string {
  const bootstrap = `
(function () {
  var RUN_ID = ${runId};
  function send(kind, text) {
    try {
      parent.postMessage({ source: "${MESSAGE_SOURCE}", runId: RUN_ID, kind: kind, text: text }, "*");
    } catch (e) {}
  }
  ["log", "info", "debug"].forEach(function (name) {
    var original = console[name];
    console[name] = function () {
      var parts = Array.prototype.map.call(arguments, function (value) {
        if (typeof value === "string") return value;
        try { return JSON.stringify(value); } catch (e) { return String(value); }
      });
      send("log", parts.join(" "));
      if (original) original.apply(console, arguments);
    };
  });
  ["warn", "error"].forEach(function (name) {
    var original = console[name];
    console[name] = function () {
      var parts = Array.prototype.map.call(arguments, function (value) {
        if (typeof value === "string") return value;
        try { return JSON.stringify(value); } catch (e) { return String(value); }
      });
      send(name, parts.join(" "));
      if (original) original.apply(console, arguments);
    };
  });
  window.onerror = function (message, source, line, column, error) {
    send("error", error && error.stack ? error.stack : message + " (" + (line || 0) + ":" + (column || 0) + ")");
    return true;
  };
  window.addEventListener("unhandledrejection", function (event) {
    var reason = event.reason;
    send("error", reason && reason.stack ? reason.stack : String(reason));
  });
})();
`;
  return [
    "<!doctype html><html><head><meta charset=\"utf-8\" />",
    "<style>html,body{margin:0;padding:0;background:#ffffff;}</style>",
    "</head><body>",
    "<div id=\"app\"></div>",
    "<script>" + bootstrap + "</script>",
    "<script>" + toEmbeddedScript(code) + "</script>",
    "<script>parent.postMessage({ source: \"" + MESSAGE_SOURCE + "\", runId: " + runId + ", kind: \"done\" }, '*');</script>",
    "</body></html>",
  ].join("");
}

export default function CodeRunner({ language, initialCode }: CodeRunnerProps) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState(initialCode);
  const [inputs, setInputs] = useState("");
  const [output, setOutput] = useState<OutputLine[]>([]);
  const [status, setStatus] = useState<RunStatus>("idle");
  const [runSpec, setRunSpec] = useState<{ runId: number; srcdoc: string } | null>(null);

  const gutterRef = useRef<HTMLDivElement | null>(null);
  const lineCount = code.split("\n").length;

  const appendOutput = useCallback((kind: OutputLine["kind"], text: string) => {
    setOutput((prev) => [...prev, { id: nextOutputId(), kind, text }]);
  }, []);

  const clearOutput = useCallback(() => {
    setOutput([]);
  }, []);

  const toggleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  // ---- 자바스크립트 실행: iframe 메시지 수신 + 시간 초과 감시 ----
  useEffect(() => {
    if (!runSpec) {
      return undefined;
    }
    const runId = runSpec.runId;

    function handleMessage(event: MessageEvent) {
      const data = event.data as IframeMessage | null;
      if (!data || data.source !== MESSAGE_SOURCE || data.runId !== runId) {
        return;
      }
      if (data.kind === "log") {
        appendOutput("log", data.text ?? "");
        return;
      }
      if (data.kind === "warn" || data.kind === "error") {
        appendOutput("error", data.text ?? "");
        return;
      }
      if (data.kind === "done") {
        setStatus((prev) => (prev === "running" ? "done" : prev));
      }
    }

    window.addEventListener("message", handleMessage);
    const timer = window.setTimeout(() => {
      setStatus((prev) => {
        if (prev !== "running") {
          return prev;
        }
        appendOutput("error", "실행 시간이 초과됐어요. 무한 반복이 없는지 코드를 확인해 보세요.");
        return "timeout";
      });
    }, RUN_TIMEOUT_MS);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.clearTimeout(timer);
    };
  }, [runSpec, appendOutput]);

  // 시간 초과가 나면 iframe을 내려서 계속 도는 코드를 멈춰요.
  useEffect(() => {
    if (status === "timeout") {
      setRunSpec(null);
    }
  }, [status]);

  function runJavaScript() {
    clearOutput();
    setStatus("running");
    const runId = nextOutputId();
    setRunSpec({ runId, srcdoc: buildJsDocument(code, runId) });
  }

  async function runPython() {
    clearOutput();
    setStatus("loading");
    await enqueuePythonRun(async () => {
      let pyodide: PyodideInstance | null = null;
      let namespace: { destroy: () => void } | null = null;
      try {
        pyodide = await loadPyodideEngine();
        setStatus("running");
        namespace = pyodide.toPy({});
        const inputLines = inputs.split("\n").filter((line) => line.length > 0);
        const setup = `_penedu_lines = ${JSON.stringify(inputLines)}\n${INPUT_SHIM_SOURCE}`;
        pyodide.setStdout({ batched: (text) => appendOutput("log", text) });
        pyodide.setStderr({ batched: (text) => appendOutput("error", text) });
        pyodide.runPython(setup, { globals: namespace });
        await pyodide.runPythonAsync(code, { globals: namespace });
        setStatus("done");
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        appendOutput("error", message);
        setStatus("error");
      } finally {
        if (namespace) {
          namespace.destroy();
        }
        pyodide?.setStdout({ batched: () => undefined });
        pyodide?.setStderr({ batched: () => undefined });
      }
    });
  }

  function handleRun() {
    if (status === "loading" || status === "running") {
      return;
    }
    if (language === "js") {
      runJavaScript();
    } else {
      void runPython();
    }
  }

  function handleEditorKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key !== "Tab") {
      return;
    }
    event.preventDefault();
    const textarea = event.currentTarget;
    const { selectionStart, selectionEnd, value } = textarea;
    const nextValue = `${value.slice(0, selectionStart)}  ${value.slice(selectionEnd)}`;
    setCode(nextValue);
    requestAnimationFrame(() => {
      textarea.selectionStart = selectionStart + 2;
      textarea.selectionEnd = selectionStart + 2;
    });
  }

  function handleEditorScroll(event: UIEvent<HTMLTextAreaElement>) {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = event.currentTarget.scrollTop;
    }
  }

  const busy = status === "loading" || status === "running";
  const showInputs = language === "python";
  const statusLabel =
    status === "loading"
      ? "파이썬 엔진을 준비하고 있어요… 처음엔 조금 걸려요"
      : status === "running"
        ? "실행 중…"
        : null;
  const hasOutput = output.length > 0;

  return (
    <div className={`code-runner${open ? " is-open" : ""}`}>
      <button type="button" className="code-runner-toggle" onClick={toggleOpen} aria-expanded={open}>
        {open ? "▲ 실행기 접기" : "▶ 실행해 보기"}
      </button>

      {open && (
        <div className="code-runner-body">
          <div className="code-runner-editor">
            <div className="code-runner-gutter" ref={gutterRef} aria-hidden="true">
              {Array.from({ length: lineCount }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <textarea
              className="code-runner-textarea"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              onKeyDown={handleEditorKeyDown}
              onScroll={handleEditorScroll}
              spellCheck={false}
              rows={Math.min(Math.max(lineCount, 4), 18)}
              aria-label="코드 편집기"
            />
          </div>
          <div className="code-runner-meta">
            <span>{lineCount}줄</span>
            <span>{language === "python" ? "Python" : "JavaScript"}</span>
          </div>

          {showInputs && (
            <label className="code-runner-inputs">
              <span className="code-runner-label">입력값 (input()용 · 한 줄에 하나씩)</span>
              <textarea
                className="code-runner-inputs-area"
                value={inputs}
                onChange={(event) => setInputs(event.target.value)}
                rows={2}
                placeholder="예) 이름, 나이처럼 input()에 들어갈 값을 순서대로 적어요."
                spellCheck={false}
              />
            </label>
          )}

          <div className="code-runner-actions">
            <button type="button" className="code-runner-run" onClick={handleRun} disabled={busy}>
              {busy ? "실행 중…" : "▶ 실행"}
            </button>
            <button type="button" className="code-runner-clear" onClick={clearOutput}>
              지우기
            </button>
          </div>

          {statusLabel && <p className="code-runner-status">{statusLabel}</p>}
          {status === "timeout" && (
            <p className="code-runner-status is-warn">실행 시간이 초과됐어요. 무한 반복이 없는지 확인해 보세요.</p>
          )}

          {runSpec && (
            <iframe
              key={runSpec.runId}
              className="code-runner-frame"
              title="자바스크립트 실행 환경"
              sandbox="allow-scripts"
              srcDoc={runSpec.srcdoc}
              aria-hidden="true"
              tabIndex={-1}
            />
          )}

          <div className="code-runner-output" aria-live="polite">
            <div className="code-runner-output-head">
              <strong>{hasOutput && output.some((line) => line.kind === "error") ? "오류" : "실행 결과"}</strong>
            </div>
            {hasOutput ? (
              <pre className="code-runner-output-body">
                {output.map((line) => (
                  <span key={line.id} className={line.kind === "error" ? "is-error" : "is-log"}>
                    {line.text}
                    {"\n"}
                  </span>
                ))}
              </pre>
            ) : (
              <p className="code-runner-output-empty">(아직 출력이 없어요. 실행을 눌러 보세요.)</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
