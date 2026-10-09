import { useState } from "react";
import Card from "../components/Card";
import CopyButton from "../components/CopyButton";
import PageHeader from "../components/PageHeader";
import Tabs from "../components/Tabs";

const DODGE_ORDER = `# 피하기 게임 작업지시서

초등학생이 수업 시간에 바로 놀 수 있는 '피하기 게임'을 만들어 주세요.
캐릭터를 움직여 떨어지는 물체를 피하고, 오래 살아남으면 점수가 올라가는 게임이에요.

## ① 화면
- 게임 화면 하나로 끝나요. 위에서 물체가 떨어지고, 아래에 내 캐릭터가 있어요.
- 캐릭터와 떨어지는 물체는 CSS나 canvas로 단순하게 그려 주세요. 이미지 파일은 쓰지 않아요.
- 화면 위쪽에 지금 점수와 남은 목숨이 항상 보여요.
- 게임이 끝나면 화면 가운데에 점수와 '다시 하기' 버튼이 떠요.

## ② 조작
- 휴대폰에서는 화면을 왼쪽·오른쪽으로 끌어서 캐릭터를 움직여요.
- 컴퓨터에서는 키보드 화살표(←, →)로 움직여요.
- 조작은 눌린 순간 바로 반응해야 해요.

## ③ 규칙·점수
- 목숨은 세 개로 시작하고, 물체에 닿을 때마다 하나씩 줄어들어요. 목숨이 없으면 게임이 끝나요.
- 살아난 1초에 10점씩 점수가 올라가요.
- 게임이 끝나면 최고 점수를 함께 보여 주세요.

## ④ 난이도
- 처음 10초는 물체가 느리게 떨어져요.
- 시간이 지날수록 물체가 빨라지고 많아지게 해 주세요.
- 점프나 무적 아이템 같은 추가 기능은 넣지 마세요. 기본 규칙만 정확하게 만들어 주세요.

## 기술 스택
- HTML 단일 파일 하나로 만들어 주세요. 파일을 두 번 클릭하면 바로 실행돼요.
- 외부 라이브러리·외부 폰트·외부 이미지 없이 만들어 주세요.

## 디자인 톤
- 밝고 깨끗한 색을 써 주세요. 크림색 배경에 흰 카드, 파란색 포인트면 좋아요.
- 점수·안내 글씨는 18px 이상으로 크게, 문장은 짧게 써 주세요.
- 게임 시작 전에 "화살표로 움직여요!" 같은 안내 문구를 보여 주세요.

## 완성 조건 (모두 지켜 주세요)
- [ ] 모든 문구를 해요체로 써 주세요.
- [ ] 휴대폰 화면(390px)에서 터치로 잘 놀 수 있어요.
- [ ] 외부 네트워크 호출이 하나도 없어요. 파일을 열면 그대로 돌아가요.
- [ ] 물체에 닿으면 목숨이 정확히 줄고, 점수가 규칙대로 매겨져요.
- [ ] 아주 빠르게 연속으로 조작해도 오류가 나지 않아요.

시작하기 전에 게임 구조(화면·조작·규칙)를 먼저 보여 주고, 제 확인을 받은 다음에 코드를 만들어 주세요.`;

