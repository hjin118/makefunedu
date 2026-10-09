import { Link, useParams } from "react-router-dom";
import { UNITS, getUnit } from "../data/units";
import StepProblem from "../components/StepProblem";
import UnitSimulation from "../components/UnitSimulation";

export default function UnitPage() {
  const { unitId } = useParams();
  const unit = getUnit(unitId);

  if (!unit) {
    return (
      <main id="main" className="container page" tabIndex={-1}>
        <header className="page-header">
          <h1>단원을 준비 중이에요</h1>
          <p className="page-intro">
            지금은 다섯 개 대단원(Ⅰ~Ⅴ)까지만 열려 있어요. 목록에서 단원을 골라 주세요.
          </p>
        </header>
        <Link className="btn" to="/aimath">
          대단원 목록으로 →
        </Link>
      </main>
    );
  }

  const index = UNITS.findIndex((u) => u.id === unit.id);
  const prev = index > 0 ? UNITS[index - 1] : null;
  const next = index < UNITS.length - 1 ? UNITS[index + 1] : null;

  return (
    <main id="main" className="container page" tabIndex={-1}>
      <header className="page-header" id={`${unit.id}-intro`}>
        <Link className="home-link" to="/aimath">
          ← 인공지능 수학
        </Link>
        <div className="ai-unit-title">
          <span className="ai-unit-emoji" aria-hidden="true">
            {unit.icon}
          </span>
          <div>
            <span className="tag">
              {unit.roman} 대단원
            </span>
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
              <a className="ai-lesson-link" href={`#${unit.id}-${lesson.gotoHash}`}>
                {lesson.gotoLabel} →
              </a>
            </div>
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

      <section className="section" id={`${unit.id}-experience`} aria-labelledby={`${unit.id}-experience-h`}>
        <h2 id={`${unit.id}-experience-h`}>체험 활동</h2>
        <p className="page-intro">
          하람이가 만든 도구로 직접 움직여 보세요. 손으로 해 보면 개념이 남아요.
        </p>
        <UnitSimulation unitId={unit.id} />
      </section>

      <section className="section" id={`${unit.id}-problems`} aria-labelledby={`${unit.id}-problems-h`}>
        <h2 id={`${unit.id}-problems-h`}>계단 문제</h2>
        <p className="page-intro">
          쉬움 → 보통 → 어려움, 계단처럼 한 칸씩 올라가요. 틀리면 자동으로 오답노트에
          기록돼요.{" "}
          <Link to="/aimath/notebook">오답노트 보러 가기 →</Link>
        </p>
        <div className="grid-2">
          {unit.problems.map((problem) => (
            <StepProblem
              key={problem.title}
              unitId={unit.id}
              unitTitle={`${unit.roman}. ${unit.title}`}
              problem={problem}
            />
          ))}
        </div>
      </section>

      <nav className="ai-unit-nav" aria-label="대단원 이동">
        {prev ? (
          <Link className="btn btn-small" to={`/aimath/${prev.id}`}>
            ← {prev.roman}. {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="btn btn-small" to={`/aimath/${next.id}`}>
            {next.roman}. {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </main>
  );
}
