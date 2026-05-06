# VitaCodex Pitch Experience v1

Interactive pitch website for VitaCodex — a genomic intelligence layer that transforms raw SNP data into clinical insights.

Built with **React 18 + TypeScript + Vite + Tailwind CSS + Framer Motion**.

---

## Running locally

### Option A — Standalone HTML (no install needed)

Open `index_standalone.html` directly in any browser — it uses CDN React + Framer Motion with Babel transpilation.
Double-click the file or drag it into Chrome/Edge/Firefox.

> Best for quick demos. The full Vite project (Option B) gives better performance and hot-reload for development.

---

### Option B — Full React + TypeScript (recommended)

#### Prerequisites

**Install Node.js first** (if not already installed):

1. Go to https://nodejs.org/en/download — download the **LTS** (Long Term Support) installer
2. Run the installer, keep all defaults, click Next/Finish
3. **Restart your terminal** (PowerShell or cmd) after installing
4. Verify: open a new terminal and run:

```powershell
node -v   # should print v18.x or v20.x
npm -v    # should print 9.x or 10.x
```

#### 1 — Install dependencies

Open a terminal in this folder and run:

```bash
npm install
```

This installs React, Framer Motion, Vite, Tailwind and all dev dependencies (~30 seconds).

### 2 — Start the dev server

```bash
npm run dev
```

Vite will print something like:

```
  VITE v5.x  ready in 400ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.x.x:5173/
```

Open **http://localhost:5173** in your browser.

### 3 — Stop the server

Press `Ctrl + C` in the terminal.

---

## Build for production (optional)

```bash
npm run build
```

Output goes to `dist/`. Serve it with:

```bash
npm run preview
# → http://localhost:4173
```

Or deploy the `dist/` folder to Vercel, Netlify, or any static host.

---

## Project structure

```
vitacodex_pitch_v1/
├── index.html              # Entry HTML (fonts, meta)
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.tsx            # React root
    ├── App.tsx             # Layout + background
    ├── index.css           # Tailwind base + scrollbar
    ├── data.ts             # All content: markers, pipeline, market, ICPs
    └── components/
        ├── Nav.tsx         # Sticky glassmorphism nav
        ├── Hero.tsx        # Full-viewport hero + YouTube embed + DNA SVG
        ├── TickerBar.tsx   # Scrolling raw SNP ticker
        ├── TransformDemo.tsx  ← THE WOW PIECE (interactive slider)
        ├── HowItWorks.tsx  # 3-step pipeline architecture
        ├── Business.tsx    # Market + ICP + revenue model
        └── Footer.tsx      # CTA + links
```

---

## The interactive demo (TransformDemo)

The centerpiece of the pitch. Three panels:

| Left | Center | Right |
|------|--------|-------|
| Raw terminal — `vita query --snp rs7903146` | Pipeline steps (SNP → Cluster → Vita) | Vita's interpreted output |

**Drag the slider** from left to right to reveal:
- `0 – 33%` → raw SNP data visible, output panel dim
- `33 – 66%` → cluster card fades in, confidence bar fills
- `66 – 100%` → Vita's insight types out character-by-character, action + API mock appear

Click **auto-play transformação** to watch it animate through automatically.

Switch between 3 curated SNPs: **TCF7L2** (glycemia), **COMT** (neuroscience), **APOE** (cardiovascular).

---

## Content edits

All pitch content lives in `src/data.ts`:
- `MARKERS` — the 3 SNPs with terminal lines, insight text, action
- `PIPELINE_STEPS` — the 3 architecture steps
- `MARKET` — TAM/SAM/SOM values
- `ICPS` — the 4 customer profiles

Edit there, save, and Vite hot-reloads instantly.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `npm install` fails | Update Node: `node -v` must be ≥ 18 |
| Port 5173 in use | Change port: `npm run dev -- --port 3000` |
| Fonts don't load | Needs internet connection (Google Fonts CDN) |
| White screen | Open browser console (F12) for errors |

---

## Tech stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 18.3 | UI framework |
| TypeScript | 5.5 | Type safety |
| Vite | 5.3 | Dev server + bundler |
| Tailwind CSS | 3.4 | Utility styling |
| Framer Motion | 11.3 | Animations |
| JetBrains Mono | — | Terminal / code font |
| Syne | — | Brand / display font |

---

*VitaCodex · Startup One FIAP · 2025*
