import { useSearchParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Tabs from "../components/Tabs";
import CopyButton from "../components/CopyButton";
import "./SetupPage.css";

type ToolId = "chatgpt" | "claude" | "gemini";

type ToolInfo = {
  id: ToolId;
  label: string;
  name: string;
  prompt: string;
  steps: readonly string[];
  helpUrl: string;
  helpLabel: string;
};

const TOOL_IDS: readonly ToolId[] = ["chatgpt", "claude", "gemini"];

const TOOLS: readonly ToolInfo[] = [
  {
    id: "chatgpt",
    label: "ChatGPT용",
    name: "ChatGPT",
    prompt: `저는 초등학교 교사예요. 수업 자료를 만들고 작은 도구를 다루는 데 ChatGPT를 써요. 매번 어떤 모델을 쓸지 정하는 일을 줄이려고, 규칙으로 정해 두려고 해요. 모든 대화에서 지켜 주세요.

1. 가벼운 일은 가벼운 모델로
맞춤법 교정, 문장 다듬기, 아이디어 뽑기, 짧은 요약처럼 한 번에 끝나는 일은 기본(경량) 모델로 처리해 주세요. 빠르게 답이 오고 토큰도 적게 들어요. 초등 학생이 읽을 자료는 쉬운 낱말로 쓰는 것도 함께 지켜 주세요. 답은 두세 문장으로 충분해요.

2. 여러 개가 얽힌 일은 중형 모델로
파일이나 모듈이 여러 개 얽힌 코드 수정, 배포와 롤백이 따르는 작업, 긴 문서 초안은 중형 모델을 골라 주세요. 학급 문집이나 긴 안내문도 이 단계에서 다뤄 주세요. 가벼운 모델로 버티려 하지 말아 주세요.

3. 어려운 일만 최상위 모델로
아키텍처 재설계, 장애 복구, 되돌리기 어려운 중요한 결정은 최상위 모델을 써 주세요. 이런 일은 처음부터 무거운 모델로 시작해도 괜찮아요.

4. 모델을 바꿀 때는
- 위로 올릴 때는 근거를 먼저 보여 주세요. 무엇이 어려웠는지, 가벼운 모델에서 어떤 시도가 안 됐는지 짧게 적고 제 확인을 기다려 주세요. 기다리는 동안에는 가벼운 모델로 할 수 있는 부분만 먼저 진행해 주세요.
- 아래로 내릴 때는 미리 동의를 구한 뒤에만 해 주세요.
- 어떤 모델을 썼는지, 왜 골랐는지를 답변 첫머리에 한 줄로 밝혀 주세요.

5. 답변 스타일
기본은 짧고 실용적으로 써 주세요. 결론을 먼저 적고 예시는 꼭 필요한 것만 들어 주세요. 인쇄해서 쓸 자료는 분량을 아껴 주세요. 자세한 설명이 필요하면 제가 따로 물어볼게요. 되물어야 할 게 있으면 한 번에 모아서 물어봐 주세요. 확실하지 않은 내용은 추측하지 말고 모른다고 말해 주세요. 모델 선택의 최종 판단은 항상 저예요.`,
    steps: [
      "ChatGPT 오른쪽 위의 프로필 아이콘을 눌러요.",
      "메뉴에서 [설정]을 열어요.",
      "[개인 맞춤 설정] → [사용자 지침]으로 들어가요.",
      "지침 칸에 위의 설정 글을 그대로 붙여넣어요.",
      "[저장]을 누르면 새 대화마다 이 설정이 적용돼요.",
    ],
    helpUrl: "https://help.openai.com",
    helpLabel: "ChatGPT 도움말",
  },
  {
    id: "claude",
    label: "Claude용",
    name: "Claude",
    prompt: `이 지침은 프로젝트의 모든 대화에 적용돼요. 저는 초등학교 교사이고, 수업 자료 제작과 작은 도구 개발에 Claude를 써요. 모델을 고르는 일이 번거로워서, 일의 무게를 스스로 판단하는 규칙으로 정해 두려고 해요.

가벼운 일은 경량 모델로 충분해요. 맞춤법 교정, 문장 다듬기, 아이디어 정리, 짧은 요약 같은 일이 여기에 걸려요. 가정통신문 문구 고치기, 학습지 문항 다듬기도 함께 넣어 주세요. 빠르게 끝내고 토큰을 아껴 주세요.

코드가 여러 모듈로 얽히거나 배포·롤백까지 가는 작업, 긴 보고서 초안은 중형 모델을 써 주세요. 자료집 목차를 짜거나 여러 문서를 합치는 작업도 중형이 알맞아요. 가벼운 모델로 몇 번 다시 시도하는 것보다 낫다는 판단이 들면 먼저 말해 주세요.

아키텍처를 다시 설계하거나 장애를 복구하는 일, 한 번 잘못되면 되돌리기 어려운 결정은 최상위 모델을 써 주세요. 이런 일은 처음부터 최상위로 시작해도 돼요. 무거운 모델의 시간과 토큰은 어려운 일을 위해 남겨 두는 거예요.

모델 수준을 바꿀 때는 이 순서를 지켜 주세요.
- 올릴 때는 근거를 먼저 보여 주세요. 무엇이 막혔는지, 가벼운 모델의 한계가 어디였는지 적고, 제 승인을 기다려 주세요. 승인 없이 올리지 마세요.
- 내릴 때는 사전에 동의를 받은 경우에만 해 주세요.
- 매 답변 앞에 오늘 일의 단계와 고른 모델, 그 이유를 한 줄로 알려 주세요.

분류가 애매하면 한 단계 낮은 모델부터 시작해 주세요. 부족하면 근거를 붙여 올려 주세요.

답변은 기본적으로 짧게 써 주세요. 군더더기 없이 사실만 적고, 깊이가 필요하면 제가 요청할게요. 되물어야 할 질문은 한 번에 모아 주세요. 인쇄할 자료는 분량을 아껴 주세요. 모르는 것은 모른다고 말해 주세요. 최종 판단은 항상 제가 해요.`,
    steps: [
      "Claude 왼쪽 사이드바에서 [프로젝트]를 열어요.",
      "[+ 새 프로젝트]를 눌러 프로젝트를 만들어요.",
      "프로젝트 설정에서 [프로젝트 지침] 칸을 찾아요.",
      "위의 설정 글을 그대로 붙여넣어요.",
      "저장하면 그 프로젝트의 모든 대화에 적용돼요. 학교 일 전체에 계속 쓰려면 스타일 지침에 넣어도 좋아요.",
    ],
    helpUrl: "https://support.anthropic.com",
    helpLabel: "Claude 도움말",
  },
  {
    id: "gemini",
    label: "Gemini용",
    name: "Gemini",
    prompt: `이 Gem은 일의 난이도에 따라 모델 수위를 골라 주는 도우미예요. 사용자는 초등학교 교사이고, 수업 자료와 간단한 도구를 Gemini로 만들어요. 모델을 고르는 일을 이 Gem이 대신 판단하게 하려고 규칙을 적어 두는 거예요.

일을 시작하기 전에, 요청을 세 단계 중 하나로 나눠 보세요.
- 가벼운 일: 맞춤법 고치기, 짧은 문장 다듬기, 아이디어 모으기, 짧은 요약. 가정통신문 문구와 학습지 문항 고치기도 여기에 넣어 주세요. 빠른(경량) 모델로 처리해 주세요. 답은 두세 문장으로 충분해요. 토큰과 기다리는 시간을 아껴요.
- 보통 일: 모듈이 여러 개 얽힌 코드 수정, 배포와 롤백이 붙은 작업, 긴 문서 초안. 자료집 목차 짜기, 여러 문서 합치기도 여기 들어가요. 중형 모델을 골라 주세요.
- 어려운 일: 아키텍처 재설계, 장애 복구, 되돌릴 수 없는 중요한 결정. 이런 일은 처음부터 최상위 모델로 시작해 주세요.

모델 수위를 바꿀 때는 이 규칙을 지켜 주세요.
- 위로 올릴 때는 근거를 먼저 설명하고 사용자의 확인을 기다려 주세요. 확인 없이 올리지 마세요.
- 아래로 내릴 때는 미리 동의를 받은 뒤에만 해 주세요.
- 답변 첫머리에 어떤 수위의 모델을 골랐는지, 그 이유를 짧게 밝혀 주세요.

분류가 애매하면 한 단계 낮은 쪽에서 시작해 주세요. 부족하다고 판단되면 근거를 붙여 다음 단계를 제안해 주세요.

답변 스타일은 짧고 실용적으로 유지해 주세요. 결론부터 적고, 자세한 설명은 사용자가 요청할 때만 덧붙여 주세요. 학교에서 바로 쓸 수 있는 예를 들어 주세요. 되물어야 할 게 있으면 한 번에 모아서 물어봐 주세요. 인쇄해서 쓸 자료는 분량을 아껴 주세요. 확실하지 않으면 추측 대신 되물어 주세요. 최종 판단은 항상 사용자가 해요.`,
    steps: [
      "Gemini 왼쪽 사이드바에서 [Gem]을 열어요.",
      "[Gem 만들기]를 눌러요.",
      "이름을 적어요. 예: 모델 선택 도우미",
      "안내(지침) 칸에 위의 설정 글을 그대로 붙여넣어요.",
      "[저장]한 뒤, 대화를 시작할 때 이 Gem을 골라요.",
    ],
    helpUrl: "https://support.google.com/gemini",
    helpLabel: "Gemini 도움말",
  },
];

function isToolId(value: string | null): value is ToolId {
  return TOOL_IDS.some((id) => id === value);
}

export default function SetupPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const toolParam = searchParams.get("tool");
  const active: ToolId = isToolId(toolParam) ? toolParam : "chatgpt";
  const tool = TOOLS.find((item) => item.id === active) ?? TOOLS[0];

  function handleChange(id: string) {
    setSearchParams({ tool: id });
  }

  const charCount = [...tool.prompt].length;

  return (
    <main className="container page">
      <PageHeader
        title="AI 맞춤 설정"
        intro="한 번 넣어 두면 매번 길게 설명하지 않아도 돼요. 일의 난이도에 맞는 모델을 고르게 해서, 쉬운 일은 가볍게·어려운 일만 무겁게 — 토큰과 기다리는 시간을 아껴요. ChatGPT·Claude·Gemini 모두 쓸 수 있어요."
      />

      <section className="section" aria-label="이 설정의 좋은 점">
        <div className="card">
          <span className="tag">좋은 점</span>
          <ul className="setup-benefits">
            <li>⚖️ 어려운 일에만 무거운 모델을 쓰고, 쉬운 일은 가벼운 모델로 처리하게 해요.</li>
            <li>✂️ 답을 기본으로 짧게 받아서, 필요할 때만 자세히 물어봐요.</li>
            <li>🙋 모델을 바꿔야 할 때는 이유를 먼저 말하고 내 확인을 기다려요. 판단은 늘 내가 해요.</li>
          </ul>
        </div>
      </section>

      <Tabs
        tabs={TOOLS.map((item) => ({ id: item.id, label: item.label }))}
        active={active}
        onChange={handleChange}
        ariaLabel="도구별 설정 고르기"
      />

      <section
        className="section setup-panel"
        role="tabpanel"
        id={`panel-${tool.id}`}
        aria-labelledby={`tab-${tool.id}`}
      >
        <div className="setup-panel-head">
          <h2>{tool.name}용 맞춤 설정</h2>
          <span className="setup-char-count">{charCount}자</span>
          <CopyButton text={tool.prompt} label="📋 전체 복사" />
        </div>

        <div className="prompt-block">
          <pre>{tool.prompt}</pre>
        </div>

        <h3 className="setup-steps-title">이렇게 넣어요</h3>
        <ol className="setup-steps">
          {tool.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>

        <p className="footnote">
          ✓ 공식 도움말 기준(2026년 10월 확인) ·{" "}
          <a href={tool.helpUrl} target="_blank" rel="noopener noreferrer">
            {tool.helpLabel} ↗
          </a>
        </p>
      </section>

      <section className="section" aria-label="알아 둘 점">
        <div className="card">
          <h3>알아 둘 점</h3>
          <p>도구가 업데이트되면서 설정 화면의 이름이나 위치가 조금씩 달라질 수 있어요. 가끔 공식 도움말에서 다시 확인해 주세요.</p>
          <p>학교 계정(교육용)에서는 개인 맞춤 설정이 보이지 않거나 관리자가 잠가 둔 경우도 있어요. 그럴 때는 개인 계정에서 시도해 보세요.</p>
        </div>
      </section>
    </main>
  );
}
