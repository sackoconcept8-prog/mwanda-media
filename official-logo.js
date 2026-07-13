(() => {
  'use strict';

  const readParts = async (paths) => {
    const responses = await Promise.all(paths.map((path) => fetch(path, { cache: 'force-cache' })));
    if (responses.some((response) => !response.ok)) {
      throw new Error('Official logo data could not be loaded.');
    }
    const parts = await Promise.all(responses.map((response) => response.text()));
    return `data:image/png;base64,${parts.map((part) => part.trim()).join('')}`;
  };

  const applyLogo = (selector, source) => {
    document.querySelectorAll(selector).forEach((image) => {
      image.src = source;
      image.removeAttribute('width');
      image.removeAttribute('height');
    });
  };

  const loadOfficialLogos = async () => {
    try {
      const [fullLogo, lionMark] = await Promise.all([
        readParts([
          'assets/logo-data/full-00.txt',
          'assets/logo-data/full-01.txt',
          'assets/logo-data/full-02.txt',
          'assets/logo-data/full-03.txt'
        ]),
        readParts([
          'assets/logo-data/mark-00.txt',
          'assets/logo-data/mark-01.txt',
          'assets/logo-data/mark-02.txt'
        ])
      ]);

      applyLogo('.logo-orbit img, .bead-frame img', fullLogo);
      applyLogo('.brand-button img, .route-loader img', lionMark);

      const favicon = document.querySelector('link[rel="icon"]');
      if (favicon) {
        favicon.href = lionMark;
        favicon.type = 'image/png';
      }

      document.documentElement.classList.add('official-logo-ready');
    } catch (error) {
      console.warn('[Mwanda Media] Official logo fallback is being used.', error);
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadOfficialLogos, { once: true });
  } else {
    loadOfficialLogos();
  }
})();
