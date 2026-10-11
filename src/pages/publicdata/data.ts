// 공공데이터 활용 페이지 정적 데이터 — 공공 API(Open-Meteo·PokeAPI·OpenStreetMap·나이스 NEIS·에어코리아)
// 실습 프롬프트는 원문 그대로(생략 금지) 보관해요. 학생들이 복사해 AI에 붙여 넣는 템플릿이에요.

export type ApiCompareRow = {
  item: string;
  free: string;
  keyed: string;
};

export type ApiIntroRow = {
  name: string;
  feature: string;
  role: string;
  note?: string;
  noteLabel?: string;
};

export type PromptItem = {
  id: string;
  no: string;
  title: string;
  subtitle: string;
  lines: string[];
};

export type SectionNavItem = {
  id: string;
  no: string;
  label: string;
};

export const SECTION_NAV: SectionNavItem[] = [
  { id: "concept", no: "①", label: "공공데이터란?" },
  { id: "apis", no: "②", label: "활용 API 소개" },
  { id: "free", no: "③", label: "API 키 없이 사용" },
  { id: "key", no: "④", label: "API 키를 사용" },
];

/* ---------- ① 개념 ---------- */

export const CONCEPT_CARDS: Array<{ title: string; body: string }> = [
  {
    title: "공공데이터란?",
    body: "정부·공공기관이 만들어 국민에게 개방한 데이터예요. 기상, 대기질, 급식, 교통 등이 있고, 공공데이터포털(data.go.kr)에서 누구나 가져다 쓸 수 있어요.",
  },
  {
    title: "오픈 API란?",
    body: "프로그램끼리 데이터를 주고받는 창구예요. URL을 호출하면 JSON으로 데이터가 돌아와요.",
  },
];

export const API_COMPARE_ROWS: ApiCompareRow[] = [
  {
    item: "대상 API",
    free: "무료 API: Open-Meteo·PokeAPI·OpenStreetMap + 나이스 NEIS",
    keyed: "에어코리아(공공데이터포털) 등",
  },
  {
    item: "시작 방법",
    free: "키 발급 없이 바로 fetch 호출",
    keyed: "공공데이터포털 회원가입 후 서비스 신청으로 키 발급",
  },
  {
    item: "호출 방법",
    free: "누구나 즉시 사용",
    keyed: "URL에 키를 붙여 호출",
  },
  {
    item: "관리",
    free: "별도 절차 없음",
    keyed: "사용량·인증 관리",
  },
  {
    item: "나이스 NEIS 참고",
    free: "KEY 파라미터는 선택 — 없어도 동작하고, 넣으면 호출 한도가 늘어나요.",
    keyed: "에어코리아는 공공데이터포털 키 발급이 필요해요.",
  },
];

/* ---------- ② 활용 API 소개 표 ---------- */

export const API_INTRO_ROWS: ApiIntroRow[] = [
  {
    name: "OpenStreetMap (Nominatim) API",
    feature: "리버스 지오코딩(위경도 → 주소 변환)",
    role: '브라우저 GPS가 찾은 위도·경도 숫자를 "강남구 역삼동" 같은 사람이 읽을 수 있는 시·구·동 단위 실제 주소 텍스트로 변환',
    noteLabel: "장점",
    note: "전 세계 지도 데이터를 오픈소스로 제공하는 위키백과 같은 프로젝트로 한국의 '동' 단위까지 매우 정확.",
  },
  {
    name: "Open-Meteo 대기질 (Air Quality) API",
    feature: "실시간 미세먼지·오존 데이터 제공",
    role: "현재 위치 좌표 기반으로 초미세먼지(PM2.5)·미세먼지(PM10)·오존(O3) 실시간 농도를 가져옴. 체육활동 금지 등 경고 배너에 사용.",
  },
  {
    name: "Open-Meteo 기상특보 (Weather Forecast) API",
    feature: "실시간 날씨·온도 데이터 제공",
    role: "현재 기온·습도·체감온도·날씨 상태 코드(비·눈·천둥번개 등)를 가져옴. 체감온도 33도 초과 시 폭염 특보, 비/태풍 코드 시 호우 경보 배너.",
    noteLabel: "출처",
    note: "각국 기상청(WMO) 데이터 및 세계적 날씨 예측 모델링을 종합해 제공하는 오픈소스 API.",
  },
  {
    name: "나이스(NEIS) 교육정보 개방 포털 API",
    feature: "전국 초·중·고교 급식 식단표 제공(대한민국 교육부)",
    role: "관할 교육청 코드(부산 C10)와 학교 표준코드(남일중학교 7150146)·당일 날짜를 전송해 오늘의 급식 메뉴·칼로리 조회",
    noteLabel: "특징",
    note: 'KEY 선택 사항(없어도 호출 가능). 주말·공휴일·방학에는 INFO-300("해당하는 데이터가 없습니다") 반환 → 감지해 휴일 안내(🌕 달 아이콘) 예외 처리.',
  },
];

