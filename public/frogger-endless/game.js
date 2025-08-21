//// =========================  Frogger Endless (game.js)  =========================
//// Drop-in replacement with backend highscore sync

// ---------------------- Canvas & Rendering ----------------------
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const CANVAS_WIDTH  = canvas.width;
const CANVAS_HEIGHT = canvas.height;

const LANE_HEIGHT = 40;
const COL_WIDTH   = 40;
const NUM_COLS    = Math.floor(CANVAS_WIDTH / COL_WIDTH);

const laneTypes = { ROAD: 'road', WATER: 'water', SAFE: 'safe' };

// ---------------------- Scores & Backend Wiring ----------------------
let score = 0;
let highScore = 0;      // local “best so far” (HUD + localStorage)
let uploadedHigh = 0;   // last value we successfully attempted to upload

const API_BASE = 'http://localhost:3001';

// Resolve studentId from localStorage.currentUser
let studentId = null;
try {
  const u = JSON.parse(localStorage.getItem('currentUser') || '{}');
  const rawId = u?.id ?? u?.studentId ?? u?.userId;
  const parsed = Number(rawId);
  if (Number.isFinite(parsed) && parsed > 0) studentId = parsed;
} catch {}

// HUD updater
function renderHud() {
  const el = document.getElementById('scoreDisplay');
  if (el) el.innerText = `Score: ${score}    High: ${highScore}`;
}

