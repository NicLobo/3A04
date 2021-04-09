import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Topbar, Home, MiniGame, Options } from "./components/pages";

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
