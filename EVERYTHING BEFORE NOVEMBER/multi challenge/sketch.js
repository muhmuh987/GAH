let topsquare = 10;//number of squares up top
let wsize;//square size
let sidesquare = 10;//on side
let hsize;//onside size
let c = 100;
function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
  wsize = width / topsquare;//divide to get size of each square
  hsize = height / sidesquare;
  grid();
}
function draw() {
  createCanvas(windowWidth, windowHeight);
  grid();
}
function grid() {
  for (let x = 0; x < width; x += wsize) {//size w
    for (let y = 0; y < height; y += hsize) {//size h
      fill(c);
      rect(x, y, wsize, hsize);//rectangles at each size
    }
  }
}
function mousePressed() {//mouse
  if (mouseButton === RIGHT) {
    if (topsquare > 0) {
      background(255);
      topsquare -= 1;//changes number of squares on side and top
      sidesquare -= 1;
      wsize = width / topsquare;
      hsize = height / sidesquare;
      grid();
    }
  }
  if (mouseButton === LEFT) {
    if (topsquare < 69) {
      background(255);
      topsquare += 1;
      sidesquare += 1;
      wsize = width / topsquare;
      hsize = height / sidesquare;
      grid();
    }
  }
}
function keyPressed() {
  grid();
}