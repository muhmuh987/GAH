// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let counter =3;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  drawClock();
  hands();
}
function drawClock(){
  push();
  rotate(radians(2.85));
  translate(20,-20);
  circle(width/2,height/2,500);
  translate(width/2,height/2);
  let y = 170;
  for(let i = 0; i<60;i++){
    if(counter === 5){
      strokeWeight(10);
      counter = 0;
    }
    line(170,y,160,y-10);
    strokeWeight(1);
    rotate(radians(6));
    counter++;
  }
  pop();
}
function hands(){
  push();
  translate(width/2,height/2);
  line(0,0,250,0);
  pop();
}