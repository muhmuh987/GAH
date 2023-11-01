// Perlin noise
// ELias Reynolds
//did all of the extra challenges and you can also change how many rectangles there are
let numRect = 1000;//global variables
let rectWidth;
let x = 0;
let noisescale = 0.01;
let noiseTime = 1;
let highestx=0;
let highesty=1000;
let averagesum= 0;
let averageY;
let noisechange = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectWidth = width / numRect;
  rectMode(CORNERS);//change rect mode
  drawRect();//call it
}
function drawRect() {//draws rectangles
  rectWidth = width / numRect;
  highesty = 1000;
  averagesum = 0;
  for (let x = 0; x < width; x += rectWidth) {
    fill(0);
    let opprectHeight = noise(noiseTime) * height;
    noiseTime += noisescale;
    let rectHeight = height - opprectHeight;
    if (rectHeight < highesty){//keeps track of highest value
      highesty = rectHeight;
      highestx = x;
    }
    averagesum += rectHeight;//running total of sum of rectangles
    averageY = averagesum/numRect;//divide by num of rect
    rect(x, height + 100, x + rectWidth,rectHeight);
  }
  fill(255);
  drawFlag(highestx,highesty);//draw flag at x y values
  stroke('red');
  line(0,averageY,width,averageY);//line at  average
  stroke(0);
}
function draw() {//resets the noisetime to slightly
  //larger each time
  noiseTime =  + noisechange;
  noisechange += 0.02;
  background(255);
  drawRect();
}
function keyPressed() {///makes it so the arrow keys
  //changes the total number of rectangles
  if (keyCode === 37) {
    if (numRect > 10) {
      numRect -= 10;
    }
  }
  if (keyCode === 39) {
    numRect += 10;
  }
  background(255);
  drawRect();
}
function drawFlag(x,y){//draws a flag at an x and y value
  line(x+rectWidth/2,y,x+rectWidth/2,y-20);
  fill('red');
  triangle(x+rectWidth/2,y-20,x+rectWidth/2, y-10,x+rectWidth/2+10, y -15);
  fill(0);
}