/* ---------- ③ API 키 없이 사용 — 나이스 NEIS 개념 ---------- */

export const NEIS_ROWS: Array<{ api: string; params: string; result: string }> = [
  {
    api: "학교 기본정보 검색 (schoolInfo)",
    params: "Type=json, ATPT_OFCDC_SC_CODE=C10 부산, SCHUL_NM=검색어",
    result: "표준학교코드(SD_SCHUL_CODE) 반환",
  },
  {
    api: "급식 식단 (mealServiceDietInfo)",
    params: "ATPT_OFCDC_SC_CODE=C10, SD_SCHUL_CODE, MMEAL_SC_CODE=2 중식, MLSV_YMD=오늘 날짜 YYYYMMDD, Type=json",
    result: "오늘의 급식 메뉴·칼로리 — 급식 없는 날 INFO-300 → 휴일 안내 카드(🌕) 예외 처리",
  },
];

/* ---------- 실습 프롬프트 6종 (원문 그대로) ---------- */

export const FREE_PROMPTS: PromptItem[] = [
  {
    id: "pokemon",
    no: "1",
    title: "포켓몬 스탯 비교 및 배틀 시뮬레이터",
    subtitle: "PokeAPI — 키 불필요",
    lines: [
      "[역할 정의] 너는 학생들을 위한 인터랙티브 에듀테크 콘텐츠를 제작하는 프런트엔드 엔지니어 및 게임 개발자야.",
      "[목표] PokeAPI를 호출하여 두 마리의 포켓몬 정보를 실시간으로 불러와 비교하고, 능력치 레이더 차트 분석 및 턴제 모의 배틀을 수행하는 단일 파일 웹 앱(index.html)을 제작해 줘.",
      "[기술 스택] 순수 HTML5, 바닐라 JavaScript (async/await 활용), Tailwind CSS (CDN), Chart.js (CDN).",
      "[API 명세] 상세 조회: https://pokeapi.co/api/v2/pokemon/{포켓몬이름 또는 도감번호} / 수집 데이터: 포켓몬 이름, 공식 일러스트(official-artwork) 이미지 URL, 타입(불꽃, 물 등), 6대 기본 스탯(체력, 공격, 방어, 특수공격, 특수방어, 스피드).",
      "[핵심 기능 요구사항] 1. 듀얼 검색 UI: 포켓몬 A와 B 각각 검색 입력창 2개 + 초보 학생용 추천 버튼(피카츄, 리자몽, 거북왕, 이상해꽃). 2. 비주얼 프로필 카드: 포켓몬 이미지, 타입 뱃지(타입별 테마 색상), 기본 스탯 진행 막대. 3. 능력치 비교 레이더 차트: Chart.js Radar로 포켓몬 A·B의 6대 능력치를 한 차트에 겹쳐 비교. 4. 턴제 배틀 시뮬레이터: '배틀 시작' 버튼 → 스피드가 빠른 포켓몬 선공, 공격력/방어력 기반으로 상대 체력을 깎는 과정을 콘솔/터미널 스타일 박스에 타임라인 로그로 한 줄씩 출력.",
      "[출력 형식] 다른 설명 없이 브라우저에서 바로 열 수 있는 완전한 단일 index.html 코드를 작성해 줘.",
    ],
  },
  {
    id: "weather",
    no: "2",
    title: "실시간 위치 기반 날씨 & 외출 지수 시각화 대시보드",
    subtitle: "Open-Meteo — 키 불필요",
    lines: [
      "[역할 정의] 너는 시니어 풀스택 웹 개발자이자 소프트웨어 교육 전문가야.",
      "[목표] Open-Meteo API를 연동하여 실시간 날씨 데이터를 가져오고, 학생들의 야외 활동 안전 지수를 시각화하는 반응형 단일 파일 웹 애플리케이션(index.html)을 개발해 줘.",
      "[기술 스택] 순수 HTML5, 바닐라 JavaScript (ES6+), Tailwind CSS (CDN 방식), Chart.js (CDN 방식), Lucide Icons (CDN 방식). 번들러나 백엔드 서버 없이 단일 index.html 파일만 브라우저에서 실행.",
      "[API 명세] 엔드포인트: https://api.open-meteo.com/v1/forecast / 필수 파라미터: latitude, longitude, current_weather=true, hourly=temperature_2m,relativehumidity_2m,precipitation_probability,uv_index / 기본 위치: 서울(위도 37.5665, 경도 126.9780). 부산·대구·인천·광주·대전·제주 선택 도시 드롭다운 + 사용자 직접 위도/경도 입력 폼 제공.",
      '[핵심 기능 요구사항] 1. 실시간 지표 카드: 현재 기온(°C), 날씨 상태(아이콘 매핑), 풍속(m/s), 자외선(UV) 지수 카드 표시. 2. 24시간 예보 차트: Chart.js로 향후 24시간 기온 곡선 + 강수 확률(막대) 혼합 차트. 3. 안전 외출 추천 위젯: 강수 확률·자외선·습도 조합으로 학생용 맞춤 안내 출력(예: "체육 수업 야외 활동 적합", "우산 필수 지참", "자외선 매우 높음 - 실내 권장"). 4. 예외·오류 처리: 네트워크 실패나 잘못된 좌표 입력 시 화면이 멈추지 않고 친절한 안내 메시지.',
      "[출력 형식] 생략된 코드 없이 복사해서 바로 실행할 수 있는 완성된 단일 HTML 파일 코드만 제공해 줘. 교육용으로 학생들이 코드를 분석할 수 있게 주요 로직에 친절한 한글 주석을 달아줘.",
    ],
  },
  {
    id: "smarthome",
    no: "3",
    title: "스마트 홈 시스템 + ESP32 네오픽셀 연동",
    subtitle: "무료 날씨 API + 가상 시뮬레이션",
    lines: [
      "너는 프론트엔드 전문 개발자이자 UI/UX 디자이너야. 공공 API와 연동되는 [스마트 홈시스템] 웹 애플리케이션을 단일 HTML 파일(HTML, CSS, JS 포함)로 작성해 줘. 상단 대형 스마트 홈 전경 일러스트 애니메이션 — 반응형 SVG 기반으로 스마트홈 시스템을 만들고, CSS 키프레임을 적용해 시각적 완성도를 높인다.",
      '[상단 헤더] 시스템 타이틀: "스마트 홈 시스템" / 현재 시각 실시간 표시(초 단위).',
      "[카드 1: 실시간 대기질 & 야외활동 가이드 (무료API사용)] 표시 항목: 미세먼지(PM10)·초미세먼지(PM2.5)·오존(O3) 농도 및 등급 / UI: 수치에 따른 상태 게이지·배경색 변화(파랑: 좋음, 초록: 보통, 노랑: 나쁨, 빨강: 매우나쁨) / 안전 규칙: PM2.5 35㎍/㎥ 초과 시 16x16 네오픽셀에 마스크 챙겨 가는 애니메이션(ESP32에 연결된 네오픽셀도 연동).",
      "[카드 2: 실시간 기상특보 & 체감온도 (무료 API)] 표시 항목: 현재 기온·습도·체감온도·기상특보(폭염·한파·태풍·호우) 발령 상태 / 비상 알림: 호우·태풍·폭염 경보 시 상단 붉은 경보 배너 점멸 + 하교 안전 유의 텍스트 / 비가 오면 16X16 네오픽셀에 우산 챙겨 가는 애니메이션 표시 / 너무 추우면 옷 챙겨 가는 애니메이션 표시 / 미세먼지가 높거나 비가 오면 상황에 맞는 음성 안내 / 현재 집안 상태 실시간 대시보드 추가(온도·습도·빛 상태 등).",
      "미세먼지·기상 변화를 실시간 확인할 수 없으므로 상황을 재현하는 가상 시뮬레이터도 만들어라.",
    ],
  },
  {
    id: "school",
    no: "4",
    title: "스마트 학교 안전 통합 관제 대시보드",
    subtitle: "나이스 급식 API + 무료 날씨·대기질 API — KEY 없이 사용",
    lines: [
      "너는 프론트엔드 전문 개발자이자 UI/UX 디자이너야. 공공 API와 연동되는 [스마트 학교 안전 통합 관제 대시보드] 웹 애플리케이션을 단일 HTML 파일(HTML, CSS, JS 포함)로 작성해 줘. 상단 대형 학교 전경 일러스트 애니메이션 — 반응형 SVG 기반으로 본관·시계탑·게양대에서 펄럭이는 국기·창문 조명·운동장 트랙·좌우로 무한 드리프트하는 구름 CSS 키프레임 적용.",
      '[상단 헤더] 시스템 타이틀: "스마트 학교 안전 통합 관제 대시보드 (Smart School Safety)" / 대상 학교 설정: --중학교/선택, 현재 시각 실시간 표시(초 단위) / 비상 단계 표시기: 학교 종합 안전 지수(정상/주의/경계/심각) 뱃지.',
      "[카드 1: 실시간 대기질 & 야외활동 가이드 (무료API사용)] 미세먼지(PM10)·초미세먼지(PM2.5)·오존(O3) 농도 및 등급 / 수치에 따른 상태 게이지·배경색 변화(파랑: 좋음, 초록: 보통, 노랑: 나쁨, 빨강: 매우나쁨) / PM2.5 35㎍/㎥ 초과 시 \"실외 체육활동 금지 / 실내 활동 전환\" 경고 배너.",
      "[카드 2: 실시간 기상특보 & 체감온도 (무료 API)] 현재 기온·습도·체감온도·기상특보(폭염·한파·태풍·호우) 발령 상태 / 호우·태풍·폭염 경보 발령 시 상단 붉은 경보 배너 점멸 + 하교 안전 유의 텍스트.",
      "남일중 급식 사항을 알려 주라.",
    ],
  },
  {
    id: "lunch",
    no: "5",
    title: "우리학교 급식자랑 대시보드",
    subtitle: "나이스 API — KEY 선택(없어도 호출 가능)",
    lines: [
      '프로젝트 목표: 부산 동래구 중학교 "오늘의 급식 자랑 & 한줄평" 웹 대시보드 만들기. 중학생들이 우리 학교 급식 메뉴를 확인하고 친구들에게 공유하며 오늘의 급식에 별점과 한줄평 리뷰를 남길 수 있는 인터랙티브 급식 웹 대시보드. 단일 파일(HTML+CSS+JavaScript)로 작성.',
      "1. 사용 API(나이스 교육정보 개방 포털): 학교 기본정보 검색 API(schoolInfo — Type=json, ATPT_OFCDC_SC_CODE=C10, SCHUL_NM=검색어 → 학교명·표준학교코드 목록 반환) / 급식 식단 정보 API(mealServiceDietInfo — ATPT_OFCDC_SC_CODE=C10, SD_SCHUL_CODE 기본값 동래구 소재 중학교 예: 7150117 동래중학교(학교 검색 시 동적 변경), MMEAL_SC_CODE=2 중식, MLSV_YMD=오늘 날짜 YYYYMMDD, Type=json).",
      '2. 화면 구성·주요 기능: 트렌디한 급식판 테마(둥근 모서리·부드러운 그림자·파스텔톤 포인트), 모바일 반응형 / 상단 헤더: 선택된 학교명("🍱 동래중학교 급식 자랑!") + [학교 변경 🔍] 버튼(검색 모달) + 날짜 컨트롤러(< 어제 / 오늘 / 내일 >) / 학교 검색 모달: 학교명 검색 입력 → 결과 리스트 클릭 시 코드·이름 즉시 적용·모달 닫기, 선택 학교는 localStorage 저장해 새로고침 후에도 유지 / 메인 급식 카드(식판 형태): 밥·국·메인 반찬·후식 식판 칸칸이 그리드 배치, 알레르기 번호(1.5.13.)는 정규식(/\\([0-9.]+\\)/g) 제거해 깔끔한 메뉴명 표시(토글로 확인 가능), 총 칼로리 표시("🔥 오늘 급식: 820 kcal!") / 급식 리뷰 & 별점(localStorage 연동): 5점 만점 별 클릭 인터랙션, 한줄평 입력창 + [등록] 버튼, 등록된 별점·한줄평·작성 시간 리스트, localStorage에 [학교코드_날짜] 키로 저장해 날짜 이동 후 복귀 시 리뷰 유지(내 리뷰 삭제 버튼 포함) / 자랑하기: "📋 오늘 급식 친구에게 자랑하기" 클릭 시 [학교명/날짜/식단] 서식 복사 + "복사 완료! 친구에게 카톡으로 공유해 보세요 😋" 토스트.',
      '3. 필수 예외 처리: 주말·공휴일·방학에는 INFO-300("해당하는 데이터가 없습니다") 반환 → 에러 대신 귀여운 휴일 안내 카드: 🌕 달 아이콘 + "오늘은 급식이 쉬어가는 날이에요! 달콤한 휴일(방학) 보내세요 🌕" (리뷰 폼 비활성화/숨김).',
      "4. 개발 가이드: 프레임워크·무거운 외부 라이브러리 없이 순수 HTML5·CSS3·Vanilla JavaScript, fetch + async/await, 중학생·초보 개발자도 이해할 수 있게 함수·핵심 로직마다 상세한 한국어 주석.",
    ],
  },
];

