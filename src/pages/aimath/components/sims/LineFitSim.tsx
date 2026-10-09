import { useState } from "react";

// 체험 u4 — 직선 맞추기: 고정 8개 점에 y = ax + b 를 맞추고 오차(잔차 제곱 합)를 줄여요.

type Point = { x: number; y: number };

const POINTS: readonly Point[] = [
  { x: 0, y: 1.2 },
  { x: 1, y: 1.6 },
  { x: 2, y: 2.1 },
  { x: 3, y: 2.4 },
  { x: 4, y: 3.2 },
  { x: 5, y: 3.4 },
  { x: 6, y: 4.1 },
  { x: 7, y: 4.2 },
];

function computeBestFit(points: readonly Point[]): { a: number; b: number } {
  const n = points.length;
  const meanX = points.reduce((s, p) => s + p.x, 0) / n;
  const meanY = points.reduce((s, p) => s + p.y, 0) / n;
  let numerator = 0;
  let denominator = 0;
  for (const p of points) {
    numerator += (p.x - meanX) * (p.y - meanY);
    denominator += (p.x - meanX) ** 2;
  }
  const a = numerator / denominator;
  const b = meanY - a * meanX;
  return { a, b };
}

const BEST = computeBestFit(POINTS);

function squaredError(a: number, b: number): number {
  return POINTS.reduce((sum, p) => sum + (p.y - (a * p.x + b)) ** 2, 0);
}

// SVG 좌표 변환 (x: 0~8, y: 0~6)
const PX = { left: 38, right: 12, top: 14, bottom: 30, width: 360, height: 240 };

function toPx(x: number, y: number): { px: number; py: number } {
  const innerW = PX.width - PX.left - PX.right;
  const innerH = PX.height - PX.top - PX.bottom;
  return {
    px: PX.left + (x / 8) * innerW,
    py: PX.height - PX.bottom - (y / 6) * innerH,
  };
}

export default function LineFitSim() {
  const [a, setA] = useState(0);
  const [b, setB] = useState(2);

  const sse = squaredError(a, b);
  const bestSse = squaredError(BEST.a, BEST.b);
  const nearOptimal =
    Math.abs(a - BEST.a) <= 0.06 && Math.abs(b - BEST.b) <= 0.06;

  const p1 = toPx(0, a * 0 + b);
  const p2 = toPx(8, a * 8 + b);
  const xTicks = [0, 2, 4, 6, 8];
  const yTicks = [0, 2, 4, 6];

  return (
    <div className="ai-sim">
      <div className="ai-sim-head">
        <span aria-hidden="true">📉</span>
        <h3>하람이의 직선 맞추기</h3>
      </div>
      <p className="ai-sim-desc">
        매점 영수증으로 온도(x)와 아이스크림 판매량(y) 여덟 점을 찍었어요. 기울기 a와 절편
        b를 움직여 가장 잘 맞는 직선을 찾아요. 오차는 잔차의 제곱 합이에요.
      </p>

      <svg
        className="ai-line-svg"
        viewBox={`0 0 ${PX.width} ${PX.height}`}
        role="img"
        aria-label="여덟 개의 점과 직선 y equals ax plus b 그래프"
      >
        <defs>
          <clipPath id="ai-line-clip">
            <rect
              x={PX.left}
              y={PX.top}
              width={PX.width - PX.left - PX.right}
              height={PX.height - PX.top - PX.bottom}
            />
          </clipPath>
        </defs>

        {/* 격자 */}
        {xTicks.map((t) => {
          const { px } = toPx(t, 0);
          return (
            <line
              key={`gx-${t}`}
              x1={px}
              y1={PX.top}
              x2={px}
              y2={PX.height - PX.bottom}
              stroke="#e3e1da"
              strokeWidth={1}
            />
          );
        })}
        {yTicks.map((t) => {
          const { py } = toPx(0, t);
          return (
            <line
              key={`gy-${t}`}
              x1={PX.left}
              y1={py}
              x2={PX.width - PX.right}
              y2={py}
              stroke="#e3e1da"
              strokeWidth={1}
            />
          );
        })}

        {/* 잔차 (점에서 직선까지의 세로 점선) */}
        {POINTS.map((p) => {
          const from = toPx(p.x, p.y);
          const to = toPx(p.x, a * p.x + b);
          return (
            <line
              key={`r-${p.x}`}
              x1={from.px}
              y1={from.py}
              x2={to.px}
              y2={to.py}
              stroke="#57606a"
              strokeOpacity={0.55}
              strokeWidth={1}
              strokeDasharray="3 3"
              clipPath="url(#ai-line-clip)"
            />
          );
        })}

        {/* 직선 y = ax + b */}
        <line
          x1={p1.px}
          y1={p1.py}
          x2={p2.px}
          y2={p2.py}
          stroke="#3b5bdb"
          strokeWidth={2.5}
          clipPath="url(#ai-line-clip)"
        />

        {/* 데이터 점 */}
        {POINTS.map((p) => {
          const { px, py } = toPx(p.x, p.y);
          return <circle key={`p-${p.x}`} cx={px} cy={py} r={5} fill="#3b5bdb" />;
        })}

        {/* 축 눈금 */}
        {xTicks.map((t) => {
          const { px } = toPx(t, 0);
          return (
            <text
              key={`tx-${t}`}
              x={px}
              y={PX.height - PX.bottom + 16}
              textAnchor="middle"
              fontSize={10}
              fill="#57606a"
            >
              {t}
            </text>
          );
        })}
        {yTicks.map((t) => {
          const { py } = toPx(0, t);
          return (
            <text
              key={`ty-${t}`}
              x={PX.left - 8}
              y={py + 3}
              textAnchor="end"
              fontSize={10}
              fill="#57606a"
            >
              {t}
            </text>
          );
        })}
      </svg>

      <div className="ai-sim-controls">
        <div className="ai-slider-row">
          <label htmlFor="line-a">기울기 a</label>
          <input
            id="line-a"
            type="range"
            min={-0.5}
            max={1}
            step={0.05}
            value={a}
            onChange={(e) => {
              setA(Number(e.target.value));
            }}
          />
          <output htmlFor="line-a">{a.toFixed(2)}</output>
        </div>
        <div className="ai-slider-row">
          <label htmlFor="line-b">절편 b</label>
          <input
            id="line-b"
            type="range"
            min={-1}
            max={3}
            step={0.05}
            value={b}
            onChange={(e) => {
              setB(Number(e.target.value));
            }}
          />
          <output htmlFor="line-b">{b.toFixed(2)}</output>
        </div>
      </div>

      <p className="ai-err">
        오차(잔차 제곱 합): <b>{sse.toFixed(2)}</b>
      </p>

      {nearOptimal ? (
        <p className="ai-sim-praise">
          거의 최적이에요! 이 직선이 바로 최소제곱 직선 근처예요. 최소 오차는{" "}
          {bestSse.toFixed(2)}이고, 세림이가 계산한 정답은 a ≈ {BEST.a.toFixed(2)}, b ≈{" "}
          {BEST.b.toFixed(2)}예요.
        </p>
      ) : (
        <p className="ai-sim-hint">
          점선이 짧아질수록 직선이 점을 잘 따라가는 거예요. a와 b를 조금씩 움직여 오차를
          줄여 보세요.
        </p>
      )}

      <p className="footnote ai-sim-foot">
        경사하강법은 이 오차의 골짜기를 한 걸음씩 내려가 최솟값을 찾는 방법이에요.
      </p>
    </div>
  );
}
