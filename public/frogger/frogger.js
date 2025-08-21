const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

canvas.setAttribute('tabindex', '0');
canvas.focus();
canvas.addEventListener('pointerdown', () => canvas.focus()); // tap/click to refocus

// ----------------------- Tunables & Assets -----------------------
const grid = 48;          // each hop is 48px
const gridGap = 10;       // vertical visual gap for rows
const API_BASE = 'http://localhost:3001'; // ← change if your API runs elsewhere
const DEBUG = false;      // set true to show a small debug banner

// Home slots (top green bar) start columns; each slot is 2 columns wide.
const HOME_SLOTS = [1, 4, 7, 10];

const frogImg = new Image();
frogImg.src = 'assets/frog.png';

const logImg = new Image();
logImg.src = 'assets/log.png';

// ----------------------- User / Highscore state -----------------------
let studentId = null;
try {
  const u = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const rawId = u?.id ?? u?.studentId ?? u?.userId;
  const parsed = Number(rawId);
  if (Number.isFinite(parsed) && parsed > 0) studentId = parsed;
} catch (e) {
  console.warn('Could not parse currentUser from localStorage:', e);
}

let score = 0;
let highscoreAtStart = 0;  // server value at load time
let displayedHigh = 0;     // what we render and compare against

// Optional small debug banner
let banner = null;
if (DEBUG) {
  banner = document.createElement('div');
  Object.assign(banner.style, {
    position: 'fixed', left: '8px', top: '8px', padding: '6px 10px',
    background: 'rgba(0,0,0,0.6)', color: '#fff', font: '12px/1.3 monospace',
    borderRadius: '6px', zIndex: 9999
  });
  document.body.appendChild(banner);
}
function updateBanner() {
  if (!DEBUG || !banner) return;
  banner.textContent = `ID=${studentId ?? 'none'} High=${displayedHigh} Score=${score}`;
}
function setDisplayedHigh(n) {
  const v = Number(n);
  displayedHigh = Number.isFinite(v) && v >= 0 ? v : 0;
  updateBanner();
}
setDisplayedHigh(0);

// ----------------------- Sprites -----------------------
function Sprite(properties) { Object.assign(this, properties); }
Sprite.prototype.render = function () {
  if (this.image) {
    if (this.shape === 'rect') {
      context.drawImage(this.image, this.x, this.y + gridGap / 2, this.size, grid - gridGap);
    } else {
      context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
  } else {
    context.fillStyle = this.color;
    if (this.shape === 'rect') {
      context.fillRect(this.x, this.y + gridGap / 2, this.size, grid - gridGap);
    } else {
      context.beginPath();
      context.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2 - gridGap / 2, 0, 2 * Math.PI);
      context.fill();
    }
  }
};

// Player
const frogger = new Sprite({
  x: grid * 6,
  y: grid * 13,
  color: 'greenyellow',
  size: grid,
  shape: 'circle',
  speed: 0,
  image: frogImg
});

// Frogs “parked” in home slots
const scoredFroggers = [];

// ----------------------- Row patterns -----------------------
const patterns = [
  null,
  { spacing: [2], color: '#c55843', size: grid * 4, shape: 'rect', speed: 0.75, image: logImg },
  { spacing: [0, 2, 0, 2, 0, 2, 0, 4], color: '#de0004', size: grid, shape: 'circle', speed: -1 },
  { spacing: [2], color: '#c55843', size: grid * 7, shape: 'rect', speed: 1.5, image: logImg },
  { spacing: [3], color: '#c55843', size: grid * 3, shape: 'rect', speed: 0.5, image: logImg },
  { spacing: [0, 0, 1], color: '#de0004', size: grid, shape: 'circle', speed: -1 },
  null,
  { spacing: [3, 8], color: '#c2c4da', size: grid * 2, shape: 'rect', speed: -1 },
  { spacing: [14], color: '#c2c4da', size: grid, shape: 'rect', speed: 0.75 },
  { spacing: [3, 3, 7], color: '#de3cdd', size: grid, shape: 'rect', speed: -0.75 },
  { spacing: [3, 3, 7], color: '#0bcb00', size: grid, shape: 'rect', speed: 0.5 },
  { spacing: [4], color: '#e5e401', size: grid, shape: 'rect', speed: -0.5 },
  null
];

