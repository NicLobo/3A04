import React from "react";
import Sketch from 'react-p5'

import Ground from "./side-scroll-classes/ground.js";
import Avatar from "./side-scroll-classes/avatar.js";
import Barrier from "./side-scroll-classes/barrier.js";

function SideScroll({back, difficulty, character}) {

  let ground;
  let avatar;
  let barriers;

  let isGameOver = false;
  let hasGameBegun = false; 
  let score = 0;

  let minDistanceBetweenBarriers = 100;
  let nextSpawnDistance;
  let isInvincible = false;

  let width = 600;
  let height = 400;

  const setup = (p, canvasParentRef) => {
    p.createCanvas(width, height).parent(canvasParentRef);
    p.textFont('Space Mono'); 
    ground = new Ground(p,width,height);
    
    resetGame(p);
    
    // stop game loop until space bar hit to begin
    p.noLoop(); 
  }
  
  function resetGame(p){
    score = 0;
    isGameOver = false; 
    
    avatar = new Avatar(p, ground.y);
    barriers = [new Barrier(p, width, ground.y)];
    p.loop();
  }
  
  let draw = (p) => {
    p.background(220);
    
    if(barriers.length <= 0 || width - barriers[barriers.length - 1].x >= nextSpawnDistance){
      barriers.push(new Barrier(p, width, ground.y)); 
      nextSpawnDistance = p.random(minDistanceBetweenBarriers, width * 1.2);
    }
    
    // loop through all the barriers and update them
    for(let i = barriers.length - 1; i >= 0; i--){
      barriers[i].update();
      barriers[i].draw();
      
      //if we hit the barrier, end game
      if(isInvincible !== true && barriers[i].checkIfCollision(avatar)){
        isGameOver = true;
        p.noLoop(); // game is over, stop game loop
      }
      
      if(barriers[i].hasScoredYet === false && barriers[i].getRight() < avatar.x){
        barriers[i].hasScoredYet = true;
        score++;
      }
      
      // remove barriers that have gone off the screen
      if(barriers[i].getRight() < 0){
        barriers.splice(i, 1); 
      }
    }
    
    avatar.update(ground.y);  
    ground.draw();
    avatar.draw();
    drawScore(p);
  }
  
  function drawScore(p) {
  
    p.fill(0);
    p.textAlign(p.LEFT);
    p.textSize(15);
    p.text('Score:' + score, 10, 20);
  
    if (isGameOver) {
  
      // dark overlay
      p.fill(0, 0, 0, 100);
      p.rect(0, 0, width, height);
  
      // draw game over text
      p.textAlign(p.CENTER);
      p.textSize(35);
      p.fill(255);
      p.text('GAME OVER!', width / 2, height / 3);
      
      p.textSize(12);
      p.text('Press SPACE BAR to play again.', width / 2, height / 2);
    }else if(hasGameBegun === false){
      // if we're here, then the game has yet to begin for the first time
      
      // dark overlay
      p.fill(0, 0, 0, 100);
      p.rect(0, 0, width, height);
  
      // draw game over text
      p.textAlign(p.CENTER);
      p.textSize(15);
      p.fill(255);
      p.text('Press SPACE BAR to play!', width / 2, height / 3);
    }
   
  }
  
  
  function keyPressed(p, k){
    if (k.key === ' ' && avatar.isOnGround()){ // spacebar 
      avatar.jump();
    }
    
    // check for special states (game over or if game hasn't begun)
    if (isGameOver === true && k.key === ' ') {
      resetGame(p);
    }else if(hasGameBegun === false && k.key === ' '){
      hasGameBegun = true;
      p.loop();
    }
  }

  return (
    <div className="text-center">
        <h3>Sidescroll</h3>
        <button onClick={back}>Back to game menu</button>
        <div className="game mt-2">
          <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />
        </div>
    </div>
  );
}

export default SideScroll;
