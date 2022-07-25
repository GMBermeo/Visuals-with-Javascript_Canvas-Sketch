const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.fillStyle = "black";

    const cx = width / 2;
    const cy = height / 2;

    const w = width * 0.05;
    const h = height * 0.1;

    let x, y;

    const num = 93;
    const radius = width * 0.1;

    const line = context.createLinearGradient(0, 0, w * 0.5, h * 0.9);
    line.addColorStop(0, "orange");
    line.addColorStop(1, "red");

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();
      context.translate(x, y);
      context.rotate(-angle * 180);
      context.scale(random.range(0, 0.3), random.range(0.1, -0.99));

      context.beginPath();
      context.rect(-w * 20, random.range(0, -h * 0.9), w * 0.5, h);
      //context.fillStyle = line;
      context.fill();

      context.restore();

      // arcs II
      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(1, 32);

      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0.1, 2.2),
        slice * random.range(0, -50.9),
        slice * random.range(1, -45)
      );
      context.strokeStyle = line;

      context.stroke();
      context.restore();
      //
    }
  };
};

canvasSketch(sketch, settings);
