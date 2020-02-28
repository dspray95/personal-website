import React from "react";
import Animation from "./anim-connections";

class AnimatedHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { bottomState: "", topState: "" };

  animateContent = () => {
    if (
      this.state.bottomState == "" &&
      window.scrollY >= this.props.introBottomOut
    ) {
      this.setState({ bottomState: "animate-out-left" });
    } else if (
      this.state.bottomState != "" &&
      window.scrollY < this.props.introBottomOut
    ) {
      this.setState({ bottomState: "" });
    }

    if (this.state.topState == "" && window.scrollY >= this.props.introTopOut) {
      this.setState({ topState: "animate-out-right" });
    } else if (
      this.state.topState != "" &&
      window.scrollY < this.props.introTopOut
    ) {
      this.setState({ topState: "" });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.animateContent);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.animateContent);
  }

  render() {
    return (
      <div
        className="container"
        ref={containerRef => {
          this.containerRef = containerRef;
        }}
        style={{
          width: "100%",
          height: "100vh"
        }}
      >
        <div className="canvas-holder" style={{ position: "fixed" }}>
          <Animation />
        </div>
        <div
          className="row justify-content-center"
          style={{ height: "80vh", width: "100%", position: "fixed" }}
        >
          <div
            className="col-4 offset-2 align-self-center text-left "
            style={{}}
          >
            <p
              className={
                "banner-mono animated-title-text " + this.state.topState
              }
            >
              Hello, my name is
            </p>
            <h1
              className={
                "banner-name animated-title-text " + this.state.topState
              }
            >
              David.
            </h1>
            <h2
              className={
                "text-primray animated-title-text " + this.state.bottomState
              }
            >
              I write code.
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default AnimatedHeader;
