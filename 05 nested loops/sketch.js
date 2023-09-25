// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  for (let x = 0; x <=  mouseX; x += 50){
    for (let y=0; y <= mouseY; y+=50){
      fill(random(255), random(255), random(255));
      ellipse(x, y, 50);
    }
  }
}