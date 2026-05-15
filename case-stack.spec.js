const { test, chromium } = require("@playwright/test");

test("case studies cards occupy the same frame", async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  await page.waitForSelector("#case-studies");

  const sectionMetrics = await page.evaluate(() => {
    const stage = document.querySelector("#case-studies > div");
    const rect = stage.getBoundingClientRect();
    return { top: rect.top + window.scrollY, height: rect.height, viewport: window.innerHeight };
  });

  const scrollable = sectionMetrics.height - sectionMetrics.viewport;
  const checkpoints = [0.05, 0.38, 0.72, 0.92];
  const results = [];

  for (const progress of checkpoints) {
    await page.evaluate((y) => window.scrollTo(0, y), sectionMetrics.top + scrollable * progress);
    await page.waitForTimeout(700);
    const state = await page.evaluate(() => {
      const frame = document.querySelector("[data-case-study-card]")?.parentElement;
      const frameRect = frame.getBoundingClientRect();
      const cards = Array.from(document.querySelectorAll("[data-case-study-card]")).map((card) => {
        const rect = card.getBoundingClientRect();
        const style = getComputedStyle(card);
        return {
          index: Number(card.getAttribute("data-case-study-card")),
          active: card.getAttribute("data-active") === "true",
          opacity: Number(style.opacity),
          top: Math.round(rect.top),
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };
      });
      return {
        frame: {
          top: Math.round(frameRect.top),
          left: Math.round(frameRect.left),
          width: Math.round(frameRect.width),
          height: Math.round(frameRect.height),
        },
        cards,
      };
    });
    results.push({ progress, state });
  }

  console.log(JSON.stringify(results, null, 2));
  await browser.close();
});
