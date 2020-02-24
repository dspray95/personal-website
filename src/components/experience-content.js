import React from "react";
import Hexagon from "react-hexagon";
import Timeline from "./timeline";

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

    if (window.scrollY >= window.innerHeight * 5) {
      this.setState({ hideAbout: true });
    }
    if (window.scrollY < window.innerHeight * 5) {
      this.setState({ hideAbout: false });
    }

    if (window.scrollY >= window.innerHeight * 5.5) {
      this.setState({ showTimeline: true });
    } else {
      this.setState({ showTimeline: false });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.animateContent);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.animateContent);
  }

  getActiveTimelineNode() {
    if (window.scrollY >= window.innerHeight * 6.5) {
      return 3;
    }
    if (window.scrollY >= window.innerHeight * 6) {
      return 2;
    }
    if (window.scrollY >= window.innerHeight * 5.5) {
      return 1;
    }
  }

  render() {
    let animationLeftState = "";
    let animationRightState = "";
    let textState1 = "";
    let timelineState = "";

    if (this.state.showFull) {
      animationLeftState = "animate-in-left";
      animationRightState = "animate-in-right";
    } else if (this.state.startPeek) {
      animationLeftState = "peek-in-left";
      animationRightState = "";
    }

    if (this.state.peekTextOut && this.state.showText) {
      textState1 = "about-animate-out";
    } else if (this.state.peekTextOut) {
    }

    if (this.state.startHideAbout) {
      // aboutState = "about-peek-out-top";
    }
    if (this.state.hideAbout) {
      animationLeftState = "";
      animationRightState = "";
      // aboutState = "about-animate-out-top";
    }
    // if (this.state.hideAbout) {
    //   aboutState = "about-animate-out-top";
    // }
    if (this.state.showTimeline) {
      timelineState = "timeline-inner-in";
    }

    return (
      <div className={"wrapper "}>
        <Timeline activeNodeCallback={this.getActiveTimelineNode} />
        <div className="timeline-row-container">
          <div className="timeline-column">
            <div className={"timeline-inner-left " + timelineState}>
              <h4>Software Developer, Size Me Up</h4>

              <h5>2019 - 2020</h5>
            </div>
          </div>
          <div className="timeline-column">
            <div className={"timeline-inner-right " + timelineState}>
              <h5>Duties Include</h5>
              <p>Hello</p>
            </div>
          </div>
        </div>
        <div className={""}>
          <div className={"experience-left " + animationLeftState}>
            <div className="experience-left-inside">
              <div className="center">EXPERIENCE</div>
            </div>
          </div>
          <div className={"experience-right " + animationRightState}>
            <div className="experience-right-inside">
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
