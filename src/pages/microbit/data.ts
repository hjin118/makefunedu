// 마이크로비트 페이지 콘텐츠 데이터 — 마이크로비트교육.pptx(86슬라이드) 원문 기반

export type NavItem = { id: string; no: string; label: string };

export type BoardPart = { no: number; name: string };

export type FeatureItem = { no: string; title: string; desc: string };

export type StepItem = { no: string; title: string; desc: string };

export type PracticeItem = {
  no: string;
  title: string;
  slide: string;
  wiring: string;
  program: string;
};

export type SensorItem = {
  name: string;
  slide: string;
  goal: string;
  tool: string;
};

export type ProjectItem = {
  title: string;
  slide: string;
  parts: string[];
  desc: string;
};

export type TtsStep = { no: string; text: string };

export type HuskyFeature = {
  no: string;
  title: string;
  en: string;
  desc: string;
  points?: string[];
};

export type LedStateRow = {
  color: string;
  dot: "orange-yellow" | "yellow" | "blue";
  state: string;
};

export const SECTION_NAV: NavItem[] = [
  { id: "start", no: "①", label: "시작하기" },
  { id: "wiring", no: "②", label: "부품 연결하는 법" },
  { id: "coding", no: "③", label: "프로그래밍 시작하기" },
  { id: "output", no: "④", label: "출력 실습 5종" },
  { id: "sensor", no: "⑤", label: "센서 읽기 3종" },
  { id: "project", no: "⑥", label: "프로젝트 3종" },
  { id: "voice", no: "⑦", label: "음성보드" },
  { id: "huskylens", no: "⑧", label: "허스키렌즈 AI 카메라" },
];

/* ---------- ① 시작하기 ---------- */

export const ROBOTBIT_INTRO =
  "마이크로비트의 확장보드인 Robotbit V2.0은 강력한 DC 모터, 스테퍼 모터, 서보 드라이브 기능, 내장된 RGB 램프 및 부저, 그리고 마이크로비트의 유휴 핀 모두를 밖으로 확장시켜 Arduino와 같이 일반적인 전자 모듈을 지원해요. 충전 배터리인 18650 홀더, 내장된 리튬 배터리 부스트 충전, 보호 칩이 함께 제공되며, 외부 전원 입력도 지원해요.";

export const BOARD_PARTS: BoardPart[] = [
  { no: 1, name: "5V 외부 전원 공급 장치 터미널" },
  { no: 2, name: "전원 스위치" },
  { no: 3, name: "전원 표시등" },
  { no: 4, name: "배터리 표시기" },
  { no: 5, name: "마이크로 충전 포트" },
  { no: 6, name: "DC 모터 연결" },
  { no: 7, name: "부저 점퍼" },
  { no: 8, name: "8개의 IO (P0-P2, P8, P12-P15)" },
  { no: 9, name: "5V, GND 핀" },
  { no: 10, name: "수동 부저" },
  { no: 11, name: "8개의 서보 3PIN 인터페이스" },
  { no: 12, name: "I²C 인터페이스" },
  { no: 13, name: "18650 리튬 배터리 홀더" },
  { no: 14, name: "배터리 보호 활성화 버튼" },
  { no: 15, name: "Microbit 슬롯" },
  { no: 16, name: "4개의 Full 컬러 RGB" },
  { no: 17, name: "서보 드라이브 IC" },
  { no: 18, name: "모터 드라이브 IC" },
  { no: 19, name: "표준 KittenBot 로봇 고정 hole" },
  { no: 20, name: "표준 레고 블록 고정 hole" },
];

export const ROBOTBIT_FEATURES: FeatureItem[] = [
  {
    no: "1",
    title: "RGB 네오픽셀",
    desc: "보드에 4개의 Full 컬러 RGB가 내장돼 있고, pin16번에 연결돼 있어요.",
  },
  {
    no: "2",
    title: "서보 모터 제어 3Pin",
    desc: "8개의 서보 3PIN 인터페이스로 서보 모터를 연결해요.",
  },
  {
    no: "3",
    title: "DC 모터 / 스테퍼 모터 지원",
    desc: "모터 드라이브 IC가 있어 DC 모터와 스테퍼 모터를 구동할 수 있어요.",
  },
  {
    no: "4",
    title: "마이크로비트의 I/O 포트",
    desc: "유휴 핀 모두를 밖으로 확장해 8개의 IO (P0-P2, P8, P12-P15)를 쓸 수 있어요.",
  },
];

