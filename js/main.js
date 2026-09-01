// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Back to Top
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 480);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Hamburger
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.setAttribute('aria-expanded', 'false');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  })
);

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - 68, behavior: 'smooth' });
  });
});

// ドロップダウン：原著論文・学会発表クリック時にスクロール（研究セクションは常時展開済み）
function openAndScroll(anchorId) {
  const sectionDetails = document.querySelector('#research .section-collapsible');
  if (sectionDetails) sectionDetails.open = true;
  if (anchorId === 'anchor-presentations') {
    const toggle = document.getElementById('presentationToggle');
    if (toggle && toggle.getAttribute('aria-expanded') !== 'true' && toggle.style.display !== 'none') {
      toggle.click();
    }
  }
  const target = document.getElementById(anchorId);
  if (target) {
    setTimeout(() => {
      window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - 80, behavior: 'smooth' });
    }, 50);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const dropdownLinks = document.querySelectorAll('.nav-dropdown li a');
  dropdownLinks.forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const text = a.textContent.trim();
      if (text === '掲載論文（共著含む）')  openAndScroll('anchor-papers');
      if (text === '学会発表（共著含む）')  openAndScroll('anchor-presentations');
    });
  });
});

// 発表形式（type文字列）から対応するアイコンを組み立てる
function typeIcon(type) {
  if (!type) return '';
  let icons = '';
  if (type.includes('Journal') || type.includes('論文')) icons += '📄';
  if (type.includes('ポスター')) icons += '🖼️';
  if (type.includes('口頭')) icons += '🎤';
  return icons ? `${icons} ` : '';
}

// 受賞・奨学金の種別からアイコンを組み立てる
function awardTypeIcon(type) {
  if (!type) return '';
  if (type.includes('学会賞')) return '🏆 ';
  if (type.includes('採択') || type.includes('奨学金')) return '🎓 ';
  if (type.includes('表彰')) return '🎖️ ';
  return '';
}

// 共通：pub-itemを生成
// opts.wrapAsLink: true の場合、p.link をカード全体のリンク先にする（学会発表など）
// false（既定）の場合、papers のように末尾に「論文を見る →」の個別リンクを表示する
function pubItemHTML(p, opts = {}) {
  const tags = p.tags && p.tags.length
    ? `<div class="pub-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`
    : '';
  const link = (!opts.wrapAsLink && p.link)
    ? `<a class="pub-link" href="${p.link}" target="_blank" rel="noopener">論文を見る →</a>`
    : '';
  const desc = p.desc
    ? `<div class="pub-desc">${p.desc}</div>`
    : '';
  const inner = `
      <div class="pub-year">${p.year} · ${typeIcon(p.type)}${p.type}</div>
      <div class="pub-title">${p.title}</div>
      <div class="pub-venue"><span style="color:var(--text)">${p.authors}</span> · <span class="pub-venue-name">${p.venue}</span></div>
      ${desc}${tags}${link}`;

  if (opts.wrapAsLink && p.link) {
    return `<a class="pub-item pub-item-link reveal" href="${p.link}" target="_blank" rel="noopener">${inner}</a>`;
  }
  return `<div class="pub-item reveal">${inner}</div>`;
}

function renderList(id, items) {
  const wrap = document.getElementById(id);
  if (wrap) wrap.innerHTML = items.map(p => pubItemHTML(p)).join('');
}

// 「すべて見る」トグルの共通配線。プレビューの下に隠れているrestWrapの表示/非表示を切り替える。
function wireShowMore(toggleId, restWrap, restCount) {
  const toggle = document.getElementById(toggleId);
  if (!toggle) return;
  if (!restCount) {
    toggle.style.display = 'none';
    return;
  }
  const labelMore = `すべて見る（${restCount}件）`;
  toggle.textContent = labelMore;
  toggle.addEventListener('click', () => {
    const willExpand = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(willExpand));
    if (restWrap) restWrap.hidden = !willExpand;
    toggle.textContent = willExpand ? '閉じる' : labelMore;
    if (willExpand && restWrap) {
      // ユーザー操作による明示的な展開なので、スクロール連動アニメーションを待たずに即表示する
      restWrap.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }
  });
}

// 学会発表：直近3件を先に表示し、残りは年ごとにグループ化して「すべて見る」の裏に格納
function renderPresentations(items) {
  const previewWrap = document.getElementById('presentationPreview');
  const restWrap = document.getElementById('presentationRest');
  if (!previewWrap) return;

  const PREVIEW_N = 3;
  const preview = items.slice(0, PREVIEW_N);
  const rest = items.slice(PREVIEW_N);

  previewWrap.innerHTML = preview.map(p => pubItemHTML(p, { wrapAsLink: true })).join('');

  if (rest.length && restWrap) {
    const groups = new Map();
    rest.forEach(p => {
      const y = (p.year.match(/^\d{4}/) || [p.year])[0];
      if (!groups.has(y)) groups.set(y, []);
      groups.get(y).push(p);
    });
    restWrap.innerHTML = [...groups.entries()].map(([year, list]) => `
      <details class="collapsible year-group">
        <summary class="subsection-title">${year}年（${list.length}件）</summary>
        <div class="pub-list">${list.map(p => pubItemHTML(p, { wrapAsLink: true })).join('')}</div>
      </details>`).join('');
  }

  wireShowMore('presentationToggle', restWrap, rest.length);
}

