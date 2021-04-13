import React from "react";
import Sketch from 'react-p5'
// Based off of Side Scroller by Jon Froehlich
// https://editor.p5js.org/jonfroehlich/sketches/JwvvVJlNi

import Ground from "./side-scroll-classes/ground.js";
import Avatar from "./side-scroll-classes/avatar.js";
import Barrier from "./side-scroll-classes/barrier.js";
import { decreaseHealth, incrementCompletedGames } from '../../Game'

function SideScroll({back, difficulty, character}) {

  let ground;
  let avatar;
  let barriers;

  let speed = difficulty + 4

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
    ground = new Ground(p, width, height);
    console.log('setup');
    resetGame(p);

    // stop game loop until space bar hit to begin
    p.noLoop();
  }

  const draw = (p) => {
    p.background(220);

    if (barriers.length <= 0 || width - barriers[barriers.length - 1].x >= nextSpawnDistance) {
      barriers.push(new Barrier(p, width, ground.y, speed));
      nextSpawnDistance = p.random(minDistanceBetweenBarriers, width * 1.2);
    }

    // loop through all the barriers and update them
    for (let i = barriers.length - 1; i >= 0; i--) {
      barriers[i].update();
      barriers[i].draw();

      //if we hit the barrier, end game
      if (isInvincible !== true && barriers[i].checkIfCollision(avatar)) {
        isGameOver = true;
        p.noLoop(); // game is over, stop game loop
      }

      if (barriers[i].hasScoredYet === false && barriers[i].getRight() < avatar.x) {
        barriers[i].hasScoredYet = true;
        score++;
      }

      // remove barriers that have gone off the screen
      if (barriers[i].getRight() < 0) {
        barriers.splice(i, 1);
      }
    }

    avatar.update(ground.y);
    ground.draw();
    avatar.draw();
    drawScore(p);
  }

  const resetGame = (p) => {
    score = 0;
    isGameOver = false;

    avatar = new Avatar(p, ground.y);
    barriers = [new Barrier(p, width, ground.y, speed)];
    p.loop();
    console.log('reset');
  }

  const drawScore = (p) => {

    p.fill(0);
    p.textAlign(p.LEFT);
    p.textSize(15);
    p.text('Score:' + score, 10, 20);
    console.log('drawing score');

    if (isGameOver) {

      // win/fail state
      if (score >= 10) incrementCompletedGames();
      else decreaseHealth();
  
      // dark overlay
      p.fill(0, 0, 0, 100);
      p.rect(0, 0, width, height);

      // draw game over text
      p.textAlign(p.CENTER);
      p.textSize(35);
      p.fill(255);
      p.text('GAME OVER!', width / 2, height / 3);

      p.textSize(12);
      p.text('Nice try! Press S to play again.', width / 2, height / 2);
    } else if (hasGameBegun === false) {
      // if we're here, then the game has yet to begin for the first time

      // dark overlay
      p.fill(0, 0, 0, 100);
      p.rect(0, 0, width, height);

      // draw game over text
      p.textAlign(p.CENTER);
      p.textSize(15);
      p.fill(255);
      p.text(`Welcome to Junk Jump ${character}!`, width / 2, height / 3);
      p.text('Press SPACE to jump and S to start!', width / 2, height / 3 + 30);
    }

  }


  const keyPressed = (p, k) => {
    if (k.key === ' ' && avatar.isOnGround()) {
      avatar.jump();
    }

    // check for special states (game over or if game hasn't begun)
    if (isGameOver === true && k.key === 's') {
      resetGame(p);
    } else if (hasGameBegun === false && k.key === 's') {
      hasGameBegun = true;
      p.loop();
    }
  }

  return (
    <div className="text-center">
        <h3>Sidescroll</h3>
        <button onClick={back}>Return to main hub</button>
        <div className="game mt-2">
          <Sketch setup={setup} draw={draw} keyPressed={keyPressed} />
        </div>
    </div>
  );
}

export default SideScroll;