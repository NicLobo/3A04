import React from "react";
import Sketch from 'react-p5'

// import loadP5 from '../util/loadP5'

function SideScroll({back, difficulty, character}) {

  let ball_x = 300;
  let ball_y = 150;
  let speed = 3;
  let setup = (p, canvasParentRef) => {
    p.createCanvas(500, 300).parent(canvasParentRef);
  };
  let draw = (p) => {
    p.stroke(255);
    p.strokeWeight(4);
    p.fill(0);
    p.ellipse(ball_x, ball_y, 100, 100);
    
    if (ball_x > p.width - 50) {
      speed = -3;
    }
    if (ball_x < 50) {
      speed = 3;
    }
    
    ball_x = ball_x + speed;

    drawText(p)
  };

  const drawText = (p) => {
    p.fill(255,0,0)
    p.textAlign(p.LEFT);
    p.textSize(15);
    p.text('Difficulty: ' + difficulty, 10, 20);
    p.text('Character: ' + character, 10, 40);
  } 
 
  return (
    <div className="text-center">
        <h3>Sidescroll</h3>
        <button onClick={back}>Back to game menu</button>
        <div className="game mt-2">
          <Sketch setup={setup} draw={draw} />
        </div>
    </div>
  );
}

export default SideScroll;
