import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Tabs from "../components/Tabs";
import PromptBlock from "../components/PromptBlock";
import "./PromptPage.css";

type LevelId = "elementary" | "middle" | "high";

type Focus = "부탁하기" | "되말하기" | "점검·검증" | "선택 기록" | "마무리";

type ExamplePrompt = {
  title: string;
  text: string;
  note?: string;
};

type Lesson = {
  no: number;
  title: string;
  focus: Focus;
  goal: string;
  prompts: ExamplePrompt[];
};

type Level = {
  id: LevelId;
  label: string;
  intro: string;
  lessons: Lesson[];
};

const LEVEL_IDS: readonly LevelId[] = ["elementary", "middle", "high"];

function isLevelId(value: string | null): value is LevelId {
  return value !== null && (LEVEL_IDS as readonly string[]).includes(value);
}

const STEPS: { name: string; desc: string }[] = [
  { name: "부탁하기", desc: "원하는 것을 구체적으로 말해요" },
  { name: "되말하기", desc: "확인 질문을 주고받아요" },
  { name: "점검·검증", desc: "다른 출처와 비교해 확인해요" },
  { name: "선택 기록", desc: "고른 이유를 활동지에 적어요" },
  { name: "마무리", desc: "배운 방법을 정리해 발표해요" },
];

