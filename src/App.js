import React, { Component } from "react";
import "./App.css";
import Game from "./components/GamePage/game_page";


class App extends Component {
  render(){
    return (
      <div className="container">
        <Game />
      </div>
    )
  }
}

export default App;