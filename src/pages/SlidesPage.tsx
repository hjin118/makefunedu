import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CopyButton from "../components/CopyButton";
import PageHeader from "../components/PageHeader";
import Tabs from "../components/Tabs";
import "./SlidesPage.css";

/* ---------- ① 디자인 테마 데이터 ---------- */

type SlideTheme = {
  id: string;
  name: string;
  main: string;
  sub: string;
  point: string;
  bg: string;
  ink: string;
  mood: string;
  layout: string;
  band: "left" | "top";
};

const THEMES: SlideTheme[] = [
  {
    id: "busan",
    name: "부산교육청",
    main: "#2a4d9c",
    sub: "#9db4e0",
    point: "#f2a30f",
    bg: "#f4f7fc",
    ink: "#17233d",
    mood: "시원한 바다와 감천 벽골의 믿음직한 파랑",
    layout: "왼쪽에 세로 파란 띠를 두고 제목을 크게",
    band: "left",
  },
  {
    id: "seoul",
    name: "서울시교육청",
    main: "#0e7a52",
    sub: "#b7e0cc",
    point: "#e2a417",
    bg: "#f5fbf7",
    ink: "#123024",
    mood: "도심 숲길처럼 단정하고 포근한 초록",
    layout: "위에 얇은 초록 띠, 여백을 넉넉히",
    band: "top",
  },
  {
    id: "gyeonggi",
    name: "경기도교육청",
    main: "#4a9fd8",
    sub: "#cfe7f6",
    point: "#ef6c35",
    bg: "#f4fafd",
    ink: "#143545",
    mood: "넓은 들판의 하늘처럼 시원하고 밝은 하늘색",
    layout: "제목 아래 주황 밑줄, 오른쪽에 그림 한 장",
    band: "left",
  },
  {
    id: "incheon",
    name: "인천교육청",
    main: "#3a4eb5",
    sub: "#c2cdf0",
    point: "#2fa8a0",
    bg: "#f5f6fc",
    ink: "#1b2246",
    mood: "바다와 공항의 깔끔하고 진중한 남색",
    layout: "중앙 정렬 큰 제목, 아래 두꺼운 색 띠",
    band: "top",
  },
  {
    id: "daegu",
    name: "대구교육청",
    main: "#c8462c",
    sub: "#f0cabc",
    point: "#2b6ca3",
    bg: "#fdf6f3",
    ink: "#3a1e15",
    mood: "오래된 벽돌 골목처럼 따뜻한 벽돌빛",
    layout: "왼쪽에 큰 제목, 오른쪽에 아이콘",
    band: "left",
  },
  {
    id: "chungnam",
    name: "충청남도교육청",
    main: "#557c2e",
    sub: "#d5e3ba",
    point: "#c9891b",
    bg: "#fafbf2",
    ink: "#26311a",
    mood: "들녘과 갯벌이 주는 포근한 올리브 초록",
    layout: "아래에 두꺼운 초록 띠, 흰 여백 위 본문",
    band: "top",
  },
  {
    id: "jeju",
    name: "제주교육청",
    main: "#0f8a80",
    sub: "#bfe8e4",
    point: "#f08c2e",
    bg: "#f3fbf9",
    ink: "#0f3632",
    mood: "푸른 바다와 감귤 향이 나는 산뜻한 청록",
    layout: "사진 위에 흰 띠를 겹쳐 제목을 얹기",
    band: "left",
  },
  {
    id: "jeonbuk",
    name: "전북교육청",
    main: "#a8763e",
    sub: "#e9d7c2",
    point: "#0f6f5c",
    bg: "#fbf8f2",
    ink: "#3a2a18",
    mood: "황토 벽과 소금밭의 포근한 흙빛",
    layout: "왼쪽 세로 황토 띠와 짧은 제목",
    band: "left",
  },
  {
    id: "gwangju",
    name: "광주교육청",
    main: "#d9a514",
    sub: "#f3e6b8",
    point: "#4a5fc1",
    bg: "#fdfaf0",
    ink: "#3c3212",
    mood: "빛고을의 밝고 따뜻한 노랑",
    layout: "위쪽 노랑 띠, 가운데 큰 제목",
    band: "top",
  },
  {
    id: "daejeon",
    name: "대전교육청",
    main: "#6f4fa0",
    sub: "#dccff0",
    point: "#2f9e8f",
    bg: "#f9f7fc",
    ink: "#2b2340",
    mood: "과학 도시의 차분하고 영리한 보라빛",
    layout: "중앙 정렬 제목과 단정한 2단 본문",
    band: "top",
  },
  {
    id: "ulsan",
    name: "울산교육청",
    main: "#e2711d",
    sub: "#f7dcc2",
    point: "#145c8e",
    bg: "#fdf8f2",
    ink: "#42210d",
    mood: "고래 바다와 쇠 불빛의 활기찬 주황",
    layout: "왼쪽 주황 띠, 큰 숫자 강조",
    band: "left",
  },
  {
    id: "gangwon",
    name: "강원교육청",
    main: "#a03d5e",
    sub: "#eccdd8",
    point: "#1f7a52",
    bg: "#fcf6f8",
    ink: "#3a1526",
    mood: "설악 단풍의 짙고 선명한 자주",
    layout: "위에 얇은 자주 띠, 사진을 넉넉히",
    band: "top",
  },
  {
    id: "chungbuk",
    name: "충청북도교육청",
    main: "#245f73",
    sub: "#c4d8de",
    point: "#d4552e",
    bg: "#f4f8fa",
    ink: "#182e37",
    mood: "충주호처럼 깊고 차분한 물빛",
    layout: "왼쪽 세로 물빛 띠, 본문은 가지런히",
    band: "left",
  },
  {
    id: "gyeongnam",
    name: "경상남도교육청",
    main: "#d977a6",
    sub: "#f6dcea",
    point: "#2f7fa3",
    bg: "#fdf6f9",
    ink: "#3f1d2f",
    mood: "진해 벚꽃 길의 부드러운 분홍",
    layout: "중앙 큰 제목, 아래 얇은 두 줄 띠",
    band: "top",
  },
  {
    id: "camellia",
    name: "초록 동백",
    main: "#20694a",
    sub: "#c9e4d5",
    point: "#c8322b",
    bg: "#f5fbf7",
    ink: "#16291f",
    mood: "겨울 바다에 피는 동백의 진초록과 빨강 대비",
    layout: "왼쪽 세로 초록 띠, 빨간 밑줄 강조",
    band: "left",
  },
  {
    id: "yuchae",
    name: "노란 유채",
    main: "#e6b800",
    sub: "#f7ecc4",
    point: "#4c6b2f",
    bg: "#fdfaf0",
    ink: "#3a3210",
    mood: "봄 들녘 유채꽃의 눈부신 노랑",
    layout: "위에 밝은 노랑 띠, 사진 크게",
    band: "top",
  },
  {
    id: "sea",
    name: "파란 바다",
    main: "#0e7fb8",
    sub: "#c4e3f2",
    point: "#ffb02e",
    bg: "#f3f9fc",
    ink: "#10293a",
    mood: "여름 바다처럼 선명하고 시원한 파랑",
    layout: "아래에 파란 물결 띠, 큰 제목",
    band: "top",
  },
  {
    id: "stonewall",
    name: "회색 돌담",
    main: "#7d7d78",
    sub: "#d9d8d2",
    point: "#9c4a2f",
    bg: "#f8f7f4",
    ink: "#2c2c29",
    mood: "제주 돌담처럼 무던하고 잔잔한 회색",
    layout: "위에 돌 회색 띠, 토기색 포인트",
    band: "top",
  },
];

