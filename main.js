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
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Copiata';
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
  function tick(el, to, dur) {
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.round(to * eased);
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  document.querySelectorAll(".m-counter .num").forEach((el, i) => {
    const to = parseInt(el.dataset.to, 10);
    setTimeout(() => tick(el, to, 1400 + i * 200), 900 + i * 180);
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
