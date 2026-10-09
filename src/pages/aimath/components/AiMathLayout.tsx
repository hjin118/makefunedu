import type { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

type AiMathLayoutProps = {
  children: ReactNode;
};

export default function AiMathLayout({ children }: AiMathLayoutProps) {
  return (
    <div className="ai-app">
      <a className="ai-skip-link" href="#main">
        본문으로 건너뛰기
      </a>
      <header className="ai-banner">
        <div className="container ai-banner-inner">
          <Link className="ai-brand" to="/aimath" aria-label="인공지능 수학 처음으로">
            <span className="ai-logo-mark" aria-hidden="true">
              ∑
            </span>
            <span className="ai-wordmark">인공지능 수학</span>
          </Link>
          <nav className="ai-banner-nav" aria-label="인공지능 수학 메뉴">
            <NavLink
              to="/aimath/glossary"
              className={({ isActive }) =>
                `ai-banner-link${isActive ? " active" : ""}`
              }
            >
              용어 사전
            </NavLink>
            <NavLink
              to="/aimath/notebook"
              className={({ isActive }) =>
                `ai-banner-link${isActive ? " active" : ""}`
              }
            >
              오답노트
            </NavLink>
          </nav>
        </div>
      </header>
      {children}
      <footer className="ai-footer">
        <div className="container">
          <Link to="/">← 메이크펀에듀 처음으로</Link>
          <p className="footnote">
            인공지능 수학 서브앱이에요. 모든 체험과 기록은 브라우저 안에서만 저장돼요.
          </p>
        </div>
      </footer>
    </div>
  );
}
