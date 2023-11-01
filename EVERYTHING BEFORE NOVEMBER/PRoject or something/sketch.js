// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let b;
let b1;
let b2;
function setup() {
  createCanvas(windowWidth, windowHeight);
  b = new thingy(height / 2, 'red');
  b1 = new thingy(height / 3, 'orange');
  b2 = new thingy(height / 1.5, 'green');
}

function draw() {
  background(0);
  b.move(); b1.move(); b2.move();
  b.display(); b1.display(); b2.display();
}
class thingy {//what is class
  //cookie thing
  constructor(y, c) {//fancy function?????
    this.x = -25;
    this.y = y;
    this.c = c;
    this.v = random(15, 69);
    this.s = 50;
    fill(c);
  }
  display() {//is this a function????? why this work?? when call??
    fill(this.c);
    circle(this.x, this.y, this.s);
  }
  move() {//another function??
    this.x += this.v;
    if (this.x > width+25){
      this.x = -25;
    }
  }
}