import { gerarCorAleatoria, gerarCorMaterial } from "../CoresUtil.js";
const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

console.log(gerarCorAleatoria());
console.log(gerarCorMaterial());
console.log(gerarCorMaterial("900"));

const settings = {
  dimensions: [1920 * 2, 1920 * 2],
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.5;

    let x = width * 0.5;
    let y = height * 0.5;

    const w = width * 0.01;
    const h = height * 0.1;

    const num = 30;
    const radius = width * 0.3;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();

      context.translate(x, y);
      context.rotate(-angle);
      context.scale(random.range(0.1, 2), random.range(0.2, 0.9));

      context.beginPath();
      // context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
      context.rect(
        random.range(1, -h * 0.5),
        random.range(1, -h * 0.5),
        w * 3,
        h * 1
      );
      context.shadowBlur = 50;
      context.shadowColor = "#00000011";
      context.fillStyle = "white";
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(50, 200);

      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0.01, 1.5),
        slice * random.range(0, -8),
        slice * random.range(1, 20)
      );
      context.shadowBlur = 100;
      context.shadowColor = "#00000011";
      context.strokeStyle = "white";

      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
