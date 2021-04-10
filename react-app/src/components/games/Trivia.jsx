import React from "react";
import Sketch from "react-p5";

function Trivia({back, difficulty, character}) {

  var input1, input2;
  var question1, question2;
  var answer1;
  var button;

  const setup = (p, canvasParentRef) => {
    p.background(220);
    p.createCanvas(500, 300).parent(canvasParentRef);

    var question1 = p.createP("What is the capital of USA? A. New York City B. Los Angeles. C. Washington DC D. Chicago")
    question1.position(500, 300)
    input1 = p.createInput();
    input1.position(530, 330);

    var question2 = p.createP("What is the capital of USA? A. New York City B. Los Angeles. C. Washington DC D. Chicago")
    question2.position(500, 300)
    input2 = p.createInput();
    input2.position(530, 330);

    button = p.createButton('Submit Answer');
    button.mousePressed(add);
    button.position(input1.x + input1.width, 330);
    
  };

  const draw = (p) => {
    p.fill(255, 0, 0)
    p.text('Difficulty: ' + difficulty, 10, 20);
    p.text('Character: ' + character, 10, 40);
  };

  function add(p) {
    answer1 = input1.value()
    question1.position(-100, -100)
    if (answer1 === "C" || answer1 === "c") {
      question2.position(0, 20);
      input2.position(200, 70);
      input1.position(-1000, -1000);
      input1.value('')
    } else if (answer1 === "A" || answer1 === "a") {
      question2.position(0, 20);
      input2.position(200, 70);
      input1.position(-1000, -1000);
      input1.value('')
    } else if (answer1 === "B" || answer1 === "b") {
      question2.position(0, 20);
      input2.position(200, 70);
      input1.position(-1000, -1000);
      input1.value('')
    } else if (answer1 === "D" || answer1 === "d") {
      question2.position(0, 20);
      input2.position(200, 70);
      input1.position(-1000, -1000);
      input1.value('')
    }

  };

  return (
    <div className="text-center">
        <h3>Trivia</h3>
        <button onClick={back}>Back to game menu</button>
        <div className="row mt-2 justify-content-center">
          <Sketch setup={setup} draw={draw} />
        </div>
    </div>
  );
}

export default Trivia;
