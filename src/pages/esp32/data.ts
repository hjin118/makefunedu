// 피지컬 AI (ESP32) 페이지 콘텐츠 데이터 — RoboFest ESP32 IoT 대시보드 교재(중학생용) + 실드 배선 자료 기반

export type SensorRow = {
  name: string;
  model: string;
  pin: string;
  value: string;
};

export type ActuatorRow = {
  name: string;
  pin: string;
  control: string;
};

export type PortMatrixRow = {
  type: string;
  layout: string;
  pins: string;
  wifi: string;
  recommend: string;
};

export type MasterPinRow = {
  sensor: string;
  signal: string;
  connector: string;
  label: string;
};

export type WireCard = {
  no: string;
  name: string;
  port: string;
  rows: Array<[string, string]>;
  desc: string;
  note?: string;
};

export type TopicRow = {
  topic: string;
  role: string;
};

export type DashboardRow = {
  area: string;
  what: string;
};

export type ObserveRow = {
  sensor: string;
  how: string;
};

export type WidgetRow = {
  widget: string;
  how: string;
};

export type TroubleRow = {
  symptom: string;
  cause: string;
  fix: string;
};

export type Quiz = {
  no: number;
  q: string;
  choices?: string[];
  blank?: string;
  answer: string;
};

export type GlossaryTerm = {
  term: string;
  en: string;
  def: string;
};

export type LessonRow = {
  phase: string;
  time: string;
  activity: string;
};

export type PracticeItem = {
  title: string;
  how: string[];
  record: string[];
  think: string;
};

export const SECTION_NAV: Array<{ id: string; no: string; label: string }> = [
  { id: "overview", no: "①", label: "개요" },
  { id: "hardware", no: "②", label: "하드웨어 목록" },
  { id: "pins", no: "③", label: "쉴드 핀 맵" },
  { id: "mqtt", no: "④", label: "MQTT" },
  { id: "dashboard", no: "⑤", label: "대시보드" },
  { id: "reading", no: "⑥", label: "값 읽기·제어" },
  { id: "practice", no: "⑦", label: "실습 활동" },
  { id: "trouble", no: "⑧", label: "문제 해결" },
  { id: "quiz", no: "⑨", label: "확인 문제" },
  { id: "glossary", no: "⑩", label: "용어 사전" },
  { id: "project", no: "⑪", label: "프로젝트 실습" },
  { id: "appendix", no: "⑫", label: "부록" },
];

export const SENSORS: SensorRow[] = [
  { name: "온도·습도", model: "DHT22", pin: "GPIO 4", value: "°C · %" },
  { name: "초음파 거리", model: "HC-SR04", pin: "TRIG 5 / ECHO 18", value: "cm (2~400)" },
  { name: "조도", model: "CDS", pin: "GPIO 7", value: "%" },
  { name: "토양 수분", model: "수분 센서", pin: "GPIO 2", value: "%" },
  { name: "금속 근접", model: "근접 센서", pin: "GPIO 6", value: "%" },
  { name: "가스", model: "MQ 계열", pin: "GPIO 1", value: "%" },
  { name: "화염", model: "화염 센서", pin: "GPIO 10", value: "%" },
  { name: "압력", model: "FSR", pin: "GPIO 11", value: "%" },
  { name: "기압·온도", model: "BMP280", pin: "I2C (SDA 8 / SCL 9)", value: "hPa · °C" },
  { name: "인체 감지", model: "PIR", pin: "GPIO 15", value: "감지됨 / 정상" },
  { name: "AI 카메라", model: "HuskyLens", pin: "I2C", value: "인식 결과" },
];

export const ACTUATORS: ActuatorRow[] = [
  { name: "부저", pin: "GPIO 12", control: "ON / OFF" },
  { name: "DC 모터", pin: "GPIO 16", control: "ON / OFF" },
  { name: "서보 모터", pin: "GPIO 14", control: "0~180°" },
  { name: "NeoPixel LED 12개", pin: "GPIO 13", control: "RGB 0~255 (3×4)" },
  { name: "OLED 화면", pin: "I2C (8 / 9)", control: "텍스트 4줄" },
  { name: "모션 컨트롤러", pin: "UART (RX 38 / TX 47)", control: "전진·후진·회전" },
];

export const PORT_MATRIX: PortMatrixRow[] = [
  {
    type: "아날로그 ADC1",
    layout: "G - V - S",
    pins: "1, 2, 4, 5, 6, 7, 10",
    wifi: "완벽 (Wi-Fi와 동시 사용 가능)",
    recommend: "조도 · 수분 · 온도",
  },
  {
    type: "디지털 전용",
    layout: "G - V - S",
    pins: "11, 12, 13, 14, 15, 16, 17, 18, 21, 38, 47",
    wifi: "제한 (디지털 I/O 권장)",
    recommend: "릴레이 · 서보 · LED",
  },
  {
    type: "4핀 복합",
    layout: "G - V - 5 - 18",
    pins: "5, 18",
    wifi: "완벽",
    recommend: "듀얼 채널 센서 (초음파)",
  },
  {
    type: "I2C 통신",
    layout: "G - V - SDA - SCL",
    pins: "SDA, SCL (GPIO 8 / 9)",
    wifi: "완벽",
    recommend: "디스플레이 · 복합 센서",
  },
];

export const SHIELD_ROWS: Array<{ row: string; ports: string }> = [
  { row: "상단 행", ports: "G-V-13 · G-V-12 · G-V-11 · G-V-10 · I2C 포트(SCL) · I2C 포트(SDA) · G-V-5-18" },
  { row: "중간 행", ports: "G-V-17 · G-V-18 · G-V-47 · G-V-38 · G-V-21 · G-V-16 · G-V-15 · G-V-14" },
  { row: "하단 행", ports: "G-V-0 · G-V-1 · G-V-2 · G-V-4(온/습도) · G-V-5 · G-V-6 · G-V-7(조도)" },
];

export const MASTER_PINS: MasterPinRow[] = [
  { sensor: "온/습도 (DHT11)", signal: "Digital", connector: "3-Pin", label: "G-V-4" },
  { sensor: "초음파 거리", signal: "Digital", connector: "4-Pin", label: "G-V-5-18" },
  { sensor: "조도 (CdS)", signal: "Analog", connector: "3-Pin", label: "G-V-7" },
  { sensor: "토양 수분", signal: "Analog", connector: "3-Pin", label: "G-V-2" },
  { sensor: "서보모터", signal: "PWM", connector: "3-Pin", label: "G-V-14" },
  { sensor: "네오픽셀", signal: "Digital", connector: "3-Pin", label: "G-V-13" },
  { sensor: "피에조 부저", signal: "Digital", connector: "3-Pin", label: "G-V-12" },
  { sensor: "DC 모터", signal: "PWM", connector: "3-Pin", label: "G-V-16" },
  { sensor: "OLED 디스플레이", signal: "I2C", connector: "4-Pin", label: "I2C 포트" },
  { sensor: "하스키렌즈", signal: "I2C", connector: "4-Pin", label: "I2C 포트" },
];

