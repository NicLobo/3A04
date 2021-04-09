import React from "react";
import Sketch from 'react-p5'

import Hole from "./fix-ship-classes/Hole";
import Healthbar from "./fix-ship-classes/Healthbar"
import Timebar from "./fix-ship-classes/Timebar"
function Fixship({back, difficulty, character}) {
  const UNIT = 10; 
  let score = 0; 
  let highscore = 0; 
  let width = 1000;
  let height = 700;
  let hole 
  let time
  let health
  let endgame = "playing";


  const setup = (p, canvasParentRef) => {

    //background
    p.createCanvas(width, height).parent(canvasParentRef);
    p.textFont('Space Mono'); 
    p.smooth(); 

    //font
    p.fill(0);
    p.textSize(30);
    p.textFont('Space Mono');

    //objects
    hole = new Hole(difficulty, p, width, height);
    health = new Healthbar(6 - difficulty, UNIT, UNIT*5, UNIT*5, p, difficulty);
    time = new Timebar(UNIT*90, UNIT, UNIT*5, UNIT*6, p);
  }


  let draw = (p) => {

    if(endgame === "playing"){
      p.clear();
      p.fill(0);
      p.text('Fix the ship ' + character + "!", UNIT*5, UNIT*3);
      p.text('SCORE:',UNIT*5, UNIT*10);
      p.text(score, UNIT*18, UNIT*10);
      p.text('HIGHSCORE:',UNIT*5, UNIT*13.5);
      p.text(highscore, UNIT*25, UNIT*13.5);
      hole.display();
      time.display();
      health.display();
      hole.increaseSize();
      if(hole.isExploded()){
        health.takeDamge();
        hole.resetPosition();
        if(health.isDead()){
          fullReset();
          endgame = "lost"
        }
      } 
      time.tickTime();
      if(time.isTimeout()) {
        fullReset();
        endgame = "won"
      }
    }

    else if(endgame === "won"){
      p.fill(0);
      p.rect(0,0,1000,700);
      p.textSize(100);
      p.fill(255);
      p.text("YOU WON", UNIT*30, UNIT*30);
    }

    else if(endgame === "lost"){
      p.fill(0);
      p.rect(0,0,1000,700);
      p.textSize(100);
      p.fill(255);
      p.text("YOU LOST", UNIT*30, UNIT*30);
    }
    p.redraw();
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