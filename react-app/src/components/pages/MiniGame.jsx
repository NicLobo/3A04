import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import ls from 'local-storage'
import Timer from "../pages/Timer"

import SideScroll from '../games/SideScroll'
import Trivia from '../games/Trivia'
import Matching from '../games/Matching'
import Fixship from '../games/Fixship'
import MazeGame from '../games/MazeGame'

import healthImg1 from '../../assets/health1.png'
import healthImg2 from '../../assets/health2.png'
import healthImg3 from '../../assets/health3.png'

function MiniGame( { health, gamesCompleted, gameOver, active }) {
  
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
        <h4><Timer active={!active} gameOver={gameOver} difficulty={difficulty} /></h4>
          <h4>Health Remaining:
            {health===3 && <img src={healthImg3} height={62} width={175}></img>}
            {health===2 && <img src={healthImg2} height={62} width={120}></img>}
            {health===1 && <img src={healthImg1} height={62} width={65}></img>}
          </h4>
        <h4>Games Completed: {gamesCompleted}</h4>
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
        {currentGame === 'sidescroll' && <SideScroll back={back} difficulty={difficulty} character={character} health={health} />  }
        {currentGame === 'trivia' && <Trivia back={back} difficulty={difficulty} character={character} health={health} />  }
        {currentGame === 'matching' && <Matching back={back} difficulty={difficulty} character={character} health={health} />  }
        {currentGame === 'fixship' && <Fixship back={back} difficulty={difficulty} character={character} health={health} />  }
        {currentGame === 'maze' && <MazeGame back={back} difficulty={difficulty} character={character} health={health} />  }
      </div>
    </div>
  );
}

export default withRouter(MiniGame);
