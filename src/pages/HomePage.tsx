import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

type Tile = {
  from: string;
  to: string;
  glyph: ReactNode;
};

type ResourceCard = {
  tag: string;
  title: string;
  short: string;
  long?: string;
  cta: string;
  to?: string;
  href?: string;
  tile: Tile;
};

function Glyph({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function TileIcon({ tile, large }: { tile: Tile; large?: boolean }) {
  return (
    <span
      className={large ? "tile tile-lg" : "tile"}
      style={{ background: `linear-gradient(135deg, ${tile.from}, ${tile.to})` }}
      aria-hidden="true"
    >
      <Glyph>{tile.glyph}</Glyph>
    </span>
  );
}

const FEATURED_TILE: Tile = {
  from: "#60a5fa",
  to: "#3b5bdb",
  glyph: (
    <>
      <path d="M5 21v-6" />
      <path d="M5 9V3" />
      <path d="M12 21v-9" />
      <path d="M12 6V3" />
      <path d="M19 21v-4" />
      <path d="M19 11V3" />
      <path d="M2 15h6" />
      <path d="M9 6h6" />
      <path d="M16 17h6" />
    </>
  ),
};

const RESOURCES: ResourceCard[] = [
  {
    tag: "프롬프트 엔지니어링",
    title: "다시 묻는 AI 교실",
    short:
      "AI의 첫 결과물은 끝이 아니라 출발점. 부탁하고, 확인하고, 바로잡는 연습을 하는 초·중·고 13차시.",
    long: "AI의 첫 결과물은 끝이 아니라 출발점. 부탁하기 → 되말하기 확인 → 점검·검증 → 선택 기록 → 마무리를 직접 연습하는 초·중·고 13차시.",
    cta: "들어가기 →",
    to: "/prompt",
    tile: {
      from: "#34d399",
      to: "#059669",
      glyph: (
        <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 8.5-8.5 8.38 8.38 0 0 1 8.5 8.5z" />
      ),
    },
  },
  {
    tag: "같이 만들기 · 작업지시서",
    title: "학습 사이트 만들기 레퍼런스",
    short:
      "손발전기·시계 읽기·광합성 등 교과별 예시로 AI에게 학습 사이트를 만들어 달라고 해요. 편집해서 복사할 수 있는 작업지시서와 단계별 확인표도 있어요.",
    cta: "안내 보기 →",
    to: "/handgen/",
    tile: {
      from: "#fcd34d",
      to: "#d97706",
      glyph: (
        <>
          <path d="M21 12a9 9 0 1 1-2.6-6.4" />
          <path d="M21 3v6h-6" />
        </>
      ),
    },
  },
  {
    tag: "같이 만들기 · 작업지시서",
    title: "바이브코딩 게임 만들기",
    short:
      "피하기·클릭·퀴즈 중 장르를 고르면 게임 작업지시서가 완성돼요. AI에게 주고 만든 뒤 확인표로 점검해요.",
    cta: "장르 고르러 가기 →",
    to: "/gamegen",
    tile: {
      from: "#2dd4bf",
      to: "#0d9488",
      glyph: (
        <>
          <path d="M6 12h4" />
          <path d="M8 10v4" />
          <path d="M15 13h.01" />
          <path d="M18 11h.01" />
          <path d="M17.32 5H6.68a4 4 0 0 0-3.98 3.6C2.6 9.4 2 14.5 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.4-1.4a2 2 0 0 1 1.4-.6h4.3a2 2 0 0 1 1.4.6L16 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.5-.6-6.6-.7-7.4A4 4 0 0 0 17.32 5z" />
        </>
      ),
    },
  },
  {
    tag: "초·중·고 코딩 기초 · 단원별 학습",
    title: "코딩 단원",
    short:
      "파이썬 4단원과 자바스크립트 3단원을 이야기 · 예제 코드 · 개념 · 계단 문제로 배워요.",
    cta: "코딩 배우러 가기 →",
    to: "/coding",
    tile: {
      from: "#38bdf8",
      to: "#0284c7",
      glyph: (
        <>
          <path d="m8 8-4 4 4 4" />
          <path d="m16 8 4 4-4 4" />
          <path d="m13 5-2 14" />
        </>
      ),
    },
  },
  {
    tag: "정보·과학 융합 · 단원별 학습",
    title: "피지컬 AI (ESP32)",
    short:
      "ESP32 로봇 키트로 IoT를 배워요. 센서·핀맵·MQTT·대시보드까지 중학생 눈높이로 정리했어요.",
    cta: "ESP32 배우러 가기 →",
    to: "/esp32",
    tile: {
      from: "#fb923c",
      to: "#ea580c",
      glyph: (
        <>
          <rect x="5" y="5" width="14" height="14" rx="2" />
          <rect x="10" y="10" width="4" height="4" />
          <path d="M9 2v3" />
          <path d="M15 2v3" />
          <path d="M9 19v3" />
          <path d="M15 19v3" />
          <path d="M2 9h3" />
          <path d="M2 15h3" />
          <path d="M19 9h3" />
          <path d="M19 15h3" />
        </>
      ),
    },
  },
  {
    tag: "정보·과학 융합 · 단원별 학습",
    title: "마이크로비트",
    short:
      "확장보드·MakeCode·센서·허스키렌즈 AI 카메라까지 마이크로비트 수업 자료를 모았어요.",
    cta: "마이크로비트 배우러 가기 →",
    to: "/microbit",
    tile: {
      from: "#f43f5e",
      to: "#be123c",
      glyph: (
        <>
          <rect x="4" y="7" width="16" height="10" rx="2" />
          <path d="M7.5 12h.01" />
          <path d="M12 12h.01" />
          <path d="M16.5 12h.01" />
        </>
      ),
    },
  },
  {
    tag: "고등 진로선택 · 단원별 학습",
    title: "인공지능 수학",
    short:
      "이야기로 시작해서 개념·체험·계단 문제까지. 인공지능 수학 5개 대단원을 새봄고 AI랩 친구들과 함께 공부해요.",
    cta: "공부하러 가기 →",
    to: "/aimath",
    tile: {
      from: "#a78bfa",
      to: "#6d28d9",
      glyph: <path d="M17 5H8l6 7-6 7h9" />,
    },
  },
];

function ResourceCardView({ resource }: { resource: ResourceCard }) {
  return (
    <article className="card card-hover res-card">
      <span className="tag">{resource.tag}</span>
      <div className="res-head">
        <TileIcon tile={resource.tile} />
        <h2>{resource.title}</h2>
      </div>
      {resource.long ? (
        <ExpandableText long={resource.long} short={resource.short} />
      ) : (
        <p className="res-desc">{resource.short}</p>
      )}
      <div className="res-cta">
        {resource.href ? (
          <a className="link-cta" href={resource.href} target="_blank" rel="noopener noreferrer">
            {resource.cta}
          </a>
        ) : (
          <Link className="link-cta" to={resource.to ?? "/"}>
            {resource.cta}
          </Link>
        )}
      </div>
    </article>
  );
}

function ExpandableText({ short, long }: { short: string; long: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <p className="res-desc">{expanded ? long : short}</p>
      <button
        type="button"
        className="more-link"
        aria-expanded={expanded}
        onClick={() => setExpanded((v) => !v)}
      >
        {expanded ? "접기" : "더보기"}
      </button>
    </>
  );
}

export default function HomePage() {
  return (
    <div className="container page">
      <header className="home-header">
        <img
          className="mascot"
          src={`${import.meta.env.BASE_URL}images/hongjin.jpg`}
          alt="메이크펀에듀 운영자 정홍진 캐릭터"
          width={112}
          height={112}
        />
        <div>
          <span className="home-label">메이크펀에듀</span>
          <h1>홍진샘과 함께하는 수업자료</h1>
          <p className="home-subtitle">수업에 바로 쓰는 교육자료를 한곳에 모았어요.</p>
        </div>
      </header>

      <section className="card featured" aria-label="먼저 해 두면 좋아요">
        <TileIcon tile={FEATURED_TILE} large />
        <div className="featured-body">
          <span className="tag">먼저 해 두면 좋아요</span>
          <h2>AI 맞춤 설정</h2>
          <p>
            ChatGPT·Claude·Gemini에 한 번 넣어 두는 설정 글이에요. 모델을 난이도에 맞게 고르게 해서
            토큰을 아껴요.
          </p>
        </div>
        <div className="featured-side">
          <div className="badge-row">
            <span className="badge">ChatGPT</span>
            <span className="badge">Claude</span>
            <span className="badge">Gemini</span>
          </div>
          <Link className="btn btn-primary" to="/setup">
            설정 복사하러 가기 →
          </Link>
        </div>
      </section>

      <section className="resource-grid" aria-label="자료 목록">
        {RESOURCES.map((resource) => (
          <ResourceCardView key={resource.title} resource={resource} />
        ))}
      </section>
    </div>
  );
}
