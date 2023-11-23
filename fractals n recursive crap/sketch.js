// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  noFill();
}

function draw() {
  background(255);
  imhungry(width / 2, height / 2, height * 0.5,0);
}
function imhungry(x, y, sidelength,angle) {
  rectMode(CENTER);
  if (sidelength > 10) {
    square(x, y, sidelength);

  }
}
function circles(x, y, d) {
  if (d > 3.5) {
    stroke(255);
    circle(x, y, d);
    circles(x - d / 2, y, d / 2);
    circles(x + d / 2, y, d / 2);
    circles(x, y + d / 2, d / 2);
    circles(x, y - d / 2, d / 2);
  }
}
function cantor(x, y, len, depth) {
  background('maroon');
  if (depth > 1) {
    line(x, y, x + len, y);
    rect(x, y, len, 10);
    cantor(x, y + 20, len / 3, depth - 1);
    cantor(x + len * 2 / 3, y + 20, len / 3, depth - 1);
  }
}
function cCircle(x, y, d) {
  if (d > 10) {
    circle(x, y, d);
    let nd = map(mouseX, 0, width, 1.001, 1.1);
    cCircle(x, y, d / nd);
  }
}