/* ---------- ③ 프로그래밍 시작하기 ---------- */

export const CODING_STEPS: StepItem[] = [
  {
    no: "1",
    title: "에디터 접속",
    desc: "주소창에 pxt.io를 입력해 마이크로비트 프로그램 에디터에 접속해요.",
  },
  {
    no: "2",
    title: "에디터 화면 익히기",
    desc: "왼쪽의 시뮬레이터 화면, 가운데 명령어 블록, 오른쪽 프로그래밍 창으로 이루어져 있어요.",
  },
  {
    no: "3",
    title: "필요한 소스 받기",
    desc: "실습에 필요한 소스(확장 블록)를 다운받아요.",
  },
  {
    no: "4",
    title: "첫 프로그램",
    desc: "기본 명령어 블록에서 아이콘 출력, 문자열 출력을 가져와 블록에 끼우면 시뮬레이터에 결과가 나타나요.",
  },
];

export const COUNTER_CHALLENGE = {
  goal:
    "변수를 사용해 흔들면 숫자가 하나씩 증가하는 프로그램을 만들어요. 그대로 전자 줄넘기로 쓸 수 있어요.",
  extra: "변수를 만들고, A 버튼을 누르면 리셋되도록 프로그램을 완성해요.",
};

export const MUSIC_CHALLENGE =
  "도전 과제 1 : 숫자가 10 단위를 넘어갈 때마다 음악 나오기 — 조건문을 사용하여 값들을 비교해요. 이 부분을 어떻게 바꾸면 될까요?";

/* ---------- ④ 출력 실습 5종 ---------- */

export const OUTPUT_PRACTICES: PracticeItem[] = [
  {
    no: "1",
    title: "LED ON / OFF 제어",
    slide: "슬라이드 22-23",
    wiring: "마이크로비트에 LED를 연결해요.",
    program: "LED ON / OFF 블록으로 LED를 켜고 꺼요.",
  },
  {
    no: "2",
    title: "글자 나타내기",
    slide: "슬라이드 24-25",
    wiring: "마이크로비트에 LED 화면을 그대로 사용해요.",
    program: "글자를 나타내는 블록으로 마이크로비트에 글자를 띄워요.",
  },
  {
    no: "3",
    title: "소리 ON / OFF 제어",
    slide: "슬라이드 26-27",
    wiring: "마이크로비트에 소리 부품(부저)을 연결해요.",
    program: "소리 ON / OFF 블록으로 소리를 켜고 꺼요.",
  },
  {
    no: "4",
    title: "네오픽셀 색깔 나타내기",
    slide: "슬라이드 28-29",
    wiring: "마이크로비트에 네오픽셀을 연결해 ON / OFF 제어해요.",
    program: "네오픽셀 블록으로 색깔을 나타내요.",
  },
  {
    no: "5",
    title: "서보모터 각도 제어",
    slide: "슬라이드 30-31",
    wiring: "마이크로비트에 서보모터를 연결해요.",
    program: "서보모터 블록으로 각도를 제어해요.",
  },
];

/* ---------- ⑤ 센서 읽기 3종 ---------- */

export const SENSOR_ITEMS: SensorItem[] = [
  {
    name: "빛 감지 센서",
    slide: "슬라이드 33-34",
    goal: "마이크로비트에 빛 감지 센서를 연결해 센서 값을 읽어와요.",
    tool: "mblock",
  },
  {
    name: "초음파 센서",
    slide: "슬라이드 35-36",
    goal: "마이크로비트에 초음파 센서를 연결해 센서 값을 읽어와요.",
    tool: "mblock",
  },
  {
    name: "수분 센서",
    slide: "슬라이드 37-38",
    goal: "마이크로비트에 수분 센서를 연결해 센서 값을 읽어와요.",
    tool: "mblock",
  },
];

/* ---------- ⑥ 프로젝트 3종 ---------- */

export const PROJECT_ITEMS: ProjectItem[] = [
  {
    title: "스마트 가로등",
    slide: "슬라이드 40-41",
    parts: ["LED", "CDS(빛 감지) 센서"],
    desc: "LED와 CDS(빛 감지) 센서를 활용해 스마트 가로등을 만들어요.",
  },
  {
    title: "수해경보기",
    slide: "슬라이드 42-43",
    parts: ["네오픽셀 LED", "수분센서"],
    desc: "네오픽셀 LED와 수분센서를 활용해 수해경보기를 만들어요.",
  },
  {
    title: "도난 경보기",
    slide: "슬라이드 44-45",
    parts: ["네오픽셀 LED", "초음파센서", "부저"],
    desc: "네오픽셀 LED, 초음파센서, 부저를 활용해 도난 경보기를 만들어요.",
  },
];

