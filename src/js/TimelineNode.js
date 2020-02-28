import { Profiler } from "react";

class TimelineNode {
  constructor(xPos, yPos, radius, isContentNode) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.radius = radius;
    this.isContentNode = isContentNode;

    if (this.isContentNode) {
      this.isAnimating = false;
      this.animationExpanding = false;
      this.doneAnimation = false;
      this.animationLength = 0.4;
      this.currentAnimationLocation = -1;
      this.animationSizeStep = radius * 2 * this.animationLength;
      this.animationCircleCurrentSize = radius;
    }
  }

  startAnimation() {
    if (!this.doneAnimation) {
      this.isAnimating = true;
      this.isActive = true;
    }
  }

  deactivate() {
    this.isAnimating = false;
    this.isActive = false;
    this.currentAnimationLocation = -1;
    this.animationCircleCurrentSize = this.radius;
    this.doneAnimation = false;
    this.animationExpanding = false;
    this.animationContracting = false;
  }

  drawNode(context) {
    context.beginPath();
    context.moveTo(this.xPos + this.radius, this.yPos);
    context.arc(this.xPos, this.yPos, this.radius, 0, 2 * Math.PI);
    if (this.isActive) {
      context.fillStyle = "white";
    } else {
      context.fillStyle = "lightblue";
    }
    context.fill();
    if (
      this.isAnimating &&
      !this.animationExpanding &&
      !this.animationContracting
    ) {
      this.animationExpanding = true;
    }

    if (this.isContentNode && this.isAnimating) {
      //...this is a mess
      if (
        this.animationCircleCurrentSize > this.radius * 4 &&
        this.animationExpanding
      ) {
        this.animationExpanding = false;
        this.animationContracting = true;
      }
      if (
        this.animationCircleCurrentSize < this.radius * 4 &&
        this.animationExpanding
      ) {
        this.animationCircleCurrentSize += this.animationSizeStep;
      }

      if (
        !this.animationExpanding &&
        this.animationCircleCurrentSize > this.radius * 2
      ) {
        console.log("shrinking");
        this.animationCircleCurrentSize -= this.animationSizeStep;
      }
      if (this.animationCircleCurrentSize < 0) {
        this.animationCircleCurrentSize = 1;
      }
    }

    if (!this.isAnimating && this.animationCircleCurrentSize > this.radius) {
      this.animationCircleCurrentSize -= this.animationSizeStep;
      if (this.animationCircleCurrentSize <= 0) {
        this.animationCircleCurrentSize = 1;
        this.doneAnimation = true;
      }
    }

    if (this.isActive && this.animationCircleCurrentSize > this.radius) {
      context.moveTo(this.xPos + this.animationCircleCurrentSize, this.yPos);
      context.arc(
        this.xPos,
        this.yPos,
        this.animationCircleCurrentSize,
        0,
        2 * Math.PI
      );
      context.strokeStyle = "rgb(0, 255, 255)";
      context.lineWidth = 0.5;
      context.stroke();
      context.closePath();
    }
  }
}

export default TimelineNode;
