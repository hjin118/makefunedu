import { useState } from "react";

// 체험 u5 — 가설 세우기: 탐구 주제를 고르고 가설 · 자료 수집 · 확인 방법을 3단계로 채워요.

type Topic = {
  id: string;
  emoji: string;
  title: string;
  question: string;
  guide: {
    hypothesis: string;
    collect: string;
    verify: string;
  };
};

const TOPICS: readonly Topic[] = [
  {
    id: "reading",
    emoji: "📚",
    title: "아침 독서와 국어 실력",
    question: "아침 독서 시간이 국어 성적에 영향을 줄까요?",
    guide: {
      hypothesis: "예: 아침 독서 시간이 길수록 국어 성적이 올라간다.",
      collect: "예: 학생 20명의 한 달 독서 시간과 국어 성적을 기록해요.",
      verify: "예: 독서 시간과 성적을 표로 정리하고 함께 오르는지 살펴요.",
    },
  },
  {
    id: "sns",
    emoji: "📱",
    title: "SNS 사용과 수면",
    question: "늦게 SNS를 오래 쓰면 수면 시간이 줄어들까요?",
    guide: {
      hypothesis: "예: 자기 전 SNS 사용 시간이 길수록 수면 시간이 짧아진다.",
      collect: "예: 친구 15명의 일주일간 SNS 사용 시간과 취침·기상 시간을 적어요.",
      verify: "예: 사용 시간이 긴 날과 짧은 날의 수면 시간을 비교해요.",
    },
  },
  {
    id: "lunch",
    emoji: "🍚",
    title: "점심 메뉴와 오후 졸음",
    question: "점심에 밀가루 음식을 먹으면 오후에 더 졸릴까요?",
    guide: {
      hypothesis: "예: 점심에 밀가루 음식을 먹은 날은 오후 졸음이 더 많이 온다.",
      collect: "예: 2주 동안 점심 메뉴와 5교시 때의 졸음 정도를 적어요.",
      verify: "예: 밀가루 날과 아닌 날의 졸음 기록을 나눠 비교해요.",
    },
  },
];

export default function HypothesisSim() {
  const [topicId, setTopicId] = useState<string | null>(null);
  const [hypothesis, setHypothesis] = useState("");
  const [collect, setCollect] = useState("");
  const [verify, setVerify] = useState("");
  const [summaryShown, setSummaryShown] = useState(false);

  const topic = TOPICS.find((t) => t.id === topicId) ?? null;
  const allFilled =
    hypothesis.trim() !== "" && collect.trim() !== "" && verify.trim() !== "";

  function resetAll() {
    setTopicId(null);
    setHypothesis("");
    setCollect("");
    setVerify("");
    setSummaryShown(false);
  }

  return (
    <div className="ai-sim">
      <div className="ai-sim-head">
        <span aria-hidden="true">🗂️</span>
        <h3>가설 설계도</h3>
      </div>
      <p className="ai-sim-desc">
        도하처럼 궁금한 주제를 하나 골라요. 세 단계를 차곡차곡 채우면 탐구 설계가 완성돼요.
      </p>

      <div className="ai-topic-grid" role="group" aria-label="탐구 주제 고르기">
        {TOPICS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`ai-topic${topicId === t.id ? " selected" : ""}`}
            onClick={() => {
              setTopicId(t.id);
              setHypothesis("");
              setCollect("");
              setVerify("");
              setSummaryShown(false);
            }}
          >
            <span aria-hidden="true">{t.emoji}</span>
            <span>{t.title}</span>
            <small>{t.question}</small>
          </button>
        ))}
      </div>

      {topic ? (
        <div>
          <p className="ai-sim-result">
            선택한 주제: {topic.emoji} {topic.title}
          </p>

          <div className="ai-hypo-step">
            <p className="ai-hypo-label">
              <span className="ai-hypo-stepno" aria-hidden="true">
                1
              </span>
              가설을 세워요
            </p>
            <input
              type="text"
              value={hypothesis}
              onChange={(e) => {
                setHypothesis(e.target.value);
                setSummaryShown(false);
              }}
              placeholder={topic.guide.hypothesis}
              aria-label="가설 입력"
            />
            <p className="ai-hypo-hint">
              '~일수록 ~한다'처럼 숫자로 확인할 수 있는 문장이 좋아요. (세림)
            </p>
          </div>

          {hypothesis.trim() !== "" ? (
            <div className="ai-hypo-step">
              <p className="ai-hypo-label">
                <span className="ai-hypo-stepno" aria-hidden="true">
                  2
                </span>
                자료를 어떻게 모을까요?
              </p>
              <input
                type="text"
                value={collect}
                onChange={(e) => {
                  setCollect(e.target.value);
                  setSummaryShown(false);
                }}
                placeholder={topic.guide.collect}
                aria-label="자료 수집 방법 입력"
              />
              <p className="ai-hypo-hint">
                누가 · 무엇을 · 얼마나 모을지 정해요. (하람)
              </p>
            </div>
          ) : null}

          {collect.trim() !== "" ? (
            <div className="ai-hypo-step">
              <p className="ai-hypo-label">
                <span className="ai-hypo-stepno" aria-hidden="true">
                  3
                </span>
                결과를 어떻게 확인할까요?
              </p>
              <input
                type="text"
                value={verify}
                onChange={(e) => {
                  setVerify(e.target.value);
                  setSummaryShown(false);
                }}
                placeholder={topic.guide.verify}
                aria-label="결과 확인 방법 입력"
              />
              <p className="ai-hypo-hint">
                표로 정리하거나 그룹을 나눠 비교해요. (도하)
              </p>
            </div>
          ) : null}

          {verify.trim() !== "" ? (
            <div className="ai-sim-buttons">
              <button
                type="button"
                className="btn btn-primary btn-small"
                onClick={() => {
                  setSummaryShown(true);
                }}
                disabled={summaryShown}
              >
                요약 만들기
              </button>
              <button type="button" className="btn btn-small" onClick={resetAll}>
                처음부터 다시
              </button>
            </div>
          ) : null}

          {summaryShown && allFilled ? (
            <div className="ai-summary">
              <h4>탐구 설계 요약</h4>
              <dl>
                <dt>탐구 주제</dt>
                <dd>
                  {topic.title} — {topic.question}
                </dd>
                <dt>가설</dt>
                <dd>{hypothesis.trim()}</dd>
                <dt>자료 수집 방법</dt>
                <dd>{collect.trim()}</dd>
                <dt>확인 방법</dt>
                <dd>{verify.trim()}</dd>
              </dl>
              <p className="ai-bubble">
                🤖 비티: 훌륭한 설계예요! 결과가 가설과 달라도 괜찮아요. 그것도 발견이에요.
              </p>
            </div>
          ) : null}
        </div>
      ) : (
        <p className="ai-sim-desc">위에서 탐구 주제를 하나 골라 주세요.</p>
      )}
    </div>
  );
}
