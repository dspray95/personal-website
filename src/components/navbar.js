import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { navbarBottomState: "", navbarTopState: "" };

  animateContent = () => {
    if (
      this.state.navbarBottomState == "" &&
      window.scrollY >= this.props.navbarBottomOut
    ) {
      this.setState({ navbarBottomState: "animate-out-top" });
    } else if (
      this.state.navbarBottomState != "" &&
      window.scrollY < this.props.navbarBottomOut
    ) {
      this.setState({ navbarBottomState: "" });
    }

    if (
      this.state.navbarTopState == "" &&
      window.scrollY >= this.props.navbarTopIn
    ) {
      this.setState({
        navbarTopState: "navbar-animate-in-top"
      });
    } else if (
      this.state.navbarTopState != "" &&
      window.scrollY < this.props.navbarBottomOut
    ) {
      this.setState({
        navbarTopState: ""
      });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.animateContent);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.animateContent);
  }
  render() {
    let about = "about";
    return (
      <div className="wrapper" style={{ zIndex: 999 }}>
        <div className="row justify-content-center" style={{ width: "100vw" }}>
          <div
            className={
              "navbar-bottom text-primray " + this.state.navbarBottomState
            }
          >
            <button onClick={() => this.props.scrollCallback("about")}>
              ABOUT
            </button>
            &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
            <button onClick={() => this.props.scrollCallback("experience")}>
              WORK
            </button>
            &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
            <button onClick={() => this.props.scrollCallback("contact")}>
              CONTACT
            </button>
          </div>
          <div
            className={
              "text-primray navbar-locked " + this.state.navbarTopState
            }
          >
            <button onClick={() => this.props.scrollCallback("about")}>
              ABOUT
            </button>
            &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
            <button onClick={() => this.props.scrollCallback("experience")}>
              WORK
            </button>
            &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
            <button onClick={() => this.props.scrollCallback("contact")}>
              CONTACT
            </button>
          </div>
        </div>
        <div className="media-links">
          <a href="https://www.linkedin.com/in/davidspray95/" target="_blank">
            <FaLinkedin />
          </a>
          <a href="https://github.com/dspray95/" target="_blank">
            <FaGithub />
          </a>
        </div>
      </div>
    );
  }
}

export default NavBar;
