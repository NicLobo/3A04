import React from "react";
import Sketch from 'react-p5'

function Fixship({back, difficulty, character}) {
  const UNIT = 10; 
  let score = 0; 
  let highscore = 0; 
  let width = 600;
  let height = 400;
  let hole 
  let time
  let health
  const setup = (p, canvasParentRef) => {

    //background
    p.createCanvas(width, height).parent(canvasParentRef);
    p.textFont('Space Mono'); 
    p.background(255);
    p.smooth(); 


    //font
    p.fill(0);
    p.textSize(30);
    p.textFont('Georgia');

    //objects
    hole = new Hole(difficulty, p);
    health = new Healthbar(UNIT*100, UNIT*3, UNIT*5, UNIT*5, p);
    time = new Timebar(UNIT*100, UNIT*3, UNIT*5, UNIT*10, p);
  }


  let draw = (p) => {
    p.clear();
    p.fill(0);
    p.text('FIX THE SHIP!', width/2, UNIT*3);
    p.text('SCORE:',UNIT*5, UNIT*18);
    p.text(score, UNIT*18, UNIT*18);
    p.text('HIGHSCORE:',UNIT*5, UNIT*22);
    p.text(highscore, UNIT*25, UNIT*22);

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

  function mousePressed(p) {
    if(hole.isHit(p.mouseX,p.mouseY)){
      hole.resetPosition();
      score+=10;
    if(score === 50){
      hole.increaseSpeed();
      }
    }
  }



  function fullReset(p){
    if(score > highscore){
      highscore = score;
    }
    score = 0;
    hole.reset();
    time.reset();
    health.reset()

  }

  class Hole{
    constructor(delay, p) {
      this.p5 = p
      this.x = p.random(width);
      this.y = p.random(height);
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
      this.x = this.p5.random(0,width);
      this.y = this.p5.random(0,height);
      this.diameter = 10; 
    }

    reset(){
      this.resetPosition();
      this.speed = 1;
    }

    display(){
      this.p5.fill("black");
      this.p5.ellipse(this.x, this.y, this.diameter, this.diameter);
    }
  }

  class Healthbar{
    constructor(health, height, x, y, p) {
      this.health = health;
      this.height = height;
      this.x = x;
      this.y = y;
      this.p5 = p
    }

    takeDamge() {
      this.health -=100;
    } 

    isDead(){
      return this.health === 0;
    }

    reset(){
      this.health = 1000;
    }

    display(){
      this.p5.fill("red");
      this.p5.rect(this.x, this.y, this.health, this.height);
    }
  }

  class Timebar{
    constructor(time,height, x, y, p) {
      this.time = time;
      this.height = height;
      this.x = x;
      this.y = y;
      this.p5 = p
    }

    tickTime() {
      this.time -=1;
    }

    isTimeout(){
      return this.time === 0; 
    }

    reset(){
      this.time = 1000;
    }
    display() {
      this.p5.fill("blue");
      this.p5.rect(this.x, this.y, this.time, this.height);
    }
  }

  return (
    <div className="text-center">
        <h3>Sidescroll</h3>
        <button onClick={back}>Back to game menu</button>
        <div className="game mt-2">
          <Sketch setup={setup} draw={draw} mousePressed={mousePressed}/>
        </div>
    </div>
  );


}
export default Fixship;