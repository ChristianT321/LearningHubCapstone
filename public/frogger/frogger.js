// Frogger Game Script (frogger.js)

// Canvas setup
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');

canvas.setAttribute('tabindex', '0');
canvas.focus();
canvas.addEventListener('pointerdown', () => canvas.focus()); // click/tap to refocus if needed

// Game constants
const grid = 48;              // grid size (each hop is 48px)
const gridGap = 10;           // gap between grid rows (for visual spacing)

// Load placeholder images for sprites
const frogImg = new Image();
frogImg.src = 'assets/frog.png';      // frog sprite image
const logImg = new Image();
logImg.src = 'assets/log.png';        // log sprite image
// (Additional images could be loaded here, e.g., cars, turtle, etc., if available)

// Sprite prototype (for frog, logs, cars, etc.)
function Sprite(properties) {
  Object.assign(this, properties);
}
Sprite.prototype.render = function() {
  if (this.image) {
    // If sprite has an image, draw it
    if (this.shape === 'rect') {
      // Draw rect images with a small vertical gap
      context.drawImage(this.image, this.x, this.y + gridGap/2, this.size, grid - gridGap);
    } else {
      // Draw other shapes (circle sprites) fully
      context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }
  } else {
    // Draw simple colored shapes if no image is set
    context.fillStyle = this.color;
    if (this.shape === 'rect') {
      // rectangle sprite (e.g., logs, cars)
      context.fillRect(this.x, this.y + gridGap/2, this.size, grid - gridGap);
    } else {
      // circle sprite (e.g., frog as placeholder or turtles)
      context.beginPath();
      context.arc(
        this.x + this.size/2, 
        this.y + this.size/2,
        this.size/2 - gridGap/2, 
        0, 2 * Math.PI
      );
      context.fill();
    }
  }
};

// Create the player frog sprite
const frogger = new Sprite({
  x: grid * 6,             // start in middle of bottom row
  y: grid * 13,
  color: 'greenyellow',    // color (used if image not loaded)
  size: grid,
  shape: 'circle'
});
frogger.image = frogImg;   // assign frog image to the player sprite

// Array to track frogs that have reached home (for displaying in home slots)
const scoredFroggers = [];

// Define obstacle patterns for each row (from top to bottom)
const patterns = [
  null,  // Row 0: Top end bank (safe home row, no moving obstacles)
  // Row 1: Logs moving right
  { spacing: [2], color: '#c55843', size: grid * 4, shape: 'rect', speed: 0.75, image: logImg },
  // Row 2: Turtles moving left (represented as red circles)
  { spacing: [0, 2, 0, 2, 0, 2, 0, 4], color: '#de0004', size: grid, shape: 'circle', speed: -1 },
  // Row 3: Long logs moving right
  { spacing: [2], color: '#c55843', size: grid * 7, shape: 'rect', speed: 1.5, image: logImg },
  // Row 4: Logs moving right (slower)
  { spacing: [3], color: '#c55843', size: grid * 3, shape: 'rect', speed: 0.5, image: logImg },
  // Row 5: Turtles moving left
  { spacing: [0, 0, 1], color: '#de0004', size: grid, shape: 'circle', speed: -1 },
  null, // Row 6: Middle bank (safe area between river and road)
  // Row 7: Trucks moving left (wider obstacles)
  { spacing: [3, 8], color: '#c2c4da', size: grid * 2, shape: 'rect', speed: -1 },
  // Row 8: Fast cars moving right
  { spacing: [14], color: '#c2c4da', size: grid, shape: 'rect', speed: 0.75 },
  // Row 9: Cars moving left
  { spacing: [3, 3, 7], color: '#de3cdd', size: grid, shape: 'rect', speed: -0.75 },
  // Row 10: Bulldozers (slow vehicles moving right)
  { spacing: [3, 3, 7], color: '#0bcb00', size: grid, shape: 'rect', speed: 0.5 },
  // Row 11: Cars moving left
  { spacing: [4], color: '#e5e401', size: grid, shape: 'rect', speed: -0.5 },
  null  // Row 12: Bottom start zone (safe)
];

// Create obstacle sprite rows based on the patterns above
const rows = [];
for (let r = 0; r < patterns.length; r++) {
  rows[r] = [];
  const pattern = patterns[r];
  if (!pattern) continue;  // skip safe rows with no obstacles
  let x = 0;
  let spacingIndex = 0;
  // Calculate total width of one repeating pattern sequence
  const totalPatternWidth = pattern.spacing.reduce((sum, space) => sum + space, 0) * grid 
                             + pattern.spacing.length * pattern.size;
  // Extend pattern width to cover the whole canvas (and one extra repetition off-screen)
  let endX = 0;
  while (endX < canvas.width) {
    endX += totalPatternWidth;
  }
  endX += totalPatternWidth;
  // Populate the row with obstacle sprites at the appropriate spacing
  while (x < endX) {
    rows[r].push(new Sprite({
      x: x,
      y: grid * (r + 1),      // canvas y coordinate for this row (r+1 because row 0 is top safe area)
      index: spacingIndex,    // index in the spacing pattern
      ...pattern              // spread all pattern properties into sprite (including speed, size, color, image, etc.)
    }));
    // Move x for the next obstacle based on spacing pattern
    const spacingArr = pattern.spacing;
    x += pattern.size + spacingArr[spacingIndex] * grid;
    spacingIndex = (spacingIndex + 1) % spacingArr.length;
  }
}

// Game state variables
let score = 0;   // score counter

