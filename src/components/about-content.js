import React from "react";
import Hexagon from "react-hexagon";

class About extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    aboutBannerLeft: "",
    aboutBannerRight: "",
    aboutTitle: "",
    aboutContent: "",
    aboutOut: false
  };

  animateContent = () => {
    // if (
    //   this.state.aboutBannerLeft != "" &&
    //   window.scrollY >= this.props.aboutOut
    // ) {
    //   this.setState({ aboutBannerLeft: "-in-left", aboutBannerRight: "" });
    // }
    if (!this.state.aboutOut && window.scrollY >= this.props.aboutBannerIn) {
      this.setState({
        aboutBannerLeft: "animate-in-left",
        aboutBannerRight: "animate-in-right"
      });
    } else if (
      this.state.aboutBannerLeft != "" &&
      window.scrollY < this.props.aboutBannerIn
    ) {
      this.setState({ aboutBannerLeft: "", aboutBannerRight: "" });
    }

    if (
      this.state.aboutContent == "" &&
      window.scrollY >= this.props.aboutContentIn
    ) {
      this.setState({
        aboutTitle: "about-animate-out",
        aboutContent: "what-i-do-stage-2"
      });
    } else if (
      this.state.aboutContent != "" &&
      window.scrollY < this.props.aboutContentIn
    ) {
      this.setState({ aboutTitle: "", aboutContent: "" });
    }

    if (
      !this.state.aboutOut &&
      this.state.aboutContent != "" &&
      window.scrollY >= this.props.aboutOut
    ) {
      this.setState({
        aboutBannerLeft: "",
        aboutBannerRight: "",
        aboutOut: true
      });
    } else if (this.state.aboutOut && window.scrollY < this.props.aboutOut)
      this.setState({
        aboutBannerLeft: "animate-in-left",
        aboutBannerRight: "animate-in-right",
        aboutOut: false
      });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.animateContent);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.animateContent);
  }
  render() {
    return (
      <div className={"wrapper"}>
        <div className={""}>
          <div className={"about-left " + this.state.aboutBannerLeft}>
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
            <div className="about-left-inside-edge"></div>
          </div>
          <div className={"about-right " + this.state.aboutBannerRight}>
            <div className="about-right-inside">
              <div
                className={
                  "animated-title-text center " + this.state.aboutTitle
                }
              >
                ABOUT
              </div>
              <div
                className={
                  "about-right-content about-right-what-i-do " +
                  this.state.aboutContent
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
