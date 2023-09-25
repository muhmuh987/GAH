// Primitive Paint
// Elias Reynolds
// Sept 18th 2023
//
// A primitive version of ms paint
// I completed the extra challenge
let extracanvas;
let d = 5;
let s = 1;
let shape = 1;
let c = 'blue';
function setup() {
  createCanvas(windowWidth, windowHeight);
  extracanvas = createGraphics(width, height);
  extracanvas.clear();//clear background
}
function draw() {
  fill('purple');
  extracanvas.fill(0);
  extracanvas.textFont("georgia");//everything static is on the extra canvas
  extracanvas.text("Elias Reynolds", 20, 30);
  growingCircle();
  fill(c);
  extracanvas.fill(c);
  image(extracanvas, 0, 0);
  mouseFollow();
  if (d > 100 || d === 0) {//alters diameter of circle
    s = s * -1;
  }
}
function keyPressed() {
  if (key === "a" || key === "A") {
    shape = 1;
  }
  if (key === "s" || key === "S") {
    shape = 2;
  }
  if (key === "d" || key === "D") {
    shape = 3;
  }
  if (key === "r" || key === "R") {
    c = 'red';
  }
  if (key === "g" || key === "G") {
    c = 'green';
  }
  if (key === "b" || key === "B") {
    c = 'blue';
  }
  if (key === "o" || key === "O") {
    c = 'orange';
  }
  if (key === " ") {
    extracanvas.clear();
  }
}
function mousePressed() {
  if (shape === 1) {
    extracanvas.rect(mouseX - 25, mouseY - 12.5, 50, 25);
  }
  if (shape === 2) {
    extracanvas.ellipse(mouseX, mouseY, 30);
  }
  if (shape === 3) {
    extracanvas.square(mouseX - 12.5, mouseY - 12.5, 25);
  }
}
function growingCircle() {
  background(255);
  circle(width - 100, height - 100, d);
  if (s > 0) {
    d++;
  }
  else {
    d = d - 1;
  }
}
function mouseFollow() {
  if (shape === 1) {
    rect(mouseX - 25, mouseY - 12.5, 50, 25);
  }
  if (shape === 2) {
    ellipse(mouseX, mouseY, 30);
  }
  if (shape === 3) {
    square(mouseX - 12.5, mouseY - 12.5, 25);
  }
}