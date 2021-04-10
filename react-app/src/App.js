import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Topbar, Home, MiniGame, Options, Endgame } from "./components/pages";

function App() {

  return (
    <div className="App">
      <Router>
        <Topbar />
        <Switch>
          <Route path="/" exact component={() => 
            <Home />
          } />
          <Route path="/minigame" exact component={() => 
            <MiniGame />
          } />
          <Route path="/options" exact component={() => 
            <Options/>
          } />
          <Route path="/endgame" exact component={() => 
            <Endgame/>
          } />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
