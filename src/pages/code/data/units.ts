// 코딩 단원 — 파이썬 10단원 · 자바스크립트 10단원
// 문제·개념 스키마는 인공지능 수학(aimath)의 Problem/Concept 타입을 그대로 재사용해요.

import type { Concept, Problem } from "../../aimath/data/units";

export type SubjectId = "python" | "js";

export type UnitAccent = {
  main: string;
  soft: string;
};

export type CodeLesson = {
  title: string;
  desc: string;
  /** 바로 돌려 볼 수 있는 예제 코드 */
  code: string;
  /** 실행 결과 또는 실행 설명 */
  result: string;
};

export type CodeUnit = {
  id: string;
  roman: string;
  icon: string;
  accent: UnitAccent;
  title: string;
  short: string;
  intro: readonly string[];
  story: string;
  lessons: readonly CodeLesson[];
  concepts: readonly Concept[];
  problems: readonly Problem[];
};

export type Subject = {
  id: SubjectId;
  label: string;
  intro: string;
  units: readonly CodeUnit[];
};

const PYTHON_UNITS: readonly CodeUnit[] = [
  {
    id: "py1",
    roman: "Ⅰ",
    icon: "📦",
    accent: { main: "#0ea5e9", soft: "#e0f2fe" },
    title: "변수와 자료형",
    short: "값에 이름표를 붙여 보관하는 변수와 숫자·글자의 차이를 배워요.",
    intro: [
      "컴퓨터는 기억력이 아주 좋아요. 이 단원에서는 값을 이름표를 붙여 보관하는 '변수'와, 숫자·글자 같은 자료형을 배워요.",
      "코드 몇 줄로 계산과 인사를 맡겨 보면서, 파이썬과 친해져요.",
    ],
    story:
      "방과 후, 하람이가 노트북을 열고 말했어요. '오늘은 파이썬에게 물건 보관을 맡겨 볼 거야.' 도하가 물었어요. '컴퓨터가 물건을 어디에 보관하는데?' 하람이가 age = 12라고 입력하자, 비티가 화면을 읽었어요. 'age라는 이름표에 12를 붙여 두었어요!' 세림이가 정리했어요. '이름표를 변수, 담긴 내용의 종류를 자료형이라고 불러.' 오늘은 이름표 붙이기부터 시작해요.",
    lessons: [
      {
        title: "첫 변수 만들기",
        desc: "등호(=)로 이름표를 붙여 값을 보관해요.",
        code: 'name = "도하"\nage = 12\nprint(name)\nprint(age)',
        result: "도하\n12",
      },
      {
        title: "숫자와 문자열은 다르게 생겼어요",
        desc: "따옴표가 있으면 글자, 없으면 숫자예요.",
        code: 'num = 7            # 숫자\nword = "7"         # 문자열\nprint(num + 3)     # 숫자끼리 더하면 계산해요\nprint(word + "!")  # 문자열끼리 더하면 이어 붙여요',
        result: "10\n7!",
      },
      {
        title: "자료형 바꾸기",
        desc: "int()와 str()로 값의 모양을 바꿔요.",
        code: 'n = int("5")      # 문자열 "5"를 숫자 5로\ns = str(3 + 4)    # 숫자 7을 문자열 "7"로\nprint(n + 2)\nprint(s + "점!")',
        result: "7\n7점!",
      },
    ],
    concepts: [
      {
        term: "변수",
        en: "variable",
        def: "값을 붙여 넣는 이름표예요. name = \"도하\"처럼 등호(=)의 왼쪽에 이름을 쓰고 오른쪽 값을 넣어요.",
      },
      {
        term: "숫자 자료형",
        en: "int · float",
        def: "따옴표 없이 쓰는 수예요. 12는 정수(int), 3.14는 실수(float)예요.",
      },
      {
        term: "문자열",
        en: "string",
        def: "따옴표로 감싼 글자예요. \"안녕\"처럼요. 감싸지 않으면 변수 이름으로 읽혀요.",
      },
      {
        term: "불리언",
        en: "boolean",
        def: "참(True)과 거짓(False), 딱 두 값만 있는 자료형이에요. 조건문의 재료가 돼요.",
      },
      {
        term: "자료형 바꾸기",
        en: "type conversion",
        def: "int(\"5\"), str(7)처럼 값을 다른 자료형 모양으로 바꿔요. 문자열과 숫자를 섞어 쓸 때 꼭 필요해요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "변수에 나이 담기",
        question: "나이 12를 변수 age에 넣고 싶어요. 알맞은 코드는 무엇인가요?",
        choices: ["age = 12", "12 = age", "age == 12", "age: 12"],
        answerIndex: 0,
        hint: "등호(=)는 '오른쪽 값을 왼쪽 이름표에 넣어요'라는 뜻이에요.",
        explanation:
          "age = 12는 age라는 변수에 12를 담는다는 뜻이에요. ==는 같은지 비교할 때 쓰고, 12 = age는 숫자에 이름표를 붙일 수 없어서 오류가 나요.",
      },
      {
        kind: "number",
        level: "보통",
        title: "변수로 계산하기",
        question: "x = 5, y = 2일 때 print(x * y)가 출력하는 숫자는 무엇인가요?",
        answer: 10,
        hint: "*는 곱하기 기호예요.",
        explanation: "x에는 5, y에는 2가 담겨 있으니 5 × 2 = 10이 출력돼요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "문자열 반복의 비밀",
        question: 'a = "7"이고 b = 3일 때 print(a * 3)의 출력은 무엇인가요?',
        choices: ["21", "777", "10", "오류가 나요"],
        answerIndex: 1,
        hint: "a는 따옴표가 붙은 문자열이에요. 문자열에 *를 쓰면 반복이 돼요.",
        explanation:
          'a는 문자열 "7"이라서 a * 3은 7을 세 번 반복한 777이 출력돼요. 숫자로 곱하려면 int(a) * 3처럼 바꿔 주어야 해요.',
      },
    ],
  },
  {
    id: "py2",
    roman: "Ⅱ",
    icon: "💬",
    accent: { main: "#059669", soft: "#d1fae5" },
    title: "입력과 출력",
    short: "print로 말 걸고 input으로 답받는, 프로그램과의 대화법을 배워요.",
    intro: [
      "프로그램이랑 대화하려면 보내고 받는 창구가 필요해요. print()로 말을 걸고, input()으로 답을 받아요.",
      "이름을 물어보고 인사하는 작은 프로그램을 직접 만들어 봐요.",
    ],
    story:
      "점심시간, 비티가 인사를 건넸어요. '안녕하세요!' 도하가 시큰둥했어요. '내 이름도 모르면서 인사라니.' 하람이가 웃으며 print(\"이름이 뭐예요?\")를 입력하고, input()으로 답을 받았어요. '도하'라고 적자 비티가 '도하님, 반가워요!'라고 다시 말했어요. 세림이가 정리했어요. '출력은 말하기, 입력은 듣기예요.'",
    lessons: [
      {
        title: "print로 말 걸기",
        desc: "괄호 안의 값을 화면에 보여 줘요.",
        code: 'print("안녕하세요!")\nprint("파이썬", "재미있어요")   # 쉼표로 이어 출력해요',
        result: "안녕하세요!\n파이썬 재미있어요",
      },
      {
        title: "input으로 답 받기",
        desc: "키보드로 친 답을 변수에 받아요.",
        code: 'name = input("이름이 뭐예요? ")\nprint("반가워요,", name)',
        result: "이름이 뭐예요? 도하 ← 직접 입력\n반가워요, 도하",
      },
      {
        title: "숫자로 입력받기",
        desc: "int()로 감싸면 계산에 쓸 수 있어요.",
        code: 'birth = int(input("태어난 해는? "))\nage = 2026 - birth\nprint("나이는", age, "살!")',
        result: "태어난 해는? 2012 ← 직접 입력\n나이는 14 살!",
      },
    ],
    concepts: [
      {
        term: "print 함수",
        en: "print",
        def: "괄호 안의 값을 화면에 보여 줘요. 쉼표로 여러 값을 한 줄에 함께 출력할 수 있어요.",
      },
      {
        term: "input 함수",
        en: "input",
        def: "키보드로 친 답을 돌려받아요. 괄호 안 문구는 질문 글자로 화면에 보여 줘요.",
      },
      {
        term: "f-string",
        en: "formatted string",
        def: 'f"이름은 {name}"처럼 문자열 앞에 f를 붙이고 중괄호에 변수를 넣어 문장을 만들어요.',
      },
      {
        term: "입력은 문자열",
        en: "input returns str",
        def: "input()이 돌려주는 건 항상 문자열이에요. 계산하려면 int(input())처럼 숫자로 바꿔요.",
      },
      {
        term: "줄 바꿈과 end",
        en: "end option",
        def: 'print는 한 번 출력하고 줄을 바꿔요. print(7, end=" ")처럼 end를 정하면 줄을 바꾸지 않고 이어서 출력해요.',
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "input의 정체",
        question: "input()이 돌려주는 값의 자료형은 무엇인가요?",
        choices: ["숫자(int)", "문자열(str)", "불리언(bool)", "입력값에 따라 달라요"],
        answerIndex: 1,
        hint: "숫자 12를 입력해도 컴퓨터는 \"12\"라는 글자로 받아요.",
        explanation:
          "input()은 무엇을 입력해도 문자열로 돌려줘요. 그래서 계산하려면 int(input())처럼 숫자로 바꿔 주어야 해요.",
      },
      {
        kind: "number",
        level: "보통",
        title: "문자열을 숫자로",
        question: 'x = int("5") + 3일 때 print(x)가 출력하는 숫자는 무엇인가요?',
        answer: 8,
        hint: 'int("5")는 문자열 "5"를 숫자 5로 바꿔요.',
        explanation: 'int("5")가 5가 되고, 5 + 3은 8이에요.',
      },
      {
        kind: "choice",
        level: "어려움",
        title: "f-string 완성하기",
        question: 'name = "민수", age = 14일 때 f"{name}은 {age}살"의 결과는 무엇인가요?',
        choices: ["민수은 14살", "{name}은 {age}살", "f민수은 14살", "오류가 나요"],
        answerIndex: 0,
        hint: "중괄호 {} 안에 변수 이름을 쓰면 그 자리에 값이 들어가요.",
        explanation:
          "f-string은 중괄호 자리에 변수 값을 넣어 주므로 '민수은 14살'이 만들어져요. f를 빼면 중괄호가 그대로 출력돼요.",
      },
    ],
  },
  {
    id: "py3",
    roman: "Ⅲ",
    icon: "🔀",
    accent: { main: "#e11d48", soft: "#ffe8ee" },
    title: "조건문",
    short: "'만약 ~라면'을 코드로 쓰는 if·elif·else를 배워요.",
    intro: [
      "게임에서 목숨이 0이면 끝나고, 점수가 90 이상이면 합격이에요. 이렇게 '만약 ~라면'을 코드로 쓰는 게 조건문이에요.",
      "if, else, elif를 배워 상황마다 다르게 반응하는 프로그램을 만들어요.",
    ],
    story:
      "체육 시간, 세림이가 물었어요. '키 140cm 이상만 탈 수 있는 놀이기구, 코드로 어떻게 골라?' 하람이가 if height >= 140:을 입력했어요. 비티가 재빨리 읽었어요. '키가 140 이상이면 탈 수 있어요!' 도하가 135cm라 아쉬워하자 else:로 '다음에 타자!'가 붙었어요. 세림이가 정리했어요. '조건이 참이면 if 쪽, 거짓이면 else 쪽. 갈래 길이 나뉘는 거야.'",
    lessons: [
      {
        title: "if로 확인하기",
        desc: "조건이 참일 때만 들여 쓴 코드가 실행돼요.",
        code: 'score = 85\nif score >= 80:\n    print("잘했어요!")',
        result: "잘했어요!",
      },
      {
        title: "else로 두 갈래 나누기",
        desc: "조건이 거짓일 때 갈 곳을 정해요.",
        code: 'temp = 12\nif temp >= 20:\n    print("반팔이 좋아요")\nelse:\n    print("겉옷을 챙겨요")',
        result: "겉옷을 챙겨요",
      },
      {
        title: "elif로 여러 갈래",
        desc: "조건을 위에서부터 차례로 검사해요.",
        code: 'score = 85\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("더 노력해요")',
        result: "B",
      },
    ],
    concepts: [
      {
        term: "조건문 if",
        en: "if statement",
        def: "'만약 ~라면'이에요. 조건이 참일 때 아래로 들여 쓴 코드가 실행돼요.",
      },
      {
        term: "비교 연산자",
        en: "comparison",
        def: ">, >=, <, <=, ==, !=로 값을 비교해요. ==는 같은지 비교, =는 값을 넣기예요.",
      },
      {
        term: "들여쓰기",
        en: "indentation",
        def: "if 아래 코드는 네 칸 들여 써요. 파이썬은 들여쓰기로 '이 조건에 딸린 코드'를 알아요.",
      },
      {
        term: "if~else",
        en: "if else",
        def: "참이면 if 쪽, 거짓이면 else 쪽. 둘 중 하나만 반드시 실행돼요.",
      },
      {
        term: "elif",
        en: "else if",
        def: "'아니면 만약 ~라면'이에요. 조건을 위에서부터 차례로 검사하고, 참인 하나만 실행해요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "조건문의 문법",
        question: "조건이 참일 때 실행되는 코드는 어떻게 써요?",
        choices: ["if 아래로 들여 써요", "if 옆에 같은 줄에 써요", "따옴표로 감싸요", "대문자로 써요"],
        answerIndex: 0,
        hint: "파이썬은 네 칸 들여 쓴 부분을 '이 조건에 딸린 코드'로 알아봐요.",
        explanation:
          "if 다음 줄을 네 칸 들여 쓰면 조건이 참일 때만 그 부분이 실행돼요. 파이썬에서는 들여쓰기가 곧 문법이에요.",
      },
      {
        kind: "number",
        level: "보통",
        title: "elif 순서 따라가기",
        question:
          "score = 85일 때 출력되는 숫자는 무엇인가요?\nif score >= 90: print(1)\nelif score >= 80: print(2)\nelse: print(3)",
        answer: 2,
        hint: "위에서부터 차례로 조건을 검사해요. 85는 90 이상이 아니에요.",
        explanation:
          "첫 조건 85 >= 90은 거짓, 둘째 조건 85 >= 80은 참이라 print(2)만 실행돼요. 참이 나오면 아래 조건은 보지 않아요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "and로 조건 잇기",
        question:
          'age = 13, ticket = 4000일 때 출력은 무엇인가요?\nif age >= 8 and ticket >= 5000:\n    print("놀이기구 타기")\nelse:\n    print("다음에 타기")',
        choices: ["놀이기구 타기", "다음에 타기", "둘 다 출력돼요", "오류가 나요"],
        answerIndex: 1,
        hint: "and는 두 조건이 모두 참이어야 참이에요. ticket이 5000 이상인가요?",
        explanation:
          "age >= 8은 참이지만 ticket >= 5000은 거짓이라 and 결과가 거짓이 되고, else의 '다음에 타기'가 출력돼요.",
      },
    ],
  },
  {
    id: "py4",
    roman: "Ⅳ",
    icon: "🔁",
    accent: { main: "#b45309", soft: "#fff1dc" },
    title: "반복문",
    short: "for와 while로 같은 일을 컴퓨터에게 맡겨요.",
    intro: [
      "백 번 인사하라고 하면 어떻게 할까요? 복사·붙여 넣기 대신 반복문을 써요.",
      "for와 while을 배워 컴퓨터에게 지루한 일을 맡겨요.",
    ],
    story:
      "비티의 생일 파티 초대장 백 장을 쓰는 날이었어요. 도하가 한두 장 쓰다가 포기했어요. 하람이가 for friend in range(100):을 입력했어요. '컴퓨터한테 백 번 시키면 돼!' 세림이가 정리했어요. '반복문은 같은 일을 여러 번 시키는 주문이야.' 비티가 감동했어요. '제 초대장이 이렇게 빨리 다 써질 줄 몰랐어요!'",
    lessons: [
      {
        title: "for로 반복하기",
        desc: "정해진 횟수만큼 같은 일을 시켜요.",
        code: 'for i in range(3):\n    print("안녕!")',
        result: "안녕!\n안녕!\n안녕!",
      },
      {
        title: "range로 숫자 늘어놓기",
        desc: "range는 시작부터 끝 직전까지의 숫자를 만들어요.",
        code: 'for i in range(1, 6):\n    print(i, "번째 손님")',
        result: "1 번째 손님\n2 번째 손님\n3 번째 손님\n4 번째 손님\n5 번째 손님",
      },
      {
        title: "while로 조건 반복",
        desc: "조건이 참인 동안 계속 반복해요.",
        code: 'count = 3\nwhile count > 0:\n    print(count)\n    count -= 1\nprint("발사!")',
        result: "3\n2\n1\n발사!",
      },
    ],
    concepts: [
      {
        term: "반복문 for",
        en: "for loop",
        def: "정해진 횟수만큼 같은 일을 반복해요. 들여 쓴 부분이 매번 실행돼요.",
      },
      {
        term: "range 함수",
        en: "range",
        def: "range(3)은 0, 1, 2를, range(1, 6)은 1부터 5까지 만들어요. 끝 숫자는 포함되지 않아요.",
      },
      {
        term: "while문",
        en: "while loop",
        def: "조건이 참인 동안 계속 반복해요. 조건이 언젠가 거짓이 되게 만들어야 멈춰요.",
      },
      {
        term: "break",
        en: "break",
        def: "반복을 그 자리에서 딱 멈추게 해요. while True와 함께 자주 써요.",
      },
      {
        term: "누적 변수",
        en: "accumulator",
        def: "total = 0을 만들어 두고 반복 안에서 total += i처럼 차곡차곡 더하는 상자예요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "range의 횟수",
        question: 'for i in range(3): print("안녕")에서 "안녕"은 몇 번 출력돼요?',
        choices: ["2번", "3번", "4번", "무한으로"],
        answerIndex: 1,
        hint: "range(3)은 0, 1, 2 세 개의 숫자를 만들어요.",
        explanation: "range(3)은 0부터 2까지 세 개를 만들어 세 번 반복하므로 '안녕'이 3번 출력돼요.",
      },
      {
        kind: "number",
        level: "보통",
        title: "누적 변수 계산",
        question:
          "total = 0에서 시작해\nfor i in range(1, 5):\n    total += i\n을 실행한 뒤 total 값은 무엇인가요?",
        answer: 10,
        hint: "i는 1, 2, 3, 4가 돼요. range(1, 5)에 5는 포함되지 않아요.",
        explanation: "1 + 2 + 3 + 4 = 10이에요. range(1, 5)는 1부터 4까지만 만들어요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "while과 break",
        question:
          "count = 1\nwhile True:\n    if count == 4:\n        break\n    count += 1\nprint(count)\n의 출력은 무엇인가요?",
        choices: ["1", "3", "4", "영원히 반복돼요"],
        answerIndex: 2,
        hint: "count가 4가 되는 순간 break가 반복을 멈춰요.",
        explanation:
          "count는 1→2→3→4로 커지다가 4가 되면 break로 반복이 멈춰요. 그래서 print(count)에서 4가 출력돼요.",
      },
    ],
  },
  {
    id: "py5",
    roman: "Ⅴ",
    icon: "🧺",
    accent: { main: "#6366f1", soft: "#e0e7ff" },
    title: "리스트와 튜플",
    short: "여러 값을 한 상자에 담는 리스트와 못 바꾸는 튜플을 배워요.",
    intro: [
      "좋아하는 과일이 세 개면 변수도 세 개가 필요할까요? 리스트를 쓰면 한 상자에 전부 담을 수 있어요.",
      "번호로 꺼내고, 붙였다 뗐다 하는 방법과, 절대 안 바뀌는 튜플까지 배워요.",
    ],
    story:
      "점심시간, 도하가 좋아하는 과일을 외우다가 헷갈렸어요. '사과, 바나나, 포도… 포도가 몇 번째였지?' 하람이가 과일 목록을 리스트로 만들어 보여 줬어요. 비티가 읽었어요. '과일 세 개가 한 상자에 정리되어 있어요!' 도하가 fruits[0]을 입력하자 '사과'가 나왔어요. 세림이가 정리했어요. '여러 값을 순서대로 담는 게 리스트야. 단, 번호는 0부터 세는 거 잊지 마.'",
    lessons: [
      {
        title: "리스트 만들고 꺼내기",
        desc: "대괄호로 만들고 번호(인덱스)로 꺼내요.",
        code: 'fruits = ["사과", "바나나", "포도"]\nprint(fruits[0])\nprint(fruits[2])\nprint(len(fruits))',
        result: "사과\n포도\n3",
      },
      {
        title: "리스트 바꾸기",
        desc: "append로 붙이고 pop으로 빼요.",
        code: 'nums = [10, 20, 30]\nnums.append(40)   # 맨 뒤에 40을 붙여요\nnums[0] = 5       # 첫 값을 5로 바꿔요\nprint(nums)\nnums.pop()        # 맨 뒤 값을 꺼내요\nprint(nums)',
        result: "[5, 20, 30, 40]\n[5, 20, 30]",
      },
      {
        title: "튜플은 못 바꿔요",
        desc: "소괄호로 만든 튜플은 한 번 정하면 그대로예요.",
        code: 'point = (3, 7)\nprint(point[0], point[1])\nprint(point[0] + point[1])\nprint(len(point))',
        result: "3 7\n10\n2",
      },
    ],
    concepts: [
      {
        term: "리스트",
        en: "list",
        def: "대괄호로 여러 값을 순서대로 담는 상자예요. fruits = [\"사과\", \"바나나\"]처럼 콤마로 이어 적어요.",
      },
      {
        term: "인덱스",
        en: "index",
        def: "순서 번호예요. 첫 번째는 0, 두 번째는 1로 세요. 뒤에서부터 셀 때는 -1, -2로 써요.",
      },
      {
        term: "len 함수",
        en: "len",
        def: "리스트나 문자열에 몇 개가 들었는지 알려 줘요. len([10, 20])은 2예요.",
      },
      {
        term: "append와 pop",
        en: "append · pop",
        def: "append는 값을 맨 뒤에 붙이고, pop은 맨 뒤 값을 꺼내 없애요.",
      },
      {
        term: "튜플",
        en: "tuple",
        def: "소괄호로 만드는 못 바꾸는 목록이에요. (3, 7)처럼 변하면 안 되는 좌표 값에 써요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "첫 번째 값 꺼내기",
        question: 'fruits = ["배", "감", "귤"]일 때 첫 번째 값을 꺼내는 코드는 무엇인가요?',
        choices: ["fruits[0]", "fruits[1]", "fruits[3]", "fruits[첫]"],
        answerIndex: 0,
        hint: "리스트 번호는 0부터 시작해요.",
        explanation:
          '리스트는 첫 번째를 0으로 세요. 그래서 fruits[0]이 "배"를 꺼내고, fruits[1]은 "감"이에요.',
      },
      {
        kind: "number",
        level: "보통",
        title: "리스트로 계산하기",
        question: "nums = [3, 6, 9]일 때 print(nums[0] + nums[2])가 출력하는 숫자는 무엇인가요?",
        answer: 12,
        hint: "nums[0]은 3, nums[2]는 9예요.",
        explanation: "번호 0 칸의 3과 번호 2 칸의 9를 더해 12가 출력돼요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "append 뒤의 모양",
        question: "nums = [1, 2]에서 nums.append(3)을 실행한 뒤 print(nums)의 출력은 무엇인가요?",
        choices: ["[1, 2, 3]", "[3, 1, 2]", "[1, 2]", "오류가 나요"],
        answerIndex: 0,
        hint: "append는 항상 맨 뒤에 붙여요.",
        explanation: "append는 새 값을 맨 뒤에 붙여요. 그래서 [1, 2, 3]이 출력돼요.",
      },
    ],
  },
  {
    id: "py6",
    roman: "Ⅵ",
    icon: "🗂️",
    accent: { main: "#0d9488", soft: "#ccfbf1" },
    title: "딕셔너리와 집합",
    short: "이름표로 찾는 딕셔너리와 겹치지 않는 집합을 배워요.",
    intro: [
      "메뉴판은 '메뉴 이름 → 가격'처럼 짝지어 있어요. 이렇게 이름표로 찾는 상자가 딕셔너리예요.",
      "겹치지 않는 모임을 다루는 집합까지 배우면 정보를 깔끔하게 정리할 수 있어요.",
    ],
    story:
      "비티가 오늘 급식 메뉴를 전부 외워 오라고 했어요. 세림이가 말했어요. '메뉴랑 가격을 짝지어 기억하면 쉬워.' 하람이가 짜장면과 가격을 딕셔너리에 담았어요. 도하가 물었어요. '짬뽕은 어디에 넣지?' 짬뽕과 가격을 새로 넣자 비티가 신나게 읽었어요. '짜장면 5000원, 짬뽕 6000원! 주문 받을 준비 끝!' 세림이가 정리했어요. '이름표로 찾는 상자가 딕셔너리, 겹치지 않는 모임이 집합이야.'",
    lessons: [
      {
        title: "딕셔너리 만들기",
        desc: "이름표(키)와 값으로 짝지어 담아요.",
        code: 'doha = {"이름": "도하", "나이": 12}\nprint(doha["이름"])\nprint(doha["나이"])\ndoha["학교"] = "메이크펀초"\nprint(doha)',
        result: "도하\n12\n{'이름': '도하', '나이': 12, '학교': '메이크펀초'}",
      },
      {
        title: "키로 찾아보기",
        desc: "키를 넣고 빼고, 있는지 확인해요.",
        code: 'menu = {"짜장면": 5000, "짬뽕": 6000}\nprint(menu["짜장면"])\nmenu["탕수육"] = 8000\nprint(list(menu.keys()))\nprint("짬뽕" in menu)',
        result: "5000\n['짜장면', '짬뽕', '탕수육']\nTrue",
      },
      {
        title: "집합은 겹치지 않아요",
        desc: "중복이 없는 모임을 만들고 겹침을 찾아요.",
        code: 'a = {1, 2, 3, 4}\nb = {3, 4, 5}\nprint(a & b)   # 둘 다 속한 값만\nprint(a | b)   # 합쳐서 하나씩',
        result: "{3, 4}\n{1, 2, 3, 4, 5}",
      },
    ],
    concepts: [
      {
        term: "딕셔너리",
        en: "dictionary",
        def: "이름표(키)로 값을 찾는 상자예요. doha[\"이름\"]처럼 키를 대괄호에 넣어 값을 꺼내요.",
      },
      {
        term: "키와 값",
        en: "key · value",
        def: "키는 이름표, 값은 내용이에요. menu[\"탕수육\"] = 8000처럼 새 짝을 넣을 수 있어요.",
      },
      {
        term: "in으로 확인하기",
        en: "in",
        def: "\"짬뽕\" in menu처럼 키가 들어 있는지 참·거짓으로 알려 줘요.",
      },
      {
        term: "집합",
        en: "set",
        def: "중괄호로 만들고 겹치는 값을 하나만 남기는 모임이에요. 순서는 없어요.",
      },
      {
        term: "&과 |",
        en: "intersection · union",
        def: "a & b는 둘 다 속한 값(교집합), a | b는 합쳐서 하나씩(합집합)이에요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "딕셔너리 값 꺼내기",
        question: 'doha = {"이름": "도하", "나이": 12}에서 나이를 꺼내는 코드는 무엇인가요?',
        choices: ['doha["나이"]', "doha(나이)", "doha[1]", "doha.나이"],
        answerIndex: 0,
        hint: "대괄호 안에 키 이름을 따옴표와 함께 써요.",
        explanation:
          '딕셔너리는 doha["나이"]처럼 키로 값을 찾아요. doha[1]은 1번 칸이 아니라 키 1을 찾으니 주의하세요.',
      },
      {
        kind: "number",
        level: "보통",
        title: "메뉴 가격 합치기",
        question:
          'menu = {"떡볶이": 4000, "김밥": 3000}일 때\nprint(menu["떡볶이"] + menu["김밥"])\n이 출력하는 숫자는 무엇인가요?',
        answer: 7000,
        hint: "떡볶이 4000원, 김밥 3000원이에요.",
        explanation: "키로 값을 꺼내 더하면 4000 + 3000 = 7000이에요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "집합의 겹침",
        question: "a = {1, 2, 3}, b = {2, 3, 4}일 때 print(a & b)의 출력은 무엇인가요?",
        choices: ["{2, 3}", "{1, 2, 3, 4}", "{1, 4}", "오류가 나요"],
        answerIndex: 0,
        hint: "&는 두 모임에 둘 다 속한 값만 골라요.",
        explanation:
          "집합에서 &는 교집합이에요. 2와 3만 둘 다 속하므로 {2, 3}이 출력돼요. |를 쓰면 {1, 2, 3, 4}였을 거예요.",
      },
    ],
  },
  {
    id: "py7",
    roman: "Ⅶ",
    icon: "🧩",
    accent: { main: "#ea580c", soft: "#ffedd5" },
    title: "함수",
    short: "자주 쓸 동작에 이름을 붙이는 함수 만들기를 배워요.",
    intro: [
      "'안녕하세요!'를 백 번 출력하려면 print도 백 번 써야 할까요? 아니요. 동작에 이름을 붙여 두면 한 줄로 부를 수 있어요.",
      "재료(매개변수)를 넣고 답(return)을 받는 진짜 함수를 만들어 봐요.",
    ],
    story:
      "도하가 비티에게 인사를 백 번 시키려다 지쳤어요. 하람이가 def hello():를 써서 인사 함수를 만들었어요. '이름을 붙여 두고 hello()라고 부르기만 하면 돼.' 비티가 hello()를 부를 때마다 인사 두 줄이 쏟아졌어요. 세림이가 정리했어요. '자주 쓸 동작에 이름을 붙이는 게 함수야. 재료를 넣으면 답을 돌려받을 수도 있어.' 도하가 twice(7)을 불렀더니 14가 돌아왔어요.",
    lessons: [
      {
        title: "함수 만들고 부르기",
        desc: "def로 만들고 이름으로 불러요.",
        code: 'def hello():\n    print("안녕하세요!")\n    print("오늘도 코딩해요.")\n\nhello()\nhello()',
        result: "안녕하세요!\n오늘도 코딩해요.\n안녕하세요!\n오늘도 코딩해요.",
      },
      {
        title: "재료 넣기",
        desc: "매개변수로 값을 받아요.",
        code: 'def area(w, h):\n    result = w * h\n    print(result)\n\narea(3, 4)\narea(5, 2)',
        result: "12\n10",
      },
      {
        title: "답 돌려받기",
        desc: "return으로 함수 밖에 답을 내보내요.",
        code: 'def twice(n):\n    return n * 2\n\na = twice(7)\nprint(a)\nprint(twice(10) + 1)',
        result: "14\n21",
      },
    ],
    concepts: [
      {
        term: "함수",
        en: "function",
        def: "이름을 붙여 두고 몇 번이나 다시 쓰는 동작 묶음이에요. hello()처럼 이름 뒤에 괄호를 붙여 불러요.",
      },
      {
        term: "def",
        en: "define",
        def: "함수를 만들 때 쓰는 키워드예요. def 함수이름(): 아래로 들여 쓴 코드가 함수 몸통이에요.",
      },
      {
        term: "매개변수와 인수",
        en: "parameter · argument",
        def: "def area(w, h)의 w, h는 재료 칸(매개변수), area(3, 4)의 3, 4는 실제로 넣는 값(인수)이에요.",
      },
      {
        term: "return",
        en: "return",
        def: "함수의 답을 밖으로 내보내요. twice(7)은 return 덕분에 14라는 답을 돌려줘요.",
      },
      {
        term: "print와 return",
        en: "print vs return",
        def: "print는 화면에 보여 주기만 하고, return은 답을 돌려줘요. 답을 변수에 담으려면 return이 필요해요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "함수 만드는 키워드",
        question: "파이썬에서 함수를 만들 때 쓰는 키워드는 무엇인가요?",
        choices: ["def", "func", "function", "make"],
        answerIndex: 0,
        hint: "define(정의하다)의 앞 세 글자예요.",
        explanation: "파이썬은 def로 함수를 만들어요. function은 자바스크립트에서 쓰는 키워드예요.",
      },
      {
        kind: "number",
        level: "보통",
        title: "면적 함수",
        question: "def area(w, h): return w * h일 때 area(4, 5)의 값은 무엇인가요?",
        answer: 20,
        hint: "w에는 4, h에는 5가 순서대로 들어가요.",
        explanation: "재료가 순서대로 들어가 4 × 5 = 20이 return돼요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "return이 없다면",
        question: 'def f():\n    print(3)\n을 만들고 x = f()를 실행하면 x에는 무엇이 들어가나요?',
        choices: ["아무것도 돌려받지 못해요(None)", "3", '"3"이라는 글자', "오류가 나요"],
        answerIndex: 0,
        hint: "return이 없으면 함수는 답을 돌려주지 않아요.",
        explanation:
          "print는 화면에 3을 보여 줄 뿐이에요. return이 없는 함수는 아무것도 돌려주지 않아서 x에는 None이 들어가요.",
      },
    ],
  },
  {
    id: "py8",
    roman: "Ⅷ",
    icon: "✂️",
    accent: { main: "#0891b2", soft: "#cffafe" },
    title: "문자열 다루기",
    short: "글자를 자르고, 붙이고, 고치는 문자열 기술을 배워요.",
    intro: [
      "문자열도 칸이 있는 상자예요. 번호로 글자 하나를 꺼내거나, 원하는 부분만 잘라 낼 수 있어요.",
      "바꾸기·대소문자 바꾸기 같은 문자열 전용 도구도 함께 익혀요.",
    ],
    story:
      "세림이가 단어 퍼즐을 냈어요. '안녕하세요에서 첫 글자만 꺼내 볼래?' 도하가 word[0]을 입력하자 '안'이 나왔어요. 비티가 신기해했어요. '글자에도 번호가 붙어 있네요!' 하람이가 word[0:3]으로 앞세 글자만 잘라 보여 줬어요. 세림이가 정리했어요. '문자열도 인덱싱과 슬라이싱으로 자유롭게 자를 수 있어.'",
    lessons: [
      {
        title: "글자 조각내기",
        desc: "번호로 글자 하나를 꺼내요.",
        code: 'word = "안녕하세요"\nprint(word[0])\nprint(word[-1])\nprint(len(word))',
        result: "안\n요\n5",
      },
      {
        title: "원하는 부분만 자르기",
        desc: "슬라이싱은 시작 칸부터 끝 직전까지 가져와요.",
        code: 'word = "파이썬재미있어요"\nprint(word[0:3])\nprint(word[3:5])\nprint(word[5:])',
        result: "파이썬\n재미\n있어요",
      },
      {
        title: "문자열 도구 써 보기",
        desc: "replace, upper, count를 써요.",
        code: 'eng = "hello world"\nprint(eng.upper())\nprint(eng.replace("world", "python"))\nprint(eng.count("l"))',
        result: "HELLO WORLD\nhello python\n3",
      },
    ],
    concepts: [
      {
        term: "문자열 인덱싱",
        en: "string indexing",
        def: "word[0]처럼 번호로 글자 하나를 꺼내요. word[-1]은 맨 뒤 글자예요.",
      },
      {
        term: "슬라이싱",
        en: "slicing",
        def: "word[0:3]은 0번 칸부터 2번 칸까지 가져와요. 끝 칸은 포함되지 않아요.",
      },
      {
        term: "len 함수",
        en: "len",
        def: "문자열의 글자 수를 알려 줘요. len(\"안녕하세요\")는 5예요.",
      },
      {
        term: "replace",
        en: "replace",
        def: "replace(\"world\", \"python\")처럼 찾은 글자를 다른 글자로 바꿔 새 문자열을 만들어요.",
      },
      {
        term: "upper와 lower",
        en: "upper · lower",
        def: "upper는 전부 대문자로, lower는 전부 소문자로 바꿔요. 영문자에만 효과가 있어요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "첫 글자 꺼내기",
        question: 'word = "코딩"일 때 word[0]은 무엇인가요?',
        choices: ["코", "딩", "코딩", "오류가 나요"],
        answerIndex: 0,
        hint: "첫 번째 글자는 0번 칸이에요.",
        explanation: "문자열 번호는 0부터 시작하므로 word[0]은 '코'예요.",
      },
      {
        kind: "number",
        level: "보통",
        title: "글자 수 세기",
        question: 'print(len("메이크펀"))이 출력하는 숫자는 무엇인가요?',
        answer: 4,
        hint: "글자 수를 그대로 세면 돼요.",
        explanation: "메, 이, 크, 펀 — 네 글자라서 len은 4를 돌려줘요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "슬라이싱 자르기",
        question: 'msg = "파이썬재미있어요"일 때 msg[3:5]는 무엇인가요?',
        choices: ["재미", "썬재", "재미있", "있어요"],
        answerIndex: 0,
        hint: "시작 칸은 포함하고 끝 칸은 포함하지 않아요.",
        explanation:
          "msg[3:5]는 3번 칸부터 4번 칸까지예요. 3번이 '재', 4번이 '미'라서 '재미'가 돼요. 5번 칸은 포함되지 않아요.",
      },
    ],
  },
  {
    id: "py9",
    roman: "Ⅸ",
    icon: "🎲",
    accent: { main: "#9333ea", soft: "#f3e8ff" },
    title: "random 모듈과 모듈 사용법",
    short: "남이 만들어 둔 도구 창고(모듈)를 가져다 쓰는 방법을 배워요.",
    intro: [
      "주사위 굴리기, 제곱근 계산 같은 기능은 이미 만들어져 있어요. 모듈만 불러 오면 바로 쓸 수 있어요.",
      "random으로 무작위 수를 뽑고, math로 계산을 돕고, import 사용법을 익혀요.",
    ],
    story:
      "비티가 주사위 놀이를 하고 싶은데 주사위가 없었어요. 하람이가 import random을 쓰고 random.randint(1, 6)을 입력했어요. '컴퓨터한테 주사위를 굴려 달라고 하면 돼!' 도하가 여러 번 실행했지만 숫자가 계속 달랐어요. 세림이가 알려 줬어요. '무작위는 매번 달라지는 게 정상이야. 같은 결과를 보고 싶으면 random.seed(1)처럼 씨를 먼저 심어.' 비티가 좋아했어요. '진짜 주사위보다 잘 굴러요!'",
    lessons: [
      {
        title: "주사위 굴리기",
        desc: "randint는 양쪽 끝 숫자도 포함해요.",
        code: 'import random\n\nrandom.seed(1)   # 같은 결과가 나오도록 씨를 심어요\nprint(random.randint(1, 6))\nprint(random.randint(1, 6))',
        result: "2\n5",
      },
      {
        title: "목록에서 뽑기",
        desc: "choice는 하나, sample은 여러 개를 뽑아요.",
        code: 'import random\n\nrandom.seed(2)\nsnacks = ["초코", "사탕", "쿠키"]\nprint(random.choice(snacks))\nprint(random.sample(snacks, 2))',
        result: "초코\n['초코', '쿠키']",
      },
      {
        title: "math 모듈",
        desc: "제곱근과 원주율도 가져다 써요.",
        code: 'import math\n\nprint(math.sqrt(16))\nprint(math.floor(3.9))\nprint(round(math.pi, 2))',
        result: "4.0\n3\n3.14",
      },
    ],
    concepts: [
      {
        term: "모듈",
        en: "module",
        def: "다른 사람이 만들어 둔 기능 창고예요. random, math 같은 모듈을 불러 오면 바로 써요.",
      },
      {
        term: "import",
        en: "import",
        def: "모듈을 가져오는 명령이에요. import random을 하면 random.을 붙여 기능을 부를 수 있어요.",
      },
      {
        term: "random.randint",
        en: "randint",
        def: "randint(1, 6)은 1부터 6까지 정수 중 하나를 무작위로 돌려줘요. 양쪽 끝도 포함해요.",
      },
      {
        term: "choice와 sample",
        en: "choice · sample",
        def: "choice는 목록에서 하나를, sample은 겹치지 않게 여러 개를 뽑아 줘요.",
      },
      {
        term: "math 모듈",
        en: "math",
        def: "sqrt(제곱근), floor(내림), pi(원주율) 같은 수학 도구가 들어 있어요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "나올 수 없는 눈",
        question: "random.randint(1, 3)이 절대 나오지 않는 값은 무엇인가요?",
        choices: ["0", "1", "2", "3"],
        answerIndex: 0,
        hint: "randint는 양쪽 끝 숫자도 포함해요.",
        explanation: "randint(1, 3)은 1, 2, 3 중 하나예요. 0은 범위 밖이라 나올 수 없어요.",
      },
      {
        kind: "number",
        level: "보통",
        title: "제곱근 구하기",
        question: "import math 후 math.sqrt(25)의 값은 무엇인가요?",
        answer: 5,
        hint: "sqrt는 제곱근이에요. 5 × 5가 25죠.",
        explanation: "sqrt(25)는 5.0을 돌려줘요. 25를 만드는 두 같은 수는 5 × 5예요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "같은 주사위 눈 만들기",
        question: "실행할 때마다 같은 무작위 결과가 나오게 하려면 어떻게 해야 하나요?",
        choices: [
          "앞에서 random.seed(1)을 먼저 실행해요",
          "print를 두 번 써요",
          "import를 두 번 써요",
          "randint(1, 1)로 바꿔요",
        ],
        answerIndex: 0,
        hint: "씨앗(seed)을 심어 두면 무작위 순서가 고정돼요.",
        explanation:
          "random.seed(1)을 먼저 실행하면 그다음 무작위 결과가 항상 같아져요. randint(1, 1)은 늘 1이라 주사위가 아니죠.",
      },
    ],
  },
  {
    id: "py10",
    roman: "Ⅹ",
    icon: "🕹️",
    accent: { main: "#4f46e5", soft: "#eef2ff" },
    title: "프로젝트: 숫자 맞추기 게임과 계산기",
    short: "지금까지 배운 걸 모아 숫자 맞추기 게임과 계산기를 완성해요.",
    intro: [
      "배운 문법을 모으면 진짜 프로그램이 돼요. 기획 → 조립 → 확장, 세 단계로 프로젝트를 만들어 봐요.",
      "while과 break, random, 조건문을 한 코드에 모아 게임을 완성하고, 계산기로 확장해요.",
    ],
    story:
      "비티가 숫자 맞추기 게임을 만들고 싶다고 했어요. 하람이가 종이에 순서를 적었어요. '1. 비밀 숫자 정하기, 2. 답 입력받기, 3. 크기 비교해 힌트 주기.' 도하가 while True와 break로 반복을 만들고, 세림이가 count로 몇 번 만에 맞혔는지 세었어요. 게임이 완성되자 비티가 환호했어요. '이게 우리가 만든 진짜 게임이에요!'",
    lessons: [
      {
        title: "게임 기획하기",
        desc: "한 번 맞히는 뼈대부터 만들어요. 입력값 칸에 27을 적고 실행해 보세요.",
        code: 'print("1~50 사이 숫자를 맞혀 보세요!")\nsecret = 27\nguess = int(input())\n\nif guess == secret:\n    print("정답이에요!")\nelif guess < secret:\n    print("더 큰 숫자예요.")\nelse:\n    print("더 작은 숫자예요.")',
        result: "1~50 사이 숫자를 맞혀 보세요!\n정답이에요!",
      },
      {
        title: "단계별 조립 — 완성 코드",
        desc: "random과 while True로 진짜 게임을 완성해요. 입력값에 숫자를 한 줄씩 적어 보세요.",
        code: 'import random\n\nsecret = random.randint(1, 50)\ncount = 0\n\nwhile True:\n    guess = int(input())\n    count += 1\n    if guess == secret:\n        print("정답!", count, "번 만에 맞혔어요!")\n        break\n    elif guess < secret:\n        print("더 큰 숫자예요.")\n    else:\n        print("더 작은 숫자예요.")',
        result: "입력값에 숫자를 한 줄씩 적어 실행해요. 힌트를 따라 가다가 맞히면 '정답! N 번 만에 맞혔어요!'로 게임이 끝나요.",
      },
      {
        title: "확장 과제: 계산기 만들기",
        desc: "같은 방법으로 두 수 계산기를 만들어요. 입력값에 8, 3, 3을 차례로 적어 보세요.",
        code: 'print("계산기예요. 두 수를 차례로 정해요.")\na = int(input())\nb = int(input())\nprint("1: 더하기  2: 빼기  3: 곱하기")\nmenu = input()\n\nif menu == "1":\n    print(a, "+", b, "=", a + b)\nelif menu == "2":\n    print(a, "-", b, "=", a - b)\nelif menu == "3":\n    print(a, "×", b, "=", a * b)\nelse:\n    print("1, 2, 3 중에서 골라 주세요.")',
        result: "계산기예요. 두 수를 차례로 정해요.\n1: 더하기  2: 빼기  3: 곱하기\n8 × 3 = 24",
      },
    ],
    concepts: [
      {
        term: "프로젝트 설계",
        en: "planning",
        def: "먼저 만들 순서를 적어 두면 코드를 조립할 때 헤매지 않아요. 기획 → 조립 → 확장이에요.",
      },
      {
        term: "while True와 break",
        en: "while true · break",
        def: "조건이 늘 참이라 break를 만나야만 멈춰요. 정답을 맞혔을 때 break로 끝내요.",
      },
      {
        term: "무작위 비밀 숫자",
        en: "random secret",
        def: "random.randint(1, 50)으로 매번 다른 비밀 숫자를 정해요. 그래서 게임이 지루하지 않아요.",
      },
      {
        term: "입력은 문자열",
        en: "input returns str",
        def: "input()의 답은 항상 글자예요. int(input())으로 숫자로 바꿔야 비교와 계산을 할 수 있어요.",
      },
      {
        term: "메뉴 고르기",
        en: "menu selection",
        def: "1, 2, 3 번호를 input으로 받아 if~elif로 각각 다른 일을 시켜요. 계산기 뼈대예요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "비밀 숫자 정하기",
        question: "비밀 숫자를 1~50 중에서 무작위로 고르는 코드는 무엇인가요?",
        choices: ["random.randint(1, 50)", "random(1, 50)", "randint.random(1, 50)", "print(1, 50)"],
        answerIndex: 0,
        hint: "먼저 import random을 하고, randint는 양쪽 끝 숫자도 포함해요.",
        explanation:
          "import random 후 random.randint(1, 50)이 1부터 50 사이의 무작위 정수를 돌려줘요.",
      },
      {
        kind: "number",
        level: "보통",
        title: "몇 번 만에 맞혔을까",
        question: "게임에서 네 번째 입력에 정답을 맞혔다면 count는 몇이 되었을까요?",
        answer: 4,
        hint: "입력할 때마다 count += 1이 실행돼요.",
        explanation: "입력할 때마다 count가 하나씩 늘어나므로 네 번째에 맞히면 count는 4예요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "끝나지 않는 게임",
        question: "while True 게임이 끝나지 않는 이유로 알맞은 것은 무엇인가요?",
        choices: [
          "if guess == secret에서 break를 빼먹었을 때",
          "count += 1을 while 안에 넣었을 때",
          "elif를 사용했을 때",
          "random을 import했을 때",
        ],
        answerIndex: 0,
        hint: "while True는 break를 만나야만 멈춰요.",
        explanation:
          "while True는 조건이 늘 참이라 break 없이는 영원히 반복돼요. 정답을 맞혔을 때 break를 실행해야 게임이 끝나요.",
      },
    ],
  },
];

