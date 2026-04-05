// ─── UI ───────────────────────────────────────────────────────────────────────

function clearResult() {
  const nameEl = document.getElementById('result-name');
  const linkEl = document.getElementById('result-link');
  const phEl   = document.getElementById('placeholder');

  nameEl.classList.remove('show');
  linkEl.classList.remove('show');
  phEl.style.display  = 'block';
  phEl.textContent    = 'Clica no botão pra sortear';
}

function showRolling(text) {
  const phEl   = document.getElementById('placeholder');
  const nameEl = document.getElementById('result-name');
  const linkEl = document.getElementById('result-link');

  phEl.style.display = 'block';
  phEl.textContent   = text;
  nameEl.classList.remove('show');
  linkEl.classList.remove('show');
}

function showResult(item) {
  const phEl   = document.getElementById('placeholder');
  const nameEl = document.getElementById('result-name');
  const linkEl = document.getElementById('result-link');

  phEl.style.display = 'none';
  nameEl.textContent = item.name;
  linkEl.href        = item.url;

  requestAnimationFrame(() => {
    nameEl.classList.add('show');
    linkEl.classList.add('show');
  });
}

function renderStats(state, target, items) {
  const total  = items.length;
  const drawn  = state[target].drawnIds.length;
  const remain = total - drawn;

  document.getElementById('remaining-count').textContent = remain;
  document.getElementById('drawn-count').textContent     = drawn;

  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = `${(drawn / total) * 100}%`;

  const btn = document.getElementById('btn-sortear');
  btn.disabled    = remain === 0;
  btn.textContent = remain === 0 ? 'Lista esgotada' : 'Sortear';
}

function fireConfetti(accentColor) {
  const container = document.getElementById('confetti');
  const colors    = [accentColor, '#f5c842', '#ffffff', '#50fa7b', '#8be9fd'];

  for (let i = 0; i < 70; i++) {
    const el    = document.createElement('div');
    el.className = 'confetti-piece';
    const color  = colors[Math.floor(Math.random() * colors.length)];
    const size   = 4 + Math.random() * 9;
    el.style.cssText = `
      left:${Math.random() * 100}vw;
      background:${color};
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      width:${size}px;
      height:${size}px;
      animation-duration:${1.5 + Math.random() * 2}s;
      animation-delay:${Math.random() * 0.4}s;
      transform:rotate(${Math.random() * 360}deg);
    `;
    container.appendChild(el);
    setTimeout(() => el.remove(), 4500);
  }
}