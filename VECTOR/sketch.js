//"oh yeah" -vector
//november first
let movers = [];
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  movers.push(new Mover(mouseX,mouseY));
  for(let i=0;i<movers.length;i++){
    let m =movers[i];
    m.move();
    m.display();
    if(m.alive === false){
      movers.splice(i,1);
      i--;
    }
  }
}
function mousePressed(){
  movers.push(new Mover(mouseX,mouseY));
}
class Mover {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.s = 100;
    this.gravity = createVector(0,5);
    this.velocity = createVector(random(-30,30),random(-10,10));
    this.lifetime = Math.floor(random(100,200));
    this.alive = true;
  }
  move() {
    this.position.add(this.velocity);
    this.velocity.add(this.gravity);
    this.lifetime--;
    if(this.lifetime === 0){
      this.alive = false;
    }
  }
  display() {
    push();
    translate(this.position.x, this.position.y);
    circle(0, 0, this.s);
    pop();
  }
}