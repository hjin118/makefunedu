// 아두이노(엠블록) 페이지 콘텐츠 데이터 — 커피보드 슬라이드 3유닛 원문 기반
// UNIT candy(20) + UNIT pixel(25) + UNIT cheer(18) = 총 63 슬라이드

export type UnitId = "candy" | "pixel" | "cheer";

export type UnitData = {
  id: UnitId;
  no: string;
  navLabel: string;
  title: string;
  desc: string;
  goal: string;
  parts: string[];
  note?: { tone: "warn" | "info" | "ok"; title: string; lines: string[] };
};

export type Slide = {
  no: number;
  unit: UnitId;
  title?: string;
  files: string[];
  text: string[];
};

export const UNITS: UnitData[] = [
  {
    id: "candy",
    no: "①",
    navLabel: "유닛 1 — 초음파 캔디보이 만들기",
    title: "유닛 1 — 초음파 캔디보이 만들기",
    desc: "초음파센서, 서보모터, 제어기의 동작 원리를 배우고, 초음파 보물상자(캔디보이)를 직접 조립해요.",
    goal:
      "초음파·서보모터·제어기 3가지 원리를 이해하고, 모터 구동부 조립과 회로 연결까지 완성해요.",
    parts: ["아두이노 보드(커피보드)", "초음파센서", "서보모터", "스위치", "케이블·볼트·양면테이프"],
    note: {
      tone: "warn",
      title: "선 색깔 규칙 — 센서를 정확히 연결해요!",
      lines: [
        "갈색 = GND (−극)",
        "빨간색 = VCC (+5V, +극)",
        "노란색 = Signal",
      ],
    },
  },
  {
    id: "pixel",
    no: "②",
    navLabel: "유닛 2 — 픽셀아트 코딩",
    title: "유닛 2 — 픽셀아트 만들기 코딩교육",
    desc: "아두이노의 역사와 보드 종류부터 픽셀 원리, mblock 실습 3종과 업로드 방법, 프로젝트까지 차근차근 배워요.",
    goal:
      "픽셀의 원리를 이해하고 mblock으로 픽셀아트 그리기 · 픽셀 애니메이션 · 픽셀 가로등 3가지를 코딩해요.",
    parts: ["픽셀아트 보드", "아두이노 보드", "적외선 센서", "USB 케이블", "모눈종이(16×16)"],
    note: {
      tone: "info",
      title: "업로드 3단계",
      lines: [
        "1. Mblock으로 프로그램을 작성해요.",
        "2. 아두이노 포트에 픽셀아트를 연결해요.",
        "3. 연결 클릭 → 접속 가능한 모든 기기 표시 체크 → 업로드!",
      ],
    },
  },
  {
    id: "cheer",
    no: "③",
    navLabel: "유닛 3 — 네오픽셀 응원봉 만들기",
    title: "유닛 3 — 네오픽셀 응원봉 만들기",
    desc: "응원봉의 역사와 구조를 살펴보고, 네오픽셀과 건전지 박스를 연결해 나만의 응원봉을 완성해요.",
    goal:
      "극성 규칙(GND · 5V · IN)을 지키면서 네오픽셀 응원봉을 안전하게 만들어요.",
    parts: ["네오픽셀", "건전지 박스", "아두이노 보드", "케이블", "글루건·출력물"],
    note: {
      tone: "warn",
      title: "네오픽셀 연결 규칙 — 극성을 정확히!",
      lines: [
        "GND − 검은색",
        "5V − 빨간색",
        "IN − 파란색",
        "선이 끊어지지 않게 조심하고, 글루건은 화상에 주의해요.",
      ],
    },
  },
];

/* ---------- 슬라이드 원본 자료 (커피보드 3유닛 63슬라이드) ---------- */
// files: public/images/arduino/ 의 원본 이미지 (렌더링 불가 형식 .wdp 1개 제외)
// text: 슬라이드 전사 텍스트 (.omo/cb-1.txt, cb-2.txt, cb-edu.txt 기반)

