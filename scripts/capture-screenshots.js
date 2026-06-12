const { chromium, devices } = require('playwright');
const path = require('path');

const OUT_DIR = path.join(__dirname, '..', 'docs', 'marketing', 'screenshots');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...devices['Pixel 7'],
  });
  const page = await context.newPage();

  page.on('pageerror', err => console.log('[pageerror]', err.message));

  // 1. ホーム画面
  await page.goto('http://localhost:8081/', { waitUntil: 'load', timeout: 120000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: path.join(OUT_DIR, '1-home.png') });
  console.log('Saved 1-home.png');

  // 2. 演習画面 (財務分析・全カテゴリ ランダム10問演習)
  await page.goto('http://localhost:8081/quiz?subject=financial_analysis', { waitUntil: 'load', timeout: 120000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT_DIR, '2-quiz.png') });
  console.log('Saved 2-quiz.png');

  // 3. 進捗画面
  await page.goto('http://localhost:8081/progress', { waitUntil: 'load', timeout: 120000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT_DIR, '3-progress.png') });
  console.log('Saved 3-progress.png');

  // 4. 模擬試験画面
  await page.goto('http://localhost:8081/mock-exam', { waitUntil: 'load', timeout: 120000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT_DIR, '4-mock-exam.png') });
  console.log('Saved 4-mock-exam.png');

  // 5. 用語集画面
  await page.goto('http://localhost:8081/glossary', { waitUntil: 'load', timeout: 120000 });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: path.join(OUT_DIR, '5-glossary.png') });
  console.log('Saved 5-glossary.png');

  await browser.close();
})();
