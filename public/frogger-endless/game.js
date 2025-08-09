//// GLOBAL CONFIGURATIONS AND GAME STATE ////
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

// Canvas dimensions and grid settings
const CANVAS_WIDTH = canvas.width;    // e.g., 480
const CANVAS_HEIGHT = canvas.height;  // e.g., 640
const LANE_HEIGHT = 40;   // height of each lane/sprite cell in pixels
const COL_WIDTH = 40;     // width of one column (horizontal step) in pixels
const NUM_COLS = Math.floor(CANVAS_WIDTH / COL_WIDTH);  // number of columns (e.g., 12 columns of 40px in 480px)

// Lane types for easier reference
const laneTypes = { ROAD: 'road', WATER: 'water', SAFE: 'safe' };

// Game state variables
let score = 0;
let highScore = 0;
let gameOver = false;
let gamePaused = false;  // can pause the game loop (e.g., during death or user pause)
let invulnFrames = 0;
let debugNoDeath = true;

window.onerror = (msg, src, line, col, err) => {
  console.error('UNCAUGHT ERROR', { msg, src, line, col, err });
};

// Load high score from localStorage if it exists
highScore = parseInt(localStorage.getItem('froggerHighScore'), 10) || 0;

// Difficulty parameters (initial settings, scale up with score)
let baseSpeed = 2;            // base speed for cars/logs at start (pixels per frame)
let speedIncrement = 0.05;    // how much speed increases per score point
let spawnChance = 0.02;       // base probability per frame to spawn a vehicle or log in a lane (2%)
// (Spawn chance may increase slightly as score goes up for added difficulty)

// Frog object representing the player
const frog = {
  x: 0,                   // frog’s horizontal position (pixels from left)
  laneIndex: 0,           // frog’s current lane index in the world (0 = bottom starting lane)
  width: 32, height: 32,  // frog sprite size in pixels
  facing: 'up',           // direction the frog is facing ('up', 'down', 'left', 'right')
  jumping: false,         // whether the frog is in the middle of a jump animation
  jumpFrameIndex: 0,      // current frame index of the jump animation (0-5)
  onPlatform: false,      // if the frog is currently on a moving platform (log or croc)
  vx: 0,                  // horizontal velocity if being carried by a platform
  dead: false             // whether the frog is dead (triggers death sequence/game over)
};

// Lanes array holding the lanes in the game’s active view
let lanes = [];
/* Lane object structure:
   {
     index: <Number>,                     // lane index in the continuous world
     type: 'road' | 'water' | 'safe',     // type of lane
     dir: 1 | -1 | 0,                     // movement direction for hazards (1 = left→right, -1 = right→left, 0 = static)
     speed: <Number>,                     // speed of moving hazards in this lane (pixels per frame)
     cars: [ { x, width, sprite, speed } ],          // vehicles in road lanes
     platforms: [ { x, width, sprite, speed } ],     // logs/crocs (moving) or lily pads (stationary) in water lanes
     isLilyPadLane: <Boolean>            // for water lanes: true if this lane has stationary lily pads instead of moving platforms
   }
*/

// Variables for procedural lane generation
let nextSectionType = laneTypes.ROAD;  // type of the next section to generate (alternates between road and water)
let lanesInSectionRemaining = 0;       // how many lanes left to generate in the current section

// Configuration for section lengths (random ranges for variability)
const MIN_ROAD_LANES = 2;
const MAX_ROAD_LANES = 4;
const MIN_WATER_LANES = 3;
const MAX_WATER_LANES = 5;

// Lily pad lane configuration
const lilyPadProbability = 0.3;    // ~30% of water sections will be lily pad lanes
const lilyPadWidth = 32;           // width of a lily pad sprite (32 px)
const lilyPadCountRange = [2, 3];  // number of lily pads in a lily pad lane (random 2 or 3)

// Asset Images
// Frog animation frames (facing upward by default). We will rotate these for the frog's direction.
const frogFrames = [new Image(), new Image(), new Image(), new Image(), new Image(), new Image()];
for (let i = 0; i < frogFrames.length; i++) {
  frogFrames[i].src = `/frogger-endless/frog${i+1}.png`;  // loads frog1.png, frog2.png, ..., frog6.png
}

// Car sprites (four cars of different colors)
const carImages = [ new Image(), new Image(), new Image(), new Image() ];
carImages[0].src = '/frogger-endless/car1.png';
carImages[1].src = '/frogger-endless/car2.png';
carImages[2].src = '/frogger-endless/car3.png';
carImages[3].src = '/frogger-endless/car4.png';