const LEVELS: Level[] = [
  {
    id: "elementary",
    label: "초등",
    intro: "5·6학년 눈높이로, 부탁하고 다시 물어보는 습관을 기르는 6차시예요.",
    lessons: [
      {
        no: 1,
        title: "AI에게 바르게 부탁해요",
        focus: "부탁하기",
        goal: "누가, 무엇을, 왜 필요한지를 담아 AI에게 정확히 부탁해요. 처음부터 자세히 부탁하면 첫 답이 훨씬 쓸 만해져요.",
        prompts: [
          {
            title: "예시 발화 · 처음 부탁하기",
            text:
              "안녕하세요. 저는 초등학교 5학년이에요.\n" +
              "사회 시간에 '우리 고장의 특산물'을 조사하고 있어요.\n" +
              "하동의 특산물을 초등학생이 이해하기 쉬운 말로 세 가지만 소개해 주세요.\n" +
              "어려운 단어가 나오면 짧게 풀어서 설명해 주세요.",
            note: "'5학년', '하동', '세 가지'처럼 빈칸을 바꿔 쓰게 하면 아이들 각자의 질문이 돼요.",
          },
        ],
      },
      {
        no: 2,
        title: "답이 별로면 다시 물어봐요",
        focus: "부탁하기",
        goal: "마음에 들지 않는 답을 받아도 포기하지 않아요. 부탁을 고쳐서 다시 물어보는 연습을 해요.",
        prompts: [
          {
            title: "예시 발화 · 더 쉽게 다시 부탁하기",
            text:
              "방금 알려 준 설명은 조금 어려웠어요.\n" +
              "초등학생이 읽을 수 있게 짧은 문장으로 다시 설명해 주세요.\n" +
              "마지막에 이해를 돕는 예를 하나 들어 주세요.",
          },
          {
            title: "예시 발화 · 더 자세히 다시 부탁하기",
            text:
              "이번 답은 너무 짧았어요.\n" +
              "가장 중요한 내용을 골라 세 문장으로 자세히 설명해 주세요.\n" +
              "읽고 나서 궁금해질 만한 질문 하나도 함께 알려 주세요.",
          },
        ],
      },
      {
        no: 3,
        title: "AI가 먼저 되묻게 해요",
        focus: "되말하기",
        goal: "AI가 일을 시작하기 전에 확인 질문을 먼저 묻게 만들어요. 내 뜻과 다른 답을 미리 막아요.",
        prompts: [
          {
            title: "예시 발화 · 되묻기 약속 정하기",
            text:
              "지금부터 내가 부탁하면 바로 답하지 말아 주세요.\n" +
              "이해가 안 되는 부분이 있으면 먼저 나에게 질문해 주세요.\n" +
              "내 대답이 모두 끝나면 그때 설명을 시작해 주세요.\n" +
              "설명이 끝나면 빠뜨린 점이 없는지 마지막으로 확인해 주세요.",
            note: "AI가 무엇을 물어보는지 활동지에 적고, 그 질문이 좋았는지 친구와 이야기해 보게 해요.",
          },
        ],
      },
      {
        no: 4,
        title: "진짜인지 점검해요",
        focus: "점검·검증",
        goal: "AI의 답을 교과서·백과사전과 비교하며 확인해요. AI도 틀릴 수 있다는 것을 알아요.",
        prompts: [
          {
            title: "예시 발화 · 확실한지 물어보기",
            text:
              "방금 알려 준 내용 중에서 확실하지 않은 부분이 있다면 솔직하게 알려 주세요.\n" +
              "친구들 앞에서 발표하려고 해요.\n" +
              "내가 미리 확인해야 할 것을 세 가지 알려 주세요.",
          },
        ],
      },
      {
        no: 5,
        title: "내 선택을 기록해요",
        focus: "선택 기록",
        goal: "AI가 준 여러 답 가운데 하나를 고르고, 고른 이유를 활동지에 적어요.",
        prompts: [
          {
            title: "예시 발화 · 비교하고 선택하기",
            text:
              "우리 반 반려 동물 후보로 강아지와 고양이를 비교하려고 해요.\n" +
              "기르는 방법, 드는 비용, 좋은 점을 표로 정리해 주세요.\n" +
              "제가 하나를 고르면 왜 그것을 골랐는지 되물어 주세요.\n" +
              "내 대답을 한 문장으로 정리해 주세요.",
            note: "마지막 문장을 활동지 '선택 기록' 칸에 옮겨 적게 해요.",
          },
        ],
      },
      {
        no: 6,
        title: "배운 것을 마무리해요",
        focus: "마무리",
        goal: "다섯 단계 활동을 돌아보고, 앞으로 AI를 쓸 때 지킬 약속을 정해요.",
        prompts: [
          {
            title: "예시 발화 · 활동 정리 부탁하기",
            text:
              "오늘 활동을 돌아보려고 해요.\n" +
              "내가 무엇을 부탁했는지, 어떻게 다시 물어봤는지, 무엇을 확인했는지 세 줄로 정리해 주세요.\n" +
              "마지막 줄에는 다음에 AI를 쓸 때 지키고 싶은 약속 하나를 적어 주세요.",
          },
        ],
      },
    ],
  },
  {
    id: "middle",
    label: "중학",
    intro: "뉴스와 사회 이슈를 소재로, 사실을 검증하는 힘을 기르는 4차시예요.",
    lessons: [
      {
        no: 1,
        title: "뉴스를 읽고 질문을 만들어요",
        focus: "부탁하기",
        goal: "뉴스 기사에서 궁금한 점을 찾아, AI에게 구체적으로 부탁하는 질문으로 바꿔요.",
        prompts: [
          {
            title: "예시 발화 · 뉴스 주제 물어보기",
            text:
              "중학생이에요. 기후 변화 뉴스를 읽고 있어요.\n" +
              "'탄소중립'이 무엇인지 중학생이 이해할 수 있게 설명해 주세요.\n" +
              "우리나라의 탄소중립 목표와 이를 지키기 어려운 점도 함께 알려 주세요.\n" +
              "마지막에 더 공부해 볼 키워드 두 개를 알려 주세요.",
          },
        ],
      },
      {
        no: 2,
        title: "확인 질문을 주고받아요",
        focus: "되말하기",
        goal: "AI와 되묻기 규칙을 정해 놓고, 확인 질문을 주고받으며 답을 다듬어요.",
        prompts: [
          {
            title: "예시 발화 · 되묻기 규칙 정하기",
            text:
              "앞으로 답하기 전에 내 질문에서 애매한 부분을 먼저 질문해 주세요.\n" +
              "답을 마친 뒤에는 내가 스스로 확인해 볼 질문 하나를 던져 주세요.\n" +
              "답이 길어질 것 같으면 목차부터 보여 주고, 제 동의를 받은 뒤에 본문을 써 주세요.",
          },
        ],
      },
      {
        no: 3,
        title: "정보를 교차 검증해요",
        focus: "점검·검증",
        goal: "AI 답변에서 사실과 의견을 구분하고, 다른 출처와 비교하며 확인해요.",
        prompts: [
          {
            title: "예시 발화 · 사실과 의견 나누기",
            text:
              "방금 설명한 내용에서 사실과 의견을 나눠 표로 정리해 주세요.\n" +
              "사실 중에서 출처를 확인해야 하는 것이 있다면 표시해 주세요.\n" +
              "확실하지 않은 부분은 아는 척하지 말고 모른다고 말해 주세요.",
          },
          {
            title: "예시 발화 · 다른 출처와 비교하기",
            text:
              "다른 기사에서 찾은 내용을 아래에 붙여 넣을게요.\n" +
              "앞서 네가 설명한 내용과 다른 점을 찾아 알려 주세요.\n" +
              "어느 쪽을 더 믿을 만한지, 판단하는 기준도 함께 알려 주세요.",
          },
        ],
      },
      {
        no: 4,
        title: "근거를 남기고 마무리해요",
        focus: "선택 기록",
        goal: "검증 결과 중 무엇을 택했는지와 그 이유를 활동지에 기록해요. 다섯 단계를 정리해 발표해요.",
        prompts: [
          {
            title: "예시 발화 · 기록할 문장 만들기",
            text:
              "오늘 확인한 내용으로 활동지 '선택 기록' 칸에 적을 세 문장을 만들어 주세요.\n" +
              "첫 문장은 내가 고른 답, 둘째 문장은 고른 이유, 셋째 문장은 아직 확실하지 않은 점으로 써 주세요.\n" +
              "발표에 쓸 한 줄 요약도 만들어 주세요.",
          },
        ],
      },
    ],
  },
  {
    id: "high",
    label: "고등",
    intro: "진로 탐색과 탐구 보고서에 다시 묻는 방법을 직접 적용하는 3차시예요.",
    lessons: [
      {
        no: 1,
        title: "탐구 질문을 다듬어요",
        focus: "부탁하기",
        goal: "진로로 연결되는 관심사를 탐구 보고서에 쓸 질문으로 다듬어요. AI와 주고받으며 질문의 범위를 좁혀요.",
        prompts: [
          {
            title: "예시 발화 · 연구 질문 다듬기",
            text:
              "고등학생이고, 진로 주제로 '생성형 AI가 직업 세계에 미치는 영향'을 탐구하려고 해요.\n" +
              "탐구 보고서에 쓸 수 있는 연구 질문 세 가지를 제안해 주세요.\n" +
              "제안하기 전에 내가 이미 알고 있는 것과 확인하고 싶은 것을 구분할 수 있게 먼저 질문해 주세요.\n" +
              "질문마다 범위가 너무 넓으면 좁히는 방법을 하나씩 붙여 주세요.",
          },
        ],
      },
      {
        no: 2,
        title: "출처를 검증해요",
        focus: "점검·검증",
        goal: "보고서에 인용할 자료를 검증하는 기준을 세워요. AI의 답을 실제 자료와 대조해 확인해요.",
        prompts: [
          {
            title: "예시 발화 · 검증 기준 만들기",
            text:
              "탐구에 쓸 자료를 검증하는 기준을 만들어 주세요.\n" +
              "작성 주체, 작성 시점, 근거의 출처를 어떻게 확인할지 항목으로 정리해 주세요.\n" +
              "이 기준으로 자료를 평가하는 확인표 양식도 함께 만들어 주세요.",
          },
        ],
      },
      {
        no: 3,
        title: "보고서를 다시 묻고 완성해요",
        focus: "마무리",
        goal: "선택과 근거를 기록하고, AI에게 초안 피드백을 받아 보고서를 마무리해요.",
        prompts: [
          {
            title: "예시 발화 · 초안 피드백 받기",
            text:
              "내 보고서 초안을 아래에 붙여 넣을게요.\n" +
              "논리가 약한 부분과 근거가 부족한 부분을 표시해 주세요.\n" +
              "고치기 전에 내 의도를 확인하려는 질문을 먼저 물어봐 주세요.\n" +
              "마지막에는 내가 직접 판단해야 할 부분과 AI 도움을 받은 부분을 구분해 알려 주세요.",
          },
        ],
      },
    ],
  },
];

