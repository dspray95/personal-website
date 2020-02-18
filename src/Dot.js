class DotHandler {
  constructor(numDots, width, height, chunkSize, gravity) {
    this.width = width;
    this.height = height;
    this.gravity = gravity;
    //initial dot generation
    let dots = [];
    for (let i = 0; i < numDots; i++) {
      let nextDot = new Dot();
      dots.push(nextDot);
    }
    var SimplexNoise = require("simplex-noise");
    this.noise = new SimplexNoise(Math.random);
    let chunks = this.chunkifyDots(dots, chunkSize);
    //set proximates chunk-wise without repeating (ie 1 & 2, 2 & 1)
    //probably a way to do this programatically to allow for more chunks
    //
    this.setDotProximates(chunks[0], chunks[1]);
    this.setDotProximates(chunks[1], chunks[2]);
    this.setDotProximates(chunks[2]);

    this.chunks = chunks;
  }

  chunkifyDots(dots, chunkSize) {
    /* Splits the dots into chunks to make for quicker proximity checking
     * and generally faster comparison
     * ((N*0.6)^2 on the edges rather than just (N^2) without chunks)
     */
    let chunkA = [];
    let chunkB = [];
    let chunkC = [];

    dots.forEach(dot => {
      //Assign to chunk
      if (dot.xPos < chunkSize) {
        chunkA.push(dot);
      } else if (dot.xPos < chunkSize * 2) {
        chunkB.push(dot);
      } else {
        chunkC.push(dot);
      }
      //Check if we're near the edge
      if (
        (dot.xPos > chunkSize - 10 && dot.xPos < chunkSize + 10) ||
        (dot.xPos > chunkSize * 2 - 10 && dot.xPos < chunkSize * 2 + 10)
      ) {
        dot.isNearChunkEdge = true;
      }
    });

    return [chunkA, chunkB, chunkC];
  }

  setDotProximates(dots, borderChunk, nConnections) {
    /*there is a way to do this without border chunks
     * if we put a dot in both chunks when its close to the edge
     */
    nConnections = nConnections || 5;

    let chunkDots = dots.slice();
    let dotsForComparison = dots.slice();

    if (borderChunk) {
      dotsForComparison = dotsForComparison.concat(borderChunk);
    }

    chunkDots.forEach(currentDot => {
      let dotsForComparisonWithDistance = [];
      dotsForComparison.forEach(comparisonDot => {
        let newDistance;
        if (currentDot.equals(comparisonDot)) {
          newDistance = 9999999;
        } else {
          newDistance = this.manhattanDistance(
            currentDot.xPos,
            comparisonDot.xPos,
            currentDot.yPos,
            comparisonDot.yPos
          );
        }
        dotsForComparisonWithDistance.push({
          dot: comparisonDot,
          distance: newDistance
        });
      });
      dotsForComparisonWithDistance.sort(this.distanceComparison).reverse();
      //Pull the dot out of our dot/distance pair objects
      let closestDots = dotsForComparisonWithDistance.slice(0, nConnections);
      let proximateDots = [];
      for (let i = 0; i < closestDots.length; i++) {
        proximateDots.push(closestDots[i].dot);
      }

      currentDot.proximateDots = proximateDots;
    });
  }

  drawDots(context, distanceTolerance, outerConnectionTolerance) {
    distanceTolerance = distanceTolerance || this.width / 3;
    outerConnectionTolerance = outerConnectionTolerance || 100;

    this.chunks.forEach(chunk => {
      //First draw the dots from their current state, then update for the next drawing phase
      chunk.forEach(dot => {
        dot.proximateDots.forEach(proximateDot => {
          let distance = this.manhattanDistance(
            dot.xPos,
            proximateDot.xPos,
            dot.yPos,
            proximateDot.yPos
          );
          //Only draw the line if we are within our tolerance
          if (distance < distanceTolerance) {
            context.beginPath();
            context.moveTo(dot.xPos + 1, dot.yPos);
            context.lineTo(proximateDot.xPos + 1, proximateDot.yPos);
            context.strokeStyle = `${dot.color}50`;
            context.stroke();
            context.closePath();
          }
        });
        //Check if we need to draw a conmnection off of the screen
        //This is the case if the dot is within a given distance from
        //the canvas edge
        let outerConnection = this.distanceFromEdgeCheck(
          dot,
          this.width,
          this.height,
          outerConnectionTolerance
        );

        if (outerConnection) {
          let targetX = dot.xPos;
          let targetY = dot.yPos;
          if (outerConnection == "left") {
            console.log("left");

            targetX = targetX - outerConnectionTolerance;
            targetY = targetY + dot.edgeConnectionAngleDelta;
          } else if (outerConnection == "right") {
            targetX = targetX + outerConnectionTolerance;
            targetY = targetY + dot.edgeConnectionAngleDelta;
          } else if (outerConnection == "top") {
            targetX = targetX + dot.edgeConnectionAngleDelta;
            targetY = targetY - outerConnectionTolerance;
          } else {
            targetX = targetX + dot.edgeConnectionAngleDelta;
            targetY = targetY + outerConnectionTolerance;
          }
          context.beginPath();
          context.moveTo(dot.xPos + 1, dot.yPos);
          context.lineTo(targetX, targetY);
          context.strokeStyle = `${dot.color}50`;
          context.stroke();
          context.closePath();
        }
        context.beginPath();
        context.fillStyle = dot.color;
        context.fillRect(dot.xPos, dot.yPos, dot.size, dot.size);
        context.closePath();

        dot.updatePosition(this.gravity, this.height, this.noise);
      });
    });

    this.setDotProximates(this.chunks[0], this.chunks[1]);
    this.setDotProximates(this.chunks[1], this.chunks[2]);
    this.setDotProximates(this.chunks[2]);
  }

  distanceFromEdgeCheck(dot, width, height, tolerance) {
    if (dot.xPos < 0 + tolerance) {
      return "left";
    } else if (dot.xPos > width - tolerance) {
      return "right";
    } else if (dot.yPos < 0 + tolerance) {
      return "top";
    } else if (dot.yPos > height - tolerance) {
      return "bottom";
    } else {
      return undefined;
    }
  }

  distanceComparison(dotA, dotB) {
    if (dotA.distance > dotB.distance) {
      return -1;
    } else if (dotA.distance > dotB.distance) {
      return 1;
    } else {
      return 0;
    }
  }

  manhattanDistance(xA, xB, yA, yB) {
    return Math.abs(xB - xA) + Math.abs(yB - yA);
  }
}

