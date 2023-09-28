// Drawing with loops
// Eliaugoooooojpvyrdcyutfgihjhs Reynolds
// Sept 25th
//using loops to draw stuff
//physics makes more sense than this class
//global variables
let GRIDSIZE = 10;
let numSeg = 200;
let segh;
let currentBackground = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  segh = height / numSeg;
}
function gradient() {
  for (let i = 0; i < numSeg; i++) {
    let y = i * segh;
    let c = map(y, 0, height, 0, 255);
    noStroke();
    fill(c, 20, 255 - c);
    rect(0, y, width, segh);
  }
  stroke(0);
}
function selectBackground() {
  if (currentBackground === 0) gradient();
  else background(60, 240, 120);
}
function draw() {
  selectBackground();
  grid();
}
function grid() {
  for (let x = 0; x < width; x += GRIDSIZE) {
    for(let y= 0; y<height; y+=GRIDSIZE){
      if(dist(x,y,mouseX,mouseY)<50){
        fill('red')
      }
      else fill(0)
      rect(x,y,10);
    }
  }
}
function mousePressed() {
  print(mouseButton);
  if (mouseButton === LEFT) {
    currentBackground -= 1;
    if (currentBackground < 0) currentBackground = 1;
  }
  if (mouseButton === CENTER) {
    currentBackground += 1;
    if (currentBackground > 2) currentBackground = 0;
  }
  return false; //DOESNT WORK override the default behavior
}