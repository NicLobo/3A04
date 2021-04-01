import React from "react";

function Matching({back, difficulty, character}) {
  return (
    <div className="text-center">
        <h3>Matching</h3>
        <button onClick={back}>Back to game menu</button>
        <div className="row mt-2 justify-content-center">
            <div className="game-window">
                <p>This will be the game</p>
                <p>Difficulty set to {difficulty}</p>
                <p>Character name is {character}</p>
            </div>
        </div>
    </div>
  );
}

export default Matching;