// Other sprites (logs, crocs, lily pads, terrain tiles)
const imgLog     = new Image();
const imgCroc    = new Image();
const imgLilypad = new Image();
const imgGrass   = new Image();
const imgRoad    = new Image();
const imgWater   = new Image();
imgLog.src     = '/frogger-endless/log.png';
imgCroc.src    = '/frogger-endless/croc.png';
imgLilypad.src = '/frogger-endless/lilypad.png';
imgGrass.src   = '/frogger-endless/tile_grass.png';
imgRoad.src    = '/frogger-endless/tile_road.png';
imgWater.src   = '/frogger-endless/tile_water.png';

const allImgs = [
  ...frogFrames,
  ...carImages,
  imgLog, imgCroc, imgLilypad, imgGrass, imgRoad, imgWater
];

let assetsLoaded = 0;
const totalAssets = allImgs.length;

function markLoaded(tag) {
  assetsLoaded++;
  console.log(`Loaded ${tag} (${assetsLoaded}/${totalAssets})`);
  if (assetsLoaded >= totalAssets) {
    startGame();
  }
}
function drawDebug() {
  const fl = lanes.find(l => l.index === frog.laneIndex);
  ctx.fillStyle = 'white';
  ctx.font = '12px monospace';
  const text = `lane=${frog.laneIndex}  type=${fl ? fl.type + (fl.isLilyPadLane ? '(pads)' : '') : 'MISSING'}  x=${Math.round(frog.x)}  cars=${fl && fl.cars ? fl.cars.length : 0}  plats=${fl && fl.platforms ? fl.platforms.length : 0}`;
  ctx.fillText(text, 8, 16);
}

function markError(tag, src) {
  console.error(`FAILED to load ${tag} -> ${src}`);
  markLoaded(`${tag} (error)`);
}

// Attach onload and onerror handlers to each image asset
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
  ['road', imgRoad],
  ['water', imgWater]
].forEach(([tag, img]) => {
  img.onload = () => markLoaded(tag);
  img.onerror = () => markError(tag, img.src);
});

//// GAME INITIALIZATION ////

function startGame() {
  // Reset game state for a new run
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
  // Position frog at bottom-center of the canvas (starting lane 0)
  frog.x = (CANVAS_WIDTH / 2) - (frog.width / 2);
  // Update score display
  document.getElementById('scoreDisplay').innerText = `Score: 0    High: ${highScore}`;

  // Initialize lane generation parameters
  lanes = [];
  nextSectionType = laneTypes.ROAD;
  lanesInSectionRemaining = 0;

  // Create initial lanes to fill the screen from bottom to top
  let index = 0;
  createLane(index, laneTypes.SAFE);  // bottom starting lane is a safe grass lane
  index++;
  // Add lanes until screen (plus a small buffer above) is filled
  const lanesNeeded = Math.ceil(CANVAS_HEIGHT / LANE_HEIGHT) + 2;
  while (lanes.length < lanesNeeded) {
    const prevLane = lanes[lanes.length - 1];
    if (prevLane && prevLane.type === laneTypes.SAFE) {
      // After a safe lane, prepare a new hazard section (road or water)
      if (nextSectionType === laneTypes.ROAD) {
        lanesInSectionRemaining = getRandomInt(MIN_ROAD_LANES, MAX_ROAD_LANES);
      } else if (nextSectionType === laneTypes.WATER) {
        lanesInSectionRemaining = getRandomInt(MIN_WATER_LANES, MAX_WATER_LANES);
      }
      // (Lanes of that section will be created in subsequent loop iterations)
    }
    if (lanesInSectionRemaining > 0) {
      // Create a lane of the current hazard section type
      createLane(index, nextSectionType);
      lanesInSectionRemaining--;
      index++;
      if (lanesInSectionRemaining === 0) {
        // Finished a section; alternate the next section type and expect a safe lane next
        nextSectionType = (nextSectionType === laneTypes.ROAD) ? laneTypes.WATER : laneTypes.ROAD;
        // (The next iteration will handle inserting the safe lane)
      }
    } else {
      // Section boundary or no section started: insert a safe grass lane
      createLane(index, laneTypes.SAFE);
      index++;
    }
  }

  // Start the game loop
  requestAnimationFrame(gameLoop);
}

