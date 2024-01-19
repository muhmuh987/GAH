// Chess - capstone coding project
// Elias and Rupam
// dec 1st 2023
// 2 Player Chess Game
//press c to change board color
//press m to unmute
//press r to reset the # of times players have won
//Global Variables
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
let squareValue2;
let textChange = 5;
let stalemate = false;
let pc = "do nothing";
let pawnRow;
let pawnCol;
let board2;
let squareValue3;
let wc = 0;
let bc = 0;
let victorySound;
let errorSound;
let whoosh;
let bell;
let music;
let soundCount = 0;
let totalWhiteWin = 0;
let totalBlackWin = 0;
let thingy = 1;
let colorPos = 0;
let colorArray;
function preload() {
  //loads a bunch a stuff
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
  victorySound = loadSound("assets/victory noise.mp3");
  errorSound = createAudio("assets/mixkit-wrong-electricity-buzz-955.wav");
  whoosh = loadSound("assets/whoosh-6316.mp3");
  bell = createAudio("assets/boxing-bell.mp3");
  music = createAudio("assets/random-acoustic-electronic-guitar-136427.mp3");
  boardData = [//sets board up with images as data so it's easy to render
    [bR, bN, bB, bQ, bK, bB, bN, bR],
    [bP, bP, bP, bP, bP, bP, bP, bP],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [wP, wP, wP, wP, wP, wP, wP, wP],
    [wR, wN, wB, wQ, wK, wB, wN, wR]
  ];
  board2 = boardData;
}
function setup() {
  errorSound.volume(0.5);
  music.volume(0);
  music.loop();
  bell.volume(0.2);
  bell.play();
  createCanvas(60 * 8, 60 * 8);
  document.addEventListener("contextmenu", event => event.preventDefault());
  if (localStorage.getItem("white win") === null) {  //no key yet
    localStorage.setItem("white win", 0);
  }
  else {
    totalWhiteWin = int(localStorage.getItem("white win"));
  }
  if (localStorage.getItem("black win") === null) {  //no key yet
    localStorage.setItem("black win", 0);
  }
  else {
    totalBlackWin = int(localStorage.getItem("black win"));
  }
  if (localStorage.getItem("colorPos") === null) {  //no key yet
    localStorage.setItem("colorPos", 0);
  }
  else {
    colorPos = int(localStorage.getItem("colorPos"));
  }
  colorArray = [
    color(238, 238, 210), color(118, 150, 86),
    color(129, 138, 156), color(50, 55, 69),
    color(237, 237, 235), color(47, 97, 69),
    "lightyellow","blue",
    color(265, 210, 225), color(245, 147, 171),
    "lightblue", "purple",
    "lightgreen", "maroon"];
}