/* ---------- ④ API 키를 사용하는 경우 — 지도 API 개념 ---------- */

export type KeyStep = { no: string; title: string; desc?: string };

export const PORTAL_KEY_STEPS: KeyStep[] = [
  {
    no: "1",
    title: "공공데이터포털(www.data.go.kr) 접속 후 회원가입",
    desc: "구글·네이버·카카오 계정 연동 가능",
  },
  {
    no: "2",
    title: '상단 검색창에 "대기오염 정보 조회" 입력',
    desc: "제공기관: 한국환경공단",
  },
  {
    no: "3",
    title: "상세 페이지에서 [활용신청] 클릭",
    desc: '활용 목적에 "교육" 정도만 적어도 돼요',
  },
  {
    no: "4",
    title: "이 API는 자동 승인이라 기다릴 필요 없어요",
  },
  {
    no: "5",
    title: "마이페이지 → 오픈 API → 인증키 발급 내역 → 일반 인증키(UTF-8) 복사",
  },
  {
    no: "6",
    title: "URL 뒤에 ?serviceKey=복사한_인증키 형태로 붙여 호출",
  },
];

export type MapApiCard = {
  title: string;
  rows: Array<[string, string]>;
};

export const MAP_API_CARDS: MapApiCard[] = [
  {
    title: "네이버 지도 API (NAVER Maps)",
    rows: [
      ["기능", "지도 표시·마커·정보창 제어"],
      ["발급 방법", "네이버 클라우드 플랫폼 콘솔 → Maps 서비스 신청 → Application 등록 후 Client ID 발급"],
      ["사용법", "maps.js 로드 주소 뒤에 ?ncpClientId=발급받은_ID를 붙여 호출"],
      ["참고", "연간 무료 크레딧 제공(교육용으로 충분)"],
    ],
  },
  {
    title: "구글 지도 API (Google Maps JavaScript API)",
    rows: [
      ["기능", "지도 표시·마커·경로·장소 검색"],
      ["발급 방법", "Google Cloud Console(console.cloud.google.com)에서 프로젝트 생성 → Maps JavaScript API 사용 설정 → API 키 생성"],
      ["사용법", "maps.googleapis.com/maps/api/js?key=발급받은_키"],
      ["참고", "월간 무료 제공량이 넉넉하며, 도난 방지를 위해 API 키에 웹사이트 제한을 걸어야 해요."],
    ],
  },
];

