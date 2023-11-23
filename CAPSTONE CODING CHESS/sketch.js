// Chess - capstone coding project
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let squareSize = 60;
let bB,bK,bN,bP,bQ,bR,wB,wK,wN,wP,wQ,wR;
let boardData =[];
function preload(){
  bB = loadImage("assets/black bishop.png");
  bK = loadImage("assets/black king.png");
  bN = loadImage("assets/black knight.png");
  bP = loadImage("assets/black pawn.png");
  bQ = loadImage("assets/black queen.png");
  bR = loadImage("assets/black rook.png");
  wB = loadImage("assets/white bishop.png");
  wK = loadImage("assets/white king.png");
  wN = loadImage("assets/white knight.png");
  wP = loadImage("assets/white pawn.png");
  wQ = loadImage("assets/white queen.png");
  wR = loadImage("assets/white rook.png");
  boardData =[
    [bR,bN,bB,bQ,bK,bB,bN,bR],
    [bP,bP,bP,bP,bP,bP,bP,bP],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [wP,wP,wP,wP,wP,wP,wP,wP],
    [wR,wN,wB,wQ,wK,wB,wN,wR]
  ];
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
}

function draw() {
  chessBoard();
  renderPieces();
}
function renderPieces(){
  for(let row = 0; row < 8;row++){
    for(let col = 0; col < 8;col++){
      if(boardData[row][col]!==0){
        image(boardData[row][col],col*60,row*60,60,60);
      }
    }
  }
}
function chessBoard() {
  let c = 'green';
  for (let x = 0; x < squareSize*8; x += squareSize) {//size w
    if (c === 255) {
      c = 'green';
    }
    else {
      c = 255;
    }
    for (let y = 0; y < squareSize*8; y += squareSize) {//size h
      fill(c);
      if (c === 255) {
        c = 'green';
      }
      else {
        c = 255;
      }
      rect(x, y, squareSize);
    }
  }
}