(function () {
  async function waitForFonts() {
    if (document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch (_) {
        /* ignore */
      }
    }
  }

  window.generatePDF = async function generatePDF() {
    const element = document.getElementById('cv');
    if (!element) return;

    const lang = (document.documentElement.lang || '').toLowerCase();
    const filename = lang.startsWith('pt') ? 'Curriculo Felipe Belo.pdf' : 'Resume Felipe Belo.pdf';

    const darkStyles = Array.from(document.querySelectorAll('link[href*="style-dark"]'));
    const lightStyles = Array.from(document.querySelectorAll('link[href*="style-light"]'));
    const styleState = [...darkStyles, ...lightStyles].map(link => ({ link, disabled: link.disabled }));

    lightStyles.forEach(link => { link.disabled = false; });
    darkStyles.forEach(link => { link.disabled = true; });

    document.body.classList.add('pdf-mode');
    element.classList.add('pdf-mode');

    await waitForFonts();
    await new Promise(resolve => requestAnimationFrame(() => resolve()));

    const opt = {
      margin: [10, 12, 10, 12], // mm
      filename,
      image: { type: 'jpeg', quality: 0.82 },
      html2canvas: {
        scale: 2,
        scrollX: 0,
        scrollY: 0,
        windowWidth: Math.max(element.scrollWidth, element.clientWidth),
        windowHeight: element.scrollHeight,
        useCORS: true,
        letterRendering: true,
        backgroundColor: '#ffffff'
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: { mode: ['css'] }
    };

    try {
      await html2pdf().set(opt).from(element).save();
    } finally {
      styleState.forEach(({ link, disabled }) => { link.disabled = disabled; });
      document.body.classList.remove('pdf-mode');
      element.classList.remove('pdf-mode');
    }
  };
})();
