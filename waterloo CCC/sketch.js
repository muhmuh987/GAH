//gv
let topleftx = 1000;
let toplefty = 1000;
let widthx = 10000;
let heighty = 10000;
function setup() {
  createCanvas(windowWidth, windowHeight);
  let N = round(random(2,100));
  for(let i=0;i<N;i++){
    let x = round(random(100,width-100));
    let y = round(random(100,height-100));
    strokeWeight(3);
    point(x,y);
    if(x<topleftx){
      topleftx = x;
    }
    if(y<toplefty){
      toplefty = y;
    }
  }
}

function draw() {
}
