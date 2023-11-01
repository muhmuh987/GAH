// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let pointx;
let pointy;
let flippy;
function setup() {
  createCanvas(windowWidth, windowHeight);
  drawthingspls();
}
function drawthingspls() {
  pointx = width / 2;
  pointy = height;
  flippy = 2;
  let counter = 0;
  let flippyy =1;
  for (let i = 0; i < 99; i++) {
    let pointx2 = pointx + random(10, 50) * flippy;
    let pointy2 = pointy - (random(10, 20)*flippyy);
    line(pointx, pointy, pointx2, pointy2);
    pointx = pointx2;
    pointy = pointy2;
    flippy *= -1;
    counter++;
    if(counter ===45){
      flippyy*=-1;
    }
  }
}