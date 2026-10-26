/* ==========================================================================
   APP.JS — Logique du livret d'accueil
   ========================================================================== */
(function () {
  "use strict";

  const C = window.CONFIG;
  const TXT = C.libelles;
  const app = document.getElementById("app");
  const tabbar = document.getElementById("tabbar");
  const lightbox = document.getElementById("lightbox");

  /* ------------------------------------------------------------------
     Utilitaires
     ------------------------------------------------------------------ */
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const tokens = (str) =>
    String(str)
      .replace(/\{\{digicode\}\}/g, `<span class="code-pill">${esc(C.codes.digicode.valeur)}</span>`)
      .replace(/\{\{boite_cles\}\}/g, `<span class="code-pill">${esc(C.codes.boiteCles.valeur)}</span>`);

  const fmtNote = (n) => String(n).replace(".", ",");
  const telHref = (n) => "tel:" + String(n).replace(/[^\d+]/g, "");
  const smsHref = (n) => "sms:" + String(n).replace(/[^\d+]/g, "");

  const store = {
    get(key, fallback) {
      try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
    },
    set(key, val) {
      try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* stockage indisponible */ }
    }
  };

  function applyTheme() {
    const c = C.couleurs, r = document.documentElement.style;
    r.setProperty("--bg", c.fond);
    r.setProperty("--card", c.fondCarte || "#FFFFFF");
    r.setProperty("--title", c.titre || c.texte);
    r.setProperty("--border-strong", c.bordureBouton || c.bordure);
    r.setProperty("--accent", c.accent);
    r.setProperty("--accent-dark", c.accentFonce);
    r.setProperty("--accent-soft", c.accentClair);
    r.setProperty("--text", c.texte);
    r.setProperty("--text-2", c.texteSecondaire);
    r.setProperty("--border", c.bordure);
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", c.accent);
    document.title = C.logement.nom + " — Livret d'accueil";
  }

  function navigationUrl(address) {
    const q = encodeURIComponent(address);
    const ua = navigator.userAgent || "";
    if (/iPhone|iPad|iPod/i.test(ua)) return `maps://?daddr=${q}&dirflg=d`;
    if (/Android/i.test(ua)) return `geo:0,0?q=${q}`;
    return `https://www.google.com/maps/dir/?api=1&destination=${q}&travelmode=driving`;
  }
  const placeUrl = (p) =>
    "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(p.nom + " " + (p.adresse || "Le Grau-du-Roi"));

  const img = (src, alt, label = "Photo à ajouter") =>
    `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" data-fallback="${esc(label)}">`;
  const placeholder = (icon, label) =>
    `<div class="placeholder"><i class="${icon}"></i><span>${esc(label)}</span></div>`;

  const video = (src, poster) =>
    `<video controls playsinline preload="metadata"${poster ? ` poster="${esc(poster)}"` : ""}><source src="${esc(src)}" type="video/mp4"></video>`;

  /* ------------------------------------------------------------------
     Composants
     ------------------------------------------------------------------ */
  function accordion(items, visible) {
    const limit = visible > 0 && visible < items.length ? visible : items.length;
    return `<div class="card list-card">
      ${items
        .map(
          (it, i) => `
      <div class="acc-item${i >= limit ? " is-extra" : ""}">
        <button class="acc-head" type="button" aria-expanded="false">
          ${it.icone ? `<span class="acc-ico"><i class="${esc(it.icone)}"></i></span>` : ""}
          <span class="acc-label">${esc(it.titre)}</span>
          <i class="fa-solid fa-chevron-right acc-chev"></i>
        </button>
        <div class="acc-body"><div class="acc-inner"><p class="acc-text">${it.texte}</p></div></div>
      </div>`
        )
        .join("")}
      ${
        limit < items.length
          ? `<div class="list-more"><button class="btn btn--soft btn--block" type="button" data-more>${esc(TXT.voirPlus)}</button></div>`
          : ""
      }
    </div>`;
  }

  function timeCard(kind, withButton) {
    const d = kind === "arrivee" ? C.arrivee : C.depart;
    const icon = kind === "arrivee" ? "fa-solid fa-right-to-bracket" : "fa-solid fa-right-from-bracket";
    return `
      <div class="card card--center">
        <span class="card__icon"><i class="${icon}"></i></span>
        <h3 class="card__title">${esc(d.titre)}</h3>
        <p class="card__sub">${esc(d.heure)}</p>
        ${withButton ? `<a class="btn btn--soft btn--block" href="#/${kind}">${esc(TXT.enSavoirPlus)}</a>` : ""}
      </div>`;
  }

  function codeCards() {
    return ["digicode", "boiteCles"]
      .map((k) => {
        const c = C.codes[k];
        return `
        <div class="card card--center">
          <span class="card__icon"><i class="${esc(c.icone)}"></i></span>
          <h3 class="card__title">${esc(c.titre)}</h3>
          <p class="card__sub card__sub--code">${esc(c.valeur)}</p>
        </div>`;
      })
      .join("");
  }

  function wifiCard() {
    const w = C.wifi;
    return `
      <div class="card wifi">
        <div class="wifi__icon"><i class="fa-solid fa-wifi"></i></div>
        <div class="wifi__rows">
          <div>
            <p class="wifi__label">${esc(TXT.nomReseau)}</p>
            <p class="wifi__value">${esc(w.nomReseau)}</p>
          </div>
          <div>
            <p class="wifi__label">${esc(TXT.motDePasse)}</p>
            <p class="wifi__value">
              <span>${esc(w.motDePasse)}</span>
              <button class="copy-btn" type="button" data-copy="${esc(w.motDePasse)}" data-copied="${esc(TXT.copie)}" aria-label="${esc(TXT.copier)}">
                <i class="fa-regular fa-copy"></i><i class="fa-solid fa-check"></i>
              </button>
            </p>
          </div>
        </div>
      </div>`;
  }

  function placeCard(p) {
    const rating =
      p.note != null
        ? `<span class="meta-rating"><i class="fa-regular fa-star"></i>${fmtNote(p.note)}</span>`
        : `<span class="meta-rating"><i class="fa-regular fa-star"></i>—</span>`;
    const call = p.telephone
      ? `<a class="btn btn--soft" href="${telHref(p.telephone)}">${esc(TXT.appeler)}</a>`
      : `<span class="btn btn--soft" aria-disabled="true">${esc(TXT.appeler)}</span>`;
    return `
      <article class="card place">
        <div class="place__img">${img(p.image, p.nom)}</div>
        <div class="place__body">
          <h3 class="place__name">${esc(p.nom)}</h3>
          <div class="place__meta">
            <span>${esc(TXT.aDistance)} ${esc(p.distance)}</span>
            <span class="dot">•</span>
            ${rating}
          </div>
          <div class="place__actions">
            ${call}
            <a class="btn btn--soft" href="${placeUrl(p)}" target="_blank" rel="noopener">${esc(TXT.sYRendre)}</a>
          </div>
        </div>
      </article>`;
  }

  function carouselSection(s) {
    const eyebrow = C.decouvrir.surtitreSections;
    return `
      <section class="section">
        ${eyebrow ? `<p class="section__eyebrow">${esc(eyebrow)}</p>` : ""}
        <h2 class="section__title">${esc(s.titre)}</h2>
        <div class="carousel-wrap">
          <button class="carousel-nav carousel-nav--prev is-hidden" type="button" data-scroll="-1" aria-label="Précédent"><i class="fa-solid fa-chevron-left"></i></button>
          <div class="carousel">${s.lieux.map(placeCard).join("")}</div>
          <button class="carousel-nav carousel-nav--next" type="button" data-scroll="1" aria-label="Suivant"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
      </section>`;
  }

  function detailBar(title) {
    return `
      <header class="detail-bar">
        <button class="back-btn" type="button" data-back aria-label="${esc(TXT.retour)}"><i class="fa-solid fa-arrow-left"></i></button>
        <span class="detail-bar__title">${esc(title)}</span>
      </header>`;
  }

  /* ------------------------------------------------------------------
     Pages
     ------------------------------------------------------------------ */
  function pageAccueil() {
    const lg = C.logement, ct = C.contacts, h = ct.hote;
    return `
    <div class="page">
      <header class="hero">
        <img class="hero__img" src="${esc(lg.imagePrincipale)}" alt="${esc(lg.nom)}" data-fallback="hide">
        <div class="hero__shade"></div>
        <div class="hero__content">
          <h1 class="hero__title">${esc(lg.nom)}</h1>
          <p class="hero__address"><i class="fa-solid fa-location-dot"></i><span>${esc(lg.adresse)}</span></p>
        </div>
      </header>

      <a class="btn-main" href="${esc(navigationUrl(lg.adresse))}" data-nav>
        <i class="fa-solid fa-location-arrow"></i>${esc(lg.boutonNavigation)}
      </a>

      <section class="section">
        <h2 class="section__title">${esc(TXT.sectionArriveeDepart)}</h2>
        <div class="grid-2">${timeCard("arrivee", true)}${timeCard("depart", true)}</div>
        <a class="btn btn--soft btn--block" href="#/parking" style="margin-top:12px;"><i class="fa-solid fa-square-parking"></i> Trouver un stationnement</a>
        <button class="btn btn--soft btn--block" type="button" data-reserve-parking style="margin-top:10px;"><i class="fa-solid fa-square-parking"></i> Réserver une place de parking privative</button>
      </section>

      <section class="section">
        <h2 class="section__title">${esc(TXT.sectionCodes)}</h2>
        <div class="grid-2">${codeCards()}</div>
      </section>

      <section class="section">
        <h2 class="section__title">${esc(C.wifi.titre)}</h2>
        ${wifiCard()}
      </section>

      <section class="section">
        <h2 class="section__title">${esc(C.reglement.titre)}</h2>
        <a class="btn btn--soft btn--block" href="#/reglement">${esc(C.reglement.boutonTexte || "Voir le règlement intérieur")}</a>
      </section>

      <section class="section">
        <h2 class="section__title">${esc(ct.titre)}</h2>
        <div class="card host">
          <div class="host__avatar"><i class="fa-solid fa-user"></i></div>
          <div class="host__info">
            <p class="host__label">${esc(h.libelle)}</p>
            <p class="host__name">${esc(h.prenom)}</p>
          </div>
          <div class="host__actions">
            <a class="icon-btn" href="${smsHref(h.telephone)}" aria-label="Envoyer un message"><i class="fa-solid fa-message"></i></a>
            <a class="icon-btn" href="${telHref(h.telephone)}" aria-label="Appeler"><i class="fa-solid fa-phone"></i></a>
          </div>
        </div>
        <div class="urgences-grid">
          ${ct.urgences
            .map(
              (u) => `
            <a class="card urgence" href="${telHref(u.numero)}">
              <span class="card__icon"><i class="${esc(u.icone)}"></i></span>
              <p class="urgence__num">${esc(u.numero)}</p>
              <p class="urgence__name">${esc(u.nom)}</p>
            </a>`
            )
            .join("")}
        </div>
      </section>

      <section class="section">
        <h2 class="section__title">${esc(C.faq.titre)}</h2>
        <p class="section__subtitle">${esc(C.faq.sousTitre)}</p>
        ${accordion(
          C.faq.questions.map((f) => ({
            titre: f.q,
            texte: f.r + 
              (f.q.toLowerCase().includes("garer") ? `<br><a class="btn btn--soft btn--block" href="#/parking" style="margin-top:12px;"><i class="fa-solid fa-square-parking"></i> Trouver un stationnement</a><button class="btn btn--soft btn--block" type="button" style="margin-top:10px; opacity: 0.7; cursor: default;"><i class="fa-solid fa-square-parking"></i> Réserver une place de parking privative</button>` : "") +
              (f.q.toLowerCase().includes("poubelles") ? `<br><a class="btn btn--soft btn--block" href="#/poubelles" style="margin-top:12px;"><i class="fa-solid fa-trash-can"></i> Rejoindre le local poubelles</a>` : "")
          })),
          C.faq.afficherInitialement
        )}
      </section>
    </div>`;
  }

  function pageInfos() {
    const I = C.infos;
    return `
    <div class="page">
      <header class="page-head">
        <h1>${esc(I.titre)}</h1>
        <p>${esc(I.sousTitre)}</p>
      </header>

      <section class="section">
        <div class="grid-2">${timeCard("arrivee", false)}${timeCard("depart", false)}</div>
        <div class="grid-2" style="margin-top:12px">${codeCards()}</div>
        <a class="btn btn--soft btn--block" href="#/poubelles" style="margin-top:12px;"><i class="fa-solid fa-trash-can"></i> Rejoindre le local poubelles</a>
      </section>

      <section class="section">
        <h2 class="section__title">${esc(I.titreAppareils)}</h2>
        <div class="grid-2">
          ${I.appareils
            .map(
              (a) => `
            <a class="card device" href="#/appareil/${esc(a.id)}">
              <div class="device__img">${img(a.image, a.nom)}</div>
              <div class="device__body">
                <h3 class="device__name">${esc(a.nom)}</h3>
              </div>
            </a>`
            )
            .join("")}
        </div>
      </section>
    </div>`;
  }

  function pageDecouvrir() {
    const D = C.decouvrir;
    return `
    <div class="page">
      <header class="page-head">
        <h1>${esc(D.titre)}</h1>
        <p>${esc(D.sousTitre)}</p>
      </header>
      ${D.sections.map(carouselSection).join("")}
    </div>`;
  }

  function pageArrivee() {
    const A = C.arrivee;
    return `
    <div class="page">
      ${detailBar(A.titreDetail)}
      <header class="page-head" style="padding-top:22px">
        <h1>${esc(A.titreDetail)}</h1>
        <p>${esc(A.sousTitreDetail)}</p>
      </header>
      ${A.etapes
        .map(
          (e, i) => `
        <section class="step">
          <div class="step__head">
            <span class="step__num">${i + 1}</span>
            <h2 class="step__title">${esc(e.titre)}</h2>
          </div>
          <div class="step__texts">${(e.textes || []).map((t) => `<p>${tokens(t)}</p>`).join("")}</div>
          ${
            e.medias && e.medias.length
              ? `<div class="medias">${e.medias
                  .map(
                    (m) => `
              <figure class="media">
                ${m.type === "video" ? video(m.src, m.poster) : img(m.src, m.legende || e.titre)}
                ${m.legende ? `<figcaption>${esc(m.legende)}</figcaption>` : ""}
              </figure>`
                  )
                  .join("")}</div>`
              : ""
          }
        </section>`
        )
        .join("")}
      <div class="final-note"><i class="fa-solid fa-circle-info"></i><span>${esc(A.noteFinale)}</span></div>
    </div>`;
  }

  function pageDepart() {
    const D = C.depart;
    return `
    <div class="page">
      ${detailBar(D.titreDetail)}
      <header class="page-head" style="padding-top:22px">
        <h1>${esc(D.titreDetail)}</h1>
        <p>${esc(D.sousTitreDetail)}</p>
      </header>
      <div class="progress">
        <div class="progress__bar"><div class="progress__fill" id="progress-fill"></div></div>
        <p class="progress__label" id="progress-label"></p>
      </div>
      <div class="checklist" id="checklist">
        ${D.checklist
          .map(
            (it, i) => `
          <button class="check-item" type="button" data-check="${i}" role="checkbox" aria-checked="false">
            <span class="check-item__ico"><i class="${esc(it.icone)}"></i></span>
            <span class="check-item__text">${esc(it.texte)}</span>
            <span class="check-item__box"><i class="fa-solid fa-check"></i></span>
          </button>`
          )
          .join("")}
      </div>
      <div class="final-note done-msg" id="done-msg"><i class="fa-solid fa-heart"></i><span>${esc(D.messageFin)}</span></div>
    </div>`;
  }

  function pageReglement() {
    const R = C.reglement;
    return `
    <div class="page">
      ${detailBar(R.titre)}
      <header class="page-head" style="padding-top:22px">
        <h1>${esc(R.titre)}</h1>
        <p>${esc(R.sousTitreDetail)}</p>
      </header>
      <section class="section" style="padding-top:16px">
        <div class="card list-card" style="padding: 4px 20px;">
          ${R.regles
            .map(
              (r, i) => `
            <div style="padding: 18px 0; ${i > 0 ? "border-top: 1px solid var(--border);" : ""}">
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                ${r.icone ? `<span class="acc-ico" style="margin-top: 2px; color: var(--accent);"><i class="${esc(r.icone)}"></i></span>` : ""}
                <div style="flex: 1; min-width: 0;">
                  <h3 style="font-size: var(--fs-liste-question); font-weight: 500; color: var(--title); margin-bottom: 6px;">${esc(r.titre)}</h3>
                  <p style="color: var(--text-2); font-size: var(--fs-liste-reponse); margin: 0;">${r.texte}</p>
                </div>
              </div>
            </div>`
            )
            .join("")}
        </div>
      </section>
    </div>`;
  }

  function pageParking() {
    const P = C.parking;
    return `
    <div class="page parking-page">
      ${detailBar(P.titre)}
      <div class="parking-container">
        <div id="parking-map"></div>
        
        <!-- Légende en haut à droite -->
        <div class="map-legend">
          <div class="legend-item"><span class="legend-dot" style="background: #22c55e;"></span><span>Gratuit</span></div>
          <div class="legend-item"><span class="legend-dot" style="background: #ef4444;"></span><span>Payant</span></div>
        </div>

        <!-- Bouton de réservation en bas de la carte -->
        <div style="position: absolute; bottom: 16px; left: 16px; right: 16px; z-index: 1000;">
          <button type="button" data-reserve-parking style="display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; background: var(--card); color: var(--title); border: 1px solid var(--border); padding: 12px 16px; border-radius: 12px; font-family: var(--font); font-size: 13px; font-weight: 500; box-shadow: 0 4px 12px rgba(0,0,0,0.15); cursor: pointer;">
            <i class="fa-solid fa-square-parking" style="color: var(--accent);"></i> Réserver une place de parking privative
          </button>
        </div>
      </div>
    </div>`;
  }

  

  function pagePoubelles() {
    return `
    <div class="page parking-page">
      ${detailBar("Local poubelles")}
      <div class="parking-container">
        <div id="poubelles-map" style="width:100%; height:100%;"></div>
      </div>
    </div>`;
  }

  function pageAppareil(id) {
    const a = C.infos.appareils.find((x) => x.id === id);
    if (!a) return pageNotFound();
    return `
    <div class="page">
      ${detailBar(a.nom)}
      <header class="page-head" style="padding-top:22px">
        <h1>${esc(a.nom)}</h1>
      </header>
      <div class="device-hero" style="margin-top:14px">${img(a.image, a.nom)}</div>
      <section class="section" style="padding-top:22px">
        <h2 class="section__title">Description</h2>
        <p style="color:#2a303a">${tokens(a.description)}</p>
      </section>
      ${
        a.etapes && a.etapes.length
          ? `<section class="section" style="padding-top:22px">
        <h2 class="section__title">Mode d'emploi</h2>
        <ol class="how-list">${a.etapes.map((s) => `<li><span>${tokens(s)}</span></li>`).join("")}</ol>
      </section>`
          : ""
      }
      ${
        a.video
          ? `<section class="section" style="padding-top:22px">
        <h2 class="section__title">Vidéo démonstration</h2>
      </section>
      <div class="device-video">${video(a.video, a.poster)}</div>`
          : ""
      }
    </div>`;
  }

  function pageNotFound() {
    return `<div class="page"><header class="page-head"><h1>Page introuvable</h1><p><a href="#/accueil" style="color:var(--accent);font-weight:600">Retour à l'accueil</a></p></header></div>`;
  }

  function showToast(message) {
    const existing = document.querySelector('.toast-notification');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<i class="fa-solid fa-circle-info" style="color: var(--accent);"></i><span>${esc(message)}</span>`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('is-visible');
    });

    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 250);
    }, 2500); // Disparaît au bout de 2,5 secondes
  }

  /* ------------------------------------------------------------------
     Routeur
     ------------------------------------------------------------------ */
  const scrollMemory = {};
  let currentKey = null;
  let navigated = false;

  function parseRoute() {
    const [name, arg] = location.hash.replace(/^#\/?/, "").split("/");
    switch (name) {
      case "infos":     return { key: "infos", tab: "infos", html: pageInfos(), detail: false };
      case "decouvrir": return { key: "decouvrir", tab: "decouvrir", html: pageDecouvrir(), detail: false };
      case "arrivee":   return { key: "arrivee", tab: "accueil", html: pageArrivee(), detail: true, parent: "accueil" };
      case "depart":    return { key: "depart", tab: "accueil", html: pageDepart(), detail: true, parent: "accueil" };
      case "reglement": return { key: "reglement", tab: "accueil", html: pageReglement(), detail: true, parent: "accueil" };
      case "parking":   return { key: "parking", tab: "accueil", html: pageParking(), detail: true, parent: "accueil" };
      case "poubelles": return { key: "poubelles", tab: "infos", html: pagePoubelles(), detail: true, parent: "infos" };
      case "appareil":  return { key: "appareil/" + arg, tab: "infos", html: pageAppareil(arg), detail: true, parent: "infos" };
      default:          return { key: "accueil", tab: "accueil", html: pageAccueil(), detail: false };
    }
  }

  function renderTabbar(active) {
    tabbar.innerHTML =
      `<div class="tabbar__inner">` +
      C.menu
        .map(
          (m) => `
        <a class="tab${m.id === active ? " is-active" : ""}" href="#/${m.id}"${m.id === active ? ' aria-current="page"' : ""}>
          <i class="${esc(m.icone)}"></i><span>${esc(m.libelle)}</span>
        </a>`
        )
        .join("") +
      `</div>`;
  }

  function route() {
    if (currentKey !== null) scrollMemory[currentKey] = window.scrollY;
    const r = parseRoute();
    app.innerHTML = r.html;
    renderTabbar(r.tab);
    app.dataset.parent = r.parent || "";
    window.scrollTo(0, r.detail ? 0 : scrollMemory[r.key] || 0);
    if (currentKey !== null) navigated = true;
    currentKey = r.key;
    if (r.key === "depart") initChecklist();
    if (r.key === "parking") initParkingMap();
    if (r.key === "poubelles") initPoubellesMap();
    app.querySelectorAll(".carousel").forEach(updateCarouselNav);
  }

  /* ------------------------------------------------------------------
     Initialisation de la carte Leaflet (Parkings & Logement)
     ------------------------------------------------------------------ */
  let parkingMapInstance = null;

  function initParkingMap() {
    if (typeof window.L === 'undefined') {
      console.error("Leaflet n'est pas chargé !");
      return;
    }

    if (parkingMapInstance !== null) {
      parkingMapInstance.remove();
      parkingMapInstance = null;
    }

    setTimeout(() => {
      const mapEl = document.getElementById('parking-map');
      if (!mapEl) return;

      const logementCoords = C.logement.coords || [43.52707168221571, 4.1433827163793735];

      parkingMapInstance = window.L.map('parking-map', {
        center: logementCoords,
        zoom: 16,
        zoomControl: false,
        attributionControl: false
      });

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(parkingMapInstance);

      parkingMapInstance.invalidateSize();

      const logementIcon = window.L.divIcon({
        className: 'logement-marker-wrapper',
        html: `
          <div class="logement-marker">
            <div class="logement-marker__aura"></div>
            <div class="logement-marker__circle">
              <i class="fa-solid fa-house"></i>
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      window.L.marker(logementCoords, { icon: logementIcon }).addTo(parkingMapInstance);
      
      if (C.parking && C.parking.zones) {
        C.parking.zones.forEach(zone => {
          const polygon = window.L.polygon(zone.coordonnees, {
            color: zone.couleur,
            fillColor: zone.couleur,
            fillOpacity: 0.4,
            weight: 3
          }).addTo(parkingMapInstance);

          const navUrl = navigationUrl(zone.adresse || C.logement.adresse);
          const popupContent = `
            <div style="font-family: var(--font); font-size: 13px; min-width: 170px; text-align: center; padding: 4px;">
              <strong style="font-size: 14px; color: var(--title); display: block; margin-bottom: 4px;">${esc(zone.nom)}</strong>
              <span style="display: inline-block; padding: 2px 8px; border-radius: 99px; font-size: 11px; font-weight: 600; background: ${zone.type.includes('Gratuit') ? '#dcfce7' : '#fee2e2'}; color: ${zone.type.includes('Gratuit') ? '#166534' : '#991b1b'}; margin-bottom: 8px;">
                ${esc(zone.type)}
              </span>
              <br>
              <a href="${esc(navUrl)}" target="_blank" rel="noopener" class="btn btn--primary" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 36px; padding: 0 12px; font-size: 12px; width: 100%; margin-top: 4px; text-decoration: none; color: #fff;">
                <i class="fa-solid fa-location-arrow"></i> Rejoindre l'emplacement
              </a>
            </div>
          `;
          polygon.bindPopup(popupContent);
        });
      }
    }, 250);
  }

  let poubellesMapInstance = null;

  function initPoubellesMap() {
    if (typeof window.L === 'undefined') return;

    if (poubellesMapInstance !== null) {
      poubellesMapInstance.remove();
      poubellesMapInstance = null;
    }

    setTimeout(() => {
      const mapEl = document.getElementById('poubelles-map');
      if (!mapEl) return;

      const logementCoords = C.logement.coords || [43.52707168221571, 4.1433827163793735];
      const poubellesCoords = [43.52705103027846, 4.142711857971417];

      poubellesMapInstance = window.L.map('poubelles-map', {
        center: poubellesCoords,
        zoom: 17,
        zoomControl: false,
        attributionControl: false
      });

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(poubellesMapInstance);

      poubellesMapInstance.invalidateSize();

      // Marqueur du logement (sans popup)
      const logementIcon = window.L.divIcon({
        className: 'logement-marker-wrapper',
        html: `
          <div class="logement-marker">
            <div class="logement-marker__aura"></div>
            <div class="logement-marker__circle">
              <i class="fa-solid fa-house"></i>
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });
      window.L.marker(logementCoords, { icon: logementIcon }).addTo(poubellesMapInstance);

      // Marqueur du local poubelles (vert avec aura et icône poubelle blanche)
      const poubellesIcon = window.L.divIcon({
        className: 'logement-marker-wrapper',
        html: `
          <div class="logement-marker">
            <div class="logement-marker__aura" style="background: rgba(34, 197, 94, 0.35);"></div>
            <div class="logement-marker__circle" style="background: #22c55e; color: #fff;">
              <i class="fa-solid fa-trash-can"></i>
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      const navUrl = navigationUrl("43.52705103027846, 4.142711857971417");
      const poubellesMarker = window.L.marker(poubellesCoords, { icon: poubellesIcon }).addTo(poubellesMapInstance);
      
      poubellesMarker.bindPopup(`
        <div style="font-family: var(--font); font-size: 13px; min-width: 180px; text-align: center; padding: 4px;">
          <strong style="font-size: 14px; color: var(--title); display: block; margin-bottom: 6px;">Local poubelles</strong>
          <div style="width: 100%; height: 100px; border-radius: 6px; overflow: hidden; margin-bottom: 8px; background: #f0f2f5;">
            <img src="assets/img/lieux/local-poubelle.png" alt="Local poubelles" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy">
          </div>
          <a href="${esc(navUrl)}" target="_blank" rel="noopener" class="btn btn--primary" style="display: inline-flex; align-items: center; justify-content: center; gap: 6px; min-height: 36px; padding: 0 12px; font-size: 12px; width: 100%; text-decoration: none; color: #fff;">
            <i class="fa-solid fa-location-arrow"></i> Rejoindre
          </a>
        </div>
      `);
    }, 250);
  }

  function updateCarouselNav(car) {
    const wrap = car.parentElement;
    const prev = wrap.querySelector(".carousel-nav--prev");
    const next = wrap.querySelector(".carousel-nav--next");
    if (prev) prev.classList.toggle("is-hidden", car.scrollLeft < 8);
    if (next) next.classList.toggle("is-hidden", car.scrollLeft + car.clientWidth >= car.scrollWidth - 8);
  }
  app.addEventListener("scroll", (e) => {
    if (e.target.classList && e.target.classList.contains("carousel")) updateCarouselNav(e.target);
  }, true);

  const CHECK_KEY = "livret-depart-checklist";

  function initChecklist() {
    const total = C.depart.checklist.length;
    const state = store.get(CHECK_KEY, []);
    const items = app.querySelectorAll(".check-item");
    items.forEach((el, i) => {
      const done = !!state[i];
      el.classList.toggle("is-done", done);
      el.setAttribute("aria-checked", done);
    });
    updateProgress(total);
  }

  function updateProgress(total) {
    const done = app.querySelectorAll(".check-item.is-done").length;
    const fill = document.getElementById("progress-fill");
    const label = document.getElementById("progress-label");
    const msg = document.getElementById("done-msg");
    if (fill) fill.style.width = (done / total) * 100 + "%";
    if (label) label.textContent = `${done} / ${total}`;
    if (msg) msg.classList.toggle("is-visible", done === total);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;opacity:0;top:0;left:0";
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (err) {}
      ta.remove();
      return ok;
    }
  }

  app.addEventListener("click", async (e) => {
    const t = e.target;

    const reserveBtn = t.closest("[data-reserve-parking]");
    if (reserveBtn) {
      showToast("Bientôt disponible !");
      return;
    }

    const head = t.closest(".acc-head");
    if (head) {
      const item = head.parentElement;
      const open = item.classList.toggle("is-open");
      head.setAttribute("aria-expanded", open);
      return;
    }

    const more = t.closest("[data-more]");
    if (more) {
      const card = more.closest(".list-card");
      const expanded = card.classList.toggle("is-expanded");
      more.textContent = expanded ? TXT.voirMoins : TXT.voirPlus;
      return;
    }

    const copy = t.closest("[data-copy]");
    if (copy) {
      const ok = await copyText(copy.dataset.copy);
      if (ok) {
        copy.classList.add("is-copied");
        clearTimeout(copy._timer);
        copy._timer = setTimeout(() => copy.classList.remove("is-copied"), 1800);
      }
      return;
    }

    const check = t.closest("[data-check]");
    if (check) {
      const i = Number(check.dataset.check);
      const done = check.classList.toggle("is-done");
      check.setAttribute("aria-checked", done);
      const state = store.get(CHECK_KEY, []);
      state[i] = done;
      store.set(CHECK_KEY, state);
      updateProgress(C.depart.checklist.length);
      return;
    }

    if (t.closest("[data-back]")) {
      if (navigated) history.back();
      else location.hash = "#/" + (app.dataset.parent || "accueil");
      return;
    }

    const sc = t.closest("[data-scroll]");
    if (sc) {
      const car = sc.parentElement.querySelector(".carousel");
      car.scrollBy({ left: Number(sc.dataset.scroll) * car.clientWidth * 0.8, behavior: "smooth" });
      return;
    }

    const mediaImg = t.closest(".media img");
    if (mediaImg) {
      lightbox.querySelector("img").src = mediaImg.src;
      lightbox.hidden = false;
    }
  });

  tabbar.addEventListener("click", (e) => {
    const tab = e.target.closest(".tab");
    if (!tab) return;
    const r = parseRoute();
    if (tab.classList.contains("is-active")) {
      e.preventDefault();
      if (r.detail) {
        location.hash = "#/" + r.tab;
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  });

  document.addEventListener(
    "error",
    (e) => {
      const el = e.target;
      if (!el || !el.tagName) return;
      if (el.tagName === "IMG" && el.dataset.fallback !== undefined) {
        if (el.dataset.fallback === "hide") { el.remove(); return; }
        el.replaceWith(htmlToNode(placeholder("fa-regular fa-image", el.dataset.fallback)));
      } else if (el.tagName === "SOURCE" && el.parentElement && el.parentElement.tagName === "VIDEO") {
        el.parentElement.replaceWith(htmlToNode(placeholder("fa-solid fa-film", "Vidéo à ajouter")));
      }
    },
    true
  );

  function htmlToNode(html) {
    const d = document.createElement("div");
    d.innerHTML = html.trim();
    return d.firstChild;
  }

  const closeLightbox = () => { lightbox.hidden = true; };
  lightbox.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  applyTheme();
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.addEventListener("hashchange", route);
  route();
})();
