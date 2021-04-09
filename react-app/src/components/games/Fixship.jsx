import React from "react";
import Sketch from 'react-p5'

import Hole from "./fix-ship-classes/Hole";
import Healthbar from "./fix-ship-classes/Healthbar"
import Timebar from "./fix-ship-classes/Timebar"
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
    p.textFont('Space Mono');

    //objects
    hole = new Hole(difficulty, p, width, height);
    health = new Healthbar(UNIT*100, UNIT*3, UNIT*5, UNIT*5, p);
    time = new Timebar(UNIT*100, UNIT*3, UNIT*5, UNIT*10, p);
  }


  let draw = (p) => {
    p.clear();
    p.fill(0);
    p.text('FIX THE SHIP! ' + character, width/2, UNIT*3);
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