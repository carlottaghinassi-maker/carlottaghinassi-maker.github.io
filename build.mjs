// Genera le pagine HTML statiche da content/site.mjs (+ content/en.mjs per l'inglese)
// e assets/media/media.json. Italiano in /, inglese in /en/.
// Uso: node build.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site, about, projects, archive } from './content/site.mjs';
import { en, galleryLabel } from './content/en.mjs';

const ROOT = dirname(fileURLToPath(import.meta.url));
const media = JSON.parse(readFileSync(join(ROOT, 'assets/media/media.json'), 'utf8'));
const LANGS = ['it', 'en'];

// Testi dell'interfaccia (About, schermata di avvio, didascalia della home).
const UI = {
  it: {
    profile: 'Profilo completo', data: 'Dati 1.0 — Lugo (RA)', select: 'Selezione:', loading: 'caricamento',
    bootSub: 'Portfolio di graphic design', bootCopy: 'Copyright (c) {name}, {year}. Tutti i diritti riservati.', enter: 'Entra',
  },
  en: {
    profile: 'Profile complete', data: 'Data 1.0 — Lugo, Italy', select: 'Select work:', loading: 'loading',
    bootSub: 'Graphic design portfolio', bootCopy: 'Copyright (c) {name}, {year}. All rights reserved.', enter: 'Enter',
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const strip = (s) => s.replace(/<[^>]+>/g, '');

// Immagini della home: assets/media/home/<slug>.png (se esiste) sostituisce `home` del progetto.
function pngSize(file) {
  const b = readFileSync(file);
  return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) };
}
for (const pr of projects) {
  const file = join(ROOT, 'assets/media/home', `${pr.slug}.png`);
  if (existsSync(file)) {
    (media.home ??= {})[pr.slug] = { type: 'image', src: `home/${pr.slug}.png`, ...pngSize(file) };
  }
}
const homeMedia = (pr) => (media.home?.[pr.slug] ? ['home', pr.slug] : [pr.slug, pr.home]);

// Contenuti nella lingua richiesta: l'inglese sovrascrive solo i testi.
function localize(lang) {
  if (lang === 'it') return { S: { ...site, contactSubject: 'Contatto dal sito' }, ABOUT: about, PROJECTS: projects, ARCHIVE: archive };
  const PROJECTS = projects.map((pr) => {
    const t = en.projects[pr.slug];
    return {
      ...pr,
      title: t.title ?? pr.title,
      category: t.category,
      tags: t.tags,
      text: t.text,
      sections: pr.sections.map((sec, i) => ({
        ...sec,
        label: t.sections[i].label,
        text: t.sections[i].text,
        galleries: (sec.galleries || []).map((g) => (g.label ? { ...g, label: galleryLabel(g.label) } : g)),
      })),
    };
  });
  const ARCHIVE = { ...archive, title: en.archive.title, galleries: archive.galleries.map((g, i) => ({ ...g, label: en.archive.labels[i] })) };
  return { S: { ...site, ...en.site }, ABOUT: { ...about, ...en.about }, PROJECTS, ARCHIVE };
}

function getMedia(slug, key) {
  const m = media[slug]?.[key];
  if (!m) throw new Error(`Media mancante: ${slug}/${key}`);
  return m;
}

// Renders one media item. `zoom` adds the quick-view lightbox, `href` turns it into a link.
function mediaItem(A, slug, key, { zoom = true, href = null, eager = false, alt = '' } = {}) {
  const m = getMedia(slug, key);
  const ratio = `--ar:${m.w}/${m.h}`;
  const inner = m.type === 'video'
    ? `<video data-src="${A}assets/media/${m.src}" poster="${A}assets/media/${m.poster}" width="${m.w}" height="${m.h}" muted loop playsinline preload="none"></video>`
    : `<img src="${A}assets/media/${m.src}" width="${m.w}" height="${m.h}" alt="${esc(alt)}"${eager ? '' : ' loading="lazy"'} decoding="async">`;
  const cls = `media${zoom && !href ? ' zoomable' : ''}`;
  if (href) return `<a class="${cls} media-link" href="${href}" style="${ratio}">${inner}</a>`;
  return `<figure class="${cls}" style="${ratio}">${inner}</figure>`;
}

