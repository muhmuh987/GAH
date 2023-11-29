//3d

function setup() {
  createCanvas(12000000,400,WEBGL);
}

function draw(){
  background(0);
  translate(50,50);
  boxes(70);
}
let angle = 5;
function boxes(size){
  if(size>10){
    rotateZ(radians(angle));
    translate(size*1.5,0);
    box(size);
    boxes(size*0.8);
  }
}