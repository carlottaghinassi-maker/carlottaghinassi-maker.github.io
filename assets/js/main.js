// Comportamenti: schermata di avvio, overlay (About/CV, Email, menu mobile), slideshow in home,
// video lazy, quick view delle immagini, titoli scritti a macchina, link "Top".
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Schermata di avvio: il logo entra a fasce sfasate; si entra solo col pulsante ---------- */

  const boot = $('#boot');
  if (boot && getComputedStyle(boot).display !== 'none') {
    const logo = $('.boot-logo', boot);
    const BANDS = 9;
    if (!calm) {
      logo.classList.add('is-glitching');
      for (let b = 0; b < BANDS; b++) {
        const band = document.createElement('span');
        band.className = 'band striped';
        band.textContent = logo.firstChild.textContent;
        band.style.setProperty('--t', `${(b * 100) / BANDS}%`);
        band.style.setProperty('--b', `${100 - ((b + 1) * 100) / BANDS}%`);
        logo.append(band);
        const dx = () => `${(Math.random() * 2 - 1) * 18}%`;
        band.animate([
          { transform: `translateX(${dx()})` }, { transform: `translateX(${dx()})` },
          { transform: `translateX(${dx()})` }, { transform: 'translateX(0)' },
        ], { duration: 900, delay: b * 40, easing: 'steps(4)', fill: 'both' });
      }
      // Alla fine le righe spariscono e resta il logo pieno.
      setTimeout(() => {
        logo.classList.remove('is-glitching');
        $$('.band', logo).forEach((el) => el.remove());
      }, 1500);
    }
    let closed = false;
    const close = () => {
      if (closed) return;
      closed = true;
      boot.classList.add('is-done');
      setTimeout(() => boot.remove(), 400);
    };
    const enter = $('.boot-enter', boot);
    enter.addEventListener('click', close);
    enter.focus({ preventScroll: true });
    document.documentElement.style.overflow = 'hidden';
    boot.addEventListener('transitionend', () => { document.documentElement.style.overflow = ''; }, { once: true });
  }

  /* ---------- Titoli di sezione scritti a macchina quando entrano nello schermo ---------- */

  // Il testo resta visibile finché il titolo non entra nello schermo: se l'animazione
  // non parte, il titolo si legge comunque. Ogni titolo si scrive una volta sola:
  // poi resta scritto, anche scorrendo o tornando sulla pagina (fino a fine visita).
  const typedKey = `typed:${location.pathname}`;
  const typed = new Set(JSON.parse((() => { try { return sessionStorage.getItem(typedKey); } catch { return null; } })() || '[]'));
  const markTyped = (i) => {
    typed.add(i);
    try { sessionStorage.setItem(typedKey, JSON.stringify([...typed])); } catch {}
  };
  const typeTitle = (el) => {
    const full = el.textContent;
    let n = 0;
    el.setAttribute('aria-label', full);
    el.classList.add('is-typing');
    el.textContent = '';
    const tick = setInterval(() => {
      n += 1;
      el.textContent = full.slice(0, n);
      if (n >= full.length) { clearInterval(tick); setTimeout(() => el.classList.remove('is-typing'), 500); }
    }, 45);
  };
  if (!calm && 'IntersectionObserver' in window) {
    const titleObserver = new IntersectionObserver((entries) => {
      for (const { target, isIntersecting } of entries) {
        if (!isIntersecting) continue;
        titleObserver.unobserve(target);
        markTyped(Number(target.dataset.i));
        typeTitle(target);
      }
    }, { rootMargin: '0px 0px -15% 0px' });
    $$('.section-title').forEach((el, i) => {
      if (typed.has(i)) return;
      el.dataset.i = i;
      titleObserver.observe(el);
    });
  }

  /* ---------- Overlay ---------- */

  const CLOSE_MS = { about: 500, menu: 400, contact: 200, 'quick-view': 0 };
  let lastFocus = null;

  function openOverlay(id) {
    const el = document.getElementById(id);
    if (!el || !el.hidden) return;
    // Il menu mobile si chiude quando si apre un altro overlay.
    if (id !== 'menu') closeOverlay('menu', true);
    lastFocus = document.activeElement;
    el.classList.remove('is-closing');
    el.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    const focusable = el.querySelector('input, [data-close]');
    if (focusable) focusable.focus({ preventScroll: true });
    if (id === 'about' && location.hash !== '#about') history.replaceState(null, '', '#about');
  }

  function closeOverlay(id, instant = false) {
    const el = document.getElementById(id);
    if (!el || el.hidden) return;
    const done = () => {
      el.hidden = true;
      el.classList.remove('is-closing');
      if (!$$('.overlay').some((o) => !o.hidden)) document.documentElement.style.overflow = '';
      if (id === 'quick-view') $('.qv-stage', el).innerHTML = '';
    };
    if (id === 'about' && location.hash === '#about') history.replaceState(null, '', location.pathname + location.search);
    const ms = instant ? 0 : CLOSE_MS[id] ?? 0;
    if (!ms) return done();
    el.classList.add('is-closing');
    setTimeout(done, ms);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }

  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-open]');
    if (opener) {
      e.preventDefault();
      openOverlay(opener.dataset.open);
      return;
    }
    const closer = e.target.closest('[data-close]');
    if (closer) {
      e.preventDefault();
      closeOverlay(closer.closest('.overlay').id);
      return;
    }
    // Click fuori dal pannello About o dal box Contact: chiude.
    const ov = e.target.classList.contains('overlay') ? e.target : null;
    if (ov && (ov.id === 'about' || ov.id === 'contact')) closeOverlay(ov.id);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const open = $$('.overlay').filter((o) => !o.hidden).pop();
      if (open) closeOverlay(open.id);
    }
    if (!$('#quick-view').hidden && (e.key === 'ArrowRight' || e.key === 'ArrowLeft')) {
      stepQuickView(e.key === 'ArrowRight' ? 1 : -1);
    }
  });

  const initial = location.hash.slice(1);
  if (['about', 'contact', 'menu'].includes(initial)) openOverlay(initial);

  /* ---------- Contact: apre il client mail ---------- */

  const form = $('.contact-box');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const from = form.from.value.trim();
    const body = `${form.message.value.trim()}\n\n— ${from}`;
    location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(form.dataset.subject)}&body=${encodeURIComponent(body)}`;
    form.reset();
    closeOverlay('contact');
  });

  /* ---------- Link "Top" ---------- */

  $$('[data-top]').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }));

  /* ---------- Video: caricati e riprodotti solo quando visibili ---------- */

  const loadVideo = (v) => {
    if (!v.src && v.dataset.src) v.src = v.dataset.src;
  };

  const videoObserver = new IntersectionObserver((entries) => {
    for (const { target: v, isIntersecting } of entries) {
      if (v.closest('.slide')) continue;
      if (isIntersecting) {
        loadVideo(v);
        v.play().catch(() => {});
      } else if (!v.paused) {
        v.pause();
      }
    }
  }, { rootMargin: '200px 0px' });

  $$('video[data-src]').forEach((v) => videoObserver.observe(v));

  /* ---------- Slideshow home: autoplay 0.9s, pausa al passaggio del mouse ---------- */

  const show = $('.slideshow');
  if (show && getComputedStyle(show).display !== 'none') {
    const slides = $$('.slide', show);
    let i = 0;
    let paused = false;
    // Scorrimento laterale come lo slideshow di Cargo: la slide uscente va a sinistra,
    // la nuova entra da destra.
    const SLIDE_MS = 900;
    // Tempo totale di ogni slide (ferma + scorrimento).
    const INTERVAL_MS = 3200;
    // Didascalia sotto lo schermo: titolo, categoria, anno e barra di caricamento.
    const cap = $('.screen-caption');
    const caption = (slide) => {
      if (!cap) return;
      $('.sc-title', cap).textContent = `[${slide.dataset.title}]`;
      $('.sc-cat', cap).textContent = slide.dataset.cat;
      $('.sc-year', cap).textContent = slide.dataset.year;
      const bar = $('.sc-bar', cap);
      bar.style.setProperty('--dur', `${INTERVAL_MS}ms`);
      bar.classList.remove('is-running');
      void bar.offsetWidth;
      bar.classList.add('is-running');
    };
    const activate = (n) => {
      const prev = slides[i];
      i = (n + slides.length) % slides.length;
      if (prev !== slides[i]) {
        prev.classList.remove('is-active');
        prev.classList.add('is-leaving');
        $('video', prev)?.pause();
        setTimeout(() => {
          prev.classList.add('is-reset');
          prev.classList.remove('is-leaving');
          void prev.offsetWidth;
          prev.classList.remove('is-reset');
        }, SLIDE_MS + 20);
      }
      slides[i].classList.add('is-active');
      caption(slides[i]);
      const v = $('video', slides[i]);
      if (v) { loadVideo(v); v.play().catch(() => {}); }
      const nv = $('video', slides[(i + 1) % slides.length]);
      if (nv) loadVideo(nv);
    };
    activate(0);
    show.addEventListener('mouseenter', () => { paused = true; });
    show.addEventListener('mouseleave', () => { paused = false; });
    // Cambia slide solo quando la successiva è già caricata, per non mostrare vuoti.
    // Le immagini vengono decodificate in anticipo, così la slide appare subito piena.
    slides.forEach((slide) => {
      const img = $('img', slide);
      if (!img) { slide.dataset.ready = '1'; return; }
      img.decode().then(() => { slide.dataset.ready = '1'; }).catch(() => {
        img.addEventListener('load', () => { slide.dataset.ready = '1'; }, { once: true });
      });
    });
    const ready = (slide) => slide.dataset.ready === '1';
    setInterval(() => {
      if (paused || document.hidden) return;
      if (ready(slides[(i + 1) % slides.length])) activate(i + 1);
    }, INTERVAL_MS);
  }

  /* ---------- Quick view ---------- */

  let qvItems = [];
  let qvIndex = 0;

  function renderQuickView() {
    const stage = $('#quick-view .qv-stage');
    const src = qvItems[qvIndex];
    const media = $('img, video', src);
    stage.innerHTML = '';
    if (media.tagName === 'VIDEO') {
      const v = document.createElement('video');
      v.src = media.dataset.src || media.src;
      Object.assign(v, { muted: true, loop: true, autoplay: true, playsInline: true });
      stage.append(v);
    } else {
      const img = document.createElement('img');
      img.src = media.currentSrc || media.src;
      img.alt = media.alt;
      stage.append(img);
    }
    $('#quick-view .qv-count').textContent = `${qvIndex + 1} / ${qvItems.length}`;
    const multi = qvItems.length > 1;
    $('#quick-view .qv-prev').hidden = !multi;
    $('#quick-view .qv-next').hidden = !multi;
  }

  function stepQuickView(d) {
    qvIndex = (qvIndex + d + qvItems.length) % qvItems.length;
    renderQuickView();
  }

  document.addEventListener('click', (e) => {
    const z = e.target.closest('.zoomable');
    if (z && !z.closest('.overlay')) {
      qvItems = $$('.main .zoomable');
      qvIndex = qvItems.indexOf(z);
      if (qvIndex < 0) return;
      renderQuickView();
      openOverlay('quick-view');
      return;
    }
    const qv = e.target.closest('#quick-view');
    if (!qv || e.target.closest('[data-close]')) return;
    if (e.target.closest('.qv-prev')) return stepQuickView(-1);
    if (e.target.closest('.qv-next')) return stepQuickView(1);
    // Click sull'immagine: avanti; click sul fondo bianco: chiude.
    if (e.target.closest('.qv-stage img, .qv-stage video')) return stepQuickView(1);
    closeOverlay('quick-view');
  });

  // Swipe orizzontale su mobile per passare da una foto all'altra.
  let touchX = null;
  const qvEl = $('#quick-view');
  qvEl?.addEventListener('touchstart', (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  qvEl?.addEventListener('touchend', (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) stepQuickView(dx < 0 ? 1 : -1);
  });
})();
