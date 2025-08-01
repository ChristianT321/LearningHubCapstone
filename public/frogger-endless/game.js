//// GLOBAL CONFIGURATIONS AND GAME STATE ////

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

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
let gamePaused = false;  // used to pause the game loop briefly (e.g., during death sequence)

// Load high score from localStorage if it exists
highScore = parseInt(localStorage.getItem('froggerHighScore')) || 0;

// Difficulty parameters (initial settings, scale up with score)
let baseSpeed = 2;            // base speed for cars/logs at start (pixels per frame)
let speedIncrement = 0.05;    // how much speed increases per score point
let spawnChance = 0.02;       // base probability per frame to spawn a vehicle or log in a lane (2%)
// (Spawn chance will slightly increase as score goes up for added difficulty)

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
  dead: false             // whether the frog is dead (triggers death sequence)
  // Note: We removed `deathCause` and separate death sprites; frog simply disappears on death.
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
  frogFrames[i].src = `frog${i+1}.png`;  // loads frog1.png, frog2.png, ..., frog6.png
}

// Car sprites (four cars of different colors)
const carImages = [ new Image(), new Image(), new Image(), new Image() ];
carImages[0].src = 'car1.png';  // e.g., purple car
carImages[1].src = 'car2.png';  // e.g., orange car
carImages[2].src = 'car3.png';  // e.g., yellow car
carImages[3].src = 'car4.png';  // e.g., red car

// Other sprites (logs, crocs, lily pads, terrain tiles)
const imgLog     = new Image();
const imgCroc    = new Image();
const imgLilypad = new Image();
const imgGrass   = new Image();
const imgRoad    = new Image();
const imgWater   = new Image();
imgLog.src       = 'log.png';
imgCroc.src      = 'croc.png';
imgLilypad.src   = 'lilypad.png';
imgGrass.src     = 'tile_grass.png';
imgRoad.src      = 'tile_road.png';
imgWater.src     = 'tile_water.png';

// Ensure all images are loaded before starting the game
let assetsLoaded = 0;
const totalAssets = 16;  // total number of image files to load (6 frog frames + 4 cars + 6 others)
function onAssetLoad() {
  assetsLoaded++;
  if (assetsLoaded >= totalAssets) {
    startGame();
  }
}
// Attach onload handler to each image asset
frogFrames.forEach(img => { img.onload = onAssetLoad; });
carImages.forEach(img => { img.onload = onAssetLoad; });
imgLog.onload     = onAssetLoad;
imgCroc.onload    = onAssetLoad;
imgLilypad.onload = onAssetLoad;
imgGrass.onload   = onAssetLoad;
imgRoad.onload    = onAssetLoad;
imgWater.onload   = onAssetLoad;

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
  // Position frog at bottom center of the canvas (starting lane 0)
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
    // Background will be grass; no cars or platforms.
  }
  else if (type === laneTypes.ROAD) {
    // Road lane — contains moving cars
    const prevLane = lanes.length ? lanes[lanes.length - 1] : null;
    // Alternate direction relative to previous road lane for variety
    lane.dir = (prevLane && prevLane.type === laneTypes.ROAD) ? prevLane.dir * -1 
             : (Math.random() < 0.5 ? 1 : -1);
    // Set lane speed (increases with score for difficulty)
    lane.speed = baseSpeed + score * speedIncrement;
    lane.cars = [];  // cars will spawn dynamically
  }
  else if (type === laneTypes.WATER) {
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
        // Choose a random column that’s not already occupied by another pad
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
      // Alternate direction relative to previous water lane (treat lily pad lane as having no direction)
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
  if (gameOver) return;

  // Update positions of cars/logs and spawn new hazards as needed
  updateObjects();
  // Check for collisions or losing conditions (car hits, drowning, etc.)
  checkCollisions();
  // Remove lanes that have moved off-screen and add new lanes at the top
  manageLanes();

  // If the frog died during this update, handle death (pause and reset)
  if (frog.dead) {
    gamePaused = true;
    // Draw the final state without the frog (frog is not drawn when dead)
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    drawBackground();
    drawObjects();
    // (No frog drawn because there's no death sprite; frog simply disappears)
    // After a short pause, reset the game
    setTimeout(() => {
      if (score > highScore) {
        highScore = score;
        localStorage.setItem('froggerHighScore', highScore.toString());
      }
      startGame();
    }, 1000);
    return;
  }

  // Clear canvas and draw the current frame
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawBackground();
  drawObjects();
  drawFrog();

  // Continue the game loop
  requestAnimationFrame(gameLoop);
}

//// UPDATE FUNCTIONS ////

