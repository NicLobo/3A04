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

  useEffect(() => {
    if (ls.get('difficulty')) {
      setDiff(ls.get('difficulty'))
    }
    if (ls.get('character')) {
      setCharacter(ls.get('character'))
    }
  },[difficulty, character])

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
        { currentGame === '' &&
          <div className="game-col" >
            <div className="game-button">
              <p>Sidescrolling game</p>
              <button id="sidescroll" onClick={openGame}>Load</button>
            </div>
            <div className="game-button">
              <p>Trivia game</p>
              <button id="trivia" onClick={openGame}>Load</button>
            </div>
            <div className="game-button">
              <p>Matching game</p>
              <button id="matching" onClick={openGame}>Load</button>
            </div>
            <div className="game-button">
              <p>Fixship game</p>
              <button id="fixship" onClick={openGame}>Load</button>
            </div>
            <div className="game-button">
              <p>Maze game</p>
              <button id="maze" onClick={openGame}>Load</button>
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