const CLICK_ORDER = `# 클릭 게임 작업지시서

초등학생이 수업 시간에 바로 놀 수 있는 '클릭 게임'을 만들어 주세요.
30초 동안 화면에 나타나는 목표물을 빠르게 눌러 점수를 모으는 게임이에요.

## ① 화면
- 게임 화면 하나로 끝나요. 목표물이 여기저기 나타났다 사라져요.
- 목표물은 CSS나 SVG로 단순하게 그려 주세요(동그라미, 별, 과일 등). 이미지 파일은 쓰지 않아요.
- 화면 위쪽에 남은 시간(초)과 점수가 항상 보여요.
- 게임이 끝나면 화면 가운데에 점수와 '다시 하기' 버튼이 떠요.

## ② 조작
- 목표물을 손가락이나 마우스로 정확히 누르면 점수가 올라가요.
- 목표물이 아닌 곳을 눌러도 점수가 그대로예요. (깎이지 않아요)
- 시작 버튼을 눌러야 게임이 시작돼요.

## ③ 규칙·점수
- 게임 시간은 30초예요. 시간이 끝나면 게임이 끝나요.
- 목표물을 하나 누를 때마다 10점이 올라가요.
- 누른 자리에서 작게 반짝이는 애니메이션이 일어나면 좋아요.
- 게임이 끝나면 최고 점수를 함께 보여 주세요.

## ④ 난이도
- 목표물은 2초 정도 머물다 사라져요.
- 점수가 올라갈수록 목표물이 조금씩 작아지고 빨리 사라지게 해 주세요.
- 폭탄처럼 누르면 안 되는 물체는 넣지 마세요. 기본 규칙만 정확하게 만들어 주세요.

## 기술 스택
- HTML 단일 파일 하나로 만들어 주세요. 파일을 두 번 클릭하면 바로 실행돼요.
- 외부 라이브러리·외부 폰트·외부 이미지 없이 만들어 주세요.

## 디자인 톤
- 밝고 깨끗한 색을 써 주세요. 크림색 배경에 흰 카드, 파란색 포인트면 좋아요.
- 점수·안내 글씨는 18px 이상으로 크게, 문장은 짧게 써 주세요.
- 게임 시작 전에 "나타나는 것을 빠르게 눌러요!" 같은 안내 문구를 보여 주세요.

## 완성 조건 (모두 지켜 주세요)
- [ ] 모든 문구를 해요체로 써 주세요.
- [ ] 휴대폰 화면(390px)에서 손가락으로 잘 누를 수 있어요.
- [ ] 외부 네트워크 호출이 하나도 없어요. 파일을 열면 그대로 돌아가요.
- [ ] 30초가 정확히 지켜지고, 점수가 규칙대로 매겨져요.
- [ ] 아주 빠르게 연속으로 눌러도 오류가 나지 않아요.

시작하기 전에 게임 구조(화면·조작·규칙)를 먼저 보여 주고, 제 확인을 받은 다음에 코드를 만들어 주세요.`;

const QUIZ_ORDER = `# 퀴즈 게임 작업지시서

초등학생이 수업 시간에 풀 수 있는 'OX 퀴즈 게임'을 만들어 주세요.
문제를 읽고 O 또는 X를 골라, 맞힐 때마다 점수를 모으는 게임이에요.

## ① 화면
- 문제 화면 하나로 끝나요. 위쪽에 문제 번호와 점수, 가운데에 문제, 아래에 O와 X 큰 버튼 두 개가 있어요.
- 답을 고르면 바로 정답·오답 색으로 알려 주고, 잠시 뒤에 다음 문제로 넘어가요.
- 마지막 문제가 끝나면 총점과 '다시 하기' 버튼이 떠요.

## ② 조작
- O 버튼 또는 X 버튼을 손가락이나 마우스로 눌러요.
- 키보드 O, X 키로도 답할 수 있게 해 주세요.
- 한 문제에 답은 한 번만 골라요. 고른 뒤에는 버튼이 잠겨요.

## ③ 규칙·점수
- 문제는 열 개: 정보교과(컴퓨터와 코딩) 문제로 채워 주세요.
- 맞힐 때마다 10점, 틀리면 0점이에요.
- 문제마다 한 줄 해설을 보여 주세요. (정답인 이유)
- 게임이 끝나면 최고 점수를 함께 보여 주세요.

## ④ 난이도
- 앞의 세 문제는 쉬운 문제, 가운데 네 문제는 보통, 뒤의 세 문제는 어려운 문제로 순서대로 배치해 주세요.
- 문제와 해설은 초등학생이 이해할 수 있는 문장으로 써 주세요.
- 시간 제한이나 목숨 같은 추가 규칙은 넣지 마세요. 기본 규칙만 정확하게 만들어 주세요.

## 기술 스택
- HTML 단일 파일 하나로 만들어 주세요. 파일을 두 번 클릭하면 바로 실행돼요.
- 외부 라이브러리·외부 폰트·외부 이미지 없이 만들어 주세요.

## 디자인 톤
- 밝고 깨끗한 색을 써 주세요. 크림색 배경에 흰 카드, 파란색 포인트면 좋아요.
- 문제 글씨는 20px 이상으로 크게, 문장은 짧게 써 주세요.
- 게임 시작 전에 "O 또는 X를 골라요!" 같은 안내 문구를 보여 주세요.

## 완성 조건 (모두 지켜 주세요)
- [ ] 모든 문구와 문제를 해요체로 써 주세요.
- [ ] 휴대폰 화면(390px)에서 버튼이 잘 눌려요.
- [ ] 외부 네트워크 호출이 하나도 없어요. 파일을 열면 그대로 돌아가요.
- [ ] 정답과 해설이 정보교과 내용에 맞아요.
- [ ] 아주 빠르게 연속으로 눌러도 점수가 두 번 오르지 않아요.

시작하기 전에 게임 구조(문제 흐름·버튼 배치)를 먼저 보여 주고, 제 확인을 받은 다음에 코드를 만들어 주세요.`;

