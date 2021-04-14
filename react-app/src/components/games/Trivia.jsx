import React from "react";
import Sketch from 'react-p5'

import QA from "./trivia-classes/QA";
import Healthbar from "./trivia-classes/Healthbar";
import Timebar from "./trivia-classes/Timebar";
import Button from "./trivia-classes/Button"
import { decreaseHealth, incrementCompletedGames, increaseScore } from '../../Game'

function Trivia({back, difficulty, character }) {
  const UNIT = 10; 
  let width = 1000;
  let height = 700;
  let endgame = "playing";
  let questions
  let health
  let time
  let qAnswered = 0;
  let buttonA;
  let buttonB;
  let buttonC; 
  let buttonD;
  let i = 0;
  let flag = 1;
  let score = 0; 
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
    questions = new QA(difficulty, p);

    buttonA = new Button(p, width/1.5, height/2, UNIT*10, UNIT*10, 'rgb(0,255,0)',"A");
    buttonB = new Button(p, width/1.5 + 150, height/2, UNIT*10, UNIT*10, 'rgb(255,0,0)',"B");
    buttonC = new Button(p, width/1.5, height/2 +150, UNIT*10, UNIT*10, 'rgb(0,0,255)',"C");
    buttonD = new Button(p, width/1.5 + 150, height/2 +150, UNIT*10, UNIT*10,'rgb(0,255,255)',"D");

    health = new Healthbar(3, UNIT, UNIT*0, UNIT*5, p, difficulty);
    time = new Timebar(UNIT*90, UNIT, UNIT*0, UNIT*6, p);
  }


  let draw = (p) => {
    
    p.clear();
    p.fill(0);
    p.textSize(30);
    p.text('Answer the security questions ' + character + "!", UNIT*0, UNIT*3);
    time.display();
    health.display();
    questions.display(width,height);
    buttonA.display();
    buttonB.display();
    buttonC.display();
    buttonD.display();

    if(endgame === "playing"){
        time.tickTime();
        if(time.isTimeout()) {
          health.takeDamge();
          questions.newQuestion();
          time.reset();
        }
      
    else if(health.isDead()){
        endgame = "lost"
      }
    else if(questions.noQuestions()){
        endgame = "won"
      }
    }

    if(endgame === "won"){
      //WIN STATE
      p.textSize(100);
      i = i+1;
      if (i % 50 === 0) flag *=-1
      if(flag === 1) p.fill(0,255,0);
      if(flag === -1)p.fill(255,255,255);  
      score = qAnswered * 100
      p.text("ACCESS GRANTED!", UNIT*10, UNIT*30);
      if(i === 400){
        incrementCompletedGames();
        increaseScore(score);
      }
    }

    if(endgame === "lost"){
      //LOSE STATE
      p.textSize(100);
      i = i+1;
      if (i % 50 === 0)flag *=-1
      if(flag === 1) p.fill(255,0,0);
      if(flag === -1)p.fill(255,255,255); 
      p.text("ACCESS DENIED!", UNIT*10, UNIT*30);
      if(i === 400){
        decreaseHealth();
     }
    }
    p.redraw();
  }
  
  function mousePressed(p) {
   if(endgame === "playing")
    if(buttonA.isHit(p.mouseX, p.mouseY)){
      if(!questions.checkAnswer("A")) health.takeDamge();
      else qAnswered+=1;
      questions.newQuestion();
      time.reset();
    }
    else if(buttonB.isHit(p.mouseX, p.mouseY)){
      if(!questions.checkAnswer("B")) health.takeDamge();
      else qAnswered+=1;
      questions.newQuestion();
      time.reset();
    }
    else if(buttonC.isHit(p.mouseX, p.mouseY)){
      if(!questions.checkAnswer("C")) health.takeDamge();
      else qAnswered+=1;
      questions.newQuestion();
      time.reset();
    }
    else if(buttonD.isHit(p.mouseX, p.mouseY)){
      if(!questions.checkAnswer("D")) health.takeDamge();
      else qAnswered+=1;
      questions.newQuestion();
      time.reset();
    }
  }



  return (
    <div className="text-center">
        <h3>Trivia</h3>
        <button className="btn btn-success" onClick={back}>Return to main hub</button>
        <div className="game mt-2">
          <Sketch setup={setup} draw={draw} mousePressed={mousePressed}/>
        </div>
    </div>
  );


}
export default Trivia;