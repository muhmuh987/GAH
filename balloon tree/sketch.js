// Balloon Tree
// Elias Reynolds
// Nov 28th
//
//On the asignment it said to make it so the leaves
//were smaller the further they went out
//I watched the video after I made the assignment
//the video did the opposite of what the assignment said
//I went with what the assignment stated
//GLobal variables
let scaler = 15;
let circleDepth = 12;
function setup() {
  createCanvas(500, 500);
  background(255);
}
function keyPressed(){
  //changes the depth of the tree
  if(key === 'z'){
    if(circleDepth>6){
    circleDepth--;}
  }
  if(key === 'x'){
    if(circleDepth<12){
    circleDepth++;}
  }
}
function draw() {
  randomSeed(1);
  background(255);
  drawTree(width / 2, height * 0.9, 90, 6,circleDepth);
}
function drawLine(x1, y1, x2, y2, depth) {
  //draw a line segment connecting (x1,y1) to (x2,y2)
  line(x1, y1, x2, y2);
}
function drawTree(x1, y1, angle, depth,circleDepth) {
  if (depth > 0) {
    let x2 = x1 + (cos(radians(angle)) * depth * scaler);
    //calculate
    let angleChange = map(mouseX,0,width,5,45);
    //endpoints of current branch
    let y2 = y1 - (sin(radians(angle)) * depth * scaler);
    strokeWeight(depth*1.5);
    drawLine(x1, y1, x2, y2, depth);
    //for a 2-branch tree:
    drawTree(x2, y2, angle - angleChange, depth - 1,circleDepth-1);
    drawTree(x2, y2, angle + angleChange, depth - 1,circleDepth-1);
    //three branch tree
    drawTree(x2, y2, angle, depth - 1,circleDepth-1);
    drawLeaf(x2, y2, circleDepth);
  }
}
function drawLeaf(x, y, circleDepth) {
  //draws circles
  if (circleDepth < 7) {
    fill(random(255), random(255), random(255),);
    circle(x, y, circleDepth*scaler*random(0.3,0.5));
  }
}
