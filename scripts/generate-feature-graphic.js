const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const ICON = path.join(__dirname, '..', 'assets', 'icon.png');
const OUT = path.join(__dirname, '..', 'docs', 'marketing', 'feature-graphic.png');

(async () => {
  const iconB64 = fs.readFileSync(ICON).toString('base64');

  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 1024px; height: 500px; overflow: hidden; }
      body {
        font-family: "Yu Gothic UI", "Meiryo", "Noto Sans JP", sans-serif;
        background: linear-gradient(135deg, #3B1481 0%, #1A1A2E 55%, #1A1A2E 100%);
        display: flex;
        align-items: center;
        padding: 0 64px;
        position: relative;
      }
      .icon {
        width: 320px;
        height: 320px;
        border-radius: 64px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        flex-shrink: 0;
      }
      .text {
        margin-left: 56px;
        display: flex;
        flex-direction: column;
        gap: 14px;
      }
      .title {
        font-size: 76px;
        font-weight: 900;
        color: #FFFFFF;
        letter-spacing: -1px;
        line-height: 1;
      }
      .subtitle {
        font-size: 30px;
        font-weight: 700;
        color: #C4CCE8;
      }
      .pills {
        display: flex;
        gap: 14px;
        margin-top: 6px;
      }
      .pill {
        padding: 10px 24px;
        border-radius: 999px;
        font-size: 22px;
        font-weight: 800;
        color: #FFFFFF;
      }
      .tagline {
        margin-top: 8px;
        font-size: 24px;
        font-weight: 600;
        color: #9AA5C9;
      }
    </style>
  </head>
  <body>
    <img class="icon" src="data:image/png;base64,${iconB64}" />
    <div class="text">
      <div class="title">CMA Pass</div>
      <div class="subtitle">証券アナリスト(CMA)1次試験対策</div>
      <div class="pills">
        <div class="pill" style="background:#E94560;">財務分析</div>
        <div class="pill" style="background:#6D28D9;">証券分析</div>
        <div class="pill" style="background:#0369A1;">市場と経済</div>
      </div>
      <div class="tagline">全3科目600問・解説付き・完全無料</div>
    </div>
  </body>
  </html>
  `;

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1024, height: 500 } });
  await page.setContent(html);
  await page.waitForTimeout(300);
  await page.screenshot({ path: OUT });
  console.log('Saved', OUT);
  await browser.close();
})();
