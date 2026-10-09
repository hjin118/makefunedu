import { useState } from "react";
import type { Problem } from "../data/units";
import { addNotebookEntry, findNotebookDuplicate } from "../lib/notebook";

type StepProblemProps = {
  unitId: string;
  unitTitle: string;
  problem: Problem;
};

type Status = "idle" | "correct" | "wrong";

function correctAnswerText(problem: Problem): string {
  if (problem.kind === "choice") {
    return problem.choices[problem.answerIndex];
  }
  return `${problem.answer}${problem.unitLabel ?? ""}`;
}

export default function StepProblem({ unitId, unitTitle, problem }: StepProblemProps) {
  const [choice, setChoice] = useState<number | null>(null);
  const [answerText, setAnswerText] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [noteMessage, setNoteMessage] = useState("");

  const canCheck =
    problem.kind === "choice" ? choice !== null : answerText.trim() !== "";
  const solved = status === "correct";

  function resetStatus() {
    setStatus("idle");
    setNoteMessage("");
  }

  function handleCheck() {
    let correct = false;
    let myAnswer = "";

    if (problem.kind === "choice") {
      if (choice === null) {
        return;
      }
      correct = choice === problem.answerIndex;
      myAnswer = problem.choices[choice];
    } else {
      const trimmed = answerText.trim();
      if (trimmed === "") {
        return;
      }
      const parsed = Number(trimmed.replace(",", "."));
      if (!Number.isFinite(parsed)) {
        return;
      }
      correct = Math.abs(parsed - problem.answer) <= (problem.tolerance ?? 0.01);
      myAnswer = `${trimmed}${problem.unitLabel ?? ""}`;
    }

    if (correct) {
      setStatus("correct");
      setNoteMessage("");
      return;
    }

    setStatus("wrong");
    const record = {
      unitId,
      unitTitle,
      problemTitle: problem.title,
      myAnswer,
      correctAnswer: correctAnswerText(problem),
    };
    if (findNotebookDuplicate(record)) {
      setNoteMessage("이 답은 이미 오답노트에 있어요.");
    } else {
      addNotebookEntry(record);
      setNoteMessage("오답노트에 기록했어요.");
    }
  }

  return (
    <article className="card ai-problem">
      <div className="ai-problem-head">
        <span className="badge">{problem.level}</span>
        <h3>{problem.title}</h3>
      </div>
      <p className="ai-problem-q">{problem.question}</p>

      {problem.kind === "choice" ? (
        <div className="ai-choices" role="group" aria-label="선택지">
          {problem.choices.map((c, i) => {
            const classes = ["ai-choice"];
            if (choice === i) {
              classes.push("selected");
            }
            if (solved && i === problem.answerIndex) {
              classes.push("correct");
            }
            return (
              <button
                key={c}
                type="button"
                className={classes.join(" ")}
                onClick={() => {
                  setChoice(i);
                  resetStatus();
                }}
                disabled={solved}
              >
                {c}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="ai-number-row">
          <input
            type="text"
            inputMode="decimal"
            value={answerText}
            onChange={(e) => {
              setAnswerText(e.target.value);
              resetStatus();
            }}
            disabled={solved}
            placeholder="답을 숫자로 적어요"
            aria-label={`${problem.title} 답 입력`}
          />
          {problem.unitLabel ? (
            <span className="ai-unit-label">{problem.unitLabel}</span>
          ) : null}
        </div>
      )}

      <div className="ai-problem-actions">
        <button
          type="button"
          className="btn btn-primary btn-small"
          onClick={handleCheck}
          disabled={!canCheck || solved}
        >
          정답 확인
        </button>
      </div>

      <div aria-live="polite">
        {solved ? (
          <div className="ai-feedback ai-feedback-correct">
            <p>
              <strong>정답이에요! 잘했어요.</strong>
            </p>
            <p>{problem.explanation}</p>
          </div>
        ) : null}
        {status === "wrong" ? (
          <div className="ai-feedback ai-feedback-wrong">
            <p>
              <strong>아쉬워요. 힌트를 드릴게요.</strong>
            </p>
            <p>{problem.hint}</p>
            <p className="ai-note-msg">✍ {noteMessage}</p>
          </div>
        ) : null}
      </div>
    </article>
  );
}
