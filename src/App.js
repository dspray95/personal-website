import React from "react";
import Animation from "./anim-connections";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="row">
        <div className="canvas-holder">
          <Animation />
        </div>
        <div
          className="row justify-content-center"
          style={{ height: "80vh", width: "100%" }}
        >
          <div className="col-3 align-self-center text-left text-white">
            <p className="banner-mono">Hello, my name is</p>
            <h1 className="banner-name">David.</h1>
            <h2 className="banner-subtitle">I write code.</h2>
          </div>
        </div>
        <div className="row justify-content-center" style={{ width: "100%" }}>
          <div className="col-3 text-white banner-nav-container">
            ABOUT&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;WORK&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;CONTACT
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