export const WIRE_CARDS: WireCard[] = [
  {
    no: "01·02",
    name: "온/습도 센서 (DHT11)",
    port: "하단 행 G-V-4",
    rows: [
      ["[-] 핀", "G 포트"],
      ["[+] 핀", "V 포트"],
      ["[S] 핀", "GPIO 4"],
    ],
    desc: "온도와 습도 데이터가 단일 디지털 핀(GPIO 4)으로 시리얼 형태로 동시에 전송돼요.",
  },
  {
    no: "03",
    name: "초음파 거리 센서",
    port: "상단 행 4핀 포트 G-V-5-18",
    rows: [
      ["[G] (GND)", "G 포트"],
      ["[V] (VCC)", "V 포트"],
      ["[T] (Trig)", "GPIO 5"],
      ["[E] (Echo)", "GPIO 18"],
    ],
    desc: "송신(Trig)과 수신(Echo) 두 데이터 라인이 필요해서 전용 4핀 포트(5/18)를 써요.",
  },
  {
    no: "04",
    name: "조도 센서 (Light Detection)",
    port: "하단 행 G-V-7",
    rows: [
      ["[GND]", "G 포트"],
      ["[VCC]", "V 포트"],
      ["[IN]", "GPIO 7"],
    ],
    desc: "광저항(CdS)이 빛의 강도를 아날로그 전압 값으로 바꿔 GPIO 7로 읽어요.",
  },
  {
    no: "05",
    name: "토양 수분 센서",
    port: "하단 행 G-V-2",
    rows: [
      ["[-]", "G 포트"],
      ["[+]", "V 포트"],
      ["[S]", "GPIO 2"],
    ],
    desc: "토양 수분량에 따른 저항 변화를 아날로그 신호로 출력해요.",
  },
  {
    no: "06",
    name: "네오픽셀 (WS2812B LED)",
    port: "상단 행 G-V-13",
    rows: [
      ["[GND]", "G 포트"],
      ["[5V]", "V 포트"],
      ["[DIN]", "GPIO 13 (Digital)"],
    ],
    desc: "단일 핀으로 24-bit RGB 컬러를 제어하는 디지털 출력 모듈이에요.",
    note: "데이터 흐름 방향(DIN → DOUT)을 확인하세요.",
  },
  {
    no: "07",
    name: "서보모터 (SG90)",
    port: "중간 행 G-V-14",
    rows: [
      ["케이블 [갈색]", "G 포트"],
      ["케이블 [빨강]", "V 포트"],
      ["케이블 [주황]", "GPIO 14 (PWM)"],
    ],
    desc: "정밀한 각도 제어를 위해 하드웨어 PWM이 할당된 중단 라인을 사용해요.",
  },
  {
    no: "08",
    name: "피에조 부저",
    port: "상단 행 G-V-12",
    rows: [
      ["[GND]", "G 포트"],
      ["[VCC]", "V 포트"],
      ["[Signal]", "GPIO 12"],
    ],
    desc: "단일 디지털 핀(GPIO 12)으로 소리를 내요. 핀 배열이 G-V-S 규격과 1:1로 일치해요.",
  },
  {
    no: "09",
    name: "DC 모터 및 드라이버",
    port: "중간 행 G-V-16",
    rows: [
      ["[GND]", "G 포트"],
      ["[VCC]", "V 포트"],
      ["[PWM/IN]", "GPIO 16"],
    ],
    desc: "모터 속도 제어용 PWM이 할당된 GPIO 16에 연결하고, 구동 전력은 V 포트에서 받아요.",
  },
  {
    no: "10",
    name: "0.96\" I2C OLED 디스플레이",
    port: "상단 행 I2C 포트",
    rows: [
      ["GND", "G 포트"],
      ["VCC", "V 포트"],
      ["SCL", "SCL"],
      ["SDA", "SDA"],
    ],
    desc: "SCL이 데이터 타이밍을 맞추고, SDA가 실제 픽셀 데이터를 고속으로 그려요.",
    note: "전원을 차단한 후 연결하세요. 전원이 켜진 상태에서 연결하면 정상 동작하지 않을 수 있어요.",
  },
  {
    no: "11",
    name: "하스키렌즈 (HuskyLens)",
    port: "상단 행 I2C 포트",
    rows: [
      ["[-]", "G 포트"],
      ["[+]", "V 포트"],
      ["[T/SCL]", "Clock (SCL)"],
      ["[R/SDA]", "Data (SDA)"],
    ],
    desc: "AI가 분석한 얼굴 인식·객체 추적 결과가 듀얼 신호선으로 실시간 전송돼요.",
  },
];

export const TOPICS: TopicRow[] = [
  { topic: "esp32/sensor/...", role: "센서 값을 1초마다 발행해요" },
  { topic: "esp32/control/...", role: "대시보드에서 내려오는 제어 명령이에요" },
  { topic: "esp32/status", role: "online / offline 연결 상태를 알려줘요" },
  { topic: "esp32/control/request = \"1\"", role: "게이지가 비어 있을 때 최신 상태를 다시 달라고 요청해요" },
];

export const DASHBOARD_LAYOUT: DashboardRow[] = [
  { area: "상단 연결 바", what: "브로커 연결 상태와 ESP32 online 표시" },
  { area: "센서 게이지 11개", what: "온도·습도·거리·조도·수분 등 센서 값을 한눈에" },
  { area: "감지 카드 (PIR)", what: "사람 움직임이 감지됐는지 알려줘요" },
  { area: "시계열 차트", what: "센서 값이 시간에 따라 변하는 모습을 선으로 그려요" },
  { area: "제어 위젯", what: "부저·모터·서보·NeoPixel·OLED를 직접 조작해요" },
  { area: "HuskyLens 카드", what: "AI 카메라가 인식한 결과를 보여줘요" },
  { area: "교육 자료 패널", what: "수업에 필요한 참고 자료를 함께 보여줘요" },
];

export const OBSERVE_POINTS: ObserveRow[] = [
  { sensor: "온습도", how: "손을 대면 온도·습도가 올라가요" },
  { sensor: "초음파 거리", how: "손을 가까이·멀리 움직여 보세요" },
  { sensor: "조도", how: "센서를 손으로 가려 보세요" },
  { sensor: "기압", how: "손가락으로 눌러도 값이 잘 안 변해요" },
  { sensor: "PIR", how: "움직임이 있을 때만 감지돼요" },
];

