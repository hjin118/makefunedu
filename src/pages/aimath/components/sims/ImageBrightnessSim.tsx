import { useState } from "react";

// 체험 u3 — 이미지 밝기: 8×8 그리드를 클릭해 밝기를 채우고, 임계값으로 이진화해요.

const SIZE = 8;
const MAX_BRIGHTNESS = 9;

// 처음에는 가운데가 밝은 다이아몬드 모양이에요.
function initialCells(): number[] {
  const cells: number[] = [];
  for (let r = 0; r < SIZE; r += 1) {
    for (let c = 0; c < SIZE; c += 1) {
      const dist = Math.max(Math.abs(r - 3.5), Math.abs(c - 3.5));
      cells.push(Math.max(0, Math.min(MAX_BRIGHTNESS, 9 - Math.round(dist * 2))));
    }
  }
  return cells;
}

function randomCells(): number[] {
  return Array.from(
    { length: SIZE * SIZE },
    () => Math.floor(Math.random() * (MAX_BRIGHTNESS + 1)),
  );
}

function cellBackground(value: number): string {
  const lightness = (value / MAX_BRIGHTNESS) * 100;
  return `hsl(40 8% ${lightness}%)`;
}

export default function ImageBrightnessSim() {
  const [cells, setCells] = useState<number[]>(initialCells);
  const [threshold, setThreshold] = useState(5);

  const average = cells.reduce((sum, v) => sum + v, 0) / cells.length;
  const blackCount = cells.filter((v) => v < threshold).length;
  const whiteCount = cells.length - blackCount;

  function handleClick(index: number) {
    setCells((prev) =>
      prev.map((v, i) => (i === index ? (v + 1) % (MAX_BRIGHTNESS + 1) : v)),
    );
  }

  return (
    <div className="ai-sim">
      <div className="ai-sim-head">
        <span aria-hidden="true">🖼️</span>
        <h3>하람이의 밝기 실험대</h3>
      </div>
      <p className="ai-sim-desc">
        왼쪽 칸을 클릭하면 밝기가 0→9로 한 칸씩 올라가요. 임계값 슬라이더를 움직이면
        오른쪽에서 검정·흰색 이진화 결과가 바로 바뀌어요.
      </p>

      <div className="ai-sim-controls">
        <div className="ai-slider-row">
          <label htmlFor="img-thr">이진화 임계값</label>
          <input
            id="img-thr"
            type="range"
            min={0}
            max={9}
            step={1}
            value={threshold}
            onChange={(e) => {
              setThreshold(Number(e.target.value));
            }}
          />
          <output htmlFor="img-thr">{threshold}</output>
        </div>
      </div>

      <div className="ai-img-grid-wrap">
        <div className="ai-img-panel">
          <h4>원본 (밝기 0~9)</h4>
          <div className="ai-pixel-grid">
            {cells.map((value, i) => (
              <button
                key={i}
                type="button"
                className="ai-pixel"
                onClick={() => {
                  handleClick(i);
                }}
                aria-label={`${Math.floor(i / SIZE) + 1}행 ${(i % SIZE) + 1}열, 밝기 ${value}. 누르면 밝기가 올라가요`}
                style={{
                  backgroundColor: cellBackground(value),
                  color: value >= 5 ? "#1f2328" : "#ffffff",
                }}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div className="ai-img-panel">
          <h4>이진화 결과 (임계값 {threshold})</h4>
          <div className="ai-pixel-grid">
            {cells.map((value, i) => (
              <div
                key={i}
                className="ai-pixel-bin"
                style={{ backgroundColor: value >= threshold ? "#ffffff" : "#1f2328" }}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="ai-img-stats">
        <span className="badge">평균 밝기 {average.toFixed(1)}</span>
        <span className="badge">검정 {blackCount}칸</span>
        <span className="badge">흰색 {whiteCount}칸</span>
      </div>
      <div className="ai-sim-buttons">
        <button
          type="button"
          className="btn btn-small"
          onClick={() => {
            setCells(Array.from({ length: SIZE * SIZE }, () => 0));
          }}
        >
          모두 검정(0)으로
        </button>
        <button
          type="button"
          className="btn btn-small"
          onClick={() => {
            setCells(Array.from({ length: SIZE * SIZE }, () => MAX_BRIGHTNESS));
          }}
        >
          모두 흰색(9)으로
        </button>
        <button
          type="button"
          className="btn btn-small"
          onClick={() => {
            setCells(randomCells());
          }}
        >
          무작위로 채우기
        </button>
      </div>
      <p className="footnote ai-sim-foot">
        컴퓨터에게 이미지는 이렇게 숫자의 배열이에요. 임계값을 바꾸면 같은 그림이 다르게
        보이죠?
      </p>
    </div>
  );
}
