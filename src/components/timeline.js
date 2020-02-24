import React, { Component } from "react";
import TimelineNode from "../js/TimelineNode";

export class Timeline extends Component {
  render() {
    return (
      <div className="timeline-container">
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
    this.generateNodes(
      3,
      this.props.width * 0.5,
      25,
      this.props.height - 25,
      5
    );
  }

  state = {
    isTriggered: false,
    flashAnimationLength: 5,
    flashAnimationTimeRemaining: 0
  };

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
      console.log(yPos);
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
      console.log(activeNode);
      this.nodes[activeNode].startAnimation();
    }
  }

  componentDidUpdate() {
    const width = this.props.width;
    const height = this.props.height;
    const top = 25;
    const bottom = this.props.height - 25;
    const center = this.props.width * 0.5;
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
        width={this.props.width}
        height={this.props.height}
      ></PureCanvas>
    );
  }
}

class PureCanvas extends React.Component {
  shouldComponentUpdate() {
    return false;
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
