import { useMemo, useState } from "react";

// 체험 u2 — 문장 분석: 공백 · 조사 기반 간이 토큰화 후 단어 빈도 상위 5개를 막대로 보여요.

// 조사 후보 (긴 것부터 찾아 떼어 내요)
const PARTICLES: readonly string[] = [
  "에서는",
  "에게는",
  "으로는",
  "에는",
  "에게",
  "에서",
  "으로",
  "부터",
  "까지",
  "이랑",
  "이는",
  "이가",
  "하고",
  "라고",
  "보다",
  "처럼",
  "마다",
  "은",
  "는",
  "이",
  "가",
  "을",
  "를",
  "의",
  "에",
  "와",
  "과",
  "도",
  "만",
  "로",
  "야",
  "여",
  "랑",
];

function normalizeToken(raw: string): string {
  const cleaned = raw.replace(/[.,!?…"'“”‘’()[\]{}:;·~]/g, "");
  if (cleaned === "") {
    return "";
  }
  const particle = PARTICLES.find(
    (p) => cleaned.length > p.length && cleaned.endsWith(p),
  );
  return particle ? cleaned.slice(0, cleaned.length - particle.length) : cleaned;
}

function tokenize(text: string): string[] {
  return text
    .split(/\s+/)
    .map(normalizeToken)
    .filter((t) => t.length > 0);
}

type WordCount = { word: string; count: number };

function topWords(tokens: readonly string[], limit: number): WordCount[] {
  const counts = new Map<string, number>();
  for (const token of tokens) {
    counts.set(token, (counts.get(token) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([word, count]) => ({ word, count }))
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word, "ko"))
    .slice(0, limit);
}

const DEFAULT_TEXT =
  "비티는 오늘도 쪽지를 읽어요. 도하는 비티에게 쪽지를 건넸어요. 쪽지에는 친구들의 이야기가 가득해요. 하람은 쪽지를 모아서 단어를 세었어요. 세림은 자주 나오는 단어를 표시했어요.";

export default function TokenizerSim() {
  const [text, setText] = useState(DEFAULT_TEXT);

  const tokens = useMemo(() => tokenize(text), [text]);
  const top = useMemo(() => topWords(tokens, 5), [tokens]);
  const maxCount = top.length > 0 ? top[0].count : 0;

  return (
    <div className="ai-sim">
      <div className="ai-sim-head">
        <span aria-hidden="true">✉️</span>
        <h3>하람이의 메시지 분석기</h3>
      </div>
      <p className="ai-sim-desc">
        문장을 넣어 보세요. 공백으로 자르고 조사를 떼어 간이 토큰화를 한 뒤, 가장 자주
        나온 단어 5개를 막대로 보여요.
      </p>

      <label className="tag" htmlFor="tok-text">
        분석할 문장
      </label>
      <textarea
        id="tok-text"
        rows={4}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="예: 세림은 책을 읽어요. 도하는 쪽지를 썼어요."
      />

      <p className="ai-sim-result">
        모두 <b>{tokens.length}개</b>의 토큰으로 쪼개졌어요.
      </p>

      <div className="ai-token-chips" aria-label="토큰 결과">
        {tokens.slice(0, 30).map((token, i) => (
          <span className="ai-token" key={`${token}-${i}`}>
            {token}
          </span>
        ))}
      </div>

      <h4>단어 빈도 상위 5개</h4>
      {top.length === 0 ? (
        <p className="ai-sim-desc">넣은 문장이 아직 없어요.</p>
      ) : (
        <div className="ai-bar-list">
          {top.map(({ word, count }) => (
            <div className="ai-bar-row" key={word}>
              <span className="ai-bar-word">{word}</span>
              <span className="ai-bar-track">
                <span
                  className="ai-bar"
                  style={{
                    width: maxCount > 0 ? `${(count / maxCount) * 100}%` : "0%",
                  }}
                />
              </span>
              <span className="ai-bar-count">{count}</span>
            </div>
          ))}
        </div>
      )}

      <p className="footnote ai-sim-foot">
        간이 토큰화라서 실제 형태소 분석과는 다를 수 있어요. '가을'처럼 끝글자가 조사처럼
        보이는 말은 잘려 나가기도 해요.
      </p>
    </div>
  );
}
