// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let colors = ["#ECD078", "#D95B43", "#C02942", "#542437", "#53777A"];
let randoms;
function setup() {
  createCanvas(4000, 4000);
  background(255);
  mold();
}
function mold(){
  let randomx = random(0.3, 0.6);
  let randomy = random(0.3, 0.6);
  let randomx2 = random(0.3, 0.6);
  let randomy2 = random(0.3, 0.6);
  for (let i = 0; i < random(9000,12000); i++) {//5000 random points
    let x = random(0, width);
    let y = random(0, height);
    if (dist(x, y, width / 2, height / 2) <= 1200) {//if point in circle
      stroke(colors[Math.floor(random(colors.length))]);
      if ((dist(x, y, width * randomx, height * randomy) <= random(100,250))) {
        stroke(colors[4]);
        star(x, y, random(60, 110), random(0, 45));
      }
      if ((dist(x, y, width * randomx2, height * randomy2) <= random(100,250))) {
        stroke(colors[4]);
        star(x, y, map(y,0,height,0,random(60, 110)), random(0, 45));
      }
      star(x, y, random(40, 100), random(0, 45));
    }
  }
}
function star(x, y, randsize, randrotate) {
  push();
  translate(x, y);
  rotate(randrotate);
  let xthing = 1;
  let ything = 1;
  for (let i = 0; i < randsize; i++) {
    line(1, ything, 1, xthing);
    strokeWeight(0.8);
    ything += 1;
    xthing -= 1;
    rotate(radians(15));
  }
  pop();
}
function keyPressed() {
  if (key === 'k') {
    save("Art Image");
  }
}