export const WIDGETS: WidgetRow[] = [
  { widget: "부저", how: "ON/OFF 버튼 · 밀리초(ms)로 울릴 시간을 정해요" },
  { widget: "DC 모터", how: "ON ↔ OFF로 돌리고 멈춰요" },
  { widget: "서보", how: "슬라이더로 0~180°를 움직여요 (90°가 정면)" },
  { widget: "NeoPixel", how: "12칸 격자에서 픽셀을 골라 색을 입히고, 밝기는 0~255로 정해요" },
  { widget: "OLED", how: "4줄까지 원하는 텍스트를 화면에 띄워요" },
  { widget: "모션", how: "방향 패드로 전진·후진·회전을 시켜요" },
];

export const TROUBLESHOOTING: TroubleRow[] = [
  {
    symptom: "대시보드에 연결이 안 돼요",
    cause: "MQTT 브로커 프로그램이 꺼졌거나, 주소를 잘못 입력했어요",
    fix: "브로커 앱을 실행하고 ws://localhost:9001 주소를 다시 확인해요",
  },
  {
    symptom: "ESP32가 offline으로 보여요",
    cause: "전원이나 Wi-Fi 연결이 끊겼어요",
    fix: "USB 케이블을 다시 꽂고 Wi-Fi 연결을 확인해요",
  },
  {
    symptom: "게이지가 비어 있어요",
    cause: "대시보드가 구독을 시작하기 전에 값이 지나갔어요",
    fix: "다시 연결하거나 request(상태 재요청)를 보내요",
  },
  {
    symptom: "기압·온도 값이 멈췄어요",
    cause: "BMP280과의 통신이 잠깐 실패했어요",
    fix: "10회 연속 실패하면 30초 후 자동으로 다시 시작해요. 300~2,000 hPa 범위 밖의 값은 무시해요",
  },
  {
    symptom: "PIR이 멋대로 감지됐다고 해요",
    cause: "전원을 켜고 난 직후의 예열(웜업) 시간이에요",
    fix: "30~60초 기다린 뒤 다시 관찰해요",
  },
  {
    symptom: "NeoPixel 색이 이상해요",
    cause: "밝기가 너무 낮거나 격자 위치 설정이 어긋났어요",
    fix: "밝기를 올리고 12칸 격자 설정을 다시 확인해요",
  },
  {
    symptom: "압력 센서 값이 항상 0이에요",
    cause: "ADC2 핀은 Wi-Fi와 간섭해요",
    fix: "ADC1인 GPIO 3으로 센서를 옮겨 연결해요",
  },
  {
    symptom: "OLED 화면이 안 켜져요",
    cause: "전원이 켜진 상태에서 연결했어요",
    fix: "전원을 끈 다음 다시 연결해요",
  },
];

export const QUIZZES: Quiz[] = [
  {
    no: 1,
    q: "IoT란 무엇인가요?",
    choices: [
      "인터넷에서 하는 온라인 게임 기술",
      "센서가 달린 사물들이 인터넷으로 정보를 주고받는 기술",
      "로봇을 움직이는 프로그래밍 언어",
    ],
    answer: "2번",
  },
  {
    no: 2,
    q: "센서 값이 대시보드까지 가는 올바른 순서는 무엇인가요?",
    choices: [
      "대시보드 → ESP32 → MQTT 브로커 → 센서",
      "센서 → ESP32 → MQTT 브로커 → 대시보드",
      "MQTT 브로커 → 센서 → 대시보드 → ESP32",
    ],
    answer: "2번",
  },
  {
    no: 3,
    q: "MQTT에서 '우체국' 역할을 하는 것은 무엇인가요?",
    choices: ["토픽", "브로커", "JSON"],
    answer: "브로커",
  },
  {
    no: 4,
    q: "벽까지의 거리를 cm 단위로 잴 때 쓰는 센서는 무엇인가요?",
    choices: ["조도 센서", "초음파 거리 센서", "PIR 센서"],
    answer: "초음파 거리 센서",
  },
  {
    no: 5,
    q: "지구의 평균 기압은 약 얼마인가요?",
    choices: ["100 hPa", "1,013 hPa", "4,095 hPa"],
    answer: "1,013 hPa",
  },
  {
    no: 6,
    q: "BMP280과 OLED가 연결되는, 두 줄(SDA·SCL)로 통신하는 버스는 무엇인가요?",
    choices: ["UART", "GPIO", "I2C"],
    answer: "I2C",
  },
  {
    no: 7,
    q: "LWT(유언장 메시지)에 대한 설명으로 맞는 것은 무엇인가요?",
    choices: [
      "브로커가 지운 오래된 메시지예요",
      "ESP32가 갑자기 연결이 끊겼을 때 브로커가 대신 알려 주는 메시지예요",
      "대시보드가 보내는 제어 명령이에요",
    ],
    answer: "2번",
  },
  {
    no: 8,
    q: "ESP32는 센서 값을 몇 초에 한 번씩 발행하나요?",
    choices: ["1분마다", "10초마다", "1초마다"],
    answer: "1초마다",
  },
  {
    no: 9,
    q: "PIR 센서는 전원을 켠 뒤 (　　) 시간 동안은 멋대로 감지할 수 있어서 30~60초 정도 기다려야 해요.",
    blank: "예열(웜업)",
    answer: "예열(웜업)",
  },
  {
    no: 10,
    q: "게이지 값이 순간적으로 이상하게 보이면 당황하지 말고 잠시 (　　) 다시 관찰해 보세요. 고장처럼 보이는 것도 소중한 데이터예요.",
    blank: "기다린다",
    answer: "기다린다",
  },
];

