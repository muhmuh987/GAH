//one must imagine sisyphus happy
let rectwidth = 50;
let rectheight = 10;
let colors = ["#ECD078","#D95B43","#C02942","#542437","#53777A"]
function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  drawcolor(width*0.1);
  drawgoodcolor(0);
  reallygoodcolor(width * 0.2);
}
function drawcolor(xPos){
  colorMode(RGB);
  for(let y=0; y<height;y+=rectheight){
    fill(random(255),random(255),random(255));
    rect(xPos,y,rectwidth,rectheight);
  }
}
function drawgoodcolor(xPos){
  colorMode(HSB, 360);
  for(let y=0; y<height;y+=rectheight){
    fill(map(y,0,height,330,250)%360,360, 300);
    rect(xPos,y,rectwidth,rectheight);
  }
}
function reallygoodcolor(xPos){
  colorMode(RGB);
  let counter = 0;
  for(let y=0; y<height;y+=rectheight){
    fill(colors[counter%5]);
    fill(colors[Math.floor(random(colors.length))]);
    rect(xPos,y,rectwidth,rectheight);
    counter++;
  }
}