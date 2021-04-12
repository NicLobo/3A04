import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import ls from 'local-storage'

import SideScroll from '../games/SideScroll'
import Trivia from '../games/Trivia'
import Matching from '../games/Matching'
import Fixship from '../games/Fixship'
import MazeGame from '../games/MazeGame'

function MiniGame() {
  
  const [difficulty, setDiff] = useState(1);
  const [character, setCharacter] = useState('Default Name');
  const [health, setHealth] = useState(100);

  useEffect(() => {
    if (ls.get('difficulty')) {
      setDiff(ls.get('difficulty'))
    }
    if (ls.get('character')) {
      setCharacter(ls.get('character'))
    }
    if (ls.get('health')) {
      setHealth(ls.get('health'))
    }
  },[difficulty, character, health])

  const [currentGame, setGame] = useState('')

  const openGame = (e) => {
    setGame(e.target.id)
  }

  const back = () => {
    setGame('')
  }
  
  return (
    <div className="mini-game">
      <div className="container">
        <h1 className="font-weight-light">Main Hub</h1>
        <Link className="" to="/" >
          Back
        </Link>
        <h4>Health: {health}</h4>
        { currentGame === '' &&
          <div className="game-col" >
            <div className="game-button">
              <p>Archives</p>
              <button id="sidescroll" onClick={openGame}>Upload Files</button>
            </div>
            <div className="game-button">
              <p>Security Room</p>
              <button id="trivia" onClick={openGame}>Reset Password</button>
            </div>
            <div className="game-button">
              <p>Command Center</p>
              <button id="matching" onClick={openGame}>Map Stars</button>
            </div>
            <div className="game-button">
              <p>Docking Bay</p>
              <button id="fixship" onClick={openGame}>Repair Engine</button>
            </div>
            <div className="game-button">
              <p>Fuel Pit</p>
              <button id="maze" onClick={openGame}>Switch Fuel Core</button>
            </div>
          </div>
        }
        { currentGame === 'sidescroll' && <SideScroll back={back} difficulty={difficulty} character={character} />  }
        { currentGame === 'trivia' && <Trivia back={back} difficulty={difficulty} character={character} />  }
        { currentGame === 'matching' && <Matching back={back} difficulty={difficulty} character={character} />  }
        { currentGame === 'fixship' && <Fixship back={back} difficulty={difficulty} character={character} />  }
        { currentGame === 'maze' && <MazeGame back={back} difficulty={difficulty} character={character} />  }
      </div>
    </div>
  );
}

export default withRouter(MiniGame);
