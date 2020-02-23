import React from "react";
import Hexagon from "react-hexagon";

class About extends React.Component {
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
    if (window.scrollY >= window.innerHeight / 4) {
      this.setState({ startPeek: true });
    }
    if (window.scrollY < window.innerHeight / 4) {
      this.setState({ startPeek: false });
    }

    if (window.scrollY >= window.innerHeight / 2) {
      this.setState({ showFull: true });
    }
    if (window.scrollY < window.innerHeight / 2) {
      this.setState({ showFull: false });
    }

    if (window.scrollY >= window.innerHeight) {
      this.setState({ peekTextOut: true });
    }
    if (window.scrollY < window.innerHeight) {
      this.setState({ peekTextOut: false });
    }

    if (window.scrollY >= window.innerHeight + window.innerHeight / 6) {
      this.setState({ showText: true });
    }
    if (window.scrollY < window.innerHeight + window.innerHeight / 6) {
      this.setState({ showText: false });
    }

    if (window.scrollY >= window.innerHeight + window.innerHeight / 4) {
      this.setState({ showTechnologies: true });
    }
    if (window.scrollY < window.innerHeight + window.innerHeight / 4) {
      this.setState({ showTechnologies: false });
    }

    if (window.scrollY >= window.innerHeight * 2) {
      this.setState({ startHideAbout: true });
    }
    if (window.scrollY < window.innerHeight * 2) {
      this.setState({ startHideAbout: false });
    }

    if (window.scrollY >= window.innerHeight * 2.25) {
      this.setState({ hideAbout: true });
    }
    if (window.scrollY < window.innerHeight * 2.25) {
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

    if (this.state.startPeek && this.state.showFull) {
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
              <div className="center">ABOUT</div>
            </div>
            <div className="hex-container">
              {" "}
              <Hexagon
                style={{ stroke: "none" }}
                backgroundImage={require("../img/profile.png")}
                flatTop
              />
            </div>

            {/* <p>
            ABOUT&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;WORK&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;CONTACT
          </p> */}
            <div className="about-left-inside-edge"></div>
          </div>
          <div className={"about-right " + animationRightState}>
            <div className="about-right-inside">
              <div className={"animated-title-text center " + textState1}>
                ABOUT
              </div>
              <div
                className={
                  "about-right-content about-right-what-i-do " +
                  aboutContentState
                }
              >
                <h4 className="banner-mono">What I Do</h4>
                <p>
                  I'm a software engineer based in Edinburgh, Scotland with a
                  passion for using cutting edge technologies to better the
                  consumer experience.
                  <br />
                  With experience in a wide range of languages and frameworks, I
                  aim to provide elegant solutions to complex problems while
                  ensuring a high standard of work.
                  <br />
                  You can find some of my work on my{" "}
                  <a href="github.com/dspray95">GitHub account</a>.
                  <br />
                  <br />
                </p>
                <h4 className="banner-mono">Technologies</h4>
                <p>
                  Below are some of the technologies I have recently been
                  working with
                </p>
                <div className="container" style={{ marginTop: -15 }}>
                  <div className="row">
                    <div className="col-6">
                      <ul>
                        <li>Python</li>
                        <li>Machine Learning</li>
                        <li>Computer Vision</li>
                        <li>HTML/CSS/SCSS/SASS</li>
                        <li>Javascript</li>
                      </ul>
                    </div>
                    <div className="col-6">
                      <ul>
                        <li>Vue.js</li>
                        <li>React</li>
                        <li>C#</li>
                        <li>Docker</li>
                        <li>CI/CD (Jenkins)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