class Dot {
  constructor(size, xPos, yPos, zPos) {
    if (xPos === undefined || yPos === undefined) {
      this.getRandomPosition();
    } else {
      this.xPos = xPos;
      this.yPos = yPos;
    }
    this.zPos = zPos;
    this.size = size || 2;
    this.color = this.getColor();
    this.edgeConnectionAngleDelta = Math.random() * (75 - -75) + -75;
  }

  equals(otherDot) {
    if (
      this.xPos == otherDot.xPos &&
      this.yPos == otherDot.yPos &&
      this.color == otherDot.color
    ) {
      return true;
    } else {
      return false;
    }
  }

  getRandomPosition() {
    this.xPos = Math.floor(Math.random() * window.innerWidth);
    this.xPosInitial = this.xPos;
    this.yPos = Math.floor(Math.random() * window.innerHeight);
  }

  updatePosition(gravity, height, noise) {
    gravity = gravity || 0.5;
    height = height || window.innerHeight;

    let yPosUpdated = (this.yPos += 1 * gravity);
    //"gravity"
    if (yPosUpdated > height) {
      this.getRandomPosition();
      this.proximateDots = undefined;
      this.yPos = 0;
      this.color = this.getColor();
    } else {
      this.yPos = yPosUpdated;
    }
    //Noise is in the range of 0 - 1, to get range of -1 to 1 we do noise * 2 - 1
    let xModify =
      noise.noise2D(this.xPosInitial * 0.01, this.yPos * 0.01) * 2 - 1;
    this.xPos = this.xPosInitial + xModify * 5;
  }

  getColor() {
    const colors = [
      "#40a35a",
      "#40a3a0",
      "#404aa3",
      "#7040a3",
      "#a34073",
      "#a34040"
    ];
    let colorIndex = Math.floor(Math.random() * colors.length);
    return colors[colorIndex];
  }
}

export default DotHandler;
