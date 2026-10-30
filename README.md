# Nigga Its Over ($NIO) — niggaitsover.vip

Static parody meme-coin site (HTML + CSS + vanilla JS, no build step) deployed on Vercel.

**Status at launch:** CA = **0x189b14fd8068003041625642f9ffc3d7adab0938** (Robinhood Chain) · Buy = Uniswap · Chart = DexScreener · X = **https://x.com/NiggaItsOver_RH** · Telegram = **none** (no Telegram UI anywhere) · Meme vault = **0** (Soon).

## Concept & PLAYBOOK archetypes
Reference: `/workspace/site_study/PLAYBOOK.md` §3.

- **D. Concept / narrative experience (primary).** Metaphor sentence: *"the site is the last LIVE broadcast before the timeline ends."* Every element follows it: a sticky crash-red **LIVE chyron** with the real numbers, scanlines + grain, a **hero that is the meme itself** (Impact top caption, B&W grin, Impact bottom caption), a TV **lower-third** holding `$NIO` + the CA pill, a "broadcast log" timeline, and an end card ("Programming will not resume").
- **B. Dark cinematic / lore dossier (secondary).** Near-black page, condensed uppercase display type, mono HUD labels, numbered chapters (`// 01 · The face` …), a three-act timeline rail, and restrained UI.
- **Palette:** mono black/white plus a **crash-red** accent (`#e11d2a`) only. No lime, gold, glass, or sticker pastel, so the visual DNA doesn't overlap Funds-are-SAFU, BTC, AgenC, or Float Inu.
- **Type:** Anton (Impact stand-in, white fill with a heavy black `-webkit-text-stroke` + `paint-order`) and IBM Plex Mono. Both are self-hosted woff2.

## Sections
1. LIVE chyron + sticky nav (X live, Buy Soon)
2. Hero: Impact `NIGGA` / B&W grin / `IT'S OVER`, crash-line SVG, lower-third `$NIO` + CA (copyable), Buy / Chart live, X live
3. Lore (`DESCRIPTION.md` long description) + stats
4. Timeline: all **8** posts from `NARRATIVE_TWEETS.md` as official X embeds (`blockquote.twitter-tweet`, `data-theme="dark"`, `widgets.js` lazy-loaded), each paired with **site-owned media** (`img/tweet-media/*-web.mp4` + `.webp` poster; #8 is a still)
5. Receipts: 10 posts from `NEWS_TWEETS.md`, quoted verbatim (trimmed with "…") and linked to the original posts, labeled as third-party reporting
6. Tape: origin, No Russian parody, CZ face-swap, heatmap mosaic, N I O dance (muted autoplay while on screen)
7. Meme vault: **0 memes / Soon** (empty on purpose; `memes/` will come from Lightning later)
8. How to buy (Soon), FAQ, end card with banner, footer parody disclaimer

## Going live later (edit `js/main.js` → `CONFIG`)
```js
ca: null,    // set the CA → CA pill + Copy, Buy (Uniswap RH) and Chart (DexScreener) switch on
xUrl: null,  // set the real https://x.com/<handle> → X button switches on
```
Buy pattern: `https://app.uniswap.org/swap?outputCurrency=<CA>&chain=robinhood` · Chart: `https://dexscreener.com/robinhood/0x7b5fce21e3c6bdd01fdb5b4be86ca579b10981546f4c9e7b127f86aab03e5103` · Explorer: `https://robinhoodchain.blockscout.com/token/<CA>`.
Never guess these values. Also update the CA text in `og.jpg` and the meta descriptions when the CA is live.

## Media
- `img/face-bw.webp`: hero grin (logo.png cropped to the face, grayscale)
- `img/logo-bw.webp`, `img/banner.webp`, `og.jpg` (1200×630), favicons/icons from `logo.png`
- `img/tweet-media/`: ≤720p H.264 `-web.mp4` (no audio, faststart). The 69 s @d_xelly clip was re-encoded to 640p/24 fps (10.4 MB → 2.1 MB) and uses `preload="none"`.

## Headers
`vercel.json`: immutable cache on assets, HSTS, nosniff, DENY framing, and a strict CSP (`default-src 'self'`) widened only for X widgets (platform.twitter.com, cdn.syndication.twimg.com, syndication.twitter.com, *.twimg.com images) and the DexScreener API.

## Disclaimer
$NIO is a parody meme coin created for entertainment only. It is not affiliated with, endorsed by, or connected to Binance, Changpeng Zhao, the U.S. Federal Reserve, any government or head of state, Theo Von, or any person or company depicted or referenced. Not financial advice.
