/* ═══════════════════════════════════════
   LA PARENTHÈSE DU GRAU — app.js
   ═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // ─────────────────────────────────────
  // 1. INJECTION DE LA CONFIGURATION
  // ─────────────────────────────────────
  
  // Globaux & Hero
  document.getElementById('btnNavLogement').href = CONFIG.global.googleMapsLink;
  document.getElementById('homeHeroImg').src = CONFIG.home.heroImg;
  document.getElementById('heroTitle').textContent = CONFIG.global.logementNom;
  document.getElementById('heroAddress').textContent = `${CONFIG.global.logementAdresseLigne1}, ${CONFIG.global.logementAdresseLigne3}`;
  document.getElementById('homeWelcomeTitle').innerHTML = CONFIG.home.welcomeTitle;
  document.getElementById('homeWelcomeSub').textContent = CONFIG.home.welcomeSubtitle;

  // Accueil > Arrivée
  document.getElementById('valArrivalHeure').textContent = CONFIG.home.arrivee.heure;
  document.getElementById('valArrivalDigicode').textContent = CONFIG.home.arrivee.digicode;
  document.getElementById('valArrivalBoite').textContent = CONFIG.home.arrivee.boiteCles;
  document.getElementById('valArrivalNote').textContent = CONFIG.home.arrivee.note;
  
  const stepsHtml = CONFIG.home.arrivee.etapes.map((etape, i) => `
    <div class="arrival-step">
      <div class="arrival-step__num">${i + 1}</div>
      <div class="arrival-step__text">
        <strong>${etape.titre}</strong>
        <span>${etape.texte}</span>
        ${etape.image ? `<img src="${etape.image}" class="zoomable-img" alt="${etape.imgAlt}"><p class="arrival-note">${etape.imgNote}</p>` : ''}
      </div>
    </div>
  `).join('');
  document.getElementById('arrivalStepsContainer').innerHTML = stepsHtml;

  // Accueil > WiFi
  document.getElementById('valWifiReseau').textContent = CONFIG.home.wifi.reseau;
  document.getElementById('wifiPassword').textContent = CONFIG.home.wifi.motDePasse;

  // Accueil > Règlement intérieur (icône forcée en var(--ocean) selon consigne)
  document.getElementById('rulesListContainer').innerHTML = CONFIG.home.reglement.map(rule => `
    <div class="rule-item">
      <span class="rule-item__icon">
        <i class="fa-solid ${rule.icon}" style="color:var(--ocean);font-size:18px;"></i>
      </span>
      <div class="rule-item__text">
        <strong>${rule.title}</strong>
        <span>${rule.text}</span>
      </div>
    </div>
  `).join('');

  // Accueil > Équipements
  document.getElementById('equipGridContainer').innerHTML = CONFIG.home.equipements.map(eq => `
    <div class="equip-item">
      <span class="equip-item__icon"><i class="fa-solid ${eq.icon}"></i></span>
      <span class="equip-item__name">${eq.name}</span>
    </div>
  `).join('');

  // Accueil > Numéros utiles
  document.getElementById('contactsListContainer').innerHTML = CONFIG.home.numeros.map((contact, i, arr) => `
    <a href="${contact.link}" class="contact-item contact-item--${contact.type}">
      <span class="contact-item__dot"></span>
      <span class="contact-item__label">${contact.label}</span>
      <span class="contact-item__number">${contact.number}</span>
      <span class="contact-item__arrow">›</span>
    </a>
    ${i < arr.length - 1 ? '<div class="contact-divider"></div>' : ''}
  `).join('');

  // Accueil > Départ
  document.getElementById('valDepartHeure').textContent = CONFIG.home.depart.heure;
  document.getElementById('checkoutListContainer').innerHTML = CONFIG.home.depart.taches.map(tache => `
    <div class="checkout-item" data-check>
      <div class="checkout-item__checkbox">
        <i class="fa-solid fa-check" style="font-size:11px;color:white;opacity:0;transform:scale(0.5);transition:opacity 0.15s,transform 0.2s;"></i>
      </div>
      <span class="checkout-item__text">${tache}</span>
    </div>
  `).join('');

  // Accueil > FAQ
  document.getElementById('faqListContainer').innerHTML = CONFIG.home.faq.map(item => `
    <div class="faq-item">
      <button class="faq-item__q">
        <span>${item.q}</span>
        <i class="faq-item__chevron fa-solid fa-chevron-right"></i>
      </button>
      <div class="faq-item__a"><div class="faq-item__a-inner">${item.a}</div></div>
    </div>
  `).join('');

  // Page Infos
  document.getElementById('infosWelcomeTitle').textContent = CONFIG.infos.title;
  document.getElementById('infosWelcomeSub').textContent = CONFIG.infos.subtitle;
  document.getElementById('qiArrival').textContent = CONFIG.home.arrivee.heure;
  document.getElementById('qiDeparture').textContent = CONFIG.home.depart.heure;
  document.getElementById('qiDigicode').textContent = CONFIG.home.arrivee.digicode;
  document.getElementById('qiKeybox').textContent = CONFIG.home.arrivee.boiteCles;
  document.getElementById('qiAddress').innerHTML = `${CONFIG.global.logementAdresseLigne1}<br>${CONFIG.global.logementAdresseLigne2}<br>${CONFIG.global.logementAdresseLigne3}`;

  document.getElementById('deviceListContainer').innerHTML = CONFIG.infos.appareils.map(app => `
    <div class="device-card" data-device-card>
      <button class="device-card__header">
        <div class="device-card__icon"><i class="fa-solid ${app.icon}"></i></div>
        <div class="device-card__title">${app.name}</div>
        <div class="device-card__arrow">›</div>
      </button>
      <div class="device-card__body">
        <div class="device-card__content">
          <p>${app.text}</p>
          ${app.img ? `<img class="zoomable-img" src="${app.img}" alt="${app.name}">` : ''}
        </div>
      </div>
    </div>
  `).join('');


  // ─────────────────────────────────────
  // 2. INTERACTIONS & EVENT LISTENERS
  // ─────────────────────────────────────

  // Navigation
  const navItems = document.querySelectorAll('.bottom-nav__item');
  const pages = {
    home: { elHero: document.querySelector('.hero'), elMain: document.querySelector('.main') },
    infos: { el: document.getElementById('infosPage') },
    address: { el: document.getElementById('addressPage') }
  };

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo(0, 0);
      navItems.forEach(i => i.classList.remove('bottom-nav__item--active'));
      item.classList.add('bottom-nav__item--active');
      
      const page = item.dataset.page || 'home';
      
      pages.home.elHero.style.display = (page === 'home') ? 'block' : 'none';
      pages.home.elMain.style.display = (page === 'home') ? 'block' : 'none';
      pages.infos.el.style.display = (page === 'infos') ? 'block' : 'none';
      
      if (page === 'address') {
        pages.address.el.classList.add('is-visible');
        document.body.classList.add('address-open');
      } else {
        pages.address.el.classList.remove('is-visible');
        document.body.classList.remove('address-open');
      }
    });
  });

  // Accordéons (Arrivée, Règlement, etc.)
  document.querySelectorAll('[data-card]').forEach(card => {
    const btn = card.querySelector('.info-card__header');
    btn?.addEventListener('click', () => {
      const isOpen = card.classList.contains('is-open');
      document.querySelectorAll('[data-card]').forEach(c => {
        c.classList.remove('is-open');
        c.querySelector('.info-card__header')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        card.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Accordéons (Equipements infos utiles)
  document.querySelectorAll('[data-device-card]').forEach(card => {
    const btn = card.querySelector('.device-card__header');
    btn?.addEventListener('click', () => card.classList.toggle('open'));
  });

  // Copie WiFi
  const copyBtn = document.getElementById('wifiCopyBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      const pwd = document.getElementById('wifiPassword')?.textContent.trim();
      if (!pwd) return;
      try { await navigator.clipboard.writeText(pwd); } 
      catch {
        const el = document.createElement('textarea');
        el.value = pwd; document.body.appendChild(el); el.select();
        document.execCommand('copy'); document.body.removeChild(el);
      }
      copyBtn.classList.add('copied');
      setTimeout(() => copyBtn.classList.remove('copied'), 2000);
    });
  }

  // Checkbox Départ
  document.querySelectorAll('[data-check]').forEach(item => {
    item.addEventListener('click', () => item.classList.toggle('checked'));
  });

  // FAQ
  document.querySelectorAll('.faq-item__q').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // Lightbox Image
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
    overlay.addEventListener('click', (e) => {
      if (e.target === overlayImg) overlayImg.classList.toggle('is-zoomed');
      else {
        overlay.classList.remove('active');
        overlayImg.classList.remove('is-zoomed');
        document.body.style.overflow = '';
      }
    });
  }

  // ─────────────────────────────────────
  // 3. PAGE DÉCOUVRIR (LISTE UNIQUEMENT)
  // ─────────────────────────────────────
  
  const categoryConfig = {
    restaurants: { color: '#e06b5a', icon: 'fa-utensils', iconClass: 'place-card__icon--restaurants' },
    bars:        { color: '#7b5ea7', icon: 'fa-martini-glass-citrus', iconClass: 'place-card__icon--bars' },
    activites:   { color: '#3a9e6e', icon: 'fa-person-biking', iconClass: 'place-card__icon--activites' },
  };

  const placeList = document.getElementById('placeList');
  
  function renderList(cat) {
    placeList.innerHTML = '';
    const cfg = categoryConfig[cat];

    document.querySelectorAll('.map-filter-btn[data-list-category]').forEach(b => {
      b.classList.toggle('map-filter-btn--active-cat', b.dataset.listCategory === cat);
    });

    CONFIG.discover[cat].forEach((place, i) => {
      const card = document.createElement('div');
      card.className = 'place-card';
      card.style.animationDelay = `${i * 0.05}s`;
      const navUrl = `https://maps.google.com/?q=${place.coords[0]},${place.coords[1]}`;

      card.innerHTML = `
        <div class="place-card__icon ${cfg.iconClass}"><i class="fa-solid ${cfg.icon}"></i></div>
        <div class="place-card__body">
          <div class="place-card__name">${place.name}</div>
          <div class="place-card__type">${place.description}</div> <!-- Remplacé la descripiton courte par celle du config -->
          <div class="place-card__address"><i class="fa-solid fa-location-dot" style="font-size:10px;margin-right:3px;"></i>${place.address}</div>
          <div class="place-card__meta">
            <span class="place-card__time"><i class="fa-solid fa-person-walking" style="font-size:10px;"></i> ${place.walk} min</span>
            <span class="place-card__time"><i class="fa-solid fa-car" style="font-size:10px;"></i> ${place.drive} min</span>
          </div>
        </div>
        <a href="${navUrl}" target="_blank" rel="noopener" class="place-card__nav-btn">
          <i class="fa-solid fa-diamond-turn-right"></i>
        </a>
      `;
      placeList.appendChild(card);
    });
  }

  // Écouteurs de catégorie pour la page Découvrir
  document.querySelectorAll('.map-filter-btn[data-list-category]').forEach(btn => {
    btn.addEventListener('click', () => renderList(btn.dataset.listCategory));
  });

  // Init de la liste au démarrage
  renderList('restaurants');
});