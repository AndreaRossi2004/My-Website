/* ─────────────────────────────────────────────
   Andrea Rossi — Portfolio v2
   Plexus canvas + IDE typewriter + mini terminal
───────────────────────────────────────────── */

/* ─── Plexus canvas (kept from original, refined) ─── */
(function () {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const COUNT = 80;
  const SPEED = 0.28;
  const MAX_DIST = 150;

  let pts = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function init() {
    pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * SPEED,
      vy: (Math.random() - 0.5) * SPEED,
      r: Math.random() * 1.3 + 0.6,
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of pts) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    }
    for (let i = 0; i < pts.length - 1; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d = Math.hypot(dx, dy);
        if (d > MAX_DIST) continue;
        const alpha = (1 - d / MAX_DIST) * 0.42;
        ctx.strokeStyle = `rgba(230, 57, 70, ${alpha})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.stroke();
      }
    }
    ctx.shadowBlur = 6;
    ctx.shadowColor = "#e63946";
    for (const p of pts) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "#ff5a6a";
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    requestAnimationFrame(tick);
  }

  resize();
  init();
  tick();

  window.addEventListener("resize", () => {
    resize();
    init();
  });
})();

/* ─── Scroll reveal ─── */
(function () {
  const obs = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("in-view");
      }),
    { threshold: 0.1 }
  );
  document.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
})();

/* ─── Active nav link on scroll ─── */
(function () {
  const tabs = document.querySelectorAll(".nav a[href^='#']");
  const sections = document.querySelectorAll("section[id]");
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        tabs.forEach((t) => {
          t.classList.toggle(
            "active",
            t.getAttribute("href") === "#" + entry.target.id
          );
        });
      });
    },
    { threshold: 0.45, rootMargin: "-64px 0px 0px 0px" }
  );
  sections.forEach((s) => obs.observe(s));
})();

/* ─── Mini terminal typing word swap ─── */
(function () {
  const el = document.getElementById("status-tw");
  if (!el) return;
  const words = ["freelance", "collaborations", "internships", "new projects"];
  let wi = 0;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  async function type(w) {
    for (let i = 1; i <= w.length; i++) {
      el.textContent = w.slice(0, i);
      await sleep(70 + Math.random() * 35);
    }
  }
  async function erase() {
    const w = el.textContent;
    for (let i = w.length - 1; i >= 0; i--) {
      el.textContent = w.slice(0, i);
      await sleep(38);
    }
  }
  (async function loop() {
    await sleep(1800);
    while (true) {
      await type(words[wi]);
      await sleep(2400);
      await erase();
      await sleep(280);
      wi = (wi + 1) % words.length;
    }
  })();
})();

/* ─── Filter chips (Projects) ─── */
(function () {
  const chips = document.querySelectorAll(".filter-chip");
  const cards = document.querySelectorAll(".proj-card");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      chips.forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      const f = chip.dataset.filter;
      cards.forEach((card) => {
        const tags = (card.dataset.tags || "").split(",");
        const show = f === "all" || tags.includes(f);
        card.style.display = show ? "" : "none";
      });
    });
  });
})();

/* ─── Copy email button ─── */
(function () {
  const btn = document.getElementById("copy-email");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.email);
      const orig = btn.innerHTML;
      btn.innerHTML =
        `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> <span>${(window.__lang || 'it') === 'it' ? 'Copiata!' : 'Copied!'}</span>`;
      btn.style.color = "#3ddc84";
      btn.style.borderColor = "rgba(61,220,132,0.35)";
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.color = "";
        btn.style.borderColor = "";
      }, 1800);
    } catch (e) {}
  });
})();

/* ─── Generate weekly heatmap ─── */
(function () {
  const grid = document.getElementById("heat-grid");
  if (!grid) return;
  // 5 days × 20 weeks = 100 cells; pseudo-random distribution weighted toward red
  // pattern: increasing intensity toward recent weeks
  const cells = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 20; c++) {
      // bias toward higher levels in recent (right-side) weeks
      const recency = c / 20;
      const noise = Math.random();
      let lv;
      const score = recency * 0.55 + noise * 0.6;
      if (score < 0.25) lv = "";
      else if (score < 0.45) lv = "l1";
      else if (score < 0.65) lv = "l2";
      else if (score < 0.85) lv = "l3";
      else lv = "l4";
      cells.push(`<div class="heat-cell ${lv}"></div>`);
    }
  }
  grid.innerHTML = cells.join("");
})();

/* ─── Manifesto: rotating word, counters, pulse row ─── */
(function () {
  const rotator = document.getElementById("m-rotator");
  if (rotator) {
    const words = rotator.querySelectorAll(".m-word");
    let idx = 0;
    setInterval(() => {
      const current = words[idx];
      idx = (idx + 1) % words.length;
      const next = words[idx];
      current.classList.remove("active");
      current.classList.add("leaving");
      next.classList.remove("leaving");
      next.classList.add("active");
      // clear "leaving" after transition so it can re-enter from bottom next cycle
      setTimeout(() => current.classList.remove("leaving"), 800);
    }, 2400);
  }

  // Counters tick up
  function tick(el, to, dur, prefix) {
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = prefix + Math.round(to * eased);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  document.querySelectorAll(".m-counter .num[data-to]").forEach((el, i) => {
    const to = parseInt(el.dataset.to, 10);
    const prefix = el.dataset.prefix || '';
    setTimeout(() => tick(el, to, 1400 + i * 200, prefix), 900 + i * 180);
  });

  // Pulse row: ripple a single "on" through the dots
  const pulse = document.getElementById("pulse-row");
  if (pulse) {
    const dots = pulse.querySelectorAll("span");
    let pi = 0;
    setInterval(() => {
      dots.forEach((d) => d.classList.remove("on"));
      dots[pi].classList.add("on");
      pi = (pi + 1) % dots.length;
    }, 220);
  }
})();

/* ─── Clock in status bar ─── */
(function () {
  const el = document.getElementById("clock");
  if (!el) return;
  function tick() {
    const d = new Date();
    el.textContent = d.toTimeString().slice(0, 5);
  }
  tick();
  setInterval(tick, 30000);
})();

/* ─── Language toggle ─── */
(function () {
  const T = {
    'hero-subline': {
      it: '<span class="red">//</span> Digital developer &amp; designer. Costruisco interfacce <strong>pulite</strong>, sistemi <strong>solidi</strong> e prodotti web che hanno un\'<strong>identità</strong>.',
      en: '<span class="red">//</span> Digital developer &amp; designer. I build <strong>clean</strong> interfaces, <strong>solid</strong> systems and web products with a distinct <strong>identity</strong>.',
    },
    'btn-primary':   { it: 'Esplora i progetti', en: 'Explore projects' },
    'btn-ghost':     { it: 'Contattami',          en: 'Contact me' },
    'm-prefix':      { it: '// Costruisco',        en: '// I build' },
    'mword-0': { it: 'interfacce', en: 'interfaces' },
    'mword-1': { it: 'esperienze', en: 'experiences' },
    'mword-2': { it: 'prodotti',   en: 'products' },
    'mword-3': { it: 'strumenti',  en: 'tools' },
    'mword-4': { it: 'storie',     en: 'stories' },
    'about-h2': {
      it: 'Costruisco<br>prodotti digitali<span class="accent">.</span>',
      en: 'I build<br>digital products<span class="accent">.</span>',
    },
    'about-p1': {
      it: 'Studente presso <strong>ITS Digital Academy</strong>, appassionato di tecnologia, design e innovazione digitale. Cerco di unire <strong>estetica</strong> e <strong>funzionalità</strong> in ogni progetto.',
      en: 'Student at <strong>ITS Digital Academy</strong>, passionate about technology, design and digital innovation. I aim to blend <strong>aesthetics</strong> and <strong>functionality</strong> in every project.',
    },
    'about-p2': {
      it: 'Mi occupo di sviluppo web end-to-end, dalla progettazione dell\'interfaccia alle logiche applicative, con un\'attenzione costante all\'esperienza utente e ai dettagli visivi.',
      en: 'I work on end-to-end web development, from interface design to application logic, with constant attention to user experience and visual details.',
    },
    'proj-desc-1': {
      it: 'Sito personale sviluppato come CV digitale, con canvas plexus, effetto parallax e un\'estetica developer-tools curata nei minimi dettagli.',
      en: 'Personal site built as a digital CV, with a plexus canvas, parallax effect and a meticulously crafted developer-tools aesthetic.',
    },
    'proj-desc-2': {
      it: 'Interfaccia utente per piattaforma e-commerce con carrello dinamico, filtri prodotto e checkout flow, componenti tipizzati.',
      en: 'User interface for an e-commerce platform with a dynamic cart, product filters and checkout flow, typed components.',
    },
    'proj-desc-3': {
      it: 'Dashboard interattiva per visualizzazione dati in real-time, con grafici dinamici, filtri avanzati e architettura a moduli.',
      en: 'Interactive dashboard for real-time data visualization, with dynamic charts, advanced filters and a modular architecture.',
    },
    'contacts-h2': {
      it: 'Parliamo<span class="accent">.</span><br>Costruiamo<br>qualcosa.',
      en: 'Let\'s talk<span class="accent">.</span><br>Let\'s build<br>something.',
    },
    'contacts-p': {
      it: 'Sono disponibile per <strong style="color:var(--fg)">collaborazioni</strong>, <strong style="color:var(--fg)">stage</strong> e nuove opportunità. Rispondo sempre entro 24h.',
      en: 'I\'m available for <strong style="color:var(--fg)">collaborations</strong>, <strong style="color:var(--fg)">internships</strong> and new opportunities. I always reply within 24h.',
    },
    'copy-email-btn': { it: 'Copia email', en: 'Copy email' },
  };

  function applyLang(l) {
    window.__lang = l;
    localStorage.setItem('lang', l);
    document.documentElement.lang = l;
    const activeEl   = document.getElementById('lang-active');
    const inactiveEl = document.getElementById('lang-inactive');
    if (activeEl)   activeEl.textContent   = l.toUpperCase();
    if (inactiveEl) inactiveEl.textContent = l === 'it' ? 'EN' : 'IT';
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const t = T[el.dataset.i18n];
      if (t) el.innerHTML = t[l];
    });
  }

  window.__lang = localStorage.getItem('lang') || 'it';
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.addEventListener('click', () => applyLang(window.__lang === 'it' ? 'en' : 'it'));
  applyLang(window.__lang);
})();

/* ─── Hero title glitch ─── */
(function () {
  setTimeout(() => {
    const spans = Array.from(document.querySelectorAll(".hero h1 .name-line span"));

    // amber (#ffb700) vs electric blue (#00cfff) — uncommon split, pops on dark navy
    const frames = [
      { opacity: "1",   transform: "translate(-14px,0) skewX(-12deg)", textShadow: "14px 0 rgba(0,207,255,1),  -14px 0 #ffb700",  filter: "blur(1px)" },
      { opacity: "0",   transform: "translate(0,0)",                   textShadow: "none",                                         filter: "" },
      { opacity: "1",   transform: "translate(12px,0) skewX(10deg)",   textShadow: "-12px 0 rgba(0,207,255,1),  12px 0 #ffb700",   filter: "" },
      { opacity: "0",   transform: "translate(-4px,0)",                textShadow: "none",                                         filter: "" },
      { opacity: "1",   transform: "translate(-10px,0) skewX(-8deg)",  textShadow: "10px 0 rgba(0,207,255,.9), -10px 0 #ffb700",   filter: "blur(2px)" },
      { opacity: "0.2", transform: "translate(6px,0)",                 textShadow: "none",                                         filter: "" },
      { opacity: "1",   transform: "translate(-8px,0) skewX(6deg)",    textShadow: "8px 0 rgba(0,207,255,.7),  -8px 0 #ffb700",    filter: "" },
      { opacity: "0",   transform: "translate(0,0)",                   textShadow: "none",                                         filter: "" },
      { opacity: "1",   transform: "translate(-5px,0) skewX(-4deg)",   textShadow: "5px 0 rgba(0,207,255,.5),  -5px 0 #ffb700",    filter: "" },
      { opacity: "0.7", transform: "translate(3px,0)",                 textShadow: "none",                                         filter: "" },
      { opacity: "1",   transform: "translate(-2px,0) skewX(-2deg)",   textShadow: "2px 0 rgba(0,207,255,.3)",                     filter: "" },
      { opacity: "1",   transform: "translate(0,0)",                   textShadow: "none",                                         filter: "" },
    ];

    const busy = new Set();

    function glitch() {
      const available = spans.filter((s) => !busy.has(s));
      if (available.length) {
        const span = available[Math.floor(Math.random() * available.length)];
        busy.add(span);
        let fi = 0;
        const timer = setInterval(() => {
          const f = frames[fi];
          span.style.opacity    = f.opacity;
          span.style.transform  = f.transform;
          span.style.textShadow = f.textShadow;
          span.style.filter     = f.filter;
          fi++;
          if (fi >= frames.length) {
            clearInterval(timer);
            span.style.opacity    = "";
            span.style.transform  = "";
            span.style.textShadow = "";
            span.style.filter     = "";
            busy.delete(span);
          }
        }, 45);
      }

      setTimeout(glitch, 4000 + Math.random() * 3000);
    }

    glitch();
  }, 2200);
})();
