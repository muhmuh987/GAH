// mouse distance
//mouse ahfusfasjf
//I want to die
let nodeSize = 15;
let nodeColors = [];
let colorIndex = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  initcolours();
  segmentDistance();
  textAlign(CENTER);
}

function draw() {
  background(220);
  eragatr5gui();
}
function eragatr5gui(){
  stroke(nodeColors[colorIndex]);
  fill(nodeColors[colorIndex]);
  circle(width/2, height/2, 20);
  circle(mouseX, mouseY, 20);
  line (width/2, height/2,mouseX,mouseY);
  let d = segmentDistance(mouseX,width/2,mouseY,height/2);
  textSize(20);
  text(round(d,1), width/2, height * 0.4);
}
function initcolours(){
  nodeColors.push(color("red"));
  nodeColors.push(color(200,100,0));
  nodeColors.push(color('blue'));
}
function mouseWheel(event){
  print(event.delta);
  if (event.delta > 0){
    colorIndex += 1;
    if (colorIndex > nodeColors.length -1){
      colorIndex = 0;
    }
  }
}
function segmentDistance(x1,x2,y1,y2){
  let a = Math.abs(x1 - x2);
  let b = Math.abs(y1 - y2);
  let c = Math.sqrt(a*a + b*b);
  return c;
}