export default function PromptPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const levelParam = searchParams.get("level");
  const level: LevelId = isLevelId(levelParam) ? levelParam : "elementary";

  // 학교급에 따라 사이트 전체 테마(배경·포인트 색·모서리·글자 크기)를 바꿔요.
  useEffect(() => {
    document.documentElement.dataset.level = level;
    return () => {
      delete document.documentElement.dataset.level;
    };
  }, [level]);

  const handleLevelChange = (id: string) => {
    setSearchParams({ level: id }, { replace: true });
  };

  const tabs = LEVELS.map((lv) => ({ id: lv.id, label: lv.label }));

  return (
    <main className="container page">
      <PageHeader
        title="다시 묻는 AI 교실"
        intro={
          <p>
            AI의 첫 결과물은 끝이 아니라 출발점이에요. 부탁하고, 확인하고, 바로잡는 연습을 차시마다
            반복해요. 초·중·고 13차시 커리큘럼이에요.
          </p>
        }
      />

      <div className="pdf-actions">
        <button type="button" className="btn btn-primary" disabled>
          📄 활동지 PDF 받기 (준비 중)
        </button>
        <p className="footnote">활동지 PDF를 만들고 있어요. 준비되면 이 버튼으로 받을 수 있어요.</p>
      </div>

      <section className="section" aria-labelledby="prompt-flow-heading">
        <h2 id="prompt-flow-heading">핵심 5단계</h2>
        <div className="card flow-card">
          <p className="flow-lead">
            모든 차시는 이 순서를 반복하며 연습해요. 차시마다 한 단계를 중점으로 다뤄요.
          </p>
          <ol className="flow-steps">
            {STEPS.map((step, index) => (
              <li key={step.name} className="flow-step">
                <span className="flow-num">{index + 1}</span>
                <strong className="flow-name">{step.name}</strong>
                <span className="flow-desc">{step.desc}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" aria-labelledby="prompt-level-heading">
        <h2 id="prompt-level-heading">학교급을 골라요</h2>
        <p className="level-note">
          초등 6차시 · 중학 4차시 · 고등 3차시, 모두 13차시로 짜여 있어요. 차시 번호는 각 학교급 안에서
          1번부터 시작해요.
        </p>
        <Tabs tabs={tabs} active={level} onChange={handleLevelChange} ariaLabel="학교급 선택" />
        {LEVELS.map((lv) => (
          <div
            key={lv.id}
            role="tabpanel"
            id={`panel-${lv.id}`}
            aria-labelledby={`tab-${lv.id}`}
            hidden={lv.id !== level}
          >
            <p className="level-intro">{lv.intro}</p>
            <div className="lesson-list">
              {lv.lessons.map((lesson) => (
                <article key={lesson.no} className="card lesson-card">
                  <div className="lesson-meta">
                    <span className="tag">
                      {lv.label} · {lesson.no}차시
                    </span>
                    <span className="badge">중점 · {lesson.focus}</span>
                  </div>
                  <h3 className="lesson-title">{lesson.title}</h3>
                  <p className="lesson-goal">
                    <strong>활동 목표</strong>
                    <span>{lesson.goal}</span>
                  </p>
                  {lesson.prompts.map((prompt) => (
                    <PromptBlock
                      key={prompt.title}
                      title={prompt.title}
                      text={prompt.text}
                      note={prompt.note}
                    />
                  ))}
                </article>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
