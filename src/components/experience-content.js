import React from "react";
import Hexagon from "react-hexagon";
import Timeline from "./timeline";

class Experience extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    expereinceBannerLeft: "",
    experienceBannerRight: "",
    experienceBannerOut: "",
    isExperienceBannerOut: false,
    timelineState: "",
    timelineTopState: "",
    timelineMiddleState: "",
    timelineBottomState: "",
    experienceWrapperHide: "hide-wrapper",
    isTimelineOut: false
  };

  animateContent = () => {
    //Banner in and out
    if (
      !this.state.isExperienceBannerOut &&
      this.state.expereinceBannerLeft == "" &&
      window.scrollY >= this.props.experienceBannerIn
    ) {
      this.setState({
        expereinceBannerLeft: "animate-in-left",
        experienceBannerRight: "animate-in-right",
        experienceWrapperHide: ""
      });
    } else if (
      !this.state.isExperienceBannerOut &&
      this.state.expereinceBannerLeft != "" &&
      window.scrollY < this.props.experienceBannerIn
    ) {
      this.setState({
        expereinceBannerLeft: "",
        experienceBannerRight: "",
        experienceWrapperHide: "hide-wrapper"
      });
    }

    if (
      !this.state.isExperienceBannerOut &&
      this.state.expereinceBannerLeft != "" &&
      window.scrollY >= this.props.experienceBannerOut
    ) {
      this.setState({
        expereinceBannerLeft: "",
        experienceBannerRight: "",
        experienceWrapperHide: "hide-wrapper",
        isExperienceBannerOut: true
      });
    } else if (
      this.state.isExperienceBannerOut &&
      window.scrollY < this.props.experienceBannerOut
    ) {
      this.setState({
        expereinceBannerLeft: "animate-in-left",
        experienceBannerRight: "animate-in-right",
        experienceWrapperHide: "",
        isExperienceBannerOut: false
      });
    }

    //Timeline object in and out
    if (
      !this.state.isTimelineOut &&
      this.state.timelineState == "" &&
      window.scrollY >= this.props.experienceTimelineIn
    ) {
      this.setState({ timelineState: "timleine-animate-in" });
    } else if (
      !this.state.isTimelineOut &&
      this.state.timelineState != "" &&
      window.scrollY < this.props.experienceTimelineIn
    ) {
      this.setState({ timelineState: "" });
    }

    //Timeline items in and out
    if (
      this.state.timelineTopState == "" &&
      window.scrollY >= this.props.experienceTimelineTopIn
    ) {
      this.setState({ timelineTopState: "timeline-inner-in" });
    } else if (
      this.state.timelineTopState != "" &&
      window.scrollY < this.props.experienceTimelineTopIn
    ) {
      this.setState({ timelineTopState: "" });
    }

    if (
      !this.state.isTimelineOut &&
      this.state.timelineState != "" &&
      window.scrollY >= this.props.experienceTimelineOut
    ) {
      this.setState({
        timelineState: "",
        isTimelineOut: true
      });
    } else if (
      this.state.isTimelineOut &&
      window.scrollY < this.props.experienceTimelineOut
    ) {
      this.setState({
        timelineState: "",
        isTimelineOut: false
      });
    }

    if (
      this.state.timelineMiddleState == "" &&
      window.scrollY >= this.props.experienceTimelineMiddleIn
    ) {
      this.setState({ timelineMiddleState: "timeline-inner-in" });
    } else if (
      this.state.timelineMiddleState != "" &&
      window.scrollY < this.props.experienceTimelineMiddleIn
    ) {
      this.setState({ timelineMiddleState: "" });
    }

    if (
      this.state.timelineBottomState == "" &&
      window.scrollY >= this.props.experienceTimelineBottomIn
    ) {
      this.setState({ timelineBottomState: "timeline-inner-in" });
    } else if (
      this.state.timelineBottomState != "" &&
      window.scrollY < this.props.experienceTimelineBottomIn
    ) {
      this.setState({ timelineBottomState: "" });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.animateContent);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.animateContent);
  }

  getActiveTimelineNode() {
    if (window.scrollY >= this.props.experienceTimelineBottomIn) {
      return 3;
    }
    if (window.scrollY >= this.props.experienceTimelineMiddleIn) {
      return 2;
    }
    if (window.scrollY >= this.props.experienceTimelineTopIn) {
      return 1;
    } else {
      return 0;
    }
  }

  render() {
    return (
      <div className={"wrapper " + this.state.hideWrapper}>
        <div className={"timeline-container " + this.state.timelineState}>
          <Timeline
            activeNodeCallback={this.getActiveTimelineNode.bind(this)}
          />
          <div className="timeline-row-container" style={{ top: "20%" }}>
            <div className="timeline-column">
              <div
                className={"timeline-inner-left " + this.state.timelineTopState}
              >
                <h4>Software Developer, Size Me Up</h4>

                <h5>2019 - 2020</h5>
              </div>
            </div>
            <div className="timeline-column">
              <div
                className={
                  "timeline-inner-right " + this.state.timelineTopState
                }
              >
                <h5>
                  Development of a Computer Vision/Machine Learning Python Flask
                  API
                </h5>
                <p>
                  The role involved a large R&amp;D component, creating and
                  modifying neural network pipelines to deliver a{" "}
                  <a href="http://sizemeup.xyz/">user measurement solution.</a>{" "}
                  <br />
                  Additional responsibilities in the role include the
                  development of an embeddable widget (with Vue.js) and creation
                  of a CI/CD pipeline using Jenkins and Docker.
                </p>
              </div>
            </div>
          </div>
          <div className="timeline-row-container" style={{ top: "22.5%" }}>
            <div className="timeline-column">
              <div
                className={
                  "timeline-inner-left " + this.state.timelineMiddleState
                }
              >
                <h4>IoT Security Researcher, Copper Horse</h4>

                <h5>2018</h5>
              </div>
            </div>
            <div className="timeline-column">
              <div
                className={
                  "timeline-inner-right " + this.state.timelineMiddleState
                }
              >
                <h5>
                  Research, Creation and Organisation of an IoT Vulnurability
                  Disclosure Policy Dataset
                </h5>
                <p>
                  Featured in a{" "}
                  <a href="https://www.iotsecurityfoundation.org/wp-content/uploads/2018/11/Vulnerability-Disclosure-Design-v4.pdf">
                    report
                  </a>{" "}
                  published by the IoT Security Foundation, the role involved
                  production of research in a technical field, creation and
                  management of a large dataset, and presentation of data in an
                  easily digestible manner.
                </p>
              </div>
            </div>
          </div>
          <div className="timeline-row-container" style={{ top: "27.5%" }}>
            <div className="timeline-column">
              <div
                className={
                  "timeline-inner-left " + this.state.timelineBottomState
                }
              >
                <h4>Computer Science BSc, York St John University</h4>

                <h5>2015 - 2018</h5>
              </div>
            </div>
            <div className="timeline-column">
              <div
                className={
                  "timeline-inner-right " + this.state.timelineBottomState
                }
              >
                <h5>Graduated with 1st Class (Hons)</h5>
                <p>
                  The degree allowed me to explore a wide range of subjects
                  within the computer science field, from Cybercrime and
                  Security, to Engineering, Philisophies of Technology, and
                  Artificial Intelligence{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={""}>
          <div className={"experience-left " + this.state.expereinceBannerLeft}>
            <div className="experience-left-inside">
              <div className="center">EXPERIENCE</div>
            </div>
          </div>
          <div
            className={"experience-right " + this.state.experienceBannerRight}
          >
            <div className="experience-right-inside">
              <div className={"animated-title-text center "}>EXPERIENCE</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Experience;
