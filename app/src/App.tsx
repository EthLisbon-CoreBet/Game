import React from "react";
import Chat from "./components/Chat";
import Join from "./components/Join";
import Info from "./components/Info";
import Graph from "./components/Graph";
import Start from "./components/Start";
import Ranking from "./components/Ranking";
import logo from "./CoreBet.png"

function App() {
  return (
    <div className="App">

      <div className="container">
      <div className="row mt-5">
        <div className="row">
          <div className="col-12 col-md-4">
            <img src={logo} height="100px"></img>
          </div>
          <div className="col-12">
            <h1>CoreBet</h1>
          </div>
        </div>
        </div>

        <div className="row mt-5">
          <div className="col-12 col-md-4 position-relative">
            <Join />
            <Start />
          </div>

          <div className="col-12 col-md-8">
            <Info />
            <Graph />
          </div>
        </div>

        <div className="row mt-3">
          <Ranking />
          <Chat />
        </div>
      </div>
    </div>
  );
}

export default App;