const JS_UNITS: readonly CodeUnit[] = [
  {
    id: "js1",
    roman: "Ⅰ",
    icon: "✨",
    accent: { main: "#7c3aed", soft: "#f0e9ff" },
    title: "기본 문법",
    short: "변수·함수·조건·반복, 자바스크립트의 기본기를 배워요.",
    intro: [
      "자바스크립트는 웹 페이지를 움직이게 하는 언어예요. 값을 담는 let·const와 함수부터 배워요.",
      "조건문과 반복문은 파이썬과 비슷하지만, 중괄호 { }와 세미콜론(;)을 써요.",
    ],
    story:
      "하람이가 웹페이지를 열고 말했어요. '버튼을 누르면 숫자가 올라가게 해 볼까?' 도하가 물었어요. '그러려면 뭘 배워야 해?' 하람이가 let count = 0을 쓰며 답했어요. '값을 담는 상자, 그걸 바꾸는 함수, 그리고 조건이면 돼.' 비티가 화면을 보며 외쳤어요. '숫자가 1, 2, 3으로 올라가고 있어요!' 세림이가 정리했어요. '자바스크립트는 파이썬과 같은 이야기를 다른 말로 하는 거야.'",
    lessons: [
      {
        title: "let과 const",
        desc: "바꿀 수 있는 상자와 바꿀 수 없는 약속이에요.",
        code: "let count = 0;      // 바꿀 수 있는 상자\nconst MAX = 10;     // 바꿀 수 없는 약속\ncount = count + 1;\nconsole.log(count, MAX);",
        result: "1 10",
      },
      {
        title: "함수로 묶기",
        desc: "이름을 붙여 두면 몇 번이나 다시 쓸 수 있어요.",
        code: 'function hello(name) {\n  return "안녕, " + name + "!";\n}\nconsole.log(hello("도하"));',
        result: "안녕, 도하!",
      },
      {
        title: "조건과 반복",
        desc: "중괄호 { }로 묶음을 알려 줘요.",
        code: 'for (let i = 1; i <= 3; i++) {\n  if (i === 2) {\n    console.log("이게 두 번째!");\n  } else {\n    console.log(i + "번째");\n  }\n}',
        result: "1번째\n이게 두 번째!\n3번째",
      },
    ],
    concepts: [
      {
        term: "let",
        en: "let",
        def: "값을 바꿀 수 있는 상자예요. count = count + 1처럼 새 값을 다시 넣을 수 있어요.",
      },
      {
        term: "const",
        en: "const",
        def: "한 번 넣으면 바꿀 수 없는 약속이에요. 고정된 값에는 const를 써요.",
      },
      {
        term: "함수",
        en: "function",
        def: "function hello(name) { ... }처럼 이름표를 붙여 두면 hello(\"도하\")로 몇 번이나 다시 써요.",
      },
      {
        term: "등호와 비교",
        en: "= and ===",
        def: "=는 값을 넣기, ===는 같은지 비교예요. 파이썬의 ==에 해당해요.",
      },
      {
        term: "템플릿 문자열",
        en: "template literal",
        def: "`안녕, ${name}!`처럼 백틱(`)과 ${ }로 문장 안에 변수 값을 넣어요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "바꾸지 못하는 상자",
        question: "한 번 정한 값을 바꾸지 못하게 하려면 어떤 키워드를 써요?",
        choices: ["let", "const", "var", "new"],
        answerIndex: 1,
        hint: "const는 constant(상수), 변하지 않는 값이라는 뜻이에요.",
        explanation: "const는 값을 다시 넣을 수 없어요. 바뀔 값은 let, 고정 값은 const를 써요.",
      },
      {
        kind: "number",
        level: "보통",
        title: "for문 합계",
        question:
          "let sum = 0;\nfor (let i = 1; i <= 3; i++) {\n  sum += i;\n}\n실행 후 sum의 값은 무엇인가요?",
        answer: 6,
        hint: "i는 1, 2, 3이 돼요. i++은 1을 더한다는 뜻이에요.",
        explanation: "반복이 세 번 돌면서 sum에 1, 2, 3이 차례로 더해져 6이 돼요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "템플릿 문자열 읽기",
        question: 'let name = "세림";일 때 console.log(`안녕, ${name}!`)의 출력은 무엇인가요?',
        choices: ["안녕, ${name}!", "안녕, 세림!", "안녕, name!", "오류가 나요"],
        answerIndex: 1,
        hint: "백틱(`) 안에서 ${ }는 변수 값을 꺼내 와요.",
        explanation:
          "템플릿 문자열은 ${name} 자리에 세림을 넣어 '안녕, 세림!'을 만들어요. 따옴표가 아니라 백틱을 써야 해요.",
      },
    ],
  },
  {
    id: "js2",
    roman: "Ⅱ",
    icon: "🌳",
    accent: { main: "#2563eb", soft: "#e0e7ff" },
    title: "DOM 선택과 조작",
    short: "화면의 글자와 버튼을 코드로 고르고 바꾸는 방법을 배워요.",
    intro: [
      "화면에 보이는 글자·버튼·그림은 전부 문서 트리(DOM)에 담겨 있어요.",
      "querySelector로 원하는 요소를 골라, 내용과 색을 코드로 바꿔 봐요.",
    ],
    story:
      "하람이가 게임 점수판을 만들다가 말했어요. 'HTML에 있는 숫자를 코드로 바꾸고 싶은데.' 세림이가 화면을 가리켰어요. '문서를 나무처럼 생겼다고 생각해 봐. 가지마다 이름표가 있잖아.' 하람이가 document.querySelector(\"#score\")를 쓰자 비티가 외쳤어요. '점수판 가지를 잡았어요!' textContent로 숫자를 100으로 바꾸자 도하가 눈을 동그랗게 떴어요. 'HTML을 고치지 않았는데 화면이 바뀌었어!'",
    lessons: [
      {
        title: "DOM은 나무예요",
        desc: "HTML을 나무 지도로 보고 요소를 찾아요.",
        code: '<!-- 화면(HTML)에는 이렇게 있어요 -->\n<h1 id="title">우리 반 게시판</h1>\n\n// 이렇게 고르고 읽어요\nconst title = document.querySelector("#title");\nconsole.log(title.textContent);',
        result: "우리 반 게시판",
      },
      {
        title: "querySelector로 고르기",
        desc: "CSS 선택자로 요소 하나를 골라요.",
        code: 'const title = document.querySelector("#title");\nconsole.log(title.textContent);',
        result: "우리 반 게시판",
      },
      {
        title: "내용과 모양 바꾸기",
        desc: "textContent·style·classList로 바꿔요.",
        code: 'const memo = document.querySelector(".memo");\nmemo.textContent = "내용이 바뀌었어요!";\nmemo.style.color = "tomato";\nmemo.classList.add("big");',
        result: "글자가 바뀌고, 색이 토마토색이 되고, big 클래스가 새로 붙어요.",
      },
    ],
    concepts: [
      {
        term: "DOM",
        en: "document object model",
        def: "HTML 문서를 나무 모양으로 그린 지도예요. 자바스크립트는 이 지도를 통해 화면을 바꿔요.",
      },
      {
        term: "querySelector",
        en: "querySelector",
        def: 'document.querySelector("#id")처럼 CSS 선택자로 요소 하나를 골라요. id는 #, class는 .으로 써요.',
      },
      {
        term: "textContent",
        en: "textContent",
        def: "요소 안의 글자예요. 값을 넣으면 화면의 글자가 바로 바뀌어요.",
      },
      {
        term: "style",
        en: "style",
        def: "요소.style.color처럼 CSS를 코드로 바꿔요. 색, 크기 등을 직접 정해요.",
      },
      {
        term: "classList",
        en: "classList",
        def: '클래스를 더하고 빼서 모양을 바꿔요. add("on"), remove("on"), toggle("on")이 있어요.',
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "요소 고르기",
        question: '<p id="msg">인사</p>에서 이 요소를 고르는 코드는 무엇인가요?',
        choices: [
          'document.querySelector("#msg")',
          'document.querySelector(".msg")',
          'document.querySelector("msg")',
          'document.querySelector("p#p")',
        ],
        answerIndex: 0,
        hint: "id는 CSS 선택자에서 #으로, class는 .으로 써요.",
        explanation: 'id="msg"는 선택자 #msg로 골라요. .msg는 class="msg"일 때 쓰는 선택자예요.',
      },
      {
        kind: "choice",
        level: "보통",
        title: "글자 바꾸기",
        question: '고른 요소 el의 글자를 "안녕!"으로 바꾸는 코드는 무엇인가요?',
        choices: ['el.textContent = "안녕!";', 'el.text = "안녕!";', "el.innerHTML.text = \"안녕!\";", 'el.value = "안녕!";'],
        answerIndex: 0,
        hint: "글자 내용은 textContent에 담겨 있어요.",
        explanation:
          'el.textContent = "안녕!"처럼 넣으면 화면 글자가 바로 바뀌어요. value는 입력창(input)에서 쓰는 속성이에요.',
      },
      {
        kind: "choice",
        level: "어려움",
        title: "classList 이해하기",
        question: 'el.classList.add("on")을 실행하면 무슨 일이 일어나나요?',
        choices: [
          "el의 글자에 'on'이 붙어요",
          "el의 class 목록에 'on'이 추가돼요",
          "'on'이라는 새 요소가 만들어져요",
          "el이 화면에서 사라져요",
        ],
        answerIndex: 1,
        hint: "classList는 그 요소가 가진 class 이름 목록이에요.",
        explanation:
          "classList.add는 class 속성에 'on'을 추가해요. CSS에 .on 스타일이 준비되어 있으면 화면 모양이 함께 바뀌어요.",
      },
    ],
  },
  {
    id: "js3",
    roman: "Ⅲ",
    icon: "🖱️",
    accent: { main: "#db2777", soft: "#fce7f3" },
    title: "이벤트 처리",
    short: "클릭·입력·키보드에 반응하는 살아 있는 페이지를 만들어요.",
    intro: [
      "버튼을 누르면 반응하는 게 진짜 프로그램이에요. '무언가가 일어나는 것'을 이벤트라고 불러요.",
      "addEventListener로 클릭·입력·키보드 이벤트에 반응해 봐요.",
    ],
    story:
      "도하가 버튼을 세게 눌렀어요. '왜 안 움직이지?' 하람이가 코드를 보여 줬어요. '버튼은 눌린다는 걸 알아 들어. 눌렸을 때 뭘 할지 가르쳐 주지 않아서 그래.' button.addEventListener(\"click\", sayHi)를 붙이자 비티가 인사를 시작했어요. '눌렸어요! 안녕하세요!' 세림이가 정리했어요. '이벤트는 문 두드리는 소리, addEventListener는 그 소리를 듣고 달려오는 방울이야.'",
    lessons: [
      {
        title: "클릭에 반응하기",
        desc: "버튼을 누를 때마다 실행할 함수를 연결해요.",
        code: 'const btn = document.querySelector("#like");\nconst count = document.querySelector("#count");\nlet n = 0;\n\nbtn.addEventListener("click", function () {\n  n = n + 1;\n  count.textContent = n;\n});',
        result: "좋아요 버튼을 누를 때마다 화면의 숫자가 1, 2, 3…으로 늘어나요.",
      },
      {
        title: "입력창 다루기",
        desc: "글자를 칠 때마다 반응해요.",
        code: 'const input = document.querySelector("#name");\ninput.addEventListener("input", function () {\n  console.log("지금 입력한 글자:", input.value);\n});',
        result: "한 글자를 적을 때마다 '지금 입력한 글자: …'가 기록돼요.",
      },
      {
        title: "키보드 이벤트",
        desc: "어떤 키를 눌렀는지 알 수 있어요.",
        code: 'document.addEventListener("keydown", function (event) {\n  if (event.key === "Enter") {\n    console.log("엔터를 눌렀어요!");\n  }\n});',
        result: "엔터 키를 누를 때마다 메시지가 출력돼요.",
      },
    ],
    concepts: [
      {
        term: "이벤트",
        en: "event",
        def: "클릭, 입력, 키 누르기처럼 사용자가 만드는 사건이에요. 페이지는 이벤트를 기다려요.",
      },
      {
        term: "addEventListener",
        en: "addEventListener",
        def: '요소에 이벤트가 생겼을 때 실행할 함수를 연결해요. addEventListener("click", 함수) 모양이에요.',
      },
      {
        term: "콜백 함수",
        en: "callback",
        def: "'이벤트가 오면 실행해 줘'하고 맡겨 두는 함수예요. function () { } 또는 ( ) => { }로 써요.",
      },
      {
        term: "자주 쓰는 이벤트",
        en: "click · input · keydown",
        def: "click(누르기), input(입력할 때마다), keydown(키를 누를 때)이 가장 자주 쓰여요.",
      },
      {
        term: "이벤트 객체",
        en: "event object",
        def: "함수에 event 매개변수를 넣으면 어떤 키인지(event.key) 같은 정보를 볼 수 있어요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "클릭 연결하기",
        question: "버튼 클릭에 반응하려면 어떻게 연결해요?",
        choices: [
          'btn.addEventListener("click", 함수)',
          'btn.click("함수")',
          "btn.onclickClick(함수)",
          'addEventListener(btn, "click")',
        ],
        answerIndex: 0,
        hint: "addEventListener는 '이벤트가 오면 이 함수를 실행해 줘'라는 연결 명령이에요.",
        explanation:
          'btn.addEventListener("click", 함수)는 btn에서 click 이벤트가 일어날 때 함수를 실행해 달라고 연결하는 코드예요.',
      },
      {
        kind: "choice",
        level: "보통",
        title: "클릭 카운터",
        question:
          "let n = 0;이고 버튼을 누를 때마다 n = n + 1; count.textContent = n;이 실행돼요. 세 번 누른 뒤 화면의 숫자는 무엇인가요?",
        choices: ["0", "1", "3", "6"],
        answerIndex: 2,
        hint: "n = n + 1은 n을 하나씩 늘려요.",
        explanation: "누를 때마다 n이 1, 2, 3으로 커지고 화면에 그 값이 보여서 3이 돼요.",
      },
      {
        kind: "number",
        level: "어려움",
        title: "누적 계산하기",
        question:
          "let n = 2;이고 버튼을 누를 때마다 n = n + 3;이 실행돼요. 다섯 번 누른 뒤 n의 값은 무엇인가요?",
        answer: 17,
        hint: "2에서 시작해 3씩 다섯 번 늘어나요.",
        explanation: "2 + 3 × 5 = 17이에요. 누적 코드는 시작 값과 얼마씩 늘어나는지만 세면 돼요.",
      },
    ],
  },
  {
    id: "js4",
    roman: "Ⅳ",
    icon: "🚦",
    accent: { main: "#16a34a", soft: "#dcfce7" },
    title: "조건문과 반복문",
    short: "if로 갈래 길을 만들고 for·while로 반복을 시켜요.",
    intro: [
      "'점수가 90 이상이면 합격 문구를 보여 줘'처럼 상황에 따라 다르게 반응하게 만들려면 조건문이 필요해요.",
      "for와 while을 더 깊이 써 보면서 구구단과 카운트다운도 만들어 봐요.",
    ],
    story:
      "도하가 점수에 따라 다른 문구를 띄우고 싶었어요. 하람이가 if와 else if로 조건을 차례로 검사했어요. 비티가 읽었어요. '85점이니까 B가 나왔어요!' 세림이가 물었어요. '같은 계산을 여러 번 하려면?' 하람이가 for (let i = 1; i <= 3; i++)를 쓰자 구구단 세 줄이 쫙 나왔어요. 도하가 정리했어요. '조건으로 갈래 길, 반복으로 여러 번!'",
    lessons: [
      {
        title: "if, else if, else",
        desc: "조건을 위에서부터 차례로 검사해요.",
        code: 'const score = 85;\nif (score >= 90) {\n  console.log("A");\n} else if (score >= 80) {\n  console.log("B");\n} else {\n  console.log("분발!");\n}',
        result: "B",
      },
      {
        title: "for로 구구단 찍기",
        desc: "i가 1부터 3까지 하나씩 커져요.",
        code: 'for (let i = 1; i <= 3; i++) {\n  console.log("3 × " + i + " = " + 3 * i);\n}',
        result: "3 × 1 = 3\n3 × 2 = 6\n3 × 3 = 9",
      },
      {
        title: "while과 break",
        desc: "조건 대신 true로 돌다가 break로 멈춰요.",
        code: 'let n = 1;\nwhile (true) {\n  if (n > 3) {\n    break;\n  }\n  console.log(n);\n  n++;\n}\nconsole.log("끝!");',
        result: "1\n2\n3\n끝!",
      },
    ],
    concepts: [
      {
        term: "if·else if·else",
        en: "if · else if · else",
        def: "조건을 위에서부터 차례로 검사해요. 참인 하나만 실행하고, 모두 거짓이면 else가 실행돼요.",
      },
      {
        term: "for문",
        en: "for loop",
        def: "for (let i = 1; i <= 3; i++)은 i를 1부터 3까지 하나씩 키우며 반복해요.",
      },
      {
        term: "while문",
        en: "while loop",
        def: "조건이 참인 동안 계속 반복해요. while (true)는 break 없이는 멈추지 않아요.",
      },
      {
        term: "break",
        en: "break",
        def: "반복을 그 자리에서 딱 멈춰요. 조건과 함께 쓰면 원하는 순간에 끝낼 수 있어요.",
      },
      {
        term: "논리 연산자",
        en: "&& · ||",
        def: "&&는 양쪽 모두 참일 때 참, ||는 한쪽만 참이어도 참이에요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "두 갈래 나누기",
        question: "조건이 참일 때와 거짓일 때 각각 다른 코드를 실행하려면 어떻게 해야 하나요?",
        choices: ["if와 else를 함께 써요", "console.log를 두 번 써요", "let을 두 번 써요", "중괄호를 없애요"],
        answerIndex: 0,
        hint: "else는 '그렇지 않으면'이라는 뜻이에요.",
        explanation:
          "if 조건이 거짓이면 else 쪽 코드가 실행돼요. 두 코드 중 하나는 반드시 실행돼요.",
      },
      {
        kind: "number",
        level: "보통",
        title: "for문 합계",
        question:
          "let total = 0;\nfor (let i = 1; i <= 4; i++) {\n  total += i;\n}\n실행 후 total의 값은 무엇인가요?",
        answer: 10,
        hint: "i는 1, 2, 3, 4가 돼요.",
        explanation: "1 + 2 + 3 + 4 = 10이에요. i++ 덕분에 i가 하나씩 커져요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "&& 조건 따라가기",
        question: "age = 13, ticket = 3000일 때 if (age >= 8 && ticket >= 5000)의 결과는 무엇인가요?",
        choices: ["거짓이라 else 쪽이 실행돼요", "참이라 if 쪽이 실행돼요", "오류가 나요", "둘 다 실행돼요"],
        answerIndex: 0,
        hint: "&&는 양쪽 모두 참이어야 참이에요.",
        explanation:
          "age >= 8은 참이지만 ticket >= 5000은 거짓이라 &&의 결과도 거짓이에요. 하나라도 거짓이면 거짓이에요.",
      },
    ],
  },
  {
    id: "js5",
    roman: "Ⅴ",
    icon: "🎁",
    accent: { main: "#d97706", soft: "#fef3c7" },
    title: "함수",
    short: "동작에 이름을 붙여 재료를 넣고 답을 받아요.",
    intro: [
      "같은 인사 코드를 세 번 복사할 필요가 없어요. 함수로 묶어 두면 이름만 부르면 돼요.",
      "재료(매개변수)를 넣고 답(return)을 받는 방법, 짧은 화살표 함수까지 배워요.",
    ],
    story:
      "세림이가 같은 인사 코드를 세 번 복사하다 지쳤어요. 하람이가 function greet(name)으로 묶었어요. '이름을 붙여 두면 부를 때마다 실행돼.' 비티가 도하와 세림을 차례로 불렀고, 인사가 두 번 쏟아졌어요. 도하가 물었어요. '계산한 답을 다른 데서 쓰려면?' 하람이가 return을 보여 줬어요. 세림이가 정리했어요. 'return은 함수 밖으로 답을 내보내는 출구야.'",
    lessons: [
      {
        title: "함수 선언과 호출",
        desc: "function으로 만들고 이름으로 불러요.",
        code: 'function greet(name) {\n  console.log("안녕, " + name + "!");\n}\ngreet("도하");\ngreet("세림");',
        result: "안녕, 도하!\n안녕, 세림!",
      },
      {
        title: "return으로 답 받기",
        desc: "계산한 값을 함수 밖으로 내보내요.",
        code: 'function square(n) {\n  return n * n;\n}\nconst r = square(4);\nconsole.log(r);\nconsole.log(square(9) - 1);',
        result: "16\n80",
      },
      {
        title: "화살표 함수",
        desc: "(n) => 모양으로 더 짧게 써요.",
        code: 'const double = (n) => n * 2;\nconsole.log(double(5));\nconsole.log(double(double(3)));',
        result: "10\n12",
      },
    ],
    concepts: [
      {
        term: "function 선언",
        en: "function declaration",
        def: "function greet(name) { ... }처럼 동작에 이름을 붙여요. greet(\"도하\")로 부를 때마다 실행돼요.",
      },
      {
        term: "매개변수와 인수",
        en: "parameter · argument",
        def: "greet(name)의 name은 재료 칸(매개변수), greet(\"도하\")의 \"도하\"는 실제로 넣는 값(인수)이에요.",
      },
      {
        term: "return",
        en: "return",
        def: "함수의 답을 밖으로 내보내요. square(4)는 return 덕분에 16이라는 값을 돌려줘요.",
      },
      {
        term: "화살표 함수",
        en: "arrow function",
        def: "const double = (n) => n * 2처럼 =>로 짧게 함수를 만들어요. 한 줄 답은 return을 생략해요.",
      },
      {
        term: "return과 console.log",
        en: "return vs console.log",
        def: "console.log는 화면에 보여 주기만 하고, return은 답을 돌려줘요. 답을 변수에 담으려면 return이 필요해요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "두 배 함수",
        question: "function twice(n) { return n * 2; }일 때 twice(6)의 값은 무엇인가요?",
        choices: ["12", "6", "62", "undefined"],
        answerIndex: 0,
        hint: "n 자리에 6이 들어가요.",
        explanation: "6 × 2 = 12가 return으로 돌아와요.",
      },
      {
        kind: "number",
        level: "보통",
        title: "화살표 함수 더하기",
        question: "const add = (a, b) => a + b;일 때 add(3, 8)의 값은 무엇인가요?",
        answer: 11,
        hint: "a에 3, b에 8이 순서대로 들어가요.",
        explanation: "화살표 함수도 재료를 똑같이 받아요. 3 + 8 = 11이 돼요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "return이 없는 함수",
        question: 'function hi() { console.log("안녕"); }을 만들고 x = hi()를 실행하면 x에는 무엇이 들어가나요?',
        choices: ["아무것도 돌아오지 않아요(undefined)", "안녕", "'안녕'이라는 글자", "0"],
        answerIndex: 0,
        hint: "return이 없는 함수의 답은 무엇일까요?",
        explanation:
          "hi는 실행 중에 안녕을 출력할 뿐, 돌려주는 답이 없어요. 그래서 x에는 undefined가 들어가요.",
      },
    ],
  },
  {
    id: "js6",
    roman: "Ⅵ",
    icon: "📚",
    accent: { main: "#0284c7", soft: "#e0f2fe" },
    title: "배열과 메서드",
    short: "여러 값을 담는 배열과 편리한 배열 도구를 배워요.",
    intro: [
      "간식 목록, 점수 목록처럼 여러 값을 한데 모으는 상자가 배열이에요.",
      "push·pop으로 넣고 빼고, map으로 한 번에 바꾸고, join으로 이어 붙여 봐요.",
    ],
    story:
      "비티가 좋아하는 간식 목록을 관리하고 싶었어요. 하람이가 초코와 사탕을 배열에 담고 push로 쿠키를 추가했어요. 비티가 읽었어요. '목록이 쿠키까지 세 개로 늘어났어요!' 도하가 map으로 숫자를 두 배로 바꾸자 세림이가 정리했어요. '배열엔 push, pop, map, join 같은 도구가 붙어 있어. 하나씩 꺼내 쓰면 돼.'",
    lessons: [
      {
        title: "배열 만들고 꺼내기",
        desc: "대괄호로 만들고 번호로 꺼내요.",
        code: 'const fruits = ["사과", "바나나", "포도"];\nconsole.log(fruits[0]);\nconsole.log(fruits.length);\nconsole.log(fruits[fruits.length - 1]);',
        result: "사과\n3\n포도",
      },
      {
        title: "넣고 빼기",
        desc: "push는 뒤에 붙이고, pop은 뒤에서 꺼내요.",
        code: 'const nums = [10, 20];\nnums.push(30);\nnums.push(40);\nconsole.log(nums);\nconst last = nums.pop();\nconsole.log(last);\nconsole.log(nums);',
        result: "[10,20,30,40]\n40\n[10,20,30]",
      },
      {
        title: "map과 join",
        desc: "map은 바꿔서, join은 이어서 새 값을 만들어요.",
        code: 'const nums = [1, 2, 3];\nconst doubled = nums.map(function (n) {\n  return n * 2;\n});\nconsole.log(doubled);\nconsole.log(nums.join("-"));',
        result: "[2,4,6]\n1-2-3",
      },
    ],
    concepts: [
      {
        term: "배열",
        en: "array",
        def: "대괄호로 여러 값을 순서대로 담아요. fruits[0]처럼 번호로 꺼내고, 번호는 0부터 시작해요.",
      },
      {
        term: "length",
        en: "length",
        def: "배열에 몇 개가 들었는지 알려 줘요. [10, 20, 30].length는 3이에요.",
      },
      {
        term: "push와 pop",
        en: "push · pop",
        def: "push는 값을 맨 뒤에 붙이고, pop은 맨 뒤 값을 꺼내 돌려줘요.",
      },
      {
        term: "map",
        en: "map",
        def: "각 값을 함수로 바꿔 새 배열을 만들어요. 원래 배열은 그대로 남아 있어요.",
      },
      {
        term: "join",
        en: "join",
        def: "배열 값을 사이 글자를 넣어 이어 붙인 문자열을 만들어요. join(\"-\")은 가-나-다처럼 돼요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "두 번째 값 꺼내기",
        question: 'arr = ["가", "나", "다"]일 때 arr[1]은 무엇인가요?',
        choices: ["나", "가", "다", "오류가 나요"],
        answerIndex: 0,
        hint: "첫 번째는 0번이에요.",
        explanation: "배열도 0부터 세므로 arr[1]은 두 번째 값 '나'예요.",
      },
      {
        kind: "number",
        level: "보통",
        title: "push 후 길이",
        question: "const nums = [5, 10, 15]; nums.push(20);을 실행한 뒤 nums.length의 값은 무엇인가요?",
        answer: 4,
        hint: "push는 값을 하나 추가해요.",
        explanation: "세 개였던 배열에 하나가 더해져 길이가 4가 돼요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "map의 결과",
        question: "[1, 2, 3].map(function (n) { return n + 1; })의 결과는 무엇인가요?",
        choices: ["[2,3,4]", "[1,2,3]", "6", "[1,2,3,4]"],
        answerIndex: 0,
        hint: "map은 각 값을 하나씩 바꿔 새 배열을 만들어요.",
        explanation: "각 값에 1을 더한 [2, 3, 4]가 새 배열로 만들어져요. 원래 배열은 그대로예요.",
      },
    ],
  },
  {
    id: "js7",
    roman: "Ⅶ",
    icon: "🪪",
    accent: { main: "#c026d3", soft: "#fae8ff" },
    title: "객체",
    short: "이름표를 붙여 정보를 한 덩어리로 담는 객체를 배워요.",
    intro: [
      "친구 한 명을 설명하려면 이름, 나이, 학교가 필요해요. 객체는 이런 정보를 한 덩어리로 담아요.",
      "점(.)으로 값을 꺼내고, 새 정보를 추가하고, 객체 안에 함수까지 담아 봐요.",
    ],
    story:
      "하람이가 도하의 명찰을 만들다 물었어요. '이름, 나이, 학교를 한 덩어리로 담으려면?' 세림이가 객체를 보여 줬어요. '도하 정보를 이름표와 값으로 담는 거야.' 도하가 점을 찍어 자기 이름을 꺼냈고, 객체 안에 함수를 넣자 비티가 계산까지 해 줬어요. 세림이가 정리했어요. '객체는 물건 하나를 설명하는 카드야. 정보와 동작을 함께 담을 수 있어.'",
    lessons: [
      {
        title: "객체 만들고 꺼내기",
        desc: "중괄호에 이름표: 값으로 담아요.",
        code: 'const doha = { name: "도하", age: 12 };\nconsole.log(doha.name);\nconsole.log(doha["age"]);',
        result: "도하\n12",
      },
      {
        title: "바꾸고 추가하기",
        desc: "없는 이름표에 넣으면 새로 생겨요.",
        code: 'const pet = { kind: "고양이", name: "비티" };\npet.name = "나비";\npet.age = 3;\nconsole.log(pet.name, pet.age);\nconsole.log(pet);',
        result: '나비 3\n{"kind":"고양이","name":"나비","age":3}',
      },
      {
        title: "객체 안의 함수",
        desc: "객체 안의 함수를 메서드라고 불러요.",
        code: 'const calc = {\n  name: "두 수 계산기",\n  add: function (a, b) {\n    return a + b;\n  },\n};\nconsole.log(calc.name);\nconsole.log(calc.add(3, 4));',
        result: "두 수 계산기\n7",
      },
    ],
    concepts: [
      {
        term: "객체",
        en: "object",
        def: "중괄호에 이름표(속성)와 값으로 정보를 담아요. 물건 하나를 설명하는 카드예요.",
      },
      {
        term: "점 표기법",
        en: "dot notation",
        def: "doha.name처럼 점 뒤에 속성 이름을 붙여 값을 꺼내거나 바꿔요.",
      },
      {
        term: "대괄호 표기법",
        en: "bracket notation",
        def: "doha[\"age\"]처럼 대괄호에 속성 이름을 문자열로 넣어 꺼내요.",
      },
      {
        term: "메서드",
        en: "method",
        def: "객체 안에 담긴 함수예요. calc.add(3, 4)처럼 점으로 불러 써요.",
      },
      {
        term: "새 속성 추가",
        en: "add property",
        def: "pet.age = 3처럼 없는 이름표에 값을 넣으면 속성이 새로 생겨요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "속성 꺼내기",
        question: 'const cat = { name: "나비" };에서 name을 꺼내는 코드는 무엇인가요?',
        choices: ["cat.name", "cat(name)", "cat->name", "name.cat"],
        answerIndex: 0,
        hint: "점(.)으로 속성을 꺼내요.",
        explanation: "객체는 cat.name처럼 점 뒤에 속성 이름을 붙여 값을 꺼내요.",
      },
      {
        kind: "number",
        level: "보통",
        title: "메서드 계산",
        question:
          "const calc = { add: function (a, b) { return a + b; } };일 때 calc.add(2, 9)의 값은 무엇인가요?",
        answer: 11,
        hint: "객체 안의 함수도 재료를 똑같이 받아요.",
        explanation: "calc.add(2, 9)는 2 + 9 = 11을 돌려줘요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "속성 추가하기",
        question:
          'const pet = { kind: "고양이" };에서 pet.age = 3;을 실행하면 pet은 어떻게 되나요?',
        choices: [
          "kind와 age 속성을 모두 가진 객체가 돼요",
          "kind가 사라져요",
          "age만 남아요",
          "오류가 나요",
        ],
        answerIndex: 0,
        hint: "새 속성은 그냥 넣으면 추가돼요.",
        explanation: "없는 속성에 값을 넣으면 새로 추가돼요. 그래서 kind와 age 둘 다 갖게 돼요.",
      },
    ],
  },
  {
    id: "js8",
    roman: "Ⅷ",
    icon: "🎨",
    accent: { main: "#dc2626", soft: "#fee2e2" },
    title: "스타일과 클래스 다루기",
    short: "코드로 화면 색과 모양을 바꾸는 방법을 배워요.",
    intro: [
      "자바스크립트는 CSS도 바꿀 수 있어요. style로 색·크기를 정하고, classList로 클래스를 붙였다 뗐다 할 수 있어요.",
      "예제는 실행기의 #app 상자 안에서 화면 요소를 만들고 꾸며요. 결과는 콘솔로 확인해요.",
    ],
    story:
      "비티가 자기 소개 카드를 예쁘게 꾸미고 싶었어요. 하람이가 msg.style.color를 토마토색으로 바꾸자 글자가 빨개졌어요. 도하가 물었어요. 'CSS를 자바스크립트가 바꿀 수 있어요?' 세림이가 classList를 알려 줬어요. '클래스를 붙였다 뗐다 하면 모양을 한 번에 바꿀 수 있어.' 비티가 클래스를 토글하며 좋아했어요. '붙였다 뗐다, 마법 같아요!'",
    lessons: [
      {
        title: "style로 꾸미기",
        desc: "#app 안에 요소를 만들고 색과 크기를 바꿔요.",
        code: 'const app = document.querySelector("#app");\napp.innerHTML = \'<p id="msg">안녕하세요!</p>\';\n\nconst msg = document.querySelector("#msg");\nmsg.style.color = "tomato";\nmsg.style.fontSize = "24px";\nconsole.log(msg.textContent, msg.style.color);',
        result: "안녕하세요! tomato",
      },
      {
        title: "클래스 붙였다 떼기",
        desc: "add로 붙이고 remove로 떼요.",
        code: 'const app = document.querySelector("#app");\napp.innerHTML = \'<p id="msg">안녕!</p>\';\nconst msg = document.querySelector("#msg");\n\nmsg.classList.add("on");\nconsole.log(msg.classList.contains("on"));\nmsg.classList.remove("on");\nconsole.log(msg.classList.contains("on"));',
        result: "true\nfalse",
      },
      {
        title: "모양 바꾸기 조합",
        desc: "클래스와 스타일과 글자를 한 번에 바꿔요.",
        code: 'const app = document.querySelector("#app");\napp.innerHTML = \'<p id="msg">기다리는 중</p>\';\nconst msg = document.querySelector("#msg");\n\nmsg.classList.add("card");\nmsg.style.background = "mistyrose";\nmsg.textContent = "분홍색 카드가 되었어요!";\nconsole.log(msg.className, msg.textContent);',
        result: "card 분홍색 카드가 되었어요!",
      },
    ],
    concepts: [
      {
        term: "style 객체",
        en: "style",
        def: "요소.style.color처럼 CSS 속성을 코드로 정해요. 색, 크기, 배경을 바꿀 수 있어요.",
      },
      {
        term: "인라인 스타일",
        en: "inline style",
        def: "자바스크립트가 style로 넣은 값은 요소에 직접 붙어요. 스타일 시트보다 우선해요.",
      },
      {
        term: "classList.add·remove",
        en: "add · remove",
        def: "클래스 이름을 목록에 더하고 빼요. CSS의 .on 스타일과 만나면 모양이 함께 바뀌어요.",
      },
      {
        term: "contains와 toggle",
        en: "contains · toggle",
        def: "contains는 붙어 있는지 참·거짓으로 알려 주고, toggle은 없으면 붙이고 있으면 떼요.",
      },
      {
        term: "innerHTML",
        en: "innerHTML",
        def: "요소 안을 통째로 새 HTML로 바꿔요. #app에 화면 재료를 만들 때 써요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "글자 색 바꾸기",
        question: '글자 색을 코드로 바꾸는 코드는 무엇인가요?',
        choices: ['el.style.color = "blue";', 'el.color = "blue";', 'el.style = "blue";', 'el.css("blue")'],
        answerIndex: 0,
        hint: "스타일은 style 객체 안에 있어요.",
        explanation: "el.style.color처럼 CSS 속성 이름으로 값을 넣으면 화면 색이 바로 바뀌어요.",
      },
      {
        kind: "choice",
        level: "보통",
        title: "두 번 add하면?",
        question: 'el.classList.add("on")을 두 번 실행하면 어떻게 되나요?',
        choices: [
          "클래스가 두 번 붙지만 결과는 같아요",
          "'on on'처럼 두 번 들어가요",
          "오류가 나요",
          "클래스가 사라져요",
        ],
        answerIndex: 0,
        hint: "add는 이미 있으면 또 넣지 않아요.",
        explanation: "classList는 같은 클래스를 하나만 유지해요. 두 번 add해도 클래스 목록은 그대로예요.",
      },
      {
        kind: "number",
        level: "어려움",
        title: "남은 클래스 개수",
        question:
          'className이 빈 상태에서 add("a"), add("b"), remove("a")를 차례로 실행한 뒤 남은 클래스는 몇 개인가요?',
        answer: 1,
        hint: "하나씩 붙였다가 하나를 뗐어요.",
        explanation: "a와 b가 붙었다가 a가 빠졌으므로 b 하나만 남아요.",
      },
    ],
  },
  {
    id: "js9",
    roman: "Ⅸ",
    icon: "⌨️",
    accent: { main: "#65a30d", soft: "#ecfccb" },
    title: "폼과 입력값 다루기",
    short: "입력창의 글자를 읽고 반응하는 앱을 만들어요.",
    intro: [
      "검색창, 로그인 창도 결국 입력창이에요. input 요소의 value만 읽을 줄 알면 다 만들 수 있어요.",
      "입력할 때마다 반응하는 input 이벤트와, 버튼 클릭으로 확인하는 방법을 배워요.",
    ],
    story:
      "도하가 닉네임을 치면 바로 나오는 앱을 만들고 싶었어요. 하람이가 input의 value를 읽는 방법을 보여 줬어요. '입력창에 적힌 글자는 value에 담겨.' 세림이가 input 이벤트를 연결했고, 비티가 글자를 쓸 때마다 화면이 바뀌는 걸 보고 놀랐어요. '치는 순간마다 반응해요!' 세림이가 정리했어요. '입력창을 다룰 줄 알면 설문조사 앱도 만들 수 있어.'",
    lessons: [
      {
        title: "입력창 값 읽기",
        desc: "value로 읽고, value에 넣으면 바뀌어요.",
        code: 'const app = document.querySelector("#app");\napp.innerHTML = \'<input id="nick" value="도하">\';\nconst nick = document.querySelector("#nick");\nconsole.log(nick.value);\nnick.value = "세림";\nconsole.log(nick.value);',
        result: "도하\n세림",
      },
      {
        title: "입력에 반응하기",
        desc: "input 이벤트로 실시간 반응을 만들어요.",
        code: 'const app = document.querySelector("#app");\napp.innerHTML = \'<input id="word" value=""><p id="out"></p>\';\nconst word = document.querySelector("#word");\nconst out = document.querySelector("#out");\n\nword.addEventListener("input", function () {\n  out.textContent = "입력한 글자: " + word.value;\n});\n\nword.value = "코딩";\nword.dispatchEvent(new Event("input"));\nconsole.log(out.textContent);',
        result: "입력한 글자: 코딩",
      },
      {
        title: "버튼으로 확인하기",
        desc: "click()으로 버튼을 누른 것처럼 실행해 봐요.",
        code: 'const app = document.querySelector("#app");\napp.innerHTML = \'<input id="num" value="7"><button id="go">확인</button><p id="out"></p>\';\nconst num = document.querySelector("#num");\nconst out = document.querySelector("#out");\n\ndocument.querySelector("#go").addEventListener("click", function () {\n  const n = Number(num.value);\n  if (n >= 10) {\n    out.textContent = "두 자리 수예요!";\n  } else {\n    out.textContent = "한 자리 수예요!";\n  }\n});\n\ndocument.querySelector("#go").click();\nconsole.log(out.textContent);',
        result: "한 자리 수예요!",
      },
    ],
    concepts: [
      {
        term: "value",
        en: "value",
        def: "input 요소에 적힌 글자예요. 읽을 수도 있고, 값을 넣어 바꿀 수도 있어요.",
      },
      {
        term: "input 이벤트",
        en: "input event",
        def: "입력창의 값이 바뀔 때마다 실행돼요. 실시간 검색창이 이 방식이에요.",
      },
      {
        term: "click 메서드",
        en: "click",
        def: "요소.click()은 버튼을 누른 것처럼 클릭 이벤트를 실행해요. 코드를 시험해 볼 때 유용해요.",
      },
      {
        term: "Number 함수",
        en: "Number",
        def: "value는 항상 글자예요. Number(\"7\")처럼 숫자로 바꿔야 계산할 수 있어요.",
      },
      {
        term: "결과 보여 주기",
        en: "output",
        def: "계산한 결과는 p 요소의 textContent에 넣어 화면에 보여 줘요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "입력값 읽는 속성",
        question: "입력창에 적힌 글자를 읽을 때 쓰는 속성은 무엇인가요?",
        choices: ["value", "textContent", "text", "label"],
        answerIndex: 0,
        hint: "textContent는 p 같은 글자 요소에서 써요.",
        explanation: "input의 글자는 value에 담겨요. textContent는 input에 쓰지 않아요.",
      },
      {
        kind: "choice",
        level: "보통",
        title: "input 이벤트 언제?",
        question: "input 이벤트는 언제 실행되나요?",
        choices: [
          "입력창의 값이 바뀔 때마다",
          "버튼을 누를 때",
          "페이지를 열 때",
          "마우스를 움직일 때",
        ],
        answerIndex: 0,
        hint: "버튼 누름은 click 이벤트예요.",
        explanation: "input 이벤트는 입력값이 바뀔 때마다 실행돼요. 실시간 검색이 이 방식이에요.",
      },
      {
        kind: "number",
        level: "어려움",
        title: "글자를 숫자로",
        question: 'Number("6") + 4의 값은 무엇인가요?',
        answer: 10,
        hint: 'Number("6")은 글자 "6"을 숫자 6으로 바꿔요.',
        explanation: 'Number로 바꾸면 계산할 수 있어서 6 + 4 = 10이에요. "6" + 4였다면 "64"라는 글자가 돼요.',
      },
    ],
  },
  {
    id: "js10",
    roman: "Ⅹ",
    icon: "🏗️",
    accent: { main: "#1d4ed8", soft: "#dbeafe" },
    title: "프로젝트: 계산기와 퀴즈 앱",
    short: "화면·이벤트·계산을 모아 계산기와 퀴즈 앱을 완성해요.",
    intro: [
      "지금까지 배운 DOM, 이벤트, 함수를 모으면 진짜 앱이 돼요. 기획 → 조립 → 확장 순서로 만들어 봐요.",
      "계산기는 버튼 클릭으로 계산하고, 퀴즈 앱은 정답을 골라 점수를 매겨요. 예제는 #app 상자 안에서 동작해요.",
    ],
    story:
      "비티가 계산기와 퀴즈 앱을 한 번에 만들자고 했어요. 하람이가 설계도를 그렸어요. '화면 만들기 → 버튼 연결 → 결과 보여 주기, 순서대로 조립하면 돼.' 도하가 숫자 두 개를 넣고 더하기 버튼을 눌렀더니 17이 나왔어요. 세림이가 퀴즈 정답 버튼을 눌러 10점을 확인했어요. 비티가 외쳤어요. '우리 앱이 진짜로 동작해요!'",
    lessons: [
      {
        title: "기획: 화면 설계도",
        desc: "만들 화면과 동작 순서를 먼저 정해요.",
        code: '// 계산기 만들기 1단계\n// 1. 숫자 두 개를 입력받는다\n// 2. 버튼을 누르면 계산한다\n// 3. 결과를 화면에 보여 준다\n\nconst app = document.querySelector("#app");\napp.innerHTML = \'<input id="a" value="3"><input id="b" value="4"><p id="out"></p>\';\n\nconst out = document.querySelector("#out");\nout.textContent = "계산 준비 완료!";\nconsole.log(out.textContent);',
        result: "계산 준비 완료!",
      },
      {
        title: "단계별 조립 — 계산기 완성 코드",
        desc: "버튼마다 계산 함수를 연결해요.",
        code: 'const app = document.querySelector("#app");\napp.innerHTML =\n  \'<input id="a" value="12"><input id="b" value="5">\' +\n  \'<button id="add">더하기</button><button id="mul">곱하기</button><p id="out"></p>\';\n\nconst a = document.querySelector("#a");\nconst b = document.querySelector("#b");\nconst out = document.querySelector("#out");\n\nconst show = function (mark, value) {\n  out.textContent = a.value + " " + mark + " " + b.value + " = " + value;\n};\n\ndocument.querySelector("#add").addEventListener("click", function () {\n  show("+", Number(a.value) + Number(b.value));\n});\ndocument.querySelector("#mul").addEventListener("click", function () {\n  show("×", Number(a.value) * Number(b.value));\n});\n\ndocument.querySelector("#add").click();\nconsole.log(out.textContent);\ndocument.querySelector("#mul").click();\nconsole.log(out.textContent);',
        result: "12 + 5 = 17\n12 × 5 = 60",
      },
      {
        title: "확장 과제: 퀴즈 앱",
        desc: "객체에 문제를 담고 버튼으로 정답을 골라요.",
        code: 'const quiz = {\n  question: "파이썬에서 목록을 만드는 기호는?",\n  choices: ["( )", "[ ]"],\n  answer: 1,\n};\n\nconst app = document.querySelector("#app");\nconst title = document.createElement("p");\ntitle.textContent = "Q. " + quiz.question;\napp.appendChild(title);\n\nlet score = 0;\n\nquiz.choices.forEach(function (choice, i) {\n  const btn = document.createElement("button");\n  btn.textContent = i + 1 + "번 " + choice;\n  btn.addEventListener("click", function () {\n    if (i === quiz.answer) {\n      score = score + 10;\n      console.log("정답! 점수:", score);\n    } else {\n      console.log("아쉬워요!");\n    }\n  });\n  app.appendChild(btn);\n});\n\napp.querySelectorAll("button")[0].click();\napp.querySelectorAll("button")[1].click();',
        result: "아쉬워요!\n정답! 점수: 10",
      },
    ],
    concepts: [
      {
        term: "화면 설계",
        en: "planning",
        def: "먼저 만들 화면과 동작 순서를 적어 두면 코드를 차근차근 조립할 수 있어요.",
      },
      {
        term: "함수로 동작 묶기",
        en: "function",
        def: "결과를 보여 주는 동작을 함수로 묶으면 여러 버튼에서 다시 쓸 수 있어요.",
      },
      {
        term: "Number로 계산",
        en: "Number",
        def: "input의 value는 글자예요. Number로 바꿔야 더하기·곱하기가 돼요.",
      },
      {
        term: "클릭 연결",
        en: "click event",
        def: 'addEventListener("click", 함수)로 버튼을 눌렀을 때 할 일을 정해요.',
      },
      {
        term: "점수 변수",
        en: "state",
        def: "let score = 0을 만들어 두고 정답일 때 10씩 더하면 앱의 상태가 저장돼요.",
      },
    ],
    problems: [
      {
        kind: "choice",
        level: "쉬움",
        title: "프로젝트 첫 단계",
        question: "프로젝트를 만들 때 가장 먼저 할 일은 무엇인가요?",
        choices: [
          "화면과 동작 순서를 설계하는 것",
          "바로 코드를 다 쓰는 것",
          "버튼 색부터 고르는 것",
          "점수부터 매기는 것",
        ],
        answerIndex: 0,
        hint: "설계도가 있어야 조립이 쉬워요.",
        explanation: "먼저 만들 화면과 동작 순서를 적어 두면 코드를 차근차근 조립할 수 있어요.",
      },
      {
        kind: "number",
        level: "보통",
        title: "계산기 곱하기",
        question:
          '계산기에서 a.value가 "12", b.value가 "5"일 때 Number(a.value) * Number(b.value)의 값은 무엇인가요?',
        answer: 60,
        hint: "value는 글자라 Number로 바꿔 계산해요.",
        explanation: "12 × 5 = 60이에요. 글자 그대로 곱할 수 없으니 꼭 Number로 바꿔요.",
      },
      {
        kind: "choice",
        level: "어려움",
        title: "퀴즈 정답 판정",
        question: "퀴즈 앱에서 정답인지 어떻게 알 수 있나요?",
        choices: [
          "누른 버튼의 번호 i가 quiz.answer와 같은지 비교해요",
          "버튼 색을 비교해요",
          "화면 길이를 재요",
          "점수를 미리 정해요",
        ],
        answerIndex: 0,
        hint: "몇 번 버튼을 눌렀는지가 곧 답이에요.",
        explanation:
          "forEach에서 i는 버튼 번호예요. i === quiz.answer이면 정답이라 점수를 더해요.",
      },
    ],
  },
];

export const SUBJECTS: readonly Subject[] = [
  {
    id: "python",
    label: "파이썬",
    intro: "파이썬은 글처럼 읽히는 언어예요. 계산과 반복을 부탁하기에 딱 좋아요.",
    units: PYTHON_UNITS,
  },
  {
    id: "js",
    label: "자바스크립트",
    intro: "자바스크립트는 웹 페이지를 움직이게 하는 언어예요. 브라우저에서 바로 돌아가요.",
    units: JS_UNITS,
  },
];

export function getSubject(id: string): Subject {
  return SUBJECTS.find((subject) => subject.id === id) ?? SUBJECTS[0];
}
