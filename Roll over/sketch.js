// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let wsize;
let hsize;
let rquad;
let c1 = 255;
let c2=255;
let c3=255;
let c4 =255;
function setup() {
  createCanvas(windowWidth, windowHeight);
  wsize = width / 2;
  hsize = height / 2;
}

function draw() {
  background(220);
  checker();
  grid();
}
function grid() {
  fill(255);
  if (rquad === 1) {
    fill(c1);
  }
  rect(0, 0, width / 2, height / 2);
  fill(255);
  if (rquad === 2) {
    fill(c2);
  }
  rect(width / 2, 0, width / 2, height / 2);
  fill(255);
  if (rquad === 3) {
    fill(c3);
  }
  rect(0, height / 2, width / 2, height / 2);
  fill(255);
  if (rquad === 4) {
    fill(c4);
  }
  rect(width / 2, height / 2, width / 2, height / 2);
}
function checker() {
  if (0 < mouseX && mouseX < width / 2 && 0 < mouseY && mouseY < height / 2) {
    rquad = 1;
    c1 -= 1;
    c2 = c3 =c4 =255;
  }
  if (width / 2 < mouseX && mouseX < width && 0 < mouseY && mouseY < height / 2) {
    rquad = 2;
    c2 -=1;
    c1 = c3 =c4 =255;
  }
  if (width / 2 < mouseX && mouseX < width && height / 2 < mouseY && mouseY < height) {
    rquad = 4;
    c4-=1;
    c2 = c1 =c3 =255;
  }
  if (0 < mouseX && mouseX < width / 2 && height / 2 < mouseY && mouseY < height) {
    rquad = 3;
    c3-=1;
    c2 = c4 =c1 =255;
  }
}
