/* $NIO — Nigga Its Over. Static site script (no deps). */
(() => {
  'use strict';

  // ---- Launch config. Leave null until real values exist. Never guess. ----
  const CONFIG = {
    ca: null,        // Solana mint address. null => "TBA", Buy/Chart stay "Soon"
    xUrl: 'https://x.com/NiggaItsOver_RH',
    // Ready-made link patterns, used only once `ca` is set:
    buyUrl: (ca) => `https://swap.pump.fun/?input=So11111111111111111111111111111111111111112&output=${ca}`,
    chartUrl: (ca) => `https://dexscreener.com/solana/${ca}`,
  };

  const M = '/img/tweet-media/';
  const TWEETS = [
    { act: 'I', actName: 'Genesis', id: '2087206048780157268', user: 'idofentanyl', date: 'Aug 11, 2026 · 11:54 AM', title: 'The origin template', cap: '"NIGGA … IT\'S OVER": Impact caption on the grin close-up, a 6-second loop.', note: 'This post sets the look: black-and-white Impact text and the smug grin. Everything after it reuses this frame.', stat: '155.9K views · 2.6K likes', media: 'tweet-2087206048780157268-01', video: true },
    { act: 'II', actName: 'Contagion', id: '2114144675166671113', user: 'idofentanyl', date: 'Oct 24, 2026 · 7:59 PM', title: 'Beijing is over', cap: 'The grin face-swapped onto Xi, PRC flag behind.', note: 'It lands as China\'s STAR50 AI index falls about 40%.', stat: '3.1K views · 89 likes', media: 'tweet-2114144675166671113-01', video: true },
    { act: 'II', actName: 'Contagion', id: '2115459095356387587', user: 'idofentanyl', date: 'Oct 28, 2026 · 11:02 AM', title: 'The Fed is over', cap: 'Fake LIVE broadcast: "Fed speech at Jackson Hole: \'Nigga, it\'s over.\'"', note: 'Posted on FOMC decision day. The central bank itself announces it\'s over.', stat: '2.7K views · 70 likes', media: 'tweet-2115459095356387587-01', video: true },
    { act: 'II', actName: 'Contagion', id: '2115462397955846514', user: 'd_xelly', date: 'Oct 28, 2026 · 11:15 AM', title: 'The ticker is born: N I O', cap: '"@idofentanyl N I O 🕺🕺🕺": an AI dance video of a grin-faced crew.', note: 'Thirteen minutes after the Fed post, the replies name the ticker. Credit to @d_xelly.', stat: 'Reply to the Fed post · 69 s', media: 'tweet-2115462397955846514-01', video: true, long: true },
    { act: 'II', actName: 'Contagion', id: '2115609012100387121', user: 'idofentanyl', date: 'Oct 28, 2026 · 8:57 PM', title: 'The White House is over', cap: 'The grin face-swapped onto Trump, quoting @WatcherGuru.', note: 'Quoted post: Bloomberg and major trading firms sign deals for faster access to the President\'s posts.', stat: '13.6K views · 520 likes', media: 'tweet-2115609012100387121-01', video: true },
    { act: 'III', actName: 'Meltdown', id: '2115879914079424655', user: 'idofentanyl', date: 'Oct 29, 2026 · 2:54 PM', title: '"Remember, nigga, it\'s over."', cap: 'The MW2 "No Russian" elevator scene, face-swapped.', note: 'The most-engaged post in the set, up about 1h15m before Binance\'s hot wallets started draining. The "he called it" post.', stat: '95.3K views · 5.4K likes · 1.4K bookmarks', media: 'tweet-2115879914079424655-01', video: true },
    { act: 'III', actName: 'Meltdown', id: '2115913547347812636', user: 'idofentanyl', date: 'Oct 29, 2026 · 5:07 PM', title: 'Binance is over', cap: 'The grin face-swapped onto CZ, quoting @spreekaway\'s first "possibly massive binance hack" post.', note: 'Posted inside the first hour of the largest crypto hack on record (about $6.3B). CZ posted "It does look like a hack" eight minutes later.', stat: '24.2K views · 699 likes', media: 'tweet-2115913547347812636-01', video: true },
    { act: 'III', actName: 'Meltdown', id: '2116152656330731830', user: 'idofentanyl', date: 'Oct 30, 2026 · 8:58 AM', title: 'Everything is over', cap: 'An all-red heatmap that resolves into a red pixel mosaic of the grin, quoting @BullTheoryio on silver below $50.', note: 'The final frame: every asset is red, and the face is made of the losses.', stat: 'Still image · posted this morning', media: 'tweet-2116152656330731830-01', video: false },
  ];

  const NEWS = [
    { h: 'BullTheoryio', n: 'Bull Theory', id: '2114798796857377052', t: 'Oct 26 · 3:18 PM', q: 'THE FIRST AI BUBBLE HAS BURST. China\'s STAR50 index… has crashed 40% in less than four months.' },
    { h: 'cz_binance', n: 'CZ', id: '2115915423174853077', t: 'Oct 29 · 5:15 PM', q: 'User funds are safe! It does look like a hack on Binance.' },
    { h: 'WatcherGuru', n: 'Watcher.Guru', id: '2115922259739349132', t: 'Oct 29 · 5:42 PM', q: 'BREAKING: World\'s largest crypto exchange Binance hacked with over $5.6 billion stolen…' },
    { h: 'lookonchain', n: 'Lookonchain', id: '2115932070858158190', t: 'Oct 29 · 6:21 PM', q: 'Binance has been hacked for over $5.8B! Of that, 1.58B $USDT and 823M $USDC… have been frozen.' },
    { h: 'WatcherGuru', n: 'Watcher.Guru', id: '2115977043183640981', t: 'Oct 29 · 9:20 PM', q: 'JUST IN: Over $1.3 billion in leveraged crypto longs have been liquidated in the past 5 hours.' },
    { h: 'unusual_whales', n: 'unusual_whales', id: '2116013235455582563', t: 'Oct 29 · 11:44 PM', q: 'BREAKING: Binance has said it has been hacked for $6.3 billion, and all deposits and withdrawals are temporarily suspended' },
    { h: 'arkham', n: 'Arkham', id: '2116022327674810570', t: 'Oct 30 · 12:20 AM', q: 'Binance Hack: $6.01B Stolen, $2.80B Frozen' },
    { h: 'Cointelegraph', n: 'Cointelegraph', id: '2116038499757428998', t: 'Oct 30 · 1:24 AM', q: 'North Korea\'s TraderTraitor group… is likely also behind the $6.3B Binance hack, says ZachXBT.' },
    { h: 'Reuters', n: 'Reuters', id: '2116115394834612444', t: 'Oct 30 · 6:30 AM', q: 'Hackers stole $6.3 billion from Binance… in what analysts say is the biggest crypto hack ever' },
    { h: 'BullTheoryio', n: 'Bull Theory', id: '2116156361327448309', t: 'Oct 30 · 9:12 AM', q: 'BREAKING: Gold just crashed to its lowest level in nearly a year, dropping below $3,940.' },
  ];

  const TAPE = [
    { m: 'tweet-2087206048780157268-01', v: true, t: 'Origin', s: 'Aug 11 · the face appears', id: '2087206048780157268', u: 'idofentanyl', big: true },
    { m: 'tweet-2115879914079424655-01', v: true, t: 'No Russian parody', s: 'Oct 29 · "Remember… it\'s over"', id: '2115879914079424655', u: 'idofentanyl', big: true },
    { m: 'tweet-2115913547347812636-01', v: true, t: 'CZ face-swap', s: 'Oct 29 · Binance is over', id: '2115913547347812636', u: 'idofentanyl' },
    { m: 'tweet-2116152656330731830-01', v: false, t: 'Heatmap mosaic', s: 'Oct 30 · everything is over', id: '2116152656330731830', u: 'idofentanyl' },
    { m: 'tweet-2115462397955846514-01', v: true, t: 'N I O', s: 'Oct 28 · the ticker is born', id: '2115462397955846514', u: 'd_xelly', long: true },
  ];

  const el = (tag, attrs = {}, kids = []) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'text') n.textContent = v; else if (k === 'class') n.className = v; else n.setAttribute(k, v);
    }
    (Array.isArray(kids) ? kids : [kids]).forEach((c) => c && n.append(c));
    return n;
  };
  const postUrl = (u, id) => `https://x.com/${u}/status/${id}`;

  const mediaNode = (base, isVideo, alt, long) => {
    if (isVideo) {
      const v = el('video', { class: 'js-autoplay', muted: '', loop: '', playsinline: '', preload: long ? 'none' : 'metadata', poster: M + base + '.webp', width: '720', height: '720', 'aria-label': alt });
      v.muted = true;
      v.append(el('source', { src: M + base + '-web.mp4', type: 'video/mp4' }));
      return v;
    }
    return el('img', { src: M + base + '.webp', alt, loading: 'lazy', decoding: 'async', width: '960', height: '960' });
  };

  // ---- Timeline ----
  const tl = document.getElementById('tl-list');
  let lastAct = '';
  TWEETS.forEach((t, i) => {
    if (t.act !== lastAct) {
      lastAct = t.act;
      tl.append(el('li', { class: 'tl-act', 'data-reveal': '' }, [el('span', { text: 'Act ' + t.act }), el('strong', { text: t.actName })]));
    }
    const bq = el('blockquote', { class: 'twitter-tweet', 'data-theme': 'dark', 'data-dnt': 'true', 'data-conversation': 'none', 'data-align': 'center' }, [
      el('p', { lang: 'en', text: t.cap }),
      el('a', { href: `https://twitter.com/${t.user}/status/${t.id}`, text: `View @${t.user}'s post on X →` }),
    ]);
    const card = el('li', { class: 'tl-card', 'data-reveal': '', id: 'post-' + (i + 1) }, [
      el('div', { class: 'tl-meta' }, [
        el('span', { class: 'tl-num', text: String(i + 1).padStart(2, '0') }),
        el('div', {}, [
          el('p', { class: 'label', text: `${t.date} ET · @${t.user}` }),
          el('h3', { text: t.title }),
          el('p', { class: 'tl-cap', text: t.cap }),
          el('p', { class: 'tl-note', text: t.note }),
          el('p', { class: 'label tl-stat', text: t.stat }),
          el('a', { class: 'tl-link', href: postUrl(t.user, t.id), target: '_blank', rel: 'noopener noreferrer', text: 'Open on X ↗' }),
        ]),
      ]),
      el('figure', { class: 'tl-media' }, [mediaNode(t.media, t.video, `${t.title}: ${t.cap}`, t.long), el('figcaption', { class: 'label', text: t.video ? 'Clip · muted · site copy' : 'Still · site copy' })]),
      el('div', { class: 'tl-embed' }, [bq]),
    ]);
    tl.append(card);
  });

  // ---- Receipts ----
  const rc = document.getElementById('rc-list');
  NEWS.forEach((n) => {
    rc.append(el('a', { class: 'rc', role: 'listitem', href: postUrl(n.h, n.id), target: '_blank', rel: 'noopener noreferrer' }, [
      el('span', { class: 'label', text: `${n.t} ET` }),
      el('q', { text: n.q }),
      el('span', { class: 'rc-by' }, [el('strong', { text: n.n }), document.createTextNode(` @${n.h} ↗`)]),
    ]));
  });

  // ---- Tape ----
  const tg = document.getElementById('tape-grid');
  TAPE.forEach((c) => {
    tg.append(el('figure', { class: 'tape-item' + (c.big ? ' is-big' : ''), 'data-reveal': '' }, [
      mediaNode(c.m, c.v, `${c.t}: ${c.s}`, c.long),
      el('figcaption', {}, [el('strong', { text: c.t }), el('span', { text: c.s }), el('a', { href: postUrl(c.u, c.id), target: '_blank', rel: 'noopener noreferrer', text: 'Source ↗' })]),
    ]));
  });

  // ---- Buttons / CA state ----
  const setLink = (sel, url, label) => document.querySelectorAll(sel).forEach((a) => {
    if (!url) return;
    a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer';
    a.classList.remove('is-soon'); a.removeAttribute('aria-disabled'); a.removeAttribute('tabindex'); a.removeAttribute('role');
    a.textContent = label;
  });
  if (CONFIG.ca) {
    document.getElementById('ca').textContent = CONFIG.ca;
    const b = document.querySelector('.js-copy'); b.disabled = false; b.textContent = 'Copy';
    setLink('.js-buy', CONFIG.buyUrl(CONFIG.ca), 'Buy $NIO');
    setLink('.js-chart', CONFIG.chartUrl(CONFIG.ca), 'Chart');
  }
  if (CONFIG.xUrl) setLink('.js-x', CONFIG.xUrl, 'X');
  document.addEventListener('click', (e) => {
    const soon = e.target.closest('.is-soon');
    if (soon) { e.preventDefault(); return; }
    const b = e.target.closest('.js-copy');
    if (b && CONFIG.ca && navigator.clipboard) {
      navigator.clipboard.writeText(CONFIG.ca).then(() => { b.textContent = 'Copied'; setTimeout(() => (b.textContent = 'Copy'), 1400); });
    }
  });

  // ---- Reveal on scroll ----
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rio = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); rio.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
  document.querySelectorAll('[data-reveal]').forEach((n) => rio.observe(n));

  // ---- Muted autoplay on view (one at a time per viewport visibility) ----
  const vio = new IntersectionObserver((es) => es.forEach((e) => {
    const v = e.target;
    if (e.isIntersecting && !reduce) { v.muted = true; const p = v.play(); if (p) p.catch(() => {}); }
    else v.pause();
  }), { threshold: 0.45 });
  document.querySelectorAll('video.js-autoplay').forEach((v) => {
    vio.observe(v);
    if (reduce) v.setAttribute('controls', '');
  });

  // ---- Load X widgets lazily when the timeline approaches ----
  let xLoaded = false;
  const loadX = () => {
    if (xLoaded) return; xLoaded = true;
    const s = document.createElement('script');
    s.src = 'https://platform.twitter.com/widgets.js'; s.async = true; s.charset = 'utf-8';
    document.body.append(s);
  };
  const xio = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { loadX(); xio.disconnect(); } }, { rootMargin: '900px 0px' });
  xio.observe(document.getElementById('timeline'));
  setTimeout(loadX, 6000);
})();
