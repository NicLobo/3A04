import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import ls from 'local-storage'

import spaceship from '../../assets/spaceship.jpg'

function Home( { health, gamesCompleted, isGameOver, score } ) {
  
  const [difficulty, setDiff] = useState(1);
  const [character, setCharacter] = useState('Default Name');

  useEffect(() => {
    if (ls.get('difficulty')) {
      setDiff(ls.get('difficulty'))
    }
    if (ls.get('character')) {
      setCharacter(ls.get('character'))
    }
  },[difficulty, character])

  return (
    <div className="main home">
      <div className="container">
        <h1 className="font-weight-light">Home</h1>
        <h2>Welcome to Shipwreck!</h2>
        <h4>Difficulty: {difficulty}</h4>
        <h4>Character: {character}</h4>
        <div className="button-container">
          <div className="big-button">
            <Link className="navbar-brand" to="/minigame" >
              Main Hub
            </Link>
          </div>
          <div className="big-button">
            <Link className="navbar-brand" to="/options" >
              Options
            </Link>
          </div>
        </div>
        <div className="img-container"><img src={spaceship} alt="spaceship exploding"/></div>
      </div>
    </div>
  );
}

export default withRouter(Home);
