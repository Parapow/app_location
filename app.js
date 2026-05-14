/* ═══════════════════════════════════════
   COEUR PLAGE — app.js (clean pages system)
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─────────────────────────────────────
  // ELEMENTS PAGES
  // ─────────────────────────────────────
  const navItems = document.querySelectorAll('.bottom-nav__item');

  const hero = document.querySelector('.hero');
  const main = document.querySelector('.main');

  const infosPage = document.getElementById('infosPage');
  const addressPage = document.getElementById('addressPage');

  function showHome() {
    hero.style.display = 'block';
    main.style.display = 'block';

    infosPage.style.display = 'none';
    addressPage.classList.remove('is-visible');

    document.body.classList.remove('address-open');
  }

  function showInfos() {
    hero.style.display = 'none';
    main.style.display = 'none';

    infosPage.style.display = 'block';
    addressPage.classList.remove('is-visible');

    document.body.classList.remove('address-open');
  }

  function showAddress() {
    hero.style.display = 'none';
    main.style.display = 'none';

    infosPage.style.display = 'none';

    document.body.classList.add('address-open');
    addressPage.classList.add('is-visible');

    if (window.mapInstance) {
      setTimeout(() => {
        window.mapInstance.invalidateSize();
      }, 350);
    }
  }

  // ─────────────────────────────────────
  // NAVIGATION
  // ─────────────────────────────────────
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();

      navItems.forEach(i =>
        i.classList.remove('bottom-nav__item--active')
      );
      item.classList.add('bottom-nav__item--active');

      const page = item.dataset.page;

      if (page === 'infos') {
        showInfos();
      } else if (page === 'address') {
        showAddress();
      } else {
        showHome();
      }
    });
  });

  // ─────────────────────────────────────
  // HERO IMAGE LOAD
  // ─────────────────────────────────────
  const img = document.querySelector('.hero__img');

  if (img) {
    const onLoad = () => img.classList.add('loaded');
    if (img.complete) onLoad();
    else img.addEventListener('load', onLoad);
  }

  // ─────────────────────────────────────
  // INFO CARDS ACCORDION
  // ─────────────────────────────────────
  const cards = document.querySelectorAll('[data-card]');

  cards.forEach(card => {
    const btn = card.querySelector('.info-card__header');
    const body = card.querySelector('.info-card__body');

    if (!btn || !body) return;

    const inner = document.createElement('div');
    inner.style.padding = '0 16px 0';

    while (body.firstChild) {
      inner.appendChild(body.firstChild);
    }

    body.appendChild(inner);

    btn.addEventListener('click', () => {
      const isOpen = card.classList.contains('is-open');

      cards.forEach(c => {
        c.classList.remove('is-open');
        c.querySelector('.info-card__header')
          ?.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        card.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ─────────────────────────────────────
  // WIFI COPY
  // ─────────────────────────────────────
  const copyBtn = document.getElementById('wifiCopyBtn');

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const pwd = document
        .getElementById('wifiPassword')
        ?.textContent.trim();

      if (!pwd) return;

      try {
        await navigator.clipboard.writeText(pwd);
      } catch {
        const el = document.createElement('textarea');
        el.value = pwd;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }

      copyBtn.classList.add('copied');
      setTimeout(() => copyBtn.classList.remove('copied'), 2000);
    });
  }

  // ─────────────────────────────────────
  // CHECKLIST
  // ─────────────────────────────────────
  document.querySelectorAll('[data-check]').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('checked');
    });
  });

  // ─────────────────────────────────────
  // FAQ
  // ─────────────────────────────────────
  document.querySelectorAll('.faq-item__q').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item')
        .forEach(f => f.classList.remove('open'));

      if (!isOpen) item.classList.add('open');
    });
  });

  // ─────────────────────────────────────
  // IMAGE LIGHTBOX
  // ─────────────────────────────────────
  const overlay = document.getElementById('image-overlay');
  const overlayImg = document.getElementById('overlay-img');

  if (overlay && overlayImg) {

    document.addEventListener('click', (e) => {
      const img = e.target.closest('.zoomable-img');
      if (!img) return;

      overlayImg.src = img.src;
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    overlayImg.addEventListener('click', (e) => {
      e.stopPropagation();
      overlayImg.classList.toggle('is-zoomed');
    });

    overlay.addEventListener('click', () => {
      overlay.classList.remove('active');
      overlayImg.classList.remove('is-zoomed');
      document.body.style.overflow = '';
    });
  }

  // ─────────────────────────────────────
  // LEAFLET MAP
  // ─────────────────────────────────────
  if (addressPage && window.L) {

    const homeCoords = [43.527087304363995, 4.143350403906224];

    const map = L.map('map', {
      zoomControl: false,
      attributionControl: false
    });

    window.mapInstance = map;

    L.tileLayer(
      'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
      {
        subdomains: 'abcd',
        maxZoom: 20
      }
    ).addTo(map);

    const homeIcon = L.divIcon({
      className: '',
      html: `
        <div class="home-marker">
          <div class="home-marker__pulse"></div>
          <div class="home-marker__dot">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M3 10.5L12 3l9 7.5"/>
              <path d="M5 9.5V21h14V9.5"/>
            </svg>
          </div>
        </div>
      `,
      iconSize: [26, 26],
      iconAnchor: [13, 13]
    });

    L.marker(homeCoords, { icon: homeIcon }).addTo(map);
    map.setView(homeCoords, 16);
  }

  // ─────────────────────────────────────
  // DEVICE ACCORDION (INFOS PAGE)
  // ─────────────────────────────────────
  document.querySelectorAll('[data-device-card]').forEach(card => {
    const btn = card.querySelector('.device-card__header');

    btn?.addEventListener('click', () => {
      const isOpen = card.classList.contains('open');

      document.querySelectorAll('[data-device-card]')
        .forEach(c => c.classList.remove('open'));

      if (!isOpen) card.classList.add('open');
    });
  });

  // ─────────────────────────────────────
  // INIT HOME
  // ─────────────────────────────────────
  showHome();

});