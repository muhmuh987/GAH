// CARS CARS CARS!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Elias Reynolds
// OCt 19th
//
// I completed ALL the extra challenges :)
let eastbound = [];//global variables for classes
let westbound = [];
let light;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  for (let i = 0; i < 20; i++) {
    //pushes 20 east and westbound cars into array
    westbound.push(new Vehicle(width, random(height / 2 - 30, height / 2 - height / 4 + 30), random(-10, -1)));
    eastbound.push(new Vehicle(0, random(height / 2 + 30, height / 2 + height / 4 - 30), random(1, 10)));
    light = new Trafficlight(width - 50, height);//the light
  }
}
function mouseClicked() {
  //adds cars to list when clicking or shift clicking
  if (keyIsPressed && keyCode === SHIFT) {
    westbound.push(new Vehicle(width, random(height / 2 - 30, height / 2 - height / 4 + 30), random(-10, -1)));
  }
  else {
    eastbound.push(new Vehicle(0, random(height / 2 + 30, height / 2 + height / 4 - 30), random(1, 10)));
  }

}
function draw() {
  //a very small amount of stuff in the draw loop
  light.finalactionthingyfrfr();
}
function drawRoad() {
  //draws a road
  fill(0);
  rect(width / 2, height / 2, width, height / 2);
  for (let i = 0; i < width; i += 40) {
    let i2 = i + 20;
    stroke(255);
    line(i, height / 2, i2, height / 2);
  }
}
class Vehicle {
  //vehicle class 
  constructor(x, y, speed) {
    //constructor takes x y and speed so I can use
    //random in the westbound code with negatives
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = color(random(255), random(255), random(255));
    this.type = round(random(0, 1));//a 0 or a 1
    this.onepercent = round(random(0, 100));//a whole number
    //between 0 and 100
  }
  drawCar() {
    //code that draws a car at the given x and y position
    fill(this.color);
    rect(this.x, this.y, 40, 20);
    fill(0);
    rect(this.x + 10, this.y - 13, 5, 3);
    rect(this.x - 10, this.y - 13, 5, 3);
    rect(this.x + 10, this.y + 13, 5, 3);
    rect(this.x - 10, this.y + 13, 5, 3);
    fill('lightblue')
    rect(this.x + 10, this.y, 8, 15);
  }
  drawTruck() {
    //draws a truck at given x and y position
    fill(this.color);
    rect(this.x, this.y, 50, 25);
    fill(0);
    rect(this.x + 10, this.y - 14, 6, 4);
    rect(this.x - 10, this.y - 14, 6, 4);
    rect(this.x + 10, this.y + 14, 6, 4);
    rect(this.x - 10, this.y + 14, 6, 4);
    fill('lightblue')
    rect(this.x + 15, this.y, 8, 20);
    stroke(0);
    rect(this.x - 5, this.y, 1, 23);
    stroke(255);
  }
  display() {//displays the truck if the value is one
    //and a car if its 0, random chance basically
    if (this.type === 1) {
      this.drawTruck();
    }
    else {
      this.drawCar();
    }
  }
  move() {
    //moves the car the right amount and resets it to the
    //other side when it goes too far
    this.x += this.speed;
    if (this.x > width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
  }
  speedUp() {
    //1 in 100 chance to speed up to a max of 15
    this.onepercent = round(random(0, 100));
    if (this.onepercent === 100) {
      if (this.speed < 0) {
        this.speed = this.speed + (((this.speed * -1) - 15) / 2);
      }
      else if (this.speed > 0) {
        this.speed = this.speed + (((this.speed * -1) + 15) / 2);
      }
    }
  }
  speedDown() {
    //one in 100 chance to decrease the speed
    this.onepercent = round(random(0, 100));
    if (this.onepercent === 99) {
      if (this.speed < 0) {
        this.speed = this.speed - (this.speed / 2);
      }
      else if (this.speed > 0) {
        this.speed = this.speed - (this.speed / 2);
      }
    }
  }
  changeColor() {
    //changes the color 1 in 100
    this.onepercent = round(random(0, 100));
    if (this.onepercent === 98) {
      this.color = color(random(255), random(255), random(255));
    }
  }
}
function action() {
  //basically does everything
  background(220);
  drawRoad();
  for (let p of eastbound) {
    p.speedUp();
    p.speedDown();
    p.changeColor();
    p.move();
    p.display();
  }
  for (let p of westbound) {
    p.speedDown();
    p.speedUp();
    p.changeColor();
    p.move();
    p.display();
  }
}
class Trafficlight {//twaffic wight
  constructor(x, y) {//takes x and y position
    this.x = x;
    this.y = y;
    this.red = false;//sets red to false bcuz its green
    this.count = 0;//counter at 0
  }
  lightcounter() {
    if (keyIsPressed && keyCode === 32) {
      this.red = true;//if space bar pressed then red
    }
    if (this.red === true) {//start counting
      this.count++;
    }
    if (this.count === 120) {//when counter hit 120 reset to green and counter to 0
      this.red = false;
      this.count = 0;
    }
  }
  display() {
    //displays traffic light and appropriate colour
    fill(0);
    rect(this.x, this.y, 10, 160);
    if (this.red === true) {
      fill('red');
    }
    else {
      fill('green')
    }
    circle(this.x, this.y - 80, 30);
  }
  finalactionthingyfrfr() {
    //only does action if light green else doesnt do action
    //therefore the cars stop when pressed :)
    if (this.red === false) {
      action();
    }
    this.lightcounter();
    this.display();
  }
}