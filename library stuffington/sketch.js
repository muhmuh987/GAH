// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let scribble;
let circleD = 100;
function setup() {
  createCanvas(windowWidth, windowHeight);
  scribble = new Scribble;
}

function draw() {
  background(220);
  if(collideRectCircle(mouseX,mouseY,120,60,width/2,height/2,circleD)){
    fill('red');
  }
  else{
    fill(255);
  }
  circle(width/2,height/2,circleD);
  rect(mouseX,mouseY,120,60);
}