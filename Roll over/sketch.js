// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let wsize;
let hsize;
let rquad;
function setup() {
  createCanvas(windowWidth, windowHeight);
  wsize = width / 2;
  hsize = height / 2;
}

function draw() {
  background(220);
  checker();
  grid();
}
function grid() {
  fill(255);
  if (rquad === 1) {
    for(let c = 255; c > 0; c = c-1){
      fill(c);
    }
  }
  rect(0, 0, width / 2, height / 2);
  fill(255);
  if (rquad === 2) {
    fill(0);
  }
  rect(width / 2, 0, width / 2, height / 2);
  fill(255);
  if (rquad === 3) {
    fill(0);
  }
  rect(0, height / 2, width / 2, height / 2);
  fill(255);
  if (rquad === 4) {
    fill(0);
  }
  rect(width / 2, height / 2, width / 2, height / 2);
}
function checker() {
  if (0 < mouseX && mouseX < width/2 && 0 < mouseY && mouseY < height / 2) {
    rquad = 1;
  }
  if(width/2 < mouseX && mouseX < width && 0 < mouseY && mouseY < height / 2){
    rquad = 2;
  }
  if(width/2 < mouseX && mouseX < width && height/2 < mouseY && mouseY < height){
    rquad =4;

  }
  if(0 < mouseX && mouseX < width/2 && height/2 < mouseY && mouseY < height){
    rquad = 3;}
}
