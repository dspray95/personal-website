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
    return (
      <div className="wrapper" style={{ zIndex: 999 }}>
        <div className="row justify-content-center" style={{ width: "100vw" }}>
          <div
            className={
              "col-3 navbar-bottom text-primray " + this.state.navbarBottomState
            }
          >
            <a
              href="#"
              onClick={this.props.scrollCallback.bind(
                this,
                this.props.timings,
                "about"
              )}
            >
              ABOUT
            </a>
            &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
            <a
              href="#"
              onClick={this.props.scrollCallback.bind(
                this,
                this.props.timings,
                "experience"
              )}
            >
              WORK
            </a>
            &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
            <a
              href="#"
              onClick={this.props.scrollCallback.bind(
                this,
                this.props.timings,
                "contact"
              )}
            >
              CONTACT
            </a>
          </div>
          <div
            className={
              "text-primray navbar-locked " + this.state.navbarTopState
            }
          >
            <a
              href="#"
              onClick={this.props.scrollCallback.bind(
                this,
                this.props.timings,
                "about"
              )}
            >
              ABOUT
            </a>
            &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
            <a
              href="#"
              onClick={this.props.scrollCallback.bind(
                this,
                this.props.timings,
                "experience"
              )}
            >
              WORK
            </a>
            &nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;
            <a
              href="#"
              onClick={this.props.scrollCallback.bind(
                this,
                this.props.timings,
                "contact"
              )}
            >
              CONTACT
            </a>
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
