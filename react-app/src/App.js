import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Topbar, Home, MiniGame, Options, Endgame } from "./components/pages";
import { gameSubject, initGame } from './Game'
import './App.css'

import useSound from 'use-sound';

import amongusSong from './assets/among-us-song.mp3';



function App() {

  const [health, setHealth] = useState()
  const [gamesCompleted, setGamesCompleted] = useState()
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [score, setScore] = useState()

  // disabled button states
  const [sidescrollFinished,setSidescroll] = useState(false)
  const [mazeFinished,      setMaze] = useState(false)
  const [matchingFinished,  setMatching] = useState(false)
  const [triviaFinished,    setTrivia] = useState(false)
  const [fixshipFinished,   setFixship] = useState(false)

  const [play, { stop, isPlaying }] = useSound(amongusSong)

  const setDisabled = (game) => {
    if (game === 'sidescroll')    setSidescroll(true)
    else if (game === 'maze')     setMaze(true)
    else if (game === 'trivia')   setTrivia(true)
    else if (game === 'matching') setMatching(true)
    else                          setFixship(true)
  }

  useEffect(() => {
    initGame();
    // subscribe to gameSubject observable
    const subscribe = gameSubject.subscribe((game) => {
      setHealth(game.health)
      setGamesCompleted(game.gamesCompleted)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
      setScore(game.score)
    })
    // unsubscribe to observable
    return () => subscribe.unsubscribe()
  }, [])

  return (
    <div className="App">{ !isGameOver &&
      (<Router>
        <Topbar />
        <Switch>
          <Route path="/" exact component={() => 
            <Home health={health} gamesCompleted={gamesCompleted} gameOver={isGameOver} score={score} />
          } />
          <Route path="/minigame" exact component={() => 
            <MiniGame 
              health={health} 
              gamesCompleted={gamesCompleted} 
              gameOver={isGameOver} 
              score={score} 
              sidescrollFinished={sidescrollFinished}
              mazeFinished={mazeFinished}
              matchingFinished={matchingFinished}
              triviaFinished={triviaFinished}
              fixshipFinished={fixshipFinished}
              setDisabled={setDisabled}
            />
          } />
          <Route path="/options" exact component={() => 
            <Options play={play} stop={stop} isPlaying={isPlaying} />
          } />
        </Switch>
      </Router>)}

      { isGameOver && ( 
        <Router>
          <Topbar />  
          <Endgame result={result} score={score} health={health} />
        </Router>
      )}
    </div>
  );
}

export default App;
