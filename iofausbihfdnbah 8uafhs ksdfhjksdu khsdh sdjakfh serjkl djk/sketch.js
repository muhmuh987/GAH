//iufhkjfbakjfb kjsj,fndjklhb afkldfb, afkjsdb 
//global variabselss\
let points = [];
let reach = 200;
function setup() {
  createCanvas(windowWidth, windowHeight);
}
function draw() {
  background(255);
  for (let p of points) {
    p.move();
    p.display();
    p.connectpoints(points);
  }
}
class Minipoint {
  //constructor function
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.s = 20;
    this.c = color(random(255), random(255), random(255));
    this.xtime = random(10); this.ytime = random(10);
    this.timeshift = 0.01; this.maxspeed = 5;
  }
  //class functions
  display() {
    fill(this.c);
    noStroke();
    circle(this.x, this.y, this.s);
    if(dist(this.x,this.y,mouseX,mouseY) < reach){
      this.s = map (dist(this.x,this.y,mouseX,mouseY), 20, 0, 50, 20);
    }
  }
  move() {
    let xspeed = noise(this.xtime);
    xspeed = map(xspeed, 0, 1, -this.maxspeed, this.maxspeed);
    let yspeed = noise(this.ytime);
    yspeed = map(yspeed, 0, 1, -this.maxspeed, this.maxspeed);
    this.x += xspeed; this.y += yspeed;
    this.xtime += this.timeshift; this.ytime += this.timeshift;
    if (this.x < 0) this.x += width;
    if (this.x > width) this.x -= width;
    if (this.y > height) this.y -= height;
    if (this.y < 0) this.y += height;
  }
  connectpoints(pointarray) {
    stroke(this.c);
    for (let p of points) {
      if(this !== p){
        if(dist(this.x,this.y,p.getx(),p.gety()) < reach){
          line(this.x, this.y,p.getx(),p.gety());
        }
      }
    }
  }
  getx() { return this.x }
  gety() { return this.y }
}
function mouseClicked() {
  points.push(new Minipoint(mouseX, mouseY));
}