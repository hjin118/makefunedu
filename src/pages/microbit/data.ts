// 마이크로비트 페이지 콘텐츠 데이터 — 마이크로비트교육.pptx(86슬라이드) 원문 기반

export type NavItem = { id: string; no: string; label: string };

export type BoardPart = { no: number; name: string };

export type FeatureItem = { no: string; title: string; desc: string };

export type StepItem = { no: string; title: string; desc: string };

export type PracticeItem = {
  no: string;
  title: string;
  wiringSlide: number;
  programSlide: number;
  wiring: string;
  program: string;
};

export type SensorItem = {
  name: string;
  slides: number[];
  goal: string;
  tool: string;
};

export type ProjectItem = {
  title: string;
  slides: number[];
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
    wiringSlide: 22,
    programSlide: 23,
    wiring: "마이크로비트에 LED를 연결해요.",
    program: "LED ON / OFF 블록으로 LED를 켜고 꺼요.",
  },
  {
    no: "2",
    title: "글자 나타내기",
    wiringSlide: 24,
    programSlide: 25,
    wiring: "마이크로비트에 LED 화면을 그대로 사용해요.",
    program: "글자를 나타내는 블록으로 마이크로비트에 글자를 띄워요.",
  },
  {
    no: "3",
    title: "소리 ON / OFF 제어",
    wiringSlide: 26,
    programSlide: 27,
    wiring: "마이크로비트에 소리 부품(부저)을 연결해요.",
    program: "소리 ON / OFF 블록으로 소리를 켜고 꺼요.",
  },
  {
    no: "4",
    title: "네오픽셀 색깔 나타내기",
    wiringSlide: 28,
    programSlide: 29,
    wiring: "마이크로비트에 네오픽셀을 연결해 ON / OFF 제어해요.",
    program: "네오픽셀 블록으로 색깔을 나타내요.",
  },
  {
    no: "5",
    title: "서보모터 각도 제어",
    wiringSlide: 30,
    programSlide: 31,
    wiring: "마이크로비트에 서보모터를 연결해요.",
    program: "서보모터 블록으로 각도를 제어해요.",
  },
];

/* ---------- ⑤ 센서 읽기 3종 ---------- */

export const SENSOR_ITEMS: SensorItem[] = [
  {
    name: "빛 감지 센서",
    slides: [33, 34],
    goal: "마이크로비트에 빛 감지 센서를 연결해 센서 값을 읽어와요.",
    tool: "mblock",
  },
  {
    name: "초음파 센서",
    slides: [35, 36],
    goal: "마이크로비트에 초음파 센서를 연결해 센서 값을 읽어와요.",
    tool: "mblock",
  },
  {
    name: "수분 센서",
    slides: [37, 38],
    goal: "마이크로비트에 수분 센서를 연결해 센서 값을 읽어와요.",
    tool: "mblock",
  },
];

/* ---------- ⑥ 프로젝트 3종 ---------- */

