// import React, { Component } from "react";

// class ScrollManager extends Component {
//   constructor(props) {
//     super(props);
//     this.boxRef = React.createRef();
//   }
//   state = { revealPercentage: -50, locked: false };

//   hideBar = () => {
//     const { isHide } = this.state;

//     // window.scrollY < this.prev
//     //   ? !isHide && this.setState({ isHide: true })
//     //   : isHide && this.setState({ isHide: false });
//     if(window.scrollY > screen.height / 2){

//     }

//   };

//   componentDidMount() {
//     window.addEventListener("scroll", this.hideBar);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("scroll", this.hideBar);
//   }

//   render() {
//     const styleLocked = this.state.locked ? "locked" : "";
//     return (
//       // <div className="wrapper">
//       //   {/* <div style={{ height: "100vh" }}></div> */}
//       //   <div
//       //     className={"row revealer " + styleLocked}
//       //     style={{
//       //       height: "90vh",
//       //       left: this.state.revealPercentage + "%"
//       //     }}
//       //     ref={this.boxRef}
//       //   >
//       //     <div className="col-6 content-primary-block"></div>
//       //     <div className="col-6 "></div>
//       //   </div>
//       // </div>
//     );
//   }
// }

// export default ScrollManager;