function drawObjects() {
  for (let lane of lanes) {
    const y = Math.floor(getLaneScreenY(lane.index));

    if (lane.type === laneTypes.ROAD) {
      for (let car of lane.cars) {
        const cx = Math.floor(car.x);
        if (lane.dir === 1) {
          ctx.save();
          ctx.scale(-1, 1);
          ctx.drawImage(car.sprite, -cx - car.width, y, car.width, LANE_HEIGHT);
          ctx.restore();
        } else {
          ctx.drawImage(car.sprite, cx, y, car.width, LANE_HEIGHT);
        }
      }
    } else if (lane.type === laneTypes.WATER) {
      if (lane.isLilyPadLane) {
        for (let pad of lane.platforms) {
          const px = Math.floor(pad.x);
          ctx.drawImage(pad.sprite, px, y, pad.width, LANE_HEIGHT);
        }
      } else {
        for (let pl of lane.platforms) {
          const px = Math.floor(pl.x);
          ctx.drawImage(pl.sprite, px, y, pl.width, LANE_HEIGHT);
        }
      }
    }
  }
}


// Helper to get a random integer between min and max inclusive
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Create a lane of given type and index, then add it to the lanes array
function createLane(index, type) {
  const lane = {
    index: index,
    type: type,
    dir: 0,
    speed: 0,
    cars: [],
    platforms: [],
    isLilyPadLane: false
  };

  if (type === laneTypes.SAFE) {
    // Safe lane (grass) — static, no hazards
    lane.dir = 0;
    lane.speed = 0;
    // No moving objects in safe lanes
  } else if (type === laneTypes.ROAD) {
    // Road lane — contains moving cars
    const prevLane = lanes.length ? lanes[lanes.length - 1] : null;
    // Alternate direction relative to previous road lane for variety
    lane.dir = (prevLane && prevLane.type === laneTypes.ROAD) ? prevLane.dir * -1 
             : (Math.random() < 0.5 ? 1 : -1);
    lane.speed = baseSpeed + score * speedIncrement;
    lane.cars = [];  // cars will spawn dynamically
  } else if (type === laneTypes.WATER) {
    // Water lane — contains logs/crocs (moving platforms) or lily pads
    let makeLilyPadLane = Math.random() < lilyPadProbability;
    const prevLane = lanes.length ? lanes[lanes.length - 1] : null;
    // Avoid two lily pad lanes back-to-back for fairness
    if (prevLane && prevLane.type === laneTypes.WATER && prevLane.isLilyPadLane) {
      makeLilyPadLane = false;
    }
    lane.isLilyPadLane = makeLilyPadLane;
    if (makeLilyPadLane) {
      // Lily pad lane (stationary safe platforms on water)
      lane.dir = 0;
      lane.speed = 0;
      const padCount = getRandomInt(lilyPadCountRange[0], lilyPadCountRange[1]);
      const occupiedCols = [];
      for (let p = 0; p < padCount; p++) {
        let col;
        // Choose a random column that’s not already occupied
        do {
          col = getRandomInt(0, NUM_COLS - 1);
        } while (occupiedCols.includes(col));
        occupiedCols.push(col);
        lane.platforms.push({
          x: col * COL_WIDTH,
          width: lilyPadWidth,
          sprite: imgLilypad,
          speed: 0
        });
      }
    } else {
      // Moving water lane (logs and crocs)
      const prevLane = lanes.length ? lanes[lanes.length - 1] : null;
      // Alternate direction relative to previous water lane (treat lily pad lane as static)
      if (prevLane && prevLane.type === laneTypes.WATER) {
        const prevDir = prevLane.dir !== 0 ? prevLane.dir : 1;
        lane.dir = prevDir * -1;
      } else {
        lane.dir = Math.random() < 0.5 ? 1 : -1;
      }
      lane.speed = baseSpeed + score * speedIncrement;
      lane.platforms = [];  // logs/crocs will spawn dynamically
    }
  }

  lanes.push(lane);
}

//// GAME LOOP ////

