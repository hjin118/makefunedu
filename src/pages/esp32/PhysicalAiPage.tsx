import type { ReactNode } from "react";
import PageHeader from "../../components/PageHeader";
import CopyButton from "../../components/CopyButton";
import "./esp32.css";
import type { ProjectSlide } from "./data";
import {
  ACTUATORS,
  DASHBOARD_LAYOUT,
  GLOSSARY,
  LESSON_PLAN,
  MASTER_PINS,
  MATRIX_SLIDES,
  OBSERVE_POINTS,
  PRACTICES,
  PORT_MATRIX,
  PROJECT_SETUP,
  PROJECT_UNITS,
  QUIZZES,
  SAFETY_RULES,
  SENSORS,
  SECTION_NAV,
  SHIELD_ROWS,
  TOPICS,
  TROUBLESHOOTING,
  WIDGETS,
  WIRE_CARDS,
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
    <section id={`esp32-${id}`} className="section esp32-section">
      <h2>
        <span className="esp32-sec-no" aria-hidden="true">
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
    <div className={`esp32-note is-${tone}`}>
      <strong>{title}</strong>
      <div>{children}</div>
    </div>
  );
}

const BMP_JSON =
  '{"online":true,"temperature":26.4,"pressure":1013.2,"unit":"hpa"}';
const SERVO_JSON = '{"angle":90}';

function JsonBlock({ topic, json }: { topic: string; json: string }) {
  return (
    <div className="prompt-block">
      <div className="prompt-head">
        <strong>{topic}</strong>
        <CopyButton text={json} label="📋 복사" />
      </div>
      <pre>
        <code>{json}</code>
      </pre>
    </div>
  );
}

/* ---------- ⑪ 프로젝트 실습 ---------- */