const INITIAL_THEME_COUNT = 6;

function buildDesignPrompt(theme: SlideTheme): string {
  return [
    `슬라이드를 "${theme.name}" 테마로 꾸며 주세요.`,
    "",
    `- 색: 메인 ${theme.main}, 보조 ${theme.sub}, 포인트 ${theme.point}, 배경 ${theme.bg}, 글자 ${theme.ink}`,
    `- 분위기: ${theme.mood}`,
    `- 구성: ${theme.layout}`,
    "",
    "적용 규칙:",
    `1. 배경은 ${theme.bg}로 밝게 유지하고, 제목·도형·아이콘은 메인 색 ${theme.main}으로 통일해 주세요.`,
    `2. 포인트 색 ${theme.point}는 한 장에 한 곳(제목 밑줄, 큰 숫자, 강조 박스)에만 써 주세요.`,
    `3. 제목은 굵고 크게, 본문은 글자 색 ${theme.ink}로 또렷하게 쓰고, 보조 색 ${theme.sub}은 표와 도구 안에만 살짝 써 주세요.`,
    "4. 그라데이션·어두운 배경·자잘한 장식은 빼고, 여백을 넉넉히 두어 주세요.",
  ].join("\n");
}

/* ---------- ② 단계별 프롬프트 템플릿 ---------- */

