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

function MiniGame( { 
  health, 
  gamesCompleted, 
  gameOver, 
  score,
  sidescrollFinished,
  mazeFinished,
  matchingFinished,
  triviaFinished,
  fixshipFinished,
  setDisabled
}) {
  
  const [difficulty, setDiff] = useState(1);
  const [character, setCharacter] = useState('Default Name');
  
  const [currentGame, setGame] = useState('')

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

  const back = () => {
    setGame('')
  }
  
  return (
    <div className="main">
      <div className="container">
        <h1 className="font-weight-light">Main Hub</h1>
        <Link className="" to="/" >
          Back
        </Link>
          <h4>Health Remaining:
            {health === 3 && <img src={healthImg3} alt="3 hearts" height={62} width={175}></img>}
            {health === 2 && <img src={healthImg2} alt="2 hearts" height={62} width={120}></img>}
            {health === 1 && <img src={healthImg1} alt="1 heart" height={62} width={65}></img>}
          </h4>
        <h4>Complete {5 - gamesCompleted} More Games!</h4>
        <h4>Score: {score}</h4>
        { currentGame === '' &&
          <div className="game-col" >
            <div className="game-button">
              <p>Space Walk</p>
              <button className="btn btn-primary" disabled={sidescrollFinished} name="sidescroll" onClick={openGame}>Dodge the Junk</button>
            </div>
            <div className="game-button">
              <p>Security Room</p>
              <button className="btn btn-success" disabled={triviaFinished} name="trivia" onClick={openGame}>Reset Password</button>
            </div>
            <div className="game-button">
              <p>Command Center</p>
              <button className="btn btn-danger" disabled={matchingFinished} name="matching" onClick={openGame}>Map Stars</button>
            </div>
            <div className="game-button">
              <p>Weapons Bay</p>
              <button className="btn btn-warning" disabled={fixshipFinished} name="fixship" onClick={openGame}>Destroy Meteors</button>
            </div>
            <div className="game-button">
              <p>Fuel Pit</p>
              <button className="btn btn-info" disabled={mazeFinished} name="maze" onClick={openGame}>Switch Fuel Core</button>
            </div>
          </div>
        }
        {currentGame === 'sidescroll' && <SideScroll setDisabled={setDisabled} back={back} difficulty={difficulty} character={character} health={health} />  }
        {currentGame === 'trivia' && <Trivia setDisabled={setDisabled} back={back} difficulty={difficulty} character={character} health={health} />  }
        {currentGame === 'matching' && <Matching setDisabled={setDisabled} back={back} difficulty={difficulty} character={character} health={health} />  }
        {currentGame === 'fixship' && <Fixship setDisabled={setDisabled} back={back} difficulty={difficulty} character={character} health={health} />  }
        {currentGame === 'maze' && <MazeGame setDisabled={setDisabled} back={back} difficulty={difficulty} character={character} health={health} />  }
      </div>
    </div>
  );
}

export default withRouter(MiniGame);