function gameLoop() {
  // If game is paused, don't advance the frame, but keep RAF running so we can unpause cleanly
  if (gamePaused) {
    requestAnimationFrame(gameLoop);
    return;
  }

  try {
    // Update positions of cars/logs and spawn new hazards
    updateObjects();

    // Check for collisions or losing conditions
    checkCollisions();

    // Remove lanes off-screen and add new lanes at top
    manageLanes();

    // If the frog died during this update, handle game over sequence
    if (frog.dead && !debugNoDeath) {
      gameOver = true;
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('froggerHighScore', highScore.toString());
      }
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      drawBackground();
      drawObjects();
      ctx.fillStyle = 'yellow';
      ctx.font = '24px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('GAME OVER', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 10);
      ctx.fillText('Press R to Restart', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 20);
      document.getElementById('scoreDisplay').innerText =
        `Score: ${score}    High: ${highScore}    - GAME OVER! Press R to restart`;
      // still request next frame so we can see if something else breaks
      requestAnimationFrame(gameLoop);
      return;
    }

    // Normal draw
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawBackground();
    drawObjects();
    drawFrog();
    drawDebug(); // <- keep this visible

  } catch (e) {
    console.error('gameLoop crashed!', e);
  }

  // NEVER stop while debugging
  requestAnimationFrame(gameLoop);
}


//// UPDATE FUNCTIONS ////

function updateObjects() {
  if (gamePaused) return;  // skip updates if game is paused

  // Move cars and logs/crocs in each lane, and spawn new ones occasionally
  for (let lane of lanes) {
    if (lane.type === laneTypes.ROAD) {
      // Road lane: possibly spawn a new car
      const effectiveSpawnChance = spawnChance + (score * 0.0005);
      if (Math.random() < effectiveSpawnChance) {
        spawnCar(lane);
      }
      // Move existing cars
      for (let car of lane.cars) {
        car.x += car.speed;
      }
      // Remove cars that went off-screen (with a small buffer)
      lane.cars = lane.cars.filter(car =>
        car.x + car.width > -50 && car.x < CANVAS_WIDTH + 50
      );
    } else if (lane.type === laneTypes.WATER && !lane.isLilyPadLane) {
      // Water lane: possibly spawn a new log or croc
      if (Math.random() < spawnChance) {
        spawnPlatform(lane);
      }
      // Move existing platforms
      for (let pl of lane.platforms) {
        pl.x += pl.speed;
      }
      // Remove platforms that went off-screen
      lane.platforms = lane.platforms.filter(pl =>
        pl.x + pl.width > -100 && pl.x < CANVAS_WIDTH + 100
      );
    }
    // Safe lanes and lily pad lanes have no moving objects to update
  }

  // If frog is on a moving platform, carry it along horizontally
  if (frog.onPlatform) {
    frog.x += frog.vx;
  }

  // Keep frog within canvas bounds
  if (frog.x < 0) frog.x = 0;
  if (frog.x + frog.width > CANVAS_WIDTH) {
    frog.x = CANVAS_WIDTH - frog.width;
  }
}

function checkCollisions() {
  if (gamePaused) return;
  const SKIP_DEATH = debugNoDeath;
  if (invulnFrames > 0) { invulnFrames--; return; }

  const frogLane = lanes.find(l => l.index === frog.laneIndex);
  if (!frogLane) return;

  if (frogLane.type === laneTypes.ROAD) {
    // Hit a car
    for (let car of frogLane.cars) {
      if (frog.x < car.x + car.width && frog.x + frog.width > car.x) {
        if (SKIP_DEATH) {
  console.log('Would die here', { reason: '...', lane: frogLane.index, frogX: frog.x });
} else {
  frog.dead = true;
}
      }
    }
  }

  // Reset platform carry each frame
  frog.onPlatform = false;
  frog.vx = 0;

  if (frogLane.type === laneTypes.WATER) {
    if (frogLane.isLilyPadLane) {
      // Must be on a lily pad
      let safe = false;
      for (let pad of frogLane.platforms) {
        if (frog.x < pad.x + pad.width && frog.x + frog.width > pad.x) {
          safe = true;
          break;
        }
      }
      if (!safe) {
        if (SKIP_DEATH) {
  console.log('Would die here', { reason: '...', lane: frogLane.index, frogX: frog.x });
} else {
  frog.dead = true;
}
        return;
      }
    } else {
      // Must be on a moving platform
      let onPlatform = false;
      for (let pl of frogLane.platforms) {
        if (frog.x < pl.x + pl.width && frog.x + frog.width > pl.x) {
          onPlatform = true;
          frog.onPlatform = true;
          frog.vx = pl.speed;  // carry frog with the platform
          break;
        }
      }
      if (!onPlatform) {
        if (SKIP_DEATH) {
  console.log('Would die here', { reason: '...', lane: frogLane.index, frogX: frog.x });
} else {
  frog.dead = true;
}
        return;
      }
    }

    // Carried off screen
    if (frog.onPlatform) {
      if (frog.x < -frog.width || frog.x > CANVAS_WIDTH) {
        if (debugNoDeath) {
          console.log('Would die here', { reason: 'carried off screen', lane: frogLane.index, frogX: frog.x });
        } else {
          frog.dead = true;
        }
        return;
      }
    }
  }
}


