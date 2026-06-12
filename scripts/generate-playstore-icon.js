const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'assets', 'icon.png');
const OUT = path.join(__dirname, '..', 'docs', 'marketing', 'play-store-icon-512.png');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const b64 = fs.readFileSync(SRC).toString('base64');

  await page.setContent(`<img id="src" src="data:image/png;base64,${b64}">`);
  await page.waitForFunction(() => document.getElementById('src').complete);

  const dataUrl = await page.evaluate(() => {
    const img = document.getElementById('src');
    const c = document.createElement('canvas');
    c.width = 512; c.height = 512;
    c.getContext('2d').drawImage(img, 0, 0, 512, 512);
    return c.toDataURL('image/png');
  });

  const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync(OUT, Buffer.from(base64Data, 'base64'));
  console.log('Wrote', OUT);

  await browser.close();
})();
