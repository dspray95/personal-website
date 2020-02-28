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
  constructor(props) {
    super(props);
    this.state = { timings: GetTimings(window.innerHeight) };
  }
  // const timings = GetTimings(window.innerHeight);
  resizeScale() {
    this.setState({ timings: GetTimings(window.innerHeight) });
  }

  scrollCallback(timings, scrollTarget) {
    console.log(scrollTarget);
    let scrollToPosition = 0;
    if (scrollTarget === "about") {
      scrollToPosition = timings.about.aboutContentIn;
    } else if (scrollTarget === "experience") {
      scrollToPosition = timings.experience.experienceTimelineBottomIn;
    } else if (scrollTarget === "contact") {
      scrollToPosition = timings.outro.footerIn;
    } else if (scrollTarget === "top") {
      scrollToPosition = 0;
    }
    scroll.scrollTo(scrollToPosition, {
      smooth: "easeInOutCubic",
      offset: 20,
      duration: 2000
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeScale.bind(this));
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
          scrollCallback={this.scrollCallback}
        />
        <About
          aboutBannerIn={timings.about.aboutBannerIn}
          aboutContentIn={timings.about.aboutContentIn}
          aboutOut={timings.about.aboutOut}
        />
        <Experience
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
          contactFormIn={timings.outro.contactFormIn}
          footerIn={timings.outro.footerIn}
          timings={timings}
          scrollCallback={this.scrollCallback}
        />
        <div style={{ width: "100vw", height: timings.pageBottom }}></div>
      </div>
    );
  }
}

export default App;