export const GLOSSARY: GlossaryTerm[] = [
  { term: "IoT", en: "Internet of Things", def: "센서가 달린 사물들이 인터넷으로 서로 정보를 주고받는 기술이에요." },
  { term: "JSON", en: "JavaScript Object Notation", def: "데이터를 { }와 :로 깔끔하게 정리해 주고받는 글 형식이에요." },
  { term: "MQTT", en: "Message Queuing Telemetry Transport", def: "사물들이 가벼운 메시지를 주고받는 통신 규칙이에요." },
  { term: "브로커", en: "Broker", def: "메시지를 받아서 주소(토픽)에 맞게 배달해 주는 우체국이에요." },
  { term: "토픽", en: "Topic", def: "메시지가 어디로 갈지 정하는 주소예요. 예: esp32/sensor/temperature" },
  { term: "발행", en: "Publish", def: "메시지를 토픽에 올려 보내는 일이에요." },
  { term: "구독", en: "Subscribe", def: "특정 토픽의 메시지를 계속 받아 보는 일이에요." },
  { term: "retained", en: "Retained Message", def: "브로커가 보관해 두는 메시지예요. 새로 구독하면 마지막 값을 바로 받아요." },
  { term: "LWT", en: "Last Will and Testament", def: "ESP32가 갑자기 연결이 끊기면 브로커가 대신 보내는 유언장 메시지예요." },
  { term: "WebSocket", en: "WebSocket (포트 9001)", def: "브라우저가 브로커와 실시간으로 통신하는 연결 방식이에요." },
  { term: "센서", en: "Sensor", def: "빛·온도·거리 같은 세상의 변화를 감지해서 값으로 바꾸는 부품이에요." },
  { term: "액추에이터", en: "Actuator", def: "전기 신호를 받아 움직이거나 소리·빛을 내는 부품이에요." },
  { term: "마이크로컨트롤러", en: "Microcontroller", def: "센서 값을 읽고 판단해서 움직이게 하는 작은 두뇌 칩이에요." },
  { term: "GPIO", en: "General Purpose Input/Output", def: "입력도 출력도 할 수 있는 범용 핀이에요." },
  { term: "ADC", en: "Analog to Digital Converter", def: "0~4095처럼 연속적인 아날로그 전압을 숫자로 바꿔 주는 장치예요." },
  { term: "I2C", en: "Inter-Integrated Circuit", def: "SDA·SCL 두 줄로 여러 부품과 통신하는 방식이에요." },
  { term: "UART", en: "Universal Asynchronous Receiver/Transmitter", def: "RX·TX 두 줄로 데이터를 주고받는 직렬 통신 방식이에요." },
  { term: "펌웨어", en: "Firmware", def: "ESP32 안에 올려 두는 프로그램이에요." },
  { term: "게이지", en: "Gauge", def: "센서 값이 지금 얼마인지 눈금으로 보여 주는 그림이에요." },
  { term: "시계열 차트", en: "Time Series Chart", def: "값이 시간에 따라 변하는 모습을 선으로 그린 그래프예요." },
];

export const LESSON_PLAN: Array<{ session: string; rows: LessonRow[] }> = [
  {
    session: "1차시",
    rows: [
      { phase: "도입", time: "10분", activity: "IoT 사례 토의 (스마트 스피커·스마트 홈 화분·내비게이션)" },
      { phase: "전개", time: "15분", activity: "하드웨어 살펴보기 + MQTT 개념" },
      { phase: "전개", time: "15분", activity: "대시보드 연결 실습" },
      { phase: "정리", time: "10분", activity: "실습 1~2 (방 공기 관찰 일기 · 초음파 거리 검증)" },
    ],
  },
  {
    session: "2차시",
    rows: [
      { phase: "도입", time: "5분", activity: "지난 시간 복습" },
      { phase: "전개", time: "15분", activity: "제어 위젯 사용해 보기" },
      { phase: "전개", time: "20분", activity: "실습 3~6 (PIR 탐정 · 기압 날씨 · 어둠 알람 · NeoPixel 아트)" },
      { phase: "정리", time: "10분", activity: "확인 문제 · 용어 사전" },
    ],
  },
];

export const SAFETY_RULES: string[] = [
  "모터가 도는 동안에는 손가락을 넣지 않아요.",
  "부저는 짧게 짧게 울려요.",
  "배선이 연결된 상태에서 부품을 뽑거나 꽂지 않아요.",
  "물은 전자부품의 최대의 적! 물가에서 조심해요.",
  "문제가 생기면 전원을 끄고 선생님을 호출해요.",
];

export type SlidePanel = {
  label?: string;
  table: { head: string[]; rows: string[][] };
};export type SlideEntry = {
  file: string;
  caption: string;
  lead?: string;
  panels: SlidePanel[];
  note?: string;
};

