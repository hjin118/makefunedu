import { Link } from "react-router-dom";
import { CHARACTERS, UNITS } from "../data/units";
import "./aimath-home.css";

const UNIT_ACCENTS: Record<string, { main: string; soft: string }> = {
  u1: { main: "#4f46e5", soft: "#eef0ff" },
  u2: { main: "#0f766e", soft: "#e3f6f2" },
  u3: { main: "#e11d48", soft: "#ffe8ee" },
  u4: { main: "#b45309", soft: "#fff1dc" },
  u5: { main: "#7c3aed", soft: "#f0e9ff" },
};

const FALLBACK_ACCENT = { main: "#3b5bdb", soft: "#e8edff" };

const FLOW: readonly { step: string; title: string; desc: string }[] = [
  {
    step: "1단계",
    title: "📖 이야기 도입",
    desc: "AI랩에서 벌어진 일에서 수학이 필요한 순간을 찾아요.",
  },
  {
    step: "2단계",
    title: "💡 개념 정리",
    desc: "필요한 개념을 세림이와 한 줄씩 정리해요.",
  },
  {
    step: "3단계",
    title: "🧪 체험 활동",
    desc: "하람이가 만든 도구를 직접 움직여 가며 느껴요.",
  },
  {
    step: "4단계",
    title: "🪜 계단 문제",
    desc: "쉬움·보통·어려움 단계별로 실력을 확인해요.",
  },
];

export default function AimathHomePage() {
  return (
    <main id="main" className="container page" tabIndex={-1}>
      <header className="ai-hero">
        <span className="ai-hero-kicker">고등 진로선택 · 단원별 학습</span>
        <h1>인공지능 수학</h1>
        <p>
          새봄고 AI랩 친구들과 함께 이야기로 시작해서 · 개념을 만나고 · 체험을 만져 보고 · 문제로
          확인하는 인공지능 수학이에요. 어렵게 느껴지는 단원도 한 계단씩 올라가면 돼요.
        </p>
        <Link className="btn btn-primary" to="/aimath/u1">
          처음부터 시작하기 →
        </Link>
      </header>

      <section className="section" aria-labelledby="aimath-units">
        <h2 id="aimath-units">다섯 개의 대단원</h2>
        <div className="ai-unit-grid">
          {UNITS.map((unit) => {
            const accent = UNIT_ACCENTS[unit.id] ?? FALLBACK_ACCENT;
            const cardStyle = {
              borderTopColor: accent.main,
              "--unit-accent": accent.main,
              "--unit-accent-soft": accent.soft,
            } as React.CSSProperties;
            return (
              <Link key={unit.id} className="card card-hover ai-unit-card" to={`/aimath/${unit.id}`} style={cardStyle}>
                <span className="ai-unit-icon" aria-hidden="true" style={{ background: accent.soft }}>
                  {unit.icon}
                </span>
                <span className="ai-unit-roman">{unit.roman}단원</span>
                <span className="ai-unit-name">{unit.title}</span>
                {"short" in unit ? <span className="ai-unit-short">{unit.short}</span> : null}
                <span className="ai-unit-count">레슨 {unit.lessons.length}개</span>
                <span className="ai-unit-go">공부하러 가기 →</span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="section" aria-labelledby="aimath-flow">
        <h2 id="aimath-flow">레슨은 이렇게 흘러가요</h2>
        <p className="page-intro">
          모든 대단원은 네 단계로 이어져요. 처음에는 이야기로 시작해서, 마지막에는 스스로
          문제를 넘어요.
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

      <section className="section" aria-labelledby="aimath-chars">
        <h2 id="aimath-chars">AI랩 친구들을 소개해요</h2>
        <p className="page-intro">
          무대는 '새봄고 AI랩'. 방과 후마다 모여 이야기를 만들고 도구를 만드는 곳이에요.
          네 친구가 레슨 내내 여러분을 안내해요.
        </p>
        <div className="ai-char-grid">
          {CHARACTERS.map((character) => (
            <div key={character.name} className="card ai-char-card">
              <span className="ai-char-avatar" aria-hidden="true">
                {character.emoji}
              </span>
              <div>
                <span className="ai-char-name">
                  {character.name}{" "}
                  <span className="badge">{character.role}</span>
                </span>
              </div>
              <p>{character.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
