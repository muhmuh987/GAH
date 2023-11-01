// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let busx = 0;

let busy = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  movebus();
  drawBus();
}
function drawBus() {
  background(220);
  fill(255, 255, 104);
  rect(busx, busy, 100, 50);
  fill(0, 200, 255);
  rect(busx + 75, busy + 10, 20, 20);
  fill(0);
  circle(busx + 25, busy + 50, 20);
  circle(busx + 75, busy + 50, 20);
}
function movebus() {
  if (keyIsPressed) {
    if (keyCode === RIGHT_ARROW) {
      busx = busx + 10;
    }
    if (keyCode === LEFT_ARROW) {
      busx = busx - 10;
    }
    if (keyCode === UP_ARROW) {
      busy = busy - 10;
    }
    if (keyCode === DOWN_ARROW) {
      busy = busy + 10;
    }
  }
}
