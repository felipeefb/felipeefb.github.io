const path = require('path');
const fs = require('fs');
const { chromium } = require('playwright');
const { PDFDocument } = require('pdf-lib');

const pages = ['en-light.html', 'en-dark.html', 'pt-light.html', 'pt-dark.html'];

async function checkPdf(download) {
  const filePath = await download.path();
  const buffer = fs.readFileSync(filePath);

  if (buffer.slice(0, 4).toString() !== '%PDF') {
    throw new Error('Downloaded file is not a PDF');
  }

  if (buffer.length >= 1_000_000) {
    throw new Error(`PDF too large (${(buffer.length / 1024).toFixed(1)} KB)`);
  }
  if (buffer.length < 80000) {
    throw new Error(`PDF too small (${(buffer.length / 1024).toFixed(1)} KB)`);
  }

  const pdfDoc = await PDFDocument.load(buffer);
  const pdfPages = pdfDoc.getPages();
  if (pdfPages.length < 1) {
    throw new Error(`PDF has too few pages (${pdfPages.length})`);
  }
}

async function run() {
  const browser = await chromium.launch({ headless: true });

  for (const file of pages) {
    const context = await browser.newContext({ acceptDownloads: true });
    const page = await context.newPage();
    await page.setViewportSize({ width: 1280, height: 1600 });

    const url = 'file://' + path.join(__dirname, file);
    await page.goto(url);

    const downloadPromise = page.waitForEvent('download');
    await page.click('#dowload-pdf-button');
    const download = await downloadPromise;

    await checkPdf(download);
    await page.close();
    await context.close();
    console.log(`OK: ${file}`);
  }

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
