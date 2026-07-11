// Excel Shortcut Trainer — game logic
(function () {
  'use strict';

  const app = document.getElementById('app');
  const STATS_KEY = 'excelShortcutTrainerStats';

  const MODIFIER_KEYS = new Set(['Control', 'Alt', 'Shift', 'Meta', 'AltGraph', 'CapsLock']);

  const state = {
    screen: 'start', // 'start' | 'game' | 'results'
    settings: {
      platform: 'win',
      categories: new Set(CATEGORIES),
      mode: 'press', // 'press' | 'quiz'
      length: 15,
    },
    round: null,
  };

  let gameKeyHandler = null;

  // ---------------- utilities ----------------

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function normalizeKey(k) {
    if (k == null) return '';
    return k.length === 1 ? k.toLowerCase() : k;
  }

  function specMatches(target, pressed) {
    if (!!target.ctrl !== !!pressed.ctrl) return false;
    if (!!target.alt !== !!pressed.alt) return false;
    if (!!target.shift !== !!pressed.shift) return false;
    if (!!target.meta !== !!pressed.meta) return false;
    return normalizeKey(target.key) === normalizeKey(pressed.key);
  }

  function kbdRowHtml(labels) {
    return `<span class="kbd-row">${labels
      .map((l, i) => (i === 0 ? kbdHtml(l) : `<span class="kbd plus">+</span>${kbdHtml(l)}`))
      .join('')}</span>`;
  }

  function kbdHtml(label) {
    return `<span class="kbd">${escapeHtml(label)}</span>`;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
    }[c]));
  }

  function loadStats() {
    try {
      return JSON.parse(localStorage.getItem(STATS_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveStats(platform, score, accuracy) {
    const stats = loadStats();
    const prev = stats[platform] || { bestScore: 0, gamesPlayed: 0 };
    stats[platform] = {
      bestScore: Math.max(prev.bestScore, score),
      gamesPlayed: prev.gamesPlayed + 1,
      lastAccuracy: accuracy,
    };
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    return stats[platform];
  }

  function platformLabel(p) {
    return p === 'mac' ? 'Mac' : 'Windows';
  }

  function detachGameKeyHandler() {
    if (gameKeyHandler) {
      document.removeEventListener('keydown', gameKeyHandler, true);
      gameKeyHandler = null;
    }
  }

  // ---------------- start screen ----------------

  function renderStart() {
    detachGameKeyHandler();
    const s = state.settings;
    const catButtons = CATEGORIES.map((c) => {
      const sel = s.categories.has(c) ? 'selected' : '';
      return `<button class="category-btn ${sel}" data-cat="${escapeHtml(c)}">${escapeHtml(c)}</button>`;
    }).join('');

    const stats = loadStats();
    const currentStats = stats[s.platform];

    app.innerHTML = `
      <div class="header">
        <div>
          <h1>Excel Shortcut <span class="accent">Trainer</span></h1>
          <div class="subtitle">Keyboard drills for PE / IB financial modeling</div>
        </div>
      </div>

      <div class="panel">
        <h3>Platform</h3>
        <div class="option-grid">
          <button class="option-btn platform ${s.platform === 'win' ? 'selected' : ''}" data-platform="win">🪟 Windows</button>
          <button class="option-btn platform ${s.platform === 'mac' ? 'selected' : ''}" data-platform="mac">⌘ Mac</button>
        </div>
        ${currentStats ? `<div class="subtitle" style="margin-top:12px;">Best score on ${platformLabel(s.platform)}: <strong style="color:var(--text)">${currentStats.bestScore}</strong> · ${currentStats.gamesPlayed} round(s) played</div>` : ''}

        <h3>Mode</h3>
        <div class="option-grid">
          <button class="option-btn ${s.mode === 'press' ? 'selected' : ''}" data-mode="press">⌨️ Press the real keys (recommended)</button>
          <button class="option-btn ${s.mode === 'quiz' ? 'selected' : ''}" data-mode="quiz">✅ Multiple choice</button>
        </div>
        <div class="subtitle" style="margin-top:8px;">In key-press mode, a few shortcuts that browsers intercept (Find, Print, Reload, etc.) automatically switch to multiple choice.</div>

        <h3>Round length</h3>
        <div class="option-grid">
          ${[10, 15, 25, 'all'].map((n) => `<button class="option-btn ${s.length === n ? 'selected' : ''}" data-length="${n}">${n === 'all' ? 'All' : n} questions</button>`).join('')}
        </div>

        <h3>Categories</h3>
        <div class="category-grid">${catButtons}</div>
        <div class="btn-row">
          <button class="btn-link" id="btn-all-cats">Select all</button>
          <button class="btn-link" id="btn-none-cats">Clear</button>
        </div>

        <div class="btn-row">
          <button class="btn-primary" id="btn-start">Start Round</button>
          <button class="btn-secondary" id="btn-cheatsheet">View Cheat Sheet</button>
        </div>
      </div>
    `;

    app.querySelectorAll('[data-platform]').forEach((b) => b.addEventListener('click', () => {
      s.platform = b.dataset.platform;
      renderStart();
    }));
    app.querySelectorAll('[data-mode]').forEach((b) => b.addEventListener('click', () => {
      s.mode = b.dataset.mode;
      renderStart();
    }));
    app.querySelectorAll('[data-length]').forEach((b) => b.addEventListener('click', () => {
      const v = b.dataset.length;
      s.length = v === 'all' ? 'all' : parseInt(v, 10);
      renderStart();
    }));
    app.querySelectorAll('[data-cat]').forEach((b) => b.addEventListener('click', () => {
      const c = b.dataset.cat;
      if (s.categories.has(c)) s.categories.delete(c); else s.categories.add(c);
      renderStart();
    }));
    document.getElementById('btn-all-cats').addEventListener('click', () => {
      s.categories = new Set(CATEGORIES);
      renderStart();
    });
    document.getElementById('btn-none-cats').addEventListener('click', () => {
      s.categories = new Set();
      renderStart();
    });
    document.getElementById('btn-start').addEventListener('click', startRound);
    document.getElementById('btn-cheatsheet').addEventListener('click', () => openCheatSheet(s.platform));
  }

  // ---------------- game ----------------

  function startRound() {
    const s = state.settings;
    if (s.categories.size === 0) {
      alert('Pick at least one category.');
      return;
    }
    const pool = shuffle(SHORTCUTS.filter((item) => s.categories.has(item.category)));
    const len = s.length === 'all' ? pool.length : Math.min(s.length, pool.length);
    state.round = {
      platform: s.platform,
      mode: s.mode,
      queue: pool.slice(0, len),
      index: 0,
      score: 0,
      streak: 0,
      bestStreak: 0,
      correctCount: 0,
      perCategory: {},
      missed: [],
      answered: false,
      lastResultCorrect: null,
      lockedChoices: null,
      startedAt: Date.now(),
    };
    state.screen = 'game';
    renderGame();
  }

  function currentItem() {
    return state.round.queue[state.round.index];
  }

  function effectiveMode(item) {
    const r = state.round;
    if (r.mode === 'quiz') return 'quiz';
    return item[r.platform].safe ? 'press' : 'quiz';
  }

  function renderGame() {
    const r = state.round;
    const item = currentItem();
    const total = r.queue.length;
    const pct = Math.round((r.index / total) * 100);
    const mode = effectiveMode(item);

    app.innerHTML = `
      <div class="header">
        <h1>Excel Shortcut <span class="accent">Trainer</span></h1>
        <button class="btn-link" id="btn-quit">Quit round</button>
      </div>

      <div class="game-topbar">
        <span class="stat">Question <strong>${r.index + 1}</strong> / ${total}</span>
        <span class="stat">Score <strong>${r.score}</strong></span>
        <span class="stat">Streak <strong>${r.streak}</strong></span>
        <span class="stat">${platformLabel(r.platform)}</span>
      </div>
      <div class="progress-bar"><div class="progress-bar-fill" style="width:${pct}%"></div></div>

      <div class="panel">
        <span class="category-tag">${escapeHtml(item.category)}</span>
        <div class="task-text">${escapeHtml(item.task)}</div>
        <div id="question-body"></div>
        <div class="feedback-banner" id="feedback"></div>
        <div class="footer-actions" id="footer-actions"></div>
      </div>
    `;

    document.getElementById('btn-quit').addEventListener('click', () => {
      if (confirm('Quit this round and return to setup?')) {
        state.screen = 'start';
        renderStart();
      }
    });

    if (mode === 'press') {
      renderCaptureZone(item);
    } else {
      renderQuizZone(item, r.mode === 'press');
    }

    attachGameKeyHandler();
  }

  function renderCaptureZone(item) {
    const body = document.getElementById('question-body');
    body.innerHTML = `
      <div class="capture-zone" id="capture-zone">
        <div class="prompt">Press the shortcut on your keyboard now</div>
        <div class="kbd-row" id="live-keys"></div>
      </div>
    `;
  }

  function renderQuizZone(item, autoFallback) {
    const r = state.round;
    const body = document.getElementById('question-body');
    const platform = r.platform;
    const correctLabels = item[platform].labels;
    const correctStr = correctLabels.join('+');

    const others = shuffle(SHORTCUTS.filter((s) => s.id !== item.id))
      .filter((s, idx, arr) => arr.findIndex((x) => x[platform].labels.join('+') === s[platform].labels.join('+')) === idx)
      .filter((s) => s[platform].labels.join('+') !== correctStr)
      .slice(0, 3);

    const choices = shuffle([
      { id: item.id, labels: correctLabels, correct: true },
      ...others.map((o) => ({ id: o.id, labels: o[platform].labels, correct: false })),
    ]);

    r.lockedChoices = choices;

    body.innerHTML = `
      ${autoFallback ? '<div class="subtitle" style="margin-bottom:12px;">⚡ Auto-switched to multiple choice — this shortcut can\'t be reliably captured in a browser.</div>' : ''}
      <div class="choice-grid">
        ${choices.map((c, i) => `<button class="choice-btn" data-choice="${i}">${kbdRowHtml(c.labels)}</button>`).join('')}
      </div>
    `;

    body.querySelectorAll('[data-choice]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.choice, 10);
        answerQuiz(idx);
      });
    });
  }

  function attachGameKeyHandler() {
    detachGameKeyHandler();
    gameKeyHandler = function (e) {
      const r = state.round;
      if (!r) return;

      if (r.answered) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          advance();
        }
        return;
      }

      const item = currentItem();
      const mode = effectiveMode(item);

      if (mode === 'quiz') {
        if (e.key === 'Escape') { e.preventDefault(); answerQuiz(-1); }
        else if (['1', '2', '3', '4'].includes(e.key) && r.lockedChoices) {
          const idx = parseInt(e.key, 10) - 1;
          if (idx < r.lockedChoices.length) { e.preventDefault(); answerQuiz(idx); }
        }
        return;
      }

      // press mode
      if (e.key === 'Escape') { e.preventDefault(); answerPress(false); return; }
      if (MODIFIER_KEYS.has(e.key)) {
        updateLiveKeys(e);
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      const pressed = { ctrl: e.ctrlKey, alt: e.altKey, shift: e.shiftKey, meta: e.metaKey, key: e.key };
      const target = item[r.platform].spec;
      const isCorrect = specMatches(target, pressed);
      answerPress(isCorrect);
    };
    document.addEventListener('keydown', gameKeyHandler, true);
  }

  function updateLiveKeys(e) {
    const el = document.getElementById('live-keys');
    if (!el) return;
    const chips = [];
    if (e.ctrlKey) chips.push('Ctrl');
    if (e.altKey) chips.push(state.round.platform === 'mac' ? 'Option' : 'Alt');
    if (e.shiftKey) chips.push('Shift');
    if (e.metaKey) chips.push('Cmd');
    el.innerHTML = chips.map(kbdHtml).join('');
  }

  function answerPress(isCorrect) {
    const r = state.round;
    const item = currentItem();
    r.answered = true;
    if (isCorrect) registerCorrect(item); else registerWrong(item);

    const zone = document.getElementById('capture-zone');
    if (zone) zone.classList.add(isCorrect ? 'correct' : 'wrong');

    showFeedback(isCorrect, item);
  }

  function answerQuiz(choiceIdx) {
    const r = state.round;
    if (r.answered) return;
    const item = currentItem();
    r.answered = true;
    const choices = r.lockedChoices;
    const isCorrect = choiceIdx >= 0 && choices[choiceIdx].correct;

    document.querySelectorAll('[data-choice]').forEach((btn, i) => {
      btn.disabled = true;
      if (choices[i].correct) btn.classList.add('correct');
      else if (i === choiceIdx) btn.classList.add('wrong');
    });

    if (isCorrect) registerCorrect(item); else registerWrong(item);
    showFeedback(isCorrect, item);
  }

  function registerCorrect(item) {
    const r = state.round;
    r.score += 10 + Math.min(r.streak, 10) * 2;
    r.streak += 1;
    r.bestStreak = Math.max(r.bestStreak, r.streak);
    r.correctCount += 1;
    bumpCategory(item.category, true);
    r.lastResultCorrect = true;
  }

  function registerWrong(item) {
    const r = state.round;
    r.streak = 0;
    bumpCategory(item.category, false);
    r.missed.push(item);
    r.lastResultCorrect = false;
  }

  function bumpCategory(cat, correct) {
    const r = state.round;
    if (!r.perCategory[cat]) r.perCategory[cat] = { correct: 0, total: 0 };
    r.perCategory[cat].total += 1;
    if (correct) r.perCategory[cat].correct += 1;
  }

  function showFeedback(isCorrect, item) {
    const r = state.round;
    const banner = document.getElementById('feedback');
    const labels = item[r.platform].labels;
    banner.className = `feedback-banner show ${isCorrect ? 'correct' : 'wrong'}`;
    banner.innerHTML = isCorrect
      ? `✅ Correct! ${kbdRowHtml(labels)}`
      : `❌ Not quite. The shortcut is: ${kbdRowHtml(labels)}`;

    const footer = document.getElementById('footer-actions');
    const isLast = r.index === r.queue.length - 1;
    footer.innerHTML = `<button class="btn-primary" id="btn-next">${isLast ? 'See results' : 'Next'} (Enter)</button>`;
    document.getElementById('btn-next').addEventListener('click', advance);
  }

  function advance() {
    const r = state.round;
    if (r.index + 1 >= r.queue.length) {
      finishRound();
    } else {
      r.index += 1;
      r.answered = false;
      r.lastResultCorrect = null;
      renderGame();
    }
  }

  function finishRound() {
    const r = state.round;
    const accuracy = r.queue.length ? Math.round((r.correctCount / r.queue.length) * 100) : 0;
    const bestStats = saveStats(r.platform, r.score, accuracy);
    state.screen = 'results';
    renderResults(accuracy, bestStats);
  }

  // ---------------- results ----------------

  function renderResults(accuracy, bestStats) {
    detachGameKeyHandler();
    const r = state.round;
    const elapsedSec = Math.round((Date.now() - r.startedAt) / 1000);

    const catRows = Object.keys(r.perCategory).sort().map((c) => {
      const d = r.perCategory[c];
      return `<tr><td>${escapeHtml(c)}</td><td>${d.correct} / ${d.total}</td></tr>`;
    }).join('');

    const missedRows = r.missed.length
      ? r.missed.map((item) => `
        <div class="missed-item">
          <span class="task">${escapeHtml(item.task)}</span>
          ${kbdRowHtml(item[r.platform].labels)}
        </div>`).join('')
      : '<div class="subtitle">No misses — clean round.</div>';

    app.innerHTML = `
      <div class="header">
        <h1>Excel Shortcut <span class="accent">Trainer</span></h1>
      </div>

      <div class="panel">
        <div class="score-hero">
          <div class="big">${r.score}</div>
          <div class="label">points · ${platformLabel(r.platform)} · ${accuracy}% accuracy</div>
        </div>

        <div class="stat-grid">
          <div class="stat-card"><div class="num">${r.correctCount}/${r.queue.length}</div><div class="lbl">Correct</div></div>
          <div class="stat-card"><div class="num">${r.bestStreak}</div><div class="lbl">Best streak</div></div>
          <div class="stat-card"><div class="num">${elapsedSec}s</div><div class="lbl">Time</div></div>
        </div>

        ${bestStats ? `<div class="subtitle" style="text-align:center;margin-bottom:10px;">Personal best on ${platformLabel(r.platform)}: ${bestStats.bestScore} pts</div>` : ''}

        <h3>Breakdown by category</h3>
        <table class="breakdown"><thead><tr><th>Category</th><th>Correct</th></tr></thead><tbody>${catRows}</tbody></table>

        <h3>Shortcuts to review</h3>
        ${missedRows}

        <div class="btn-row">
          <button class="btn-primary" id="btn-again">Play Again</button>
          <button class="btn-secondary" id="btn-settings">Change Settings</button>
          <button class="btn-secondary" id="btn-cheatsheet2">View Cheat Sheet</button>
        </div>
      </div>
    `;

    document.getElementById('btn-again').addEventListener('click', startRound);
    document.getElementById('btn-settings').addEventListener('click', () => {
      state.screen = 'start';
      renderStart();
    });
    document.getElementById('btn-cheatsheet2').addEventListener('click', () => openCheatSheet(r.platform));
  }

  // ---------------- cheat sheet modal ----------------

  function openCheatSheet(platform) {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.id = 'cheat-overlay';

    const groups = CATEGORIES.map((cat) => {
      const items = SHORTCUTS.filter((s) => s.category === cat);
      if (!items.length) return '';
      const rows = items.map((item) => `
        <div class="cheat-row">
          <span class="task">${escapeHtml(item.task)}</span>
          ${kbdRowHtml(item[platform].labels)}
        </div>`).join('');
      return `<div class="cheat-cat"><h4>${escapeHtml(cat)}</h4>${rows}</div>`;
    }).join('');

    overlay.innerHTML = `
      <div class="modal">
        <div class="modal-header">
          <h2>Cheat Sheet — ${platformLabel(platform)}</h2>
          <button class="close-x" id="cheat-close">&times;</button>
        </div>
        <div class="option-grid" style="margin-bottom:16px;">
          <button class="option-btn ${platform === 'win' ? 'selected' : ''}" id="cheat-win">Windows</button>
          <button class="option-btn ${platform === 'mac' ? 'selected' : ''}" id="cheat-mac">Mac</button>
        </div>
        ${groups}
      </div>
    `;

    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeCheatSheet(); });
    document.getElementById('cheat-close').addEventListener('click', closeCheatSheet);
    document.getElementById('cheat-win').addEventListener('click', () => { closeCheatSheet(); openCheatSheet('win'); });
    document.getElementById('cheat-mac').addEventListener('click', () => { closeCheatSheet(); openCheatSheet('mac'); });
  }

  function closeCheatSheet() {
    const overlay = document.getElementById('cheat-overlay');
    if (overlay) overlay.remove();
  }

  // ---------------- boot ----------------

  renderStart();
})();