function gallery(A, slug, g, alt) {
  const mobile = Math.min(g.cols, g.cols >= 6 ? 3 : 2);
  const label = g.label ? `<div class="gallery-label"><hr>${esc(g.label)}</div>` : '';
  // 'altra-cartella:chiave' prende il media da un'altra cartella di assets/media.
  const item = (k) => (k.includes(':') ? mediaItem(A, ...k.split(':'), { alt }) : mediaItem(A, slug, k, { alt }));
  // `justify`: righe ad altezza uniforme (per immagini con proporzioni diverse).
  const cls = g.justify ? 'gallery is-justified' : 'gallery';
  const rowH = g.justify ? `;--row-h:${g.justify}rem` : '';
  return `${label}<div class="${cls}" style="--cols:${g.cols};--mcols:${mobile}${rowH}">${g.items.map(item).join('')}</div>`;
}

// Sezione di progetto: titolo e testo di spiegazione in evidenza, poi le gallerie.
function section(A, slug, sec, alt) {
  const text = sec.text ? `<div class="bodycopy-text">${sec.text.join('<br><br>')}</div>` : '';
  return `<section class="project-section">
<hr>
<div class="section-head"><h2 class="section-title">${esc(sec.label)}</h2>${text}</div>
${(sec.galleries || []).map((g) => gallery(A, slug, g, alt)).join('\n')}
</section>`;
}

const arrowNE = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 18 18 6M8 6h10v10" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;
const arrowL = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`;
const arrowR = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="1.4"/></svg>`;
// Casetta a pixel per tornare alla home (al posto della scritta "Index").
const HOUSE = [
  '.....#.....',
  '....###....',
  '...##.##...',
  '..##...##..',
  '.##.....##.',
  '##.......##',
  '.#.......#.',
  '.#..###..#.',
  '.#..#.#..#.',
  '.####.####.',
];
const house = `<svg class="icon-house" viewBox="0 0 11 10" shape-rendering="crispEdges" aria-hidden="true">${HOUSE.flatMap((row, y) => [...row].map((ch, x) => (ch === '#' ? `<rect x="${x}" y="${y}" width="1" height="1"/>` : ''))).join('')}</svg>`;
const homeLink = (href) => `<a class="home-link" href="${href}" aria-label="Index" title="Index">${house}</a>`;
const closeX = `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;

// Selettore lingua: porta alla stessa pagina nell'altra lingua.
function langSwitch(c) {
  return LANGS.map((l) => {
    const href = `${c.A}${l === 'it' ? '' : `${l}/`}${c.rel}`;
    const label = l === 'it' ? 'ITA' : 'ENG';
    return l === c.lang ? `<a href="${href}" class="active" aria-current="true">${label}</a>` : `<a href="${href}" hreflang="${l}">${label}</a>`;
  }).join(' / ');
}

function worksList(c, current) {
  const rows = c.PROJECTS.map((pr) => {
    const href = `${c.L}progetti/${pr.slug}/`;
    const act = pr.slug === current ? ' class="active"' : '';
    return `<div class="w-row"><span><a href="${href}"${act}>${esc(pr.title)}</a></span><span><a href="${href}"${act}>${esc(pr.category)}</a></span><span class="w-year"><a href="${href}"${act}>${pr.year}</a></span></div>`;
  }).join('\n');
  const arch = current === 'archivio' ? ' class="active"' : '';
  const mq = esc(c.S.archiveMarquee.repeat(3));
  return `<div class="works-list">