function SlideBlock({ slide }: { slide: ProjectSlide }) {
  const lines = slide.lines.filter((line) => !/^\d{1,3}$/.test(line.trim()));
  return (
    <article className="card esp32-slide-block">
      <header className="esp32-slide-block-head">
        <span className="esp32-slide-badge">슬라이드 {slide.no}</span>
        <strong>{slide.title}</strong>
      </header>
      {lines.length > 0 ? (
        <ul className="esp32-slide-lines">
          {lines.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : null}
      <div
        className={`esp32-slide-imgs${slide.files.length > 1 ? " is-multi" : ""}`}
      >
        {slide.files.map((file) => (
          <img
            key={file}
            src={`${import.meta.env.BASE_URL}images/esp32-project/${file}`}
            alt={`프로젝트 실습 슬라이드 ${slide.no} — ${slide.title}`}
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </article>
  );
}

function PromptBox({ title, prompt }: { title: string; prompt: string }) {
  return (
    <div className="prompt-block esp32-prompt-box">
      <div className="prompt-head">
        <strong>manus에 붙여 넣을 프롬프트 — {title}</strong>
        <CopyButton text={prompt} label="📋 프롬프트 복사" />
      </div>
      <pre>
        <code>{prompt}</code>
      </pre>
    </div>
  );
}

/* ---------- ① 흐름도 ---------- */

const FLOW_STEPS = [
  { step: "1", title: "센서", desc: "세상을 감지해요" },
  { step: "2", title: "ESP32", desc: "값을 읽고 JSON으로 만들어요" },
  { step: "3", title: "MQTT 브로커", desc: "토픽 주소로 배달해요" },
  { step: "4", title: "대시보드", desc: "게이지·차트로 보여줘요" },
];

function FlowDiagram() {
  return (
    <div className="esp32-flow" role="img" aria-label="센서 → ESP32 → MQTT 브로커 → 대시보드 흐름도">
      {FLOW_STEPS.map((item, i) => (
        <div className="esp32-flow-item" key={item.step}>
          <div className="card esp32-flow-card">
            <span className="esp32-flow-step">{item.step}</span>
            <strong>{item.title}</strong>
            <span className="esp32-flow-desc">{item.desc}</span>
          </div>
          {i < FLOW_STEPS.length - 1 ? (
            <span className="esp32-flow-arrow" aria-hidden="true">
              →
            </span>
          ) : null}
        </div>
      ))}
      <p className="esp32-flow-reverse">← 반대 방향: 대시보드의 제어 위젯도 이 길을 거꾸로 타고 ESP32까지 내려가요</p>
    </div>
  );
}

/* ---------- 본문 ---------- */

export default function PhysicalAiPage() {
  return (
    <div className="container page">
      <PageHeader
        title="피지컬 AI (ESP32)"
        intro={
          <>
            센서가 달린 로봇 키트(RoboFest)와 ESP32로 IoT의 원리를 배우고, MQTT 대시보드로 세상을
            관찰하고 움직여 봐요. manus AI와 함께 만드는 프로젝트 실습도 있어요. 정보·과학 융합
            수업용이에요.
          </>
        }
      />

      <nav className="esp32-nav" aria-label="섹션 이동">
        {SECTION_NAV.map((item) => (
          <a key={item.id} href={`#esp32-${item.id}`}>
            <span aria-hidden="true">{item.no}</span> {item.label}
          </a>
        ))}
      </nav>

      {/* ① 개요 */}
      <Sec id="overview" no="①" title="개요 — IoT와 대시보드란?">
        <div className="grid-2">
          <div className="card">
            <h3>IoT란?</h3>
            <p>
              <strong>IoT(사물인터넷)</strong>는 센서가 달린 사물들이 인터넷으로 서로 정보를 주고받는
              기술이에요. 스마트 스피커에 말을 걸고, 스마트 홈 화분이 스스로 물을 주고, 내비게이션이
              길을 알려 주는 것도 모두 IoT 덕분이에요.
            </p>
          </div>
          <div className="card">
            <h3>대시보드란?</h3>
            <p>
              자동차 계기판을 떠올려 보세요. 속도계·연료 게이지·경고등이 한자리에 모여 있는 것처럼,{" "}
              <strong>대시보드</strong>는 센서 값과 상태를 한 화면에 모아 보여 주는 조종판이에요.
            </p>
          </div>
        </div>

        <FlowDiagram />

        <Note tone="ok" title="기억하기">
          정보가 흐르는 길이 <strong>하나</strong>예요. 센서 → ESP32 → 브로커 → 대시보드 중 한 곳만
          끊겨도 전체가 멈춰요. 그래서 문제를 만나면 길을 한 단계씩 따라가며 확인해요.
        </Note>
      </Sec>

      {/* ② 하드웨어 */}
      <Sec id="hardware" no="②" title="하드웨어 목록" intro="두뇌와 감각기관, 손발을 만나 봐요.">
        <div className="card esp32-brain-card">
          <h3>두뇌 — ESP32-S3</h3>
          <p>
            <strong>ESP32-S3</strong>는 Wi-Fi가 내장된 마이크로컨트롤러예요. 센서 값을 읽고, 판단하고,
            인터넷으로 내보내는 일을 모두 이 작은 칩이 해요.
          </p>
        </div>

        <h3>센서 카탈로그 — 세상을 느끼는 감각기관 11종</h3>
        <div className="table-wrap">
          <table className="simple">
            <thead>
              <tr>
                <th>센서</th>
                <th>종류</th>
                <th>연결 핀</th>
                <th>값</th>
              </tr>
            </thead>
            <tbody>
              {SENSORS.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.model}</td>
                  <td>{row.pin}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="footnote">
          ※ 표에는 교재 기준 <strong>DHT22</strong>로 적었어요. 키트 배선 자료에는 DHT11로 표기돼
          있어요(모듈 버전 차이). 초음파 센서는 박쥐처럼 소리의 왕복 시간으로 거리를 잴 수 있어요.
        </p>

        <h3>액추에이터 카탈로그 — 움직이는 손발 6종</h3>
        <div className="table-wrap">
          <table className="simple">
            <thead>
              <tr>
                <th>액추에이터</th>
                <th>연결 핀</th>
                <th>제어</th>
              </tr>
            </thead>
            <tbody>
              {ACTUATORS.map((row) => (
                <tr key={row.name}>
                  <td>{row.name}</td>
                  <td>{row.pin}</td>
                  <td>{row.control}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Note tone="info" title="I2C가 궁금해요">
          I2C는 데이터 줄(SDA)과 시계 줄(SCL), 단 두 줄로 여러 부품과 통신하는 버스예요. 같은 두 줄에
          여러 부품을 연결해도 각자의 <strong>주소</strong>로 구별해요. 예: BMP280 = 0x76
        </Note>
      </Sec>

      {/* ③ 쉴드 핀 맵 */}
      <Sec
        id="pins"
        no="③"
        title="쉴드 핀 맵 & 회로 매트릭스"
        intro="확장 실드는 새로운 핀을 만드는 게 아니라, 보드의 핀을 센서 연결에 좋은 모양으로 1:1 재배열한 통로예요."
      >
        <h3>포트 종합 매트릭스</h3>
        <div className="table-wrap">
          <table className="simple">
            <thead>
              <tr>
                <th>포트 타입</th>
                <th>물리 배열</th>
                <th>핀 맵</th>
                <th>Wi-Fi 호환성</th>
                <th>추천 센서</th>
              </tr>
            </thead>
            <tbody>
              {PORT_MATRIX.map((row) => (
                <tr key={row.type}>
                  <td>{row.type}</td>
                  <td>{row.layout}</td>
                  <td>{row.pins}</td>
                  <td>{row.wifi}</td>
                  <td>{row.recommend}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Note tone="warn" title="⚠ ADC1 vs ADC2 — Wi-Fi 간섭 주의">
          ADC1 핀(1, 2, 4, 5, 6, 7, 10)은 Wi-Fi와 완벽히 독립적으로 동작해요. ADC2 핀들은 Wi-Fi 사용
          시 아날로그 읽기에 간섭이 생겨요. <strong>아날로그 센서는 반드시 ADC1에 연결하세요.</strong>
        </Note>

        <h3>G-V-S 로직 — 배선의 약속</h3>
        <div className="table-wrap">
          <table className="simple">
            <thead>
              <tr>
                <th>포트</th>
                <th>핀</th>
                <th>뜻</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={3}>3핀 포트</td>
                <td>G</td>
                <td>Ground (접지) — 마이너스(-) 전원</td>
              </tr>
              <tr>
                <td>V</td>
                <td>Voltage (전원) — 플러스(+) 5V/3.3V</td>
              </tr>
              <tr>
                <td>S</td>
                <td>Signal (신호) — 데이터 송수신 GPIO 핀</td>
              </tr>
              <tr>
                <td rowSpan={2}>4핀 포트</td>
                <td>G · V</td>
                <td>같아요 — 접지와 전원</td>
              </tr>
              <tr>
                <td>듀얼 신호 2개</td>
                <td>초음파(Trig/Echo)나 I2C처럼 데이터 줄이 2개 필요한 모듈용</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          센서 케이블 순서를 G-V-S에 맞추기만 하면 연결이 끝나요. 케이블 스파게티와 합선 위험을 차단하는
          설계예요.
        </p>

        <h3>실드 포트 배치 — 3행</h3>
        <div className="table-wrap">
          <table className="simple">
            <thead>
              <tr>
                <th>행</th>
                <th>포트 (좌 → 우)</th>
              </tr>
            </thead>
            <tbody>
              {SHIELD_ROWS.map((row) => (
                <tr key={row.row}>
                  <td>{row.row}</td>
                  <td>{row.ports}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>마스터 핀 매핑 매트릭스 (10종)</h3>
        <div className="table-wrap">
          <table className="simple">
            <thead>
              <tr>
                <th>센서명</th>
                <th>신호 유형</th>
                <th>커넥터 타입</th>
                <th>실드 라벨</th>
              </tr>
            </thead>
            <tbody>
              {MASTER_PINS.map((row) => (
                <tr key={row.sensor}>
                  <td>{row.sensor}</td>
                  <td>{row.signal}</td>
                  <td>{row.connector}</td>
                  <td>{row.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="footnote">
          ※ 모든 연결은 하드웨어 충돌을 방지하도록 최적의 핀 번호로 사전 할당돼 있어요.
        </p>

        <h3>개별 배선 카드</h3>
        <div className="esp32-wire-grid">
          {WIRE_CARDS.map((card) => (
            <article className="card esp32-wire-card" key={card.name}>
              <header className="esp32-wire-head">
                <span className="esp32-wire-no">{card.no}</span>
                <div>
                  <strong>{card.name}</strong>
                  <span className="esp32-wire-port">{card.port}</span>
                </div>
              </header>
              <table className="simple esp32-wire-table">
                <tbody>
                  {card.rows.map(([from, to]) => (
                    <tr key={from}>
                      <td>{from}</td>
                      <td aria-hidden="true" className="esp32-wire-arrow">
                        →
                      </td>
                      <td>{to}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="esp32-wire-desc">{card.desc}</p>
              {card.note ? <p className="esp32-wire-note">⚠ {card.note}</p> : null}
            </article>
          ))}
        </div>

        <Note tone="warn" title="J2 PROG에 연결하세요">
          전원 공급과 코드 업로드는 <strong>J2 PROG</strong> 포트에 USB-C 케이블을 꽂아야 해요. 이 포트가
          컴퓨터와 보드 사이의 유일한 통신·전원 채널이에요. <strong>J3 DEBUG는 프로그래밍용이 아니에요.</strong>
        </Note>

        <h3 id="esp32-slides">연결 회로 매트릭스 원본 자료</h3>
        <p className="page-intro">
          아래는 연결 회로 매트릭스 원본 슬라이드 15장이에요. 제목을 눌러 펼치면 슬라이드 이미지와 연결
          표를 함께 볼 수 있어요.
        </p>
        <div className="esp32-slide-list">
          {MATRIX_SLIDES.map((slide, i) => (
            <details className="esp32-slide" key={slide.file} open={i === 0}>
              <summary>
                <span className="esp32-slide-no">{i + 1}</span>
                <span className="esp32-slide-title">{slide.caption}</span>
              </summary>
              <div className="esp32-slide-body">
                <img
                  src={`${import.meta.env.BASE_URL}images/esp32-matrix/${slide.file}`}
                  alt={`연결 회로 매트릭스 슬라이드 ${i + 1}장 — ${slide.caption}`}
                  loading="lazy"
                  decoding="async"
                />
                {slide.lead ? <p className="esp32-slide-lead">{slide.lead}</p> : null}
                {slide.panels.map((panel) => (
                  <div key={panel.label ?? panel.table.head.join("-")}>
                    {panel.label ? <h4>{panel.label}</h4> : null}
                    <div className="table-wrap">
                      <table className="simple">
                        <thead>
                          <tr>
                            {panel.table.head.map((head) => (
                              <th key={head}>{head}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {panel.table.rows.map((row) => (
                            <tr key={row.join(" | ")}>
                              {row.map((cell) => (
                                <td key={cell}>{cell}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
                {slide.note ? <p className="esp32-wire-note">⚠ {slide.note}</p> : null}
              </div>
            </details>
          ))}
        </div>
      </Sec>

      {/* ④ MQTT */}
      <Sec
        id="mqtt"
        no="④"
        title="MQTT — 편지 배달 시스템"
        intro="MQTT는 사물들이 가벼운 메시지를 주고받는 통신 규칙이에요. 우체국에 편지를 맡기듯 생각하면 쉬워요."
      >
        <div className="grid-2">
          <div className="card">
            <h3>브로커 = 우체국</h3>
            <p>모든 편지(메시지)를 받아서 주소에 맞게 배달해 주는 곳이에요.</p>
          </div>
          <div className="card">
            <h3>토픽 = 주소</h3>
            <p>
              메시지가 어디로 갈지 정하는 주소예요. 예: <code>esp32/sensor/temperature</code>
            </p>
          </div>
          <div className="card">
            <h3>발행 (Publish)</h3>
            <p>ESP32가 센서 값을 토픽에 올려 보내는 일이에요.</p>
          </div>
          <div className="card">
            <h3>구독 (Subscribe)</h3>
            <p>대시보드가 특정 토픽의 메시지를 계속 받아 보는 일이에요.</p>
          </div>
        </div>

        <h3>메시지는 JSON 모양이에요</h3>
        <JsonBlock topic="esp32/sensor/bmp280" json={BMP_JSON} />
        <JsonBlock topic="esp32/control/servo" json={SERVO_JSON} />

        <Note tone="info" title="retained(보관 편지)와 LWT(유언장 메시지)">
          <strong>retained</strong>는 브로커가 보관해 두는 편지예요. 새로 구독한 대시보드도 마지막 값을
          바로 받아요. <strong>LWT</strong>는 ESP32가 갑자기 연결이 끊겼을 때 브로커가 대신 알려 주는
          유언장 메시지예요. 덕분에 대시보드는 ESP32가 offline이 됐다는 걸 바로 알 수 있어요.
        </Note>

        <h3>주소 체계</h3>
        <div className="table-wrap">
          <table className="simple">
            <thead>
              <tr>
                <th>토픽</th>
                <th>역할</th>
              </tr>
            </thead>
            <tbody>
              {TOPICS.map((row) => (
                <tr key={row.topic}>
                  <td>
                    <code>{row.topic}</code>
                  </td>
                  <td>{row.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Note tone="ok" title="정리">
          값이 안 변하면 다시 보내지 않아요. 같은 값을 계속 무선으로 낭비하지 않으려는 똑똑한 습관이에요.
        </Note>
      </Sec>

      {/* ⑤ 대시보드 시작하기 */}
      <Sec id="dashboard" no="⑤" title="대시보드 시작하기" intro="세 단계만 지나면 화면에 센서 값이 흘러들어와요.">
        <div className="esp32-flow">
          {[
            { step: "1", title: "전원 연결", desc: "J2 PROG에 USB 케이블을 꽂아요" },
            { step: "2", title: "브로커 연결", desc: "ws://localhost:9001 에 접속해요" },
            { step: "3", title: "online 확인", desc: "상태 바에 ESP32 online이 떠요" },
          ].map((item, i) => (
            <div className="esp32-flow-item" key={item.step}>
              <div className="card esp32-flow-card">
                <span className="esp32-flow-step">{item.step}</span>
                <strong>{item.title}</strong>
                <span className="esp32-flow-desc">{item.desc}</span>
              </div>
              {i < 2 ? (
                <span className="esp32-flow-arrow" aria-hidden="true">
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <h3>화면 구성</h3>
        <div className="table-wrap">
          <table className="simple">
            <thead>
              <tr>
                <th>영역</th>
                <th>무엇을 보여 주나요?</th>
              </tr>
            </thead>
            <tbody>
              {DASHBOARD_LAYOUT.map((row) => (
                <tr key={row.area}>
                  <td>{row.area}</td>
                  <td>{row.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Note tone="info" title="주소의 비밀">
          ESP32는 브로커와 <strong>1883번(TCP)</strong>으로, 브라우저 대시보드는{" "}
          <strong>9001번(WebSocket)</strong>으로 접속해요. 같은 브로커에 두 개의 다른 문으로 들어가는
          거예요.
        </Note>
      </Sec>

      {/* ⑥ 센서 값 읽기 & 세상 움직이기 */}
      <Sec
        id="reading"
        no="⑥"
        title="센서 값 읽기 & 세상 움직이기"
        intro="게이지를 읽고, 차트를 해석하고, 위젯으로 직접 움직여 봐요."
      >
        <div className="grid-2">
          <div className="card">
            <h3>게이지 읽기</h3>
            <ul className="check-list">
              <li>기압: 900~1,100 hPa 범위, 평균 약 1,013 hPa</li>
              <li>BMP280 온도: -10~50 °C</li>
              <li>퍼센트 값들(조도·수분 등): 0~100</li>
            </ul>
          </div>
          <div className="card">
            <h3>감지 카드 — PIR</h3>
            <p>
              PIR은 <strong>이진 정보</strong>를 알려줘요. 감지됨 / 정상, 두 가지예요. 게이지처럼 연속적인
              값이 아니라 예/아니오 문제예요.
            </p>
          </div>
        </div>

        <div className="card">
          <h3>시계열 차트 읽기</h3>
          <p>
            게이지는 <strong>지금 사진</strong>이고, 시계열 차트는 <strong>지금까지의 영화</strong>예요. 선이
            위로 가면 값이 커진 것, 아래로 가면 작아진 것, 수평이면 변화가 없다는 뜻이에요.
          </p>
        </div>

        <h3>관찰 포인트</h3>
        <div className="table-wrap">
          <table className="simple">
            <thead>
              <tr>
                <th>센서</th>
                <th>이렇게 해 보세요</th>
              </tr>
            </thead>
            <tbody>
              {OBSERVE_POINTS.map((row) => (
                <tr key={row.sensor}>
                  <td>{row.sensor}</td>
                  <td>{row.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3>제어의 흐름</h3>
        <div className="esp32-flow">
          {[
            "내가 클릭",
            "제어 위젯",
            "MQTT 브로커",
            "ESP32",
            "액추에이터",
          ].map((label, i) => (
            <div className="esp32-flow-item" key={label}>
              <div className="card esp32-flow-card esp32-flow-card-small">
                <strong>{label}</strong>
              </div>
              {i < 4 ? (
                <span className="esp32-flow-arrow" aria-hidden="true">
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <h3>위젯 사용법</h3>
        <div className="table-wrap">
          <table className="simple">
            <thead>
              <tr>
                <th>위젯</th>
                <th>사용법</th>
              </tr>
            </thead>
            <tbody>
              {WIDGETS.map((row) => (
                <tr key={row.widget}>
                  <td>{row.widget}</td>
                  <td>{row.how}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Note tone="info" title="상태 되돌아보기 (echo 동기화)">
          위젯을 누르면 명령이 ESP32까지 갔다가, 실제 상태가 다시 대시보드로 돌아와요. 화면의 값은 내
          명령이 아니라 ESP32가 알려 준 <strong>실제 상태</strong>라서 믿을 수 있어요.
        </Note>
      </Sec>

      {/* ⑦ 실습 활동 */}
      <Sec id="practice" no="⑦" title="실습 활동 6가지" intro="직접 해 보고, 기록하고, 생각해 봐요.">
        <div className="grid-2">
          {PRACTICES.map((item) => (
            <article className="card esp32-practice" key={item.title}>
              <h3>{item.title}</h3>
              <h4>하는 법</h4>
              <ul className="check-list">
                {item.how.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <h4>기록 항목</h4>
              <div className="badge-row">
                {item.record.map((field) => (
                  <span className="badge" key={field}>
                    {field}
                  </span>
                ))}
              </div>
              <h4>생각 거리</h4>
              <p className="esp32-practice-think">{item.think}</p>
            </article>
          ))}
        </div>
      </Sec>

      {/* ⑧ 문제 해결 */}
      <Sec id="trouble" no="⑧" title="문제 해결 가이드" intro="멈췄다고 포기하지 마세요. 표를 따라가 보면 금방 찾아요.">
        <div className="table-wrap">
          <table className="simple">
            <thead>
              <tr>
                <th>증상</th>
                <th>가능한 원인</th>
                <th>해결</th>
              </tr>
            </thead>
            <tbody>
              {TROUBLESHOOTING.map((row) => (
                <tr key={row.symptom}>
                  <td>{row.symptom}</td>
                  <td>{row.cause}</td>
                  <td>{row.fix}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Note tone="ok" title="탐구 태도">
          고장은 데이터예요. &ldquo;왜 이럴까?&rdquo;라고 기록하고 원인을 좁혀 가는 과정이야말로 과학자와
          엔지니어가 하는 일이에요.
        </Note>
      </Sec>

      {/* ⑨ 확인 문제 */}
      <Sec id="quiz" no="⑨" title="확인 문제 10문항" intro="풀고 나서 정답을 펼쳐 확인해 보세요.">
        <ol className="esp32-quiz-list">
          {QUIZZES.map((quiz) => (
            <li key={quiz.no} className="esp32-quiz-item">
              <p className="esp32-quiz-q">
                <strong>{quiz.no}.</strong> {quiz.q}
              </p>
              {quiz.choices ? (
                <ol className="esp32-quiz-choices">
                  {quiz.choices.map((choice) => (
                    <li key={choice}>{choice}</li>
                  ))}
                </ol>
              ) : null}
              <details className="esp32-quiz-answer">
                <summary>정답 보기</summary>
                <p>{quiz.answer}</p>
              </details>
            </li>
          ))}
        </ol>
      </Sec>

      {/* ⑩ 용어 사전 */}
      <Sec id="glossary" no="⑩" title="용어 사전 20개" intro="수업 중에 헷갈리는 말이 나오면 여기서 찾아 보세요.">
        <dl className="esp32-glossary">
          {GLOSSARY.map((term) => (
            <div className="card esp32-term" key={term.term}>
              <dt>
                {term.term}
                <span className="esp32-term-en">{term.en}</span>
              </dt>
              <dd>{term.def}</dd>
            </div>
          ))}
        </dl>
      </Sec>

      {/* ⑪ 프로젝트 실습 */}
      <Sec
        id="project"
        no="⑪"
        title="프로젝트 실습"
        intro="대시보드를 직접 켜 보고, manus AI와 함께 3개의 스마트 프로젝트를 만들어 봐요. 원본 슬라이드 38장을 순서대로 따라가면 돼요."
      >
        <h3>대시보드 시작하기 (실습)</h3>
        <div className="grid-2">
          <div className="card">
            <h4>준비물 리스트</h4>
            <ul className="check-list">
              {PROJECT_SETUP.supplies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="card">
            <h4>연결 8단계 한눈에 보기</h4>
            <ol className="esp32-prj-steps">
              {PROJECT_SETUP.steps.map((step, i) => (
                <li key={step}>
                  <strong>{i + 1}.</strong> {step}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <Note tone="warn" title="⚠ J2 PROG에 연결하세요">
          ESP32-S3 메인 보드에 전원을 공급하고 코드를 업로드하려면 반드시 <strong>J2 PROG</strong> 포트에
          USB-C 케이블을 연결해야 해요. <strong>J3 DEBUG 포트는 일반적인 프로그래밍 용도가 아니에요.</strong>
        </Note>

        <div className="esp32-slide-list-project">
          {PROJECT_SETUP.slides.map((slide) => (
            <SlideBlock key={slide.no} slide={slide} />
          ))}
        </div>

        {PROJECT_UNITS.map((unit) => (
          <div className="esp32-prj-unit" key={unit.id}>
            <h3 id={`esp32-project-${unit.id}`}>
              <span className="esp32-prj-no">프로젝트 {unit.no}</span>
              {unit.title}
            </h3>
            <div className="grid-2">
              <div className="card esp32-prj-card is-problem">
                <h4>문제</h4>
                <p>{unit.problem}</p>
              </div>
              <div className="card esp32-prj-card is-goal">
                <h4>목표</h4>
                <p>{unit.goal}</p>
              </div>
            </div>
            <div className="card esp32-prj-card is-check">
              <h4>필요 부품 체크리스트</h4>
              <ul className="esp32-prj-checklist">
                {unit.checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="esp32-slide-list-project">
              {unit.slides.map((slide) => (
                <SlideBlock key={slide.no} slide={slide} />
              ))}
            </div>
            <PromptBox title={unit.title} prompt={unit.prompt} />
            <Note tone="ok" title="이렇게 테스트해요">
              {unit.test}
            </Note>
          </div>
        ))}
      </Sec>

      {/* 부록 */}
      <Sec id="appendix" no="⑫" title="부록" intro="2차시 수업 설계와 안전 수칙이에요.">
        {LESSON_PLAN.map((plan) => (
          <div key={plan.session} className="esp32-lesson-block">
            <h3>{plan.session} 수업 진행 예시</h3>
            <div className="table-wrap">
              <table className="simple">
                <thead>
                  <tr>
                    <th>단계</th>
                    <th>시간</th>
                    <th>활동</th>
                  </tr>
                </thead>
                <tbody>
                  {plan.rows.map((row) => (
                    <tr key={row.phase + row.time}>
                      <td>{row.phase}</td>
                      <td>{row.time}</td>
                      <td>{row.activity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        <h3>안전 수칙 5</h3>
        <ol className="esp32-safety">
          {SAFETY_RULES.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </ol>
      </Sec>
    </div>
  );
}
