// Chess - capstone coding project
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
function preload(){
  let bB = loadImage("assets/black bishop.png");
  let bK = loadImage("assets/black bishop.png");
  let bN = loadImage("assets/black bishop.png");
  let bQ = loadImage("assets/black bishop.png");
  let bR = loadImage("assets/black bishop.png");
  let wB = loadImage("assets/black bishop.png");
  let wK = loadImage("assets/black bishop.png");
  let wN = loadImage("assets/black bishop.png");
  let wP = loadImage("assets/black bishop.png");
  let wQ = loadImage("assets/black bishop.png");
  let wR = loadImage("assets/black bishop.png");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
  wsize = width / topsquare;//divide to get size of each square
  hsize = height / sidesquare;
  chessboard();
}

function draw() {
  chessboard();
}
function chessboard() {
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