<hr>
${rows}
<div class="w-row"><span><a href="${c.L}archivio/"${arch}>+archive</a></span><span class="marquee"><a href="${c.L}archivio/" tabindex="-1"><span class="marquee-track"><span>${mq}</span><span aria-hidden="true">${mq}</span></span></a></span><span></span></div>
</div>`;
}

// Livelli del glitch sopra la foto: sagome colorate (maschera) e fasce della foto.
// L'url va scritto sull'elemento: in una variabile CSS verrebbe letto dalla cartella del CSS.
function glitchLayers(src) {
  const mask = `-webkit-mask-image:url('${src}');mask-image:url('${src}')`;
  const img = `background-image:url('${src}')`;
  return `<span class="gl gl-r" style="${mask}" aria-hidden="true"></span><span class="gl gl-g" style="${mask}" aria-hidden="true"></span><span class="gl gl-s1" style="${img}" aria-hidden="true"></span><span class="gl gl-s2" style="${img}" aria-hidden="true"></span>`;
}

// About/CV come una schermata "file" sci-fi anni '80: foto al centro dentro una griglia
// di misura con barra di scansione, titoli arancioni e pannelli di dati blu ai lati.
function aboutOverlay(c) {
  const { A, ABOUT, S, U } = c;
  const rows = ABOUT.sections.map((s) => `<div class="hud-index">${esc(s.label)}</div><div class="hud-data">${s.html}</div>`).join('\n');
  const cv = ABOUT.cv.map(([k, label]) => `<a href="${A}assets/media/about/${k}.jpg" download="Carlotta-Ghinassi-${label.replace(/\s+/g, '-')}.jpg">Download ${esc(label)} ↓</a>`).join('<br>');
  return `<div class="overlay about" id="about" role="dialog" aria-modal="true" aria-label="About/CV" hidden>
<div class="about-panel">
<div class="about-bar"><h2>About/CV</h2><h2><a href="#" data-close>Close ${closeX}</a></h2></div>
<div class="hud">
<div class="hud-col hud-left">
<div class="hud-title">CG File<br>${S.year}.10</div>
<div class="hud-sub">Confirm 1.0</div>
<div class="hud-panel">
<div class="hud-head">${esc(U.profile)}<br>${esc(S.name)}</div>
<div class="hud-text">${ABOUT.bio.map(esc).join('<br><br>')}</div>
</div>
<div class="hud-panel hud-small">
<div class="hud-index">CV</div><div class="hud-data">${cv}</div>
</div>
</div>
<div class="hud-figure">
<div class="hud-scan"><div class="glitch">${mediaItem(A, 'about', ABOUT.photo, { zoom: false, alt: S.name })}${glitchLayers(`${A}assets/media/${getMedia('about', ABOUT.photo).src}`)}</div><span class="hud-grid" aria-hidden="true"></span><span class="hud-bar" aria-hidden="true"></span></div>
</div>
<div class="hud-col hud-right">
<div class="hud-title">Graphic<br>Designer</div>
<div class="hud-sub">${esc(U.data)}</div>
<div class="hud-panel">
${rows}
</div>
</div>
</div>
</div>
</div>`;
}

function contactModal(c) {
  return `<div class="overlay contact" id="contact" role="dialog" aria-modal="true" aria-label="Contact" hidden>
<form class="contact-box" data-email="${esc(c.S.email)}" data-subject="${esc(c.S.contactSubject)}">
<div class="contact-head"><span>Email</span><button type="button" class="contact-x" data-close aria-label="Close">${closeX}</button></div>
<input type="email" name="from" placeholder="From: (enter your email address)..." required>
<textarea name="message" placeholder="Write your message..." required></textarea>
<div class="contact-foot"><button type="button" class="btn-cancel" data-close>Cancel</button><button type="submit" class="btn-send">Send</button></div>
</form>
</div>`;
}

function mobileMenu(c, current) {
  const { S } = c;
  return `<div class="overlay menu" id="menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>