type StepId = "step1" | "step2" | "step3" | "step4";

type StepDef = {
  id: StepId;
  tabLabel: string;
  heading: string;
  explain: string;
  build: (audience: string, objective: string) => string;
};

const DEFAULT_AUDIENCE = "초등 5~6학년";
const DEFAULT_OBJECTIVE = "단원 정리 발표";

const STEP_DEFS: StepDef[] = [
  {
    id: "step1",
    tabLabel: "1. 슬라이드 대본",
    heading: "단계 1 · 슬라이드 대본 뽑기",
    explain: "업로드한 자료를 훑어서 장 구성과 장별로 들어갈 내용을 먼저 뽑아요.",
    build: (audience, objective) =>
      [
        "노트북LM에 업로드한 자료를 바탕으로, 슬라이드 대본을 만들어 주세요.",
        "",
        `- 관객: ${audience}`,
        `- 목적: ${objective}`,
        "",
        "부탁하는 방법:",
        "1. 업로드한 자료에서 이 목적에 꼭 필요한 내용만 골라 주세요.",
        "2. 한 장에 한 가지 메시지만 담기게 장을 나눠 주세요.",
        "3. 구성은 표지 → 목차 → 본문 3~6장 → 마무리(정리·남은 할 일) 순으로 해 주세요.",
        "4. 각 장마다 아래 네 가지를 적어 주세요.",
        "   - 장 제목(10자 안팎의 짧은 문장)",
        "   - 한 줄 핵심 문장",
        "   - 슬라이드에 실제로 실을 짧은 문장 2~3개",
        "   - 발표자가 말할 설명 2~4문장",
        `5. ${audience} 수준에 맞춰 쉬운 표현으로 써 주세요. 한자어는 풀어서 적어 주세요.`,
        "",
        "먼저 장 구성(목차)만 보여 주시고, 제가 확인한 뒤 각 장을 채워 주세요.",
      ].join("\n"),
  },
  {
    id: "step2",
    tabLabel: "2. 인포그래픽 대본",
    heading: "단계 2 · 인포그래픽 대본 뽑기",
    explain: "자료의 숫자와 덩어리를 골라 한 장짜리 인포그래픽 구성으로 묶어요.",
    build: (audience, objective) =>
      [
        "노트북LM에 업로드한 자료를 바탕으로, 한 장짜리 인포그래픽 대본을 만들어 주세요.",
        "",
        `- 관객: ${audience}`,
        `- 목적: ${objective}`,
        "",
        "부탁하는 방법:",
        "1. 자료에서 핵심 숫자·순서·비교부터 찾아 주세요. 숫자가 없으면 내용을 3~5개 덩어리로 묶어 주세요.",
        "2. 아래 구성으로 대본을 짜 주세요.",
        "   - 큰 제목 한 줄",
        "   - 부제(핵심 메시지) 한 줄",
        "   - 내용 블록 3~5개(제목 + 짧은 설명 2~4문장)",
        "   - 마무리 문장 한 줄",
        "3. 각 블록에 어울리는 아이콘을 (괄호)로 제안해 주세요. 예: (책 아이콘), (돋보기 아이콘)",
        "4. 크게 보여 줄 숫자가 있으면 따로 표시해 주세요.",
        `5. ${audience}이(가) 한눈에 읽도록 문장을 짧게 유지해 주세요.`,
      ].join("\n"),
  },
  {
    id: "step3",
    tabLabel: "3. 슬라이드 완성",
    heading: "단계 3 · 슬라이드 완성하기",
    explain: "뽑아 둔 대본을 장 수와 발표자 노트까지 갖춘 슬라이드로 다듬어요.",
    build: (audience, objective) =>
      [
        "1단계에서 뽑은 슬라이드 대본을 바탕으로, 발표에 바로 쓸 슬라이드를 완성해 주세요.",
        "",
        `- 관객: ${audience}`,
        `- 목적: ${objective}`,
        "",
        "부탁하는 방법:",
        "1. 전체 장 수는 8~12장으로 맞춰 주세요. 모자라면 나누고, 남으면 합쳐 주세요.",
        "2. 노트북LM에 업로드한 자료에 있는 내용만 쓰고, 없는 내용은 만들지 말아 주세요.",
        "3. 각 슬라이드는 이렇게 완성해 주세요.",
        "   - 제목 한 줄",
        "   - 본문은 짧은 문장 3개 이하 또는 표·그림 한 점",
        "   - 발표자 노트에 발표하면서 말할 내용 3~5문장",
        `4. 표지에는 제목과 함께 ${objective}임을 알 수 있는 한 줄 문장을 넣어 주세요.`,
        "5. 마무리 장에는 핵심 3가지와 남은 할 일을 정리해 주세요.",
        "6. 디자인이 필요하면 위에서 복사한 디자인 프롬프트를 이 프롬프트 뒤에 이어 붙여 주세요.",
        "",
        "결과는 장 번호를 붙여 슬라이드별로 나눠서 보여 주세요.",
      ].join("\n"),
  },
  {
    id: "step4",
    tabLabel: "4. 인포그래픽 완성",
    heading: "단계 4 · 인포그래픽 완성하기",
    explain: "인포그래픽 대본을 레이아웃·아이콘·숫자 강조가 정해진 결과물로 다듬어요.",
    build: (audience, objective) =>
      [
        "2단계에서 뽑은 인포그래픽 대본을 바탕으로, 한 장짜리 인포그래픽을 완성해 주세요.",
        "",
        `- 관객: ${audience}`,
        `- 목적: ${objective}`,
        "",
        "부탁하는 방법:",
        "1. 화면 구성을 먼저 정해 주세요. 예: 위에서 아래로 흐르는 구성, 왼쪽에서 오른쪽으로 읽는 구성, 가운데서 퍼지는 구성.",
        "2. 큰 숫자는 눈에 띄게 크게, 단위와 함께 보여 주세요.",
        "3. 아이콘은 각 블록의 뜻이 바로 이해되는 것으로 골라 주세요.",
        "4. 색은 세 가지 이하로 줄이고, 강조할 한 가지 색만 진하게 써 주세요.",
        `5. ${audience}이(가) 10초 안에 큰 흐름을 알 수 있게 글자 수를 줄여 주세요.`,
        "6. 숫자에는 출처가 필요하면 작게 표시해 주세요.",
        "",
        '노트북LM 업로드 자료에 없는 숫자는 만들지 말고, 찾을 수 없으면 "숫자 확인 필요"라고 적어 주세요.',
      ].join("\n"),
  },
];

