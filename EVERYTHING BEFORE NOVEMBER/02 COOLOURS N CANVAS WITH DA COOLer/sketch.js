// COL()UR N STUFF WITH DA COLOUR OR SOMETHING LIKE THAT
// ELIAS REYNOLDS
//SEPTEMBER 9th 2023
//
// something about colours n practicing with colours n stuff
let ballx, bally, ballsize, xv, yv, overlay;
let coloura;
let colourb;
function setup() {
  createCanvas(windowWidth, windowHeight);
  ballx = width / 2;
  bally = height / 2;
  ballsize = 30;
  xv = 5;
  yv = 5;
  overlay = createGraphics(width, height);
  coloura = color(128, 20, 190);
  colourb = color('blue');
}

function draw() {
  background(220);
  drawtriangle();
  moveanddrawball();
}
function moveanddrawball() {
  circle(ballx, bally, ballsize);
  ballx += xv;
  bally += yv;
  if (ballx >= width - 15 || ballx <= 15) {
    xv = xv * -1;
  }
  if (bally >= height - 15 || bally <= 15) {
    yv = yv * -1;
  }
}
function drawtriangle() {
  overlay.triangle(mouseX, mouseY - 20, mouseX - 10, mouseY + 10, mouseX + 10, mouseY + 10);
  image(overlay, 0, 0);
}
function keyPressed() {
  if (key === "a") fill(coloura);
  if (key === "b") fill(colourb);
}