// 受賞・表彰／採択・奨学金：最新1件を先に表示し、残りは「すべて見る」の裏に格納
function renderAwards(items, previewId, restId, toggleId) {
  const previewWrap = document.getElementById(previewId);
  const restWrap = document.getElementById(restId);
  if (!previewWrap) return;

  const PREVIEW_N = 1;
  const preview = items.slice(0, PREVIEW_N);
  const rest = items.slice(PREVIEW_N);

  previewWrap.innerHTML = preview.map(awardItemHTML).join('');
  if (rest.length && restWrap) restWrap.innerHTML = rest.map(awardItemHTML).join('');

  wireShowMore(toggleId, restWrap, rest.length);
}

// Awards（descのみ、venueなし）
function awardItemHTML(a) {
  const inner = `
      <div class="pub-year">${a.year} · ${awardTypeIcon(a.type)}${a.type}</div>
      <div class="pub-title">${a.title}</div>
      <div class="pub-venue">${a.org}</div>
      ${a.desc ? `<div class="pub-desc">${a.desc}</div>` : ''}`;
  if (a.link) {
    return `<a class="pub-item pub-item-link reveal" href="${a.link}" target="_blank" rel="noopener">${inner}</a>`;
  }
  return `<div class="pub-item reveal">${inner}</div>`;
}

// Works（制作物）
function workItemHTML(w) {
  const tags = w.tags && w.tags.length
    ? `<div class="pub-tags">${w.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`
    : '';
  const desc = w.desc ? `<div class="pub-desc">${w.desc}</div>` : '';
  const inner = `
      <div class="pub-year">${w.year || ''}</div>
      <div class="pub-title">${w.title}</div>
      ${desc}${tags}`;
  if (w.link) {
    return `<a class="pub-item pub-item-link reveal" href="${w.link}" target="_blank" rel="noopener">${inner}</a>`;
  }
  return `<div class="pub-item reveal">${inner}</div>`;
}

function renderWorks() {
  const wrap = document.getElementById('worksList');
  if (!wrap) return;
  const works = PORTFOLIO_DATA.works || [];
  wrap.innerHTML = works.length
    ? works.map(workItemHTML).join('')
    : '<p class="section-sub" style="margin:0">準備中です。近日公開予定。</p>';
}

// Skills
function renderSkills() {
  const wrap = document.getElementById('skillsGrid');
  if (!wrap) return;
  wrap.innerHTML = PORTFOLIO_DATA.skills.map(cat => `
    <div class="skill-category reveal">
      <div class="skill-cat-title">${cat.icon} ${cat.category}</div>
      <div class="skill-items">
        ${cat.items.map(i => `<span class="skill-badge">${i}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// Contact
function renderContact() {
  const wrap = document.getElementById('contactGrid');
  if (!wrap) return;
  wrap.innerHTML = PORTFOLIO_DATA.contact.map(c => `
    <a class="contact-item" href="${c.href}" target="_blank" rel="noopener">
      <div class="contact-icon">${c.icon}</div>
      <div class="contact-info">
        <strong>${c.label}</strong>
        <small>${c.sub}</small>
      </div>
    </a>
  `).join('');
}

// Scroll reveal
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const siblings = entry.target.parentElement.querySelectorAll('.reveal');
      const i = [...siblings].indexOf(entry.target);
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// Init
document.addEventListener('DOMContentLoaded', () => {
  renderList('paperList', PORTFOLIO_DATA.papers);
  renderPresentations(PORTFOLIO_DATA.presentations);
  renderAwards(PORTFOLIO_DATA.awards, 'awardPreview', 'awardRest', 'awardToggle');
  renderAwards(PORTFOLIO_DATA.scholarships, 'scholarshipPreview', 'scholarshipRest', 'scholarshipToggle');

  // Licenses
  const licenseWrap = document.getElementById('licenseList');
  if (licenseWrap) {
    licenseWrap.innerHTML = PORTFOLIO_DATA.licenses.map(l => `
      <div class="pub-item reveal">
        <div class="pub-year">${l.year}</div>
        <div class="pub-title">${l.title}</div>
        <div class="pub-venue">${l.org}</div>
      </div>`).join('');
  }

  renderSkills();
  renderWorks();
  renderContact();

  document.querySelectorAll('.info-card').forEach(el => el.classList.add('reveal'));
  initReveal();
});
