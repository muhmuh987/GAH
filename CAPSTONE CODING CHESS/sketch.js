// Chess - capstone coding project
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//Required features
//a functional game of chess that two people can play
//must make legal moves and win with checkmate
//Optional
let squareSize = 60;
let bB, bK, bN, bP, bQ, bR, wB, wK, wN, wP, wQ, wR;
let boardData = [];
let row;
let col;
let turn = 1;
let clickCount = 1;
let selectedPiece;
function preload() {
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
  boardData = [
    [bR, bN, bB, bQ, bK, bB, bN, bR],
    [bP, bP, bP, bP, bP, bP, bP, bP],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [wP, wP, wP, wP, wP, wP, wP, wP],
    [wR, wN, wB, wQ, wK, wB, wN, wR]
  ];
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
}

function draw() {
  row = getCurrentY();
  col = getCurrentX();
  chessBoard();
  renderPieces();
}
function renderPieces() {
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (boardData[row][col] !== 0) {
        image(boardData[row][col], col * 60, row * 60, 60, 60);
      }
    }
  }
}
function chessBoard() {
  let c = 'green';
  for (let x = 0; x < squareSize * 8; x += squareSize) {//size w
    if (c === 255) {
      c = 'green';
    }
    else {
      c = 255;
    }
    for (let y = 0; y < squareSize * 8; y += squareSize) {//size h
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
function getCurrentX() { //determine current column mouse is in, and return
  let constrainMouseX = constrain(mouseX, 0, width - 1);
  return floor(constrainMouseX / 60);
}
function getCurrentY() { //determine current row mouse is in, and return
  let constrainMouseY = constrain(mouseY, 0, height - 1);
  return floor(constrainMouseY / 60);
}
let selectedRow;
let selectedCol;
function mousePressed() {
  if (clickCount === 1) {
    if (boardData[row][col] !== 0) {
      selectedRow = row;
      selectedCol = col;
      clickCount += 1;
    }
  }
  else if (clickCount === 2) {
    boardData[row][col] = boardData[selectedRow][selectedCol];
    if (row !== selectedRow || col !== selectedCol) {//double click line
      boardData[selectedRow][selectedCol] = 0;
    }
    clickCount = 1;
  }
}
function rookMove(){
  if(row === selectedRow||col === selectedCol){
    return true;
  }
  else{
    return false;
  }

}
//https://prod.liveshare.vsengsaas.visualstudio.com/join?2172E89F808CEBB905C116A5AF76357F69C5