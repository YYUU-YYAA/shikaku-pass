const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const SRC = 'C:/Users/regza/OneDrive/Desktop/アイコン_紫.png';
const ASSETS = path.join(__dirname, '..', 'assets');

const YELLOW = [254, 208, 3];
const WHITE = [252, 252, 252];

function dist(a, b) {
  return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2 + (a[2]-b[2])**2);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const b64 = fs.readFileSync(SRC).toString('base64');

  await page.setContent(`<img id="src" src="data:image/png;base64,${b64}">`);
  await page.waitForFunction(() => document.getElementById('src').complete);

  const result = await page.evaluate(({ YELLOW, WHITE }) => {
    const img = document.getElementById('src');
    const SIZE = 1024;
    const SCALE = 0.75;
    const inset = (SIZE * (1 - SCALE)) / 2;
    const innerSize = SIZE * SCALE;

    function newCanvas() {
      const c = document.createElement('canvas');
      c.width = SIZE; c.height = SIZE;
      return c;
    }

    // 1. icon.png - full bleed resize
    const iconCanvas = newCanvas();
    iconCanvas.getContext('2d').drawImage(img, 0, 0, SIZE, SIZE);

    // 2. android-icon-background.png - solid yellow
    const bgCanvas = newCanvas();
    const bgCtx = bgCanvas.getContext('2d');
    bgCtx.fillStyle = `rgb(${YELLOW[0]}, ${YELLOW[1]}, ${YELLOW[2]})`;
    bgCtx.fillRect(0, 0, SIZE, SIZE);

    // 3. android-icon-foreground.png - scaled + centered, transparent padding
    const fgCanvas = newCanvas();
    fgCanvas.getContext('2d').drawImage(img, inset, inset, innerSize, innerSize);

    // 4. android-icon-monochrome.png - white silhouette on transparent
    const monoCanvas = newCanvas();
    const monoCtx = monoCanvas.getContext('2d');
    monoCtx.drawImage(img, inset, inset, innerSize, innerSize);
    const imgData = monoCtx.getImageData(0, 0, SIZE, SIZE);
    const d = imgData.data;
    const THRESH = 45;
    for (let i = 0; i < d.length; i += 4) {
      const px = [d[i], d[i+1], d[i+2]];
      const distY = Math.sqrt((px[0]-YELLOW[0])**2 + (px[1]-YELLOW[1])**2 + (px[2]-YELLOW[2])**2);
      const distW = Math.sqrt((px[0]-WHITE[0])**2 + (px[1]-WHITE[1])**2 + (px[2]-WHITE[2])**2);
      if (Math.min(distY, distW) < THRESH || d[i+3] < 10) {
        d[i+3] = 0;
      } else {
        d[i] = 255; d[i+1] = 255; d[i+2] = 255; d[i+3] = 255;
      }
    }
    monoCtx.putImageData(imgData, 0, 0);

    // 5. favicon.png - small resize
    const favCanvas = document.createElement('canvas');
    favCanvas.width = 196; favCanvas.height = 196;
    favCanvas.getContext('2d').drawImage(img, 0, 0, 196, 196);

    return {
      icon: iconCanvas.toDataURL('image/png'),
      background: bgCanvas.toDataURL('image/png'),
      foreground: fgCanvas.toDataURL('image/png'),
      monochrome: monoCanvas.toDataURL('image/png'),
      favicon: favCanvas.toDataURL('image/png'),
    };
  }, { YELLOW, WHITE });

  const writeDataUrl = (dataUrl, filename) => {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    fs.writeFileSync(path.join(ASSETS, filename), Buffer.from(base64Data, 'base64'));
    console.log('Wrote', filename);
  };

  writeDataUrl(result.icon, 'icon.png');
  writeDataUrl(result.background, 'android-icon-background.png');
  writeDataUrl(result.foreground, 'android-icon-foreground.png');
  writeDataUrl(result.monochrome, 'android-icon-monochrome.png');
  writeDataUrl(result.favicon, 'favicon.png');

  await browser.close();
})();