export const KEY_PROMPTS: PromptItem[] = [
  {
    id: "hospital",
    no: "6",
    title: "우리 동네 병원 위치 지도 — 네이버 지도 API",
    subtitle: "네이버 지도 API(NAVER Maps) — Client ID 발급",
    lines: [
      "[역할 정의] 너는 위치 기반 서비스(LBS)를 전문으로 하는 프런트엔드 개발자이자 UI/UX 디자이너야.",
      "[목표] 네이버 지도 API(NAVER Maps)를 연동하여 우리 동네 병원들의 위치를 지도 위 마커로 표시하고, 마커를 클릭하면 병원 정보를 볼 수 있는 단일 파일 웹 애플리케이션(index.html)을 제작해 줘.",
      "[사전 준비 — API 키 발급 방법] 1. 네이버 클라우드 플랫폼(ncp) 회원가입 2. 콘솔 → Services → AI·NAVER API → Maps 신청 3. Application 등록 후 Client ID와 Client Secret 확인 / 인증 실패 방지를 위해 웹 서비스 URL에 http://localhost:8080 또는 사용할 도메인을 등록.",
      "[기술 스택] 순수 HTML5, CSS3, 바닐라 JavaScript, NAVER Maps API v3 (네이버 클라우드 플랫폼).",
      "[핵심 기능 요구사항] 1. 전체 화면 지도: 부산 동래구 중심(위도 35.190, 경도 129.081)으로 지도를 표시하고 확대·축소 컨트롤을 활성화한다. 2. 병원 마커: 병원 목록(이름, 위도, 경도, 진료 과목)을 배열에 담아 지도 위에 마커로 표시한다(예시 병원 5개 이상). 3. 정보창(InfoWindow): 마커를 클릭하면 병원 이름·주소·전화번호가 담긴 정보창이 열리고 다른 곳을 클릭하면 닫힌다. 4. 마커 클릭 시 해당 병원을 지도 중심으로 부드럽게 이동한다.",
      '[출력 형식] API 키 자리에는 "YOUR_NAVER_CLIENT_ID" 문자열을 넣어 두고, 코드 위쪽에 "여기에 Client ID를 넣으세요"라는 한글 주석을 표시해 줘. 누락 없이 그대로 복사하여 사용할 수 있는 완성된 단일 index.html 코드로 출력해 줘.',
    ],
  },
  {
    id: "pharmacy",
    no: "7",
    title: "우리 동네 약국 찾기 지도 — 구글 지도 API",
    subtitle: "구글 지도 API — API 키 발급",
    lines: [
      "[역할 정의] 너는 위치 기반 서비스(LBS)를 전문으로 하는 프런트엔드 개발자야.",
      "[목표] Google Maps JavaScript API를 연동하여 우리 동네 약국들의 위치를 마커로 표시하고, 클릭 시 약국 정보를 보여 주는 단일 파일 웹 애플리케이션(index.html)을 제작해 줘.",
      "[사전 준비 — API 키 발급 방법] 1. Google Cloud Console(console.cloud.google.com) 접속 후 프로젝트 생성 2. API 및 서비스 → Maps JavaScript API 사용 설정 3. 사용자 인증 정보 → API 키 생성 / 도난 방지를 위해 웹사이트 제한에 사용할 도메인을 등록해 두세요.",
      "[기술 스택] 순수 HTML5, CSS3, 바닐라 JavaScript, Google Maps JavaScript API.",
      "[핵심 기능 요구사항] 1. 전체 화면 지도: 우리 동네 중심 좌표로 지도를 표시한다. 2. 약국 마커: 약국 목록(이름, 위도, 경도, 전화번호)을 배열에 담아 마커로 표시한다(예시 약국 5개 이상). 3. 정보창: 마커를 클릭하면 약국 이름·주소·전화번호가 담긴 정보창이 열린다. 4. 목록 사이드바: 화면 왼쪽에 약국 목록을 출력하고, 목록을 클릭하면 해당 약국 마커로 지도가 이동하며 정보창이 열린다.",
      '[출력 형식] API 키 자리에는 "YOUR_GOOGLE_MAPS_API_KEY" 문자열을 넣어 두고, 코드 위쪽에 "여기에 API 키를 넣으세요"라는 한글 주석을 표시해 줘. 누락 없이 그대로 복사하여 사용할 수 있는 완성된 단일 index.html 코드로 출력해 줘.',
    ],
  },
  {
    id: "trafficlight",
    no: "8",
    title: "실시간 도시 대기오염(미세먼지) 스마트 신호등 대시보드",
    subtitle: "에어코리아 API 키 확장 모드 포함 — 기본은 무료 Open-Meteo로도 실행 가능",
    lines: [
      "너는 환경 데이터 모니터링 시스템을 구축하는 IoT 및 스마트시티 대시보드 설계자야. 실시간 대기질 API를 호출하여 미세먼지(PM10)·초미세먼지(PM2.5)·대기질 지수를 학교 교실 안의 스마트 안전 전광판 형태로 표현하는 단일 웹 애플리케이션(index.html)을 제작해 줘.",
      "[기술 스택] 순수 HTML5, Tailwind CSS (CDN), Lucide Icons (CDN), 바닐라 JavaScript.",
      "[데이터 연동 방식 (수업 맞춤 듀얼 모드)] 기본 모드(키 발급 불필요): Open-Meteo Air Quality API 기본 호출(https://air-quality-api.open-meteo.com/v1/air-quality?latitude=37.5665&longitude=126.9780&current=pm10,pm2_5,european_aqi,ozone). 확장 모드: 공공데이터포털(에어코리아) 서비스키를 입력하면 한국환경공단 데이터를 CORS 프록시(allorigins)를 통해 호출할 수 있는 설정 모달 포함.",
      '[핵심 기능 요구사항] 1. 대형 4단계 안전 신호등: 대한민국 미세먼지 기준(좋음: 파랑, 보통: 초록, 나쁨: 노랑, 매우나쁨: 빨강)에 따라 배경색과 경고등이 동적으로 점등. 2. 실시간 데이터 vs 가상 시뮬레이션 슬라이더: \'실시간 API 데이터 모드\'와 \'가상 테스트 모드\' 토글 전환, 가상 모드에서 슬라이더로 미세먼지를 150 µg/m³ 이상으로 올리면 신호등과 경고음(웹 오디오 API 비프음) 작동 테스트. 3. 학교 행동 수칙 가이드: 등급에 맞춰 "교실 창문 환기 가능", "야외 체육 수업 중단 권고", "보건용 마스크 착용 필수" 등 안내 문구 자동 갱신.',
      "[출력 형식] 누락 없이 그대로 복사하여 사용할 수 있는 완성된 단일 index.html 코드로 출력해 줘.",
    ],
  },
];
