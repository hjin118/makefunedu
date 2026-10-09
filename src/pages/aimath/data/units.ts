// 인공지능 수학 — 대단원 5개 · AI랩 캐릭터 데이터

export type UnitId = "u1" | "u2" | "u3" | "u4" | "u5";
export type Level = "쉬움" | "보통" | "어려움";
export type SectionHash = "intro" | "concepts" | "experience" | "problems";

export type Lesson = {
  title: string;
  desc: string;
  gotoHash: SectionHash;
  gotoLabel: string;
};

export type Concept = {
  term: string;
  en: string;
  def: string;
};

export type ChoiceProblem = {
  kind: "choice";
  level: Level;
  title: string;
  question: string;
  choices: readonly string[];
  answerIndex: number;
  hint: string;
  explanation: string;
};

export type NumberProblem = {
  kind: "number";
  level: Level;
  title: string;
  question: string;
  answer: number;
  unitLabel?: string;
  tolerance?: number;
  hint: string;
  explanation: string;
};

export type Problem = ChoiceProblem | NumberProblem;

export type Unit = {
  id: UnitId;
  roman: string;
  icon: string;
  title: string;
  short: string;
  intro: readonly string[];
  story: string;
  lessons: readonly Lesson[];
  concepts: readonly Concept[];
  problems: readonly Problem[];
};

export type Character = {
  name: string;
  emoji: string;
  role: string;
  desc: string;
};

export const CHARACTERS: readonly Character[] = [
  {
    name: "도하",
    emoji: "👦",
    role: "반장",
    desc: "이야기를 이끌어요. 궁금한 걸 참지 못하고 쪽지를 돌려요.",
  },
  {
    name: "하람",
    emoji: "💻",
    role: "개발자",
    desc: "체험 도구를 만들어요. '숫자로 바꾸면 다 보인다'가 좌우명이에요.",
  },
  {
    name: "세림",
    emoji: "📐",
    role: "수학 좋아하는 친구",
    desc: "개념을 정리해요. 어려운 말을 한 줄로 바꾸는 실력이에요.",
  },
  {
    name: "비티",
    emoji: "🤖",
    role: "로봇",
    desc: "질문에 답해요. 배우는 걸 좋아하는 새봄고 AI랩의 로봇이에요.",
  },
];

