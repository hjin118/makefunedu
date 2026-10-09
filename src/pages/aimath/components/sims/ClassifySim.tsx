import { useState } from "react";

// 체험 u1 — 데이터 분류: 무게·빨강 기준 슬라이더로 과일 12개를 두 그룹으로 나눠요.

type Fruit = {
  name: string;
  emoji: string;
  weight: number; // g
  redness: number; // 0~9
};

const FRUITS: readonly Fruit[] = [
  { name: "사과", emoji: "🍎", weight: 300, redness: 8 },
  { name: "오렌지", emoji: "🍊", weight: 150, redness: 5 },
  { name: "복숭아", emoji: "🍑", weight: 200, redness: 6 },
  { name: "딸기", emoji: "🍓", weight: 20, redness: 9 },
  { name: "체리", emoji: "🍒", weight: 10, redness: 9 },
  { name: "수박", emoji: "🍉", weight: 4000, redness: 1 },
  { name: "포도", emoji: "🍇", weight: 8, redness: 2 },
  { name: "바나나", emoji: "🍌", weight: 120, redness: 0 },
  { name: "레몬", emoji: "🍋", weight: 100, redness: 1 },
  { name: "키위", emoji: "🥝", weight: 80, redness: 2 },
  { name: "배", emoji: "🍐", weight: 250, redness: 2 },
  { name: "파인애플", emoji: "🍍", weight: 900, redness: 0 },
];

// 세림이가 정한 비밀 기준 (무겁고 빨간 과일을 그룹 A로 나눠요)
const SECRET = { weight: 150, redness: 5 };

export default function ClassifySim() {
  const [weightThr, setWeightThr] = useState(500);
  const [redThr, setRedThr] = useState(3);

  function predictIsA(fruit: Fruit): boolean {
    return fruit.weight >= weightThr && fruit.redness >= redThr;
  }

  function targetIsA(fruit: Fruit): boolean {
    return fruit.weight >= SECRET.weight && fruit.redness >= SECRET.redness;
  }

  const hits = FRUITS.filter((f) => predictIsA(f) === targetIsA(f)).length;
  const perfect = hits === FRUITS.length;

  return (
    <div className="ai-sim">
      <div className="ai-sim-head">
        <span aria-hidden="true">🧺</span>
        <h3>하람이의 데이터 분류기</h3>
      </div>
      <p className="ai-sim-desc">
        슬라이더로 나누는 기준을 정해요. 무게가 기준 이상이고 빨간 정도가 기준 이상이면
        그룹 A, 아니면 그룹 B예요. 세림이가 숨겨 둔 비밀 기준과 같아지면 12개 전부가
        맞아요.
      </p>

      <div className="ai-sim-controls">
        <div className="ai-slider-row">
          <label htmlFor="cls-weight">무게 기준</label>
          <input
            id="cls-weight"
            type="range"
            min={0}
            max={1000}
            step={10}
            value={weightThr}
            onChange={(e) => {
              setWeightThr(Number(e.target.value));
            }}
          />
          <output htmlFor="cls-weight">{weightThr}g</output>
        </div>
        <div className="ai-slider-row">
          <label htmlFor="cls-red">빨강 기준</label>
          <input
            id="cls-red"
            type="range"
            min={0}
            max={9}
            step={1}
            value={redThr}
            onChange={(e) => {
              setRedThr(Number(e.target.value));
            }}
          />
          <output htmlFor="cls-red">{redThr}/9</output>
        </div>
      </div>

      <div className="ai-fruit-grid">
        {FRUITS.map((fruit) => {
          const predictedA = predictIsA(fruit);
          const ok = predictedA === targetIsA(fruit);
          const lightness = 88 - fruit.redness * 8;
          return (
            <div
              key={fruit.name}
              className={`ai-fruit ${ok ? "hit" : "miss"}`}
            >
              <span className="ai-fruit-emoji" aria-hidden="true">
                {fruit.emoji}
              </span>
              <strong>{fruit.name}</strong>
              <span className="ai-fruit-meta">{fruit.weight}g</span>
              <span className="ai-fruit-meta">
                <span
                  className="ai-red-dot"
                  style={{ backgroundColor: `hsl(0 62% ${lightness}%)` }}
                  aria-hidden="true"
                />
                빨강 {fruit.redness}/9
              </span>
              <span className={`ai-group-chip ${predictedA ? "a" : "b"}`}>
                그룹 {predictedA ? "A" : "B"}
              </span>
              <span className={`ai-fruit-mark ${ok ? "ok" : "no"}`}>
                {ok ? "✓ 맞았어요" : "✗ 달라요"}
              </span>
            </div>
          );
        })}
      </div>

      <p className="ai-sim-result">
        12개 중 <b>{hits}개</b> 맞았어요. (정확도 {Math.round((hits / FRUITS.length) * 100)}%)
      </p>
      {perfect ? (
        <p className="ai-sim-praise">
          기준을 정확히 찾았어요! 비밀 기준은 '무게 150g 이상 + 빨강 5 이상'이었어요.
          비티가 이제 과일을 스스로 나눌 수 있어요.
        </p>
      ) : null}
      <p className="footnote ai-sim-foot">
        인공지능도 이렇게 데이터에서 기준을 찾아 배워요. 찾은 기준이 얼마나 정확한지는
        정확도로 확인해요.
      </p>
    </div>
  );
}