// Build moving rows from patterns
const rows = [];
for (let r = 0; r < patterns.length; r++) {
  rows[r] = [];
  const pattern = patterns[r];
  if (!pattern) continue;

  let x = 0;
  let spacingIndex = 0;
  const totalPatternWidth =
    pattern.spacing.reduce((sum, space) => sum + space, 0) * grid +
    pattern.spacing.length * pattern.size;

  let endX = 0;
  while (endX < canvas.width) endX += totalPatternWidth;
  endX += totalPatternWidth;

  while (x < endX) {
    rows[r].push(new Sprite({
      x,
      y: grid * (r + 1),
      index: spacingIndex,
      ...pattern
    }));
    const spacingArr = pattern.spacing;
    x += pattern.size + spacingArr[spacingIndex] * grid;
    spacingIndex = (spacingIndex + 1) % spacingArr.length;
  }
}

// ----------------------- Highscore API -----------------------
async function fetchHighscoreFrogger(id) {
  if (!id) return;
  try {
    const res = await fetch(`${API_BASE}/student/${id}/highscore/frogger`);
    if (!res.ok) {
      console.warn('[GET] highscore not ok:', res.status, await res.text().catch(() => ''));
      return;
    }
    let data = {};
    try { data = await res.json(); } catch { /* non-JSON; ignore */ }
    const hs = Number(data?.highscore ?? data?.score ?? 0);
    if (Number.isFinite(hs)) {
      highscoreAtStart = hs;
      setDisplayedHigh(hs);
    } else {
      console.warn('[GET] highscore not numeric:', data);
    }
  } catch (e) {
    console.error('[GET] highscore error:', e);
  }
}