export const PROJECT_ITEMS: ProjectItem[] = [
  {
    title: "스마트 가로등",
    slides: [40, 41],
    parts: ["LED", "CDS(빛 감지) 센서"],
    desc: "LED와 CDS(빛 감지) 센서를 활용해 스마트 가로등을 만들어요.",
  },
  {
    title: "수해경보기",
    slides: [42, 43],
    parts: ["네오픽셀 LED", "수분센서"],
    desc: "네오픽셀 LED와 수분센서를 활용해 수해경보기를 만들어요.",
  },
  {
    title: "도난 경보기",
    slides: [44, 45],
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

/* ---------- 슬라이드 원본 자료 (마이크로비트교육.pptx 86슬라이드) ---------- */
// files: public/images/microbit/ 의 원본 이미지 (mp4 동영상은 제외)
// text: 슬라이드 전사 텍스트 (.omo/microbit-textbook.txt 기반)

export type Slide = {
  no: number;
  section: string;
  title?: string;
  files: string[];
  text: string[];
};

export const SLIDES: Slide[] = [
  // ① 시작하기 (s1~7)
  {
    no: 1,
    section: "start",
    title: "마이크로비트 사용하기",
    files: [],
    text: ["마이크로비트 및 확장보드"],
  },
  { no: 2, section: "start", title: "사용할 마이크로비트 및 확장보드", files: ["image21.png", "image20.png"], text: [] },
  { no: 3, section: "start", title: "마이크로비트 구조", files: ["image23.png", "image22.png"], text: [] },
  { no: 4, section: "start", title: "마이크로비트 구조", files: ["image24.png"], text: [] },
  {
    no: 5,
    section: "start",
    title: "마이크로 비트 확장보드",
    files: ["image26.png", "image25.png"],
    text: [ROBOTBIT_INTRO],
  },
  {
    no: 6,
    section: "start",
    title: "마이크로 비트 확장보드",
    files: ["image28.png", "image27.png"],
    text: BOARD_PARTS.map((part) => `${part.no}. ${part.name}`),
  },
  {
    no: 7,
    section: "start",
    title: "마이크로 비트 확장보드",
    files: ["image30.png", "image29.png", "image32.png", "image31.png"],
    text: [
      "1) RGB 네오픽셀 (pin16번에 연결)",
      "2) 서보 모터 제어 3Pin",
      "3) DC 모터/스테퍼 모터 지원",
      "4) 마이크로 비트의 I/O 포트",
    ],
  },
  // ② 부품 연결하는 법 (s8~14)
  { no: 8, section: "wiring", title: "실습하기", files: [], text: [] },
  { no: 9, section: "wiring", title: "부품 연결하는 법", files: ["image33.png"], text: [] },
  { no: 10, section: "wiring", title: "부품 연결하는 법", files: ["image34.png"], text: [] },
  { no: 11, section: "wiring", title: "부품 연결하는 법", files: ["image35.png"], text: [] },
  { no: 12, section: "wiring", title: "부품 연결하는 법", files: ["image36.png"], text: [] },
  { no: 13, section: "wiring", title: "부품 연결하는 법", files: ["image37.png"], text: [] },
  { no: 14, section: "wiring", title: "부품 연결하는 법", files: ["image38.png"], text: [] },
  // ③ 프로그래밍 시작하기 (s15~21)
  {
    no: 15,
    section: "coding",
    title: "프로그램 에디터 접속방법 : 주소창에 pxt.io 입력",
    files: ["image39.png", "image40.png"],
    text: ["pxt.io"],
  },
  {
    no: 16,
    section: "coding",
    title: "기본구조-프로그램 에디터",
    files: ["image41.png"],
    text: ["시뮬레이터 화면", "명령어 블록", "프로그래밍 창"],
  },
  {
    no: 17,
    section: "coding",
    title: "필요한 소스 다운받기",
    files: ["image42.png", "image45.png", "image44.png", "image43.png"],
    text: [],
  },
  { no: 18, section: "coding", title: "마이크로 비트 프로그래밍 연습", files: ["image46.png"], text: [] },
  {
    no: 19,
    section: "coding",
    title: "프로그램 에디터로 간단한 프로그래밍",
    files: ["image47.png", "image48.png"],
    text: [
      "기본 명령어 블록에서 아이콘 출력, 문자열 출력을 가져와서 블록에 끼운다.",
      "Simulator에 결과 나타남",
    ],
  },
  {
    no: 20,
    section: "coding",
    title: "변수 사용하여 숫자 세기 프로그램",
    files: ["image49.png", "image50.png"],
    text: [
      "흔들면 숫자가 하나씩 증가함, 전자 줄넘기 만들기 가능",
      "변수를 사용하고, A 버튼 누르면 리셋되는 프로그램",
      "변수 만들기",
    ],
  },
  {
    no: 21,
    section: "coding",
    title: "도전 과제 1 : 숫자가 10 단위를 넘어갈 때마다 음악 나오기",
    files: ["image51.png"],
    text: ["조건문을 사용하여 값들을 비교한다.", "이 부분을 어떻게 바꾸면 될까?"],
  },
  // ④ 출력 실습 5종 (s22~31)
  {
    no: 22,
    section: "output",
    title: "마이크로비트에 LED를 연결해 LED ON /OFF 제어 하기",
    files: ["image52.png"],
    text: [],
  },
  {
    no: 23,
    section: "output",
    title: "마이크로비트에 LED를 연결해 LED ON /OFF 제어 하기",
    files: ["image53.png"],
    text: [],
  },
  { no: 24, section: "output", title: "마이크로비트에 글자 나타내기", files: ["image54.png"], text: [] },
  { no: 25, section: "output", title: "마이크로비트에 글자 나타내기", files: ["image55.png"], text: [] },
  {
    no: 26,
    section: "output",
    title: "마이크로비트에 소리 ON / OFF 제어 하기",
    files: ["image54.png"],
    text: [],
  },
  {
    no: 27,
    section: "output",
    title: "마이크로비트에 소리 ON / OFF 제어 하기",
    files: ["image56.png"],
    text: [],
  },
  {
    no: 28,
    section: "output",
    title: "마이크로비트에 네오픽셀 연결해 ON / OFF 제어 하기",
    files: ["image57.png"],
    text: [],
  },
  {
    no: 29,
    section: "output",
    title: "마이크로비트에 네오픽셀 연결해 색깔 나타내기",
    files: ["image58.png"],
    text: [],
  },
  {
    no: 30,
    section: "output",
    title: "마이크로 비트에 서보모터 연결해서 각도 제어 하기",
    files: ["image59.png"],
    text: [],
  },
  {
    no: 31,
    section: "output",
    title: "마이크로 비트에 서보모터 연결해서 각도 제어 하기",
    files: ["image60.png"],
    text: [],
  },
  // ⑤ 센서 읽기 3종 (s32~38)
  {
    no: 32,
    section: "sensor",
    title: "마이크로비트 센서 사용",
    files: [],
    text: ["마이크로비트 센서 값 읽어보기"],
  },
  { no: 33, section: "sensor", title: "마이크로비트에 빛 감지 센서 값 읽어오기", files: ["image61.png"], text: [] },
  {
    no: 34,
    section: "sensor",
    title: "마이크로비트에 빛 감지센서 값 읽어오기",
    files: ["image62.png"],
    text: ["mblock 실습"],
  },
  {
    no: 35,
    section: "sensor",
    title: "마이크로비트에 초음파 센서 값 읽어오기",
    files: ["image63.png"],
    text: ["mblock 실습"],
  },
  {
    no: 36,
    section: "sensor",
    title: "아두이노 보드에 초음파센서와 LCD 연결해서 센서값 읽어오기",
    files: ["image64.png"],
    text: ["mblock 실습"],
  },
  {
    no: 37,
    section: "sensor",
    title: "마이크로비트에 수분센서값 읽어오기",
    files: ["image65.png"],
    text: ["mblock 실습"],
  },
  {
    no: 38,
    section: "sensor",
    title: "마이크로비트에 수분 센서값 읽어오기",
    files: ["image66.png"],
    text: ["mblock 실습"],
  },
  // ⑥ 프로젝트 3종 (s39~45)
  {
    no: 39,
    section: "project",
    title: "아두이노 센서",
    files: [],
    text: ["아두이노 센서활용 project"],
  },
  {
    no: 40,
    section: "project",
    title: "LED 와 CDS(빛 감지) 센서를 활용한 스마트 가로등",
    files: ["image67.png"],
    text: [],
  },
  {
    no: 41,
    section: "project",
    title: "LED 와 CDS(빛 감지) 센서를 활용한 스마트 가로등",
    files: ["image68.png"],
    text: ["mblock 실습"],
  },
  {
    no: 42,
    section: "project",
    title: "네오픽셀 LED와 수분센서를 활용한 수해경보기 만들기",
    files: ["image69.png"],
    text: [],
  },
  {
    no: 43,
    section: "project",
    title: "네오픽셀 LED와 수분센서를 활용한 수해경보기 만들기",
    files: ["image70.png"],
    text: ["mblock 실습"],
  },
  {
    no: 44,
    section: "project",
    title: "네오픽셀 LED, 초음파센서, 부저를 활용한 도난 경보기 만들기",
    files: ["image71.png"],
    text: [],
  },
  {
    no: 45,
    section: "project",
    title: "네오픽셀 LED, 초음파센서, 부저를 활용한 도난 경보기 만들기",
    files: ["image73.png", "image72.png"],
    text: ["mblock 실습"],
  },
  // ⑦ 음성보드 (s46~55)
  { no: 46, section: "voice", title: "아두이노 와 음성보드", files: [], text: ["음성보드 사용법"] },
  {
    no: 47,
    section: "voice",
    title: "음성보드 음성 파일 변경하는 방법",
    files: ["image74.PNG"],
    text: ["1. 마이크로 SD 카드 삽입", "2. https://ttsfree.com/ko 접속", "11. C 타입 전원 연결"],
  },
  {
    no: 48,
    section: "voice",
    title: "음성보드 음성 파일 변경하는 방법",
    files: ["image75.png"],
    text: ["3. 홈페이지 접속 후 아래 입력상자에 글자 입력"],
  },
  {
    no: 49,
    section: "voice",
    title: "음성보드 음성 파일 변경하는 방법",
    files: ["image76.png"],
    text: ["4. 원하는 음성과 말하는 속도 설정"],
  },
  {
    no: 50,
    section: "voice",
    title: "음성보드 음성 파일 변경하는 방법",
    files: ["image77.png"],
    text: ["5. 글자 입력과 음성 설정 후 클릭!"],
  },
  {
    no: 51,
    section: "voice",
    title: "음성보드 음성 파일 변경하는 방법",
    files: ["image78.png"],
    text: ["6. 음성 출력 및 재생 확인 후 다운로드 클릭"],
  },
  {
    no: 52,
    section: "voice",
    title: "음성보드 음성 파일 변경하는 방법",
    files: ["image80.png", "image79.png"],
    text: ["7. 다운로드 폴더 클릭", "8. 파일 클릭후 파일명을 숫자로 변경!"],
  },
  {
    no: 53,
    section: "voice",
    title: "음성보드 음성 파일 변경하는 방법",
    files: ["image82.png", "image81.png"],
    text: ["9. 숫자로 변경한 파일을 복사", "10. USB 드라이브에 붙여넣기"],
  },
  { no: 54, section: "voice", title: "음성보드 사용법 (연결방법)", files: ["image83.png"], text: [] },
  { no: 55, section: "voice", title: "음성보드 사용법 (마이크로비트)", files: ["image84.png"], text: [] },
  // ⑧ 허스키렌즈 AI 카메라 (s56~86)
  { no: 56, section: "huskylens", title: "아두이노 와 허스키렌즈", files: [], text: ["허스키렌즈란"] },
  {
    no: 57,
    section: "huskylens",
    title: "허스키렌즈 란",
    files: ["image85.JPEG", "image86.JPEG"],
    text: [
      "인공지능 카메라란?",
      "- 카메라를 통해 이미지 학습과 이미지 인식이 가능한 인공지능 비전 센서 장착",
      "- 복잡한 프로그래밍 없이도 AI 영상 인식 기술 사용 가능",
      "- 얼굴 인식, 객체 추적, 객체 인식, 라인 추적, 색상 인식, 태그 인식, 객체 분류 ,QR코드 인식, 바코드 인식",
    ],
  },
  {
    no: 58,
    section: "huskylens",
    title: "허스키 렌즈 구조",
    files: ["image87.png"],
    text: ["학습버튼", "기능버튼", "허스키 렌즈"],
  },
  { no: 59, section: "huskylens", title: "허스키 렌즈", files: ["image89.png", "image88.png", "image90.png"], text: [] },
  {
    no: 60,
    section: "huskylens",
    title: "허스키 설명",
    files: ["image91.png"],
    text: [
      "허스키 렌즈 연결",
      "UART / I2C",
      "- UART : 아두이노 소프트웨어 시리얼(SoftwareSerial)로 통신연결",
      "- I2C : 아두이노 18, 19핀(A4, A5)을 활용하여 통신",
      "USB CONNECTOR",
      "허스키렌즈의 펌웨어 업그레이드 시 사용",
    ],
  },
  {
    no: 61,
    section: "huskylens",
    title: "허스키 설명",
    files: ["image92.png"],
    text: [
      "학습하기 버튼 (PRESS)",
      "- 목표 학습하거나, 학습된 모델을 초기화 할 때 사용합니다.",
      "기능 버튼 (PRESS)",
      "- 허스키렌즈 모델과 설정을 이동할 때 사용합니다.",
      "- 모델의 세부 설정을 할 때 사용합니다.",
    ],
  },
  { no: 62, section: "huskylens", files: ["image93.png"], text: [] },
  {
    no: 63,
    section: "huskylens",
    title: "허스키 렌즈 화면 설명",
    files: ["image94.png"],
    text: [
      "색상 | 상태",
      "주황색에서 노란색으로, 노란색에서 주황색으로 | 아직 대상을 배우지 않았지만 배울 준비가 되어 있습니다.",
      "노란색 | 새로운 객체 학습",
      "푸른색 | 대상을 학습하고 인식함",
    ],
  },
  {
    no: 64,
    section: "huskylens",
    title: "허스키 렌즈 화면 초기화 방법",
    files: ["image95.png"],
    text: [
      "1. 학습버튼을 누르면 오른쪽 그림과 같은 화면이 나온다.",
      "2. 시간 초 내에 학습버튼을 누르게 되면 학습한 모든 이미지를 지운다.",
    ],
  },
  {
    no: 65,
    section: "huskylens",
    title: "허스키 렌즈 기능",
    files: ["image96.png", "image98.JPEG", "image97.png"],
    text: [
      "얼굴 인식 (Face Recognition)",
      "얼굴을 감지할 수 있는 기능이며, 다중 얼굴 인식이 가능하다.",
      "다중 얼굴 인식을 위해서는 설정에서 Learn Multiple 기능을 활성화해야 한다.",
      "얼굴 인식 / 다중 얼굴 인식 / 다중 학습 기능",
    ],
  },
  {
    no: 66,
    section: "huskylens",
    title: "얼굴 인식 방법",
    files: ["image96.png", "image101.png", "image100.png", "image99.png"],
    text: [
      "+ 기호를 얼굴에 정중앙을 맞춘 뒤 \"학습 버튼\"을 짧게 눌러 학습합니다.",
      "허스키렌즈가 동일한 얼굴을 인식하면 \"Face: ID1\"이라는 단어가 포함된 파란색 프레임이 화면에 표시되며 학습된 얼굴을 감지합니다",
      "프레임의 크기는 얼굴의 크기에 따라 변경되며 얼굴은 자동으로 추적됩니다",
    ],
  },
  { no: 67, section: "huskylens", files: ["image102.png"], text: [] },
  {
    no: 68,
    section: "huskylens",
    title: "허스키 렌즈 주요 기능",
    files: ["image103.png", "image104.png"],
    text: [
      "2. 물체 추적 (Object Tracking)",
      "목표가 되는 물체를 학습하고 추적할 수 있습니다. 하나의 개체만 추적 할 수 있으며 여러 개체는 지원되지 않습니다.",
      "기능버튼을 길게 눌러 물체 추적의 매개변수를 설정합니다. Learn Eable, Auto Save",
    ],
  },
  {
    no: 69,
    section: "huskylens",
    title: "허스키렌즈 물체 추적 인식 방법",
    files: ["image105.JPEG"],
    text: [
      "지정된 사물을 학습하고, 추적할 수 있도록 하는 기능이다.",
      "허스키 렌즈를 목표 물체에 대고 화면 중앙의 노란색 프레임에 포함될 때까지 거리 조정 후 학습 버튼을 길게 눌러 다양한 각도와 거리에서 물체를 학습시켜야 한다.",
      "학습이 진행되는 동안 \"Learning: ID1\"이라는 단어가 있는 노란색 프레임이 화면에 표시됩니다.",
    ],
  },
  {
    no: 70,
    section: "huskylens",
    title: "허스키 렌즈 주요 기능",
    files: ["image106.JPEG", "image107.JPEG"],
    text: [
      "3. 객체 인식 (Object Recognition)",
      "미리 학습된 사물 20가지를 인식할 수 있도록 하는 기능이다.",
      "비행기, 자전거, 새, 배, 병, 버스, 자동차, 고양이, 의자, 소, 식탁, 개, 말, 오토바이, 사람, 화분, 양, 소파, 기차, TV",
    ],
  },
  {
    no: 71,
    section: "huskylens",
    title: "물체 인식 방법",
    files: ["image99.png", "image110.png", "image109.png", "image108.png"],
    text: [
      "허스키 렌즈가 사물을 인식하면 이미 학습된 이름 \"dog\"단어와 흰색 프레임이 나타납니다",
      "+ 기호를 물체 정중앙에 맞춘 뒤 \"학습 버튼\"을 짧게 눌러 학습합니다.",
      "허스키렌즈가 동일한 물체를 인식하면 \"dog: ID1\"이라는 단어가 나타납니다",
      "포함된 파란색 프레임이 화면에 표시되며 학습된 물체를 감지합니다",
      "프레임의 크기는 물체의 크기에 따라 변경되며 물체는 자동으로 추적됩니다",
    ],
  },
  { no: 72, section: "huskylens", files: ["image111.png"], text: [] },
  {
    no: 73,
    section: "huskylens",
    title: "허스키 렌즈 주요 기능",
    files: ["image112.JPEG", "image114.JPEG", "image113.JPEG"],
    text: [
      "4. 라인 추적(Line Tracking)",
      "지정된 색상의 라인을 추적하는 기능이다.",
      "경로 예측을 수행할 수 있다.",
      "선을 감지하여 학습하면, 학습을 바탕으로 파란색 예측 선을 출력합니다",
    ],
  },
  {
    no: 74,
    section: "huskylens",
    title: "허스키 렌즈 주요 기능",
    files: ["image115.JPEG", "image117.JPEG", "image116.JPEG"],
    text: [
      "5. 색상 인식(Color Recognition)",
      "지정된 색상을 학습하고 인식할 수 있도록 하는 기능이다.",
      "유사한 색은 임계값 설정을 통해 색의 정확도를 조절할 수 있다.",
    ],
  },
  {
    no: 75,
    section: "huskylens",
    title: "허스키 렌즈 주요 기능",
    files: ["image118.JPEG", "image119.JPEG"],
    text: [
      "6. 태그 인식(Tag Recognition)",
      "태그를 감지하고 지정된 태그를 학습, 인식, 추적할 수 있는 기능이다.",
    ],
  },
  {
    no: 76,
    section: "huskylens",
    title: "허스키 렌즈 주요 기능",
    files: ["image120.JPEG", "image122.JPEG", "image121.JPEG"],
    text: [
      "7. 객체 분류(Object Classification)",
      "학습 시키고 싶은 사물의 사진을 다량으로 찍어서 학습시키는 기능이다.",
      "사전에 학습되어 있는 사물 외에 사용자가 특정 사물을 학습시키고, 인식하고자 할 경우 사용한다.",
    ],
  },
  {
    no: 77,
    section: "huskylens",
    title: "허스키 렌즈 주요 기능",
    files: ["image123.JPEG", "image124.JPEG"],
    text: [
      "8. QR코드 인식(QR Recognition)",
      "QR코드를 학습시킬 수 있는 기능이다.",
      "허스키 렌즈 프로에서 지원되며, 해당 기능이 없는 경우 반드시 펌웨어 업데이트를 해야 사용할 수 있다.",
    ],
  },
  {
    no: 78,
    section: "huskylens",
    title: "허스키 렌즈 주요 기능",
    files: ["image125.JPEG", "image126.JPEG"],
    text: [
      "9. 바코드 인식(Barcode Recognition)",
      "바코드를 학습시킬 수 있는 기능이다.",
      "허스키 렌즈 프로에서 지원되며, 해당 기능이 없는 경우 반드시 펌웨어 업데이트를 해야 사용할 수 있다.",
    ],
  },
  {
    no: 79,
    section: "huskylens",
    title: "마이크로비트 실습 (연결방법)",
    files: ["image127.png"],
    text: ["마이크로비트에 허스키렌즈 연결하기"],
  },
  {
    no: 80,
    section: "huskylens",
    title: "마이크로비트에서 허스키 렌즈 프로그램 사용하기",
    files: ["image129.JPEG", "image128.JPEG"],
    text: [
      "허스키 렌즈의 코드는 총 24개의 블록으로 구성되어 있다.",
      "허스키 렌즈에서 사용한 기능(알고리즘)과 학습 시킨 ID 값으로 제어가 가능하다.",
    ],
  },
  {
    no: 81,
    section: "huskylens",
    title: "마이크로비트에서 허스키 렌즈 프로그램 사용하기",
    files: ["image130.JPEG"],
    text: [
      "허스키렌즈 : 객체 인식(Object Recognition)을 선택한 뒤 사람과 자동차를 먼저 학습시킨다. (사람은 ID1, 자동차는 ID2)",
      "알고리즘 : 카메라에 사람이 인식되면 마이크로비트에 웃는 표정",
      "카메라에 자동차가 인식되면 마이크로비트에 슬픈 표정",
      "카메라에 학습된 사물이 인식되지 않는다면 X 표시",
    ],
  },
  {
    no: 82,
    section: "huskylens",
    title: "마이크로비트 실습 (프로그램)",
    files: ["image131.png"],
    text: ["마이크로비트에 허스키렌즈 연결하기"],
  },
  {
    no: 83,
    section: "huskylens",
    title: "마이크로비트 얼굴인식 상자 열기 프로그램",
    files: ["image133.png", "image132.png"],
    text: ["마이크로비트 프로그램"],
  },
  {
    no: 84,
    section: "huskylens",
    title: "마이크로비트 얼굴인식 상자 열기 프로그램",
    files: ["image135.png", "image134.png"],
    text: ["마이크로비트 프로그램"],
  },
  { no: 85, section: "huskylens", title: "차량 인식", files: ["image137.png", "image136.png"], text: [] },
  { no: 86, section: "huskylens", title: "인구 밀집도", files: ["image138.png"], text: [] },
];

export function getSlides(section: string): Slide[] {
  return SLIDES.filter((slide) => slide.section === section);
}

export function getSlidesByNums(nums: number[]): Slide[] {
  return nums.map((no) => SLIDES[no - 1]);
}
