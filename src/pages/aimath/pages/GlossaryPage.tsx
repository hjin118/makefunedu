import { UNITS } from "../data/units";
import { GLOSSARY } from "../data/glossary";

export default function GlossaryPage() {
  return (
    <main id="main" className="container page" tabIndex={-1}>
      <header className="page-header">
        <h1>용어 사전</h1>
        <p className="page-intro">
          단원에서 배운 용어를 한 줄로 다시 읽어요. 시험 전에 훑어 보세요.
        </p>
      </header>

      <nav className="ai-glossary-index" aria-label="단원별 바로 가기">
        {UNITS.map((unit) => (
          <a key={unit.id} className="badge" href={`#gl-${unit.id}`}>
            {unit.icon} {unit.roman}. {unit.title}
          </a>
        ))}
      </nav>

      {UNITS.map((unit) => (
        <section key={unit.id} className="section" id={`gl-${unit.id}`}>
          <h2>
            {unit.roman}. {unit.title}
          </h2>
          <div className="grid-3">
            {GLOSSARY[unit.id].map((term) => (
              <div key={term.term} className="card ai-term">
                <h4>{term.term}</h4>
                <span className="ai-term-en">{term.en}</span>
                <p>{term.def}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
