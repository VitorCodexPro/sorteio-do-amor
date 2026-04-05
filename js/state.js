// ─── State Manager ───────────────────────────────────────────────────────────
// Persiste via localStorage. IDs em vez de índices — à prova de reordenação.

const STATE_KEY = 'sorteio_v2';

const DEFAULT_STATE = () => ({
  version: 2,
  vitor:  { drawnIds: [] },
  maria:  { drawnIds: [] },
  history: []   // [{ person, itemId, name, url, drawnAt }]
});

function loadState() {
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (!raw) return DEFAULT_STATE();
    const parsed = JSON.parse(raw);
    // migração da versão antiga (índices → ids)
    if (!parsed.version || parsed.version < 2) return DEFAULT_STATE();
    return parsed;
  } catch {
    return DEFAULT_STATE();
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Falha ao salvar estado:', e);
  }
}

function resetPerson(state, person) {
  state[person].drawnIds = [];
  // remove histórico da pessoa mas mantém do outro
  state.history = state.history.filter(h => h.person !== person);
}

function resetAll(state) {
  const fresh = DEFAULT_STATE();
  Object.assign(state, fresh);
}

function drawItem(state, person, items) {
  const drawnIds = state[person].drawnIds;
  const available = items.filter(i => !drawnIds.includes(i.id));
  if (available.length === 0) return null;

  const winner = available[Math.floor(Math.random() * available.length)];

  drawnIds.push(winner.id);
  state.history.unshift({
    person,
    itemId:  winner.id,
    name:    winner.name,
    url:     winner.url,
    drawnAt: new Date().toISOString()
  });

  saveState(state);
  return winner;
}

function getAvailable(state, person, items) {
  return items.filter(i => !state[person].drawnIds.includes(i.id));
}

// ── Senhas ────────────────────────────────────────────────────────────────────
const PASSWORDS_KEY = 'sorteio_passwords';

function loadPasswords() {
  try {
    const raw = localStorage.getItem(PASSWORDS_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function savePasswords() {
  localStorage.setItem(PASSWORDS_KEY, JSON.stringify(PASSWORDS));
}

// sobrescreve as senhas do items.js se já existir salvo
(function initPasswords() {
  const saved = loadPasswords();
  if (saved) {
    PASSWORDS.vitor = saved.vitor;
    PASSWORDS.maria = saved.maria;
  }
})();