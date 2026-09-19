// サイト内検索
// 画面に描画済みのカード（論文・発表・受賞・スキルなど）からインデックスを作るため、
// js/data.js にデータを追加すれば自動的に検索対象になる。
(() => {
  const nav      = document.querySelector('.nav');
  const wrap     = document.getElementById('navSearch');
  const openBtn  = document.getElementById('searchOpen');
  const field    = document.getElementById('searchField');
  const panel    = document.getElementById('searchPanel');
  const input    = document.getElementById('searchInput');
  const closeBtn = document.getElementById('searchClose');
  const statusEl = document.getElementById('searchStatus');
  const listEl   = document.getElementById('searchResults');
  if (!nav || !wrap || !openBtn || !field || !panel || !input || !listEl) return;

  const SECTION_LABELS = {
    hero: 'トップ',
    about: '自己紹介',
    research: '研究・発表',
    awards: '受賞・採択・奨学金',
    licenses: '資格・免許',
    skills: 'スキル・技術',
    works: '制作物',
    contact: '連絡先',
  };
  // 「すべて見る」で隠れている領域 → 展開ボタンのid
  const REST_TOGGLES = {
    presentationRest: 'presentationToggle',
    awardRest: 'awardToggle',
    scholarshipRest: 'scholarshipToggle',
  };
  const ITEM_SELECTOR = [
    'section[id] .hero-text',
    'section[id] .info-card',
    'section[id] .pub-item',
    'section[id] .skill-category',
    'section[id] .contact-item',
  ].join(',');
  const MAX_RESULTS = 30;

  // ---------- 正規化（全角/半角・大文字/小文字・カタカナ/ひらがなの違いを無視） ----------
  // 正規化後の各文字が元の文字列のどこに対応するかを保持し、ハイライト位置を元の文字列へ戻せるようにする。
  function normalize(str) {
    let s = '';
    const start = [];
    const end = [];
    for (let i = 0; i < str.length; ) {
      const len = str.codePointAt(i) > 0xffff ? 2 : 1;
      const n = str.substr(i, len).normalize('NFKC').toLowerCase()
        .replace(/[ァ-ヶ]/g, c => String.fromCharCode(c.charCodeAt(0) - 0x60));
      for (let k = 0; k < n.length; k++) { start.push(i); end.push(i + len); }
      s += n;
      i += len;
    }
    return { s, start, end };
  }

  const esc = s => s.replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  // ---------- インデックス ----------
  function textOf(el) {
    const c = el.cloneNode(true);
    c.querySelectorAll('.pub-link, rt').forEach(n => n.remove());
    c.querySelectorAll('br').forEach(n => n.replaceWith(' '));
    c.querySelectorAll('.skill-badge, .tag').forEach(n => n.after(' '));
    return c.textContent.replace(/\s+/g, ' ').trim();
  }

  function buildIndex() {
    const items = [];
    document.querySelectorAll(ITEM_SELECTOR).forEach(el => {
      const sec = el.closest('section[id]');
      const titleEl = el.querySelector('.pub-title, h3, h1, .skill-cat-title, .contact-info strong');
      const title = titleEl ? textOf(titleEl) : '';
      const full = textOf(el);
      const body = title ? full.replace(title, '').replace(/\s+/g, ' ').trim() : full;
      const block = el.closest('.subsection-block');
      const heading = block && block.querySelector('.subsection-heading');
      const label = (SECTION_LABELS[sec.id] || '') + (heading ? ' › ' + heading.textContent.trim() : '');
      items.push({ el, title, body, label, nt: normalize(title), nb: normalize(body) });
    });
    return items;
  }

  // ---------- 検索・ハイライト ----------
  function parseQuery(q) {
    return normalize(q.trim()).s.split(/\s+/).filter(Boolean);
  }

  function search(index, terms) {
    const hits = [];
    index.forEach((it, order) => {
      let score = 0;
      for (const t of terms) {
        const inTitle = it.nt.s.includes(t);
        if (!inTitle && !it.nb.s.includes(t)) return; // 全語を含む項目のみ（AND検索）
        score += inTitle ? (it.nt.s.startsWith(t) ? 12 : 10) : 1;
      }
      hits.push({ it, score, order });
    });
    return hits.sort((a, b) => b.score - a.score || a.order - b.order);
  }

  function ranges(n, terms) {
    const found = [];
    for (const t of terms) {
      let p = n.s.indexOf(t);
      while (p !== -1) {
        found.push([n.start[p], n.end[p + t.length - 1]]);
        p = n.s.indexOf(t, p + t.length);
      }
    }
    found.sort((a, b) => a[0] - b[0]);
    const merged = [];
    for (const r of found) {
      const last = merged[merged.length - 1];
      if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
      else merged.push([r[0], r[1]]);
    }
    return merged;
  }

  function markup(orig, rs, from = 0, to = orig.length) {
    let html = '';
    let pos = from;
    for (const [a, b] of rs) {
      if (b <= from || a >= to) continue;
      const s = Math.max(a, from);
      const e = Math.min(b, to);
      html += esc(orig.slice(pos, s)) + '<mark>' + esc(orig.slice(s, e)) + '</mark>';
      pos = e;
    }
    return html + esc(orig.slice(pos, to));
  }

  function snippet(it, terms) {
    const rs = ranges(it.nb, terms);
    let from = rs.length ? Math.max(0, rs[0][0] - 36) : 0;
    let to = Math.min(it.body.length, from + 110);
    // サロゲートペア（絵文字など）の途中で切らない
    if (from > 0 && /[\udc00-\udfff]/.test(it.body[from])) from--;
    if (to < it.body.length && /[\udc00-\udfff]/.test(it.body[to])) to++;
    return (from > 0 ? '…' : '') + markup(it.body, rs, from, to) + (to < it.body.length ? '…' : '');
  }

  // ---------- 描画 ----------
  let index = null;
  let shown = [];

  function run() {
    const q = input.value;
    const terms = parseQuery(q);
    listEl.innerHTML = '';
    shown = [];
    if (!terms.length) { panel.hidden = true; return; } // 入力が空のときは結果パネルを出さない
    panel.hidden = false;
    const hits = search(index, terms);
    if (!hits.length) {
      statusEl.textContent = `「${q.trim()}」に一致する項目はありません`;
      return;
    }
    shown = hits.slice(0, MAX_RESULTS);
    statusEl.textContent = `${hits.length}件見つかりました` +
      (hits.length > shown.length ? `（上位${shown.length}件を表示）` : '');
    listEl.innerHTML = shown.map(({ it }, i) => `
      <button type="button" class="search-result" data-i="${i}">
        <span class="search-result-label">${esc(it.label)}</span>
        <span class="search-result-title">${markup(it.title, ranges(it.nt, terms))}</span>
        <span class="search-result-snippet">${snippet(it, terms)}</span>
      </button>`).join('');
    listEl.scrollTop = 0;
  }

  // ---------- 開閉 ----------
  const isOpen = () => nav.classList.contains('searching');

  function open(prefill) {
    if (isOpen()) {
      if (prefill) { input.value = prefill; run(); }
      input.focus();
      input.select();
      return;
    }
    // スマホのメニューが開いていれば先に閉じる
    const toggle = document.querySelector('.nav-toggle');
    if (toggle && toggle.classList.contains('open')) toggle.click();
    if (!index) index = buildIndex();
    if (prefill) input.value = prefill;
    nav.classList.add('searching');
    openBtn.setAttribute('aria-expanded', 'true');
    run();
    input.focus();
    input.select();
  }

  function close(restoreFocus = true) {
    if (!isOpen()) return;
    nav.classList.remove('searching');
    panel.hidden = true;
    openBtn.setAttribute('aria-expanded', 'false');
    if (restoreFocus) openBtn.focus();
  }

  // ---------- 結果へ移動 ----------
  function goTo(el) {
    close(false);
    // 折りたたみ（details）と「すべて見る」で隠れている領域を開く
    for (let d = el.closest('details'); d; d = d.parentElement && d.parentElement.closest('details')) d.open = true;
    const rest = el.closest('[hidden]');
    if (rest) {
      const toggle = document.getElementById(REST_TOGGLES[rest.id]);
      if (toggle) toggle.click(); else rest.hidden = false;
    }
    if (el.classList.contains('reveal')) el.classList.add('visible');
    setTimeout(() => {
      window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - 96), behavior: 'smooth' });
      el.classList.add('search-hit');
      setTimeout(() => el.classList.remove('search-hit'), 2600);
    }, 80);
  }

  // ---------- イベント ----------
  openBtn.addEventListener('click', () => open());
  closeBtn.addEventListener('click', () => close());
  input.addEventListener('input', run);

  listEl.addEventListener('click', e => {
    const btn = e.target.closest('.search-result');
    if (btn && shown[btn.dataset.i]) goTo(shown[btn.dataset.i].it.el);
  });

  // 入力欄・結果パネル内のキー操作
  wrap.addEventListener('keydown', e => {
    if (e.isComposing || e.keyCode === 229) return; // IME変換中は何もしない
    const results = [...listEl.querySelectorAll('.search-result')];
    const cur = results.indexOf(document.activeElement);

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cur === -1 ? results[0] : results[cur + 1];
      if (next) next.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cur > 0) results[cur - 1].focus();
      else if (cur === 0) input.focus();
    } else if (e.key === 'Enter' && e.target === input) {
      e.preventDefault();
      if (shown.length) goTo(shown[0].it.el);
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && cur !== -1) {
      input.focus(); // 結果にフォーカスがある状態で文字を打ったら入力欄へ戻す
    }
  });

  // 入力欄・結果パネルの外をクリック（タップ）したら閉じる
  document.addEventListener('mousedown', e => {
    if (isOpen() && !e.target.closest('#searchField, #searchPanel, #searchOpen')) close(false);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen()) { close(); return; }
    const t = e.target;
    const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable);
    const cmdK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
    const cmdF = (e.ctrlKey || e.metaKey) && !e.shiftKey && !e.altKey && e.key.toLowerCase() === 'f';
    const slash = e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey && !typing;

    if (cmdF) {
      // 検索欄がすでに開いて入力中なら、もう一度押したときはブラウザ標準のページ内検索に任せる
      if (isOpen() && document.activeElement === input) return;
      e.preventDefault();
      // 文字を選択していれば、それを検索語として入れる（標準の検索と同じ挙動）
      const sel = String(window.getSelection() || '').trim();
      open(sel && sel.length <= 100 && !/\n/.test(sel) ? sel : '');
      return;
    }
    if (cmdK || slash) { e.preventDefault(); open(); }
  });
})();
