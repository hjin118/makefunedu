// 원본 PENEDU 사이트 스크린샷 수집 (데스크톱 + 모바일)
async (page) => {
  const base = process.env.SITE_URL || process.env.VITE_SITE_URL;
  if (!base) throw new Error("VITE_SITE_URL 환경변수에 기준 사이트 주소를 지정하세요.");
  const shots = [];
  // 데스크톱
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(800);
  await page.screenshot({ path: "shots/ref-home-desktop.png", fullPage: true });
  shots.push("ref-home-desktop");
  // 서브페이지 2개
  await page.goto(base + "/setup", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: "shots/ref-setup.png", fullPage: false });
  shots.push("ref-setup");
  await page.goto(base + "/aimath", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: "shots/ref-aimath.png", fullPage: false });
  shots.push("ref-aimath");
  // 모바일
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: "shots/ref-home-mobile.png", fullPage: false });
  shots.push("ref-home-mobile");
  return "saved: " + shots.join(", ");
}