<div class="menu-inner">
<div class="row-between"><h2><a href="${c.L}">${esc(S.brand)}</a></h2><h2><a href="#" data-close>Close</a></h2></div>
<br>
<h2><a href="#about" data-open="about">About/CV</a><br><a href="#contact" data-open="contact">Email</a><br><a href="${S.instagram}" target="_blank" rel="noopener">Instagram</a><br><a href="${S.instagramBrand}" target="_blank" rel="noopener">${esc(S.brand)}</a></h2>
<br>
<h2 class="lang-switch">${langSwitch(c)}</h2>
<br>
<h2 class="muted">Selected works</h2>
<div class="bodycopy">${worksList(c, current)}</div>
</div>
</div>`;
}

function credit(S) {
  return `<p class="credit">${esc(S.credit.text)}<br>IG: <a href="${S.credit.url}" target="_blank" rel="noopener">${esc(S.credit.handle)}</a></p>`;
}

function layout(c, { title, current, bodyClass, main, desc }) {
  const { A, L, S } = c;
  const fullTitle = title ? `${title} — ${S.brand}` : `${S.brand} — ${S.name}`;
  desc ??= S.description;
  const alt = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${A}${l === 'it' ? '' : `${l}/`}${c.rel}">`).join('\n');
  return `<!doctype html>
<html lang="${c.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
${alt}
<link rel="icon" href="${A}assets/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="${A}assets/favicon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,400..900;1,62..125,400..900&family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&family=VT323&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${A}assets/css/style.css">
<script>try{if(sessionStorage.getItem('intro'))document.documentElement.classList.add('no-intro');sessionStorage.setItem('intro','1')}catch(e){}</script>
</head>
<body class="${bodyClass}">

<div class="boot" id="boot" role="dialog" aria-modal="true" aria-label="${esc(S.brand)}">
<div class="boot-logo">${esc(S.brand)}</div>
<p class="boot-sub">${esc(c.U.bootSub)}<br>Version ${S.year}</p>
<button type="button" class="boot-enter">${esc(c.U.enter)} <span class="blink" aria-hidden="true">▸</span></button>
<p class="boot-copy">${esc(c.U.bootCopy.replace('{name}', S.name).replace('{year}', S.year))}</p>
</div>

<header class="m-header">
<h2><a href="${L}">${esc(S.brand)}</a></h2><h2><a href="#menu" data-open="menu">menu</a></h2>
</header>

<nav class="left-nav" aria-label="Menu">
<h2><a href="#about" data-open="about">About/CV</a><br><a href="#contact" data-open="contact">Email</a><br><a href="${S.instagram}" target="_blank" rel="noopener">Instagram${arrowNE}</a><br><a href="${S.instagramBrand}" target="_blank" rel="noopener">${esc(S.brand)}${arrowNE}</a></h2>
<h2 class="lang-switch">${langSwitch(c)}</h2>
</nav>

<nav class="works-nav bodycopy" aria-label="Selected works">
<h2 class="muted">Selected works<span class="cursor" aria-hidden="true"></span></h2>
${worksList(c, current)}
</nav>

<main class="main">
${main}
</main>

<footer class="d-copy"><h2 class="muted">©${S.year}</h2>${credit(S)}</footer>
<footer class="brand-mark"><a class="heading-3 striped" href="${L}">${esc(S.brand)}</a></footer>
<footer class="m-footer"><h2><a href="#" data-top>Top</a></h2><h2 class="lang-switch">${langSwitch(c)}</h2><h2>${homeLink(L)}</h2>${credit(S)}</footer>

${aboutOverlay(c)}
${contactModal(c)}
${mobileMenu(c, current)}
<div class="overlay quick-view" id="quick-view" hidden><div class="qv-stage"></div><button type="button" class="qv-prev" aria-label="Previous">${arrowL}</button><button type="button" class="qv-next" aria-label="Next">${arrowR}</button><div class="qv-count" aria-live="polite"></div><button type="button" class="qv-close" data-close aria-label="Close">${closeX}</button></div>

<script src="${A}assets/js/main.js" defer></script>
</body>
</html>
`;
}