async function saveHighscoreFrogger(id, newScore) {
  if (!id) return;
  try {
    const res = await fetch(`${API_BASE}/student/highscore/frogger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId: id, highscore: newScore }),
    });

    if (!res.ok) {
      console.warn('[POST] save not ok:', res.status, await res.text().catch(() => ''));
      return;
    }

    const ct = res.headers.get('content-type') || '';
    let data = null;
    if (ct.includes('application/json')) {
      data = await res.json().catch(() => null);
    } else {
      const t = await res.text().catch(() => '');
      const n = Number(t);
      data = Number.isFinite(n) ? { highscore: n } : null;
    }

    const hs = Number(data?.highscore ?? data?.score ?? newScore);
    if (Number.isFinite(hs)) {
      setDisplayedHigh(hs);          // reflect server echo
    } else {
      setDisplayedHigh(Math.max(displayedHigh, newScore)); // fallback
    }
  } catch (e) {
    console.error('[POST] save error:', e);
  }
}

// Save if score beats current displayed high (optimistic update)
function maybeSaveHighscore() {
  if (!studentId) return;
  const safeHigh = Number.isFinite(displayedHigh) ? displayedHigh : 0;
  if (score > safeHigh) {
    setDisplayedHigh(score);                // show it now
    saveHighscoreFrogger(studentId, score); // persist to backend
  }
}

// ----------------------- Helpers -----------------------
function getHomeSlotStartCol(centerCol) {
  // A frog centered on col 1 or 2 is in slot starting at 1; etc.
  for (const start of HOME_SLOTS) {
    if (centerCol === start || centerCol === start + 1) return start;
  }
  return null;
}

function resetFrog() {
  frogger.x = grid * 6;
  frogger.y = grid * 13;
  frogger.speed = 0;
}

// ----------------------- Main Loop -----------------------
function gameLoop() {
  requestAnimationFrame(gameLoop);
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Background: water, goal bar, road
  context.fillStyle = '#000047';
  context.fillRect(0, grid, canvas.width, grid * 6);

  // Top goal bar + slots
  context.fillStyle = '#1ac300';
  context.fillRect(0, grid, canvas.width, 5);
  context.fillRect(0, grid, 5, grid);
  context.fillRect(canvas.width - 5, grid, 5, grid);
  for (let i = 0; i < 4; i++) {
    context.fillRect(grid + grid * 3 * i, grid, grid * 2, grid);
  }

  // Road separators
  context.fillStyle = '#8500da';
  context.fillRect(0, 7 * grid, canvas.width, grid);
  context.fillRect(0, canvas.height - grid * 2, canvas.width, grid);

  // Move & render moving sprites
  for (let r = 0; r < rows.length; r++) {
    for (let sprite of rows[r]) {
      sprite.x += sprite.speed;
      sprite.render();

      // Wrap-around logic
      if (sprite.speed < 0 && sprite.x < -sprite.size) {
        let rightmost = sprite;
        for (let s of rows[r]) if (s.x > rightmost.x) rightmost = s;
        const spacingArr = patterns[r].spacing;
        sprite.x = rightmost.x + rightmost.size + spacingArr[rightmost.index] * grid;
        sprite.index = (rightmost.index + 1) % spacingArr.length;
      } else if (sprite.speed > 0 && sprite.x > canvas.width) {
        let leftmost = sprite;
        for (let s of rows[r]) if (s.x < leftmost.x) leftmost = s;
        const spacingArr = patterns[r].spacing;
        let newIndex = leftmost.index - 1;
        if (newIndex < 0) newIndex = spacingArr.length - 1;
        sprite.x = leftmost.x - spacingArr[newIndex] * grid - sprite.size;
        sprite.index = newIndex;
      }
    }
  }

  // Player movement from platform carry
  frogger.x += frogger.speed || 0;
  frogger.render();
  scoredFroggers.forEach(f => f.render());

  // Collision / platform riding
  const froggerRowIndex = ((frogger.y / grid) - 1) | 0;
  let onObstacle = false;

  if (rows[froggerRowIndex]) {
    for (let sprite of rows[froggerRowIndex]) {
      const overlap =
        frogger.x < sprite.x + sprite.size - gridGap &&
        frogger.x + grid - gridGap > sprite.x &&
        frogger.y < sprite.y + grid &&
        frogger.y + grid > sprite.y;

      if (overlap) {
        onObstacle = true;
        if (froggerRowIndex > rows.length / 2) {
          // Hit a vehicle → reset
          resetFrog();
        } else {
          // Water platforms → carry the frog
          frogger.speed = sprite.speed;
        }
      }
    }
  }

  // Water logic & home scoring
    if (!onObstacle) {
  frogger.speed = 0;

  const centerCol = Math.floor((frogger.x + grid / 2) / grid);

  if (froggerRowIndex === 0) {
    // Check the real home slots: [1–2], [4–5], [7–8], [10–11]
    const slotStartCol = getHomeSlotStartCol(centerCol);

    if (slotStartCol !== null) {
      const alreadyFilled = scoredFroggers.some(f => f.slotStartCol === slotStartCol);
      if (!alreadyFilled) {
        // Place frog in that slot and score
        scoredFroggers.push(new Sprite({
          ...frogger,
          x: slotStartCol * grid,
          y: frogger.y + 5,
          slotStartCol
        }));

        score += 10;

        // Immediately reflect a new high locally, then persist
        if (score > (Number.isFinite(displayedHigh) ? displayedHigh : 0)) {
          setDisplayedHigh(score);
        }
        maybeSaveHighscore();

        // Reset player
        frogger.x = grid * 6;
        frogger.y = grid * 13;
        return;
      }
    }
    // Top row but not a valid/empty slot → reset
    frogger.x = grid * 6;
    frogger.y = grid * 13;

  } else if (froggerRowIndex < rows.length / 2 - 1) {
    // In water without platform → drown → reset
    frogger.x = grid * 6;
    frogger.y = grid * 13;
  }
}

    // HUD
    context.fillStyle = '#ffffff';
    context.font = '20px Arial';
    context.textBaseline = 'bottom';

    context.textAlign = 'left';
    context.fillText('Score: ' + score, 5, canvas.height - 5);

    context.textAlign = 'right';
    context.fillText('High: ' + displayedHigh, canvas.width - 5, canvas.height - 5);

    context.textAlign = 'left';
  }

// ----------------------- Controls -----------------------
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft':  frogger.x -= grid; break;
    case 'ArrowRight': frogger.x += grid; break;
    case 'ArrowUp':    frogger.y -= grid; break;
    case 'ArrowDown':  frogger.y += grid; break;
    default: return;
  }
  frogger.x = Math.max(0, Math.min(frogger.x, canvas.width - grid));
  frogger.y = Math.max(grid, Math.min(frogger.y, canvas.height - grid * 2));
});

// ----------------------- Boot -----------------------
window.addEventListener('unhandledrejection', ev => console.error('Unhandled rejection:', ev.reason));
window.addEventListener('error', ev => console.error('Window error:', ev.error || ev.message));

// Start the loop after trying to fetch starting highscore (always start the loop)
Promise.resolve(fetchHighscoreFrogger(studentId)).finally(() => {
  requestAnimationFrame(gameLoop);
});