type GenreId = "dodge" | "click" | "quiz";

const GENRES = [
  {
    id: "dodge" as const,
    tabLabel: "피하기 게임",
    explain:
      "캐릭터를 움직여 떨어지는 물체를 피하는 게임이에요. 조작과 난이도 조절을 배우기에 좋아요.",
    order: DODGE_ORDER,
  },
  {
    id: "click" as const,
    tabLabel: "클릭 게임",
    explain:
      "30초 동안 나타나는 목표물을 빠르게 눌러 점수를 모으는 게임이에요. 반응 속도와 타이머를 다뤄요.",
    order: CLICK_ORDER,
  },
  {
    id: "quiz" as const,
    tabLabel: "퀴즈 게임",
    explain:
      "문제를 읽고 O·X를 골라 점수를 모으는 게임이에요. 배운 내용을 문제로 내며 복습해요.",
    order: QUIZ_ORDER,
  },
];

const GAME_TABS = GENRES.map((genre) => ({ id: genre.id, label: genre.tabLabel }));

const FLOW_STEPS = [
  {
    title: "주제 정하기",
    desc: "장르 탭에서 어떤 게임을 만들지 골라요. 피하기, 클릭, 퀴즈 중 하나예요.",
  },
  {
    title: "AI에게 작업지시서 주기",
    desc: "작업지시서를 우리 반에 맞게 고쳐서 AI에게 붙여 넣어요.",
  },
  {
    title: "고치고 확인하기(디버깅)",
    desc: "만들어진 게임을 직접 놀아 보고, 이상한 곳을 짧게 부탁해요. 한 번에 다 고치려 하지 않아요.",
  },
  {
    title: "친구에게 공유하기",
    desc: "완성하면 md 파일로 남겨 두고, HTML 파일을 친구에게 보내 함께 놀아요.",
  },
] as const;

const CHECK_ITEMS = [
  "게임이 작업지시서의 규칙대로 작동하나요?",
  "화면을 누르거나 키를 누르면 바로 반응하나요?",
  "점수가 규칙과 똑같이 매겨지나요?",
  "휴대폰 화면(390px)에서도 잘 놀 수 있나요?",
  "아주 빠르게 연속으로 클릭해도 게임이 안 터지나요?",
  "외부 네트워크 호출이 없나요? 개발자 도구 Network 창으로 확인해요.",
  "난이도가 밸런스 있나요? 처음엔 쉽고 조금씩 어려워지나요?",
  "게임 안 문구가 모두 해요체인가요?",
  "오타와 띄어쓰기를 소리 내어 다시 읽어 봤나요?",
] as const;

function initialOrders(): Record<GenreId, string> {
  return {
    dodge: DODGE_ORDER,
    click: CLICK_ORDER,
    quiz: QUIZ_ORDER,
  };
}

function initialDone(): Record<GenreId, boolean[]> {
  return {
    dodge: CHECK_ITEMS.map(() => false),
    click: CHECK_ITEMS.map(() => false),
    quiz: CHECK_ITEMS.map(() => false),
  };
}

