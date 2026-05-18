# Andrea Rossi — Portfolio Website · Documentazione Progetto

> Questo file è il punto di partenza per qualsiasi agente AI o sviluppatore che entra nel progetto.
> Contiene tutto il contesto necessario, la storia delle modifiche e le decisioni architetturali.
> **Aggiornalo ad ogni sessione di lavoro significativa.**

---

## Panoramica

Portfolio digitale personale di **Andrea Rossi**, studente ITS Digital Academy.
Funziona come CV digitale con design sofisticato, animazioni fluide e presentazione interattiva dei progetti.

- **Estetica**: developer-tools ispirata a VS Code e n8n — dark navy + accent rosso
- **Filosofia**: "Less, but better" (Dieter Rams) — codice minimalista, nessuna dipendenza
- **Repo GitHub**: `git@github.com:AndreaRossi2004/My-Website.git`
- **Branch principale**: `main` (il branch di lavoro locale è `master`)
- **Anno sito**: © 2026

---

## Stack Tecnologico

| Layer | Tecnologia |
|-------|-----------|
| Markup | HTML5 semantico |
| Stile | CSS3 puro (custom properties, grid, flexbox, backdrop-filter) |
| Script | Vanilla JavaScript ES6+ |
| Font | Google Fonts — Inter (400–900), DM Mono (400–500) |
| Build | **Nessuno** — file statici diretti, no npm, no bundler |
| Hosting | Statico (serve con `python -m http.server` o qualsiasi server statico) |

**Zero dipendenze NPM. Zero build process. Zero framework.**

---

## Struttura File

```
site/
├── src/
│   ├── index.html      # Unico file HTML — tutta la struttura del sito
│   ├── main.js         # Tutti gli script JS (~320 righe)
│   └── style.css       # Tutti gli stili CSS (~1580 righe)
├── docs/
│   └── PROJECT.md      # ← Questo file
└── .claude/
    └── settings.local.json
```

---

## Design System

### Palette Colori

```css
/* Background (navy scuro) */
--bg-0: #050811         /* Sfondo principale */
--bg-1: #070b14
--bg-2: #0d1422
--bg-3: #131a2a
--bg-card: rgba(8, 12, 22, 0.55)

/* Accent primario */
--red: #e63946          /* Rosso principale — usato ovunque */
--red-2: #ff5563        /* Hover variant */
--red-soft: rgba(230, 57, 70, 0.12)

/* Status colors */
--green: #3ddc84        /* Online / live */
--amber: #f5b14c        /* Work in progress */
--blue: #7ec8e3         /* Accent secondario */
--purple: #b48cf2       /* Accent terziario */

/* Foreground */
--fg: #ffffff
--fg-2: rgba(255,255,255,0.72)
--fg-3: rgba(255,255,255,0.48)
--fg-4: rgba(255,255,255,0.28)
--muted: #8a9bb5

/* Linee/bordi */
--line: rgba(255,255,255,0.06)
--line-strong: rgba(255,255,255,0.10)
--line-red: rgba(230,57,70,0.32)
```

### Tipografia

```css
--font-body: "Inter"      /* Testo, titoli, UI */
--font-mono: "Inter"      /* Anche la mono usa Inter (scelta stilistica) */
--font-data: "DM Mono"    /* Numeri, codice, etichette mono */

--nav-h: 64px             /* Altezza navbar fissa */
--status-h: 28px          /* Altezza statusbar (VS Code style) */
```

### Effetti Visivi Distintivi

- **Canvas plexus**: 80 punti che si muovono e si connettono con linee rosse (z-index 2, mix-blend-mode: screen)
- **Grid overlay**: pattern a griglia 64×64px semi-trasparente fisso
- **Corner crosshairs**: angoli rossi sui card (`::before` / `::after`) — estetica dossier
- **Backdrop blur**: 8–14px su navbar, card, contact-links
- **Ambient orbs**: blob blurrati rosso/viola animati nel manifesto hero
- **Glow effect**: text-shadow rosso 50px sul titolo hero h1
- **Glitch effect**: animazione h1 con skew + text-shadow cyan/amber ogni 4–7s
- **Blink cursor**: cursore rosso che lampeggia (`.cur`, `.dossier-now .val::after`)

