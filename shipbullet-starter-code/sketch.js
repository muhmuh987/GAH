// OOP Pair Programming Starter Code
// Your Names
// The Date


// ------------------------------------------------------------------------- //
// You don't need to edit this section...

let enterprise;
let shipImage, bulletImage;
let arr = [];
let last;
function preload() {
  shipImage = loadImage("assets/enterprise.png");
  bulletImage = loadImage("assets/laser-shot.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  enterprise = new Ship(width / 2, height / 2, shipImage);
  imageMode(CENTER);
  arr.push(new Bullet(this.x,this.y,bulletImage));
}

function draw() {
  background("black");
  enterprise.update();
  enterprise.display();
  for(let p of arr){
    p.update();
    p.display();
    p.isOnScreen();
  }
}

function mouseClicked() {
  enterprise.handleKeyPress();
}

// ------------------------------------------------------------------------- //
// Start editing here!

class Ship {
  constructor(x, y, theImage) {
    // define the variables needed for this ship
    this.x = x;
    this.y = y;
    theImage = shipImage;
    this.theImage = theImage;
  }

  update(){
    if (keyCode === RIGHT_ARROW) {
      if (this.x < width) {
        this.x += 5;
      }
    }
    if (keyCode === LEFT_ARROW) {
      if (this.x > 0) {
        this.x -= 5;
      }
    }
    if (keyCode === UP_ARROW) {
      this.y -= 5;
    }
    if (keyCode === DOWN_ARROW) {
      this.y += 5;
    }
  }

  display() {
    // show the ship
    image(this.theImage, this.x, this.y,);
  }

  handleKeyPress() {
    arr.push(new Bullet(this.x,this.y,bulletImage));
  }
}

// ------------------------------------------------------------------------- //

// Extra for Experts 
//  - you can instantiate a bullet (or a bullet array) within the Ship class,
//    and call the display and update functions in the logical location of the 
//    Ship class. If you create an array of bullets, you might want to think about
//    when the bullets should be removed from the array...

class Bullet {
  constructor(dx, dy, theImage) {
    // define the variables needed for the bullet here
    this.dx = dx;//HEH
    this.dy = dy;
    this.theImage = theImage;

  }
  update() {
    this.dy -= 10;
    // what does the bullet need to do during each frame? how do we know if it is off screen?
  }

  display() {
    image(this.theImage,this.dx,this.dy);
    // show the bullet
  }

  isOnScreen() {
    if(this.dy < 0){
      arr.splice(0,1);
    }
  }
}

