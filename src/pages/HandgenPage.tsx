import { useState } from "react";
import Card from "../components/Card";
import CopyButton from "../components/CopyButton";
import PageHeader from "../components/PageHeader";
import Tabs from "../components/Tabs";
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

const CLOCK_ORDER = `# 시계 읽기 학습 사이트 작업지시서 (초등 3~4학년 수학)

초등 3~4학년 학생이 혼자 읽고 따라 할 수 있는 '시계 읽기' 학습 사이트를 만들어 주세요.
세로로 스크롤되는 한 페이지 사이트이고, 위에서부터 ① 개념 설명 → ② 시계 시뮬레이션 → ③ 퀴즈 순서로 이어져요.

## ① 개념 설명 섹션
- 시계 바늘의 역할을 초등학생 눈높이 문장으로 설명해 주세요. 짧고 굵은 바늘이 시침, 길고 얇은 바늘이 분침이에요.
- "시침이 숫자 3을 조금 지나면 3시예요. 분침이 숫자 3을 가리키면 15분이에요."처럼 바늘과 숫자를 이어 주세요.
- 분침이 한 칸 움직일 때마다 5분씩 커진다는 규칙을 표로 정리해 주세요.
- 시계는 CSS나 SVG로 단순하게 그려 주세요. 이미지 파일은 쓰지 않아요.

## ② 시계 시뮬레이션 섹션
- 슬라이더 두 개로 '시'와 '분'을 조절하고, 시침·분침이 실제 시계처럼 함께 움직이게 해 주세요.
- 슬라이더를 움직이면 옆에 "3시 15분"처럼 시각이 글자로 함께 보여요.
- 분이 60분이 되면 시침이 한 시간씩 넘어가도록 해 주세요.
- 시뮬레이션 옆에 "분침을 3까지 옮겨 보세요." 같은 안내 문구를 넣어 주세요.

## ③ 퀴즈 섹션
- 문제는 세 개: 시계 그림을 보고 시각을 고르는 객관식 한 개, "3시 15분"처럼 주어진 시각을 슬라이더로 맞히는 문제 한 개, OX 문제 한 개.
- 답을 고르면 정답·오답을 바로 보여 주고, 해설을 문제마다 한 줄씩 달아 주세요.
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
- [ ] 슬라이더를 움직이면 시침·분침·시각 글자가 한 값에서 함께 움직여요.
- [ ] 퀴즈 정답과 해설이 수학적으로 맞아요.

시작하기 전에 사이트 구조(섹션 순서와 컴포넌트 이름)를 먼저 보여 주고, 제 확인을 받은 다음에 코드를 만들어 주세요.`;

const WATER_ORDER = `# 물의 상태 변화 학습 사이트 작업지시서 (초등 3~4학년 과학)

초등 3~4학년 학생이 혼자 읽고 따라 할 수 있는 '물의 상태 변화' 학습 사이트를 만들어 주세요.
세로로 스크롤되는 한 페이지 사이트이고, 위에서부터 ① 개념 카드 → ② 입자 시뮬레이션 → ③ 퀴즈 순서로 이어져요.

## ① 개념 카드 섹션
- 융해·응고·기화·응결 네 가지 변화를 카드 네 장으로 정리해 주세요. 카드마다 "얼음이 녹아 물이 돼요" 같은 한 문장 예시를 달아 주세요.
- 각 카드에는 온도가 올라가는지 내려가는지 화살표로 함께 표시해 주세요.
- 물·얼음·수증기는 CSS나 SVG로 단순하게 그려 주세요. 이미지 파일은 쓰지 않아요.

## ② 입자 시뮬레이션 섹션
- 슬라이더 하나로 온도를 -10℃부터 120℃까지 조절하게 해 주세요.
- 온도에 따라 얼음(0℃ 아래) → 물(0~100℃) → 수증기(100℃ 위) 순서로 상태가 바뀌게 해 주세요.
- 물 입자를 작은 동그라미로 그려 주세요. 얼음일 때는 꽉 붙어 조금씩 흔들리고, 물일 때는 가까이 떠다니고, 수증기일 때는 넓게 빠르게 퍼지게 해 주세요.
- 애니메이션은 canvas나 DOM으로 만들고 requestAnimationFrame을 써 주세요. 입자 움직임과 온도 숫자는 같은 값에서 나오게 해 주세요.
- 시뮬레이션 옆에 "온도를 천천히 올려 보세요. 입자가 어떻게 달라지나요?" 같은 안내 문구를 넣어 주세요.

## ③ 퀴즈 섹션
- 문제는 세 개: OX 문제 한 개, 보기 네 개인 객관식 두 개.
- 답을 고르면 정답·오답을 바로 보여 주고, 해설을 문제마다 한 줄씩 달아 주세요.
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
- [ ] 슬라이더 온도와 입자 움직임·상태 표시가 한 값에서 함께 바뀌어요.
- [ ] 융해·응고·기화·응결 설명과 퀴즈 정답이 과학적으로 맞아요.

시작하기 전에 사이트 구조(섹션 순서와 컴포넌트 이름)를 먼저 보여 주고, 제 확인을 받은 다음에 코드를 만들어 주세요.`;

