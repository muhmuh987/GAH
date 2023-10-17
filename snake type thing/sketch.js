//snek (I learn nothing from these demos)
let points = [];
let head;
let speed = 5;
let snakelength =30;
function setup() {
  createCanvas(windowWidth, windowHeight);
  head = new Point(width/2, height/2);
  initSnake();
  strokeWeight(20);
}
function initSnake(){//creates a british snak
  for(let i=0; i< snakelength; i++){
    points.push(cp());
  }
}
function cp(){
  if(keyCode===RIGHT_ARROW){
    head.x += speed;
  }
  else if(keyCode===LEFT_ARROW){
    head.x -= speed;
  }
  else if(keyCode===UP_ARROW){
    head.y -= speed;
  }
  else if(keyCode===DOWN_ARROW){
    head.y += speed;
  }
  return new Point(head.x,head.y);
}
function displaysnek(){
  //shows the british snake
  for (let i =0; i<points.length-1; i++){
    let current = points[i];
    let right = points[i+1];
    line(current.x,current.y,right.x,right.y);
  }
}
function GAH(){
  points.splice(0,1);
  points.push(cp());
}
function draw() {
  background(220);
  GAH();
  displaysnek();
}
class Point{//I still dont really know what a class does
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
}
