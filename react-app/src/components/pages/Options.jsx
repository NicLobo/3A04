import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import ls from 'local-storage'

function Options() {
  const [difficulty, setDiff] = useState(1);
  const [character, setCharacter] = useState('');

  useEffect(() => {
    if (ls.get('difficulty')) {
      setDiff(ls.get('difficulty'))
    }
    if (ls.get('character')) {
      setCharacter(ls.get('character'))
    }
  },[difficulty, character])

  const updateDifficulty = (e) => {
    let newDifficulty = parseInt(e.target.value)
    setDiff(newDifficulty)
    ls.set('difficulty',newDifficulty)
  }

  const updateCharacter = (e) => {
    let newCharacter = e.target.value
    setCharacter(newCharacter)
    ls.set('character',newCharacter)
  }

  return (
    <div className="options">
      <div className="container">
        <h1 className="font-weight-light">Options</h1>
        <Link className="" to="/" >
          Back
        </Link>
        <div className="text-center">
          <p>Difficulty: {difficulty}</p>
          <input
            type="range"
            min="1"
            max="3"
            step="1"
            value={difficulty}
            onChange={updateDifficulty}
          />
          <p>Character: {character}</p>
          <input
            type="text"
            placeholder="Insert name here"
            value={character}
            onChange={updateCharacter}
          />
        </div>
      </div>
    </div>
  );
}

export default withRouter(Options);
