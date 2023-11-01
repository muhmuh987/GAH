//Art replication
//Elias Reynolds
//OCt 26th
//WORKS FR
let gridsize = 8;
function setup() {
  createCanvas(windowWidth, windowHeight);
  push();
  for (let i = 0; i < 5000; i++) {//5000 random points
    let x = random(0,width);
    let y = random(0,height);
    let randomness = round(random(1, 5));
    if (dist(x, y, width / 2, height / 2) <= 400) {//if point in circle
      fill(0);
      if (randomness === 2) {
        rect(x, y, random(3, 30), 3);
      }//draw rectangles if random good
      if (randomness === 5) {
        rect(x, y, 3, map(y,0,height,3,random(20, 30)));
      }
    }
  }
}
