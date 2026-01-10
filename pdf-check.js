const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');

const pdfs = ['Resume Felipe Belo.pdf', 'Curriculo Felipe Belo.pdf'];

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
  for (const file of pdfs) {
    const filePath = path.join(__dirname, file);
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing PDF: ${file}`);
    }
    const download = { path: async () => filePath };
    await checkPdf(download);
    console.log(`OK: ${file}`);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
