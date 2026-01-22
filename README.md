# Felipe Eduardo Farias Belo - Resume Site

## Overview
Static, bilingual resumes served via GitHub Pages, focused on reproducible downloads and regression-tested layout. Built with vanilla HTML/CSS, Playwright for PDF rendering, pdf-lib/pdf-parse for integrity checks, and pixelmatch/PNG for visual diffs. Great for hosting a personal CV while keeping the printable version trustworthy and versioned.

[Back to Table of contents](#table-of-contents)

## Table of contents
- [Overview](#overview)
- [What's Inside](#whats-inside)
- [Project Structure](#project-structure)
- [Running Locally](#running-locally)
- [Tests and Checks](#tests-and-checks)
- [PDF Outputs](#pdf-outputs)
- [Usage & Forking](#usage--forking)
- [Contact](#contact)
- [License](#license)

[Back to Table of contents](#table-of-contents)

## What's Inside
- Language/theme detection in `index.html` routes to English or Portuguese, light or dark.
- Four HTML resumes: `en-light.html`, `en-dark.html`, `pt-light.html`, `pt-dark.html` styled by `css/style-light.css` and `css/style-dark.css`.
- Prebuilt, tracked PDFs stored under `pdf/` generated through Playwright for consistent downloads.
- Visual regression baselines in `tests/visual-tests/baseline/` to catch unintended UI changes.
- Node scripts to rebuild PDFs, validate format/language, and check visuals.

[Back to Table of contents](#table-of-contents)

## Project Structure
```
.
├── index.html
├── en-dark.html
├── en-light.html
├── pt-dark.html
├── pt-light.html
├── pdf/
│   ├── Resume Felipe Belo.pdf
│   └── Curriculo Felipe Belo.pdf
├── css/
│   ├── style-dark.css
│   └── style-light.css
├── build-pdfs.js            # Playwright render of the HTML pages into A4 PDFs (hides nav/controls)
├── pdf.js                   # Legacy placeholder pointing to static PDFs
├── tests/
│   ├── pdf-tests/
│   │   └── pdf-check.js     # PDF integrity + language/format assertions
│   └── visual-tests/
│       ├── baseline/        # Reference screenshots for the four page variants
│       ├── output/          # Generated diffs/screenshots (gitignored)
│       └── visual-check.js  # Pixelmatch-based screenshot comparison for the #cv section
└── package.json             # Scripts and dev dependencies
```

[Back to Table of contents](#table-of-contents)

## Running Locally
1. Install dependencies (downloads a Playwright Chromium):  
   `npm install`
2. Preview the site by opening `index.html` or serving the folder:  
   `python -m http.server 8000` or `npx serve .`
3. Regenerate PDFs (writes to `pdf/`):  
   `npm run build:pdf`

[Back to Table of contents](#table-of-contents)

## Tests and Checks
- `npm run test:pdf` — ensures each tracked PDF in `pdf/` has a valid header, stays within size limits, keeps A4 dimensions, and contains language-specific text while rejecting the other language.
- `npm run test:visual` — screenshots `#cv` for each HTML page and compares against `tests/visual-tests/baseline/` with pixelmatch. Outputs current and diff images to `tests/visual-tests/output/`. If a baseline is missing, the current screenshot becomes the new baseline candidate.

[Back to Table of contents](#table-of-contents)

## PDF Outputs
- Download buttons in the HTML files point to the `pdf/` directory.
- `npm run build:pdf` regenerates `pdf/Resume Felipe Belo.pdf` and `pdf/Curriculo Felipe Belo.pdf` via Playwright with navigation/controls hidden for print.
- Git tracks these PDFs to keep GitHub Pages downloads consistent; replace them by rerunning the build if layout changes intentionally.

[Back to Table of contents](#table-of-contents)

## Usage & Forking
- To adapt this resume, update the HTML content, tweak `css/style-light.css` and `css/style-dark.css`, then run `npm run build:pdf` to refresh `pdf/` before publishing.
- If you fork, keep `tests/` intact so PDF and visual checks guard against regressions; refresh `tests/visual-tests/baseline/` only after intentional layout changes.
- GitHub Pages can serve directly from the root; the tracked PDFs ensure download links remain stable for visitors.
- Attribution: please retain credit to Felipe Belo as the originator of this project when publishing derivatives.

[Back to Table of contents](#table-of-contents)

## Contact
- Email: felipeefb@gmail.com  
- LinkedIn: [felipe-eduardo-farias-belo](https://www.linkedin.com/in/felipe-eduardo-farias-belo)

[Back to Table of contents](#table-of-contents)

## License
- Licensed under the Apache License 2.0 (`LICENSE`). This keeps the project open source, allows commercial and private reuse, and requires preservation of notices so Felipe Belo remains credited as the originator.
- Apache 2.0 is a permissive choice that welcomes forks and contributions while keeping attribution intact and avoiding copyleft obligations for downstream users.

[Back to Table of contents](#table-of-contents)