/* ---------- ⑦ 음성보드 ---------- */

export const TTS_STEPS: TtsStep[] = [
  { no: "1", text: "마이크로 SD 카드 삽입" },
  { no: "2", text: "https://ttsfree.com/ko 접속" },
  { no: "3", text: "홈페이지 접속 후 아래 입력상자에 글자 입력" },
  { no: "4", text: "원하는 음성과 말하는 속도 설정" },
  { no: "5", text: "글자 입력과 음성 설정 후 클릭!" },
  { no: "6", text: "음성 출력 및 재생 확인 후 다운로드 클릭" },
  { no: "7", text: "다운로드 폴더 클릭" },
  { no: "8", text: "파일 클릭 후 파일명을 숫자로 변경!" },
  { no: "9", text: "숫자로 변경한 파일을 복사" },
  { no: "10", text: "USB 드라이브에 붙여넣기" },
  { no: "11", text: "C 타입 전원 연결" },
];

/* ---------- ⑧ 허스키렌즈 AI 카메라 ---------- */

export const HUSKY_INTRO_POINTS: string[] = [
  "카메라를 통해 이미지 학습과 이미지 인식이 가능한 인공지능 비전 센서가 장착돼 있어요.",
  "복잡한 프로그래밍 없이도 AI 영상 인식 기술을 사용할 수 있어요.",
  "얼굴 인식, 객체 추적, 객체 인식, 라인 추적, 색상 인식, 태그 인식, 객체 분류, QR코드 인식, 바코드 인식을 지원해요.",
];

export const HUSKY_BUTTONS: Array<{ name: string; en: string; desc: string[] }> = [
  {
    name: "학습버튼",
    en: "PRESS",
    desc: [
      "목표를 학습하거나, 학습된 모델을 초기화할 때 사용해요.",
    ],
  },
  {
    name: "기능버튼",
    en: "PRESS",
    desc: [
      "허스키렌즈 모델과 설정을 이동할 때 사용해요.",
      "모델의 세부 설정을 할 때 사용해요.",
    ],
  },
];

export const HUSKY_CONNECT: FeatureItem[] = [
  {
    no: "UART",
    title: "UART 통신",
    desc: "아두이노 소프트웨어 시리얼(SoftwareSerial)로 통신 연결해요.",
  },
  {
    no: "I2C",
    title: "I2C 통신",
    desc: "아두이노 18, 19핀(A4, A5)을 활용하여 통신해요.",
  },
  {
    no: "USB",
    title: "USB CONNECTOR",
    desc: "허스키렌즈의 펌웨어 업그레이드 시 사용해요.",
  },
];

export const HUSKY_LED_STATES: LedStateRow[] = [
  {
    color: "주황색에서 노란색으로, 노란색에서 주황색으로",
    dot: "orange-yellow",
    state: "아직 대상을 배우지 않았지만 배울 준비가 되어 있어요.",
  },
  { color: "노란색", dot: "yellow", state: "새로운 객체를 학습해요." },
  { color: "푸른색", dot: "blue", state: "대상을 학습하고 인식해요." },
];

export const HUSKY_INIT_STEPS: string[] = [
  "학습버튼을 누르면 초기화 화면이 나타나요.",
  "시간 초 내에 학습버튼을 누르게 되면 학습한 모든 이미지를 지워요.",
];

