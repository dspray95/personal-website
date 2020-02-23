import React from "react";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  state = { navbarLock: false };

  animateContent = () => {
    if (window.scrollY > window.innerHeight / 2) {
      this.setState({ navbarLock: true });
    }

    if (window.scrollY < window.innerHeight / 2) {
      this.setState({ navbarLock: false });
    }
  };

  componentDidMount() {
    window.addEventListener("scroll", this.animateContent);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.animateContent);
  }
  render() {
    let animateInCSS = "";
    let animateOutCSS = "";
    if (this.state.navbarLock) {
      animateInCSS = "animate-in-top";
      animateOutCSS = "animate-out-top ";
    }

    return (
      <div className="row justify-content-center" style={{ width: "100vw" }}>
        <div
          className={"col-3 banner-nav-container text-primray " + animateOutCSS}
        >
          <p>
            ABOUT&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;WORK&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;CONTACT
          </p>
        </div>
        <div className={"text-primray navbar-locked " + animateInCSS}>
          <p>
            ABOUT&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;WORK&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;CONTACT
          </p>
        </div>
      </div>
    );
  }
}

export default NavBar;
