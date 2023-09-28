// relocatable rectangles
// Elias
// Sept 27th
let x, y, rectheight, rectwidth;
let rleft;
let rright;
let rtop;
let rbottom;
let mouseOver = false;
let pickedup = false;
let mousedist;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  x = width / 2; y = height / 2;
  rectwidth = 200;
  rectheight = 100;
}
function updateedgepositions() {
  //updates the right/left/top/bottom
  rleft = x - rectwidth / 2;
  rright = x + rectwidth / 2;
  rtop = y - rectheight / 2;
  rbottom = y + rectheight / 2;
}
function drawrect() {
  updateedgepositions();
  rect(x, y, rectwidth, rectheight);
  if (rleft <= mouseX && mouseX <= rright && rtop <= mouseY && mouseY <= rbottom) {
    fill('green')
    mouseOver = true;
  }
  else {
    fill('red')
    mouseOver = false;
  }
  mousedist = pythagoras(x, mouseX, y, mouseY);
  if (pickedup){
    x = mousedist + mouseX;//i messed it up ong
    y = mousedist + mouseY;
  }
}
function draw() {
  background(220);
  drawrect();
}
function mousePressed() {
  if (mouseOver) {
    pickedup = true;
  }
}
function mouseReleased() {
  pickedup = false;
}
function pythagoras(x1,y1,x2,y2){
  let a = Math.abs(x1-x2);
  let b = Math.abs(y1-y2);
  let c =Math.sqrt(a*a + b*b);
}