# $CARPET — Website

The official website for **$CARPET** on Ink. Static HTML/CSS/JS — deploys to GitHub Pages with zero build step.

> Not a rug. A carpet.

---

## Project Structure

```
carpet-site/
├── index.html              # Home / Hero
├── pages/
│   ├── manifesto.html      # The Carpet Movement
│   ├── comic.html          # Visual story (uses comic images)
│   └── buy.html            # Buy + tokenomics + chart embed
├── css/
│   └── style.css           # All styles
├── js/
│   └── main.js             # Copy CA, scroll reveal
├── assets/
│   └── img/                # Place comic + brand images here
├── .nojekyll               # Tells GH Pages: don't run Jekyll
├── .gitignore
└── README.md
```

---

## Local Preview

From inside `carpet-site/`:

```bash
# Python (built in on macOS/Linux)
python3 -m http.server 8000

# Then open: http://localhost:8000
```

---

## Required Images

Drop these into `assets/img/`. The pages use `onerror` fallbacks, so missing images won't break the site — but it'll look better filled in.

| Filename | Used on | Purpose |
|---|---|---|
| `favicon.png` | All pages | Browser tab icon |
| `og.png` | Home (meta) | Social share preview (1200x630) |
| `carpet-stack.png` | Home | Hero side art (the dripping carpet stack) |
| `01-not-a-rug.png` | Comic | Panel 1 — "NOT A RUG. A CARPET." |
| `02-market-bleeding.png` | Comic | Panel 2 — "THE MARKET IS BLEEDING…" |
| `03-whales-roll.png` | Comic | Panel 3 — "WHALES DON'T WALK. THEY ROLL." |
| `04-pov-sold.png` | Comic | Panel 4 — "POV: YOU SOLD AT 5K" |
| `05-respect-the-kraken.png` | Comic | Panel 5 — "RESPECT THE KRAKEN" |
| `06-buy-back-lower.png` | Comic | Panel 6 — "I'LL BUY BACK LOWER…" |
| `07-still-unrolling.png` | Comic | Panel 7 — "FIRST 10K WAS THE WARMUP" |

---

## Deploy to GitHub Pages

1. Create a new repo on GitHub (e.g. `carpetonink/carpet-site`).
2. From inside `carpet-site/`:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: roll out the carpet"
   git branch -M main
   git remote add origin git@github.com:YOUR_USER/carpet-site.git
   git push -u origin main
   ```
3. In the GitHub repo: **Settings → Pages → Build from branch → main / root → Save**.
4. Wait ~1 min. Site will be at `https://YOUR_USER.github.io/carpet-site/`.

### Custom domain (optional)
- Add a file `CNAME` containing your domain (e.g. `carpetonink.com`).
- Point your DNS `A` records to GitHub Pages IPs (185.199.108.153 … 111.153) and add a `CNAME` record for `www`.

---

## Links Wired In

- Contract: `0xAE85c305034b9F11fBbc772172415f25ff30DAb8`
- Chain: **Ink**
- DexScreener: https://dexscreener.com/ink/0xa00a201fabf48776d5d058a4b6fbd8c8a263a4aa
- X: https://x.com/CarpetonINK
- Telegram: https://t.me/carpetoninkportal

---

## Editing

- All copy lives directly in the HTML — no templating, no build step.
- Brand colors live at the top of `css/style.css` in the `:root` block.
- To change the contract address everywhere, search/replace `0xAE85c305034b9F11fBbc772172415f25ff30DAb8`.

Stay grounded.
