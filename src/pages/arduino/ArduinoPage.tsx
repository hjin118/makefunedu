import type { ReactNode } from "react";
import PageHeader from "../../components/PageHeader";
import "./arduino.css";
import { UNITS, getSlides, type Slide, type UnitData } from "./data";

/* ---------- 작은 빌딩 블록 ---------- */

function Sec({
  unit,
  children,
}: {
  unit: UnitData;
  children: ReactNode;
}) {
  return (
    <section id={`arduino-${unit.id}`} className="section ar-section">
      <h2>
        <span className="ar-sec-no" aria-hidden="true">
          {unit.no}
        </span>
        {unit.title}
      </h2>
      <p className="page-intro">{unit.desc}</p>
      {children}
    </section>
  );
}

function Note({
  tone,
  title,
  children,
}: {
  tone: "warn" | "info" | "ok";
  title: string;
  children: ReactNode;
}) {
  return (
    <div className={`ar-note is-${tone}`}>
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
}

function SlideBlock({ slide }: { slide: Slide }) {
  return (
    <figure className="ar-slide">
      <figcaption className="ar-slide-cap">
        <span className="ar-slide-badge">슬라이드 {slide.no}</span>
        {slide.title ? <strong>{slide.title}</strong> : null}
      </figcaption>
      {slide.files.map((file, i) => (
        <img
          key={file}
          src={`${import.meta.env.BASE_URL}images/arduino/${file}`}
          alt={`슬라이드 ${slide.no} 원본 이미지${slide.title ? ` — ${slide.title}` : ""} (${i + 1}/${slide.files.length})`}
          loading="lazy"
          decoding="async"
        />
      ))}
      {slide.text.length > 0 ? (
        <div className="ar-slide-text">
          {slide.text.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}
    </figure>
  );
}

function SlideFlow({ slides }: { slides: Slide[] }) {
  return (
    <div className="ar-slide-flow">
      {slides.map((slide) => (
        <SlideBlock key={slide.no} slide={slide} />
      ))}
    </div>
  );
}

/* ---------- 유닛 섹션 ---------- */

function UnitSection({ unit }: { unit: UnitData }) {
  return (
    <Sec unit={unit}>
      <div className="grid-2">
        <div className="card">
          <h3>이번 유닛 목표</h3>
          <p className="ar-unit-desc">{unit.goal}</p>
        </div>
        <div className="card">
          <h3>준비 부품</h3>
          <div className="badge-row ar-parts">
            {unit.parts.map((part) => (
              <span className="badge" key={part}>
                {part}
              </span>
            ))}
          </div>
        </div>
      </div>

      {unit.note ? (
        <Note tone={unit.note.tone} title={unit.note.title}>
          <ul className="check-list">
            {unit.note.lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </Note>
      ) : null}

      <h3>원본 슬라이드 자료</h3>
      <p className="page-intro">
        수업 자료 원본을 순서대로 보여줘요. 사진이 많으니 조금 기다리면 나타나요.
      </p>
      <SlideFlow slides={getSlides(unit.id)} />
    </Sec>
  );
}

/* ---------- 본문 ---------- */

export default function ArduinoPage() {
  return (
    <div className="container page">
      <PageHeader
        title="아두이노(엠블록)"
        intro={
          <>
            아두이노 &lsquo;커피보드&rsquo; 키트를 mblock으로 코딩해요. 초음파 캔디보이, 픽셀아트,
            네오픽셀 응원봉 3개 유닛으로 이루어져 있어요. 중학생 대상 수업 자료예요.
          </>
        }
      />

      <nav className="ar-nav" aria-label="섹션 이동">
        {UNITS.map((unit) => (
          <a key={unit.id} href={`#arduino-${unit.id}`}>
            <span aria-hidden="true">{unit.no}</span> {unit.navLabel}
          </a>
        ))}
      </nav>

      {UNITS.map((unit) => (
        <UnitSection key={unit.id} unit={unit} />
      ))}
    </div>
  );
}
