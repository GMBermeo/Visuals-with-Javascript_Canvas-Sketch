import { gerarCorAleatoria, gerarCorMaterial } from "../CoresUtil.js";
const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

console.log(gerarCorAleatoria());
console.log(gerarCorMaterial());
console.log(gerarCorMaterial("900"));

const settings = {
  dimensions: [10000, 10000],
};

const goldenColors = ["#FFD600", "#FFAB00", "#FF6D00"];

const sketch = () => {
  return ({ context, width, height }) => {
    //Gradiente aleatório
    // const fill = context.createLinearGradient(0, 0, width, height);
    // fill.addColorStop(0, gerarCorMaterial("A400"));
    // fill.addColorStop(1, gerarCorMaterial("A400"));
    // context.fillStyle = fill;
    context.fillStyle = "black";

    context.fillRect(0, 0, width, height);

    const cx = width;
    const cy = height;

    let x = width;
    let y = height;

    const w = width * 0.01;
    const h = height * 0.1;

    const num = 1200;
    const radius = width * 0.9;

    for (let i = 0; i < num; i++) {
      const slice = math.degToRad(360 / num);
      const angle = slice * i;

      x = cx + radius * Math.sin(angle);
      y = cy + radius * Math.cos(angle);

      context.save();

      context.translate(x, y);
      context.rotate(-angle);
      // context.scale(random.range(0.1, 0.2), random.range(10, 30));

      context.beginPath();
      // context.fillStyle = gerarCorMaterial("A400");
      // context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
      // context.shadowBlur = 10;
      // context.shadowColor = "#00000022";
      context.fill();
      context.restore();

      context.save();
      context.translate(cx, cy);
      context.rotate(-angle);

      context.lineWidth = random.range(10, 22);

      context.beginPath();
      context.arc(
        0,
        0,
        radius * random.range(0.1, 2),
        slice * random.range(0, -6),
        slice * random.range(1, 200)
      );
      context.shadowBlur = 100;
      context.shadowColor = "#00000011";
      context.strokeStyle = gerarCorMaterial("A400");
      context.stroke();
      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
