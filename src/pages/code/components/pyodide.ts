// 파이썬 실행 엔진(Pyodide) 로더 — 처음 파이썬 실행 때만 CDN에서 내려받아요.
// 모듈 단일 프라미스로 세션 동안 한 번만 로드하고, 여러 실행은 순서대로 돌려요.

const PYODIDE_VERSION = "0.26.4";
const PYODIDE_BASE = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

type PyProxyLike = {
  destroy: () => void;
};

export type PyodideInstance = {
  runPython: (code: string, options?: { globals?: PyProxyLike }) => unknown;
  runPythonAsync: (code: string, options?: { globals?: PyProxyLike }) => Promise<unknown>;
  toPy: (value: unknown) => PyProxyLike;
  setStdout: (options: { batched: (text: string) => void }) => void;
  setStderr: (options: { batched: (text: string) => void }) => void;
};

declare global {
  interface Window {
    loadPyodide?: (options: { indexURL: string }) => Promise<PyodideInstance>;
  }
}

let loadPromise: Promise<PyodideInstance> | null = null;

function injectPyodideScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[data-penedu-pyodide="1"]',
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("pyodide script failed")));
      return;
    }
    const script = document.createElement("script");
    script.src = `${PYODIDE_BASE}pyodide.js`;
    script.async = true;
    script.dataset.peneduPyodide = "1";
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => {
      script.remove();
      reject(new Error("파이썬 엔진 스크립트를 내려받지 못했어요."));
    });
    document.head.appendChild(script);
  });
}

/** 세션 동안 한 번만 로드되는 파이썬 엔진 프라미스 (모듈 싱글턴). */
export function loadPyodideEngine(): Promise<PyodideInstance> {
  if (loadPromise) {
    return loadPromise;
  }
  loadPromise = (async () => {
    await injectPyodideScript();
    if (!window.loadPyodide) {
      throw new Error("파이썬 엔진을 시작하지 못했어요. 인터넷 연결을 확인해 주세요.");
    }
    return window.loadPyodide({ indexURL: PYODIDE_BASE });
  })();
  loadPromise.catch(() => {
    // 실패하면 다음 실행 때 다시 시도할 수 있게 초기화해요.
    loadPromise = null;
  });
  return loadPromise;
}

let runQueue: Promise<unknown> = Promise.resolve();

/** 파이썬 실행을 한 번에 하나씩만 돌려서 출력이 섞이지 않게 해요. */
export function enqueuePythonRun<T>(task: () => Promise<T>): Promise<T> {
  const next = runQueue.then(task, task);
  runQueue = next.catch(() => undefined);
  return next;
}

/**
 * input()이 꺼내 쓸 입력 줄을 넘길 때는 JSON 문자열을 파이썬 리터럴로 넣어요.
 * (JSON 따옴표 이스케이프는 파이썬에서도 그대로 유효해서 안전해요.)
 * 매 실행마다 py.toPy({})로 깨끗한 네임스페이스를 만들고,
 * input()이 입력 줄을 순서대로 꺼내 쓰도록 아래 코드로 바꿔치기해요.
 */
export const INPUT_SHIM_SOURCE = [
  "import builtins as _penedu_builtins",
  "",
  "def _penedu_input(prompt=\"\"):",
  "    print(prompt, end=\"\")",
  "    if _penedu_lines:",
  "        return _penedu_lines.pop(0)",
  "    raise EOFError(\"입력값이 부족해요. 실행 전에 '입력값' 칸에 한 줄씩 적어 주세요.\")",
  "",
  "_penedu_builtins.input = _penedu_input",
].join("\n");