// Main game loop (runs every frame via requestAnimationFrame)
function gameLoop() {
  requestAnimationFrame(gameLoop);
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background layers:
  // 1. River water (blue area for rows 1-5)
  context.fillStyle = '#000047';
  context.fillRect(0, grid, canvas.width, grid * 6);
  // 2. Top end bank (green safe strip with home slots)
  context.fillStyle = '#1ac300';
  context.fillRect(0, grid, canvas.width, 5);              // thin green line across top of river
  context.fillRect(0, grid, 5, grid);                      // left border
  context.fillRect(canvas.width - 5, grid, 5, grid);       // right border
  for (let i = 0; i < 4; i++) {                            // four filled rectangles to represent empty home slots (gaps between them are the lily pads entrances)
    context.fillRect(grid + grid * 3 * i, grid, grid * 2, grid);
  }
  // 3. Middle safe beach (between river and road)
  context.fillStyle = '#8500da';                           
  context.fillRect(0, 7 * grid, canvas.width, grid);
  // 4. Bottom start zone (purple safe area where frog begins)
  context.fillRect(0, canvas.height - grid * 2, canvas.width, grid);

  // Update and render all moving obstacle sprites
  for (let r = 0; r < rows.length; r++) {
    for (let sprite of rows[r]) {
      // Move sprite by its speed
      sprite.x += sprite.speed;
      // Draw the sprite (using its render method)
      sprite.render();
      // If sprite moves off-screen, wrap it around to the other side (for continuous loop)
      if (sprite.speed < 0 && sprite.x < -sprite.size) {
        // Moving left off-screen: find rightmost sprite in this row and position this sprite right after it
        let rightmost = sprite;
        for (let s of rows[r]) {
          if (s.x > rightmost.x) rightmost = s;
        }
        const spacingArr = patterns[r].spacing;
        sprite.x = rightmost.x + rightmost.size + spacingArr[rightmost.index] * grid;
        sprite.index = (rightmost.index + 1) % spacingArr.length;
      } else if (sprite.speed > 0 && sprite.x > canvas.width) {
        // Moving right off-screen: find leftmost sprite and position this sprite to the left of it
        let leftmost = sprite;
        for (let s of rows[r]) {
          if (s.x < leftmost.x) leftmost = s;
        }
        const spacingArr = patterns[r].spacing;
        let newIndex = leftmost.index - 1;
        if (newIndex < 0) newIndex = spacingArr.length - 1;
        sprite.x = leftmost.x - spacingArr[newIndex] * grid - sprite.size;
        sprite.index = newIndex;
      }
    }
  }

  // Update frog position if it's riding on a moving log/turtle
  frogger.x += frogger.speed || 0;
  // Draw the frog
  frogger.render();
  // Draw frogs that have reached home (static frogs in goal slots)
  scoredFroggers.forEach(f => f.render());

  // Collision detection and win condition check
  const froggerRowIndex = ((frogger.y / grid) - 1) | 0;   // current row index of frog (0-based for patterns array)
  let onObstacle = false;
  if (rows[froggerRowIndex]) {
    for (let sprite of rows[froggerRowIndex]) {
      // Axis-aligned bounding box collision (treat circles as rect bounds for simplicity)
      if (
        frogger.x < sprite.x + sprite.size - gridGap &&
        frogger.x + grid - gridGap > sprite.x &&
        frogger.y < sprite.y + grid &&
        frogger.y + grid > sprite.y
      ) {
        onObstacle = true;
        if (froggerRowIndex > rows.length / 2) {
          // Frog is in the road section and hit a vehicle -> death
          frogger.x = grid * 6;
          frogger.y = grid * 13;
          frogger.speed = 0;
        } else {
          // Frog is on a log or turtle -> ride along (match the obstacle's speed)
          frogger.speed = sprite.speed;
        }
      }
    }
  }
  if (!onObstacle) {
    // Frog not on any platform
    frogger.speed = 0;
    // Check if frog landed in a top home slot
    const colIndex = ((frogger.x + grid/2) / grid) | 0;  // which column the frog is in
    if (
      froggerRowIndex === 0 &&               // top row
      colIndex % 3 === 0 &&                  // frog is aligned with one of the home slots (they are spaced every 3 columns)
      !scoredFroggers.find(f => f.x === colIndex * grid)   // that home slot not already occupied
    ) {
      // Mark a frog as delivered to home
      scoredFroggers.push(new Sprite({ ...frogger, x: colIndex * grid, y: frogger.y + 5 }));
      score += 10;   // increase score for reaching a home
      // Reset frog to start position for next round
      frogger.x = grid * 6;
      frogger.y = grid * 13;
    } else if (froggerRowIndex < rows.length / 2 - 1) {
      // Frog is in the water section (rows 1-5) and not on a log/turtle -> death by drowning
      frogger.x = grid * 6;
      frogger.y = grid * 13;
    }
  }

  // Draw score text on the canvas
  context.fillStyle = '#ffffff';
  context.font = '20px Arial';
  context.textBaseline = 'bottom';
  context.fillText('Score: ' + score, 5, canvas.height - 5);
}

// Keyboard input for controlling the frog
document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      frogger.x -= grid;
      break;
    case 'ArrowRight':
      frogger.x += grid;
      break;
    case 'ArrowUp':
      frogger.y -= grid;
      break;
    case 'ArrowDown':
      frogger.y += grid;
      break;
    default:
      return;
  }
  // Clamp frog within screen bounds
  frogger.x = Math.max(0, Math.min(frogger.x, canvas.width - grid));
  frogger.y = Math.max(grid, Math.min(frogger.y, canvas.height - grid * 2));
});

// Start the game loop
requestAnimationFrame(gameLoop);