export const UNITS: readonly Unit[] = [
  {
    id: "u1",
    roman: "Ⅰ",
    icon: "🧠",
    title: "인공지능과 빅데이터",
    short: "데이터가 왜 인공지능의 밥이 되는지 알아봐요.",
    intro: [
      "인공지능은 거대한 데이터 속에서 규칙을 찾아 배워요. 이 단원에서는 데이터가 어떻게 모이고, 왜 커다란 데이터가 힘을 갖는지 배워요.",
      "마지막에는 과일 열두 개를 두 그룹으로 나눠 보며 '분류'의 원리를 몸으로 느껴요.",
    ],
    story:
      "점심시간, 도하가 AI랩 문 앞에 과일 상자를 내려놓았어요. '비티가 과일을 좋아하는지 시험해 보자!' 세림이 상자를 들여다보니 사과부터 파인애플까지 열두 가지 과일이 가지런히 담겨 있었어요. 하람이가 눈을 반짝였어요. '컴퓨터한테는 이 과일들이 전부 숫자로 보일 거야. 무게랑 빨간 정도로 나눠 볼까?' 비티가 조심스럽게 물었어요. '그럼 저는 어떻게 두 그룹으로 나누면 되나요?' 오늘 우리가 해 주할 답이 바로 이 단원의 수학이에요.",
    lessons: [
      {
        title: "데이터는 어디에 있나요",
        desc: "하루 동안 내가 만드는 데이터를 찾아봐요.",
        gotoHash: "intro",
        gotoLabel: "이야기부터",
      },
      {
        title: "빅데이터의 세 가지 얼굴, 3V",
        desc: "규모·속도·다양성이 왜 중요한지 배워요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
      {
        title: "분류와 예측",
        desc: "인공지능이 하는 두 가지 일을 구분해요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
      {
        title: "학습용과 검증용 데이터",
        desc: "실력 시험은 처음 보는 데이터로 해요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
      {
        title: "과일 상자를 나눠요",
        desc: "무게와 빨간 정도로 두 그룹을 만들어요.",
        gotoHash: "experience",
        gotoLabel: "체험하기",
      },
    ],
    concepts: [
      {
        term: "빅데이터",
        en: "Big data",
        def: "규모가 크고 빠르게 늘어나며 종류가 다양한 데이터를 말해요.",
      },
      {
        term: "3V",
        en: "Three Vs",
        def: "규모(Volume)·속도(Velocity)·다양성(Variety). 빅데이터를 가늠하는 세 가지 잣대예요.",
      },
      {
        term: "데이터",
        en: "Data",
        def: "관찰하거나 기록한 사실이에요. 컴퓨터가 배우는 재료예요.",
      },
      {
        term: "분류",
        en: "Classification",
        def: "정해진 몇 개의 묶음 중 하나를 골라 붙여 주는 일이에요. 스팸 메일 가리기가 예예요.",
      },
      {
        term: "예측",
        en: "Prediction",
        def: "값을 수로 헤아려 맞혀 보는 일이에요. 내일 매출량 맞히기가 예예요.",
      },
      {
        term: "정확도",
        en: "Accuracy",
        def: "전체 중에서 바르게 맞힌 비율이에요. 맞은 개수 ÷ 전체 개수로 구해요.",
      },
      {
        term: "학습·검증 데이터",
        en: "Training / Test data",
        def: "모델을 가르칠 데이터와 실력을 시험할 데이터를 나눠 쓰는 것을 말해요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "3V 고르기",
        question: "다음 중 빅데이터의 특징 3V로 볼 수 없는 것은 무엇일까요?",
        choices: ["규모(Volume)", "속도(Velocity)", "다양성(Variety)", "색상(Color)"],
        answerIndex: 3,
        hint: "3V는 규모·속도·다양성이었어요. 색은 어디에도 없죠?",
        explanation:
          "3V는 규모(Volume)·속도(Velocity)·다양성(Variety)이에요. 색상은 빅데이터를 가늠하는 잣대가 아니에요.",
      },
      {
        kind: "choice",
        level: "보통",
        title: "분류일까요, 예측일까요",
        question:
          "메일이 '스팸인지 아닌지'를 가려내는 일은 분류와 예측 중 무엇일까요?",
        choices: ["분류", "예측", "둘 다 아니에요"],
        answerIndex: 0,
        hint: "정해진 이름표 중 하나를 골라 붙이는 일을 떠올려요.",
        explanation:
          "스팸/정상처럼 정해진 묶음 중 하나를 고르는 일은 분류예요. 예측은 수 값을 맞히는 일이에요.",
      },
      {
        kind: "number",
        level: "어려움",
        title: "정확도 계산",
        question:
          "하람이의 규칙이 과일 12개 중 9개를 바르게 나눴어요. 정확도는 몇 %인가요?",
        answer: 75,
        unitLabel: "%",
        hint: "정확도 = 맞은 개수 ÷ 전체 개수 × 100.",
        explanation: "9 ÷ 12 × 100 = 75(%)예요. 체험 활동의 점수와 같은 계산이에요.",
      },
    ],
  },
  {
    id: "u2",
    roman: "Ⅱ",
    icon: "💬",
    title: "텍스트 데이터 처리",
    short: "말과 글을 숫자로 바꿔서 패턴을 찾아요.",
    intro: [
      "사람의 말은 컴퓨터에게 낯선 문자의 나열이에요. 이 단원에서는 문장을 잘게 쪼개고, 단어의 개수를 세고, 글에 담긴 기분을 읽는 방법을 배워요.",
      "직접 문장을 넣어 분석해 보며 텍스트 처리의 원리를 느껴요.",
    ],
    story:
      "방과 후 AI랩, 비티의 화면에 쪽지 한 장이 떴어요. '비티, 요즘 애들 기분은 어때?' 도하가 반 친구들의 쪽지 로그를 가져왔어요. 세림이가 고개를 갸웃했어요. '컴퓨터는 글자를 읽을 수 없잖아. 어떻게 분석하지?' 하람이가 씩 웃으며 의자를 돌렸어요. '글자를 잘게 쪼개서 숫자로 바꾸면 돼. 토큰화라고 해!' 비티가 눈을 반짝였어요. '저도 친구들의 메시지를 읽고 싶어요!' 오늘의 수업은 바로 여기서 시작돼요.",
    lessons: [
      {
        title: "메시지 분석기 써 보기",
        desc: "문장을 넣어 직접 토큰화·빈도 분석을 해요.",
        gotoHash: "experience",
        gotoLabel: "체험하기",
      },
      {
        title: "말을 숫자로, 토큰화",
        desc: "문장을 단어 조각으로 쪼개는 첫걸음이에요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
      {
        title: "형태소, 가장 작은 뜻 단위",
        desc: "'은' '를' 같은 조사를 떼어 내요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
      {
        title: "단어 빈도 세기",
        desc: "어떤 단어가 자주 나오는지 세어 봐요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
      {
        title: "감성 분석",
        desc: "글에 담긴 기분을 긍정·부정으로 읽어요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
    ],
    concepts: [
      {
        term: "토큰화",
        en: "Tokenization",
        def: "문장을 잘게 쪼개어 다루는 단위로 나누는 일이에요.",
      },
      {
        term: "토큰",
        en: "Token",
        def: "토큰화로 쪼개진 조각이에요. 대체로 한 단어 덩어리와 대응해요.",
      },
      {
        term: "형태소",
        en: "Morpheme",
        def: "뜻을 가진 가장 작은 말의 단위예요. '책'과 '을'은 각각 하나의 형태소예요.",
      },
      {
        term: "빈도 분석",
        en: "Frequency analysis",
        def: "단어가 몇 번 나오는지 세어 중요한 단어를 찾는 일이에요.",
      },
      {
        term: "불용어",
        en: "Stopword",
        def: "너무 자주 나와서 정보가 별로 없는 말이에요. '이', '그' 같은 말이 예예요.",
      },
      {
        term: "감성 분석",
        en: "Sentiment analysis",
        def: "글이 긍정인지 부정인지 판단하는 일이에요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "조사 떼기",
        question: "'세림이는 책을 읽어요'에서 조사를 떼어 내면 남는 말은 무엇일까요?",
        choices: ["세림, 책, 읽어요", "세림이는, 책을, 읽어요", "세림이, 책, 읽다", "읽어요"],
        answerIndex: 0,
        hint: "'은'과 '을'이 조사예요.",
        explanation:
          "'세림이는'에서 '는'을, '책을'에서 '을'을 떼면 '세림, 책, 읽어요'가 남아요.",
      },
      {
        kind: "number",
        level: "보통",
        title: "빈도 세기",
        question: "문장 '쿠키 쿠키 초코 쿠키'에서 단어 '쿠키'는 몇 번 나올까요?",
        answer: 3,
        unitLabel: "번",
        hint: "단어를 하나씩 짚어 가며 세어 보세요.",
        explanation: "'쿠키'가 세 번, '초코'가 한 번 나와요. '쿠키'의 빈도는 3이에요.",
      },
      {
        kind: "number",
        level: "어려움",
        title: "긍정 비율",
        question: "리뷰 8개 중 긍정 5개, 부정 3개였어요. 긍정은 몇 %인가요?",
        answer: 62.5,
        unitLabel: "%",
        hint: "5 ÷ 8 × 100을 계산해요.",
        explanation: "5 ÷ 8 × 100 = 62.5(%)예요.",
      },
    ],
  },
  {
    id: "u3",
    roman: "Ⅲ",
    icon: "👁️",
    title: "이미지 데이터 처리",
    short: "그림이 어떻게 숫자가 되는지 밝혀요.",
    intro: [
      "컴퓨터에게 사진은 수백만 개의 숫자 표예요. 이 단원에서는 그림이 픽셀과 밝기로 바뀌는 과정을 배워요.",
      "8×8 칸을 직접 칠하며 밝기 평균과 이진화를 몸으로 익혀요.",
    ],
    story:
      "AI랩 책상 위, 낡은 흑백 사진 한 장. 도하가 물었어요. '비티, 이 사진에 누가 찍혀 있는지 알아?' 비티가 한참을 들여다봤어요. '…검은 점과 흰 점이 가득해요. 얼굴은 잘 모르겠어요.' 세림이가 사진을 확 들어 보였어요. '사진이 어두워서 그래! 밝기를 바꾸면 보이지 않을까?' 하람이가 키보드를 두드렸어요. '그럼 먼저, 사진이 어떻게 숫자가 되는지부터 보여 줄게.' 사진 속 얼굴이 드러날까요?",
    lessons: [
      {
        title: "8×8 그리드 칠하기",
        desc: "칸을 눌러 밝기를 만들고 평균을 구해요.",
        gotoHash: "experience",
        gotoLabel: "체험하기",
      },
      {
        title: "그림의 정체는 숫자",
        desc: "픽셀이 밝기 값을 갖는다는 것을 알아요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
      {
        title: "이진화와 임계값",
        desc: "밝기를 검정·흰색 둘로 나눠요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
      {
        title: "합성곱, 느낌으로",
        desc: "주변 칸과 함께 보는 방법을 상상해요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
      {
        title: "컴퓨터는 무엇을 볼까요",
        desc: "기계가 이미지를 이해하는 힘과 한계를 짚어요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
    ],
    concepts: [
      {
        term: "픽셀",
        en: "Pixel",
        def: "이미지를 이루는 가장 작은 점이에요.",
      },
      {
        term: "해상도",
        en: "Resolution",
        def: "픽셀이 얼마나 촘촘한지를 나타내요. 촘촘할수록 선명해요.",
      },
      {
        term: "밝기",
        en: "Brightness",
        def: "한 픽셀이 얼마나 밝은지 나타내는 값이에요. 0은 검정, 최댓값은 흰색이에요.",
      },
      {
        term: "그레이스케일",
        en: "Grayscale",
        def: "색을 빼고 밝기만 남긴 회색 표현이에요.",
      },
      {
        term: "이진화",
        en: "Binarization",
        def: "임계값을 기준으로 검정과 흰색 둘로 나누는 일이에요.",
      },
      {
        term: "임계값",
        en: "Threshold",
        def: "검정과 흰색을 가르는 기준 값이에요.",
      },
      {
        term: "합성곱",
        en: "Convolution",
        def: "한 칸과 주변 칸을 함께 더해 보는 연산이에요. 윤곽을 찾는 데 쓰여요.",
      },
    ],
    problems: [
      {
        kind: "number",
        level: "쉬움",
        title: "픽셀 수 세기",
        question: "가로 8칸, 세로 8칸 이미지는 픽셀이 모두 몇 개일까요?",
        answer: 64,
        unitLabel: "개",
        hint: "가로 칸 수 × 세로 칸 수를 곱해요.",
        explanation: "8 × 8 = 64개예요. 체험 활동의 그리드와 같은 크기예요.",
      },
      {
        kind: "choice",
        level: "보통",
        title: "가장 어두운 값",
        question: "밝기를 0부터 9까지 나타낼 때, 0은 어떤 색일까요?",
        choices: ["가장 어두운 검정", "가장 밝은 흰색", "중간 회색"],
        answerIndex: 0,
        hint: "숫자가 커질수록 밝아진다고 배웠어요.",
        explanation: "0은 가장 어두운 검정, 9는 가장 밝은 흰색이에요.",
      },
      {
        kind: "number",
        level: "어려움",
        title: "평균 밝기",
        question: "네 칸의 밝기가 각각 2, 4, 6, 8이에요. 평균 밝기는 얼마인가요?",
        answer: 5,
        hint: "넷을 더해 4로 나눠요.",
        explanation: "(2 + 4 + 6 + 8) ÷ 4 = 5예요.",
      },
    ],
  },
  {
    id: "u4",
    roman: "Ⅳ",
    icon: "📈",
    title: "예측과 최적화",
    short: "데이터 위에 가장 잘 맞는 직선을 찾아요.",
    intro: [
      "데이터 점들이 흩어져 있어도 그 안에 흐르는 직선을 찾으면 미래를 헤아릴 수 있어요. 이 단원에서는 오차를 재는 법과 최적의 직선을 찾는 원리를 배워요.",
      "슬라이더로 직선을 움직이며 최소제곱의 느낌을 몸으로 익혀요.",
    ],
    story:
      "새봄고 매점 앞, 도하가 영수증 뭉치를 흔들었어요. '날이 더워지면 아이스크림 판매량이 늘어나는 것 같아!' 세림이가 영수증을 펼치자 온도와 판매량 숫자가 가득 적혔어요. '점으로 그려 보면 관계가 보일 것 같은데…' 하람이가 화면에 점 여덟 개를 찍었어요. '이 점들에 가장 잘 맞는 직선을 찾으면 내일 판매량을 예측할 수 있어!' 비티가 조용히 물었어요. ''가장 잘 맞는다'는 건 어떻게 재나요?' — 오늘의 수업이 시작되는 질문이에요.",
    lessons: [
      {
        title: "직선 맞추기",
        desc: "기울기·절편 슬라이더로 최적의 직선을 찾아요.",
        gotoHash: "experience",
        gotoLabel: "체험하기",
      },
      {
        title: "데이터 위의 직선, 선형 회귀",
        desc: "흩어진 점의 흐름을 직선으로 나타내요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
      {
        title: "오차를 재는 법",
        desc: "잔차와 오차의 제곱 합을 알아요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
      {
        title: "기울기와 절편",
        desc: "직선 y = ax + b의 두 숫자를 읽어요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
      {
        title: "골짜기를 찾아 내려가요",
        desc: "경사하강법의 원리를 상상해요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
    ],
    concepts: [
      {
        term: "선형 회귀",
        en: "Linear regression",
        def: "데이터에 가장 잘 맞는 직선을 찾아 관계를 나타내는 방법이에요.",
      },
      {
        term: "기울기",
        en: "Slope",
        def: "직선 y = ax + b에서 x가 1 늘 때 y가 늘어나는 양 a예요.",
      },
      {
        term: "절편",
        en: "Intercept",
        def: "직선이 y축과 만나는 위치 b예요. x = 0일 때의 값이에요.",
      },
      {
        term: "잔차",
        en: "Residual",
        def: "실제 값과 직선이 예측한 값의 차이예요.",
      },
      {
        term: "최소제곱법",
        en: "Method of least squares",
        def: "잔차의 제곱 합이 가장 작은 직선을 찾는 원리예요.",
      },
      {
        term: "경사하강법",
        en: "Gradient descent",
        def: "오차라는 골짜기를 한 걸음씩 내려가 최솟값을 찾는 방법이에요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "직선 읽기",
        question: "직선 y = ax + b에서 a는 무엇을 나타낼까요?",
        choices: ["기울기", "절편", "오차"],
        answerIndex: 0,
        hint: "x가 1 늘 때 y가 얼마나 변하는지 떠올려요.",
        explanation: "a는 기울기, b는 절편이에요.",
      },
      {
        kind: "number",
        level: "보통",
        title: "값 대입하기",
        question: "y = 2x + 1에서 x = 3이면 y는 얼마인가요?",
        answer: 7,
        hint: "2 × 3 + 1을 계산해요.",
        explanation: "2 × 3 + 1 = 7이에요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "최소제곱법이 찾는 것",
        question: "최소제곱법이 찾는 직선은 어떤 직선일까요?",
        choices: [
          "잔차의 제곱 합이 가장 작은 직선",
          "모든 점을 지나는 직선",
          "기울기가 가장 큰 직선",
        ],
        answerIndex: 0,
        hint: "'최소'와 '제곱'이라는 이름을 다시 읽어요.",
        explanation:
          "각 점의 잔차를 제곱해 더한 값이 가장 작은 직선을 찾는 게 최소제곱법이에요. 체험 활동의 오차 숫자가 바로 그 값이에요.",
      },
    ],
  },
  {
    id: "u5",
    roman: "Ⅴ",
    icon: "🔍",
    title: "인공지능과 수학 탐구",
    short: "스스로 질문을 세우고 데이터로 답해요.",
    intro: [
      "인공지능을 잘 쓰는 사람은 좋은 질문을 던지는 사람이에요. 이 단원에서는 탐구 주제에서 가설, 자료 수집, 결과 확인까지 한 바퀴를 돌아요.",
      "직접 가설을 세워 보며 탐구 설계를 연습해요.",
    ],
    story:
      "AI랩 마지막 종이 울리기 전, 도하가 노트를 탁 덮었어요. '우리 이제 진짜 탐구 하나 해 보자. 아침 독서가 국어 실력에 도움이 되는지 궁금해!' 세림이가 펜을 돌렸어요. '그럼 먼저 가설을 세워야 해. 아침 독서 시간이 길수록 국어 성적이 올라간다,처럼 말이야.' 하람이가 데이터 노트를 꺼냈어요. '누구의 어떤 자료를 모을지도 정해야 해.' 비티가 손을 들었어요. '결과가 가설과 달라도 괜찮은가요?' 세림이가 활짝 웃었어요. '달라도 그게 발견이지!' — 이번 단원에서는 여러분이 주인공이에요.",
    lessons: [
      {
        title: "질문에서 시작해요",
        desc: "탐구 주제를 다듬는 연습을 해요.",
        gotoHash: "intro",
        gotoLabel: "이야기부터",
      },
      {
        title: "가설 세우기",
        desc: "확인할 수 있는 문장으로 바꿔요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
      {
        title: "자료 수집 계획",
        desc: "무엇을, 어떻게, 얼마나 모을지 정해요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
      {
        title: "결과 확인과 해석",
        desc: "자료가 가설과 맞는지 살펴요.",
        gotoHash: "concepts",
        gotoLabel: "개념 보기",
      },
      {
        title: "가설 설계도",
        desc: "탐구를 단계별로 직접 채워요.",
        gotoHash: "experience",
        gotoLabel: "체험하기",
      },
    ],
    concepts: [
      {
        term: "탐구",
        en: "Inquiry",
        def: "궁금증에서 출발해 자료로 답을 찾는 활동이에요.",
      },
      {
        term: "가설",
        en: "Hypothesis",
        def: "확인할 수 있는 형태로 세운 잠정적인 답이에요.",
      },
      {
        term: "변인",
        en: "Variable",
        def: "탐구에서 값이 변할 수 있는 요소예요.",
      },
      {
        term: "독립 변인",
        en: "Independent variable",
        def: "내가 바꾸어 보는 변인이에요. 독서 시간이 예예요.",
      },
      {
        term: "종속 변인",
        en: "Dependent variable",
        def: "독립 변인을 따라 변하는, 재어 보는 변인이에요. 성적이 예예요.",
      },
      {
        term: "자료 수집",
        en: "Data collection",
        def: "가설을 확인할 근거를 모으는 일이에요.",
      },
      {
        term: "해석",
        en: "Interpretation",
        def: "모은 자료가 무엇을 말하는지 풀어 내는 일이에요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "좋은 가설 고르기",
        question: "다음 중 확인하기 좋은 가설은 무엇일까요?",
        choices: [
          "아침 독서 시간이 길수록 국어 성적이 올라간다",
          "독서는 좋은 것이다",
          "공부는 재미있을 것이다",
        ],
        answerIndex: 0,
        hint: "숫자로 재어 볼 수 있는 문장인지 살펴요.",
        explanation:
          "'길수록 올라간다'처럼 측정할 수 있는 관계를 나타낸 문장이 확인하기 좋은 가설이에요.",
      },
      {
        kind: "choice",
        level: "보통",
        title: "자료 고르기",
        question:
          "'아침 독서 시간이 길수록 국어 성적이 올라간다'를 확인하기에 가장 알맞은 자료는 무엇일까요?",
        choices: [
          "학생별 독서 시간과 국어 성적 기록",
          "학생별 좋아하는 음식 조사",
          "지난 한 달 날씨 기록",
        ],
        answerIndex: 0,
        hint: "가설에 등장하는 두 가지, 독서 시간과 성적이 함께 있어야 해요.",
        explanation:
          "독서 시간(독립 변인)과 국어 성적(종속 변인)이 함께 기록된 자료가 필요해요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "탐구의 순서",
        question: "배운 탐구 과정을 올바른 순서로 나열한 것은 무엇일까요?",
        choices: [
          "주제 → 가설 → 자료 수집 → 결과 확인",
          "가설 → 주제 → 결과 확인 → 자료 수집",
          "자료 수집 → 결과 확인 → 주제 → 가설",
        ],
        answerIndex: 0,
        hint: "무엇을 풀지 정한 뒤 잠정 답을 세우고, 근거를 모아 확인해요.",
        explanation:
          "주제 정하기 → 가설 세우기 → 자료 수집 → 결과 확인 순이에요. 가설 설계도 체험에서 같은 흐름을 썼어요.",
      },
    ],
  },
];

export function getUnit(unitId: string | undefined): Unit | undefined {
  return UNITS.find((u) => u.id === unitId);
}
