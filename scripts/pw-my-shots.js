// 내 빌드 스크린샷 (원본 비교용)
async (page) => {
  const base = "http://localhost:4173";
  const shots = [];
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({ path: "shots/my-home-desktop.png", fullPage: true });
  shots.push("my-home-desktop");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base + "/", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: "shots/my-home-mobile.png", fullPage: false });
  shots.push("my-home-mobile");
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto(base + "/prompt", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: "shots/my-prompt-elementary.png", fullPage: false });
  shots.push("my-prompt-elementary");
  await page.goto(base + "/aimath", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  await page.screenshot({ path: "shots/my-aimath.png", fullPage: false });
  shots.push("my-aimath");
  return "saved: " + shots.join(", ");
}
