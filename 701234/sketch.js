// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ball = [];
let totalBounces = 0;
let bounceSound,music;
function preload(){
  music = loadSound("assets/background.mp3");
  bounceSound = loadSound("assets/bounceSound.wav");
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 100000; i++) {
    ball.push(new Ball(width / 2, height / 2));
  }
  if(localStorage.getItem("bounces")===null){
    localStorage.setItem("bounces",0);
  }
  else{
    totalBounces = int(localStorage.getItem("bounces"));
  }
  music.loop();
}

function draw() {
  randomSeed(1);
  background(220);
  for (let p of ball) {
    p.display();
    p.move();
  }
  textSize(30);
  text(totalBounces,width/2,height/2);
}
class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.v = createVector(random(-1000, 1000), random(-1000, 1000));

  }
  display() {
    fill(random(255),random(255),random(255));
    circle(this.pos.x, this.pos.y, 30);
  }
  move() {
    this.pos.add(this.v);
    if (this.pos.x < 0 || this.pos.x > width) {
      this.v.x *= -1;
      totalBounces++;
      bounceSound.play();
      localStorage.setItem("bounces",totalBounces);
    }
    if (this.pos.y < 0 || this.pos.y > height) {
      this.v.y *= -1;
      totalBounces++;
      bounceSound.play();
      localStorage.setItem("bounces",totalBounces);
    }
  }
}
function keyPressed(){
  if(key==='r'){
    totalBounces = 0;
  }
}