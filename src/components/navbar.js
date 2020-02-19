import React from "react";

class NavBar extends React.Component {
  render() {
    return (
      <div className="row justify-content-center" style={{ width: "100%" }}>
        <div className="col-3 banner-nav-container text-primray">
          <p>
            ABOUT&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;WORK&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;CONTACT
          </p>
        </div>
      </div>
    );
  }
}

export default NavBar;