export const MATRIX_SLIDES: SlideEntry[] = [
  {
    file: "slide-01.png",
    caption: "표지 — 실드 배선 마스터 가이드",
    lead: "직관적이고 안전한 10종 센서 회로 연결 블루프린트예요. 배선은 색으로 약속돼 있어요.",
    panels: [
      {
        label: "배선 색상 범례",
        table: {
          head: ["색상", "의미"],
          rows: [
            ["검정 (Ground)", "Ground (접지)"],
            ["주황 (Voltage)", "Voltage (전원)"],
            ["파랑 (Signal)", "Signal (신호)"],
          ],
        },
      },
    ],
  },
  {
    file: "slide-02.png",
    caption: "G-V-S 코드 로직",
    lead: "케이블 스파게티를 완전 차단하는 코드 로직이에요.",
    panels: [
      {
        label: "3-Pin Logic",
        table: {
          head: ["핀", "명칭", "설명"],
          rows: [
            ["[G]", "Ground (접지)", "마이너스(-) 전원"],
            ["[V]", "Voltage (전원)", "플러스(+) 5V/3.3V 전원"],
            ["[S]", "Signal (신호)", "데이터 송수신 GPIO 핀"],
          ],
        },
      },
      {
        label: "4-Pin Logic",
        table: {
          head: ["핀", "명칭", "설명"],
          rows: [
            ["[G]", "Ground (접지)", "마이너스(-) 전원"],
            ["[V]", "Voltage (전원)", "플러스(+) 5V/3.3V 전원"],
            ["듀얼 신호 1", "Dual Signal", "I2C 통신 및 복합 모듈용 데이터 라인"],
            ["듀얼 신호 2", "Dual Signal", "I2C 통신 및 복합 모듈용 데이터 라인"],
          ],
        },
      },
    ],
  },
  {
    file: "slide-03.png",
    caption: "핵심 설계 철학: G-V-S 로직의 이해",
    lead: "센서의 케이블 순서를 G-V-S 로직에 맞추기만 하면 물리적 연결이 완성돼요.",
    panels: [
      {
        label: "실드 보드 포트 배치 (3행 × 3핀 G-V-S 커넥터)",
        table: {
          head: ["행", "포트 (좌→우)"],
          rows: [
            ["상단 행", "G-V-13 · G-V-12 · G-V-11 · G-V-10 · I2C 포트(SCL) · I2C 포트(SDA) · G-V-5-18"],
            ["중간 행", "G-V-17 · G-V-18 · G-V-47 · G-V-38 · G-V-21 · G-V-16 · G-V-15 · G-V-14"],
            ["하단 행", "G-V-0 · G-V-1 · G-V-2 · G-V-4 (온/습도) · G-V-5 · G-V-6 · G-V-7"],
          ],
        },
      },
    ],
  },
  {
    file: "slide-04.png",
    caption: "포트 매핑 테리토리",
    lead: "보드 영역별로 색상 구역이 나뉘어 있어요. 상단=파랑, 중단=주황, 하단=초록.",
    panels: [
      {
        table: {
          head: ["구역", "포트 목록"],
          rows: [
            ["상단 라인", "G-V-13 (네오픽셀) · G-V-12 · G-V-11 · G-V-10 · I2C 포트 · G-V-5-18 (초음파 전용)"],
            ["중단 라인", "G-V-17 · G-V-18 · G-V-47 · G-V-38 · G-V-21 · G-V-16 · G-V-15 · G-V-14 (서보모터)"],
            ["하단 라인", "G-V-0 · G-V-1 · G-V-2 (토양수분) · G-V-4 (온/습도) · G-V-5 · G-V-6 · G-V-7 (조도)"],
          ],
        },
      },
    ],
    note: "슬라이드 원문의 중단 라인에 G-V-16·G-V-14가 중복 표기돼 있어요. 보드 실제 배치는 17, 18, 47, 38, 21, 16, 15, 14 8포트예요.",
  },
  {
    file: "slide-05.png",
    caption: "마스터 핀 매핑 매트릭스",
    panels: [
      {
        table: {
          head: ["센서명", "신호 유형", "커넥터 타입", "실드 라벨"],
          rows: [
            ["온/습도 (DHT11)", "Digital", "3-Pin", "G-V-4"],
            ["초음파 거리", "Digital", "4-Pin", "G-V-5-18"],
            ["조도 (CdS)", "Analog", "3-Pin", "G-V-7"],
            ["토양 수분", "Analog", "3-Pin", "G-V-2"],
            ["서보모터", "PWM", "3-Pin", "G-V-14"],
            ["네오픽셀", "Digital", "3-Pin", "G-V-13"],
            ["피에조 부저", "Digital", "3-Pin", "G-V-12"],
            ["DC 모터", "PWM", "3-Pin", "G-V-16"],
            ["OLED 디스플레이", "I2C", "4-Pin", "I2C 포트"],
            ["하스키렌즈", "I2C", "4-Pin", "I2C 포트"],
          ],
        },
      },
    ],
    note: "모든 연결은 하드웨어 충돌을 방지하도록 최적의 핀 번호로 사전 할당됐어요.",
  },
  {
    file: "slide-06.png",
    caption: "01·02 온습도 센서 모듈 (GPIO 4)",
    panels: [
      {
        table: {
          head: ["센서 핀", "실드 포트"],
          rows: [
            ["[-] 핀", "[G] 포트"],
            ["[+] 핀", "[V] 포트"],
            ["[S] 핀", "GPIO 4"],
          ],
        },
      },
    ],
    lead: "온도와 습도 데이터는 단일 디지털 핀(GPIO 4)으로 시리얼 데이터 형태로 동시에 전송돼요. 하단 행 G-V-4 포트예요.",
  },
  {
    file: "slide-07.png",
    caption: "03 초음파 거리 센서 (GPIO 5·18)",
    panels: [
      {
        table: {
          head: ["센서 핀", "실드 포트"],
          rows: [
            ["[G] (GND)", "[G] 포트"],
            ["[V] (VCC)", "[V] 포트"],
            ["[T] (Trig)", "GPIO 5"],
            ["[E] (Echo)", "GPIO 18"],
          ],
        },
      },
    ],
    lead: "송신(Trigger)과 수신(Echo) 두 데이터 라인이 필요해서 실드의 전용 확장 포트(5/18)를 활용해요. 상단 행 우측 끝 4핀 포트예요.",
  },
  {
    file: "slide-08.png",
    caption: "04 조도 센서 (GPIO 7)",
    panels: [
      {
        table: {
          head: ["센서 핀", "실드 포트"],
          rows: [
            ["[GND]", "[G] 포트"],
            ["[VCC]", "[V] 포트"],
            ["[IN]", "GPIO 7"],
          ],
        },
      },
    ],
    lead: "광저항(CdS)이 빛의 강도를 아날로그 전압 값으로 바꿔 GPIO 7로 읽어요. 하단 행 우측 끝 포트예요.",
  },
  {
    file: "slide-09.png",
    caption: "05 토양 수분 센서 (GPIO 2)",
    panels: [
      {
        table: {
          head: ["센서 핀", "실드 포트"],
          rows: [
            ["[-]", "[G] 포트"],
            ["[+]", "[V] 포트"],
            ["[S]", "GPIO 2"],
          ],
        },
      },
    ],
    lead: "토양의 수분량에 따른 저항 변화를 아날로그 신호로 출력해요. 하단 행 3번째 포트예요.",
  },
  {
    file: "slide-10.png",
    caption: "06 네오픽셀 (GPIO 13)",
    panels: [
      {
        table: {
          head: ["모듈 핀", "실드 포트"],
          rows: [
            ["[GND]", "[G] 포트"],
            ["[5V]", "[V] 포트"],
            ["[DIN]", "GPIO 13 (Digital)"],
          ],
        },
      },
    ],
    lead: "단일 핀으로 24-bit RGB 컬러를 제어하는 디지털 출력 모듈이에요. 상단 행 좌측 첫 포트예요.",
    note: "데이터 흐름 방향(DIN → DOUT)에 주의하세요.",
  },
  {
    file: "slide-11.png",
    caption: "07 서보모터 (GPIO 14)",
    panels: [
      {
        table: {
          head: ["케이블 선", "실드 포트"],
          rows: [
            ["[갈색]", "[G] 포트"],
            ["[빨강]", "[V] 포트"],
            ["[주황]", "GPIO 14 (PWM)"],
          ],
        },
      },
    ],
    lead: "정밀한 각도 제어를 위해 하드웨어 PWM 출력이 할당된 중단 라인을 사용해요. 중단 행 우측 끝 포트예요.",
  },
  {
    file: "slide-12.png",
    caption: "08 피에조 부저 (GPIO 12)",
    panels: [
      {
        table: {
          head: ["핀", "실드 포트"],
          rows: [
            ["[GND]", "[G] 포트"],
            ["[VCC]", "[V] 포트"],
            ["[Signal]", "GPIO 12"],
          ],
        },
      },
    ],
    lead: "단일 디지털 핀(GPIO 12)으로 오디오 신호를 제어해요. 핀 배열이 G-V-S 규격과 1:1로 일치해요. 상단 행 2번째 포트예요.",
  },
  {
    file: "slide-13.png",
    caption: "09 DC 모터 (GPIO 16)",
    panels: [
      {
        table: {
          head: ["핀", "실드 포트"],
          rows: [
            ["[GND]", "[G] 포트"],
            ["[VCC]", "[V] 포트"],
            ["[PWM/IN]", "GPIO 16"],
          ],
        },
      },
    ],
    lead: "모터 속도 제어를 위해 하드웨어 PWM 출력이 할당된 GPIO 16에 연결하고, 모터 구동 전력은 실드의 V 포트에서 직접 공급받아요.",
  },
  {
    file: "slide-14.png",
    caption: "10 OLED 디스플레이 (I2C)",
    panels: [
      {
        table: {
          head: ["OLED 핀", "실드 포트"],
          rows: [
            ["GND", "[G] 포트"],
            ["VCC", "[V] 포트"],
            ["SCL", "SCL"],
            ["SDA", "SDA"],
          ],
        },
      },
    ],
    lead: "SCL이 데이터 타이밍을 맞추고, SDA가 실제 디스플레이 픽셀 데이터를 고속으로 그려요. 상단 행 우측 4핀 포트예요.",
    note: "OLED 연결 시 전원을 차단한 후 연결하세요. 전원이 켜진 상태에서 연결하면 정상적으로 동작하지 않을 수 있어요.",
  },
  {
    file: "slide-15.png",
    caption: "11 허스키렌즈 (I2C)",
    panels: [
      {
        table: {
          head: ["HuskyLens 핀", "실드 포트"],
          rows: [
            ["[-]", "[G] 포트"],
            ["[+]", "[V] 포트"],
            ["[T/SCL]", "Clock (SCL 클럭 라인)"],
            ["[R/SDA]", "Data (SDA 데이터 라인)"],
          ],
        },
      },
    ],
    lead: "AI가 분석한 얼굴 인식·객체 추적 결과가 듀얼 신호선을 통해 실시간으로 전송돼요. 상단 행 우측 포트예요.",
  },
];

