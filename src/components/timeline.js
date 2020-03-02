import React, { Component } from "react";
import TimelineNode from "../js/TimelineNode";

export class Timeline extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    timelineCanvasComponent: ""
  };

  render() {
    return (
      <div className={"timeline-canvas-container " + this.props.showTimeline}>
        <TimelineCanvas
          width={window.innerWidth * 0.5}
          height={window.innerHeight * 0.75}
          activeNodeCallback={this.props.activeNodeCallback}
        />
      </div>
    );
  }
}

class TimelineCanvas extends React.Component {
  constructor(props) {
    super(props);
    this.state = { angle: 0 };
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {}

  updateAnimationState() {
    this.setState(prevState => ({ angle: prevState.angle + 1 }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  render() {
    return (
      <Canvas
        width={this.props.width}
        height={this.props.height}
        activeNodeCallback={this.props.activeNodeCallback}
      />
    );
  }
}

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.saveContext = this.saveContext.bind(this);
    this.state = {
      width: window.innerWidth * 0.5,
      height: window.innerHeight * 0.75
    };
    this.generateNodes(
      3,
      this.state.width * 0.5,
      25,
      this.state.height - 25,
      5
    );
  }

  saveContext(ctx) {
    this.ctx = ctx;
  }

  generateNodes(count, center, top, bottom, radius) {
    const nodes = [];
    const spacing = (bottom - top) / (count + 1);

    nodes.push(new TimelineNode(center, top, 6, false));
    let yPos = top;
    let i;
    for (i = 0; i < count; i++) {
      yPos = yPos + spacing;
      nodes.push(new TimelineNode(center, yPos, 4, true));
    }
    nodes.push(new TimelineNode(center, bottom, 6, false));
    this.nodes = nodes;
  }

  drawNodes(context) {
    this.nodes.forEach(node => {
      node.drawNode(context);
    });
  }

  activeNodeCheck() {
    let activeNode = this.props.activeNodeCallback();
    if (!activeNode) {
      this.nodes.forEach(node => {
        node.deactivate();
      });
    } else {
      this.nodes.forEach(node => {
        node.deactivate();
      });
      this.nodes[activeNode].startAnimation();
    }
  }

  resizeScale() {
    this.setState({
      width: window.innerWidth * 0.5,
      height: window.innerHeight * 0.75
    });
    this.generateNodes(
      3,
      this.state.width * 0.5,
      25,
      this.state.height - 25,
      5
    );
  }

  componentDidMount() {
    window.addEventListener("resize", this.resizeScale.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("rezise", this.resizeScale.bind(this));
  }

  componentDidUpdate() {
    const width = this.state.width;
    const height = this.state.height;
    const top = 25;
    const bottom = this.state.height - 25;
    const center = this.state.width * 0.5;
    const circleRadius = 5;
    const flashCircleRadius = circleRadius * 2;
    const ctx = this.ctx;

    this.activeNodeCheck();

    ctx.beginPath();
    this.ctx.clearRect(0, 0, width, height);

    ctx.moveTo(center, top);
    ctx.lineTo(center, bottom);
    ctx.strokeStyle = "rgb(0, 255, 255)";
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.closePath();

    this.drawNodes(ctx);
    // ctx.beginPath();
    // ctx.moveTo(center + circleRadius, top);
    // ctx.arc(center, top, circleRadius, 0, 2 * Math.PI);
    // ctx.fillStyle = "aqua";
    // ctx.fill();

    // ctx.moveTo(center + circleRadius * 2, top);
    // ctx.arc(center, top, circleRadius * 2, 0, 2 * Math.PI);
    // ctx.strokeStyle = "aqua";

    // ctx.lineWidth = 1;
    // ctx.stroke();
    // ctx.closePath();
  }

  render() {
    return (
      <PureCanvas
        contextRef={this.saveContext}
        width={this.state.width}
        height={this.state.height}
      ></PureCanvas>
    );
  }
}

class PureCanvas extends React.Component {
  shouldComponentUpdate() {
    return true;
  }

  render() {
    return (
      <canvas
        width={this.props.width}
        height={this.props.height}
        ref={node =>
          node ? this.props.contextRef(node.getContext("2d")) : null
        }
      />
    );
  }
}

export default Timeline;
