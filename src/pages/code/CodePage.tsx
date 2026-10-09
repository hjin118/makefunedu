import { useState } from "react";
import type { CSSProperties } from "react";
import PageHeader from "../../components/PageHeader";
import Tabs from "../../components/Tabs";
import StepProblem from "../aimath/components/StepProblem";
import { SUBJECTS, getSubject, type CodeUnit } from "./data/units";
import CodeRunner from "./components/CodeRunner";
import type { RunnerLanguage } from "./components/CodeRunner";
import "../aimath/aimath.css";
import "../aimath/pages/aimath-home.css";
import "./code.css";

const SUBJECT_TABS = SUBJECTS.map((subject) => ({ id: subject.id, label: subject.label }));

const PLAYGROUND_STARTERS: Record<RunnerLanguage, string> = {
  python: '# 자유롭게 코딩해 보세요!\nprint("안녕, 파이썬!")',
  js: '// 자유롭게 코딩해 보세요!\nconsole.log("안녕, 자바스크립트!");',
};

// 조사(으/로)가 과목 이름마다 달라서(파이썬으로/자바스크립트로) 문장을 과목별로 적어요.
const PLAYGROUND_INTROS: Record<RunnerLanguage, string> = {
  python:
    "파이썬으로 떠오르는 생각을 바로 적어서 실행해 보세요. 고칠 필요 없이 마음껏 만져 보는 게 제일 빨리 배우는 길이에요.",
  js: "자바스크립트로 떠오르는 생각을 바로 적어서 실행해 보세요. 고칠 필요 없이 마음껏 만져 보는 게 제일 빨리 배우는 길이에요.",
};

const FLOW: readonly { step: string; title: string; desc: string }[] = [
  {
    step: "1단계",
    title: "📖 이야기 도입",
    desc: "코딩이 필요해진 순간을 이야기로 만나요.",
  },
  {
    step: "2단계",
    title: "💻 예제 코드",
    desc: "레슨마다 바로 돌려 볼 수 있는 코드를 확인해요.",
  },
  {
    step: "3단계",
    title: "💡 개념 정리",
    desc: "꼭 알아야 할 말을 한 줄씩 정리해요.",
  },
  {
    step: "4단계",
    title: "🪜 계단 문제",
    desc: "쉬움·보통·어려움 순서로 실력을 확인해요.",
  },
];

function scrollTop() {
  window.scrollTo({ top: 0 });
}

function unitCardStyle(unit: CodeUnit): CSSProperties {
  return {
    borderTopColor: unit.accent.main,
    "--unit-accent": unit.accent.main,
    "--unit-accent-soft": unit.accent.soft,
  } as CSSProperties;
}

function findSubjectOf(unit: CodeUnit) {
  return SUBJECTS.find((subject) => subject.units.some((u) => u.id === unit.id));
}

type CodeUnitListProps = {
  subjectId: string;
  onOpenUnit: (unit: CodeUnit) => void;
};

