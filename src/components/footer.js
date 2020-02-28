import React, { Component } from "react";
import { FaAngleDoubleUp, FaFileAlt } from "react-icons/fa";

class Footer extends Component {
  state = {
    // showContact: false,
    // showFooter: false.
    contactState: "",
    footerState: ""
  };

  animateContent = () => {
    if (
      this.state.contactState == "" &&
      window.scrollY >= this.props.contactFormIn
    ) {
      this.setState({ contactState: "contact-in" });
    } else if (
      this.state.contactState != "" &&
      window.scrollY < this.props.contactFormIn
    ) {
      this.setState({ contactState: "" });
    }

    if (this.state.footerState == "" && window.scrollY >= this.props.footerIn) {
      this.setState({ footerState: "footer-in" });
    } else if (
      this.state.footerState != "" &&
      window.scrollY < this.props.footerIn
    ) {
      this.setState({ footerState: "" });
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
      <div className="wrapper">
        <div className={"contact-container " + this.state.contactState}>
          <p>
            If you'd like to work together or even just say hi, feel free to
            leave a message!
          </p>
          <form action="">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="inputName"
                placeholder="Name"
              />
              <input
                type="email"
                className="form-control"
                id="inputName"
                placeholder="Email adress"
              />
              <textarea
                className="form-control"
                id="message"
                rows="5"
                placeholder="Your message"
              ></textarea>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
          <p></p>
        </div>
        <div className={"footer-container " + this.state.footerState}>
          <button
            className="footer-button"
            onClick={this.props.scrollCallback.bind(this, "top")}
          >
            <FaAngleDoubleUp className="footer-fa-icon" />
          </button>
          <div className="footer-content">
            <p>Thanks for reading!</p>
            <a href="/david-spray-cv.pdf" target="_blank">
              <FaFileAlt className="footer-fa-icon" />
            </a>
          </div>
          <div className="footer-dark"></div>
        </div>
      </div>
    );
  }
}

export default Footer;
