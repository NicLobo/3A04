import React from "react";
import Sketch from "react-p5";

function Matching({ back, difficulty, character }) {
  var WIDTH = 640;
  var HEIGHT = 480;
  var rowNum = 3;
  var colNum = 4;
  var sideLength = 80;
  var time = 60 / difficulty-difficulty;
  var FRAMERATE = 30;
  var flippedCards = 0;
  var selectedCards = [];
  var delay = false;
  var successNum = 0;
  var text_size = 30;
  var card;
  var shapeList;
  var cardList;
  var _timer;

  function setup(p, canvasParentRef) {
    var canvas = p.createCanvas(WIDTH, HEIGHT).parent(canvasParentRef);
    canvas.position((p.windowWidth - WIDTH) / 2, (p.windowHeight - HEIGHT) / 2);

    p.frameRate(FRAMERATE);
    card = new Card(115, 140, sideLength);
    shapeList = card.generateShapeList();
    cardList = card.generateCards();
    _timer = new timer(time);
  }

  function draw(p) {
    p.background(255);

    //draw time information
    p.textSize(text_size);
    p.fill(0);
    p.strokeWeight(0);
    if (!_timer.isTimeOut() && successNum !== 12) {
      p.text("Time Left: ", WIDTH / 6, HEIGHT / 5);
      p.text(_timer.time, WIDTH / 6 + 150, HEIGHT / 5);
      _timer.tick(p);
    } else if (!_timer.isTimeOut() && successNum === 12) {
      p.text("WIN!", WIDTH / 2 - text_size, HEIGHT / 5);
    } else {
      p.text("GAME OVER!", WIDTH / 2 - text_size * 3.1, HEIGHT / 5);
    }
    //delay if two selected cards are not the same.
    if (delay === true) {
      var start = p.millis();
      var end = start + 300;
      while (p.millis() < end) {}
      delay = false;
    }

    //draw game board
    drawCards(p, cardList);
    if (flippedCards === 2) {
      flippedCards = 0;
      var flag = selectedCards[0].shape === selectedCards[1].shape;

      if (!flag) {
        var id1 = selectedCards[0].id;
        var id2 = selectedCards[1].id;
        cardList[id1].isFlipped = false;
        cardList[id2].isFlipped = false;
        delay = true;
      } else {
        successNum += 2;
      }
      selectedCards = [];
    }
  }

  function drawCards(p, cardList) {
    for (var i = 0; i < cardList.length; i++) {
      p.fill(240, 200, 240);
      p.stroke(70);
      p.strokeWeight(4);
      p.rect(
        cardList[i].x,
        cardList[i].y,
        cardList[i].edge,
        cardList[i].edge,
        15
      );
      if (cardList[i].isFlipped) {
        var shape = "shape" + cardList[i].shape;
        funcSet[shape](
          p,
          cardList[i].x + 0.5 * cardList[i].edge,
          cardList[i].y + 0.5 * cardList[i].edge,
          cardList[i].edge * 0.8,
          cardList[i].edge * 0.8
        );
      }
    }
  }

  //The shape set
  var funcSet = {
    shape1: function (p, x, y, w, h) {
      p.fill(239, 123, 21);
      p.strokeWeight(2);
      p.arc(x, y, w, h, 0, 7 * p.QUARTER_PI, p.PIE);
    },

    shape2: function (p, x, y, w, h) {
      p.fill(244, 20, 20);
      p.strokeWeight(2);
      p.arc(x, y - h / 2, 2 * w, 2 * h, (1 / 3) * p.PI, (2 * p.PI) / 3, p.PIE);
    },

    shape3: function (p, x, y, w, h) {
      p.fill(245, 135, 52);
      p.strokeWeight(0);
      p.ellipse(x, y, w, h);
      p.fill(255);
      p.ellipse(x, y, w - 20, h - 20);
    },

    shape4: function (p, x, y, w, h) {
      p.fill(77, 187, 235);
      p.stroke(0);
      p.strokeWeight(2);
      p.triangle(x - w / 2, y + h / 3, x + w / 2, y + h / 3, x, y - h / 3);
    },

    shape5: function (p, x, y, w, h) {
      p.fill(239, 111, 31);
      p.stroke(0);
      p.strokeWeight(2);
      p.rect(x - w * 0.4, y - h * 0.25, w * 0.8, h * 0.5);
    },

    shape6: function (p, x, y, w, h) {
      p.fill(255);
      p.quad(x, y, x - (1 / 4) * w, y - (1 / 4) * h, x + (1 / 4) * w, y - (1 / 8) * h, x, y + (1 / 3) * h);
    },
  };

  function isInBox(p, Card) {
    return (
      p.mouseX >= Card.x &&
      p.mouseX <= Card.x + Card.edge &&
      p.mouseY >= Card.y &&
      p.mouseY <= Card.y + Card.edge
    );
  }

  function mousePressed(p) {
    if (!_timer.isTimeOut() && successNum !== 12) {
      for (var i = 0; i < cardList.length; i++) {
        if (isInBox(p, cardList[i])) {
          cardList[i].isFlipped = true;
          selectedCards.push(cardList[i]);
          flippedCards++;
        }
      }
    }
  }

  class Card {
    constructor(x, y, sideLength, id) {
      this.x = x;
      this.y = y;
      this.edge = sideLength;
      this.shape = undefined;
      this.isFlipped = false;
      this.id = id;
    }

    generateShapeList() {
      var choices = [1, 2, 3, 4, 5, 6];
      var count = [0, 0, 0, 0, 0, 0];
      var shapeList = [];
      var times = 3 * choices.length;
      for (var i = 0; i < times; i++) {
        var num = Math.floor(Math.random() * choices.length);
        if (count[num] === 2) {
          choices.splice(num, 1);
          count.splice(num, 1);
          continue;
        }
        if (count[num] < 2) {
          count[num]++;
          shapeList.push(choices[num]);
        }
        if (choices.length === 0) {
          return shapeList;
        }
      }
      return shapeList;
    }

    generateCards() {
      var cardList = [];
      var id = 0;
      for (var row = 0; row < rowNum; row++) {
        for (var col = 0; col < colNum; col++) {
          var temp = new Card(
            card.x + 110 * col,
            card.y + 110 * row,
            card.edge,
            id
          );
          temp.shape = shapeList[row * 4 + col];
          cardList.push(temp);
          id++;
        }
      }
      return cardList;
    }
  }

  class timer {
    constructor(time) {
      this.time = time;
    }

    isTimeOut() {
      return this.time <= 0;
    }

    tick(p) {
      if (p.frameCount % FRAMERATE === 0) {
        this.time--;
      }
    }
  }

  return (
    <div className="text-center">
      <h3>Matching</h3>
      <button onClick={back}>Back to game menu</button>
      <div className="game mt-2">
        <Sketch setup={setup} draw={draw} mousePressed={mousePressed} />
      </div>
    </div>
  );
}

export default Matching;
