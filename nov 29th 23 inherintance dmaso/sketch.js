// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let objects = [];
function setup(){
  createCanvas(windowWidth, windowHeight);
  for(let i=0;i<10;i++){
    objects.push(new Animatedobject(random(width),random(height)));
  }
  for(let i=0;i<10;i++){
    objects.push(new CircleObject(random(width),random(height),random(20,40)));
  }
  for(let i=0;i<10;i++){
    objects.push(new LineObject());
  }
}

function draw() {
  background('lightblue');
  for(let p of objects){
    p.move();
    p.display();
  }
}
class Animatedobject{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 1;
  }
  move(){
    this.x += random(-2,2);
    this.y += random(-2,2);
  }
  display(){
    strokeWeight(4);
    point(this.x,this.y);
  }
}
class CircleObject extends Animatedobject{
  constructor(x,y,d){
    super(x,y);
    this.size = d;
  }
  display(){
    strokeWeight(2);
    circle(this.x,this.y,this.size);
  }
}
class LineObject extends Animatedobject{
  constructor(){
    super(random(width),random(height));
  }
  move(){
    super.move();
    this.x+=5;
    if(this.x>width){
      this.x = 0;
    }
  }
  display(){
    if(mouseIsPressed){
      strokeWeight(10);
    }
    else{
      strokeWeight(2);
    }
    line(this.x,this.y,this.x+15,this.y);
  }
}