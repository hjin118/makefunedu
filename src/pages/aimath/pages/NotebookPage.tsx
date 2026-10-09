import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { UNITS } from "../data/units";
import type { UnitId } from "../data/units";
import {
  addNotebookEntry,
  clearNotebook,
  formatSavedAt,
  loadNotebook,
  removeNotebookEntry,
} from "../lib/notebook";
import type { NotebookEntry } from "../lib/notebook";

function byNewest(a: NotebookEntry, b: NotebookEntry): number {
  return b.savedAt.localeCompare(a.savedAt);
}

export default function NotebookPage() {
  const [entries, setEntries] = useState<NotebookEntry[]>(() =>
    loadNotebook().sort(byNewest),
  );

  const [formUnitId, setFormUnitId] = useState<UnitId>("u1");
  const [formProblemTitle, setFormProblemTitle] = useState("");
  const [formMyAnswer, setFormMyAnswer] = useState("");
  const [formCorrectAnswer, setFormCorrectAnswer] = useState("");

  const formUnit = UNITS.find((u) => u.id === formUnitId);

  function handleRemove(id: string) {
    removeNotebookEntry(id);
    setEntries(loadNotebook().sort(byNewest));
  }

  function handleClear() {
    if (window.confirm("오답노트를 모두 비울까요? 되돌릴 수 없어요.")) {
      clearNotebook();
      setEntries([]);
    }
  }

  function handleAdd(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problemTitle = formProblemTitle.trim();
    const myAnswer = formMyAnswer.trim();
    const correctAnswer = formCorrectAnswer.trim();
    if (problemTitle === "" || myAnswer === "" || correctAnswer === "") {
      return;
    }
    const entry = addNotebookEntry({
      unitId: formUnitId,
      unitTitle: formUnit ? `${formUnit.roman}. ${formUnit.title}` : formUnitId,
      problemTitle,
      myAnswer,
      correctAnswer,
    });
    setEntries((prev) => [entry, ...prev].sort(byNewest));
    setFormProblemTitle("");
    setFormMyAnswer("");
    setFormCorrectAnswer("");
  }

  return (
    <main id="main" className="container page" tabIndex={-1}>
      <header className="page-header">
        <h1>오답노트</h1>
        <p className="page-intro">
          계단 문제에서 틀린 답이 자동으로 모여요. 틀린 문제를 다시 보면 실력이 빨리
          늘어요.
        </p>
      </header>

      <section className="section" aria-labelledby="notebook-list-h">
        <div className="ai-note-toolbar">
          <h2 id="notebook-list-h">모아 둔 오답 {entries.length}개</h2>
          {entries.length > 0 ? (
            <button type="button" className="btn btn-small" onClick={handleClear}>
              전체 비우기
            </button>
          ) : null}
        </div>

        {entries.length === 0 ? (
          <div className="card ai-note-empty">
            <p>아직 틀린 문제가 없어요. 계단 문제를 풀어 보세요.</p>
            <p>
              <Link to="/aimath/u1">Ⅰ. 인공지능과 빅데이터 풀러 가기 →</Link>
            </p>
          </div>
        ) : (
          <div className="ai-note-list">
            {entries.map((entry) => (
              <article key={entry.id} className="card ai-note-entry">
                <div className="ai-note-entry-head">
                  <span className="badge">{entry.unitTitle}</span>
                  <h3>{entry.problemTitle}</h3>
                </div>
                <dl className="ai-note-answers">
                  <dt>내가 쓴 답</dt>
                  <dd>{entry.myAnswer}</dd>
                  <dt>정답</dt>
                  <dd>{entry.correctAnswer}</dd>
                </dl>
                <div className="ai-note-meta">
                  <span className="ai-note-time">
                    기록 {formatSavedAt(entry.savedAt)}
                  </span>
                  <button
                    type="button"
                    className="btn btn-small"
                    onClick={() => {
                      handleRemove(entry.id);
                    }}
                  >
                    삭제
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="section" aria-labelledby="notebook-add-h">
        <h2 id="notebook-add-h">직접 기록하기</h2>
        <p className="page-intro">
          밖에서 푼 문제도 직접 적어 둘 수 있어요.
        </p>
        <form className="card ai-note-form" onSubmit={handleAdd}>
          <div className="ai-note-form-row">
            <label htmlFor="nb-unit">대단원</label>
            <select
              id="nb-unit"
              value={formUnitId}
              onChange={(e) => {
                setFormUnitId(e.target.value as UnitId);
              }}
            >
              {UNITS.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.roman}. {unit.title}
                </option>
              ))}
            </select>
          </div>
          <div className="ai-note-form-row">
            <label htmlFor="nb-title">문제 제목</label>
            <input
              id="nb-title"
              type="text"
              value={formProblemTitle}
              onChange={(e) => {
                setFormProblemTitle(e.target.value);
              }}
              placeholder="예: 3V 고르기"
              required
            />
          </div>
          <div className="ai-note-form-row">
            <label htmlFor="nb-mine">내가 쓴 답</label>
            <input
              id="nb-mine"
              type="text"
              value={formMyAnswer}
              onChange={(e) => {
                setFormMyAnswer(e.target.value);
              }}
              placeholder="예: 색상(Color)"
              required
            />
          </div>
          <div className="ai-note-form-row">
            <label htmlFor="nb-correct">정답</label>
            <input
              id="nb-correct"
              type="text"
              value={formCorrectAnswer}
              onChange={(e) => {
                setFormCorrectAnswer(e.target.value);
              }}
              placeholder="예: 규모(Volume)"
              required
            />
          </div>
          <div>
            <button type="submit" className="btn btn-primary btn-small">
              기록하기
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