---

## Sezioni del Sito

### 01 — Hero (`#home`)

Layout a griglia 2 colonne (1.1fr + 0.9fr), full-height meno navbar.

**Colonna sinistra:**
- Badge "available for work" con dot verde pulsante
- `<h1>` animato lettera per lettera (`--i` CSS var + `animation-delay`)
- Subline con syntax comment `//` in rosso
- Meta grid: Role / Location / Now
- CTA buttons: primario rosso + ghost

**Colonna destra — Manifesto Card (`.manifesto`):**
- Prefisso `// Costruisco` + parola rotatrice animata ogni 2.4s
  - Parole: interfacce, esperienze, prodotti, strumenti, storie
  - Transizione: translateY(100%) → translateY(0) → translateY(-110%)
- Counters animati: 12 Projects, 847 Commits/year, 3 Years building
- Footer con pulse row (dot che si accendono in sequenza) + label "currently"
- Ambient orbs (orb-a rosso top-right, orb-b viola bottom-left)

### 02 — About (`#about`)

Layout a griglia 2 colonne (1fr + 1.1fr).

**Bio sinistra:**
- h2: "Sono Andrea. / Costruisco / prodotti digitali."
- 2 paragrafi descrittivi
- Quote Dieter Rams con border-left rosso

**Destra — Tech Marquee:**
- 2 track infiniti sovrapposti (uno in direzione inversa)
- Track 1 (forward): HTML5, CSS3, JS, TypeScript, React, Next.js, Node.js, Tailwind
- Track 2 (reverse): Figma, Git, UI Design, UX Research, Motion, REST API, Vite, Postman
- Fade ai bordi con `mask-image: linear-gradient`
- Velocità: 38s e 46s per ciclo completo

### 03 — Projects (`#projects`)

Toolbar con filter chips: `all · 3`, `web`, `ui`, `data`

**3 project cards:**

| # | Titolo | Status | Tech | Tags |
|---|--------|--------|------|------|
| 01 | Portfolio Website | ● live | JavaScript v2.6 | web, ui |
| 02 | E-Commerce UI | ● in progress | React v0.4 | web, ui |
| 03 | Dashboard Analytics | ● live | Node.js v1.2 | data, ui |

Ogni card ha: icon numerato, status badge, slug repo, descrizione, stats (lang, stars, versione), tag, link View/Code/Live.

**Hover card**: translateY(-4px), border rosso, top bar animata (width: 0 → 100%).

### 04 — Contacts (`#contacts`)

Layout 2 colonne (0.95fr + 1.05fr).

**Sinistra:**
- h2: "Parliamo. / Costruiamo / qualcosa."
- Paragrafo disponibilità (collaborazioni, stage, opportunità, risposta entro 24h)
- Bottone "Copia email" con feedback visivo (checkmark verde, reset 1.8s)
  - Email: `andrea.rossi@allievi.itsdigitalacademy.com`

**Destra — Contact Links:**
- Email: `andrea.rossi@allievi.itsdigitalacademy.com`
- LinkedIn: `linkedin.com/in/andrea-rossi` *(link placeholder `#`)*
- GitHub: `github.com/andrea-rossi` *(link placeholder `#`)*
- Telegram: `t.me/andrea_rossi` *(link placeholder `#`)*

**Nota**: i link social (LinkedIn, GitHub, Telegram) usano `href="#"` — vanno aggiornati con URL reali.

### Footer

```
ANDREA ROSSI  |  © 2026 — Built & designed with care.  |  LinkedIn · GitHub
```

---

## JavaScript — Moduli Funzionali

Tutti gli script sono in `src/main.js` come IIFE anonime. Nessun modulo ES6, nessun bundler.

