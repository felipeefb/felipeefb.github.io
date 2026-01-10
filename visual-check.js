const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');
const pixelmatch = require('pixelmatch');
const { PNG } = require('pngjs');

const pages = ['en-light.html', 'en-dark.html', 'pt-light.html', 'pt-dark.html'];
const baselineDir = path.join(__dirname, 'visual-baseline');
const outputDir = path.join(__dirname, 'visual-output');

fs.mkdirSync(baselineDir, { recursive: true });
fs.mkdirSync(outputDir, { recursive: true });

async function captureScreenshot(page, selector, filePath) {
  const handle = await page.$(selector);
  if (!handle) {
    throw new Error(`Selector not found: ${selector}`);
  }
  await handle.screenshot({ path: filePath, type: 'png' });
  return fs.readFileSync(filePath);
}

function compareOrStoreBaseline(name, currentBuffer) {
  const baselinePath = path.join(baselineDir, `${name}.png`);
  const outputPath = path.join(outputDir, `${name}.png`);
  const diffPath = path.join(outputDir, `${name}-diff.png`);

  fs.writeFileSync(outputPath, currentBuffer);

  if (!fs.existsSync(baselinePath)) {
    fs.writeFileSync(baselinePath, currentBuffer);
    console.log(`Baseline created for ${name} (store this if acceptable).`);
    return;
  }

  const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
  const current = PNG.sync.read(currentBuffer);

  if (baseline.width !== current.width || baseline.height !== current.height) {
    throw new Error(`Size mismatch for ${name}: baseline ${baseline.width}x${baseline.height}, current ${current.width}x${current.height}`);
  }

  const diff = new PNG({ width: baseline.width, height: baseline.height });
  const mismatched = pixelmatch(
    baseline.data,
    current.data,
    diff.data,
    baseline.width,
    baseline.height,
    { threshold: 0.1 }
  );

  const totalPixels = baseline.width * baseline.height;
  const mismatchRatio = mismatched / totalPixels;
  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  if (mismatchRatio > 0.01) {
    throw new Error(`Visual diff too high for ${name}: ${(mismatchRatio * 100).toFixed(2)}% (see ${diffPath})`);
  }
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  for (const file of pages) {
    const context = await browser.newContext({ viewport: { width: 1280, height: 2200 } });
    const page = await context.newPage();
    const url = 'file://' + path.join(__dirname, file);

    await page.goto(url);
    await page.waitForSelector('#cv');
    await page.evaluate(() => window.scrollTo(0, 0));

    const name = file.replace('.html', '');
    const buffer = await captureScreenshot(page, '#cv', path.join(outputDir, `${name}.png`));
    compareOrStoreBaseline(name, buffer);

    await page.close();
    await context.close();
    console.log(`Visual OK: ${file}`);
  }

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
