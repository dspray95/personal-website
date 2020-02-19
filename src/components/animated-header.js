import React from "react";
import Animation from "./anim-connections";

class AnimatedHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { hideBottom: false, hideTop: false };

  animateContent = () => {
    const { isHide } = this.state;

    // window.scrollY < this.prev
    //   ? !isHide && this.setState({ isHide: true })
    //   : isHide && this.setState({ isHide: false });
    console.log(this.containerRef.clientHeight);
    console.log(window.scrollY);
    if (window.scrollY > this.containerRef.clientHeight / 10) {
      this.setState({ hideBottom: true });
    }
    if (window.scrollY > this.containerRef.clientHeight / 6) {
      this.setState({ hideTop: true });
    }

    if (window.scrollY < this.containerRef.clientHeight / 6) {
      this.setState({ hideTop: false });
    }
    if (window.scrollY < this.containerRef.clientHeight / 10) {
      this.setState({ hideBottom: false });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.animateContent);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.animateContent);
  }

  getAnimation(direction, trigger) {}

  render() {
    let hideBottom = this.state.hideBottom ? "animated-out-text-left" : " ";
    let hideTop = this.state.hideTop ? "animate-out-text-right" : " ";

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
            <p className={"banner-mono animated-title-text " + hideTop}>
              Hello, my name is
            </p>
            <h1 className={"banner-name animated-title-text " + hideTop}>
              David.
            </h1>
            <h2 className={"text-primray animated-title-text " + hideBottom}>
              I write code.
            </h2>
          </div>
        </div>
      </div>
    );
  }
}

export default AnimatedHeader;