export default function GamegenPage() {
  const [activeGenre, setActiveGenre] = useState<GenreId>("dodge");
  const [orders, setOrders] = useState<Record<GenreId, string>>(initialOrders);
  const [done, setDone] = useState<Record<GenreId, boolean[]>>(initialDone);

  const order = orders[activeGenre];
  const checks = done[activeGenre];
  const doneCount = checks.filter(Boolean).length;
  const active = GENRES.find((genre) => genre.id === activeGenre) ?? GENRES[0];

  function handleOrderChange(value: string) {
    setOrders((prev) => ({ ...prev, [activeGenre]: value }));
  }

  function handleGenreChange(id: string) {
    const found = GENRES.find((genre) => genre.id === id);
    if (found) setActiveGenre(found.id);
  }

  function toggleCheck(index: number) {
    setDone((prev) => ({
      ...prev,
      [activeGenre]: prev[activeGenre].map((value, i) => (i === index ? !value : value)),
    }));
  }

  function downloadMarkdown() {
    const blob = new Blob([order], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `gamegen-${activeGenre}-work-order.md`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  return (
    <main className="container page">
      <PageHeader
        title="바이브코딩 게임 만들기"
        intro="AI와 함께 게임을 만드는 방법을 안내해요. 장르를 고르면 작업지시서가 나오고, 고칠 수 있어요."
      />

      <section className="section" aria-labelledby="gamegen-what">
        <h2 id="gamegen-what">이 페이지는 무엇인가요?</h2>
        <p>
          처음부터 완벽한 게임을 받으려 하지 않아요. 아래 네 단계를 한 바퀴 돌고,
          부족한 곳만 다시 부탁하는 방식으로 만들어요.
        </p>
        <ol className="flow-grid">
          {FLOW_STEPS.map((step, index) => (
            <li key={step.title} className="card flow-step">
              <h3>
                <span className="num-badge" aria-hidden="true">
                  {index + 1}
                </span>
                {step.title}
              </h3>
              <p>{step.desc}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section" aria-labelledby="gamegen-order">
        <h2 id="gamegen-order">작업지시서 (편집해서 복사하세요)</h2>
        <p>{active.explain}</p>
        <Tabs
          tabs={GAME_TABS}
          active={activeGenre}
          onChange={handleGenreChange}
          ariaLabel="게임 장르"
        />
        <div
          role="tabpanel"
          id={`panel-${activeGenre}`}
          aria-labelledby={`tab-${activeGenre}`}
        >
          <Card>
            <p>
              {active.tabLabel}을 부탁하는 지시서예요. 학급 상황에 맞게 고친 뒤 AI에게
              붙여 넣어요. 문제 수나 점수 규칙은 직접 바꿔도 돼요.
            </p>
            <label className="visually-hidden" htmlFor="gamegen-order-text">
              작업지시서 본문 편집
            </label>
            <textarea
              id="gamegen-order-text"
              className="order-textarea"
              value={order}
              spellCheck={false}
              onChange={(event) => handleOrderChange(event.target.value)}
            />
            <div className="order-actions">
              <CopyButton text={order} label="📋 복사하기" />
              <button type="button" className="btn" onClick={downloadMarkdown}>
                ⬇ md 파일 받기
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => handleOrderChange(active.order)}
              >
                원래대로
              </button>
              <span className="footnote order-count">{[...order].length}자</span>
            </div>
          </Card>
        </div>
      </section>

      <section className="section" aria-labelledby="gamegen-check">
        <h2 id="gamegen-check">단계별 확인표</h2>
        <p>
          AI가 다 만들었다고 끝이 아니에요. 아래 항목을 하나씩 눌러 가며 직접 확인해요.
        </p>
        <Card>
          <ul className="check-list check-items">
            {CHECK_ITEMS.map((item, index) => (
              <li
                key={item}
                className={checks[index] ? "check-item is-done" : "check-item"}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={checks[index]}
                    onChange={() => toggleCheck(index)}
                  />
                  <span className="check-label">{item}</span>
                </label>
              </li>
            ))}
          </ul>
          <p className="footnote check-progress">
            {doneCount}개 완료{doneCount === CHECK_ITEMS.length ? " — 이제 공유할 준비가 끝났어요." : ""}
          </p>
        </Card>
      </section>
    </main>
  );
}