const PHOTOSYNTHESIS_ORDER = `# 광합성 학습 사이트 작업지시서 (중학교 1학년 과학)

중학교 1학년 학생이 혼자 읽고 따라 할 수 있는 '광합성' 학습 사이트를 만들어 주세요.
세로로 스크롤되는 한 페이지 사이트이고, 위에서부터 ① 개념 설명 → ② 광합성 시뮬레이션 → ③ 퀴즈 순서로 이어져요.

## ① 개념 설명 섹션
- 광합성이 무엇인지 중학생 눈높이 문장으로 설명해 주세요. 빛 에너지로 이산화탄소와 물을 재료로 삼아 산소와 포도당을 만드는 일이에요.
- 광합성 식을 크게 보여 주세요. "이산화탄소 + 물 →(빛 에너지·엽록체)→ 포도당 + 산소"처럼 화살표 위에 조건을 적어 주세요.
- 잎의 기공과 엽록체는 CSS나 SVG로 단순하게 그려 주세요. 이미지 파일은 쓰지 않아요.
- 광합성과 호흡의 차이를 표 하나로 비교해 주세요. (재료, 결과물, 언제 일어나는지)

## ② 광합성 시뮬레이션 섹션
- 슬라이더 세 개로 '빛 세기', '이산화탄소 양', '물 양'을 조절하게 해 주세요.
- 세 슬라이더 값에 따라 산소와 포도당 생성량이 함께 바뀌게 해 주세요. 값이 부족하면 생성량도 줄고, 충분하면 최대가 돼요.
- 슬라이더 옆에 막대그래프와 숫자로 생성량을 함께 보여 주세요.
- 애니메이션은 canvas나 DOM으로 만들고 requestAnimationFrame을 써 주세요. 그래프와 숫자는 같은 값에서 나오게 해 주세요.
- 시뮬레이션 옆에 "빛 세기를 올려 보세요. 산소가 늘어나나요?" 같은 안내 문구를 넣어 주세요.

## ③ 퀴즈 섹션
- 문제는 세 개: OX 문제 한 개, 보기 네 개인 객관식 두 개.
- 답을 고르면 정답·오답을 바로 보여 주고, 중학생이 읽을 수 있는 해설을 문제마다 한 줄씩 달아 주세요.
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
- [ ] 세 슬라이더 값과 생성량 그래프·숫자가 한 값에서 함께 움직여요.
- [ ] 광합성 식과 퀴즈 정답·해설이 과학적으로 맞아요.

시작하기 전에 사이트 구조(섹션 순서와 컴포넌트 이름)를 먼저 보여 주고, 제 확인을 받은 다음에 코드를 만들어 주세요.`;

const LINEAR_ORDER = `# 일차함수 그래프 학습 사이트 작업지시서 (중학교 2~3학년 수학)

중학교 2~3학년 학생이 혼자 읽고 따라 할 수 있는 '일차함수 그래프' 학습 사이트를 만들어 주세요.
세로로 스크롤되는 한 페이지 사이트이고, 위에서부터 ① 개념 정리 → ② 그래프 시뮬레이션 → ③ 퀴즈 순서로 이어져요.

## ① 개념 정리 섹션
- 일차함수 y = ax + b에서 기울기 a와 y절편 b가 그래프에서 무엇을 바꾸는지 중학생 눈높이 문장으로 설명해 주세요.
- "a가 커지면 그래프가 가팔라져요. b가 커지면 그래프가 위로 올라가요."처럼 직관적인 문장을 곁들여 주세요.
- 좌표평면과 그래프는 CSS나 SVG로 단순하게 그려 주세요. 이미지 파일은 쓰지 않아요.

## ② 그래프 시뮬레이션 섹션
- 슬라이더 두 개로 기울기 a와 y절편 b를 조절하게 해 주세요. (범위는 각각 -5부터 5까지, 0.5씩 움직여요)
- 슬라이더를 움직이면 y = ax + b 그래프가 좌표평면 위에서 실시간으로 다시 그려지게 해 주세요.
- 그래프 위에 y절편 점 (0, b)와 x절편 점을 함께 표시해 주세요.
- 시뮬레이션 옆에 "a를 음수로 바꿔 보세요. 그래프가 어떻게 기울어지나요?" 같은 안내 문구를 넣어 주세요.

## ③ 퀴즈 섹션
- 문제는 세 개: 좌표 찾기 문제 한 개(x = 2일 때 y = 3x + 1의 값), 그래프를 보고 식을 고르는 객관식 한 개, OX 문제 한 개.
- 답을 고르면 정답·오답을 바로 보여 주고, 중학생이 읽을 수 있는 해설을 문제마다 한 줄씩 달아 주세요.
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
- [ ] 슬라이더 a·b 값과 그래프·절편 점이 한 값에서 함께 움직여요.
- [ ] 퀴즈 정답과 해설이 수학적으로 맞아요.

시작하기 전에 사이트 구조(섹션 순서와 컴포넌트 이름)를 먼저 보여 주고, 제 확인을 받은 다음에 코드를 만들어 주세요.`;

