// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let foods = ["apple", "banana", "cantaloupe", "dragon fruit", "elderberry", "farkleberry"];
let result = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < foods.length; i++) {
    if (i % 2 === 0) {
      result.unshift(foods[i]);
    }
    else {
      result.push(foods[i]);
    }
  }
  print(result);
}

function draw() {
  background(220);
}