export const PRACTICES: PracticeItem[] = [
  {
    title: "실습 1. 방 공기 관찰 일기",
    how: [
      "온습도 게이지를 5분마다 기록해요.",
      "창문을 열거나 닫은 뒤 값이 어떻게 변하는지 봐요.",
    ],
    record: ["시각", "온도(°C)", "습도(%)"],
    think: "습도가 변하는 이유는 무엇일까요?",
  },
  {
    title: "실습 2. 초음파 거리 검증",
    how: [
      "자로 잰 10cm, 20cm, 30cm에 센서를 놓아요.",
      "대시보드 게이지 값과 실제 거리를 비교해요.",
    ],
    record: ["실제 거리(cm)", "센서 값(cm)"],
    think: "값이 어긋난 이유는 무엇일까요? (센서는 박쥐처럼 소리의 왕복 시간으로 거리를 알아요.)",
  },
  {
    title: "실습 3. PIR 움직임 탐정",
    how: [
      "전원을 켜고 30~60초(예열) 기다려요.",
      "가만히 있을 때와 움직일 때 감지 카드를 비교해요.",
    ],
    record: ["상황", "감지 결과"],
    think: "아주 천천히 움직이면 감지될까요?",
  },
  {
    title: "실습 4. 기압으로 날씨 읽기",
    how: [
      "기압 게이지를 아침·점심·저녁에 기록해요.",
      "1,013 hPa보다 높은지 낮은지 표시해요.",
    ],
    record: ["시각", "기압(hPa)", "실제 날씨"],
    think: "1,013 hPa보다 낮아지면 비 올 확률이 높아진대요. 우리 지역에서도 그럴까요?",
  },
  {
    title: "실습 5. 어둠 감지 자동 알람 설계",
    how: [
      "조도 게이지를 손으로 가려 값의 범위를 알아요.",
      "'조도 20% 미만이면 부저 울리기' 규칙을 세워요.",
    ],
    record: ["조도(%)", "부저 동작"],
    think: "어두워질 때만 울리려면 조건을 어떻게 써야 할까요?",
  },
  {
    title: "실습 6. NeoPixel 픽셀 아트",
    how: [
      "3×4 격자에서 픽셀 12칸을 골라 색을 입혀요.",
      "RGB는 각각 0~255예요. 노란색은 빨강+초록을 섞어요.",
    ],
    record: ["픽셀 위치", "R·G·B 값"],
    think: "하늘색은 어떤 색을 섞으면 만들 수 있을까요?",
  },
];

export type ProjectSlide = {
  no: number;
  title: string;
  lines: string[];
  files: string[];
};

export type ProjectUnit = {
  id: string;
  no: string;
  title: string;
  problem: string;
  goal: string;
  checklist: string[];
  slides: ProjectSlide[];
  prompt: string;
  test: string;
};

export const PROJECT_SETUP = {
  supplies: [
    "하드웨어 구성품",
    "소프트웨어 환경",
    "PC와의 연결 포트 확인",
    "실행 프로그램: RoboFestesp32-1.0.0-amd64.exe",
  ],
  steps: [
    "대시보드 파일을 실행해요",
    "ESP32 보드를 USB로 연결해요",
    "연결 버튼을 클릭해요",
    "Wi-Fi 스캔 후 비밀번호를 입력해요",
    "아래로 드래그해 다음 IP를 선택해요",
    "설정 저장을 클릭해요",
    "플래시를 클릭한 다음 x로 종료해요",
    "연결을 클릭해요",
  ],
  slides: [
    {
      no: 1,
      title: "준비물 리스트",
      lines: [
        "하드웨어 구성품과 소프트웨어 환경을 확인하고, PC와의 연결 포트를 확인해요.",
        "실행 프로그램: RoboFestesp32-1.0.0-amd64.exe",
      ],
      files: ["s01-1.png", "s01-2.png", "s01-3.png"],
    },
    {
      no: 2,
      title: "연결 주의 사항",
      lines: [
        "ESP32-S3 메인 보드에 전원을 공급하고 코드를 업로드하려면 반드시 'J2 PROG' 포트에 USB-C 케이블을 연결해야 해요.",
        "주의: J3 DEBUG 포트는 일반적인 프로그래밍 용도가 아니에요.",
      ],
      files: ["s02-1.png", "s02-2.png"],
    },
    {
      no: 3,
      title: "1단계 · 파일 실행",
      lines: ["아래 그림과 같은 ESP32 대시보드 파일을 실행해요."],
      files: ["s03-1.png", "s03-2.png"],
    },
    {
      no: 4,
      title: "2단계 · USB 연결",
      lines: ["아래 그림과 같은 화면이 나타나면 ESP32 보드를 USB로 연결해요."],
      files: ["s04-1.png", "s04-2.png"],
    },
    {
      no: 5,
      title: "3단계 · 연결 버튼",
      lines: ["아래 그림과 같은 화면이 나타나면 ESP32 연결 버튼을 클릭해요."],
      files: ["s05-1.png", "s05-2.png"],
    },
    {
      no: 6,
      title: "4단계 · Wi-Fi 스캔",
      lines: [
        "아래 그림과 같은 화면이 나타나면 Wi-Fi 스캔 버튼을 클릭해서 사용할 Wi-Fi를 고르고 비밀번호를 입력해요.",
      ],
      files: ["s06-1.png", "s06-2.png", "s06-3.png", "s06-4.png", "s06-5.jpg"],
    },
    {
      no: 7,
      title: "5단계 · IP 선택",
      lines: [
        "아래 그림과 같이 아래로 드래그해 다음 IP 선택을 클릭한 다음 Wi-Fi IP를 클릭해요.",
      ],
      files: ["s07-1.png", "s07-2.png", "s07-3.png"],
    },
    {
      no: 8,
      title: "6단계 · 설정 저장",
      lines: [
        "왼쪽 그림과 같이 Wi-Fi 입력과 IP 설정이 끝나면 ESP32에 설정 저장을 클릭해요.",
      ],
      files: ["s08-1.jpg", "s08-2.png"],
    },
    {
      no: 9,
      title: "7단계 · 플래시",
      lines: [
        "왼쪽 그림과 같이 플래시를 클릭해 설정 항목을 ESP32 보드에 저장한 다음, x 표시를 클릭해 종료해요.",
      ],
      files: ["s09-1.jpg", "s09-2.png", "s09-3.png"],
    },
    {
      no: 10,
      title: "8단계 · 연결",
      lines: ["아래 그림과 같은 화면에서 연결을 클릭해요."],
      files: ["s10-1.png", "s10-2.png"],
    },
    {
      no: 11,
      title: "연결 완료 화면",
      lines: [],
      files: ["s11-1.png", "s11-2.png"],
    },
  ] satisfies ProjectSlide[],
};

