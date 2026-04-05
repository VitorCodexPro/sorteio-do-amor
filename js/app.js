// ─── App ──────────────────────────────────────────────────────────────────────

let currentMode = null;
let state       = loadState();
let isRolling   = false;

// ── Chuva de fotos ────────────────────────────────────────────────────────────
const TOTAL_FOTOS = 20;

function iniciarChuva() {
  const container = document.getElementById('chuva-fotos');
  container.innerHTML = '';

  for (let i = 0; i < 18; i++) {
    setTimeout(() => criarFoto(container), i * 600);
  }
}

function criarFoto(container) {
  const idx      = Math.floor(Math.random() * TOTAL_FOTOS) + 1;
  const img      = document.createElement('img');
  img.className  = 'foto-coracao';
  img.src        = `img/fotos/${idx}.jpg`;

  const duracao  = 8 + Math.random() * 8;
  const delay    = Math.random() * 4;
  const leftPos  = Math.random() * 95;

  img.style.cssText = `
    left: ${leftPos}vw;
    animation-duration: ${duracao}s;
    animation-delay: ${delay}s;
  `;

  img.addEventListener('animationend', () => {
    img.remove();
    criarFoto(container);
  });

  container.appendChild(img);
}

// ── Login ─────────────────────────────────────────────────────────────────────
function startLogin(mode) {
  currentMode = mode;

  const nameEl = document.getElementById('senha-person-name');
  nameEl.textContent = mode === 'vitor' ? 'Vitor' : 'Maria';
  nameEl.className = 'person-name ' + mode;

  document.getElementById('senha-input').value = '';
  document.getElementById('senha-error').textContent = '';

  showScreen('screen-senha');
  document.getElementById('senha-input').focus();
}

function confirmarSenha() {
  const input = document.getElementById('senha-input').value;
  if (input === PASSWORDS[currentMode]) {
    entrar(currentMode);
  } else {
    document.getElementById('senha-error').textContent = 'senha incorreta';
    document.getElementById('senha-input').value = '';
    document.getElementById('senha-input').focus();
  }
}

function voltarLogin() {
  currentMode = null;
  showScreen('screen-login');
}

function logout() {
  currentMode = null;
  showScreen('screen-login');
}

function entrar(mode) {
  // define o alvo — Vitor sorteia pra Maria e vice-versa
  const target = mode === 'vitor' ? 'maria' : 'vitor';

  const titleEl = document.getElementById('main-title');
  titleEl.textContent = mode === 'vitor' ? 'Vitor' : 'Maria';
  titleEl.className = 'title-single ' + mode;

  const personEl = document.getElementById('person-display');
  personEl.textContent = target === 'vitor' ? 'Vitor' : 'Maria';
  personEl.className = 'person-name ' + target;

  const btn = document.getElementById('btn-sortear');
  btn.className = 'btn-raffle' + (target === 'maria' ? ' maria-mode' : '');

  clearResult();
  renderStats(state, target, ITEMS[target]);
  showScreen('screen-main');
}

// ── Sortear ───────────────────────────────────────────────────────────────────
function sortear() {
  if (isRolling) return;

  const target    = currentMode === 'vitor' ? 'maria' : 'vitor';
  const items     = ITEMS[target];
  const available = getAvailable(state, target, items);
  if (available.length === 0) return;

  isRolling = true;
  document.getElementById('btn-sortear').disabled = true;

  let count    = 0;
  const spins  = 22 + Math.floor(Math.random() * 8);
  let interval = 60;

  function tick() {
    const rand = available[Math.floor(Math.random() * available.length)];
    showRolling(rand.name);
    count++;

    if (count > spins * 0.7) interval = Math.min(interval * 1.15, 200);

    if (count < spins) {
      setTimeout(tick, interval);
    } else {
      const winner = drawItem(state, target, items);
      showResult(winner);
      renderStats(state, target, items);

      const accent = target === 'vitor' ? '#7c5cfc' : '#fc5c8a';
      fireConfetti(accent);

      isRolling = false;
      document.getElementById('btn-sortear').disabled = false;
    }
  }

  tick();
}

// ── Reset ─────────────────────────────────────────────────────────────────────
function handleReset() {
  if (isRolling) return;
  const target = currentMode === 'vitor' ? 'maria' : 'vitor';
  if (!confirm(`Resetar os sorteios de ${target}? Não dá pra desfazer.`)) return;

  resetPerson(state, target);
  saveState(state);
  clearResult();
  renderStats(state, target, ITEMS[target]);
}

// ── Alterar senha ─────────────────────────────────────────────────────────────
function abrirAlterarSenha() {
  document.getElementById('input-atual').value    = '';
  document.getElementById('input-nova').value     = '';
  document.getElementById('input-confirma').value = '';
  document.getElementById('error-atual').textContent = '';
  document.getElementById('error-nova').textContent  = '';

  document.getElementById('passo-atual').style.display = 'flex';
  document.getElementById('passo-atual').style.flexDirection = 'column';
  document.getElementById('passo-atual').style.gap = '14px';
  document.getElementById('passo-nova').style.display  = 'none';

  document.getElementById('modal-senha').style.display = 'flex';
  document.getElementById('input-atual').focus();
}

function fecharAlterarSenha() {
  document.getElementById('modal-senha').style.display = 'none';
}

function confirmarAtual() {
  const input = document.getElementById('input-atual').value;
  if (input === PASSWORDS[currentMode]) {
    document.getElementById('passo-atual').style.display = 'none';
    document.getElementById('passo-nova').style.display  = 'flex';
    document.getElementById('passo-nova').style.flexDirection = 'column';
    document.getElementById('passo-nova').style.gap = '14px';
    document.getElementById('input-nova').focus();
  } else {
    document.getElementById('error-atual').textContent = 'senha incorreta';
    document.getElementById('input-atual').value = '';
    document.getElementById('input-atual').focus();
  }
}

function salvarNovaSenha() {
  const nova     = document.getElementById('input-nova').value;
  const confirma = document.getElementById('input-confirma').value;
  const errorEl  = document.getElementById('error-nova');

  if (nova.length < 4) {
    errorEl.textContent = 'senha muito curta';
    return;
  }

  if (nova !== confirma) {
    errorEl.textContent = 'senhas não coincidem';
    document.getElementById('input-confirma').value = '';
    document.getElementById('input-confirma').focus();
    return;
  }

  PASSWORDS[currentMode] = nova;

  // salva no Firebase
  window.salvarSenhasFirebase({ vitor: PASSWORDS.vitor, maria: PASSWORDS.maria });

  fecharAlterarSenha();
  alert('Senha alterada com sucesso.');
}

// ── Telas ─────────────────────────────────────────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('senha-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') confirmarSenha();
  });

  iniciarChuva();
  showScreen('screen-login');
});