function manageLanes() {
  const VISIBLE_AHEAD  = Math.ceil(CANVAS_HEIGHT / LANE_HEIGHT / 2) + 2;
  const VISIBLE_BEHIND = Math.ceil(CANVAS_HEIGHT / LANE_HEIGHT / 2) + 3;

  // Keep the frog’s current lane no matter what
  lanes = lanes.filter(lane => {
    if (lane.index === frog.laneIndex) return true;
    const y = getLaneScreenY(lane.index);
    return y > -LANE_HEIGHT * VISIBLE_BEHIND && y < CANVAS_HEIGHT + LANE_HEIGHT;
  });

  // If somehow missing, re-seed the frog’s lane as SAFE
  if (!lanes.find(l => l.index === frog.laneIndex)) {
    createLane(frog.laneIndex, laneTypes.SAFE);
  }

  // If lanes ever emptied out, seed around the frog
  if (lanes.length === 0) {
    createLane(frog.laneIndex, laneTypes.SAFE);
  }

  let maxIndex = Math.max(...lanes.map(l => l.index));
  if (!isFinite(maxIndex)) maxIndex = frog.laneIndex; // extra safety

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




// Compute a lane’s Y position on the canvas relative to the frog’s current position
function getLaneScreenY(laneIndex) {
  const frogScreenY = CANVAS_HEIGHT / 2;  // keep frog around mid-screen
  const indexDiff = laneIndex - frog.laneIndex;
  // Lanes ahead of the frog (higher index) appear lower on screen, lanes behind appear higher.
  return frogScreenY - (indexDiff * LANE_HEIGHT);
}

//// SPAWNING HELPERS ////

function spawnCar(lane) {
  // Create a new car at the edge of the lane moving in the lane’s direction
  const goingRight = (lane.dir === 1);
  const carWidth = 32;
  const carSpeed = lane.speed * lane.dir;
  const spawnX = goingRight ? -carWidth : CANVAS_WIDTH;
  // Choose a random car sprite for variety
  const spriteIndex = Math.floor(Math.random() * carImages.length);
  const carSprite = carImages[spriteIndex];
  lane.cars.push({
    x: spawnX,
    width: carWidth,
    sprite: carSprite,
    speed: carSpeed
  });
}

function spawnPlatform(lane) {
  // Create a new moving platform (log or crocodile) for a water lane
  const movingRight = (lane.dir === 1);
  let platformSprite;
  let platformWidth;
  if (Math.random() < 0.5) {
    platformSprite = imgLog;
    platformWidth = 64;
  } else {
    platformSprite = imgCroc;
    platformWidth = 64;
  }
  const platformSpeed = lane.speed * lane.dir;
  const spawnX = movingRight ? -platformWidth : CANVAS_WIDTH;
  lane.platforms.push({
    x: spawnX,
    width: platformWidth,
    sprite: platformSprite,
    speed: platformSpeed
  });
}

//// RENDERING FUNCTIONS ////

function drawBackground() {
  // Draw background tiles for each lane (grass, road, water)
  for (let lane of lanes) {
    const y = Math.floor(getLaneScreenY(lane.index));
    if (lane.type === laneTypes.SAFE) {
      // Grass lane – fill with grass tiles (32x32 each)
      for (let x = 0; x < CANVAS_WIDTH; x += 32) {
        ctx.drawImage(imgGrass, x, y, 32, LANE_HEIGHT);
      }
    } else if (lane.type === laneTypes.ROAD) {
      // Road lane – fill with road tiles (64x32 each including lane markings)
      for (let x = 0; x < CANVAS_WIDTH; x += 64) {
        ctx.drawImage(imgRoad, x, y, 64, LANE_HEIGHT);
      }
    } else if (lane.type === laneTypes.WATER) {
      // Water lane – fill with water tiles (32x32 each)
      for (let x = 0; x < CANVAS_WIDTH; x += 32) {
        ctx.drawImage(imgWater, x, y, 32, LANE_HEIGHT);
      }
    }
  }
}

for (let lane of lanes) {
  const y = Math.floor(getLaneScreenY(lane.index));

  if (lane.type === laneTypes.ROAD) {
    for (let car of lane.cars) {
      const cx = Math.floor(car.x);                   // <= snap X
      if (lane.dir === 1) {
        ctx.save();
        try {
          ctx.scale(-1, 1);
          ctx.drawImage(car.sprite, -cx - car.width, y, car.width, LANE_HEIGHT);
        } finally { ctx.restore(); }
      } else {
        ctx.drawImage(car.sprite, cx, y, car.width, LANE_HEIGHT);
      }
    }
  } else if (lane.type === laneTypes.WATER) {
    if (lane.isLilyPadLane) {
      for (let pad of lane.platforms) {
        const px = Math.floor(pad.x);
        ctx.drawImage(pad.sprite, px, y, pad.width, LANE_HEIGHT);
      }
    } else {
      for (let pl of lane.platforms) {
        const px = Math.floor(pl.x);
        ctx.drawImage(pl.sprite, px, y, pl.width, LANE_HEIGHT);
      }
    }
  }
}


function drawFrog() {
  if (frog.dead) return;

  const y  = Math.floor(getLaneScreenY(frog.laneIndex));
  const fx = Math.floor(frog.x);

  let frameIdx = frog.jumping ? Math.min(frog.jumpFrameIndex, frogFrames.length - 1) : 0;
  const frameImg = frogFrames[frameIdx] || frogFrames[0];

  let angle = 0;
  switch (frog.facing) {
    case 'right': angle = Math.PI / 2; break;
    case 'down':  angle = Math.PI;     break;
    case 'left':  angle = -Math.PI/2;  break;
  }

  ctx.save();
  ctx.translate(fx + frog.width/2, y + frog.height/2);
  ctx.rotate(angle);
  if (frameImg && frameImg.width > 0) {
    ctx.drawImage(frameImg, -frog.width/2, -frog.height/2, frog.width, frog.height);
  }
  ctx.restore();

  if (frog.jumping) {
    frog.jumpFrameIndex++;
    if (frog.jumpFrameIndex >= frogFrames.length) {
      frog.jumping = false;
      frog.jumpFrameIndex = 0;
    }
  }
}



//// INPUT HANDLING ////

function onKey(e) {
  console.log('keydown', e.key, { lane: frog.laneIndex, x: frog.x });
  const key = e.key;

  if (key === 'p' || key === 'P') {
    // Toggle pause
    if (!gameOver) {
      gamePaused = !gamePaused;
      if (!gamePaused) {
        requestAnimationFrame(gameLoop);
      }
    }
    e.preventDefault();
    return;
  }

  if (key === 'r' || key === 'R') {
    // Restart game if over
    if (gameOver) {
      gameOver = false;
      startGame();
    }
    e.preventDefault();
    return;
  }

  // Ignore input if game not active or frog busy
  if (gameOver || gamePaused || frog.dead || frog.jumping) return;

  // Handle movement keys (arrow keys or WASD)
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

// Attach keyboard listeners
canvas.setAttribute('tabindex', '0');  // make canvas focusable to capture key events if needed
window.addEventListener('keydown', onKey);

function moveFrog(dx, dy) {
  if (dx === 0 && dy === 0) return;
  // Set frog’s facing direction based on input
  if (dx < 0) frog.facing = 'left';
  if (dx > 0) frog.facing = 'right';
  if (dy < 0) frog.facing = 'up';
  if (dy > 0) frog.facing = 'down';
  invulnFrames = 10;


  // Start jump animation
  frog.jumping = true;
  frog.jumpFrameIndex = 0;

  // Horizontal movement
  if (dx !== 0) {
    frog.x += dx * COL_WIDTH;
    // Clamp frog’s x within screen bounds
    if (frog.x < 0) frog.x = 0;
    if (frog.x + frog.width > CANVAS_WIDTH) {
      frog.x = CANVAS_WIDTH - frog.width;
    }
  }
  // Vertical movement
  if (dy !== 0) {
    if (dy < 0) {
      // Moving up: advance to next lane and increment score
      frog.laneIndex += 1;
      score += 1;
      document.getElementById('scoreDisplay').innerText = `Score: ${score}    High: ${highScore}`;
    } else if (dy > 0) {
      // Moving down: go back a lane (if possible) and optionally adjust score
      const minLaneIndex = Math.min(...lanes.map(l => l.index));
      if (frog.laneIndex > 0 && frog.laneIndex > minLaneIndex) {
        frog.laneIndex -= 1;
        if (score > 0) score -= 1;
        document.getElementById('scoreDisplay').innerText = `Score: ${score}    High: ${highScore}`;
      }
      // If at bottom or no lane behind, frog stays put
    }
  }
}