function draw() {
  //draws stuff in a particular order to create chess
  row = getCurrentY();
  col = getCurrentX();
  background(255);
  chessBoard();
  renderPieces();
  pawnPromotionDrawing(pc);
  kingPos();
  drawCircles();
  selectionCircle();
  stalemateByInsufficient();
  if (winChecker()) {
    if (soundCount === 0) {
      victorySound.play();
    }
    soundCount++;
    fill(0);
    textSize(15);
    text("Play Again!", 200, 155);
    if (turn === 1) {
      fill(20);
      textSize(textChange);
      if (textChange < 90) {
        textChange++;
      }
      if (thingy === 1) {
        thingy++;
        totalBlackWin++;
      }
      localStorage.setItem("black win", totalBlackWin);
      text("Black Wins!", width / 2 - textChange * 2.6, height / 2 + textChange / 2.5);
      textSize(15);
      text("number of times black won: " + localStorage.getItem("black win"), 60, 60);
    }
    else if (turn === -1) {
      fill(235);
      textSize(textChange);
      if (textChange < 90) {
        textChange++;
      }
      if (thingy === 1) {
        thingy++;
        totalWhiteWin++;
      }
      localStorage.setItem("white win", totalWhiteWin);
      text("White Wins!", width / 2 - textChange * 2.6, height / 2 + textChange / 2.5);
      textSize(15);
      text("number of times white won: " + localStorage.getItem("white win"), 60, 60);
    }
  }
  if (stalemate === true) {
    fill(0);
    textSize(15);
    text("Play Again!", 200, 155);
    fill(125);
    textSize(textChange);
    if (textChange < 90) {
      textChange++;
    }
    text("Stalemate!", width / 2 - textChange * 2.6, height / 2 + textChange / 2.5);
  }
}
function renderPieces() {
  //draws the pieces on the board using the 2d array
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (boardData[row][col] !== 0) {
        image(boardData[row][col], col * 60, row * 60, 60, 60);
      }
    }
  }
}
function chessBoard() {
  //draws the chessboard
  stroke(0);
  let c = colorArray[colorPos + 1];
  if (turn === 1) {
    c = colorArray[colorPos + 1];
  }
  else {
    c = colorArray[colorPos];
  }
  for (let x = 0; x < squareSize * 8; x += squareSize) {//size w
    if (c === colorArray[colorPos]) {
      c = colorArray[colorPos + 1];
    }
    else {
      c = colorArray[colorPos];
    }
    for (let y = 0; y < squareSize * 8; y += squareSize) {//size h
      fill(c);
      if (c === colorArray[colorPos]) {
        c = colorArray[colorPos + 1];
      }
      else {
        c = colorArray[colorPos];
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
  //changes the colour of the red circle depending on if you have a piece selected
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
function pawnPromotionDrawing(pc) {
  //draws the image for the pawn promotion
  //lets you select which piece you want
  fill(0);
  stroke("red");
  if (pc === wP) {
    rect(180, 180, 120, 120);
    image(wN, 180, 180, 60, 60);
    image(wR, 240, 180, 60, 60);
    image(wQ, 180, 240, 60, 60);
    image(wB, 240, 240, 60, 60);
  }
  else if (pc === bP) {
    fill(255);
    rect(180, 180, 120, 120);
    image(bN, 180, 180, 60, 60);
    image(bR, 240, 180, 60, 60);
    image(bQ, 180, 240, 60, 60);
    image(bB, 240, 240, 60, 60);
  }
}
let musicVolume = 0;
function keyPressed() {
  //resets the numbers that keep track of the amount
  //of wins
  if (key === "r") {
    whoosh.play();
    totalWhiteWin = 0;
    totalBlackWin = 0;
    localStorage.setItem("black win", 0);
    localStorage.setItem("white win", 0);
  }
  if (key === "c") {
    //swaps colours
    whoosh.play();
    colorPos += 2;
    if (colorPos >= colorArray.length - 1) {
      colorPos = 0;
    }
    localStorage.setItem("colorPos", colorPos);
  }
  if (key === "m"){
    //toggles music
    if (musicVolume > 0){
      musicVolume = 0;
      music.volume(0);
    }
    else{
      musicVolume = 0.1;
      music.volume(0.1);
    }
  }
}
function mousePressed() {
  //moves pieces by changning board data
  //checks for play again
  if (winChecker() || stalemate) {
    if (row === 2) {
      if (col === 3 || col === 4) {
        bell.play();
        turn = 1;
        soundCount = 0;
        thingy = 1;
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
        textChange = 10;
        stalemate = false;
      }
    }
  }
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
            if (boardData[row][col] === wP && row === 0) {
              pawnRow = row;
              pawnCol = col;
              pc = wP;
              clickCount = 3;
            }
            else if (boardData[row][col] === bP && row === 0) {
              pawnRow = row;
              pawnCol = col;
              pc = bP;
              clickCount = 3;
            }
            else {
              passantCount++;
              sound.play();
              boardData[selectedRow][selectedCol] = boardData[row][col];
              boardData[row][col] = squareValue;
              rules(boardData[selectedRow][selectedCol], row, col, selectedRow, selectedCol, "Good");
              boardData[row][col] = boardData[selectedRow][selectedCol];
              boardData[selectedRow][selectedCol] = 0;
              boardFlip();
              turn *= -1;
              kingMoved = true;
            }
          }
          if (pinDetection(turn, selectedRow, selectedCol, row, col)) {
            if (kingMoved === false) {
              if (boardData[row][col] === wP && row === 0) {
                pawnRow = row;
                pawnCol = col;
                pc = wP;
                clickCount = 3;
              }
              else if (boardData[row][col] === bP && row === 0) {
                pawnRow = row;
                pawnCol = col;
                pc = bP;
                clickCount = 3;
              }
              else {
                passantCount++;
                sound.play();
                boardData[selectedRow][selectedCol] = boardData[row][col];
                boardData[row][col] = squareValue;
                rules(boardData[selectedRow][selectedCol], row, col, selectedRow, selectedCol, "Good");
                boardData[row][col] = boardData[selectedRow][selectedCol];
                boardData[selectedRow][selectedCol] = 0;
                boardFlip();
                turn *= -1;
                kingMoved = true;
              }
            }
          }
          else {
            if (kingMoved === false) {
              errorSound.play();
              pinDetector = false;
              boardData[selectedRow][selectedCol] = boardData[row][col];
              boardData[row][col] = squareValue;
            }
          }
        }
        else {
          errorSound.play();
        }
      }
      else {
        errorSound.play();
      }
    }
    if (clickCount === 2) {
      clickCount = 1;
    }
  }
  else if (clickCount >= 3) {
    if (pc === wP) {
      if (row === 3) {
        if (col === 3) {
          boardData[pawnRow][pawnCol] = wN;
          clickCount = 1;
          passantCount++;
          sound.play();
          boardFlip();
          turn *= -1;
          pc = "do nothing";
        }
        if (col === 4) {
          boardData[pawnRow][pawnCol] = wR;
          clickCount = 1;
          passantCount++;
          sound.play();
          boardFlip();
          turn *= -1;
          pc = "do nothing";
        }
      }
      if (row === 4) {
        if (col === 3) {
          boardData[pawnRow][pawnCol] = wQ;
          clickCount = 1;
          passantCount++;
          sound.play();
          boardFlip();
          turn *= -1;
          pc = "do nothing";
        }
        if (col === 4) {
          boardData[pawnRow][pawnCol] = wB;
          clickCount = 1;
          passantCount++;
          sound.play();
          boardFlip();
          turn *= -1;
          pc = "do nothing";
        }
      }
    }
    else if (pc === bP) {
      if (row === 3) {
        if (col === 3) {
          boardData[pawnRow][pawnCol] = bN;
          clickCount = 1;
          passantCount++;
          sound.play();
          boardFlip();
          turn *= -1;
          pc = "do nothing";
        }
        if (col === 4) {
          boardData[pawnRow][pawnCol] = bR;
          clickCount = 1;
          passantCount++;
          sound.play();
          boardFlip();
          turn *= -1;
          pc = "do nothing";
        }
      }
      if (row === 4) {
        if (col === 3) {
          boardData[pawnRow][pawnCol] = bQ;
          clickCount = 1;
          passantCount++;
          sound.play();
          boardFlip();
          turn *= -1;
          pc = "do nothing";
        }
        if (col === 4) {
          boardData[pawnRow][pawnCol] = bB;
          clickCount = 1;
          passantCount++;
          sound.play();
          boardFlip();
          turn *= -1;
          pc = "do nothing";
        }
      }
    }
  }
}
function boardFlip() {
  //flips the board
  boardData.reverse();
}
function drawCircles() {
  //draws the little gray circles onto the board
  //makes use of other funcitons
  if (clickCount === 2) {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if (rules(boardData[selectedRow][selectedCol], y, x, selectedRow, selectedCol, "Bad")) {
          if (kingDetection(turn, selectedRow, selectedCol, y, x)) {
            if (boardData[selectedRow][selectedCol] === wK || boardData[selectedRow][selectedCol] === bK) {
              stroke(150);
              fill(150);
              circle(x * 60 + 30, y * 60 + 30, 13);
            }
            squareValue3 = boardData[y][x];
            boardData[y][x] = boardData[selectedRow][selectedCol];
            boardData[selectedRow][selectedCol] = 0;
            if (pinDetection(turn, selectedRow, selectedCol, y, x)) {
              stroke(150);
              fill(150);
              circle(x * 60 + 30, y * 60 + 30, 13);
            }
            boardData[selectedRow][selectedCol] = boardData[y][x];
            boardData[y][x] = squareValue3;
          }
        }
      }
    }
  }
}
function rules(piece, row, col, selectedRow, selectedCol, func) {
  //largest most complicated function
  //esentially checks if any move is valid under normal circumstances
  //lots of other functions use this one
  if (turn === 1) {
    if (boardData[row][col] === 0 || boardData[row][col] === bP || boardData[row][col] === bR || boardData[row][col] === bN || boardData[row][col] === bB || boardData[row][col] === bQ || boardData[row][col] === bK) {
      if (piece === wP) {
        if (selectedCol === col) {
          if (boardData[row][col] === 0) {//moving forward
            if (selectedRow === 6) {//if on starting square
              if (selectedRow === row + 2) {
                if (boardData[row + 1][col] === 0) {
                  if (func === "Good") {
                    passantCol = col;
                    passantCount = 1;
                  }
                  return true;
                }
              }
              else if (selectedRow === row + 1) {//if not
                return true;
              }
            }
            else if (row >= 0) {
              if (selectedRow === row + 1) {
                return true;
              }
            }
          }
        }
        else if (col === passantCol && row === 2) {//en passant case
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
          if (col + 1 === selectedCol || col - 1 === selectedCol) {
            if (row === selectedRow - 1) {
              if (boardData[row][col] === bP || boardData[row][col] === bR || boardData[row][col] === bN || boardData[row][col] === bB || boardData[row][col] === bQ || boardData[row][col] === bK) {
                return true;
              }
            }
          }
        }
        else if (col + 1 === selectedCol || col - 1 === selectedCol) {//taking on diagnols
          if (row === selectedRow - 1) {
            if (boardData[row][col] === bP || boardData[row][col] === bR || boardData[row][col] === bN || boardData[row][col] === bB || boardData[row][col] === bQ || boardData[row][col] === bK) {
              return true;
            }
          }
        }
      }
      else if (piece === wN) {//simple code, Knights can jump pieces
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
        if (selectedCol === col) {//same column
          //moving right beside return true
          if (row + 1 === selectedRow || row - 1 === selectedRow || col + 1 === selectedCol || col - 1 === selectedCol) {
            return true;
          }
          if (row < selectedRow) {
            //else do a check on pieces to see if empty
            for (let i = selectedRow - 1; boardData[i][col] === 0; i--) {
              if (row > i - 2) {
                return true;
              }
            }
          }
          else if (row > selectedRow) {
            //check both directions
            for (let i = selectedRow + 1; boardData[i][col] === 0; i++) {
              if (row < i + 2) {
                return true;
              }
            }
          }
        }
        else if (selectedRow === row) {
          //now if in same row instead of col
          if (row + 1 === selectedRow || row - 1 === selectedRow || col + 1 === selectedCol || col - 1 === selectedCol) {
            return true;
          }
          if (col < selectedCol) {
            //check up
            for (let i = selectedCol - 1; boardData[row][i] === 0; i--) {
              if (col > i - 2) {
                return true;
              }
            }
          }
          else if (col > selectedCol) {
            //check down
            for (let i = selectedCol + 1; boardData[row][i] === 0; i++) {
              if (col < i + 2) {
                return true;
              }
            }
          }
        }
      }
      else if (piece === wK) {
        //simple code to move 1 square
        if (row + 1 === selectedRow || row - 1 === selectedRow) {
          if (col + 1 === selectedCol || col === selectedCol || col - 1 === selectedCol) {
            if (func === "Good") {//used for castling
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
        //castling code (king side)
        else if (row === 7 && col === 6) {
          if (boardData[7][5] === 0) {
            if (boardData[7][7] === wR) {
              if (haswKMoved === false) {
                if (pinDetection(turn)) {
                  boardData[7][5] = wK;
                  boardData[7][4] = 0;
                  kingPos();
                  if (pinDetection(turn)) {//used to check if enemy pieces are in control of the squares
                    boardData[7][5] = 0;
                    boardData[7][4] = wK;
                    //func checks if the function should 
                    //actually do things or if its a bad
                    //function running rules
                    if (func === "Good") {
                      boardData[7][7] = 0;//switches pieces
                      boardData[7][5] = wR;
                      haswKMoved = true;
                      boardData[7][5] = wR;
                      boardData[7][4] = wK;
                    }
                    return true;
                  }
                  boardData[7][5] = 0;
                  boardData[7][4] = wK;
                }
              }
            }
          }
        }
        //caslting code (queen side)
        else if (row === 7 && col === 2) {
          if (boardData[7][0] === wR && boardData[7][1] === 0 && boardData[7][3] === 0 && haswKMoved === false) {
            if (pinDetection(turn)) {
              boardData[7][3] = wK;
              boardData[7][4] = 0;
              kingPos();
              if (pinDetection(turn)) {
                boardData[7][3] = 0;
                boardData[7][4] = wK;
                if (func === "Good") {
                  boardData[7][0] = 0;
                  boardData[7][3] = wR;
                  haswKMoved = true;
                  boardData[7][3] = wR;
                  boardData[7][4] = wK;
                }
                return true;
              }
              boardData[7][3] = 0;
              boardData[7][4] = wK;
            }
          }
        }
      }
      else if (piece === wB) {
        //diagnols are hard
        //if you can figure out the column
        //you can figure out the row
        if (row < selectedRow) {
          let colPos = selectedCol;
          let colNeg = selectedCol;
          let maxCol = 100;
          let minCol = -100;
          let maxNum = 0;
          let minNum = 0;
          //loop going up
          //r represents current row
          for (let r = selectedRow - 1; r >= 0; r--) {
            //shows which columns work with current r value
            colPos++;
            colNeg--;
            if (boardData[r][colPos] !== 0) {
              if (maxNum === 0) {
                maxCol = colPos;
                maxNum++;//check for pieces on right
              }
            }
            if (boardData[r][colNeg] !== 0) {
              if (minNum === 0) {
                minCol = colNeg;
                minNum--;//check for pieces on left
              }
            }
            if (row === r && col === colPos) {
              if (col <= maxCol) {//if the row and col
                // are allowed and the col doesn't go
                //over any pieces
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
          //same thing but for the downward values
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
        //copy paste of bishop and rook code
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
    //same as white code now for black.
    //mostly copy pasted
    //makes it so black pieces cant take black pieces
    if (boardData[row][col] === 0 || boardData[row][col] === wP || boardData[row][col] === wR || boardData[row][col] === wN || boardData[row][col] === wB || boardData[row][col] === wQ || boardData[row][col] === wK) {
      if (piece === bP) {
        if (selectedCol === col) {
          if (boardData[row][col] === 0) {
            if (selectedRow === 6) {
              if (selectedRow === row + 2) {
                if (boardData[row + 1][col] === 0) {
                  if (func === "Good") {
                    passantCol = col;
                    passantCount = 1;
                  }
                }
                return true;
              }
              else if (selectedRow === row + 1) {
                return true;
              }
            }
            else if (row >= 0) {
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
          if (col + 1 === selectedCol || col - 1 === selectedCol) {
            if (row === selectedRow - 1) {
              if (boardData[row][col] === wP || boardData[row][col] === wR || boardData[row][col] === wN || boardData[row][col] === wB || boardData[row][col] === wQ || boardData[row][col] === wK) {
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
                if (pinDetection(turn)) {
                  boardData[7][5] = bK;
                  boardData[7][4] = 0;
                  kingPos();
                  if (pinDetection(turn)) {
                    boardData[7][5] = 0;
                    boardData[7][4] = bK;
                    if (func === "Good") {
                      boardData[7][7] = 0;
                      boardData[7][5] = bR;
                      hasbKMoved = true;
                      boardData[7][5] = bR;
                      boardData[7][4] = bK;
                    }
                    return true;
                  }
                  boardData[7][5] = 0;
                  boardData[7][4] = bK;
                }
              }
            }
          }
        }
        else if (row === 7 && col === 2) {
          if (boardData[7][0] === bR && boardData[7][1] === 0 && boardData[7][3] === 0 && hasbKMoved === false) {
            if (pinDetection(turn)) {
              boardData[7][3] = bK;
              boardData[7][4] = 0;
              kingPos();
              if (pinDetection(turn)) {
                boardData[7][3] = 0;
                boardData[7][4] = bK;
                if (func === "Good") {
                  boardData[7][0] = 0;
                  boardData[7][3] = bR;
                  hasbKMoved = true;
                  boardData[7][3] = bR;
                  boardData[7][4] = bK;
                }
                return true;
              }
              boardData[7][3] = 0;
              boardData[7][4] = bK;
            }
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
function kingDetection(turn, selectedRow, selectedCol, row, col) {
  //checks if the spot the king wants to go is in danger
  //makes it so he cant go there
  if (turn === 1) {
    if (boardData[selectedRow][selectedCol] === wK) {
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          //checks every possible move on the board
          boardData[selectedRow][selectedCol] = 0;
          //row and col become the new "selected" row
          if (rules(wB, y, x, row, col, "Bad")) {
            //checks if white bishop could take king
            //on that square
            if (boardData[y][x] === bB || boardData[y][x] === bQ) {
              //checks if a bishop or queen is actually there
              boardData[selectedRow][selectedCol] = wK;
              return false;
            }
            boardData[selectedRow][selectedCol] = wK;
          }
          boardData[selectedRow][selectedCol] = 0;
          if (rules(wR, y, x, row, col, "Bad")) {// same for rook
            if (boardData[y][x] === bR || boardData[y][x] === bQ) {
              boardData[selectedRow][selectedCol] = wK;
              return false;
            }
          }
          boardData[selectedRow][selectedCol] = wK;//knight
          if (rules(wN, y, x, row, col, "Bad")) {
            if (boardData[y][x] === bN) {
              return false;
            }
          }
          if (rules(wP, y, x, row, col, "Bad")) {//pawn
            if (boardData[y][x] === bP) {
              return false;
            }
          }
        }
      }
    }
  }
  if (turn === -1) {//copy pasted for black
    if (boardData[selectedRow][selectedCol] === bK) {
      for (let x = 0; x < 8; x++) {
        for (let y = 0; y < 8; y++) {
          boardData[selectedRow][selectedCol] = 0;
          if (rules(bB, y, x, row, col, "Bad")) {
            if (boardData[y][x] === wB || boardData[y][x] === wQ) {
              boardData[selectedRow][selectedCol] = bK;
              return false;
            }
            boardData[selectedRow][selectedCol] = bK;
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
function kingPos() {
  //gets the current king position in terms of row and col
  if (turn === 1) {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if (boardData[y][x] === wK) {
          kingRow = y;
          kingCol = x;
        }
      }
    }
  }
  else if (turn === -1) {
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if (boardData[y][x] === bK) {
          kingRow = y;
          kingCol = x;
        }
      }
    }
  }
}
function pinDetection(turn, selectedRow, selectedCol, row, col, func) {
  //makes it so pieces cant move if the king will be
  //put in check because of it
  //essentially checks if the king is in check
  //bit confusing to implement this funciton into code
  //as you have to move the piece then check if it works
  //then move it back
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
    //same for black
    //very similar to king detection
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
  //basically trys to find any legal move
  //if it cant then it checks if the king is in check
  //if there are no legal moves and the king is in check
  //then its a win for whoevers turn it is
  //if the king is not in check
  //then stalemate
  for (let selectedCol2 = 0; selectedCol2 < 8; selectedCol2++) {
    for (let selectedRow2 = 0; selectedRow2 < 8; selectedRow2++) {
      for (let col2 = 0; col2 < 8; col2++) {
        for (let row2 = 0; row2 < 8; row2++) {//checks every possible move ever possible
          let kingMoved = false;
          if (row2 !== selectedRow2 || col2 !== selectedCol2) {//double click line
            //very similar to mouse pressed function.
            //uses other functions to check if move is legal
            //if so then you have not won as there is a legal move
            if (rules(boardData[selectedRow2][selectedCol2], row2, col2, selectedRow2, selectedCol2, "Bad")) {
              if (kingDetection(turn, selectedRow2, selectedCol2, row2, col2)) {
                if (boardData[selectedRow2][selectedCol2] === wK || boardData[selectedRow2][selectedCol2] === bK) {
                  return false;
                }
                squareValue2 = boardData[row2][col2];
                boardData[row2][col2] = boardData[selectedRow2][selectedCol2];
                boardData[selectedRow2][selectedCol2] = 0;
                if (pinDetection(turn, selectedRow2, selectedCol2, row2, col2)) {
                  if (kingMoved === false) {
                    boardData[selectedRow2][selectedCol2] = boardData[row2][col2];
                    boardData[row2][col2] = squareValue2;
                    return false;
                  }
                }
                boardData[selectedRow2][selectedCol2] = boardData[row2][col2];
                boardData[row2][col2] = squareValue2;
              }
            }
          }
        }
      }
    }
  }
  if (turn === -1) {
    //stalemate checker did black first this time
    //ran into a very confusing situation where i had to make black kings white
    //checks if the king is in check
    //couldnt use pin checker because of this issue
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if (boardData[y][x] === bK) {
          kingRow = y;
          kingCol = x;
        }
        if (boardData[y][x] === wB || boardData[y][x] === wQ) {
          boardData[kingRow][kingCol] = wK;
          if (rules(bB, kingRow, kingCol, y, x, "that one")) {
            boardData[kingRow][kingCol] = bK;
            return true;
          }
          boardData[kingRow][kingCol] = bK;
        }
        if (boardData[y][x] === wR || boardData[y][x] === wQ) {
          boardData[kingRow][kingCol] = wK;
          if (rules(bR, kingRow, kingCol, y, x, "that one")) {
            boardData[kingRow][kingCol] = bK;
            return true;
          }
          boardData[kingRow][kingCol] = bK;
        }
        if (boardData[y][x] === wN) {
          boardData[kingRow][kingCol] = wK;
          if (rules(bN, kingRow, kingCol, y, x, "that one")) {
            boardData[kingRow][kingCol] = bK;
            return true;
          }
          boardData[kingRow][kingCol] = bK;
        }
        if (boardData[y][x] === wP) {
          boardData[kingRow][kingCol] = wK;
          if (rules(bP, y, x, kingRow, kingCol, "that one")) {
            boardData[kingRow][kingCol] = bK;
            return true;
          }
          boardData[kingRow][kingCol] = bK;
        }
      }
    }
    stalemate = true;
    return false;
  }
  if (turn === 1) {
    //copy pasted for white
    for (let x = 0; x < 8; x++) {
      for (let y = 0; y < 8; y++) {
        if (boardData[y][x] === wK) {
          kingRow = y;
          kingCol = x;
        }
        if (boardData[y][x] === bB || boardData[y][x] === bQ) {
          boardData[kingRow][kingCol] = bK;
          if (rules(wB, kingRow, kingCol, y, x, "that one")) {
            boardData[kingRow][kingCol] = wK;
            return true;
          }
          boardData[kingRow][kingCol] = wK;
        }
        if (boardData[y][x] === bR || boardData[y][x] === bQ) {
          boardData[kingRow][kingCol] = bK;
          if (rules(wR, kingRow, kingCol, y, x, "that one")) {
            boardData[kingRow][kingCol] = wK;
            return true;
          }
          boardData[kingRow][kingCol] = wK;
        }
        if (boardData[y][x] === bN) {
          boardData[kingRow][kingCol] = bK;
          if (rules(wN, kingRow, kingCol, y, x, "that one")) {
            boardData[kingRow][kingCol] = wK;
            return true;
          }
          boardData[kingRow][kingCol] = wK;
        }
        if (boardData[y][x] === bP) {
          boardData[kingRow][kingCol] = bK;
          if (rules(wP, y, x, kingRow, kingCol, "that one")) {
            boardData[kingRow][kingCol] = wK;
            return true;
          }
          boardData[kingRow][kingCol] = wK;
        }
      }
    }
    stalemate = true;
    return false;
  }
  return true;
}
function stalemateByInsufficient() {
  //checks if there is enough pieces on the board to checkmate a king
  //very simple
  wc = 0;
  bc = 0;
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (boardData[y][x] === bP || boardData[y][x] === wP) {
        return false;
      }
      if (boardData[y][x] === bR || boardData[y][x] === wR) {
        return false;
      }
      if (boardData[y][x] === bQ || boardData[y][x] === wQ) {
        return false;
      }
      if (boardData[y][x] === wB || boardData[y][x] === wN) {
        wc++;
      }
      if (boardData[y][x] === bB || boardData[y][x] === bN) {
        bc++;
      }
    }
  }
  if (wc <= 1 && bc <= 1) {
    stalemate = true;
    return false;
  }
  else {
    return false;
  }
}