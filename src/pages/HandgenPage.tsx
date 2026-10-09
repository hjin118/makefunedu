import { useState } from "react";
import Card from "../components/Card";
import CopyButton from "../components/CopyButton";
import PageHeader from "../components/PageHeader";
import "./HandgenPage.css";

const WORK_ORDER = `# 손발전기 학습 사이트 작업지시서

초등 5~6학년 학생이 혼자 읽고 따라 할 수 있는 '손발전기' 학습 사이트를 만들어 주세요.
세로로 스크롤되는 한 페이지 사이트이고, 위에서부터 ① 개념 설명 → ② 실험 시뮬레이션 → ③ 퀴즈 순서로 이어져요.

## ① 개념 설명 섹션
- 손발전기 속 자기 유도 전동기가 '모터에서 발전기로' 다시 쓰이는 원리를 초등학생 눈높이 문장으로 설명해 주세요.
- "손으로 돌리면 코일 주변의 자기장이 변하고, 그 변화가 전기를 만들어요."라는 흐름으로 문단을 세 개 이내로 나눠 주세요.
- 코일·자석·LED는 CSS나 SVG로 단순하게 그려 주세요. 이미지 파일은 쓰지 않아요.
- 전기가 잘 안 생기는 조건도 한 줄 알려 주세요. (느리게 돌릴 때, 힘없이 돌릴 때)

## ② 실험 시뮬레이션 섹션
- 슬라이더 하나로 '돌리는 속도'를 조절하고, 속도에 따라 LED 밝기와 전압 숫자(V)가 함께 변하게 해 주세요.
- 느리게 돌리면 0.5V 아래로 떨어지고, 빠르게 돌리면 3V까지 올라가게 해 주세요.
- 회전하는 코일 애니메이션은 canvas나 DOM으로 만들고 requestAnimationFrame을 써 주세요. 애니메이션 속도와 전압 숫자는 같은 값에서 나오게 해 주세요.
- 시뮬레이션 옆에 "크게 빙글빙글 돌려 봐요." 같은 안내 문구를 넣어 주세요.

## ③ 퀴즈 섹션
- 문제는 세 개: OX 문제 한 개, 보기 네 개인 객관식 두 개.
- 답을 고르면 정답·오답을 바로 보여 주고, 초등학생이 읽을 수 있는 해설을 문제마다 한 줄씩 달아 주세요.
- '다시 풀기' 버튼으로 처음으로 돌아갈 수 있게 해 주세요.

## 기술 스택
- Vite + React + TypeScript, 또는 HTML 단일 파일 중 하나로 만들어 주세요.
- 외부 라이브러리·외부 폰트·외부 이미지 없이 만들어 주세요.

## 디자인 톤
- 밝고 깨끗한 색을 써 주세요. 크림색 배경에 흰 카드, 파란색 포인트면 좋아요.
- 본문 글씨는 18px 이상으로 크게, 문장은 짧게 써 주세요.
- 화면마다 학생에게 말을 거는 안내 문구를 넣어 주세요.

## 완성 조건 (모두 지켜 주세요)
- [ ] 모든 문장을 해요체로 써 주세요.
- [ ] 휴대폰 화면(390px)에서도 세로로 잘 읽혀요.
- [ ] 외부 네트워크 호출이 하나도 없어요. 파일을 열면 그대로 돌아가요.
- [ ] 시뮬레이션의 전압 숫자·LED 밝기·애니메이션이 한 값에서 함께 움직여요.
- [ ] 퀴즈 정답과 해설이 과학적으로 맞아요.

시작하기 전에 사이트 구조(섹션 순서와 컴포넌트 이름)를 먼저 보여 주고, 제 확인을 받은 다음에 코드를 만들어 주세요.`;

const FLOW_STEPS = [
  {
    title: "주제 정하기",
    desc: "학생이 무엇을 배울지 한 문장으로 정해요. 예: '손발전기로 전기가 만들어지는 원리 이해하기'.",
  },
  {
    title: "AI에게 작업지시서 주기",
    desc: "아래 작업지시서를 우리 학급에 맞게 고쳐서 AI에게 붙여 넣어요.",
  },
  {
    title: "고치고 확인하기",
    desc: "나온 사이트를 직접 열어 보고, 고칠 곳을 짧게 부탁해요. 한 번에 다 고치려 하지 않아요.",
  },
  {
    title: "내보내기",
    desc: "완성하면 md 파일로 남겨 두고, 코드를 받아 학급 컴퓨터·QR로 배포해요.",
  },
] as const;