function updateObjects() {
  if (gamePaused) return;  // skip updates if game is paused (e.g., during death sequence)

  // Move cars and logs/crocs in each lane, and spawn new ones occasionally
  for (let lane of lanes) {
    if (lane.type === laneTypes.ROAD) {
      // Road lane: possibly spawn a new car
      const effectiveSpawnChance = spawnChance + (score * 0.0005);  // increase spawn rate slightly with score
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
    }
    else if (lane.type === laneTypes.WATER && !lane.isLilyPadLane) {
      // Water lane (moving platforms): possibly spawn a new log or croc
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
    // Note: Safe lanes and lily pad lanes have no moving objects to update.
  }

  // If frog is on a moving platform (log or croc), carry it along horizontally
  if (frog.onPlatform) {
    frog.x += frog.vx;
  }

  // Keep frog within canvas horizontal bounds
  if (frog.x < 0) frog.x = 0;
  if (frog.x + frog.width > CANVAS_WIDTH) frog.x = CANVAS_WIDTH - frog.width;
}

function checkCollisions() {
  if (gamePaused) return;

  const frogLane = lanes.find(l => l.index === frog.laneIndex);
  if (!frogLane) return;

  if (frogLane.type === laneTypes.ROAD) {
    // Check collision with any car in this road lane
    for (let car of frogLane.cars) {
      if (frog.x < car.x + car.width && frog.x + frog.width > car.x) {
        // Frog overlaps a car – squish!
        frog.dead = true;
        return;
      }
    }
  }

  // Reset platform carry-over each frame
  frog.onPlatform = false;
  frog.vx = 0;
  if (frogLane.type === laneTypes.WATER) {
    if (frogLane.isLilyPadLane) {
      // Water lane with lily pads (stationary safe spots)
      let safe = false;
      for (let pad of frogLane.platforms) {
        if (frog.x < pad.x + pad.width && frog.x + frog.width > pad.x) {
          // Frog is on a pad
          safe = true;
          break;
        }
      }
      if (!safe) {
        // Frog fell into water (no pad underneath)
        frog.dead = true;
        return;
      }
    } else {
      // Water lane with moving logs or crocs
      let onPlatform = false;
      for (let pl of frogLane.platforms) {
        if (frog.x < pl.x + pl.width && frog.x + frog.width > pl.x) {
          // Frog is on a log or croc
          onPlatform = true;
          frog.onPlatform = true;
          frog.vx = pl.speed;  // frog moves with the platform
          break;
        }
      }
      if (!onPlatform) {
        // Frog in water with no platform – drowned
        frog.dead = true;
        return;
      }
    }
    // If frog is on a platform, also check if it gets carried off the screen edges
    if (frog.onPlatform) {
      if (frog.x < -frog.width || frog.x > CANVAS_WIDTH) {
        // Frog was carried beyond the screen bounds
        frog.dead = true;
        return;
      }
    }
  }
}

function manageLanes() {
  // Remove lanes that have scrolled off the bottom of the visible area
  lanes = lanes.filter(lane => {
    const screenY = getLaneScreenY(lane.index);
    return screenY < CANVAS_HEIGHT + LANE_HEIGHT;
  });

  // Determine the highest (topmost) lane index currently present
  let maxIndex = Math.max(...lanes.map(l => l.index));

  // Add new lanes at the top if needed to maintain continuous gameplay
  while (getLaneScreenY(maxIndex) > -LANE_HEIGHT) {
    const newIndex = maxIndex + 1;
    const prevLane = lanes.find(l => l.index === maxIndex);
    if (prevLane && prevLane.type === laneTypes.SAFE) {
      // After a safe lane, decide next section type and how many lanes it will have
      if (nextSectionType === laneTypes.ROAD) {
        lanesInSectionRemaining = getRandomInt(MIN_ROAD_LANES, MAX_ROAD_LANES);
      } else {
        lanesInSectionRemaining = getRandomInt(MIN_WATER_LANES, MAX_WATER_LANES);
      }
    }
    if (lanesInSectionRemaining > 0) {
      createLane(newIndex, nextSectionType);
      lanesInSectionRemaining--;
      if (lanesInSectionRemaining === 0) {
        // Completed a hazard section; next lane will be safe, and alternate the section type
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
  const frogScreenY = CANVAS_HEIGHT / 2;  // frog is roughly kept around mid-screen
  const indexDiff = laneIndex - frog.laneIndex;
  // Lanes ahead of the frog (higher index) will appear lower on screen, lanes behind appear higher.
  return frogScreenY - (indexDiff * LANE_HEIGHT);
}

//// SPAWNING HELPERS ////

function spawnCar(lane) {
  // Create a new car at the start of the lane, moving in the lane’s direction
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
  // Draw the appropriate tile background for each lane (grass, road, or water)
  for (let lane of lanes) {
    const y = getLaneScreenY(lane.index);
    if (lane.type === laneTypes.SAFE) {
      // Grass lane – fill the row with grass tiles (32x32 each)
      for (let x = 0; x < CANVAS_WIDTH; x += 32) {
        ctx.drawImage(imgGrass, x, y, 32, LANE_HEIGHT);
      }
    } else if (lane.type === laneTypes.ROAD) {
      // Road lane – fill with road tiles (64x32 each, including lane markings)
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

function drawObjects() {
  // Draw all dynamic objects (cars, logs, crocs, lily pads) in their respective lanes
  for (let lane of lanes) {
    const y = getLaneScreenY(lane.index);
    if (lane.type === laneTypes.ROAD) {
      // Draw each car in this road lane
      for (let car of lane.cars) {
        if (lane.dir === 1) {
          // Cars moving right – flip the sprite horizontally
          ctx.save();
          ctx.scale(-1, 1);
          ctx.drawImage(car.sprite, -car.x - car.width, y, car.width, LANE_HEIGHT);
          ctx.restore();
        } else {
          // Cars moving left – draw normally
          ctx.drawImage(car.sprite, car.x, y, car.width, LANE_HEIGHT);
        }
      }
    } else if (lane.type === laneTypes.WATER) {
      if (lane.isLilyPadLane) {
        // Draw lily pads (stationary platforms)
        for (let pad of lane.platforms) {
          ctx.drawImage(pad.sprite, pad.x, y, pad.width, LANE_HEIGHT);
        }
      } else {
        // Draw moving logs and crocs
        for (let pl of lane.platforms) {
          ctx.drawImage(pl.sprite, pl.x, y, pl.width, LANE_HEIGHT);
        }
      }
    }
    // (SAFE lanes have no objects to draw)
  }
}

function drawFrog() {
  if (frog.dead) {
    return;  // do not draw the frog if dead (no death sprite available)
  }
  const frogScreenY = getLaneScreenY(frog.laneIndex);
  let frameImg;
  // Choose the correct frog sprite frame
  if (frog.jumping) {
    // If in mid-jump, use the current animation frame and then advance to the next frame
    frameImg = frogFrames[frog.jumpFrameIndex];
    frog.jumpFrameIndex++;
    if (frog.jumpFrameIndex >= frogFrames.length) {
      // Reached the last frame of the jump animation; end the jump
      frog.jumping = false;
      frog.jumpFrameIndex = 0;
    }
  } else {
    // If not jumping (idle), use the first frame (frog crouched, ready to jump)
    frameImg = frogFrames[0];
  }

  // Draw the frog, rotated according to the direction it's facing
  ctx.save();
  // Translate to the frog’s center point for rotation
  ctx.translate(frog.x + frog.width / 2, frogScreenY + frog.height / 2);
  // Set rotation angle (in radians) based on direction. Positive angles rotate clockwise on canvas.
  let angle = 0;
  switch (frog.facing) {
    case 'up':    angle = 0; break;
    case 'right': angle = Math.PI / 2; break;
    case 'down':  angle = Math.PI; break;
    case 'left':  angle = -Math.PI / 2; break;
  }
  ctx.rotate(angle);
  // Draw the frog image centered at the origin (which is now the frog’s center)
  ctx.drawImage(frameImg, -frog.width / 2, -frog.height / 2, frog.width, frog.height);
  ctx.restore();
}

//// INPUT HANDLING ////

document.addEventListener('keydown', (e) => {
  if (gameOver || gamePaused || frog.dead || frog.jumping) return;  // ignore input if game is over, paused, dead, or already mid-jump
  const key = e.key;
  if (key === 'ArrowUp' || key === 'w' || key === 'W') {
    moveFrog(0, -1);
  } else if (key === 'ArrowDown' || key === 's' || key === 'S') {
    moveFrog(0, 1);
  } else if (key === 'ArrowLeft' || key === 'a' || key === 'A') {
    moveFrog(-1, 0);
  } else if (key === 'ArrowRight' || key === 'd' || key === 'D') {
    moveFrog(1, 0);
  }
});

function moveFrog(dx, dy) {
  if (dx === 0 && dy === 0) return;
  // Set the frog’s facing direction based on input
  if (dx < 0) frog.facing = 'left';
  if (dx > 0) frog.facing = 'right';
  if (dy < 0) frog.facing = 'up';
  if (dy > 0) frog.facing = 'down';

  // Start the jump animation
  frog.jumping = true;
  frog.jumpFrameIndex = 0;

  // Horizontal movement (left or right)
  if (dx !== 0) {
    frog.x += dx * COL_WIDTH;
    // Clamp frog’s x within screen bounds
    if (frog.x < 0) frog.x = 0;
    if (frog.x + frog.width > CANVAS_WIDTH) frog.x = CANVAS_WIDTH - frog.width;
  }
  // Vertical movement (up or down)
  if (dy !== 0) {
    if (dy < 0) {
      // Jumping up: move to the next lane forward and increment score
      frog.laneIndex += 1;
      score += 1;
      document.getElementById('scoreDisplay').innerText = `Score: ${score}    High: ${highScore}`;
    } else if (dy > 0 && frog.laneIndex > 0) {
      // Jumping down: move to the previous lane (if not at the starting lane)
      frog.laneIndex -= 1;
      // Optionally decrease score when moving backward to discourage retreating
      if (score > 0) score -= 1;
      document.getElementById('scoreDisplay').innerText = `Score: ${score}    High: ${highScore}`;
    }
    // If frog.laneIndex is 0 (bottom), it cannot move further down.
  }
}

