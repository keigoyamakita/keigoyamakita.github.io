// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Hamburger
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
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

// ドロップダウン：原著論文・学会発表クリック時にdetailsを開いてスクロール
function openAndScroll(anchorId) {
  // research セクション全体を開く
  const sectionDetails = document.querySelector('#research .section-collapsible');
  if (sectionDetails) sectionDetails.open = true;
  // 対象のdetailsを開く
  const target = document.getElementById(anchorId);
  if (target) {
    target.open = true;
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
      if (text === '原著論文')  openAndScroll('anchor-papers');
      if (text === '学会発表')  openAndScroll('anchor-presentations');
    });
  });
});

// 共通：pub-itemを生成
function pubItemHTML(p) {
  const tags = p.tags && p.tags.length
    ? `<div class="pub-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`
    : '';
  const link = p.link
    ? `<a class="pub-link" href="${p.link}" target="_blank" rel="noopener">論文を見る →</a>`
    : '';
  const desc = p.desc
    ? `<div class="pub-desc">${p.desc}</div>`
    : '';
  return `
    <div class="pub-item reveal">
      <div class="pub-year">${p.year} · ${p.type}</div>
      <div class="pub-title">${p.title}</div>
      <div class="pub-venue"><span style="color:var(--text)">${p.authors}</span> · <em>${p.venue}</em></div>
      ${desc}${tags}${link}
    </div>`;
}

function renderList(id, items) {
  const wrap = document.getElementById(id);
  if (wrap) wrap.innerHTML = items.map(pubItemHTML).join('');
}

// Awards（descのみ、venueなし）
function awardItemHTML(a) {
  const inner = `
      <div class="pub-year">${a.year} · ${a.type}</div>
      <div class="pub-title">${a.title}</div>
      <div class="pub-venue">${a.org}</div>
      ${a.desc ? `<div class="pub-desc">${a.desc}</div>` : ''}`;
  if (a.link) {
    return `<a class="pub-item pub-item-link reveal" href="${a.link}" target="_blank" rel="noopener">${inner}</a>`;
  }
  return `<div class="pub-item reveal">${inner}</div>`;
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
  renderList('paperList',        PORTFOLIO_DATA.papers);
  renderList('presentationList', PORTFOLIO_DATA.presentations);

  const awardWrap = document.getElementById('awardList');
  if (awardWrap) awardWrap.innerHTML = PORTFOLIO_DATA.awards.map(awardItemHTML).join('');

  renderSkills();
  renderContact();

  document.querySelectorAll('.info-card').forEach(el => el.classList.add('reveal'));
  initReveal();
});