### 1. Plexus Canvas Animation
- Canvas fisso full-viewport, z-index 2, mix-blend-mode: screen, opacity 0.55
- 80 punti (`COUNT=80`), velocità `SPEED=0.28`, distanza max connessione `MAX_DIST=150`
- Bounce ai bordi, linee rosse con alpha `(1 - d/MAX_DIST) * 0.42`
- Particelle rosse con glow (`shadowBlur=6, shadowColor="#e63946"`)
- Reinizializza su resize

### 2. Scroll Reveal (`IntersectionObserver`)
- Osserva elementi `.reveal`, aggiunge `.in-view` a threshold 0.1
- Delay scalati via classi: `reveal-d1` (0.05s), `reveal-d2` (0.15s), `reveal-d3` (0.25s), `reveal-d4` (0.35s)
- CSS: `opacity: 0; transform: translateY(28px)` → `opacity: 1; transform: none`

### 3. Active Nav Link
- IntersectionObserver su `section[id]`, threshold 0.45, rootMargin "-64px 0px 0px 0px"
- Aggiorna classe `.active` sui link nav corrispondenti

### 4. Mini Terminal Typing (word swap)
- Target: `#status-tw` (elemento non presente nell'HTML attuale — codice legacy/unused)
- Cicla: freelance, collaborations, internships, new projects
- Typewriter con delay random 70–105ms per carattere, erase 38ms per carattere

### 5. Filter Chips (Projects)
- Click su `.filter-chip` → attiva filtro, nasconde card (`display: none`) in base a `data-tags`
- Filtri: all, web, ui, data

### 6. Copy Email Button
- `#copy-email` con `data-email` attribute
- Clipboard API → feedback: checkmark SVG + colore verde → reset 1.8s

### 7. Weekly Activity Heatmap
- Target: `#heat-grid` (non presente nell'HTML attuale — CSS styles presenti ma elemento rimosso)
- 5 righe × 20 colonne = 100 celle, intensità pseudo-random pesata verso le settimane recenti
- Livelli: l1 (0.18 opacity), l2 (0.40), l3 (0.65), l4 (1.0)

### 8. Manifesto: Rotating Word + Counters + Pulse Row
- **Word rotator** (`#m-rotator`): ogni 2.4s cicla le `.m-word`, animazione translateY
- **Counters**: easing `1 - (1-t)^3`, durata 1.4–1.8s, ritardo 0.9–1.26s
- **Pulse row** (`#pulse-row`): non presente nell'HTML attuale, codice legacy

### 9. Clock (`#clock`)
- Non presente nell'HTML attuale — aggiornato ogni 30s (codice legacy statusbar)

### 10. Hero Title Glitch
- Glitch su span casuali di `.hero h1 .name-line span`
- 12 frame da 45ms: translate + skewX + text-shadow cyan (#00cfff) / amber (#ffb700)
- Interval randomico: ogni 4–7s, max 1 span per volta (`busy` Set)
- Inizia dopo 2.2s dal caricamento pagina

---

## CSS — Pattern Rilevanti

### Animazioni Entry

```css
@keyframes letter-in { from { opacity:0; transform:translateY(28px) } to { opacity:1; transform:none } }
@keyframes title-in  { from { opacity:0; transform:translateY(14px) } to { opacity:1; transform:none } }
@keyframes fill-in   { to { transform: scaleX(1) } }  /* skill level bars */
@keyframes marquee   { from { transform:translateX(0) } to { transform:translateX(-50%) } }
@keyframes drift-a/b /* orbs manifesto, 14s e 18s alternate */
@keyframes blink     /* cursore, 1s step-end */
@keyframes pulse     /* dot verde pulsante, 2s */
@keyframes page-fade /* fade-in body al carico, 0.7s */
```

### Layout Responsive

- Breakpoint principale: `1024px` → hero, about-grid, contacts-grid passano a 1 colonna
- Mobile: `700px` → padding ridotti, h1 ridimensionato, elementi nascosti

### Elementi CSS in Stile (ma senza HTML corrispondente)

Ci sono stili per componenti che erano presenti in versioni precedenti ma ora mancano dal HTML:
- `.ide-card`, `.ide-bar`, `.ide-tabbar`, `.ide-body`, `.gutter`, `.code` — IDE card (rimosso)
- `.dossier`, `.dossier-head`, `.dossier-portrait` — Dossier card (rimosso)
- `.skills-board`, `.lvl-list`, `.lvl`, `.heat`, `.heat-grid`, `.now-learning` — Skills board (rimosso)
- `.statusbar` — VS Code status bar in basso (rimossa)
- `.brand`, `.brand-mark` — Logo/brand in navbar (rimosso)
- `.nav-cta` — CTA button in navbar (rimosso)
- `.signals` — Grid disponibilità contacts (rimossa)
- `.mini-term` — Mini terminale (rimosso)
- `.profile-card`, `.skill-grid`, `.skill-chip` — Profile card about (rimossa)

Questi stili **non sono da rimuovere** senza valutare se i componenti corrispondenti potrebbero essere reintrodotti.

---

## Info Autore e Contatti

| Campo | Valore |
|-------|--------|
| Nome | Andrea Rossi |
| Email | andrea.rossi@allievi.itsdigitalacademy.com |
| Scuola | ITS Digital Academy |
| Ruolo | Digital Developer / Designer |
| Location | Italia · UTC+1 |
| GitHub (repo) | AndreaRossi2004 |
| LinkedIn | linkedin.com/in/andrea-rossi *(da verificare)* |
| Telegram | t.me/andrea_rossi *(da verificare)* |

---

## Stato Attuale Link

| Link | Destinazione | Stato |
|------|-------------|-------|
| Mailto email | `andrea.rossi@allievi.itsdigitalacademy.com` | ✅ Reale |
| Copy email btn | `andrea.rossi@allievi.itsdigitalacademy.com` | ✅ Reale |
| LinkedIn nav footer | `#` | ⚠️ Placeholder |
| GitHub nav footer | `#` | ⚠️ Placeholder |
| LinkedIn contact | `#` | ⚠️ Placeholder |
| GitHub contact | `#` | ⚠️ Placeholder |
| Telegram contact | `#` | ⚠️ Placeholder |
| Proj 01 View/Code/Live | `#` | ⚠️ Placeholder |
| Proj 02 View/Code/Live | `#` | ⚠️ Placeholder |
| Proj 03 View/Code/Live | `#` | ⚠️ Placeholder |

---

## Git — Storia e Stato

```
Branch locale:  master
Branch remoto:  main (origin: git@github.com:AndreaRossi2004/My-Website.git)
Commit totali:  6
Autore:         AndreaRossi2004 (rossi.andrea200439@gmail.com)
```

---

## Changelog — Evoluzione del Sito

> Aggiorna questa sezione ogni volta che apporti modifiche significative.
> Formato: `YYYY-MM-DD — Descrizione breve`

### v2.3 (2026-05-18)
- About h2 accorciato: rimossa riga "Sono Andrea." (ridondante con hero), rimangono "Costruisco / prodotti digitali." — aggiornata anche la traduzione EN ("I build / digital products.")
- About paragrafi: rimosso `max-width: 540px`, sostituito con `padding-right: 32px` per più respiro orizzontale
- Counter manifesto: `∞` sostituito con `+99` (più leggibile, linguaggio UI badge), rimossa classe/regola `.num-inf`
- Aggiunto `.gitignore` con `.claude/` escluso dal tracking Git

### v2.2 (2026-05-18)
- Sostituiti counter falsi nel manifesto hero con valori onesti:
  - `∞ Ideas in backlog` (era "12 Projects shipped")
  - `01 Degree in progress` (era "847 Commits / year")
  - `3 Years building` (invariato, con animazione count-up)
- Fix JS: selettore counter animati aggiornato a `.num[data-to]` per saltare i valori statici

### v2.1 (2026-05-18)
- Aggiunto language toggle IT/EN in alto a destra nella navbar
  - Bottone `.lang-toggle` posizionato con `position: absolute; right: ...`
  - Tutte le sezioni traducibili marcate con `data-i18n` nel HTML
  - Modulo JS con oggetto `T` (translations) e funzione `applyLang(l)`
  - Lingua persistita in `localStorage('lang')`, default `'it'`
  - `window.__lang` come stato condiviso tra i moduli IIFE
  - Feedback "Copiata!" / "Copied!" nel copy-email button

### v2 (attuale — 2026-05)
- Refactor completo dell'hero: rimosso IDE card e Dossier card, sostituiti con Manifesto kinetic card
- About section: rimosso profile.json IDE card e skills board, sostituiti con tech marquee
- Navbar semplificata: rimossi brand logo, status bar VS Code e nav-cta button
- Aggiunto effetto glitch cinematico sull'h1 (cyan + amber, 12 frame)
- Manifesto: rotating words, counters animati, ambient orbs
- Footer pulito: solo nome, copyright, link social

### v1 (storico — componenti rimossi)
- Hero con IDE card simulata (profile.js) e Dossier card con ritratto/placeholder
- About con profile.json IDE card e skills board (level meters + heatmap)
- Status bar VS Code in basso con clock, branch, typing animation
- Navbar con brand mark, brand text, nav-cta button
- Mini terminal con typewriter animation (`#status-tw`)

---

## To-Do e Miglioramenti Futuri

### Urgenti
- [ ] Aggiornare tutti i link social/GitHub/LinkedIn con URL reali
- [ ] Aggiungere URL reali ai progetti (View project, Code, Live)
- [ ] Aggiungere foto profilo reale (attualmente nessuna immagine nel sito)

### Miglioramenti UI
- [ ] Aggiungere sezione per competenze/certificazioni
- [ ] Considerare l'aggiunta di un blog/note sezione
- [ ] Dark/light mode toggle (opzionale)

### Tecnici
- [ ] Aggiungere favicon personalizzata
- [ ] Meta tags OG (Open Graph) per condivisione social
- [ ] Performance: lazy-load font, preload critici

### Contenuto
- [ ] Aggiornare i counter (12 Projects, 847 Commits, 3 Years) con dati reali quando cambiano
- [ ] Aggiungere nuovi progetti quando completati
- [ ] Aggiornare il badge "now" (ITS Digital Academy) al termine del percorso

---

## Note per Agenti AI

### Come lavorare su questo progetto

1. **Nessun build step**: modifica direttamente `src/index.html`, `src/main.js`, `src/style.css`
2. **Per testare**: apri `src/index.html` in browser o usa `python -m http.server` dalla root
3. **CSS custom properties**: tutte le variabili sono in `:root` — usa quelle invece di colori hardcoded
4. **Stile JS**: IIFE anonime (`(function(){...})()`), no moduli, no `import/export`
5. **Responsive**: testa sempre a 1024px e 700px dopo modifiche layout
6. **Animazioni**: usa `requestAnimationFrame` per animazioni canvas, `IntersectionObserver` per scroll, CSS `@keyframes` per tutto il resto

### Cosa NON fare
- Non introdurre dipendenze npm senza esplicita richiesta
- Non aggiungere bundler o build tools senza esplicita richiesta
- Non rimuovere CSS di componenti legacy senza valutare il rischio (potrebbero essere reintrodotti)
- Non modificare i valori delle CSS custom properties senza considerare l'impatto globale

### Pattern CSS da rispettare
- Usa `clamp()` per font-size e padding responsivi
- Usa `backdrop-filter: blur()` sui card semi-trasparenti
- Bordi card: sempre `1px solid var(--line)` o `var(--line-strong)` o `var(--line-red)`
- Corner crosshairs: pattern `::before` / `::after` con `border: 1px solid var(--red)`
- Hover su card: `translateY(-4px)` + box-shadow + border-color change
