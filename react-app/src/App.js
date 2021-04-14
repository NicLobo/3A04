import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Topbar, Home, MiniGame, Options, Endgame } from "./components/pages";
import { gameSubject, initGame } from './Game'

function App() {

  const [health, setHealth] = useState()
  const [gamesCompleted, setGamesCompleted] = useState()
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [score, setScore] = useState()

    useEffect(() => {
    initGame()
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
            <MiniGame health={health} gamesCompleted={gamesCompleted} gameOver={isGameOver} score={score} />
          } />
          <Route path="/options" exact component={() => 
            <Options/>
          } />
        </Switch>
      </Router>)}

      { isGameOver && (   
      <Endgame result={result} health={health} gamesCompleted={gamesCompleted} score={score} />
      )}
    </div>
  );
}

export default App;
