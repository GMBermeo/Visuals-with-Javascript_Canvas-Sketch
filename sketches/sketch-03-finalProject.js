const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const math = require("canvas-sketch-util/math");

const settings = {
  dimensions: [2560 * 5, 1080 * 5],
  animate: false,
};

// // Função dummy de como animar frames formando loop
// const animate = () => {
//   console.log('domestika');
//   requestAnimationFrame(animate);
// }

const sketch = ({ context, width, height }) => {
  const unit = height * 0.001;

  const eightPercent = width * 0.008;
  const thirtyPercent = width * 0.03;
  const agents = [];

  for (let i = 0; i < 50; i++) {
    const x = random.range(12, width - 12);
    const y = random.range(12, height - 12);

    agents.push(new Agent(x, y, height));
  }

  return ({ context, width, height }) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    for (let i = 0; i < agents.length; i++) {
      const agent = agents[i];
      for (let j = i + 1; j < agents.length; j++) {
        const other = agents[j];

        const dist = agent.pos.getDistance(other.pos);

        if (dist > height / 4) continue;

        context.lineWidth = math.mapRange(
          dist,
          0,
          height / 4,
          unit * 8,
          unit * 1
        );

        context.beginPath();
        context.moveTo(agent.pos.x, agent.pos.y);
        context.lineTo(other.pos.x, other.pos.y);
        // context.shadowBlur = unit * 20;
        // context.shadowColor = "black";
        context.strokeStyle = "white";
        context.lineCap = "round";
        context.stroke();
      }
    }

    agents.forEach((agent) => {
      // agent.update();
      agent.draw(context);
      agent.bounce(width, height);
    });
  };
};

canvasSketch(sketch, settings);

class Vector {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
  }

  getDistance(v) {
    const dx = this.x - v.x;
    const dy = this.y - v.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class Agent {
  constructor(x, y, height) {
    const unit = height * 0.001;
    this.pos = new Vector(x, y);
    this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
    this.radius = random.range(unit * 5, unit * 20);
  }
  bounce(width, height) {
    if (this.pos.x <= 0 || this.pos.x >= width) this.vel.x *= -1;
    if (this.pos.y <= 0 || this.pos.y >= width) this.vel.y *= -1;
  }

  update() {
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
  }

  warp(width, height) {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  draw(context, height) {
    const unit = height * 0.001;
    context.save();
    context.translate(this.pos.x, this.pos.y);

    context.beginPath();
    context.arc(0, 0, this.radius, 0, Math.PI * 2);
    // context.strokeStyle = "white";
    // context.fillStyle = "white";
    // context.fill();
    // context.shadowBlur = 10;
    // context.shadowColor = "#000000FF";
    context.lineWidth = unit * 20;
    context.strokeStyle = "white";
    context.fill();
    context.stroke();

    context.restore();
  }
}
