import React from "react";
import AnimatedHeader from "./components/animated-header";
import NavBar from "./components/navbar";
import "./App.css";
import ScrollManager from "./components/scroll-manager";

function App() {
  return (
    <div className="App">
      <AnimatedHeader />
      <NavBar />
      {/* <ScrollManager /> */}
      <div style={{ width: "100vw", height: "100vh" }}></div>
    </div>
  );
}

export default App;