type TemplateId = "handgen" | "clock" | "water" | "photosynthesis" | "linear";

const TEMPLATES = [
  {
    id: "handgen" as const,
    tabLabel: "손발전기 · 초등 과학",
    name: "손발전기 학습 사이트",
    explain:
      "초등 5~6학년 과학 전기 단원이에요. 손으로 돌리면 전기가 만들어지는 발전기 원리를 다뤄요.",
    order: WORK_ORDER,
    file: "handgen-work-order.md",
  },
  {
    id: "clock" as const,
    tabLabel: "시계 읽기 · 초등 수학",
    name: "시계 읽기 학습 사이트",
    explain:
      "초등 3~4학년 수학 '시와 시간' 단원이에요. 시침·분침을 직접 움직이며 5분 단위 시각을 읽어요.",
    order: CLOCK_ORDER,
    file: "handgen-clock-work-order.md",
  },
  {
    id: "water" as const,
    tabLabel: "물의 상태 변화 · 초등 과학",
    name: "물의 상태 변화 학습 사이트",
    explain:
      "초등 3~4학년 과학 '물의 상태 변화' 단원이에요. 온도 슬라이더로 얼음·물·수증기의 입자를 직접 관찰해요.",
    order: WATER_ORDER,
    file: "handgen-water-work-order.md",
  },
  {
    id: "photosynthesis" as const,
    tabLabel: "광합성 · 중학 과학",
    name: "광합성 학습 사이트",
    explain:
      "중학교 1학년 과학 '광합성과 호흡' 단원이에요. 빛·이산화탄소·물을 조절하며 생성량의 변화를 봐요.",
    order: PHOTOSYNTHESIS_ORDER,
    file: "handgen-photosynthesis-work-order.md",
  },
  {
    id: "linear" as const,
    tabLabel: "일차함수 · 중등 수학",
    name: "일차함수 그래프 학습 사이트",
    explain:
      "중학교 2~3학년 수학 '일차함수' 단원이에요. 기울기 a와 y절편 b를 움직이며 그래프의 변화를 봐요.",
    order: LINEAR_ORDER,
    file: "handgen-linear-work-order.md",
  },
];

const TEMPLATE_TABS = TEMPLATES.map((template) => ({
  id: template.id,
  label: template.tabLabel,
}));

function initialOrders(): Record<TemplateId, string> {
  return {
    handgen: WORK_ORDER,
    clock: CLOCK_ORDER,
    water: WATER_ORDER,
    photosynthesis: PHOTOSYNTHESIS_ORDER,
    linear: LINEAR_ORDER,
  };
}

export default function HandgenPage() {
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>("handgen");
  const [orders, setOrders] = useState<Record<TemplateId, string>>(initialOrders);
  const [done, setDone] = useState<boolean[]>(() => CHECK_ITEMS.map(() => false));
  const doneCount = done.filter(Boolean).length;

  const order = orders[activeTemplate];
  const active =
    TEMPLATES.find((template) => template.id === activeTemplate) ?? TEMPLATES[0];

  function handleTemplateChange(id: string) {
    const found = TEMPLATES.find((template) => template.id === id);
    if (found) setActiveTemplate(found.id);
  }

  function handleOrderChange(value: string) {
    setOrders((prev) => ({ ...prev, [activeTemplate]: value }));
  }

  function toggleCheck(index: number) {
    setDone((prev) => prev.map((value, i) => (i === index ? !value : value)));
  }

  function downloadMarkdown() {
    const blob = new Blob([order], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = active.file;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }

  return (
    <main className="container page">
      <PageHeader
        title="학습 사이트 만들기 레퍼런스"
        intro="AI와 함께 학습 사이트를 만드는 방법을 안내해요. 교과별 예시 다섯 종(손발전기·시계 읽기·물의 상태 변화·광합성·일차함수)의 작업지시서와 단계별 확인표가 있어요."
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
        <p>{active.explain}</p>
        <Tabs
          tabs={TEMPLATE_TABS}
          active={activeTemplate}
          onChange={handleTemplateChange}
          ariaLabel="작업지시서 템플릿"
        />
        <div
          role="tabpanel"
          id={`panel-${activeTemplate}`}
          aria-labelledby={`tab-${activeTemplate}`}
        >
          <Card>
            <p>
              {active.name}을 부탁하는 지시서예요. 학급 상황에 맞게 고친 뒤 AI에게
              붙여 넣어요. 슬라이더 범위나 문제 수는 직접 바꿔도 돼요.
            </p>
            <label className="visually-hidden" htmlFor="handgen-order-text">
              작업지시서 본문 편집
            </label>
            <textarea
              id="handgen-order-text"
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
