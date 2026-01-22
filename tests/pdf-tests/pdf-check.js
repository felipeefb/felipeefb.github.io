/**
 * PDF integrity and language assertions for the tracked resume PDFs.
 * Validates headers, size, A4 dimensions, and language-specific content.
 * @author Felipe Belo (https://github.com/felipeefb)
 */
const path = require('path');
const fs = require('fs');
const { PDFDocument } = require('pdf-lib');
const pdfParse = require('pdf-parse');

const rootDir = path.resolve(__dirname, '..', '..');
const pdfDir = path.join(rootDir, 'pdf');
const SIZE_LIMITS = { min: 80_000, max: 1_000_000 }; // bytes
const A4 = { width: 595, height: 842 };
const PAGE_TOLERANCE = 2;

const pdfs = [
  {
    file: 'Resume Felipe Belo.pdf',
    lang: 'English',
    required: [
      'Senior Software Engineer',
      'Professional Experience',
      'Education',
      'Skills',
      'Contact'
    ],
    forbidden: ['Experiência Profissional', 'Currículo', 'Portuguese']
  },
  {
    file: 'Curriculo Felipe Belo.pdf',
    lang: 'Portuguese',
    required: [
      'Engenheiro de Software',
      'Experiência Profissional',
      'Formação Acadêmica',
      'Habilidades',
      'Contato'
    ],
    forbidden: ['Professional Experience', 'Education', 'Skills', 'Contact']
  }
];

/**
 * Check whether a value is within a tolerance range.
 * @param {number} value - Observed value.
 * @param {number} target - Expected target.
 * @param {number} tolerance - Allowed difference.
 * @returns {boolean}
 * @author Felipe Belo (https://github.com/felipeefb)
 */
function withinTolerance(value, target, tolerance) {
  return Math.abs(value - target) <= tolerance;
}

/**
 * Validate structure, size, page dimensions, and expected text for a PDF.
 * @param {{ file: string, lang: string, required: string[], forbidden: string[] }} param0 - Target PDF metadata and assertions.
 * @returns {Promise<void>}
 * @author Felipe Belo (https://github.com/felipeefb)
 */
async function checkPdf({ file, lang, required, forbidden }) {
  const filePath = path.join(pdfDir, file);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Missing PDF: ${filePath}`);
  }

  const buffer = fs.readFileSync(filePath);
  if (buffer.slice(0, 4).toString() !== '%PDF') {
    throw new Error(`${file} is not a valid PDF header`);
  }

  if (buffer.length >= SIZE_LIMITS.max) {
    throw new Error(`${file} too large (${(buffer.length / 1024).toFixed(1)} KB)`);
  }
  if (buffer.length < SIZE_LIMITS.min) {
    throw new Error(`${file} too small (${(buffer.length / 1024).toFixed(1)} KB)`);
  }

  const pdfDoc = await PDFDocument.load(buffer);
  const [firstPage] = pdfDoc.getPages();
  if (!firstPage) {
    throw new Error(`${file} has no pages`);
  }

  const { width, height } = firstPage.getSize();
  if (
    !withinTolerance(width, A4.width, PAGE_TOLERANCE) ||
    !withinTolerance(height, A4.height, PAGE_TOLERANCE)
  ) {
    throw new Error(
      `${file} has unexpected page size ${width.toFixed(1)}x${height.toFixed(
        1
      )}, expected A4 (${A4.width}x${A4.height})`
    );
  }

  const { text } = await pdfParse(buffer);
  const normalized = text.toLowerCase();

  for (const snippet of required) {
    if (!normalized.includes(snippet.toLowerCase())) {
      throw new Error(`${lang} PDF missing expected text: "${snippet}"`);
    }
  }

  for (const snippet of forbidden) {
    if (normalized.includes(snippet.toLowerCase())) {
      throw new Error(`${lang} PDF contains text from another language: "${snippet}"`);
    }
  }

  console.log(`OK: ${file}`);
}

/**
 * Execute checks for all tracked PDFs.
 * @returns {Promise<void>}
 * @author Felipe Belo (https://github.com/felipeefb)
 */
async function run() {
  for (const pdf of pdfs) {
    await checkPdf(pdf);
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
