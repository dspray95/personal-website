import React from "react";
import DotHandler from "../js/Dot";

class Animation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { angle: 0 };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  updateAnimationState() {
    this.setState(prevState => ({ angle: prevState.angle + 1 }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  render() {
    return <Canvas angle={this.state.angle} dots={this.state.dots} />;
  }
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.saveContext = this.saveContext.bind(this);
    const dotHandler = new DotHandler(
      300,
      window.innerWidth,
      window.innerHeight,
      window.innerWidth / 3,
      0.25
    );
    this.state = {
      dotHandler: dotHandler,
      initialWidth: window.innerWidth,
      initialHeight: window.innerHeight
    };
  }

  saveContext(ctx) {
    this.ctx = ctx;
  }

  resizeScale() {
    const dotHandler = new DotHandler(
      300,
      window.innerWidth,
      window.innerHeight,
      window.innerWidth / 3,
      0.25
    );
    this.setState({
      dotHandler: dotHandler,
      initialWidth: window.innerWidth,
      initialHeight: window.innerHeight
    });
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeScale.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("rezise", this.resizeScale.bind(this));
  }

  componentDidUpdate() {
    const dotHandler = this.state.dotHandler;
    // const dots = this.props.dots[0];

    const width = window.innerWidth;
    const height = window.innerHeight;
    //background
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.fillStyle = "#1e2131";
    this.ctx.fillRect(0, 0, width, height);
    // Chunk visualization
    this.ctx.restore();

    dotHandler.drawDots(this.ctx);
  }

  render() {
    return <PureCanvas contextRef={this.saveContext}></PureCanvas>;
  }
}

class PureCanvas extends React.Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={node =>
          node ? this.props.contextRef(node.getContext("2d")) : null
        }
      />
    );
  }
}

export default Animation;
