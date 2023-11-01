let counter = 3;
let colors = ["#ECD078", "#D95B43", "#C02942", "#542437", "#53777A"];
function setup() {
  createCanvas(4000, 4000);
  drawClock();
}
function drawClock(){
  background(255);
  translate(random(1800,2200),random(1800,2000));
  let y = 170;
  for(let i = 0; i<700;i++){
    if(counter === Math.floor(random(0,4))){
      strokeWeight(random(15,25));
      counter = 0;
    }
    y-=10;
    stroke(colors[Math.floor(random(colors.length))]);
    line(y-(random(25,50)),y-(random(25,50)),y-(random(10,20)),y-random(0,500));
    strokeWeight(random(3,6));
    rotate(radians(random(6,10)));
    counter = 0;
    counter++;
  }
}
function keyPressed() {
  if (key === 'k') {
    save("Art Image");
  }
}