const CHECK_ITEMS = [
  "개념 설명을 처음 읽는 학생도 이해할 수 있나요?",
  "시뮬레이션이 실제 발전기 원리와 맞나요? (빠르게 돌리면 전압이 올라가나요?)",
  "LED 밝기와 전압 숫자가 함께 변하나요?",
  "퀴즈 정답과 해설이 과학적으로 맞나요?",
  "모든 문장이 해요체인가요?",
  "휴대폰 화면(390px)에서 글이 잘리거나 넘치지 않나요?",
  "버튼과 슬라이더를 아주 빠르게 움직여도 오류가 없나요?",
  "외부 네트워크 호출이 없나요? 개발자 도구 Network 창으로 확인해요.",
  "오타와 띄어쓰기를 소리 내어 다시 읽어 봤나요?",
] as const;

export default function HandgenPage() {
  const [order, setOrder] = useState<string>(WORK_ORDER);
  const [done, setDone] = useState<boolean[]>(() => CHECK_ITEMS.map(() => false));
  const doneCount = done.filter(Boolean).length;

  function toggleCheck(index: number) {
    setDone((prev) => prev.map((value, i) => (i === index ? !value : value)));
  }

  function downloadMarkdown() {
    const blob = new Blob([order], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "handgen-work-order.md";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  return (
    <main className="container page">
      <PageHeader
        title="학습 사이트 만들기 레퍼런스"
        intro="AI와 함께 학습 사이트를 만드는 방법을 안내해요. 편집해서 복사할 수 있는 작업지시서와 단계별 확인표가 있어요."
      />

      <section className="section" aria-labelledby="handgen-what">
        <h2 id="handgen-what">이 페이지는 무엇인가요?</h2>
        <p>
          처음부터 완벽한 사이트를 받으려 하지 않아요. 아래 네 단계를 한 바퀴 돌고,
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

      <section className="section" aria-labelledby="handgen-order">
        <h2 id="handgen-order">작업지시서 (편집해서 복사하세요)</h2>
        <Card>
          <p>
            손발전기 학습 사이트를 부탁하는 지시서예요. 학급 상황에 맞게 고친 뒤 AI에게
            붙여 넣어요. 급수나 문제 수는 직접 바꿔도 돼요.
          </p>
          <label className="visually-hidden" htmlFor="handgen-order-text">
            작업지시서 본문 편집
          </label>
          <textarea
            id="handgen-order-text"
            className="order-textarea"
            value={order}
            spellCheck={false}
            onChange={(event) => setOrder(event.target.value)}
          />
          <div className="order-actions">
            <CopyButton text={order} label="📋 복사하기" />
            <button type="button" className="btn" onClick={downloadMarkdown}>
              ⬇ md 파일 받기
            </button>
            <button type="button" className="btn" onClick={() => setOrder(WORK_ORDER)}>
              원래대로
            </button>
            <span className="footnote order-count">{[...order].length}자</span>
          </div>
        </Card>
      </section>

      <section className="section" aria-labelledby="handgen-check">
        <h2 id="handgen-check">단계별 확인표</h2>
        <p>
          AI가 다 만들었다고 끝이 아니에요. 아래 항목을 하나씩 눌러 가며 직접 확인해요.
        </p>
        <Card>
          <ul className="check-list check-items">
            {CHECK_ITEMS.map((item, index) => (
              <li
                key={item}
                className={done[index] ? "check-item is-done" : "check-item"}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={done[index]}
                    onChange={() => toggleCheck(index)}
                  />
                  <span className="check-label">{item}</span>
                </label>
              </li>
            ))}
          </ul>
          <p className="footnote check-progress">
            {doneCount}개 완료{doneCount === CHECK_ITEMS.length ? " — 이제 내보낼 준비가 끝났어요." : ""}
          </p>
        </Card>
      </section>
    </main>
  );
}