export const SLIDES: Slide[] = [
  // ① 유닛 1 — 초음파 캔디보이 만들기 (candy s1~20)
  { no: 1, unit: "candy", title: "초음파 캔디보이 만들기", files: [], text: [] },
  { no: 2, unit: "candy", title: "초음파센서 동작원리", files: ["candy-s02-1.jpeg", "candy-s02-2.png", "candy-s02-3.png"], text: [] },
  { no: 3, unit: "candy", title: "초음파센서 활용예시", files: ["candy-s03-1.jpeg", "candy-s03-2.jpeg"], text: [] },
  { no: 4, unit: "candy", title: "초음파센서 활용예시 — 버스 도어 안전 시스템", files: ["candy-s04-1.jpeg"], text: [] },
  { no: 5, unit: "candy", title: "서보모터 동작원리", files: ["candy-s05-1.png", "candy-s05-2.jpeg"], text: [] },
  { no: 6, unit: "candy", title: "서보모터 활용예시", files: ["candy-s06-1.jpeg", "candy-s06-2.jpeg"], text: [] },
  { no: 7, unit: "candy", title: "제어기 동작원리", files: ["candy-s07-1.jpeg", "candy-s07-2.png"], text: [] },
  { no: 8, unit: "candy", title: "제어기 활용예시", files: ["candy-s08-1.jpeg", "candy-s08-2.jpeg"], text: [] },
  { no: 9, unit: "candy", title: "초음파 보물상자 만들기", files: ["candy-s09-1.jpg", "candy-s09-2.jpg"], text: [] },
  {
    no: 10,
    unit: "candy",
    title: "주의사항!",
    files: [],
    text: ["아두이노 보드에 센서를 정확하게 선을 연결하여야 한다."],
  },
  {
    no: 11,
    unit: "candy",
    title: "재료 준비하기",
    files: ["candy-s11-1.jpg"],
    text: ["그림과 같은 재료를 준비 및 확인한다"],
  },
  {
    no: 12,
    unit: "candy",
    title: "모터 구동부 만들기 1",
    files: ["candy-s12-1.png", "candy-s12-2.png"],
    text: ["왼쪽 그림과 같이 모터와 커버, 볼트를 이용해서 오른쪽 그림과 같이 고정합니다"],
  },
  {
    no: 13,
    unit: "candy",
    title: "모터 구동부 만들기 2",
    files: ["candy-s13-1.png"],
    text: ["그림과 같이 링크와 모터혼을 고정합니다"],
  },
  {
    no: 14,
    unit: "candy",
    title: "모터 구동부 만들기 3",
    files: ["candy-s14-1.jpg"],
    text: ["그림과 같이 모터 혼과 연결된 링크를 모터에 연결합니다"],
  },
  {
    no: 15,
    unit: "candy",
    title: "몸체 서보모터 연결",
    files: ["candy-s15-1.png"],
    text: ["양면 테이프를 이용해 몸체에 서보 모터와 링크를 연결합니다"],
  },
  {
    no: 16,
    unit: "candy",
    title: "캔디보이 회로 연결",
    files: ["candy-s16-1.png", "candy-s16-2.png", "candy-s16-4.png"],
    text: [
      "스위치",
      "서보모터",
      "초음파센서",
      "갈색 = GND / −극",
      "빨간색 = VCC / +5V / +극",
      "노란색 = Signal",
    ],
  },
  { no: 17, unit: "candy", title: "캔디보이 연결 회로도", files: ["candy-s17-1.png"], text: [] },
  {
    no: 18,
    unit: "candy",
    title: "초음파 센서 연결",
    files: ["candy-s18-1.jpg"],
    text: ["그림과 같이 양면 테이프를 이용해 초음파센서를 고정합니다"],
  },
  { no: 19, unit: "candy", title: "초음파 상자 완성", files: ["candy-s19-1.jpg", "candy-s19-2.jpg"], text: [] },
  { no: 20, unit: "candy", title: "감사합니다", files: [], text: [] },

  // ② 유닛 2 — 픽셀아트 만들기 코딩교육 (pixel s1~25)
  { no: 1, unit: "pixel", title: "픽셀아트 만들기 코딩교육", files: [], text: [] },
  { no: 2, unit: "pixel", title: "아두이노 사용하기", files: [], text: ["아두이노 기초"] },
  {
    no: 3,
    unit: "pixel",
    title: "아두이노란",
    files: ["pixel-s03-1.jpeg", "pixel-s03-2.jpeg"],
    text: [
      "아두이노는 2005년 이탈리아 이브레아 지방에서 마시모 반지(Massimo Banzi)와 데이비드 쿠아르틸레스(David Cuartielles)에 의해 개발된 오픈소스를 기반으로 한 단일 보드 마이크로 컨트롤러로서 이탈리아어로 '절친한 친구'를 뜻한다.",
      "오픈소스 하드웨어란 회로도와 인쇄회로기판(PCB : Printed Circuit Board) 등 제품의 모든 것이 공개된 하드웨어로서 누구나 이를 사용하고 발전시켜 나갈 수 있으며, 대표적인 오픈소스 하드웨어로는 아두이노(Arduino)와 라즈베리 파이(Raspberry Pi) 등이 있다.",
    ],
  },
  { no: 4, unit: "pixel", title: "아두이노 보드 종류", files: ["pixel-s04-1.png"], text: [] },
  { no: 5, unit: "pixel", title: "아두이노 보드 사양 비교", files: ["pixel-s05-1.png"], text: [] },
  { no: 6, unit: "pixel", title: "픽셀 원리 이해", files: [], text: ["픽셀이란"] },
  {
    no: 7,
    unit: "pixel",
    title: "픽셀이란",
    files: [],
    text: [
      "픽셀이란 \"Picture Element\"의 줄임말로, 디지털 화면에서 이미지를 구성하는 가장 작은 단위입니다. 쉽게 말해, 화면을 구성하는 하나의 점을 의미합니다.",
      "픽셀(Pixel)은 \"화소\"라고도 하며, 디지털 이미지를 구성하는 가장 작은 단위입니다.",
      "컴퓨터 화면, 스마트폰, TV 화면 등 모든 디지털 디스플레이는 수많은 픽셀로 이루어져 있습니다.",
      "픽셀 하나하나는 색상 정보를 가지며, 여러 개의 픽셀이 모여 하나의 그림이나 사진을 형성합니다.",
    ],
  },
  { no: 8, unit: "pixel", title: "픽셀 구조 예시", files: ["pixel-s08-1.png", "pixel-s08-2.png", "pixel-s08-3.png"], text: [] },
  {
    no: 9,
    unit: "pixel",
    title: "픽셀 아트란",
    files: ["pixel-s09-1.png", "pixel-s09-2.jpeg", "pixel-s09-3.jpeg"],
    text: [
      "픽셀(Pixel)을 이용하여 만든 디지털 그림 스타일입니다.",
      "픽셀 아트는 8비트, 16비트 게임 스타일에서 많이 사용되며,",
      "최근에는 게임 디자인(마인크래프트, 마리오 시리즈 등), 이모티콘, NFT 아트(SNS 프로필 이미지, 유튜버용 아바타 제작 등) 다양한 분야에서 활용됩니다.",
    ],
  },
  {
    no: 10,
    unit: "pixel",
    title: "픽셀 아트 특징",
    files: ["pixel-s10-1.png", "pixel-s10-2.png", "pixel-s10-3.jpeg"],
    text: [
      "작은 정사각형 픽셀을 조합하여 그림을 만든다.",
      "제한된 색상을 사용하여 독특한 분위기를 연출한다.",
      "단순한 형태지만 창의적인 표현이 가능하다.",
      "레트로 감성을 살린 디자인에 많이 사용된다.",
    ],
  },
  { no: 11, unit: "pixel", title: "픽셀 그리기", files: [], text: [] },
  {
    no: 12,
    unit: "pixel",
    title: "픽셀 그리기",
    files: ["pixel-s12-1.png", "pixel-s12-2.png"],
    text: ["간단한 도형(별모양, 과일 등)을 그려 모눈종이(16×16)에 그림으로 나타냅니다."],
  },
  { no: 13, unit: "pixel", title: "픽셀아트 코딩하기", files: [], text: [] },
  {
    no: 14,
    unit: "pixel",
    title: "Mblock 픽셀아트 블록 설명",
    files: ["pixel-s14-1.png", "pixel-s14-2.png"],
    text: ["M Block | 기능 설명", "픽셀아트 보드 초기화 및 사용 핀 설정", "픽셀아트에 그림을 그리기"],
  },
  { no: 15, unit: "pixel", title: "Mblock 실습 (회로도) — 픽셀아트 그리기", files: ["pixel-s15-1.png"], text: [] },
  { no: 16, unit: "pixel", title: "Mblock 실습 (프로그램) — 픽셀아트 그리기", files: ["pixel-s16-1.png"], text: [] },
  { no: 17, unit: "pixel", title: "Mblock 실습 (회로도) — 픽셀 애니메이션 만들기", files: ["pixel-s17-1.png"], text: [] },
  { no: 18, unit: "pixel", title: "Mblock 실습 (프로그램) — 픽셀 애니메이션 만들기", files: ["pixel-s18-1.png"], text: [] },
  { no: 19, unit: "pixel", title: "Mblock 실습 (회로도) — 픽셀 가로등 만들기", files: ["pixel-s19-1.png"], text: [] },
  { no: 20, unit: "pixel", title: "Mblock 실습 (프로그램) — 픽셀 가로등 만들기", files: ["pixel-s20-1.png"], text: [] },
  { no: 21, unit: "pixel", title: "픽셀 업로드 방법", files: [], text: [] },
  {
    no: 22,
    unit: "pixel",
    title: "Mblock 업로드 방법 1~2단계",
    files: ["pixel-s22-1.png", "pixel-s22-2.png"],
    text: ["1. Mblock을 이용하여 프로그램을 작성", "2단계 : 아두이노 포트에 픽셀아트를 연결한다"],
  },
  {
    no: 23,
    unit: "pixel",
    title: "Mblock 업로드 방법 3단계",
    files: ["pixel-s23-1.png", "pixel-s23-2.png", "pixel-s23-3.png"],
    text: [
      "3. 소스를 업로드한다.",
      "3-1. Mblock에서 연결을 누른다",
      "3-2. 접속 가능한 모든 기기 표시 체크! 포트가 나타나면 연결 클릭",
      "3-3. 업로드를 눌러서 소스 전송하기",
    ],
  },
  { no: 24, unit: "pixel", title: "픽셀아트 Project", files: [], text: [] },
  {
    no: 25,
    unit: "pixel",
    title: "픽셀아트 Project — 주제 선정",
    files: ["pixel-s25-1.jpeg", "pixel-s25-2.png", "pixel-s25-3.jpeg"],
    text: ["주제 선정(학교 안전, 교내 규칙, 교실 꾸미기 등 학교 관련 주제 선정)을 하여 픽셀아트에 나타냅니다."],
  },

  // ③ 유닛 3 — 네오픽셀 응원봉 만들기 (cheer s1~18)
  { no: 1, unit: "cheer", title: "응원봉 만들기", files: [], text: [] },
  {
    no: 2,
    unit: "cheer",
    title: "응원봉이란",
    files: [],
    text: [
      "말 그대로 자신이 좋아하는 아이돌을 응원하기 위한 도구예요.",
      "과거에는 풍선을 많이 썼으며 그 풍선의 색으로 각 팬덤을 구별했고 현재는 형광봉을 사용한다. 2010년부터 배터리로 LED 조명을 켜는 응원봉이 등장.",
      "2015년엔 응원봉을 쓰는 것이 대세로 변화",
      "LED 색상이 단순해서 중복을 피하기 어려워 색 구분이 어려워지기 시작했다",
      "16년 이후 여러 색을 낼 수 있고 블루투스와 중앙 제어를 지원하는 응원봉으로 바뀌면서 LED 색상 구분의 의미가 없어졌다.",
    ],
  },
  { no: 3, unit: "cheer", title: "응원봉 구조 및 기능", files: ["cheer-s03-1.png", "cheer-s03-2.png"], text: [] },
  {
    no: 4,
    unit: "cheer",
    title: "블루투스 원격제어",
    files: [],
    text: [
      "블루투스를 이용한 원격제어 기능이 2016년 시작으로, 가수들의 응원봉에 도입되었다.",
      "앱을 활용해 자신의 좌석 번호를 입력하면, 관계자에 의한 중앙제어를 통해 응원봉 색깔이 자동으로 변하는 시스템이다.",
      "곡의 리듬에 따라 빛이 반짝이고, 감성적인 곡에는 밝기가 낮아지는 등의 효과를 구현",
      "원격제어를 통해 하나의 공연을 만들어가는 모습을 연출",
    ],
  },
  { no: 5, unit: "cheer", title: "활용예시", files: ["cheer-s05-1.jpeg", "cheer-s05-2.jpeg"], text: [] },
  { no: 6, unit: "cheer", title: "활용예시", files: ["cheer-s06-1.png", "cheer-s06-2.png"], text: [] },
  { no: 7, unit: "cheer", title: "응원봉 만들기", files: [], text: [] },
  {
    no: 8,
    unit: "cheer",
    title: "주의사항!",
    files: [],
    text: [
      "1. 선이 끊어지지 않도록 주의하여 연결합니다",
      "2. 연결 보드 + − 극성에 맞게 선을 정확하게 연결합니다.",
      "3. 글루건 사용 시 화상에 주의하여 사용합니다",
    ],
  },
  { no: 9, unit: "cheer", files: ["cheer-s09-1.png", "cheer-s09-2.png"], text: [] },
  {
    no: 10,
    unit: "cheer",
    title: "재료 준비하기",
    files: ["cheer-s10-1.png"],
    text: ["그림과 같은 재료를 준비 및 확인합니다"],
  },
  {
    no: 11,
    unit: "cheer",
    title: "응원봉 만들기 — 네오픽셀 연결",
    files: ["cheer-s11-1.png", "cheer-s11-2.png"],
    text: [
      "왼쪽 그림처럼 네오픽셀과 선을 준비해서 오른쪽 그림과 같이 극성에 맞춰 선을 연결합니다",
      "GND − 검은색 / 5V − 빨간색 / IN − 파란색",
    ],
  },
  {
    no: 12,
    unit: "cheer",
    title: "응원봉 만들기 — 출력물 연결",
    files: ["cheer-s12-1.png", "cheer-s12-2.png"],
    text: ["왼쪽 그림처럼 연결한 네오픽셀과 출력물을 준비해서 오른쪽 그림과 같이 글루건을 사용해 출력물에 연결합니다"],
  },
  {
    no: 13,
    unit: "cheer",
    title: "응원봉 만들기 — 건전지 박스 연결",
    files: ["cheer-s13-1.png", "cheer-s13-2.png"],
    text: ["왼쪽 그림처럼 연결한 출력물과 건전지 박스를 준비해서 오른쪽 그림과 같이 서로 연결한 다음 글루건을 사용해 고정해줍니다"],
  },
  {
    no: 14,
    unit: "cheer",
    title: "응원봉 만들기 — 보드 고정",
    files: ["cheer-s14-1.png", "cheer-s14-2.png"],
    text: ["왼쪽 그림처럼 연결한 출력물을 준비한 다음 글루건을 사용해 오른쪽 그림과 같이 건전지 박스에 보드를 고정해줍니다"],
  },
  {
    no: 15,
    unit: "cheer",
    title: "응원봉 만들기 — 네오픽셀 보드 연결",
    files: ["cheer-s15-1.png", "cheer-s15-2.png"],
    text: ["왼쪽 그림처럼 보드를 준비한 다음 오른쪽 그림처럼 극성에 맞게 네오픽셀을 보드에 연결합니다."],
  },
  {
    no: 16,
    unit: "cheer",
    title: "응원봉 만들기 — 건전지 박스 연결",
    files: ["cheer-s16-1.png", "cheer-s16-2.png"],
    text: ["왼쪽 그림처럼 연결한 보드를 준비한 다음 오른쪽 그림처럼 건전지 박스를 극성에 맞게 연결해 줍니다"],
  },
  {
    no: 17,
    unit: "cheer",
    title: "응원봉 만들기 — 마무리 연결",
    files: ["cheer-s17-1.png", "cheer-s17-2.png"],
    text: ["왼쪽 그림처럼 연결한 보드를 준비한 다음 오른쪽 그림처럼 건전지 박스를 극성에 맞게 연결해 줍니다"],
  },
  { no: 18, unit: "cheer", title: "감사합니다", files: [], text: [] },
];

export function getSlides(unit: UnitId): Slide[] {
  return SLIDES.filter((slide) => slide.unit === unit);
}
