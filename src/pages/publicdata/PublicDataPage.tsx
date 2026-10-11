import type { ReactNode } from "react";
import PageHeader from "../../components/PageHeader";
import CopyButton from "../../components/CopyButton";
import "./publicdata.css";
import type { PromptItem } from "./data";
import {
  API_COMPARE_ROWS,
  API_INTRO_ROWS,
  CONCEPT_CARDS,
  FREE_PROMPTS,
  KEY_PROMPTS,
  MAP_API_CARDS,
  NEIS_ROWS,
  PORTAL_KEY_STEPS,
  SECTION_NAV,
} from "./data";

/* ---------- 작은 빌딩 블록 ---------- */

const PD_API_TILES = [
  { label: "날씨", file: "weather-api" },
  { label: "대기질", file: "air-quality" },
  { label: "급식", file: "neis-lunch" },
  { label: "지도", file: "map-pin" },
] as const;

function Sec({
  id,
  no,
  title,
  intro,
  visual,
  children,
}: {
  id: string;
  no: string;
  title: string;
  intro?: string;
  visual?: string;
  children: ReactNode;
}) {
  return (
    <section id={`pd-${id}`} className="section pd-section">
      <div className="pd-sec-head">
        <div>
          <h2>
            <span className="pd-sec-no" aria-hidden="true">
              {no}
            </span>
            {title}
          </h2>
          {intro ? <p className="page-intro">{intro}</p> : null}
        </div>
        {visual ? (
          <img
            className="pd-sec-visual"
            src={`${import.meta.env.BASE_URL}images/illustrations/${visual}.svg`}
            alt=""
            aria-hidden="true"
          />
        ) : null}
      </div>
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
    <div className={`pd-note is-${tone}`}>
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
}

function PromptBlock({ prompt }: { prompt: PromptItem }) {
  const text = prompt.lines.join("\n");
  return (
    <div className="pd-prompt-unit" id={`pd-prompt-${prompt.id}`}>
      <h3>
        [프롬프트 {prompt.no}] {prompt.title}
      </h3>
      <p className="page-intro">{prompt.subtitle}</p>
      <div className="prompt-block pd-prompt-box">
        <div className="prompt-head">
          <strong>AI에게 복사해 주세요</strong>
          <CopyButton text={text} label="📋 프롬프트 복사" />
        </div>
        <pre>
          <code>{text}</code>
        </pre>
      </div>
    </div>
  );
}

/* ---------- 본문 ---------- */

export default function PublicDataPage() {
  return (
    <div className="container page">
      <PageHeader
        title="공공데이터 활용"
        intro={
          <>
            공공 API를 호출해 웹 대시보드를 직접 만들어 봐요. Open-Meteo·PokeAPI·나이스 NEIS처럼{" "}
            <strong>API 키 없이</strong> 바로 쓰는 방법과, 에어코리아처럼{" "}
            <strong>API 키를 발급받아</strong> 확장하는 방법 두 가지로 나눠 배워요. AI에게 복사하는 실습
            프롬프트 8종이 담긴 정보·과학 수업자료예요.
          </>
        }
      />

      <nav className="pd-nav" aria-label="섹션 이동">
        {SECTION_NAV.map((item) => (
          <a key={item.id} href={`#pd-${item.id}`}>
            <span aria-hidden="true">{item.no}</span> {item.label}
          </a>
        ))}
      </nav>

      {/* ① 개념 */}
      <Sec id="concept" no="①" title="공공데이터란?" visual="public-data">
        <div className="grid-2">
          {CONCEPT_CARDS.map((card) => (
            <div className="card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>

        <h3>API 키 비교표 — 키 없이 쓰기 vs 키를 발급받아 쓰기</h3>
        <div className="table-wrap">
          <table className="simple pd-compare">
            <thead>
              <tr>
                <th>항목</th>
                <th>API 키 없이 사용하는 경우</th>
                <th>API 키를 사용하는 경우</th>
              </tr>
            </thead>
            <tbody>
              {API_COMPARE_ROWS.map((row) => (
                <tr key={row.item}>
                  <td>{row.item}</td>
                  <td>{row.free}</td>
                  <td>{row.keyed}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Note tone="ok" title="기억하기">
          키 없는 API는 주소만 있으면 <strong>바로 fetch 호출</strong>이 가능해요. 키가 필요한 API는
          공공데이터포털에서 키를 발급받아 <strong>URL 뒤에 붙여</strong> 호출해요. 두 방식 모두
          응답은 JSON으로 돌아와요.
        </Note>
      </Sec>

      {/* ② 활용 API 소개 */}
      <Sec
        id="apis"
        no="②"
        title="활용 API 소개 표"
        intro="이번 단원에서 만나는 대표 API 4종이에요. 어떤 데이터를 주고, 대시보드에서 어떤 역할을 하는지 살펴 봐요."
      >
        <div className="pd-api-tiles">
          {PD_API_TILES.map((tile) => (
            <div className="pd-api-tile" key={tile.file}>
              <img
                src={`${import.meta.env.BASE_URL}images/illustrations/${tile.file}.svg`}
                alt=""
                aria-hidden="true"
              />
              <span>{tile.label}</span>
            </div>
          ))}
        </div>

        <div className="table-wrap">
          <table className="simple">
            <thead>
              <tr>
                <th>활용 API</th>
                <th>기능</th>
                <th>역할</th>
                <th>장점 · 출처 · 특징</th>
              </tr>
            </thead>
            <tbody>
              {API_INTRO_ROWS.map((row) => (
                <tr key={row.name}>
                  <td>
                    <strong>{row.name}</strong>
                  </td>
                  <td>{row.feature}</td>
                  <td>{row.role}</td>
                  <td>{row.note ? `${row.noteLabel}: ${row.note}` : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Note tone="info" title="JSON으로 돌아오는 데이터">
          모든 API는 URL을 호출하면 JSON 형태로 데이터를 돌려줘요. 자바스크립트의{" "}
          <code>fetch</code>와 <code>async/await</code>로 받아서 화면에 그리면 대시보드가 완성돼요.
        </Note>
      </Sec>

      {/* ③ API 키 없이 사용하는 경우 */}
      <Sec
        id="free"
        no="③"
        title="API 키 없이 사용하는 경우 — 무료 API"
        intro="Open-Meteo·PokeAPI·OpenStreetMap은 물론 나이스 NEIS까지 회원가입이나 키 발급 없이 URL만으로 바로 호출할 수 있어요. 무료 API와 나이스 API로 다섯 개의 대시보드를 만들어 봐요."
      >
        <div className="grid-2">
          <div className="card">
            <h3>왜 키가 필요 없을까?</h3>
            <p>
              이 API들은 누구나 즉시 사용할 수 있게 열려 있어요. 브라우저에서 아래처럼 주소를 호출하면
              JSON이 바로 돌아와요.
            </p>
          </div>
          <div className="card">
            <h3>호출 예시</h3>
            <p>
              <code>https://pokeapi.co/api/v2/pokemon/pikachu</code>
              <br />
              <code>
                https://api.open-meteo.com/v1/forecast?latitude=37.5665&amp;longitude=126.9780
              </code>
            </p>
          </div>
        </div>

        <h3>나이스(NEIS) — 학교 코드부터 급식까지</h3>
        <div className="table-wrap">
          <table className="simple">
            <thead>
              <tr>
                <th>API</th>
                <th>파라미터</th>
                <th>결과</th>
              </tr>
            </thead>
            <tbody>
              {NEIS_ROWS.map((row) => (
                <tr key={row.api}>
                  <td>
                    <strong>{row.api}</strong>
                  </td>
                  <td>{row.params}</td>
                  <td>{row.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Note tone="ok" title="나이스 NEIS는 KEY 없이 사용해요">
          나이스 NEIS Open API는 <strong>KEY 파라미터가 선택 사항</strong>이에요. 없어도 바로 호출되고,
          KEY를 넣으면 호출 한도가 늘어나는 정도예요. 등록 없이 수업에서 바로 쓸 수 있어요.
        </Note>

        <Note tone="info" title="급식 없는 날의 예외 처리">
          주말·공휴일·방학에는 INFO-300("해당하는 데이터가 없습니다")이 돌아와요. 에러로 처리하지 말고
          감지해서 🌕 달 아이콘 휴일 안내 카드를 보여 주면 돼요.
        </Note>

        <h3>실습 — AI에게 복사해 주세요</h3>
        <p className="page-intro">
          아래 프롬프트를 그대로 복사해 AI에게 붙여 넣으면 단일 HTML 대시보드가 완성돼요. 생략하지 말고
          전문을 복사해 주세요.
        </p>
        {FREE_PROMPTS.map((prompt) => (
          <PromptBlock key={prompt.id} prompt={prompt} />
        ))}

        <Note tone="warn" title="가상 시뮬레이터의 힘">
          실시간 데이터는 상황이 변하지 않으면 화면도 변하지 않아요. 프롬프트 3처럼{" "}
          <strong>가상 시뮬레이터</strong>를 함께 만들면 미세먼지·폭염 상황을 수업 중에 재현해 테스트할
          수 있어요.
        </Note>
      </Sec>

      {/* ④ API 키를 사용하는 경우 */}
      <Sec
        id="key"
        no="④"
        title="API 키를 사용하는 경우 — 에어코리아 확장"
        intro="네이버 클라우드 플랫폼·Google Cloud Console·공공데이터포털(data.go.kr)에서 API 키(서비스키·Client ID)를 발급받아 호출해요. 키가 있으면 더 많은 데이터·더 높은 호출 한도를 쓸 수 있어요."
      >
        <h3>에어코리아(한국환경공단)</h3>
        <div className="card">
          <p>
            서비스키를 입력하면 실시간 대기질 데이터를 호출할 수 있어요. 브라우저에서 직접 호출하면{" "}
            <strong>CORS 제한</strong>이 있어서, allorigins 프록시를 통해 호출하는 확장 모드로
            구성해요.
          </p>
        </div>

        <div className="card">
          <h3>공공데이터포털 API 키 발급하기 (6단계)</h3>
          <ol className="pd-steps">
            {PORTAL_KEY_STEPS.map((step) => (
              <li key={step.no}>
                <strong>{step.no}.</strong> {step.title}
                {step.desc ? <span className="pd-step-desc"> — {step.desc}</span> : null}
              </li>
            ))}
          </ol>
          <p className="footnote pd-steps-note">
            인증키 하나로 포털의 다른 공공 API도 같은 방식으로 신청해 쓸 수 있고, 노출되면 마이페이지에서
            재발급할 수 있어요.
          </p>
        </div>

        <h3>지도 API — 네이버·구글로 위치 서비스 만들기</h3>
        <p className="page-intro">
          병원·약국처럼 위치가 담긴 데이터는 지도 API로 보여 주면 한눈에 이해돼요. 발급 방법과 호출
          주소를 먼저 살펴 봐요.
        </p>
        <div className="grid-2">
          {MAP_API_CARDS.map((card) => (
            <div className="card" key={card.title}>
              <h4>{card.title}</h4>
              <table className="simple">
                <tbody>
                  {card.rows.map(([label, desc]) => (
                    <tr key={label}>
                      <th scope="row">{label}</th>
                      <td>{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <Note tone="warn" title="⚠ API 키 관리 수칙">
          API 키는 도난 방지를 위해 반드시 <strong>도메인(웹사이트) 제한</strong>을 설정하고, 코드에
          넣기 전까지는 메모장 등에 따로 보관해요.
        </Note>

        <h3>실습 — AI에게 복사해 주세요</h3>
        <p className="page-intro">
          아래 프롬프트를 그대로 복사해 AI에게 붙여 넣으면 지도 기반 단일 HTML 웹 앱이 완성돼요. 코드
          속 <code>YOUR_...</code> 키 자리는 발급받은 키로 바꿔 넣어 주세요.
        </p>
        {KEY_PROMPTS.map((prompt) => (
          <PromptBlock key={prompt.id} prompt={prompt} />
        ))}

        <Note tone="ok" title="두 방식, 하나의 흐름">
          키 없는 API로 감각을 익히고, 키가 필요한 API로 공식 데이터를 다뤄요. 키는 비밀번호처럼 소중한
          정보니까 코드에 올릴 때는 조심히 다뤄요.
        </Note>
      </Sec>
    </div>
  );
}