// Pull server highscore (preferred), fall back to localStorage
async function initHighScore() {
  highScore = parseInt(localStorage.getItem('froggerHighScore'), 10) || 0;

  if (!studentId) {
    renderHud();
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/student/${studentId}/highscore/frogger`);
    if (res.ok) {
      const data = await res.json().catch(() => ({}));
      const hs = Number(data?.highscore ?? data?.score ?? 0);
      if (Number.isFinite(hs) && hs >= 0) {
        highScore = Math.max(highScore, hs);
        uploadedHigh = highScore;
        localStorage.setItem('froggerHighScore', String(highScore));
      }
    }
  } catch {}
  renderHud();
}

// Persist high to backend (tolerant to empty/non-JSON responses)
async function saveHighToBackend(hs) {
  if (!studentId) return;
  try {
    const res = await fetch(`${API_BASE}/student/highscore/frogger`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, highscore: hs }),
    });
    if (!res.ok) return; // backend decides if it updates
    uploadedHigh = hs;
  } catch {}
}

// Single place to bump high, render, persist locally, and POST if increased
function bumpHighIfNeeded(reason = '') {
  const prev = highScore;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('froggerHighScore', String(highScore));
    renderHud();
    if (highScore > uploadedHigh) {
      saveHighToBackend(highScore);
    }
  } else if (prev !== highScore) {
    // keep HUD consistent even if something external changed
    renderHud();
  }
}

// ---------------------- Game State & Assets ----------------------
let gameOver = false;
let gamePaused = false;
let invulnFrames = 0;
let debugNoDeath = false;
let animationFrameId;

const frog = {
  x: 0,
  laneIndex: 0,
  width: 32, height: 32,
  facing: 'up',
  jumping: false,
  jumpFrameIndex: 0,
  onPlatform: false,
  vx: 0,
  dead: false
};

let lanes = [];
let nextSectionType = laneTypes.ROAD;
let lanesInSectionRemaining = 0;

const MIN_ROAD_LANES = 2;
const MAX_ROAD_LANES = 4;
const MIN_WATER_LANES = 3;
const MAX_WATER_LANES = 5;

const lilyPadProbability = 0.3;
const lilyPadWidth = 32;
const lilyPadCountRange = [2, 3];

// Difficulty
let baseSpeed = 2;
let speedIncrement = 0.05;
let spawnChance = 0.02;

// Assets
const frogFrames = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
for (let i = 0; i < frogFrames.length; i++) frogFrames[i].src = `/frogger-endless/frog${i+1}.png`;

const carImages = [ new Image(), new Image(), new Image(), new Image() ];
carImages[0].src = '/frogger-endless/car1.png';
carImages[1].src = '/frogger-endless/car2.png';
carImages[2].src = '/frogger-endless/car3.png';
carImages[3].src = '/frogger-endless/car4.png';

const imgLog     = new Image(); imgLog.src     = '/frogger-endless/log.png';
const imgCroc    = new Image(); imgCroc.src    = '/frogger-endless/croc.png';
const imgLilypad = new Image(); imgLilypad.src = '/frogger-endless/lilypad.png';
const imgGrass   = new Image(); imgGrass.src   = '/frogger-endless/tile_grass.png';
const imgRoad1   = new Image(); imgRoad1.src   = '/frogger-endless/tile_road1.png';
const imgRoad2   = new Image(); imgRoad2.src   = '/frogger-endless/tile_road2.png';
const imgWater   = new Image(); imgWater.src   = '/frogger-endless/tile_water.png';
const imgTree    = new Image(); imgTree.src    = '/frogger-endless/tile_tree.png';

const allImgs = [...frogFrames, ...carImages, imgLog, imgCroc, imgLilypad, imgGrass, imgRoad1, imgRoad2, imgWater, imgTree];
let assetsLoaded = 0;
const totalAssets = allImgs.length;
function markLoaded() {
  assetsLoaded++;
  if (assetsLoaded >= totalAssets) startGame();
}
function markError(tag, src) {
  console.error(`FAILED to load ${tag} -> ${src}`);
  markLoaded();
}

[
  ['frog1', frogFrames[0]],
  ['frog2', frogFrames[1]],
  ['frog3', frogFrames[2]],
  ['frog4', frogFrames[3]],
  ['frog5', frogFrames[4]],
  ['frog6', frogFrames[5]],
  ['car1', carImages[0]],
  ['car2', carImages[1]],
  ['car3', carImages[2]],
  ['car4', carImages[3]],
  ['log', imgLog],
  ['croc', imgCroc],
  ['lilypad', imgLilypad],
  ['grass', imgGrass],
  ['road1', imgRoad1],
  ['road2', imgRoad2],
  ['water', imgWater],
  ['tree', imgTree],
].forEach(([tag, img]) => {
  img.onload = markLoaded;
  img.onerror = () => markError(tag, img.src);
});

// ---------------------- Init / Start ----------------------
async function startGame() {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);

  // reset state
  score = 0;
  gameOver = false;
  gamePaused = false;
  frog.dead = false;
  frog.onPlatform = false;
  frog.vx = 0;
  frog.laneIndex = 0;
  frog.facing = 'up';
  frog.jumping = false;
  frog.jumpFrameIndex = 0;

  baseSpeed = 2;
  speedIncrement = 0.05;
  spawnChance = 0.02;
  invulnFrames = 0;

  frog.x = (CANVAS_WIDTH / 2) - (frog.width / 2);

  // load high from backend/localStorage (once per page load)
  if (assetsLoaded === totalAssets) await initHighScore();
  renderHud();

  // seed lanes
  lanes = [];
  nextSectionType = laneTypes.ROAD;
  lanesInSectionRemaining = 0;

  let index = 0;
  createLane(index, laneTypes.SAFE); // bottom lane
  index++;

  const lanesNeeded = Math.ceil(CANVAS_HEIGHT / LANE_HEIGHT) + 2;
  while (lanes.length < lanesNeeded) {
    const prevLane = lanes[lanes.length - 1];
    if (prevLane && prevLane.type === laneTypes.SAFE) {
      lanesInSectionRemaining = (nextSectionType === laneTypes.ROAD)
        ? getRandomInt(MIN_ROAD_LANES, MAX_ROAD_LANES)
        : getRandomInt(MIN_WATER_LANES, MAX_WATER_LANES);
    }
    if (lanesInSectionRemaining > 0) {
      createLane(index, nextSectionType);
      lanesInSectionRemaining--;
      index++;
      if (lanesInSectionRemaining === 0) {
        nextSectionType = (nextSectionType === laneTypes.ROAD) ? laneTypes.WATER : laneTypes.ROAD;
      }
    } else {
      createLane(index, laneTypes.SAFE);
      index++;
    }
  }

  animationFrameId = requestAnimationFrame(gameLoop);
}

// ---------------------- Loop & Updates ----------------------
function gameLoop() {
  if (gamePaused) {
    animationFrameId = requestAnimationFrame(gameLoop);
    return;
  }

  // Keep local high in sync while playing (so dying still preserves best run)
  bumpHighIfNeeded('frame');

  updateObjects();
  checkCollisions();
  manageLanes();

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawBackground();
  drawObjects();
  drawFrog();

  if (frog.dead && !debugNoDeath) {
    handleGameOverDisplay();
  }

  animationFrameId = requestAnimationFrame(gameLoop);
}

function updateObjects() {
  if (gamePaused) return;

  for (let lane of lanes) {
    if (lane.type === laneTypes.ROAD) {
      const effectiveSpawnChance = spawnChance + (score * 0.0005);
      if (Math.random() < effectiveSpawnChance) spawnCar(lane);
      for (let car of lane.cars) car.x += car.speed;
      lane.cars = lane.cars.filter(car => car.x + car.width > -50 && car.x < CANVAS_WIDTH + 50);
    } else if (lane.type === laneTypes.WATER && !lane.isLilyPadLane) {
      if (Math.random() < spawnChance) spawnPlatform(lane);
      for (let pl of lane.platforms) pl.x += pl.speed;
      lane.platforms = lane.platforms.filter(pl => pl.x + (pl.drawWidth || pl.width) > -100 && pl.x < CANVAS_WIDTH + 100);
    }
  }

  if (frog.onPlatform) frog.x += frog.vx;

  // bounds
  if (frog.x < 0) frog.x = 0;
  if (frog.x + frog.width > CANVAS_WIDTH) frog.x = CANVAS_WIDTH - frog.width;
}

function checkCollisions() {
  if (gamePaused) return;
  if (invulnFrames > 0) { invulnFrames--; return; }

  const frogLane = lanes.find(l => l.index === frog.laneIndex);
  if (!frogLane) return;

  // ROAD hits
  if (frogLane.type === laneTypes.ROAD) {
    for (let car of frogLane.cars) {
      if (frog.x < car.x + car.width && frog.x + frog.width > car.x) {
        if (!debugNoDeath) {
          frog.dead = true; gameOver = true;
          bumpHighIfNeeded('death'); // finalize best run & POST if higher
        }
      }
    }
  }

  // reset platform carry each frame
  frog.onPlatform = false; frog.vx = 0;

  // WATER
  if (frogLane.type === laneTypes.WATER) {
    const minOverlap = frog.width * 0.3;
    const overlapWidth = (obj) => {
      const w = obj.drawWidth || obj.width;
      const L = Math.max(frog.x, obj.x);
      const R = Math.min(frog.x + frog.width, obj.x + w);
      return Math.max(0, R - L);
    };

    if (frogLane.isLilyPadLane) {
      let safe = false;
      for (let pad of frogLane.platforms) {
        if (overlapWidth(pad) >= minOverlap) { safe = true; break; }
      }
      if (!safe && !debugNoDeath) {
        frog.dead = true; gameOver = true;
        bumpHighIfNeeded('death');
        return;
      }
    } else {
      let onPlat = false;
      for (let pl of frogLane.platforms) {
        if (overlapWidth(pl) >= minOverlap) {
          onPlat = true; frog.onPlatform = true; frog.vx = pl.speed; break;
        }
      }
      if (!onPlat && !debugNoDeath) {
        frog.dead = true; gameOver = true;
        bumpHighIfNeeded('death');
        return;
      }
      if (frog.onPlatform && (frog.x < -frog.width || frog.x > CANVAS_WIDTH) && !debugNoDeath) {
        frog.dead = true; gameOver = true;
        bumpHighIfNeeded('death');
        return;
      }
    }
  }
}

function manageLanes() {
  const VISIBLE_AHEAD  = Math.ceil(CANVAS_HEIGHT / LANE_HEIGHT / 2) + 2;
  const VISIBLE_BEHIND = Math.ceil(CANVAS_HEIGHT / LANE_HEIGHT / 2) + 3;

  lanes = lanes.filter(lane => {
    if (lane.index === frog.laneIndex) return true;
    const y = getLaneScreenY(lane.index);
    return y > -LANE_HEIGHT * VISIBLE_BEHIND && y < CANVAS_HEIGHT + LANE_HEIGHT;
  });

  if (!lanes.find(l => l.index === frog.laneIndex)) createLane(frog.laneIndex, laneTypes.SAFE);
  if (lanes.length === 0) createLane(frog.laneIndex, laneTypes.SAFE);

  let maxIndex = Math.max(...lanes.map(l => l.index));
  if (!isFinite(maxIndex)) maxIndex = frog.laneIndex;

  const targetTopIndex = frog.laneIndex + VISIBLE_AHEAD;

  for (let safety = 0; maxIndex < targetTopIndex && safety < 100; safety++) {
    const newIndex = maxIndex + 1;
    const prevLane = lanes.find(l => l.index === maxIndex);

    if (prevLane && prevLane.type === laneTypes.SAFE) {
      lanesInSectionRemaining = (nextSectionType === laneTypes.ROAD)
        ? getRandomInt(MIN_ROAD_LANES, MAX_ROAD_LANES)
        : getRandomInt(MIN_WATER_LANES, MAX_WATER_LANES);
    }

    if (lanesInSectionRemaining > 0) {
      createLane(newIndex, nextSectionType);
      lanesInSectionRemaining--;
      if (lanesInSectionRemaining === 0) {
        nextSectionType = (nextSectionType === laneTypes.ROAD) ? laneTypes.WATER : laneTypes.ROAD;
      }
    } else {
      createLane(newIndex, laneTypes.SAFE);
    }
    maxIndex = newIndex;
  }
}

// ---------------------- Spawning & Drawing ----------------------
function spawnCar(lane) {
  const goingRight = (lane.dir === 1);
  const carWidth = 64;
  const carSpeed = lane.speed * lane.dir;
  const spawnX = goingRight ? -carWidth : CANVAS_WIDTH;
  const minGap = 80;

  for (const car of lane.cars) {
    if (goingRight && Math.abs(car.x - spawnX) < minGap) return;
    if (!goingRight && Math.abs((car.x + car.width) - spawnX) < minGap) return;
  }
  const spriteIndex = Math.floor(Math.random() * carImages.length);
  lane.cars.push({ x: spawnX, width: carWidth, sprite: carImages[spriteIndex], speed: carSpeed });
}

function spawnPlatform(lane) {
  const movingRight = lane.dir === 1;
  const baseWidth   = 64;
  const isCroc      = Math.random() < 0.5;
  const drawWidth   = isCroc ? baseWidth * 1.5 : baseWidth;
  const sprite      = isCroc ? imgCroc : imgLog;
  const speed       = lane.speed * lane.dir;
  const spawnX      = movingRight ? -drawWidth : CANVAS_WIDTH;
  const minClearance = drawWidth + 20;

  for (const pl of lane.platforms) {
    const existingRight = pl.x + (pl.drawWidth || baseWidth);
    const newRight = spawnX + drawWidth;
    let gap = movingRight ? (pl.x - newRight) : (spawnX - existingRight);
    if (gap < minClearance) return;
  }

  lane.platforms.push({ x: spawnX, width: baseWidth, drawWidth, sprite, speed });
}

function drawBackground() {
  for (let lane of lanes) {
    const y = Math.floor(getLaneScreenY(lane.index));
    if (lane.type === laneTypes.SAFE) {
      for (let x = 0; x < CANVAS_WIDTH; x += 32) ctx.drawImage(imgGrass, x, y, 32, LANE_HEIGHT);
    } else if (lane.type === laneTypes.ROAD) {
      const tileImg = lane.isFirstRoadLane ? imgRoad1 : imgRoad2;
      const tileWidth = 64;
      for (let x = 0; x < CANVAS_WIDTH; x += tileWidth) ctx.drawImage(tileImg, x, y, tileWidth, LANE_HEIGHT);
    } else if (lane.type === laneTypes.WATER) {
      for (let x = 0; x < CANVAS_WIDTH; x += 32) ctx.drawImage(imgWater, x, y, 32, LANE_HEIGHT);
    }
  }
  // trees below lowest lane
  let maxLaneY = -Infinity;
  for (let lane of lanes) {
    const y = Math.floor(getLaneScreenY(lane.index));
    if (y > maxLaneY) maxLaneY = y;
  }
  for (let y = maxLaneY + LANE_HEIGHT; y < CANVAS_HEIGHT; y += LANE_HEIGHT) {
    for (let x = 0; x < CANVAS_WIDTH; x += 32) ctx.drawImage(imgTree, x, y, 32, LANE_HEIGHT);
  }
}

function drawObjects() {
  for (let lane of lanes) {
    const y = Math.floor(getLaneScreenY(lane.index));
    if (lane.type === laneTypes.ROAD) {
      for (let car of lane.cars) {
        const cx = Math.floor(car.x);
        if (lane.dir === 1) {
          ctx.save(); ctx.scale(-1, 1);
          ctx.drawImage(car.sprite, -cx - car.width, y, car.width, LANE_HEIGHT);
          ctx.restore();
        } else {
          ctx.drawImage(car.sprite, cx, y, car.width, LANE_HEIGHT);
        }
      }
    } else if (lane.type === laneTypes.WATER) {
      if (lane.isLilyPadLane) {
        for (let pad of lane.platforms) ctx.drawImage(pad.sprite, Math.floor(pad.x), y, pad.width, LANE_HEIGHT);
      } else {
        for (let pl of lane.platforms) {
          const px = Math.floor(pl.x);
          const dw = pl.drawWidth || pl.width;
          if (lane.dir === 1) {
            ctx.save(); ctx.scale(-1, 1);
            ctx.drawImage(pl.sprite, -px - dw, y, dw, LANE_HEIGHT);
            ctx.restore();
          } else {
            ctx.drawImage(pl.sprite, px, y, dw, LANE_HEIGHT);
          }
        }
      }
    }
  }
}

function drawFrog() {
  if (frog.dead) return;
  const y  = Math.floor(getLaneScreenY(frog.laneIndex));
  const fx = Math.floor(frog.x);
  const frameImg = frogFrames[frog.jumping ? Math.min(frog.jumpFrameIndex, frogFrames.length - 1) : 0] || frogFrames[0];

  let angle = 0;
  if (frog.facing === 'right') angle = Math.PI / 2;
  if (frog.facing === 'down')  angle = Math.PI;
  if (frog.facing === 'left')  angle = -Math.PI / 2;

  ctx.save();
  ctx.translate(fx + frog.width/2, y + frog.height/2);
  ctx.rotate(angle);
  if (frameImg && frameImg.width > 0) ctx.drawImage(frameImg, -frog.width/2, -frog.height/2, frog.width, frog.height);
  ctx.restore();

  if (frog.jumping) {
    frog.jumpFrameIndex++;
    if (frog.jumpFrameIndex >= frogFrames.length) {
      frog.jumping = false;
      frog.jumpFrameIndex = 0;
    }
  }
}

function handleGameOverDisplay() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.fillStyle = 'white';
  ctx.font = '48px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Game Over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 20);
  ctx.font = '24px sans-serif';
  ctx.fillText('Press R to Restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 30);
}

// ---------------------- Lanes ----------------------
function getLaneScreenY(laneIndex) {
  const frogScreenY = CANVAS_HEIGHT / 2;
  const indexDiff = laneIndex - frog.laneIndex;
  return frogScreenY - (indexDiff * LANE_HEIGHT);
}

function getRandomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function createLane(index, type) {
  const lane = {
    index, type,
    dir: 0, speed: 0,
    cars: [], platforms: [],
    isLilyPadLane: false,
    isFirstRoadLane: false
  };

  if (type === laneTypes.SAFE) {
    lane.dir = 0; lane.speed = 0;

  } else if (type === laneTypes.ROAD) {
    const prev = lanes.length ? lanes[lanes.length - 1] : null;
    lane.isFirstRoadLane = !(prev && prev.type === laneTypes.ROAD);
    lane.dir = (prev && prev.type === laneTypes.ROAD)
      ? prev.dir * -1
      : (Math.random() < 0.5 ? 1 : -1);
    lane.speed = baseSpeed + score * speedIncrement;

  } else if (type === laneTypes.WATER) {
    const prev = lanes.length ? lanes[lanes.length - 1] : null;
    lane.isLilyPadLane = Math.random() < lilyPadProbability;
    if (prev && prev.type === laneTypes.WATER && prev.isLilyPadLane) lane.isLilyPadLane = false;

    if (lane.isLilyPadLane) {
      lane.dir = 0; lane.speed = 0;
      const padCount = getRandomInt(lilyPadCountRange[0], lilyPadCountRange[1]);
      const occupied = [];
      for (let p = 0; p < padCount; p++) {
        let col; do { col = getRandomInt(0, NUM_COLS - 1); } while (occupied.includes(col));
        occupied.push(col);
        lane.platforms.push({ x: col * COL_WIDTH, width: lilyPadWidth, sprite: imgLilypad, speed: 0 });
      }
    } else {
      if (prev && prev.type === laneTypes.WATER) {
        const prevDir = prev.dir !== 0 ? prev.dir : 1;
        lane.dir = prevDir * -1;
      } else lane.dir = Math.random() < 0.5 ? 1 : -1;

      lane.speed = baseSpeed + score * speedIncrement;
    }
  }

  lanes.push(lane);
}

// ---------------------- Input ----------------------
function onKey(e) {
  const key = e.key;

  if (key === 'p' || key === 'P') {
    if (!gameOver) {
      gamePaused = !gamePaused;
      if (!gamePaused) requestAnimationFrame(gameLoop);
    }
    e.preventDefault(); return;
  }
  if (key === 'r' || key === 'R') {
    if (gameOver) { gameOver = false; startGame(); }
    e.preventDefault(); return;
  }
  if (gameOver || gamePaused || frog.dead || frog.jumping) return;

  if (key === 'ArrowUp' || key === 'w' || key === 'W') {
    moveFrog(0, -1);
  } else if (key === 'ArrowDown' || key === 's' || key === 'S') {
    moveFrog(0, 1);
  } else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
    moveFrog(-1, 0);
  } else if (key === 'ArrowRight' || key === 'd' || key === 'D') {
    moveFrog(1, 0);
  } else {
    return;
  }
  e.preventDefault();
}

window.addEventListener('keydown', onKey);

function moveFrog(dx, dy) {
  if (dx === 0 && dy === 0) return;

  if (dx < 0) frog.facing = 'left';
  if (dx > 0) frog.facing = 'right';
  if (dy < 0) frog.facing = 'up';
  if (dy > 0) frog.facing = 'down';

  invulnFrames = 10;
  frog.jumping = true;
  frog.jumpFrameIndex = 0;

  if (dx !== 0) {
    frog.x += dx * COL_WIDTH;
    if (frog.x < 0) frog.x = 0;
    if (frog.x + frog.width > CANVAS_WIDTH) frog.x = CANVAS_WIDTH - frog.width;
  }
  if (dy !== 0) {
    if (dy < 0) {
      frog.laneIndex += 1;
      score += 1;
      bumpHighIfNeeded('moveUp'); // ensure high follows best run
      renderHud();
    } else if (dy > 0) {
      const minLaneIndex = Math.min(...lanes.map(l => l.index));
      if (frog.laneIndex > 0 && frog.laneIndex > minLaneIndex) {
        frog.laneIndex -= 1;
        if (score > 0) score -= 1;
        renderHud();
      }
    }
  }
}

// ---------------------- Boot ----------------------
window.addEventListener('error', ev => console.error('Window error:', ev.error || ev.message));
window.addEventListener('unhandledrejection', ev => console.error('Unhandled rejection:', ev.reason));

// Start after assets load will call startGame(); initHighScore happens inside startGame.
