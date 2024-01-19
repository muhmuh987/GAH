//hiofygsidshifhdifgisdu0fbhifrohdubrejhbdgi
//eliajdas
// JAN 17th why am I still in school
//
// asses into the project folder now ive already put this in the drop box fr fr there we go ill put this up on the screen its in our dropbox scott cs 230 says final coding challenge review its got a bunch of circle animation files and a bunch of gorrillas
// - describe what you did to take this project "above and beyond"
//i dont wanna do this but what else am i gonna do atp
//my phone has like 3% charge there is no point in going on it
// this is stupid
//comments are dumb
//gorrilas are not fun
//i wanna go home
//can it be two weeks from now
//global varibales
let gorillaIdle = [];
let gorillaSwipe = [];
let spiralImages = [];
let spirals = [];
let gorillaX, gorillaY;//i wanna be gorilla
let idleIndex = 0; let swipeIndex = 0;
function preload() {
  for (let i = 1; i < 7; i++) {
    gorillaIdle.push(loadImage("assets/Gorilla/idle" + i + ".png"));
    gorillaSwipe.push(loadImage("assets/Gorilla/swipe" + i + ".png"));
  }
  for (let i = 0; i < 10; i++) {
    spiralImages.push(loadImage("assets/Circle/Circle Animation0" + i + ".png"));
  }
  for (let i = 10; i < 16; i++) {
    spiralImages.push(loadImage("assets/Circle/Circle Animation" + i + ".png"));
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  gorillaX = width / 2;
  gorillaY = height / 2;
}
function draw() {
  background(220);
  if (keyIsPressed && key === " ") {
    image(gorillaSwipe[swipeIndex], gorillaX, gorillaY);
    if (frameCount % 6 === 0) {
      swipeIndex++;
      if (swipeIndex === 6) {
        swipeIndex = 0;
      }
    }
  }
  else {
    image(gorillaIdle[idleIndex], gorillaX, gorillaY);
    if (frameCount % 15 === 0) {
      idleIndex++;
      if (idleIndex === 6) {
        idleIndex = 0;
      }
    }
  }
  for(let i = 0; i < spirals.length; i++){
    let s = spirals[i];
    s.display();
    if (s.active === false){
      spirals.splice(i,1);
      i--;
    }
  }
}
function mousePressed(){
  spirals.push(new Spiral(mouseX,mouseY));
}
class Spiral {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.currentFrame = 0;
    this.active = true;
  }
  display(){
    if(this.currentFrame > 15){
      this.active = false;
    }
    else{
      image(spiralImages[this.currentFrame], this.pos.x, this.pos.y);
      if(frameCount % 4 === 0){
        this.currentFrame++;
      }
    }
  }
}
