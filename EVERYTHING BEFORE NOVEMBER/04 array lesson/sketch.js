// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let words = ['uf', 'aludhfh', 'fdsa', 'dauifb',];
let nums = [50, 40, 30, 20, 10];
let num = 24;
let index = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for (let i = 0; i < 4; i++) {
    ellipse(i*100 +100, 200, nums[i]), nums[i];
  }
}
function mousePressed() {
  index = index + 1;
  if (index === words.length) {
    index = 0;
  }
}