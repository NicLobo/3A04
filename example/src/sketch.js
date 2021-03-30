const UNIT = 10; 
let score = 0; 
let highscore = 0; 
function setup() {

  //background
  createCanvas(windowWidth, windowHeight);
  background(255);
  smooth(); 


  //font
  fill(0);
  textSize(30);
  textFont('Georgia');

  //objects
  hole = new Hole();
  health = new Healthbar(UNIT*100, UNIT*3, UNIT*5, UNIT*5);
  time = new Timebar(UNIT*100, UNIT*3, UNIT*5, UNIT*10);

}

function draw() { 
  clear();
  fill(0);
  text('FIX THE SHIP!', windowWidth/2, UNIT*3);
  text('SCORE:',UNIT*5, UNIT*18);
  text(score, UNIT*18, UNIT*18);
  text('HIGHSCORE:',UNIT*5, UNIT*22);
  text(highscore, UNIT*25, UNIT*22);

  hole.display();
  time.display();
  health.display();

  hole.increaseSize();
  if(hole.isExploded()){
    health.takeDamge();
    hole.resetPosition();
    if(health.isDead()){fullReset();}
  } 


  
  time.tickTime();
  if(time.isTimeout()) fullReset();
}

function mousePressed() {
  print(hole.isHit(mouseX,mouseY));
  if(hole.isHit(mouseX,mouseY)){
    hole.resetPosition();
    score+=10;
  if(score == 50){
      hole.increaseSpeed();
    }
  }
}

function fullReset(){
  if(score > highscore){
    highscore = score;
  }
  score = 0;
  hole.reset();
  time.reset();
  health.reset()

}

class Hole{
  constructor(delay) {
    this.x = random(width);
    this.y = random(height);
    this.diameter = 10;
    this.delay = delay;
    this.speed = 1;
  }

  increaseSize() {
    this.diameter+=this.speed;
    if(this.isHit()) this.resetPosition();
  }

  increaseSpeed(){
    this.speed +=1; 
  }

  isHit(mx, my){
    let delta = this.diameter/2;
    return mx > this.x - delta && mx < this.x + delta && my < this.y + delta && my > this.y - delta; 
  }

  isExploded(){
    return this.diameter >= 100;
  }

  resetPosition(){
    this.x = random(width);
    this.y = random(height);
    this.diameter = 10; 
  }

  reset(){
    this.resetPosition();
    this.speed = 1;
  }

  display(){
    fill("black");
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}

class Healthbar{
  constructor(health, height, x, y) {
    this.health = health;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  takeDamge() {
    this.health -=100;
  } 

  isDead(){
    return this.health == 0;
  }

  reset(){
    this.health = 1000;
  }

  display(){
    fill("red");
    rect(this.x, this.y, this.health, this.height);
  }
}

class Timebar{
  constructor(time,height, x, y) {
    this.time = time;
    this.height = height;
    this.x = x;
    this.y = y;
  }

  tickTime() {
    this.time -=1;
  }

  isTimeout(){
    return this.time == 0; 
  }

  reset(){
    this.time = 1000;
  }
  display() {
    fill("blue");
    rect(this.x, this.y, this.time, this.height);
  }
}