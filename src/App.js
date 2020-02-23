import React from "react";
import "./App.css";
import AnimatedHeader from "./components/animated-header";
import Navbar from "./components/navbar";
import ScrollManager from "./components/scroll-manager";
import About from "./components/about-content";
import Experience from "./components/experience-content";

function App() {
  return (
    <div className="App">
      <AnimatedHeader />
      <Navbar />
      <About />
      <Experience />
      <div style={{ width: "100vw", height: "1000vh" }}></div>
    </div>
  );
}

export default App;
