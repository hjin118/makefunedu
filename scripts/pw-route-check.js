// PENEDU 라우트 일괄 렌더링 검증 (playwright browser_run_code_unsafe용)
async (page) => {
  const base = "http://localhost:4173";
  const routes = [
    ["/", "살빠진 임선생과 함께하는 교육자료"],
    ["/setup", "AI 맞춤 설정"],
    ["/prompt", "다시 묻는 AI 교실"],
    ["/slides", "노트북LM 슬라이드 프롬프트"],
    ["/handgen", "학습 사이트 만들기 레퍼런스"],
    ["/gamegen", "바이브코딩 게임 만들기"],
    ["/aimath", "인공지능 수학"],
    ["/aimath/u1", "인공지능과 빅데이터"],
    ["/aimath/u3", "이미지 데이터 처리"],
    ["/aimath/glossary", "용어 사전"],
    ["/aimath/notebook", "오답노트"],
  ];
  const results = [];
  const errors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push("console: " + msg.text().slice(0, 150));
  });
  page.on("pageerror", (err) => {
    errors.push("pageerror: " + String(err).slice(0, 150));
  });
  for (const [route, expected] of routes) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(250);
    let h1 = null;
    try {
      h1 = await page.locator("h1").first().textContent();
    } catch (e) {
      h1 = null;
    }
    h1 = (h1 || "(none)").trim();
    const ok = h1.indexOf(expected) !== -1;
    results.push((ok ? "OK   " : "FAIL ") + route + " | h1=" + h1.slice(0, 44) + (ok ? "" : " | expected=" + expected));
  }
  const summary = results.join(" || ") + " ||| ERRORS: " + (errors.length ? errors.join(" / ") : "none");
  return summary;
}
