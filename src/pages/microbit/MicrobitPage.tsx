import type { ReactNode } from "react";
import PageHeader from "../../components/PageHeader";
import "./microbit.css";
import {
  BOARD_PARTS,
  CODING_STEPS,
  COUNTER_CHALLENGE,
  HUSKY_APPS,
  HUSKY_BUTTONS,
  HUSKY_CONNECT,
  HUSKY_FEATURES,
  HUSKY_INIT_STEPS,
  HUSKY_INTRO_POINTS,
  HUSKY_LED_STATES,
  HUSKY_MB_PRACTICE,
  MUSIC_CHALLENGE,
  OUTPUT_PRACTICES,
  PROJECT_ITEMS,
  ROBOTBIT_FEATURES,
  ROBOTBIT_INTRO,
  SECTION_NAV,
  SENSOR_ITEMS,
  TTS_STEPS,
  getSlides,
  getSlidesByNums,
  type Slide,
} from "./data";

/* ---------- 작은 빌딩 블록 ---------- */

function Sec({
  id,
  no,
  title,
  intro,
  children,
}: {
  id: string;
  no: string;
  title: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <section id={`microbit-${id}`} className="section mb-section">
      <h2>
        <span className="mb-sec-no" aria-hidden="true">
          {no}
        </span>
        {title}
      </h2>
      {intro ? <p className="page-intro">{intro}</p> : null}
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
    <div className={`mb-note is-${tone}`}>
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
}

function SlideBlock({ slide }: { slide: Slide }) {
  const text = slide.text.filter((line) => !/^\d{1,3}$/.test(line.trim()));
  return (
    <figure className="mb-slide">
      <figcaption className="mb-slide-cap">
        <span className="mb-slide-badge">슬라이드 {slide.no}</span>
        {slide.title ? <strong>{slide.title}</strong> : null}
      </figcaption>
      {slide.files.map((file, i) => (
        <img
          key={file}
          src={`${import.meta.env.BASE_URL}images/microbit/${file}`}
          alt={`슬라이드 ${slide.no} 원본 이미지${slide.title ? ` — ${slide.title}` : ""} (${i + 1}/${slide.files.length})`}
          loading="lazy"
          decoding="async"
        />
      ))}
      {text.length > 0 ? (
        <div className="mb-slide-text">
          {text.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}
    </figure>
  );
}

function SlideFlow({ slides }: { slides: Slide[] }) {
  return (
    <div className="mb-slide-flow">
      {slides.map((slide) => (
        <SlideBlock key={slide.no} slide={slide} />
      ))}
    </div>
  );
}

/* ---------- 본문 ---------- */

export default function MicrobitPage() {
  return (
    <div className="container page">
      <PageHeader
        title="마이크로비트"
        intro={
          <>
            마이크로비트와 확장보드 Robotbit V2.0으로 출력 제어, 센서 읽기, 프로젝트, 그리고
            허스키렌즈 AI 카메라까지 배워 봐요. 중학교 정보·과학 수업용이에요.
          </>
        }
      />

      <nav className="mb-nav" aria-label="섹션 이동">
        {SECTION_NAV.map((item) => (
          <a key={item.id} href={`#microbit-${item.id}`}>
            <span aria-hidden="true">{item.no}</span> {item.label}
          </a>
        ))}
      </nav>

      {/* ① 시작하기 */}
      <Sec id="start" no="①" title="시작하기" intro="사용할 마이크로비트와 확장보드를 먼저 만나 봐요.">
        <div className="grid-2">
          <div className="card">
            <h3>마이크로비트</h3>
            <p>
              실습의 두뇌 역할을 하는 코딩 교육용 보드예요. 보드 구조는 수업 시간에 실물과 함께
              자세히 확인해요.
            </p>
          </div>
          <div className="card mb-brain-card">
            <h3>확장보드 — Robotbit V2.0</h3>
            <p>
              확장보드를 꽂으면 모터·서보·네오픽셀 같은 부품을 마이크로비트에 바로 연결할 수
              있어요.
            </p>
          </div>
        </div>

        <h3>Robotbit V2.0이 하는 일</h3>
        <p className="page-intro">{ROBOTBIT_INTRO}</p>

        <div className="grid-2">
          {ROBOTBIT_FEATURES.map((feature) => (
            <article className="card mb-feature" key={feature.no}>
              <span className="mb-feature-no" aria-hidden="true">
                {feature.no}
              </span>
              <h4>{feature.title}</h4>
              <p className="mb-feature-desc">{feature.desc}</p>
            </article>
          ))}
        </div>

        <h3>보드 구성 부품 20개</h3>
        <div className="table-wrap">
          <table className="simple">
            <thead>
              <tr>
                <th>번호</th>
                <th>부품</th>
              </tr>
            </thead>
            <tbody>
              {BOARD_PARTS.map((part) => (
                <tr key={part.no}>
                  <td>{part.no}</td>
                  <td>{part.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Note tone="ok" title="기억하기">
          확장보드의 전원 스위치와 18650 배터리 홀더, 5V 외부 전원 터미널이 있으니 전원 연결 방식을
          수업 전에 꼭 확인해요.
        </Note>

        <h3>원본 슬라이드 자료</h3>
        <p className="page-intro">
          수업 자료 원본을 순서대로 보여줘요. 사진이 많으니 조금 기다리면 나타나요.
        </p>
        <SlideFlow slides={getSlides("start")} />
      </Sec>

      {/* ② 부품 연결하는 법 */}
      <Sec
        id="wiring"
        no="②"
        title="부품 연결하는 법"
        intro="원본 교재의 연결 그림을 따라가며 부품을 연결하는 연습을 해요."
      >
        <div className="grid-2">
          <div className="card">
            <h3>연결 순서</h3>
            <ul className="check-list">
              <li>전원을 끈 상태에서 부품을 연결해요.</li>
              <li>핀 방향과 극성(+ / −)을 확인해요.</li>
              <li>연결이 끝나면 선생님께 확인받아요.</li>
            </ul>
          </div>
          <div className="card">
            <h3>연결이 안 될 때</h3>
            <ul className="check-list">
              <li>케이블이 빠졌거나 거꾸로 꽂혔는지 봐요.</li>
              <li>전원 스위치가 켜져 있는지 확인해요.</li>
              <li>그래도 안 되면 전원을 끄고 다시 연결해요.</li>
            </ul>
          </div>
        </div>

        <SlideFlow slides={getSlides("wiring")} />
      </Sec>

      {/* ③ 프로그래밍 시작하기 */}
      <Sec
        id="coding"
        no="③"
        title="프로그래밍 시작하기"
        intro="MakeCode 에디터에서 첫 프로그램을 만들고, 변수와 조건문까지 써 봐요."
      >
        <div className="mb-steps">
          {CODING_STEPS.map((step) => (
            <div className="mb-step" key={step.no}>
              <span className="mb-step-no" aria-hidden="true">
                {step.no}
              </span>
              <div>
                <strong>{step.title}</strong>
                <p className="mb-step-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <h3>변수로 숫자 세기 — 전자 줄넘기</h3>
        <div className="grid-2">
          <div className="card">
            <h4>목표</h4>
            <p className="mb-feature-desc">{COUNTER_CHALLENGE.goal}</p>
          </div>
          <div className="card">
            <h4>더하기</h4>
            <p className="mb-feature-desc">{COUNTER_CHALLENGE.extra}</p>
          </div>
        </div>

        <Note tone="info" title="도전 과제 1">
          {MUSIC_CHALLENGE}
        </Note>

        <h3>원본 슬라이드 자료</h3>
        <p className="page-intro">
          프로그램 블록은 슬라이드 이미지에 그대로 나와 있어요. 그림을 크게 보면서 따라 만들어요.
        </p>
        <SlideFlow slides={getSlides("coding")} />
      </Sec>

      {/* ④ 출력 실습 5종 */}
      <Sec
        id="output"
        no="④"
        title="출력 실습 5종"
        intro="LED, 글자, 소리, 네오픽셀, 서보모터를 직접 움직여 봐요. 각 실습은 연결 방법과 프로그램 두 단계로 진행해요."
      >
        <div className="mb-practice-list">
          {OUTPUT_PRACTICES.map((practice) => {
            const [wiringSlide] = getSlidesByNums([practice.wiringSlide]);
            const [programSlide] = getSlidesByNums([practice.programSlide]);
            return (
              <article className="card mb-practice" key={practice.no}>
                <header className="mb-practice-head">
                  <span className="mb-practice-no">{practice.no}</span>
                  <div>
                    <strong>{practice.title}</strong>
                  </div>
                </header>
                <div className="mb-practice-cols">
                  <div>
                    <h4>연결 방법</h4>
                    <p className="mb-practice-desc">{practice.wiring}</p>
                    {wiringSlide ? <SlideBlock slide={wiringSlide} /> : null}
                  </div>
                  <div>
                    <h4>프로그램</h4>
                    <p className="mb-practice-desc">{practice.program}</p>
                    {programSlide ? <SlideBlock slide={programSlide} /> : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Sec>

      {/* ⑤ 센서 읽기 3종 */}
      <Sec
        id="sensor"
        no="⑤"
        title="센서 읽기 3종"
        intro="mblock으로 빛, 초음파, 수분 센서 값을 읽어 와요."
      >
        <SlideFlow slides={getSlidesByNums([32])} />
        <div className="grid-2">
          {SENSOR_ITEMS.map((item) => (
            <article className="card mb-sensor" key={item.name}>
              <span className="badge">{item.tool}</span>
              <h3>{item.name}</h3>
              <p className="mb-feature-desc">{item.goal}</p>
              <SlideFlow slides={getSlidesByNums(item.slides)} />
            </article>
          ))}
        </div>
        <p className="footnote">
          ※ 원본 슬라이드 36장에는 아두이노 보드에 초음파센서와 LCD를 연결한 예시가 함께 실려 있어요.
        </p>
      </Sec>

      {/* ⑥ 프로젝트 3종 */}
      <Sec
        id="project"
        no="⑥"
        title="프로젝트 3종"
        intro="배운 출력 부품과 센서를 한 데 모아 생활 속 문제를 해결해 봐요."
      >
        <SlideFlow slides={getSlidesByNums([39])} />
        <div className="grid-2">
          {PROJECT_ITEMS.map((project) => (
            <article className="card mb-project" key={project.title}>
              <h3>{project.title}</h3>
              <p className="mb-feature-desc">{project.desc}</p>
              <div className="badge-row">
                {project.parts.map((part) => (
                  <span className="badge" key={part}>
                    {part}
                  </span>
                ))}
              </div>
              <SlideFlow slides={getSlidesByNums(project.slides)} />
            </article>
          ))}
        </div>
      </Sec>

      {/* ⑦ 음성보드 */}
      <Sec
        id="voice"
        no="⑦"
        title="음성보드"
        intro="ttsfree.com에서 만든 음성 파일을 SD카드로 옮겨 음성보드에서 재생해요."
      >
        <h3>TTS 음성 파일 만들기</h3>
        <div className="mb-steps">
          {TTS_STEPS.map((step) => (
            <div className="mb-step" key={step.no}>
              <span className="mb-step-no" aria-hidden="true">
                {step.no}
              </span>
              <p className="mb-step-desc mb-step-text">{step.text}</p>
            </div>
          ))}
        </div>

        <Note tone="warn" title="파일명은 꼭 숫자로!">
          다운로드한 음성 파일의 이름을 <strong>숫자로 변경</strong>한 뒤 USB 드라이브(SD카드)에
          붙여넣어야 음성보드가 파일을 찾을 수 있어요.
        </Note>

        <div className="grid-2">
          <div className="card">
            <h3>연결 방법</h3>
            <p className="mb-feature-desc">
              음성보드에 마이크로 SD 카드를 넣고, C 타입 전원을 연결해요.
            </p>
          </div>
          <div className="card">
            <h3>마이크로비트와 함께 쓰기</h3>
            <p className="mb-feature-desc">
              음성보드를 마이크로비트와 연결해 상황에 맞는 음성을 재생할 수 있어요.
            </p>
          </div>
        </div>

        <SlideFlow slides={getSlides("voice")} />
      </Sec>

      {/* ⑧ 허스키렌즈 AI 카메라 */}
      <Sec
        id="huskylens"
        no="⑧"
        title="허스키렌즈 AI 카메라"
        intro="복잡한 프로그래밍 없이 AI 영상 인식을 쓸 수 있는 인공지능 카메라예요. 이 단원이 가장 커요."
      >
        <div className="card mb-brain-card">
          <h3>허스키렌즈란?</h3>
          <ul className="check-list">
            {HUSKY_INTRO_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <h3>구조 — 두 개의 버튼</h3>
        <div className="grid-2">
          {HUSKY_BUTTONS.map((button) => (
            <div className="card" key={button.name}>
              <h4>
                {button.name} <span className="mb-en">({button.en})</span>
              </h4>
              {button.desc.map((line) => (
                <p className="mb-feature-desc" key={line}>
                  {line}
                </p>
              ))}
            </div>
          ))}
        </div>

        <h3>연결 — UART / I2C / USB</h3>
        <div className="table-wrap">
          <table className="simple">
            <thead>
              <tr>
                <th>방식</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              {HUSKY_CONNECT.map((row) => (
                <tr key={row.no}>
                  <td>{row.title}</td>
                  <td>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>화면 색상 상태</h3>
        <div className="table-wrap">
          <table className="simple">
            <thead>
              <tr>
                <th>색상</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {HUSKY_LED_STATES.map((row) => (
                <tr key={row.color}>
                  <td>
                    <span className="mb-led-dot" data-tone={row.dot} aria-hidden="true" />
                    {row.color}
                  </td>
                  <td>{row.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>화면 초기화 방법</h3>
        <ol className="mb-init-list">
          {HUSKY_INIT_STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <h3>9가지 기능</h3>
        <div className="mb-feature-grid">
          {HUSKY_FEATURES.map((feature) => (
            <article className="card mb-husky-card" key={feature.no}>
              <header className="mb-practice-head">
                <span className="mb-practice-no">{feature.no}</span>
                <div>
                  <strong>{feature.title}</strong>
                  <span className="mb-practice-slide">{feature.en}</span>
                </div>
              </header>
              <p className="mb-feature-desc">{feature.desc}</p>
              {feature.points ? (
                <ul className="check-list mb-husky-points">
                  {feature.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>

        <h3>마이크로비트와 연결하기</h3>
        <div className="grid-2">
          <div className="card">
            <h4>연결</h4>
            <p className="mb-feature-desc">마이크로비트에 허스키렌즈를 연결해요.</p>
          </div>
          <div className="card">
            <h4>24개 블록</h4>
            <p className="mb-feature-desc">
              허스키렌즈의 코드는 총 24개의 블록으로 구성돼 있어요. 사용한 기능(알고리즘)과 학습시킨
              ID 값으로 제어할 수 있어요.
            </p>
          </div>
        </div>

        <Note tone="ok" title="실습 — 객체 인식으로 표정 바꾸기">
          <ol className="mb-init-list mb-init-innote">
            {HUSKY_MB_PRACTICE.steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </Note>

        <h3>응용 프로젝트</h3>
        <div className="grid-2">
          {HUSKY_APPS.map((app) => (
            <div className="card" key={app.title}>
              <h4>{app.title}</h4>
              <p className="mb-feature-desc">{app.desc}</p>
            </div>
          ))}
        </div>

        <h3>원본 슬라이드 자료</h3>
        <p className="page-intro">
          허스키렌즈 단원의 원본 슬라이드예요. 기능 화면과 학습 방법을 그림으로 확인해요.
        </p>
        <SlideFlow slides={getSlides("huskylens")} />
      </Sec>
    </div>
  );
}
