import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import ls from 'local-storage'

import SideScroll from '../games/SideScroll'
import Trivia from '../games/Trivia'
import Matching from '../games/Matching'
import Fixship from '../games/Fixship'
import MazeGame from '../games/MazeGame'

import healthImg1 from '../../assets/health1.png'
import healthImg2 from '../../assets/health2.png'
import healthImg3 from '../../assets/health3.png'

function MiniGame( { health, gamesCompleted, gameOver, score }) {
  
  const [difficulty, setDiff] = useState(1);
  const [character, setCharacter] = useState('Default Name');
  
  const [currentGame, setGame] = useState('')

  // disabled button states
  const [sidescrollFinished,setSidescroll] = useState(false)
  const [mazeFinished,      setMaze] = useState(false)
  const [matchingFinished,  setMatching] = useState(false)
  const [triviaFinished,    setTrivia] = useState(false)
  const [fixshipFinished,   setFixship] = useState(false)

  useEffect(() => {
    if (ls.get('difficulty')) {
      setDiff(ls.get('difficulty'))
    }
    if (ls.get('character')) {
      setCharacter(ls.get('character'))
    }
  },[difficulty, character])


  const openGame = (e) => {
    setGame(e.target.name)
  }
  
  return (
    <div className="mini-game">
      <div className="container">
        <h1 className="font-weight-light">Main Hub</h1>
        <Link className="" to="/" >
          Back
        </Link>
          <h4>Health Remaining:
            {health === 3 && <img src={healthImg3} alt="" height={62} width={175}></img>}
            {health === 2 && <img src={healthImg2} alt="" height={62} width={120}></img>}
            {health === 1 && <img src={healthImg1} alt="" height={62} width={65}></img>}
          </h4>
        <h4>Complete {5 - gamesCompleted} More Games!</h4>
        <h4>Score: {score}</h4>
        { currentGame === '' &&
          <div className="game-col" >
            <div className="game-button">
              <p>Space Walk</p>
              <button className="btn btn-primary" className="btn btn-primary" name="sidescroll" onClick={openGame} disabled={sidescrollFinished}>Dodge the Junk</button>
            </div>
            <div className="game-button">
              <p>Security Room</p>
              <button className="btn btn-primary" name="trivia" onClick={openGame} disabled={triviaFinished}>Reset Password</button>
            </div>
            <div className="game-button">
              <p>Command Center</p>
              <button className="btn btn-primary" name="matching" onClick={openGame} disabled={matchingFinished}>Map Stars</button>
            </div>
            <div className="game-button">
              <p>Docking Bay</p>
              <button className="btn btn-primary" name="fixship" onClick={openGame} disabled={fixshipFinished}>Repair Engine</button>
            </div>
            <div className="game-button">
              <p>Fuel Pit</p>
              <button className="btn btn-primary" name="maze" onClick={openGame} disabled={mazeFinished}>Switch Fuel Core</button>
            </div>
          </div>
        }
        {currentGame === 'sidescroll' && <SideScroll setGame={setGame} setFinished={setSidescroll} difficulty={difficulty} character={character} health={health} />  }
        {currentGame === 'trivia' && <Trivia setGame={setGame} setFinished={setTrivia} difficulty={difficulty} character={character} health={health} />  }
        {currentGame === 'matching' && <Matching setGame={setGame} setFinished={setMatching} difficulty={difficulty} character={character} health={health} />  }
        {currentGame === 'fixship' && <Fixship setGame={setGame} setFinished={setFixship} difficulty={difficulty} character={character} health={health} />  }
        {currentGame === 'maze' && <MazeGame setGame={setGame} setFinished={setMaze} difficulty={difficulty} character={character} health={health} />  }
      </div>
    </div>
  );
}

export default withRouter(MiniGame);
