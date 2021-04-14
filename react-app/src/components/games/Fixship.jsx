import React from "react";
import Sketch from 'react-p5'
import { decreaseHealth, incrementCompletedGames, increaseScore } from '../../Game'
import Hole from "./fix-ship-classes/Hole";
import Healthbar from "./fix-ship-classes/Healthbar"
import Timebar from "./fix-ship-classes/Timebar"
function Fixship({back, difficulty, character}) {
  const UNIT = 10; 
  let score = 0; 
  let width = 1000;
  let height = 700;
  let hole 
  let holehit = 0; 
  let time
  let health
  let endgame = "playing";
  let i = 0;
  let flag = 1;

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
    health = new Healthbar(5 - difficulty, UNIT, UNIT*5, UNIT*5, p, difficulty);
    time = new Timebar(UNIT*90, UNIT, UNIT*5, UNIT*6, p);
  }

  let draw = (p) => {
    p.clear();
    p.fill(0);
    p.textSize(30);
    p.text('Fix the ship ' + character + "!", UNIT*5, UNIT*3);

    time.display();
    health.display();
    if(endgame === "playing"){
      hole.display();
      hole.increaseSize();
      if(hole.isExploded()){
        health.takeDamge();
        hole.resetPosition();
        if(health.isDead()){
          endgame = "lost"
        }
      } 
      time.tickTime();
      if(time.isTimeout()) {

        endgame = "won"
      }
    }

    else if(endgame === "won"){
      p.textSize(100);
      i = i+1;
      if (i % 50 === 0) flag *=-1
      if(flag === 1) p.fill(0,255,0);
      if(flag === -1)p.fill(255,255,255);  

      p.text("ENGINE FIXED!", UNIT*10, UNIT*30);

      score += health.getHealth() + holehit;
      if(i === 400){
        incrementCompletedGames();
        increaseScore(score/10);
      }
    }

    else if(endgame === "lost"){
      p.textSize(100);
      i = i+1;
      if (i % 50 === 0)flag *=-1
      if(flag === 1) p.fill(255,0,0);
      if(flag === -1)p.fill(255,255,255); 
    
      p.text("ENGINE BROKEN!", UNIT*10, UNIT*30);
      if(i === 400){
      decreaseHealth();
      }
    }
    p.redraw();
  }

  function mousePressed(p) {
   if(hole.isHit(p.mouseX,p.mouseY)){
     holehit+=1;
      hole.resetPosition();
      score+=10;
    if(score === 50){
      hole.increaseSpeed();
      }
    }
  }

  return (
    <div className="text-center">
        <h3>Sidescroll</h3>
        <button className="btn btn-warning" onClick={back}>Return to main hub</button>
        <div className="game mt-2">
          <Sketch setup={setup} draw={draw} mousePressed={mousePressed}/>
        </div>
    </div>
  );


}
export default Fixship;
