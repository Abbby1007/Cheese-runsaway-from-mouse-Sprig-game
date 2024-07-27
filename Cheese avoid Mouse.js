



const player = "p" // player = cheese
const obstacle = "o" // obstacle = mouse



setLegend(
  [player, bitmap`
...............6
..............66
.............666
............6666
...........66666
..........666666
.........6666996
........66666996
.......666666666
......6669966666
.....66669966666
....666666666666
...6666666666666
..66699666666996
.666699666666996
.666666666666666`], // sprite of cheese
  [ obstacle, bitmap`
................
................
................
................
................
............8...
............88..
.............888
..............88
.............88.
.............8..
....LLLLLLL..88.
...LLLLLLLLL..8.
.LL3LLLLLLLLL.8.
LLL3LLLLLLLLLL8.
LLLLLLLLLLLLLL..` ], // sprite of mouse
)

const melody = tune `
500,
500: G5/500 + C5^500,
500: D5/500 + E4-500,
500: A4/500 + E4-500 + C4~500 + F5~500 + A5^500,
500: B4~500,
500: F5-500 + E4/500 + A5-500 + G5-500 + E5-500,
500: E4/500 + C5-500 + A4^500 + G4^500 + D4^500,
500: E4/500 + B4^500 + E5^500 + F5^500 + G5^500,
500: A4/500 + F5-500 + C4-500,
500: D5/500 + F4~500,
500: A5/500 + C4~500 + G4^500 + C5^500,
500: F5/500 + E4/500 + A4~500 + C5~500 + D5^500,
500: A4-500 + D5~500 + G5^500 + C4^500 + D4^500,
500: C5/500 + E5~500 + D5~500 + F4^500,
500: E4/500 + E5~500,
500: A5-500 + G4-500 + E4~500 + E5~500 + F5^500,
500: B4-500 + E4~500,
500: D5~500 + F5^500,
500: G4/500 + A5/500 + C5-500 + B4^500 + D4^500,
500: F5^500,
500: F4/500 + B4-500 + G5-500 + D4-500 + D5~500,
500: D4-500 + F4~500,
500: B4/500 + D5/500 + E5~500 + A5^500,
500: D4^500,
500: A5/500 + F4-500 + A4^500,
500: A4~500 + F5^500,
500: F5/500 + F4/500 + C5-500 + A5-500 + D4~500,
500: G4-500,
500: F5/500 + E4^500 + B4^500,
500: A4/500 + D4-500 + E5~500 + G5~500 + F4^500,
500: C5-500,
500: D4/500 + G4^500 + G5^500`;

playTune(melody, Infinity);
setSolids([])

setMap(map`
........
........
........
........
........
........
........
...p....`);

var gameRunning = true;
 
onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1; // cheese moves left
  }
});
 
onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1; //  cheese moves right
  }
});
 
function spawnObstacle() {
  let x = Math.floor(Math.random() * 8);
  let y = 0;
  addSprite(x, y, obstacle);
}
 
function moveObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}
 
function despawnObstacles() {
  let obstacles = getAll(obstacle);
 
  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].y == 7) {
     obstacles[i].remove();
   }
  }
}
 
function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);
 
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }
 
  return false;
}
var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacle();
 
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }
 
}, 1000);