const STEP_TABS = STEP_DEFS.map((step) => ({ id: step.id, label: step.tabLabel }));

/* ---------- ① 테마 카드 ---------- */

function MiniSlide({ theme }: { theme: SlideTheme }) {
  return (
    <div
      className={`slides-preview${theme.band === "top" ? " slides-preview-top" : ""}`}
      style={{ background: theme.bg }}
    >
      <div
        className={`slides-preview-band${theme.band === "top" ? " slides-preview-band-top" : ""}`}
        style={{ background: theme.main }}
        aria-hidden="true"
      />
      <div className="slides-preview-body" aria-hidden="true">
        <div className="slides-preview-title" style={{ background: theme.ink }} />
        <div className="slides-preview-underline" style={{ background: theme.point }} />
        <div className="slides-preview-line" style={{ background: theme.ink, width: "88%", opacity: 0.45 }} />
        <div className="slides-preview-line" style={{ background: theme.ink, width: "70%", opacity: 0.3 }} />
        <div className="slides-preview-line" style={{ background: theme.sub, width: "52%", opacity: 0.9 }} />
        <div className="slides-preview-chip" style={{ background: theme.sub }} />
      </div>
    </div>
  );
}

function ThemeCard({ theme }: { theme: SlideTheme }) {
  const swatches = [
    { role: "메인", hex: theme.main },
    { role: "보조", hex: theme.sub },
    { role: "포인트", hex: theme.point },
    { role: "배경", hex: theme.bg },
    { role: "글자", hex: theme.ink },
  ];
  return (
    <article className="card card-hover slides-theme-card">
      <h3>{theme.name}</h3>
      <h4 className="slides-subhead">사용하는 색</h4>
      <ul className="slides-swatches">
        {swatches.map((swatch) => (
          <li key={swatch.role}>
            <span className="slides-swatch" style={{ background: swatch.hex }} aria-hidden="true" />
            <span className="slides-swatch-text">
              {swatch.role} {swatch.hex}
            </span>
          </li>
        ))}
      </ul>
      <h4 className="slides-subhead">이렇게 꾸며져요 (예시)</h4>
      <MiniSlide theme={theme} />
      <div className="card-cta">
        <CopyButton text={buildDesignPrompt(theme)} label="📋 디자인 프롬프트 복사" />
      </div>
    </article>
  );
}

