// Puzzle Game
// Elias Reynolds
// Nov 10, 2023
// A first foray into working with 2D arrays
//Global Variables
let flippy = 1;
let grid =
  [[255, 0, 255, 0, 255],
  [0, 0, 0, 255, 0],
  [255, 255, 0, 255, 0], 
  [255, 0, 0, 255, 0]];
let gridspare = grid;
const NUM_ROWS = 4; const NUM_COLS = 5;
let rectWidth, rectHeight, row, col;
function setup() {
  rectWidth = 50; rectHeight = 50;
  createCanvas(NUM_COLS * rectWidth, NUM_ROWS * rectHeight);
  randomize();
}
function draw() {
  row = getCurrentY(); col = getCurrentX();
  background(220);
  renderGrid();
  if (wincheck() === true) {
    fill(125);
    text('you win!!!!!', mouseX, mouseY);
  }
  greenplus();}
function keyPressed() {
  //if spacebar is pressed change variable
  if (keyCode === 32) {
    flippy *= -1;
  }
}
function mousePressed() {
  //flippy flippy whippy whippy
  //flips flippy when flippy is supposed to be flipped
  //to flip the square to do the flip
  if (flippy === 1) {
    if (keyIsPressed && keyCode === SHIFT) {//shift makes one
      flip(col, row);
    }
    else {//do plus sign
      flip(col, row);
      if (col < NUM_COLS - 1) flip(col + 1, row);
      if (col > 0) flip(col - 1, row);
      if (row < NUM_ROWS - 1) flip(col, row + 1);
      if (row > 0) flip(col, row - 1);
    }
  }
  else {
    if (keyIsPressed && keyCode === SHIFT) {
      flip(col, row);
    }
    else {//do square
      flip(col, row);
      if (col < NUM_COLS - 1) flip(col + 1, row);
      if (row > 0 && col < NUM_COLS - 1) flip(col + 1, row - 1);
      if (row > 0) flip(col, row - 1);
    }
  }

  gridspare = structuredClone(grid);
}
function flip(col, row) {
  //flips the colors
  if (gridspare[row][col] === 0) {
    grid[row][col] = 255;
  }
  else {
    grid[row][col] = 0;
  }
}
function greenplus() {
  //makes green thing
  grid = structuredClone(gridspare);//set grid to 
  //gridspare. gridspare saves the black and white values
  //while grid has green values in it
  if (flippy === 1) {//if spacebar hasnt been pressed
    //do plus sign
    if (keyIsPressed && keyCode === SHIFT) {
      greenthing(col, row);
    }
    else {
      greenthing(col, row);
      if (col < NUM_COLS - 1) greenthing(col + 1, row);
      if (col > 0) greenthing(col - 1, row);
      if (row < NUM_ROWS - 1) greenthing(col, row + 1);
      if (row > 0) greenthing(col, row - 1);
    }
  }
  else {//otherwise do square
    if (keyIsPressed && keyCode === SHIFT) {
      greenthing(col, row);
    }
    else {
      greenthing(col, row);
      if (col < NUM_COLS - 1) greenthing(col + 1, row);
      if (row > 0 && col < NUM_COLS - 1) greenthing(col + 1, row - 1);
      if (row > 0) greenthing(col, row - 1);
    }
  }
}
function greenthing(col, row) {
  //works like flip but makes it green no matter what
  grid[row][col] = color(144, 238, 144);
}
function getCurrentX() { //determine current column mouse is in, and return
  let constrainMouseX = constrain(mouseX, 0, width - 1);
  return floor(constrainMouseX / rectWidth);
}
function getCurrentY() { //determine current row mouse is in, and return
  let constrainMouseY = constrain(mouseY, 0, height - 1);
  return floor(constrainMouseY / rectHeight);
}

function renderGrid() {
  //creates a 2D grid of squares using information from our
  //2D array for the corresponding fill values
  for (let x = 0; x < NUM_COLS; x++) {
    for (let y = 0; y < NUM_ROWS; y++) {
      let fillValue = grid[y][x];
      fill(fillValue);
      //x:    0,   1,   2,  3,   4
      //posx  0   50, 100, 150,200   expression? x→posx
      rect(x * rectWidth, y * rectHeight, rectWidth, rectHeight);
    }
  }
}
function wincheck() {
  //checks if the player has won once per frame
  let twofitty;
  let win = false;
  for (let p of gridspare) {
    for (let a of p) {
      if (a === 255) {
        if (twofitty === false) {
          win = false;
          return win;
        }
        else {
          twofitty = true;
          win = true;
        }
      }
      else if (a === 0) {
        if (twofitty === true) {
          win = false;
          return win;
        }
        else {
          twofitty = false;
          win = true;
        }
      }
    }
  }
  return win;
}
function randomize() {
  //randomizes the grid and makes a second array
  //which is equal to the first
  grid =
    [[random([0, 255]), random([0, 255]), random([0, 255]), random([0, 255]), random([0, 255])],
    [random([0, 255]), random([0, 255]), random([0, 255]), random([0, 255]), random([0, 255])],
    [random([0, 255]), random([0, 255]), random([0, 255]), random([0, 255]), random([0, 255])],
    [random([0, 255]), random([0, 255]), random([0, 255]), random([0, 255]), random([0, 255])]];
  gridspare = structuredClone(grid);
}