export const PROJECT_UNITS: ProjectUnit[] = [
  {
    id: "flood",
    no: "1",
    title: "스마트 수해 경보기",
    problem:
      "주거 지역과 주요 시설의 수위 상승을 신속하게 감지하지 못해 수해 피해가 발생해요.",
    goal: "스스로 주변 수위를 실시간으로 인지하고, 위험 수위가 되면 부저로 경고하는 자동화 시스템을 만들어요.",
    checklist: [
      "ESP32-S3 보드 (두뇌)",
      "쉴드 보드 (확장)",
      "수위 센서 (측정)",
      "부저 모듈 (경고)",
      "IoT 대시보드 (통제실)",
    ],
    slides: [
      {
        no: 12,
        title: "프로젝트 소개",
        lines: [
          "핵심 프로젝트: 스스로 생각하는 '스마트 수해 경보기' 만들기",
        ],
        files: ["s12-1.png", "s12-2.png"],
      },
      {
        no: 13,
        title: "회로 연결",
        lines: ["ESP32 S3 보드에 수위 센서와 부저 모듈을 연결해요."],
        files: ["s13-1.png", "s13-2.png"],
      },
      {
        no: 14,
        title: "manus 열기",
        lines: ["아래 그림과 같은 화면에서 프롬프트 항목을 클릭해요."],
        files: ["s14-1.png", "s14-2.png"],
      },
      {
        no: 15,
        title: "manus 접속",
        lines: ["아래 그림과 같이 생성형 AI manus에 접속해요. (https://manus.im/app)"],
        files: ["s15-1.png", "s15-2.png"],
      },
      {
        no: 16,
        title: "manus 접속 확인",
        lines: ["아래 그림과 같이 manus에 접속해요."],
        files: ["s16-1.png", "s16-2.png"],
      },
      {
        no: 17,
        title: "프롬프트 붙여 넣기",
        lines: [
          "아래 그림과 같이 manus에 복사한 프롬프트를 붙여 넣은 다음, 수해 경보기 관련 디자인 프롬프트를 입력해요.",
        ],
        files: ["s17-1.png", "s17-2.png"],
      },
      {
        no: 18,
        title: "AI 프롬프트",
        lines: ["프롬프트 전문은 아래 박스에서 복사할 수 있어요."],
        files: ["s18-1.png"],
      },
      {
        no: 19,
        title: "테스트",
        lines: [
          "ESP32에 연결된 수위 센서 위에 물티슈를 이용해 수위 센서 값을 변화시키면, 화면에 물 높이가 변화하며 수해가 발생해요.",
        ],
        files: ["s19-1.png", "s19-2.png"],
      },
    ],
    prompt: [
      "스마트 수해 관제 대시보드를 단일 HTML 파일로 만들어주세요.",
      "mqtt.min.js CDN을 사용해 ws://localhost:9001 접속 버튼을 상단에 만들어주세요.",
      "접속 시 토픽 esp32/sensor/soil 을 구독하고, JSON의 percent 수위 값을 읽어 다크 테마 게이지와 제방 단면도 하천 높이에 연동해주세요.",
      "기준값 70 초과 시 붉은 경보 점멸과 내장 한국어 음성 대피 안내가 1번만 나오게 해주세요.",
      "외부 파일 없이 브라우저에서 바로 열리는 전체 코드로 작성해 주세요.",
    ].join("\n"),
    test: "ESP32에 연결된 수위 센서 위에 물티슈를 이용해 수위 값을 변화시키면, 화면의 물 높이가 올라가며 수해 상황이 재현돼요. 기준값 70을 넘으면 붉은 경보가 점멸돼요.",
  },
  {
    id: "lamp",
    no: "2",
    title: "스마트 가로등",
    problem: "사람이 없는 새벽에도 켜져 있는 가로등은 엄청난 에너지를 낭비해요.",
    goal: "주변의 밝기를 스스로 인지하고, 필요할 때만 불을 켜는 자동화 시스템을 만들어요.",
    checklist: [
      "ESP32-S3 보드 (두뇌)",
      "쉴드 보드 (확장)",
      "조도 센서 (눈)",
      "네오픽셀 (빛)",
      "IoT 대시보드 (통제실)",
    ],
    slides: [
      {
        no: 20,
        title: "프로젝트 소개",
        lines: [
          "핵심 프로젝트: 스스로 생각하는 '스마트 가로등' 만들기",
        ],
        files: ["s20-1.png", "s20-2.png"],
      },
      {
        no: 21,
        title: "준비물 리스트",
        lines: [
          "하드웨어 구성품과 소프트웨어 환경을 확인하고, PC와의 연결 포트를 확인해요.",
          "실행 프로그램: RoboFestesp32-1.0.0-amd64.exe",
        ],
        files: [
          "s21-1.png",
          "s21-2.png",
          "s21-3.png",
          "s21-4.jpeg",
          "s21-5.png",
        ],
      },
      {
        no: 22,
        title: "회로 연결",
        lines: ["ESP32 S3 보드에 조도 센서와 네오픽셀을 연결해요."],
        files: ["s22-1.png", "s22-2.png"],
      },
      {
        no: 23,
        title: "manus 열기",
        lines: ["아래 그림과 같은 화면에서 프롬프트 항목을 클릭해요."],
        files: ["s23-1.png", "s23-2.png"],
      },
      {
        no: 24,
        title: "manus 접속",
        lines: ["아래 그림과 같이 생성형 AI manus에 접속해요. (https://manus.im/app)"],
        files: ["s24-1.png", "s24-2.png"],
      },
      {
        no: 25,
        title: "manus 접속 확인",
        lines: ["아래 그림과 같이 manus에 접속해요."],
        files: ["s25-1.png", "s25-2.png"],
      },
      {
        no: 26,
        title: "프롬프트 붙여 넣기",
        lines: [
          "아래 그림과 같이 manus에 복사한 프롬프트를 붙여 넣은 다음, 스마트 가로등 관련 디자인 프롬프트를 입력해요.",
        ],
        files: ["s26-1.png", "s26-2.png"],
      },
      {
        no: 27,
        title: "AI 프롬프트",
        lines: ["프롬프트 전문은 아래 박스에서 복사할 수 있어요."],
        files: ["s27-1.png"],
      },
      {
        no: 28,
        title: "테스트",
        lines: [
          "ESP32에 연결된 조도 센서에 손을 올려 어둡게 만들면, 화면 속 가로등에 불이 켜져요.",
        ],
        files: ["s28-1.png", "s28-2.png"],
      },
    ],
    prompt: [
      "스마트 가로등 자동 제어 시스템을 단일 HTML 파일로 만들어 주세요.",
      "mqtt.min.js CDN을 사용하고, 상단에 ws://localhost:9001 접속 버튼과 '조도센서 GPIO 7' 라벨을 배치해 주세요.",
      "화면 전체에 사실적인 가로등 시뮬레이션(원경 도시, 도로, 가로등 광원 효과)을 크게 구성하고, 수동 제어 버튼과 실시간 로그창은 제외해 주세요.",
      "실시간 조도 센서 측정값(수치, 게이지 바)은 화면 하단부에 배치해 주세요.",
      "접속 시 esp32/sensor/cds 토픽을 구독해 JSON의 percent 값을 실시간 반영해 주세요.",
      "조도 percent 값이 30 미만이면 밤하늘 배경 전환과 가로등 자동 점등(esp32/control/lamp 로 \"ON\" 발행), 30 이상이면 낮 하늘 배경 전환과 가로등 자동 소등(\"OFF\" 발행)이 실행되게 해 주세요.",
      "외부 파일 없이 브라우저에서 바로 실행 가능한 전체 코드로 작성해 주세요.",
    ].join("\n"),
    test: "ESP32에 연결된 조도 센서에 손을 올려 어둡게 만들면, 화면 속 가로등에 불이 켜져요. 손을 치우면 다시 소등돼요.",
  },
  {
    id: "alarm",
    no: "3",
    title: "스마트 도난경보기",
    problem:
      "비인가자의 접근이나 침입을 신속하게 감지하지 못해 도난·보안 피해가 발생해요.",
    goal: "침입자와의 거리를 실시간으로 감지하고, 위험 범위에 접근하면 부저로 경고하는 자동화 시스템을 만들어요.",
    checklist: [
      "ESP32-S3 보드 (두뇌)",
      "쉴드 보드 (확장)",
      "초음파 센서 (거리)",
      "부저 모듈 (경고음)",
      "IoT 대시보드 (통제실)",
    ],
    slides: [
      {
        no: 29,
        title: "프로젝트 소개",
        lines: [
          "핵심 프로젝트: 스스로 생각하는 '스마트 도난경보기' 만들기",
        ],
        files: ["s29-1.png", "s29-2.png"],
      },
      {
        no: 30,
        title: "준비물 리스트",
        lines: [
          "하드웨어 구성품과 소프트웨어 환경을 확인하고, PC와의 연결 포트를 확인해요.",
          "실행 프로그램: RoboFestesp32-1.0.0-amd64.exe",
        ],
        files: [
          "s30-1.png",
          "s30-2.png",
          "s30-3.png",
          "s30-4.png",
          "s30-5.png",
        ],
      },
      {
        no: 31,
        title: "회로 연결",
        lines: ["ESP32 S3 보드에 초음파 센서와 부저 모듈을 연결해요."],
        files: ["s31-1.png", "s31-2.png"],
      },
      {
        no: 32,
        title: "manus 열기",
        lines: ["아래 그림과 같은 화면에서 프롬프트 항목을 클릭해요."],
        files: ["s32-1.png", "s32-2.png"],
      },
      {
        no: 33,
        title: "manus 접속",
        lines: ["아래 그림과 같이 생성형 AI manus에 접속해요. (https://manus.im/app)"],
        files: ["s33-1.png", "s33-2.png"],
      },
      {
        no: 34,
        title: "manus 접속 확인",
        lines: ["아래 그림과 같이 manus에 접속해요."],
        files: ["s34-1.png", "s34-2.png"],
      },
      {
        no: 35,
        title: "프롬프트 붙여 넣기",
        lines: [
          "아래 그림과 같이 manus에 복사한 프롬프트를 붙여 넣은 다음, 도난 경보기 관련 디자인 프롬프트를 입력해요.",
        ],
        files: ["s35-1.png", "s35-2.png"],
      },
      {
        no: 36,
        title: "AI 프롬프트",
        lines: ["프롬프트 전문은 아래 박스에서 복사할 수 있어요."],
        files: ["s36-1.png"],
      },
      {
        no: 37,
        title: "테스트",
        lines: [
          "ESP32에 연결된 초음파 센서에 손을 올려 거리 값을 만들면, 화면에서 도난경보기가 동작해요.",
        ],
        files: ["s37-1.png", "s37-2.png"],
      },
      {
        no: 38,
        title: "마무리",
        lines: [],
        files: ["s38-1.png"],
      },
    ],
    prompt: [
      "초음파 스마트 물체 도난경보기를 단일 HTML 파일로 만들어 주세요.",
      "mqtt.min.js CDN을 사용하고, 상단에 ws://localhost:9001 접속 버튼과 '초음파센서 Trig:5 Echo:18' 라벨을 배치해 주세요.",
      "물체 감시 시뮬레이션 화면은 사실적인 그래픽(보호 물체 및 레이저 감시 뷰)으로 크게 구성하고, 측정된 실시간 거리(cm) 값과 게이지는 화면 하단부에 직관적으로 배치해 주세요.",
      "접속 시 esp32/sensor/ultrasonic 토픽을 구독하여 JSON의 distance(cm) 값을 실시간으로 반영해 주세요.",
      "보호 중인 물체가 이탈/도난당해 측정 거리가 30cm를 초과하면 화면 붉은색 경보 점멸, 브라우저 비프음 재생, esp32/control/led로 \"ON\"을 발행해 주세요. 물체가 다시 놓여 30cm 이하가 되면 정상 상태로 복귀하며 \"OFF\"를 발행하고, 수동 경보 해제 버튼과 하단 1줄 크기의 컴팩트한 MQTT 실시간 수신 로그창도 포함해 주세요.",
      "외부 파일 없이 브라우저에서 바로 실행 가능한 전체 코드로 작성해 주세요.",
    ].join("\n"),
    test: "ESP32에 연결된 초음파 센서에서 보호 물체를 치우면 거리가 30cm를 넘어 붉은 경보·비프음이 울려요. 물체를 다시 놓으면 정상 상태로 돌아와요.",
  },
];
