// Chess - capstone coding project
// Elias and Rupam
// dec 1st 2023
// 2 Player Chess Game
let squareSize = 60;
let bB, bK, bN, bP, bQ, bR, wB, wK, wN, wP, wQ, wR;
let sound;
let boardData = [];
let row;
let col;
let turn = 1;
let clickCount = 1;
let haswKMoved = false;
let hasbKMoved = false;
let selectedPiece;
let passantCol = 69;
let passantCount = 100;
let kingRow;
let kingCol;
let squareValue;
let pinDetector = true;
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
  sound = loadSound("assets/move-self.mp3");


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
  createCanvas(60 * 8, 60 * 8);
  document.addEventListener("contextmenu", event => event.preventDefault());
}

function draw() {
  row = getCurrentY();
  col = getCurrentX();
  chessBoard();
  renderPieces();
  drawCircles();
  selectionCircle();
  //if (winChecker()) {
   // if (turn === 1) {
      //print("white wins");
   // }
    //else if (turn === -1) {
    //  print("black wins");
   // }
  //}
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
  let c = "green";
  if (turn === 1) {
    c = "green";
  }
  else {
    c = 255;
  }
  for (let x = 0; x < squareSize * 8; x += squareSize) {//size w
    if (c === 255) {
      c = "green";
    }
    else {
      c = 255;
    }
    for (let y = 0; y < squareSize * 8; y += squareSize) {//size h
      fill(c);
      if (c === 255) {
        c = "green";
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
function selectionCircle() {
  if (clickCount === 1) {
    fill("red");
  }
  else {
    fill("lime");
  }
  circle(mouseX, mouseY, 10);
}
let selectedRow = 6;
let selectedCol = 0;
function mousePressed() {
  if (clickCount === 1) {
    if (boardData[row][col] !== 0) {
      selectedRow = row;
      selectedCol = col;
      clickCount += 1;
    }
  }
  else if (clickCount === 2) {
    let kingMoved = false;
    if (row !== selectedRow || col !== selectedCol) {//double click line
      if (rules(boardData[selectedRow][selectedCol], row, col, selectedRow, selectedCol, "Good")) {
        if (kingDetection(turn, selectedRow, selectedCol, row, col)) {
          squareValue = boardData[row][col];
          boardData[row][col] = boardData[selectedRow][selectedCol];
          boardData[selectedRow][selectedCol] = 0;
          if (boardData[row][col] === wK || boardData[row][col] === bK) {
            passantCount++;
            sound.play();
            boardFlip();
            turn *= -1;
            kingMoved = true;
          }
          if (pinDetection(turn, selectedRow, selectedCol, row, col)) {
            if (kingMoved === false) {
              sound.play();
              passantCount++;
              boardFlip();
              turn *= -1;
            }
          }
          else {
            if (kingMoved === false) {
              pinDetector = false;
              boardData[selectedRow][selectedCol] = boardData[row][col];
              boardData[row][col] = squareValue;
            }
          }
        }
      }
    }
    clickCount = 1;
  }
}
function boardFlip() {
  boardData.reverse();
}
function drawCircles() {
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (rules(boardData[selectedRow][selectedCol], y, x, selectedRow, selectedCol, "Bad")) {
        stroke(150);
        fill(150);
        circle(x * 60 + 30, y * 60 + 30, 13);
      }
    }
  }
}
function rules(piece, row, col, selectedRow, selectedCol, func) {
  if (turn === 1) {
    if (boardData[row][col] === 0 || boardData[row][col] === bP || boardData[row][col] === bR || boardData[row][col] === bN || boardData[row][col] === bB || boardData[row][col] === bQ || boardData[row][col] === bK) {
      if (piece === wP) {
        if (selectedCol === col) {
          if (boardData[row][col] === 0) {
            if (selectedRow === 6) {
              if (selectedRow === row + 2) {
                if (func === "Good") {
                  passantCol = col;
                  passantCount = 0;
                }
                return true;
              }
              else if (selectedRow === row + 1) {
                return true;
              }
            }
            else if (row > 0) {
              if (selectedRow === row + 1) {
                return true;
              }
            }
          }
        }
        else if (col === passantCol && row === 2) {
          if (selectedRow === 3) {
            if (selectedCol === passantCol + 1 || selectedCol === passantCol - 1) {
              if (passantCount === 1) {
                if (func === "Good") {
                  boardData[3][passantCol] = 0;
                  passantCol = 69;
                }
                return true;
              }
            }
          }
        }
        else if (col + 1 === selectedCol || col - 1 === selectedCol) {
          if (row === selectedRow - 1) {
            if (boardData[row][col] === bP || boardData[row][col] === bR || boardData[row][col] === bN || boardData[row][col] === bB || boardData[row][col] === bQ || boardData[row][col] === bK) {
              return true;
            }
          }
        }
      }
      else if (piece === wN) {
        if (boardData[row][col] === 0 || boardData[row][col] === bP || boardData[row][col] === bR || boardData[row][col] === bN || boardData[row][col] === bB || boardData[row][col] === bQ || boardData[row][col] === bK) {
          if (selectedCol === col - 1 || selectedCol === col + 1) {
            if (selectedRow === row + 2 || selectedRow === row - 2) {
              return true;
            }
          }
          else if (selectedCol === col - 2 || selectedCol === col + 2) {
            if (selectedRow === row + 1 || selectedRow === row - 1) {
              return true;
            }
          }
        }
      }
      else if (piece === wR) {
        if (selectedCol === col) {
          if (row + 1 === selectedRow || row - 1 === selectedRow || col + 1 === selectedCol || col - 1 === selectedCol) {
            return true;
          }
          if (row < selectedRow) {
            for (let i = selectedRow - 1; boardData[i][col] === 0; i--) {
              if (row > i - 2) {
                return true;
              }
            }
          }
          else if (row > selectedRow) {
            for (let i = selectedRow + 1; boardData[i][col] === 0; i++) {
              if (row < i + 2) {
                return true;
              }
            }
          }
        }
        else if (selectedRow === row) {
          if (row + 1 === selectedRow || row - 1 === selectedRow || col + 1 === selectedCol || col - 1 === selectedCol) {
            return true;
          }
          if (col < selectedCol) {
            for (let i = selectedCol - 1; boardData[row][i] === 0; i--) {
              if (col > i - 2) {
                return true;
              }
            }
          }
          else if (col > selectedCol) {
            for (let i = selectedCol + 1; boardData[row][i] === 0; i++) {
              if (col < i + 2) {
                return true;
              }
            }
          }
        }
      }
      else if (piece === wK) {
        if (row + 1 === selectedRow || row - 1 === selectedRow) {
          if (col + 1 === selectedCol || col === selectedCol || col - 1 === selectedCol) {
            if (func === "Good") {
              haswKMoved = true;
            }
            return true;
          }
        }
        else if (col + 1 === selectedCol || col - 1 === selectedCol) {
          if (row === selectedRow) {
            if (func === "Good") {
              haswKMoved = true;
            }
            return true;
          }
        }
        else if (row === 7 && col === 6) {
          if (boardData[7][5] === 0) {
            if (boardData[7][7] === wR) {
              if (haswKMoved === false) {
                //castle = true then in mousepressed?
                if (func === "Good") {
                  boardData[7][7] = 0;
                  boardData[7][5] = wR;
                  haswKMoved = true;
                }
                return true;
              }
            }
          }
        }
        else if (row === 7 && col === 2) {
          if (boardData[7][0] === wR && boardData[7][1] === 0 && boardData[7][3] === 0 && haswKMoved === false) {
            if (func === "Good") {
              boardData[7][0] = 0;
              boardData[7][3] = wR;
              haswKMoved = true;

            }
            return true;
          }
        }
      }
      else if (piece === wB) {
        if (row < selectedRow) {
          let colPos = selectedCol;
          let colNeg = selectedCol;
          let maxCol = 100;
          let minCol = -100;
          let maxNum = 0;
          let minNum = 0;
          for (let r = selectedRow - 1; r >= 0; r--) {
            colPos++;
            colNeg--;
            if (boardData[r][colPos] !== 0) {
              if (maxNum === 0) {
                maxCol = colPos;
                maxNum++;
              }
            }
            if (boardData[r][colNeg] !== 0) {
              if (minNum === 0) {
                minCol = colNeg;
                minNum--;
              }
            }
            if (row === r && col === colPos) {
              if (col <= maxCol) {
                return true;
              }
            }
            else if (row === r && col === colNeg) {
              if (col >= minCol) {
                return true;
              }
            }
          }
        }
        else if (row > selectedRow) {
          let colPos = selectedCol;
          let colNeg = selectedCol;
          let maxCol = 100;
          let minCol = -100;
          let maxNum = 0;
          let minNum = 0;
          for (let r = selectedRow + 1; r <= 7; r++) {
            colPos++;
            colNeg--;
            if (boardData[r][colPos] !== 0) {
              if (maxNum === 0) {
                maxCol = colPos;
                maxNum++;
              }
            }
            if (boardData[r][colNeg] !== 0) {
              if (minNum === 0) {
                minCol = colNeg;
                minNum--;
              }
            }
            if (row === r && col === colPos) {
              if (col <= maxCol) {
                return true;
              }
            }
            else if (row === r && col === colNeg) {
              if (col >= minCol) {
                return true;
              }
            }
          }
        }
      }
      else if (piece === wQ) {
        if (selectedCol === col) {
          if (row + 1 === selectedRow || row - 1 === selectedRow || col + 1 === selectedCol || col - 1 === selectedCol) {
            return true;
          }
          if (row < selectedRow) {
            for (let i = selectedRow - 1; boardData[i][col] === 0; i--) {
              if (row > i - 2) {
                return true;
              }
            }
          }
          else if (row > selectedRow) {
            for (let i = selectedRow + 1; boardData[i][col] === 0; i++) {
              if (row < i + 2) {
                return true;
              }
            }
          }
        }
        else if (selectedRow === row) {
          if (row + 1 === selectedRow || row - 1 === selectedRow || col + 1 === selectedCol || col - 1 === selectedCol) {
            return true;
          }
          if (col < selectedCol) {
            for (let i = selectedCol - 1; boardData[row][i] === 0; i--) {
              if (col > i - 2) {
                return true;
              }
            }
          }
          else if (col > selectedCol) {
            for (let i = selectedCol + 1; boardData[row][i] === 0; i++) {
              if (col < i + 2) {
                return true;
              }
            }
          }
        }
        if (row < selectedRow) {
          let colPos = selectedCol;
          let colNeg = selectedCol;
          let maxCol = 100;
          let minCol = -100;
          let maxNum = 0;
          let minNum = 0;
          for (let r = selectedRow - 1; r >= 0; r--) {
            colPos++;
            colNeg--;
            if (boardData[r][colPos] !== 0) {
              if (maxNum === 0) {
                maxCol = colPos;
                maxNum++;
              }
            }
            if (boardData[r][colNeg] !== 0) {
              if (minNum === 0) {
                minCol = colNeg;
                minNum--;
              }
            }
            if (row === r && col === colPos) {
              if (col <= maxCol) {
                return true;
              }
            }
            else if (row === r && col === colNeg) {
              if (col >= minCol) {
                return true;
              }
            }
          }
        }
        else if (row > selectedRow) {
          let colPos = selectedCol;
          let colNeg = selectedCol;
          let maxCol = 100;
          let minCol = -100;
          let maxNum = 0;
          let minNum = 0;
          for (let r = selectedRow + 1; r <= 7; r++) {
            colPos++;
            colNeg--;
            if (boardData[r][colPos] !== 0) {
              if (maxNum === 0) {
                maxCol = colPos;
                maxNum++;
              }
            }
            if (boardData[r][colNeg] !== 0) {
              if (minNum === 0) {
                minCol = colNeg;
                minNum--;
              }
            }
            if (row === r && col === colPos) {
              if (col <= maxCol) {
                return true;
              }
            }
            else if (row === r && col === colNeg) {
              if (col >= minCol) {
                return true;
              }
            }
          }
        }
      }
    }
  }
  else if (turn === -1) {
    if (boardData[row][col] === 0 || boardData[row][col] === wP || boardData[row][col] === wR || boardData[row][col] === wN || boardData[row][col] === wB || boardData[row][col] === wQ || boardData[row][col] === wK) {
      if (piece === bP) {
        if (selectedCol === col) {
          if (boardData[row][col] === 0) {
            if (selectedRow === 6) {
              if (selectedRow === row + 2) {
                if (func === "Good") {
                  passantCol = col;
                  passantCount = 0;
                }
                return true;
              }
              else if (selectedRow === row + 1) {
                return true;
              }
            }
            else if (row > 0) {
              if (selectedRow === row + 1) {
                return true;
              }
            }
          }
        }
        else if (col === passantCol && row === 2) {
          if (selectedRow === 3) {
            if (selectedCol === passantCol + 1 || selectedCol === passantCol - 1) {
              if (passantCount === 1) {
                if (func === "Good") {
                  boardData[3][passantCol] = 0;
                  passantCol = 69;
                }
                return true;
              }
            }
          }
        }
        else if (col + 1 === selectedCol || col - 1 === selectedCol) {
          if (row === selectedRow - 1) {
            if (boardData[row][col] === wP || boardData[row][col] === wR || boardData[row][col] === wN || boardData[row][col] === wB || boardData[row][col] === wQ || boardData[row][col] === wK) {
              return true;
            }
          }
        }
      }
      else if (piece === bN) {
        if (boardData[row][col] === 0 || boardData[row][col] === wP || boardData[row][col] === wR || boardData[row][col] === wN || boardData[row][col] === wB || boardData[row][col] === wQ || boardData[row][col] === wK) {
          if (selectedCol === col - 1 || selectedCol === col + 1) {
            if (selectedRow === row + 2 || selectedRow === row - 2) {
              return true;
            }
          }
          else if (selectedCol === col - 2 || selectedCol === col + 2) {
            if (selectedRow === row + 1 || selectedRow === row - 1) {
              return true;
            }
          }
        }
      }
      else if (piece === bR) {
        if (selectedCol === col) {
          if (row + 1 === selectedRow || row - 1 === selectedRow || col + 1 === selectedCol || col - 1 === selectedCol) {
            return true;
          }
          if (row < selectedRow) {
            for (let i = selectedRow - 1; boardData[i][col] === 0; i--) {
              if (row > i - 2) {
                return true;
              }
            }
          }
          else if (row > selectedRow) {
            for (let i = selectedRow + 1; boardData[i][col] === 0; i++) {
              if (row < i + 2) {
                return true;
              }
            }
          }
        }
        else if (selectedRow === row) {
          if (row + 1 === selectedRow || row - 1 === selectedRow || col + 1 === selectedCol || col - 1 === selectedCol) {
            return true;
          }
          if (col < selectedCol) {
            for (let i = selectedCol - 1; boardData[row][i] === 0; i--) {
              if (col > i - 2) {
                return true;
              }
            }
          }
          else if (col > selectedCol) {
            for (let i = selectedCol + 1; boardData[row][i] === 0; i++) {
              if (col < i + 2) {
                return true;
              }
            }
          }
        }
      }
      else if (piece === bK) {
        if (row + 1 === selectedRow || row - 1 === selectedRow) {
          if (col + 1 === selectedCol || col === selectedCol || col - 1 === selectedCol) {
            if (func === "Good") {
              hasbKMoved = true;
            }
            return true;
          }
        }
        else if (col + 1 === selectedCol || col - 1 === selectedCol) {
          if (row === selectedRow) {
            if (func === "Good") {
              hasbKMoved = true;
            }
            return true;
          }
        }
        else if (row === 7 && col === 6) {
          if (boardData[7][5] === 0) {
            if (boardData[7][7] === bR) {
              if (hasbKMoved === false) {
                //castle = true then in mousepressed?
                if (func === "Good") {
                  boardData[7][7] = 0;
                  boardData[7][5] = bR;
                  hasbKMoved = true;
                }
                return true;
              }
            }
          }
        }
        else if (row === 7 && col === 2) {
          if (boardData[7][0] === bR && boardData[7][1] === 0 && boardData[7][3] === 0 && hasbKMoved === false) {
            if (func === "Good") {
              boardData[7][0] = 0;
              boardData[7][3] = bR;
              hasbKMoved = true;
            }
            return true;
          }
        }
      }
      else if (piece === bB) {
        if (row < selectedRow) {
          let colPos = selectedCol;
          let colNeg = selectedCol;
          let maxCol = 100;
          let minCol = -100;
          let maxNum = 0;
          let minNum = 0;
          for (let r = selectedRow - 1; r >= 0; r--) {
            colPos++;
            colNeg--;
            if (boardData[r][colPos] !== 0) {
              if (maxNum === 0) {
                maxCol = colPos;
                maxNum++;
              }
            }
            if (boardData[r][colNeg] !== 0) {
              if (minNum === 0) {
                minCol = colNeg;
                minNum--;
              }
            }
            if (row === r && col === colPos) {
              if (col <= maxCol) {
                return true;
              }
            }
            else if (row === r && col === colNeg) {
              if (col >= minCol) {
                return true;
              }
            }
          }
        }
        else if (row > selectedRow) {
          let colPos = selectedCol;
          let colNeg = selectedCol;
          let maxCol = 100;
          let minCol = -100;
          let maxNum = 0;
          let minNum = 0;
          for (let r = selectedRow + 1; r <= 7; r++) {
            colPos++;
            colNeg--;
            if (boardData[r][colPos] !== 0) {
              if (maxNum === 0) {
                maxCol = colPos;
                maxNum++;
              }
            }
            if (boardData[r][colNeg] !== 0) {
              if (minNum === 0) {
                minCol = colNeg;
                minNum--;
              }
            }
            if (row === r && col === colPos) {
              if (col <= maxCol) {
                return true;
              }
            }
            else if (row === r && col === colNeg) {
              if (col >= minCol) {
                return true;
              }
            }
          }
        }
      }
      else if (piece === bQ) {
        if (selectedCol === col) {
          if (row + 1 === selectedRow || row - 1 === selectedRow || col + 1 === selectedCol || col - 1 === selectedCol) {
            return true;
          }
          if (row < selectedRow) {
            for (let i = selectedRow - 1; boardData[i][col] === 0; i--) {
              if (row > i - 2) {
                return true;
              }
            }
          }
          else if (row > selectedRow) {
            for (let i = selectedRow + 1; boardData[i][col] === 0; i++) {
              if (row < i + 2) {
                return true;
              }
            }
          }
        }
        else if (selectedRow === row) {
          if (row + 1 === selectedRow || row - 1 === selectedRow || col + 1 === selectedCol || col - 1 === selectedCol) {
            return true;
          }
          if (col < selectedCol) {
            for (let i = selectedCol - 1; boardData[row][i] === 0; i--) {
              if (col > i - 2) {
                return true;
              }
            }
          }
          else if (col > selectedCol) {
            for (let i = selectedCol + 1; boardData[row][i] === 0; i++) {
              if (col < i + 2) {
                return true;
              }
            }
          }
        }
        if (row < selectedRow) {
          let colPos = selectedCol;
          let colNeg = selectedCol;
          let maxCol = 100;
          let minCol = -100;
          let maxNum = 0;
          let minNum = 0;
          for (let r = selectedRow - 1; r >= 0; r--) {
            colPos++;
            colNeg--;
            if (boardData[r][colPos] !== 0) {
              if (maxNum === 0) {
                maxCol = colPos;
                maxNum++;
              }
            }
            if (boardData[r][colNeg] !== 0) {
              if (minNum === 0) {
                minCol = colNeg;
                minNum--;
              }
            }
            if (row === r && col === colPos) {
              if (col <= maxCol) {
                return true;
              }
            }
            else if (row === r && col === colNeg) {
              if (col >= minCol) {
                return true;
              }
            }
          }
        }
        else if (row > selectedRow) {
          let colPos = selectedCol;
          let colNeg = selectedCol;
          let maxCol = 100;
          let minCol = -100;
          let maxNum = 0;
          let minNum = 0;
          for (let r = selectedRow + 1; r <= 7; r++) {
            colPos++;
            colNeg--;
            if (boardData[r][colPos] !== 0) {
              if (maxNum === 0) {
                maxCol = colPos;
                maxNum++;
              }
            }
            if (boardData[r][colNeg] !== 0) {
              if (minNum === 0) {
                minCol = colNeg;
                minNum--;
              }
            }
            if (row === r && col === colPos) {
              if (col <= maxCol) {
                return true;
              }
            }
            else if (row === r && col === colNeg) {
              if (col >= minCol) {
                return true;
              }
            }
          }
        }
      }
    }
  }
}
function volume(){
  
}
function kingDetection(turn, selectedRow, selectedCol, row, col) {
  if (turn === 1) {
    if (boardData[selectedRow][selectedCol] === wK) {
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          if (rules(wB, y, x, row, col, "Bad")) {
            if (boardData[y][x] === bB || boardData[y][x] === bQ) {
              return false;
            }
          }
          boardData[selectedRow][selectedCol] = 0;
          if (rules(wR, y, x, row, col, "Bad")) {
            if (boardData[y][x] === bR || boardData[y][x] === bQ) {
              boardData[selectedRow][selectedCol] = wK;
              return false;
            }
          }
          boardData[selectedRow][selectedCol] = wK;
          if (rules(wN, y, x, row, col, "Bad")) {
            if (boardData[y][x] === bN) {
              return false;
            }
          }
          if (rules(wP, y, x, row, col, "Bad")) {
            if (boardData[y][x] === bP) {
              return false;
            }
          }
        }
      }
    }
  }
  if (turn === -1) {
    if (boardData[selectedRow][selectedCol] === bK) {
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          if (rules(bB, y, x, row, col, "Bad")) {
            if (boardData[y][x] === wB || boardData[y][x] === wQ) {
              return false;
            }
          }
          boardData[selectedRow][selectedCol] = 0;
          if (rules(bR, y, x, row, col, "Bad")) {
            if (boardData[y][x] === wR || boardData[y][x] === wQ) {
              boardData[selectedRow][selectedCol] = bK;
              return false;
            }
          }
          boardData[selectedRow][selectedCol] = bK;
          if (rules(bN, y, x, row, col, "Bad")) {
            if (boardData[y][x] === wN) {
              return false;
            }
          }
          if (rules(bP, y, x, row, col, "Bad")) {
            if (boardData[y][x] === wP) {
              return false;
            }
          }
        }
      }
    }
  }
  return true;
}
function pinDetection(turn, selectedRow, selectedCol, row, col) {
  if (turn === 1) {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if (boardData[y][x] === wK) {
          kingRow = y;
          kingCol = x;
        }
        if (rules(wB, y, x, kingRow, kingCol, "Bad")) {
          if (boardData[y][x] === bB || boardData[y][x] === bQ) {
            return false;
          }
        }
        if (rules(wR, y, x, kingRow, kingCol, "Bad")) {
          if (boardData[y][x] === bR || boardData[y][x] === bQ) {
            return false;
          }
        }
        if (rules(wN, y, x, kingRow, kingCol, "Bad")) {
          if (boardData[y][x] === bN) {
            return false;
          }
        }
        if (rules(wP, y, x, kingRow, kingCol, "Bad")) {
          if (boardData[y][x] === bP) {
            return false;
          }
        }
      }
    }
  }
  if (turn === -1) {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if (boardData[y][x] === bK) {
          kingRow = y;
          kingCol = x;
        }
        if (rules(bB, y, x, kingRow, kingCol, "Bad")) {
          if (boardData[y][x] === wB || boardData[y][x] === wQ) {
            return false;
          }
        }
        if (rules(bR, y, x, kingRow, kingCol, "Bad")) {
          if (boardData[y][x] === wR || boardData[y][x] === wQ) {
            return false;
          }
        }
        if (rules(bN, y, x, kingRow, kingCol, "Bad")) {
          if (boardData[y][x] === wN) {
            return false;
          }
        }
        if (rules(bP, y, x, kingRow, kingCol, "Bad")) {
          if (boardData[y][x] === wP) {
            return false;
          }
        }
      }
    }
  }
  return true;
}
function winChecker() {
  let kingMoved = false;
  if (row !== selectedRow || col !== selectedCol) {//double click line
    if (rules(boardData[selectedRow][selectedCol], row, col, selectedRow, selectedCol, "Bad")) {
      if (kingDetection(turn, selectedRow, selectedCol, row, col)) {
        squareValue = boardData[row][col];
        boardData[row][col] = boardData[selectedRow][selectedCol];
        boardData[selectedRow][selectedCol] = 0;
        if (boardData[row][col] === wK || boardData[row][col] === bK) {
          passantCount++;
          boardFlip();
          turn *= -1;
          kingMoved = true;
        }
        if (pinDetection(turn, selectedRow, selectedCol, row, col)) {
          if (kingMoved === false) {
            passantCount++;
            boardFlip();
            turn *= -1;
          }
        }
        else {
          if (kingMoved === false) {
            pinDetector = false;
            boardData[selectedRow][selectedCol] = boardData[row][col];
            boardData[row][col] = squareValue;
          }
        }
      }
    }
  }
}