import React from "react";
import Hexagon from "react-hexagon";

class Experience extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    startPeek: false,
    showFull: false,
    peekTextOut: false,
    showText: false,
    showTechnologies: false,
    startHideAbout: false,
    hideAbout: false
  };

  animateContent = () => {
    if (window.scrollY >= window.innerHeight * 3) {
      this.setState({ showFull: true });
    }
    if (window.scrollY < window.innerHeight * 3) {
      this.setState({ showFull: false });
    }

    if (window.scrollY >= window.innerHeight * 4) {
      this.setState({ startHideAbout: true });
    }
    if (window.scrollY < window.innerHeight * 4) {
      this.setState({ startHideAbout: false });
    }

    if (window.scrollY >= window.innerHeight * 4.5) {
      this.setState({ hideAbout: true });
    }
    if (window.scrollY < window.innerHeight * 4.5) {
      this.setState({ hideAbout: false });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.animateContent);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.animateContent);
  }
  render() {
    let animationLeftState = "";
    let animationRightState = "";
    let textState1 = "";
    let aboutContentState = "";
    let aboutState = "";

    if (this.state.showFull) {
      animationLeftState = "animate-in-left";
      animationRightState = "animate-in-right";
    } else if (this.state.startPeek) {
      animationLeftState = "peek-in-left";
      animationRightState = "";
    }

    if (this.state.peekTextOut && this.state.showText) {
      textState1 = "about-animate-out";
      aboutContentState = "what-i-do-stage-1";
    } else if (this.state.peekTextOut) {
      aboutContentState = "what-i-do-peek";
    }

    if (this.state.showTechnologies) {
      aboutContentState = "what-i-do-stage-2";
    }

    if (this.state.startHideAbout) {
      // aboutState = "about-peek-out-top";
    }
    if (this.state.hideAbout) {
      animationLeftState = "animate-out-left";
      animationRightState = "animate-out-right";
      // aboutState = "about-animate-out-top";
    }
    // if (this.state.hideAbout) {
    //   aboutState = "about-animate-out-top";
    // }

    return (
      <div className={"wrapper " + aboutState}>
        <div className={""}>
          <div className={"about-left " + animationLeftState}>
            <div className="about-left-inside">
              <div className="center">EXPERIENCE</div>
            </div>
          </div>
          <div className={"about-right " + animationRightState}>
            <div className="experience-inside">
              <div className={"animated-title-text center " + textState1}>
                EXPERIENCE
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Experience;
