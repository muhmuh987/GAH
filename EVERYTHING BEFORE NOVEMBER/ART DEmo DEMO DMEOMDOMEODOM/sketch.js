//google snake but as art in lines and without a snake
let spacing = 6;
function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(5);
  grid();
}
function grid() {
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      let choice = Math.floor(random(2));
      if (choice === 0) {
        diag(x, y, spacing);
      }
      else if (choice === 1) {
        diag2(x, y, spacing);
      }
    }
  }
}
function diag(x, y, s) {
  line(x - s / 2, y + s / 2, x + s / 2, y - s / 2);
}
function diag2(x, y, s) {
  line(x - s / 2, y - s / 2, x + s / 2, y + s / 2);
}