/* ---------- 페이지 ---------- */

export default function SlidesPage() {
  const [expanded, setExpanded] = useState(false);
  const [audienceInput, setAudienceInput] = useState("");
  const [objectiveInput, setObjectiveInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const queryStep = searchParams.get("step");
  const foundStep = STEP_DEFS.find((step) => step.id === queryStep);
  const activeStep: StepId = foundStep ? foundStep.id : "step1";

  const audience = audienceInput.trim() || DEFAULT_AUDIENCE;
  const objective = objectiveInput.trim() || DEFAULT_OBJECTIVE;

  const visibleThemes = expanded ? THEMES : THEMES.slice(0, INITIAL_THEME_COUNT);
  const extraCount = THEMES.length - INITIAL_THEME_COUNT;

  function handleStepChange(id: string) {
    setSearchParams({ step: id });
  }

  return (
    <main className="container page">
      <PageHeader
        title="노트북LM 슬라이드 프롬프트"
        intro={
          <p>
            노트북LM에 올린 자료로 슬라이드·인포그래픽을 만들 때 쓰는 프롬프트예요. ①에서 디자인을 고르고,
            ②에서 단계별로 복사해 붙여 넣으면 돼요.
          </p>
        }
      />

      <section className="section" aria-labelledby="slides-design-heading">
        <h2 id="slides-design-heading">① 디자인 고르기</h2>
        <p className="slides-section-intro">
          마음에 드는 테마를 골라 프롬프트를 복사해요. 색 조합과 분위기를 노트북LM에 그대로 알려 줄 수
          있어요.
        </p>
        <div className="slides-theme-grid" id="slides-theme-grid">
          {visibleThemes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>
        <div className="slides-more-wrap">
          <button
            type="button"
            className="btn slides-more-btn"
            aria-expanded={expanded}
            aria-controls="slides-theme-grid"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "▲ 접기" : `▼ 더보기 (+${extraCount}개)`}
          </button>
        </div>
      </section>

      <section className="section" aria-labelledby="slides-steps-heading">
        <h2 id="slides-steps-heading">② 단계별 프롬프트 복사</h2>
        <p className="slides-section-intro">
          1번부터 4번까지 차례로 복사해 붙여 넣어요. 대상과 목적을 먼저 적으면 네 단계 모두에 같이 들어가요.
        </p>

        <div className="card slides-form">
          <div className="slides-form-grid">
            <label className="slides-field">
              <span className="slides-field-label">대상 (Target Audience)</span>
              <input
                type="text"
                value={audienceInput}
                placeholder="예: 초등 5~6학년"
                onChange={(event) => setAudienceInput(event.target.value)}
              />
            </label>
            <label className="slides-field">
              <span className="slides-field-label">목적 (Presentation Objective)</span>
              <input
                type="text"
                value={objectiveInput}
                placeholder="예: 단원 정리 발표"
                onChange={(event) => setObjectiveInput(event.target.value)}
              />
            </label>
          </div>
          <p className="footnote">
            비워 두면 기본값(대상 초등 5~6학년 · 목적 단원 정리 발표)으로 채워져요.
          </p>
        </div>

        <Tabs tabs={STEP_TABS} active={activeStep} onChange={handleStepChange} ariaLabel="단계별 프롬프트" />

        {STEP_DEFS.map((step, index) => {
          const promptText = step.build(audience, objective);
          const next = STEP_DEFS[index + 1];
          return (
            <div
              key={step.id}
              role="tabpanel"
              id={`panel-${step.id}`}
              aria-labelledby={`tab-${step.id}`}
              hidden={step.id !== activeStep}
            >
              <div className="card slides-step-card">
                <h3>{step.heading}</h3>
                <p>{step.explain}</p>
                <div className="prompt-block">
                  <div className="prompt-head">
                    <strong>프롬프트 미리보기</strong>
                    <CopyButton text={promptText} label="📋 전체 복사" />
                  </div>
                  <pre>{promptText}</pre>
                </div>
                <div className="slides-step-actions">
                  {next ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleStepChange(next.id)}
                    >
                      다음 단계 →
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleStepChange("step1")}
                    >
                      처음으로 →
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
