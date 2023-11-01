//Cookie cookie yum time
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
//GViafodfkas
let walkers = [];
const NUM_WALERS = 3000;
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < NUM_WALERS; i++) {
    let newColor = color(random(255),random(255),random(255));
    walkers.push(new Walker(width / 2, height / 2, color(newColor)));
  }
}

function draw() {
  background(255);
  for (let w of walkers) {
    w.move();
    w.display();
  }
}
class Walker {//what is class
  //cookie thing
  constructor(x, y, c) {//fancy function?????
    this.x = x;
    this.y = y;
    this.c = c;
    this.v = 10;
    this.s = 10;
    fill(c);
    rect(x, y, this.s);
  }
  display() {//is this a function????? why this work?? when call??
    rectMode(CENTER);
    fill(this.c);
    square(this.x, this.y, this.s);
  }
  move() {//another function??
    //☺
    let mychoice = Math.floor(random(4));
    if (mychoice === 0) this.x -= this.v;
    else if (mychoice === 1) this.x += this.v;
    else if (mychoice === 2) this.y -= this.v;
    else this.y += this.v;
  }
  //☻
}