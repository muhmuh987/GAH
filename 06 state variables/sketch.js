// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let mouseSide = 'left';
let fillValue = 255;
function setup() {
  createCanvas(windowWidth, windowHeight);
  updatemousestate();
}

function draw() {
  background(220);
  updatemousestate();
  redersquares();
}
function redersquares(){
  if (mouseSide === 'left'){
    fill(0);
  }
  else fill(255);
  rect(0,0,width/2,height);
  fill(255);
  if (mouseSide ==="right"){
    fillValue =0;
  }
  else{
//i am le lost at this pointt and dont know what to do anymore therefore
//I am going to give up trying to keep up with him
  }
  rect(width/2,0,width/2,height);
  if (mouseSide ==="right"){
    fillValue =0;
}
function updatemousestate(){
  if (mouseX > width/2){
    mouseSide = 'right';
  }
  else mouseSide ='left';
}