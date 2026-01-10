const path = require('path');
const { chromium } = require('playwright');

const targets = [
  { html: 'en-light.html', pdf: 'Resume Felipe Belo.pdf' },
  { html: 'pt-light.html', pdf: 'Curriculo Felipe Belo.pdf' }
];

async function generate({ html, pdf }, browser) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 2200 } });
  const url = 'file://' + path.join(__dirname, html);

  await page.goto(url);

  await page.addStyleTag({
    content: `
      nav.navbar { display: none !important; }
      .no-print { display: none !important; }
      body { padding-top: 0 !important; background: #ffffff !important; color: #000000 !important; }
      #cv { max-width: 186mm !important; margin: 0 auto !important; }
      .card, .card:hover {
        box-shadow: none !important;
        transform: none !important;
        background-color: #ffffff !important;
        color: #000000 !important;
        border-color: #e9ecef !important;
      }
    `
  });

  await page.waitForSelector('#cv');
  await page.evaluate(() => window.scrollTo(0, 0));

  const pdfPath = path.join(__dirname, pdf);
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '10mm', right: '12mm', bottom: '10mm', left: '12mm' },
    preferCSSPageSize: true
  });

  await page.close();
  console.log(`Generated ${pdf}`);
}

async function run() {
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  for (const target of targets) {
    await generate(target, browser);
  }
  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
