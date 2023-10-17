// Loop punishment for being too fast at coding
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let topsquare = 8;//number of squares up top
let wsize;//square size
let sidesquare = 8;//on side
let hsize;//onside size
let c = 255;
let x, y, rHeight, rWidth;  //(x,y) center referenced
let rLeft, rRight, rTop, rBottom; //edge positions
let mouseOver = false; // are we hovering over the rect?
let pickedUp = false; //are we currently moving the object?
let offX, offY; //so object doesn't snap to mouse
function grid() {
  for (let x = 0; x < width; x += wsize) {//size w
    if (c === 255) {
      c = 0;
    }
    else {
      c = 255;
    }
    for (let y = 0; y < height; y += hsize) {//size h
      fill(c);
      if (c === 255) {
        c = 0;
      }
      else {
        c = 255;
      }
      rect(x, y, wsize, hsize);
    }
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
  wsize = width / topsquare;//divide to get size of each square
  hsize = height / sidesquare;
  x = width / 2; y = height / 2;
  rHeight = 50; rWidth = 50;
  grid();
}
function updateEdgePositions() {
  //updates the right/left/top/bottom for our rect.
  rLeft = x - rWidth / 2; rRight = x + rWidth / 2;
  rTop = y - rHeight / 2; rBottom = y + rHeight / 2;
}

function drawRectangle() {
  //renders rectangle and checks for mouse interactions
  updateEdgePositions();
  if (mouseX > rLeft && mouseX < rRight && mouseY > rTop && mouseY < rBottom) {
    fill(70, 230, 130);
    mouseOver = true;
  }
  else {
    fill(30, 70, 170);
    mouseOver = false;
  }

  if (pickedUp) {
    x = mouseX - offX;
    y = mouseY - offY;
  }

  //draw the rectangle
  rect(x, y, rWidth, rHeight);
}

function mousePressed() {
  if (mouseOver) {
    pickedUp = true;
    offX = mouseX - x;
    offY = mouseY - y;
  }
}

function mouseReleased() {
  pickedUp = false;
}
class GAHHHHHHHH{
  constructor(x, y, rHeight, rWidth, rLeft, rRight, rTop, rBottom, pickedUp, offX, offY) {
    this.x = x;
    this.y = y;
    this.rHeight = rHeight;
    this.rWidth = rWidth;
    this.rLeft = rLeft;  //(x,y) center referenced
    this.rRight = rRight;
    this.rTop = rTop;
    this.rBottom = rBottom;
    this.mouseOver = mouseOver; // are we hovering over the rect?
    this.pickedUp = pickedUp; //are we currently moving the object?
    this.offX = offX;
    this.offY = offY;
  }
  updateEdgePositions() {
    //updates the right/left/top/bottom for our rect.
    this.rLeft = this.x - this.rWidth / 2; this.rRight = this.x + this.rWidth / 2;
    this.rTop = this.y - this.rHeight / 2; this.rBottom = this.y + this.rHeight / 2;
  }

  function drawRectangle1() {
    //renders rectangle and checks for mouse interactions
    updateEdgePositions();
    if (this.mouseX > this.rLeft && this.mouseX < this.rRight && this.mouseY > this.rTop && this.mouseY < this.rBottom) {
      fill(70, 230, 130);
      this.mouseOver = true;
    }
    else {
      fill(30, 70, 170);
      this.mouseOver = false;
    }

    if (this.pickedUp) {
      this.x = this.mouseX - this.offX;
      this.y = this.mouseY - this.offY;
    }

    //draw the rectangle
    rect(this.x, this.y, this.rWidth, this.rHeight);
  }

  mousePressed() {
    if (this.mouseOver) {
      this.pickedUp = true;
      this.offX = this.mouseX - x;
      this.offY = this.mouseY - y;
    }
  }

  mouseReleased() {
    this.pickedUp = false;
  }
}

function draw() {
  rectMode(CORNER);
  grid();
  rectMode(CENTER);
  drawRectangle1();
}