import React from "react";
import "./App.css";
import AnimatedHeader from "./components/animated-header";
import Navbar from "./components/navbar";
import ScrollManager from "./components/scroll-manager";
import About from "./components/about-content";
import Experience from "./components/experience-content";
import Footer from "./components/footer";
import GetTimings from "./js/Timings";
import * as Scroll from "react-scroll";

var scroll = Scroll.animateScroll;

class App extends React.Component {
  /**
   * TODO
   * Requires some refactoring -
   *  - Bring scroll checking up one component, from the apps children to the app
   *    This will reduce the number of listeners and should help performance some,
   *    as well as making the code more maintanable.
   *
   */
  constructor() {
    super();
    this.aboutRef = React.createRef();
    this.workRef = React.createRef();
    this.footerRef = React.createRef();
    this.state = {
      timings: GetTimings(window.innerHeight, window.innerWidth),
      currentScrollPosition: "top",
      forceAboutIn: false,
      forceWorkIn: false,
      forceContactIn: false,
      forceAboutOut: false,
      forceWorkOut: false,
      forceContactOut: false,
      isSmallScreen: false
    };
  }
  // const timings = GetTimings(window.innerHeight);
  resizeScale() {
    if (window.innerWidth < 991) {
      this.setState({
        timings: GetTimings(window.innerHeight, window.innerWidth),
        isSmallScreen: true
      });
    } else {
      this.setState({
        timings: GetTimings(window.innerHeight, window.innerWidth)
      });
    }
  }

  buttonScrollCallback(scrollTarget) {
    let timings = this.state.timings;

    let scrollToPosition = 0;
    if (scrollTarget === "about") {
      scrollToPosition = timings.about.aboutContentIn + 20;
      this.setState({
        forceAboutIn: true,
        forceAboutOut: false,
        forceWorkOut: true,
        forceContactOut: true
      });
    } else if (scrollTarget === "experience") {
      scrollToPosition = timings.experience.experienceTimelineBottomIn;
      this.setState({
        forceWorkIn: true,
        forceAboutOut: true,
        forceContactOut: true
      });
    } else if (scrollTarget === "contact") {
      scrollToPosition = timings.outro.footerIn + 20;
      this.setState({
        forceContactIn: true,
        forceAboutOut: true,
        forceWorkOut: true
      });
    } else if (scrollTarget === "top") {
      scrollToPosition = 0;
      this.setState({
        forceContactOut: true,
        forceAboutOut: true,
        forceWorkOut: true
      });
    }
    if (scrollTarget !== this.state.currentScrollPosition) {
      scroll.scrollTo(scrollToPosition, {
        smooth: "",
        duration: 10
      });
    }
    this.setState({ currentScrollPosition: scrollTarget });
    setTimeout(this.unlockComponents.bind(this), 100);
  }

  unlockComponents() {
    this.setState({
      forceAboutIn: false,
      forceWorkIn: false,
      forceContactIn: false,
      forceAboutOut: false,
      forceWorkOut: false,
      forceContactOut: false,
      currentScrollPosition: ""
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeScale.bind(this));
    this.setState({ isSmallScreen: window.innerWidth < 991 });
  }

  componentWillUnmount() {
    window.removeEventListener("rezise", this.resizeScale.bind(this));
  }

  render() {
    const timings = this.state.timings;
    return (
      <div className="App">
        <AnimatedHeader
          introBottomOut={timings.intro.introBottomOut}
          introTopOut={timings.intro.introTopOut}
        />
        <Navbar
          navbarBottomOut={timings.navbar.navbarBottomOut}
          navbarTopIn={timings.navbar.navbarTopIn}
          timings={timings}
          scrollCallback={this.buttonScrollCallback.bind(this)}
        />
        <About
          forceOut={this.state.forceAboutOut}
          aboutBannerIn={timings.about.aboutBannerIn}
          aboutContentIn={timings.about.aboutContentIn}
          aboutOut={timings.about.aboutOut}
          isSmallScreen={this.state.isSmallScreen}
        />
        <Experience
          forceIn={this.state.forceWorkIn}
          forceOut={this.state.forceWorkOut}
          experienceBannerIn={timings.experience.experienceBannerIn}
          experienceBannerOut={timings.experience.experienceBannerOut}
          experienceTimelineIn={timings.experience.experienceTimelineIn}
          experienceTimelineTopIn={timings.experience.experienceTimelineTopIn}
          experienceTimelineMiddleIn={
            timings.experience.experienceTimelineMiddleIn
          }
          experienceTimelineBottomIn={
            timings.experience.experienceTimelineBottomIn
          }
          experienceTimelineOut={timings.experience.experienceTimelineOut}
        />

        <Footer
          ref={this.footerRef}
          contactFormIn={timings.outro.contactFormIn}
          footerIn={timings.outro.footerIn}
          timings={timings}
          scrollCallback={this.buttonScrollCallback.bind(this)}
        />
        <div style={{ width: "100vw", height: timings.pageBottom }}></div>
      </div>
    );
  }
}

export default App;