function CodeUnitList({ subjectId, onOpenUnit }: CodeUnitListProps) {
  const subject = getSubject(subjectId);

  return (
    <>
      <section className="section code-playground" aria-labelledby={`code-playground-${subject.id}`}>
        <h2 id={`code-playground-${subject.id}`}>자유롭게 코딩해 보기</h2>
        <p className="page-intro">{PLAYGROUND_INTROS[subject.id]}</p>
        <CodeRunner
          key={subject.id}
          language={subject.id}
          initialCode={PLAYGROUND_STARTERS[subject.id]}
        />
      </section>

      <section className="section" aria-labelledby="code-units">
        <h2 id="code-units">{subject.label} 단원 목록</h2>
        <p className="page-intro">{subject.intro}</p>
        <div className="code-unit-grid ai-unit-grid">
          {subject.units.map((unit) => (
            <button
              key={unit.id}
              type="button"
              className="card card-hover ai-unit-card"
              style={unitCardStyle(unit)}
              onClick={() => onOpenUnit(unit)}
            >
              <span className="ai-unit-icon" aria-hidden="true" style={{ background: unit.accent.soft }}>
                {unit.icon}
              </span>
              <span className="ai-unit-roman">{unit.roman}단원</span>
              <span className="ai-unit-name">{unit.title}</span>
              <span className="ai-unit-short">{unit.short}</span>
              <span className="ai-unit-count">
                레슨 {unit.lessons.length}개 · 문제 {unit.problems.length}개
              </span>
              <span className="ai-unit-go">공부하러 가기 →</span>
            </button>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="code-flow">
        <h2 id="code-flow">단원은 이렇게 흘러가요</h2>
        <p className="page-intro">
          모든 단원은 네 단계로 이어져요. 이야기로 시작해서, 코드를 읽고, 개념을 정리하고, 문제로
          확인해요.
        </p>
        <div className="ai-flow-grid">
          {FLOW.map((item) => (
            <div key={item.step} className="card ai-flow-card">
              <span className="ai-flow-step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

type CodeUnitDetailProps = {
  unit: CodeUnit;
  unitTitle: string;
  onBack: () => void;
  onMoveUnit: (unit: CodeUnit) => void;
};

function CodeUnitDetail({ unit, unitTitle, onBack, onMoveUnit }: CodeUnitDetailProps) {
  const subject = findSubjectOf(unit);
  const language: RunnerLanguage = subject ? subject.id : "js";
  const index = subject ? subject.units.findIndex((u) => u.id === unit.id) : -1;
  const prev = subject && index > 0 ? subject.units[index - 1] : null;
  const next = subject && index >= 0 && index < subject.units.length - 1 ? subject.units[index + 1] : null;

  return (
    <>
      <div className="code-topbar">
        <button type="button" className="btn btn-small" onClick={onBack}>
          ← 단원 목록으로
        </button>
      </div>

      <header className="page-header" id={`${unit.id}-top`}>
        <div className="ai-unit-title">
          <span className="ai-unit-emoji" aria-hidden="true">
            {unit.icon}
          </span>
          <div>
            <span className="tag">{unit.roman}단원</span>
            <h1>{unit.title}</h1>
          </div>
        </div>
        {unit.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 12)} className="page-intro">
            {paragraph}
          </p>
        ))}
        <div className="ai-story">
          <strong className="ai-story-label">📖 오늘의 이야기</strong>
          <p>{unit.story}</p>
        </div>
      </header>

      <section className="section" aria-labelledby={`${unit.id}-lessons`}>
        <h2 id={`${unit.id}-lessons`}>레슨 목록</h2>
        <div className="ai-lesson-list">
          {unit.lessons.map((lesson, i) => (
            <div key={lesson.title} className="card ai-lesson">
              <span className="ai-lesson-no" aria-hidden="true">
                {i + 1}
              </span>
              <div className="ai-lesson-body">
                <h4>{lesson.title}</h4>
                <p>{lesson.desc}</p>
              </div>
              <a className="ai-lesson-link" href={`#${unit.id}-code-${i}`}>
                예제 코드 보기 →
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id={`${unit.id}-code`} aria-labelledby={`${unit.id}-code-h`}>
        <h2 id={`${unit.id}-code-h`}>예제 코드</h2>
        <p className="page-intro">
          바로 돌려 볼 수 있는 코드예요. 타이핑해서 실행해 보면 훨씬 빨리 익혀요.
        </p>
        <div className="code-example-list">
          {unit.lessons.map((lesson, i) => (
            <article key={lesson.title} className="card code-example" id={`${unit.id}-code-${i}`}>
              <div className="code-example-head">
                <h3>
                  <span className="ai-lesson-no" aria-hidden="true">
                    {i + 1}
                  </span>
                  {lesson.title}
                </h3>
              </div>
              <p className="code-example-desc">{lesson.desc}</p>
              <pre className="code-block" tabIndex={0}>
                <code>{lesson.code}</code>
              </pre>
              <CodeRunner language={language} initialCode={lesson.code} />
              <p className="code-result">
                <strong>▶ 실행 결과</strong> {lesson.result}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id={`${unit.id}-concepts`} aria-labelledby={`${unit.id}-concepts-h`}>
        <h2 id={`${unit.id}-concepts-h`}>개념 정리</h2>
        <p className="page-intro">
          세림이가 정리해 둔 핵심 개념이에요. 시험 전에 한 번 훑어 보세요.
        </p>
        <div className="grid-3">
          {unit.concepts.map((concept) => (
            <div key={concept.term} className="ai-def card">
              <h4>{concept.term}</h4>
              <span className="ai-def-en">{concept.en}</span>
              <p>{concept.def}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" id={`${unit.id}-problems`} aria-labelledby={`${unit.id}-problems-h`}>
        <h2 id={`${unit.id}-problems-h`}>계단 문제</h2>
        <p className="page-intro">
          쉬움 → 보통 → 어려움, 계단처럼 한 칸씩 올라가요. 틀리면 힌트를 드릴게요.
        </p>
        <div className="grid-2">
          {unit.problems.map((problem) => (
            <StepProblem key={problem.title} unitId={unit.id} unitTitle={unitTitle} problem={problem} />
          ))}
        </div>
      </section>

      <nav className="ai-unit-nav" aria-label="단원 이동">
        {prev ? (
          <button type="button" className="btn btn-small" onClick={() => onMoveUnit(prev)}>
            ← {prev.roman}. {prev.title}
          </button>
        ) : (
          <span />
        )}
        {next ? (
          <button type="button" className="btn btn-small" onClick={() => onMoveUnit(next)}>
            {next.roman}. {next.title} →
          </button>
        ) : (
          <span />
        )}
      </nav>
    </>
  );
}

export default function CodePage() {
  const [subjectId, setSubjectId] = useState<string>(SUBJECTS[0].id);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const subject = getSubject(subjectId);
  const selectedUnit = selectedId ? (subject.units.find((u) => u.id === selectedId) ?? null) : null;

  function handleSubjectChange(id: string) {
    const found = SUBJECTS.find((s) => s.id === id);
    if (!found) {
      return;
    }
    setSubjectId(found.id);
    setSelectedId(null);
    scrollTop();
  }

  function openUnit(unit: CodeUnit) {
    setSelectedId(unit.id);
    scrollTop();
  }

  function backToList() {
    setSelectedId(null);
    scrollTop();
  }

  return (
    <main id="main" className="container page" tabIndex={-1}>
      <PageHeader
        title="코딩 단원"
        intro="파이썬과 자바스크립트 기초를 이야기 · 예제 코드 · 개념 · 계단 문제로 배워요. 과목을 고르고 단원을 열어 보세요."
      />

      <Tabs
        tabs={SUBJECT_TABS}
        active={subjectId}
        onChange={handleSubjectChange}
        ariaLabel="코딩 과목"
      />

      <div role="tabpanel" id={`panel-${subjectId}`} aria-labelledby={`tab-${subjectId}`}>
        {selectedUnit ? (
          <CodeUnitDetail
            unit={selectedUnit}
            unitTitle={`${subject.label} ${selectedUnit.roman}. ${selectedUnit.title}`}
            onBack={backToList}
            onMoveUnit={openUnit}
          />
        ) : (
          <CodeUnitList subjectId={subjectId} onOpenUnit={openUnit} />
        )}
      </div>
    </main>
  );
}
