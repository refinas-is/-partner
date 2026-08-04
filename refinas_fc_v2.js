(() => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const mobileMenu = document.querySelector('.mobile-menu');
  const form = document.querySelector('[data-demo-form]');
  const stickyCta = document.querySelector('.sticky-cta');

  const updateHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
    if (stickyCta) stickyCta.classList.toggle('is-visible', window.scrollY > 520);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', () => {
      const open = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!open));
      menuButton.setAttribute('aria-label', open ? 'メニューを開く' : 'メニューを閉じる');
      mobileMenu.hidden = open;
      document.body.classList.toggle('menu-open', !open);
    });
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      mobileMenu.hidden = true;
      document.body.classList.remove('menu-open');
    }));
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = Number(entry.target.dataset.delay || 0);
        window.setTimeout(() => entry.target.classList.add('is-visible'), delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

  document.querySelectorAll('details').forEach((item) => {
    item.addEventListener('toggle', () => {
      const icon = item.querySelector('summary i');
      if (icon) icon.textContent = item.open ? '−' : '＋';
    });
  });

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = form.querySelector('.form-submit span');
      const original = button.textContent;
      button.textContent = '送信先設定後に利用できます';
      setTimeout(() => { button.textContent = original; }, 2500);
    });
  }
})();
