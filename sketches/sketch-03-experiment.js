const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
import { gerarCorAleatoria, gerarCorMaterial } from "../CoresUtil.js";

const settings = {
  dimensions: [10000, 10000],
};

const sketch = ({ context, width, height }) => {
  const agents = [];

  for (let i = 0; i < width; i++) {
    const x = random.range(0, width);
    const y = random.range(0, height);

    agents.push(new Agent(x, y));
  }

  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    agents.forEach((agent) => {
      agent.draw(context);
    });
  };
};

canvasSketch(sketch, settings);

class Point {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
  }
}

class Agent {
  constructor(x, y) {
    this.pos = new Point(x, y);
    this.radius = random.range(100, 250);
  }
  draw(context) {
    context.fillStyle = "white";
    context.shadowBlur = 100;
    context.shadowColor = "#00000022";

    context.beginPath();
    context.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    context.fill();
  }
}