export const HUSKY_FEATURES: HuskyFeature[] = [
  {
    no: "1",
    title: "얼굴 인식",
    en: "Face Recognition",
    desc:
      "얼굴을 감지할 수 있는 기능이며, 다중 얼굴 인식이 가능해요. 다중 얼굴 인식을 위해서는 설정에서 Learn Multiple 기능을 활성화해야 해요.",
    points: [
      "+ 기호를 얼굴 정중앙에 맞춘 뒤 학습버튼을 짧게 눌러 학습해요.",
      "동일한 얼굴을 인식하면 \"Face: ID1\"이라는 단어가 포함된 파란색 프레임이 화면에 표시돼요.",
      "프레임의 크기는 얼굴의 크기에 따라 변경되며, 얼굴은 자동으로 추적돼요.",
    ],
  },
  {
    no: "2",
    title: "물체 추적",
    en: "Object Tracking",
    desc:
      "목표가 되는 물체를 학습하고 추적할 수 있어요. 하나의 개체만 추적할 수 있으며 여러 개체는 지원되지 않아요.",
    points: [
      "기능버튼을 길게 눌러 물체 추적의 매개변수(Learn Enable, Auto Save)를 설정해요.",
      "화면 중앙의 노란색 프레임에 목표 물체가 포함되도록 거리를 조정한 뒤 학습버튼을 길게 눌러 학습해요.",
      "다양한 각도와 거리에서 물체를 학습시켜야 하며, 학습 중에는 \"Learning: ID1\"이라는 단어가 있는 노란색 프레임이 표시돼요.",
    ],
  },
  {
    no: "3",
    title: "객체 인식",
    en: "Object Recognition",
    desc: "미리 학습된 사물 20가지를 인식할 수 있도록 하는 기능이에요.",
    points: [
      "학습된 20종: 비행기, 자전거, 새, 배, 병, 버스, 자동차, 고양이, 의자, 소, 식탁, 개, 말, 오토바이, 사람, 화분, 양, 소파, 기차, TV",
      "+ 기호를 물체 정중앙에 맞춘 뒤 학습버튼을 짧게 눌러 학습해요.",
      "동일한 물체를 인식하면 \"dog: ID1\"처럼 학습된 이름이 포함된 파란색 프레임이 화면에 표시돼요. 프레임의 크기는 물체의 크기에 따라 변경되며, 물체는 자동으로 추적돼요.",
    ],
  },
  {
    no: "4",
    title: "라인 추적",
    en: "Line Tracking",
    desc:
      "지정된 색상의 라인을 추적하는 기능이에요. 경로 예측을 수행할 수 있어요.",
    points: [
      "선을 감지하여 학습하면, 학습을 바탕으로 파란색 예측 선을 출력해요.",
    ],
  },
  {
    no: "5",
    title: "색상 인식",
    en: "Color Recognition",
    desc:
      "지정된 색상을 학습하고 인식할 수 있도록 하는 기능이에요. 유사한 색은 임계값 설정을 통해 색의 정확도를 조절할 수 있어요.",
  },
  {
    no: "6",
    title: "태그 인식",
    en: "Tag Recognition",
    desc:
      "태그를 감지하고 지정된 태그를 학습, 인식, 추적할 수 있는 기능이에요.",
  },
  {
    no: "7",
    title: "객체 분류",
    en: "Object Classification",
    desc:
      "학습시키고 싶은 사물의 사진을 다량으로 찍어서 학습시키는 기능이에요. 사전에 학습되어 있는 사물 외에 사용자가 특정 사물을 학습시키고, 인식하고자 할 경우 사용해요.",
  },
  {
    no: "8",
    title: "QR코드 인식",
    en: "QR Recognition",
    desc:
      "QR코드를 학습시킬 수 있는 기능이에요. 허스키렌즈 프로에서 지원되며, 해당 기능이 없는 경우 반드시 펌웨어 업데이트를 해야 사용할 수 있어요.",
  },
  {
    no: "9",
    title: "바코드 인식",
    en: "Barcode Recognition",
    desc:
      "바코드를 학습시킬 수 있는 기능이에요. 허스키렌즈 프로에서 지원되며, 해당 기능이 없는 경우 반드시 펌웨어 업데이트를 해야 사용할 수 있어요.",
  },
];

export const HUSKY_MB_PRACTICE = {
  steps: [
    "허스키렌즈에서 객체 인식(Object Recognition)을 선택한 뒤 사람과 자동차를 먼저 학습시켜요. (사람은 ID1, 자동차는 ID2)",
    "카메라에 사람이 인식되면 마이크로비트에 웃는 표정을 보여줘요.",
    "카메라에 자동차가 인식되면 마이크로비트에 슬픈 표정을 보여줘요.",
    "카메라에 학습된 사물이 인식되지 않으면 X 표시를 해요.",
  ],
};

export const HUSKY_APPS: Array<{ title: string; desc: string }> = [
  { title: "얼굴인식 상자 열기", desc: "얼굴이 인식되면 상자가 열리는 프로그램을 만들어요." },
  { title: "차량 인식", desc: "카메라에 지나가는 차량을 인식해요." },
  { title: "인구 밀집도", desc: "화면에 보이는 사람 수로 인구 밀집도를 확인해요." },
];