function write(rel, html) {
  const out = join(ROOT, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log('scritto', rel);
}

for (const lang of LANGS) {
  const data = localize(lang);
  const base = lang === 'it' ? '' : `${lang}/`;
  // `rel`: percorso della pagina senza lingua; `A`: prefisso verso la radice (assets);
  // `L`: prefisso verso la home della lingua corrente.
  const ctx = (rel) => {
    const depth = (base + rel).split('/').filter(Boolean).length;
    const A = '../'.repeat(depth);
    return { ...data, lang, rel, A, L: A + base, U: UI[lang] };
  };

  // Home
  {
    const c = ctx('');
    const link = (pr) => `${c.L}progetti/${pr.slug}/`;
    const slides = c.PROJECTS.map((pr) => mediaItem(c.A, ...homeMedia(pr), { href: link(pr), eager: true, alt: strip(pr.title) }));
    const main = `<div class="home">
<div class="screen">
<div class="slideshow" aria-label="Selected works">${slides.map((s, i) => { const pr = c.PROJECTS[i]; return `<div class="slide${i === 0 ? ' is-active' : ''}" data-title="${esc(strip(pr.title))}" data-cat="${esc(pr.category)}" data-year="${pr.year}">${s}</div>`; }).join('')}</div>
<div class="screen-caption" aria-hidden="true">
<div class="sc-row"><span class="sc-label">${esc(c.U.select)}</span><span class="sc-title">[${esc(strip(c.PROJECTS[0].title))}]</span><span class="sc-year">${c.PROJECTS[0].year}</span></div>
<div class="sc-row"><span class="sc-cat">${esc(c.PROJECTS[0].category)}</span><span class="sc-loading">${esc(c.U.loading)}...</span><span class="sc-bar"><i></i></span></div>
</div>
</div>
<div class="home-grid">${c.PROJECTS.map((pr) => mediaItem(c.A, ...homeMedia(pr), { href: link(pr), alt: strip(pr.title) })).join('')}</div>
</div>`;
    write(`${base}index.html`, layout(c, { title: '', current: null, bodyClass: 'is-home', main }));
  }

  // Progetti
  for (const pr of data.PROJECTS) {
    const c = ctx(`progetti/${pr.slug}/`);
    const main = `<article class="project">
<div class="index-link"><h2>${homeLink(c.L)}</h2></div>
<div class="project-intro">
<div class="project-meta"><h1 class="project-title striped">${esc(pr.title)}</h1><div class="tags">${pr.year}<br>${esc(pr.category)}<br>${esc(pr.tags)}</div></div>
<div class="bodycopy-text">${pr.text.join('<br><br>')}</div>
</div>
<div class="sections">
${pr.sections.map((sec) => section(c.A, pr.slug, sec, strip(pr.title))).join('\n')}
</div>
</article>`;
    write(`${base}progetti/${pr.slug}/index.html`, layout(c, { title: strip(pr.title), current: pr.slug, bodyClass: 'is-project', main, desc: strip(pr.text[0]) }));
  }

  // Archivio
  {
    const c = ctx('archivio/');
    const { ARCHIVE } = data;
    const main = `<article class="project">
<div class="index-link"><h2>${homeLink(c.L)}</h2></div>
<div class="project-intro"><div class="project-meta"><h1 class="project-title">${esc(ARCHIVE.title)}</h1><div class="tags">${esc(c.S.archiveMarquee.replace(/, $/, ''))}</div></div></div>
<div class="galleries">${ARCHIVE.galleries.map((g) => gallery(c.A, archive.slug, g, ARCHIVE.title)).join('\n')}</div>
</article>`;
    write(`${base}archivio/index.html`, layout(c, { title: ARCHIVE.title, current: 'archivio', bodyClass: 'is-project', main }));
  }

  // /info/ apre direttamente About/CV
  write(`${base}info/index.html`, `<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=../#about"><link rel="canonical" href="../#about"><title>About/CV</title>`);
}
