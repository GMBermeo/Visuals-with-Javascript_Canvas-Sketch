const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util");
const math = require("canvas-sketch-util/math");
const { noise2D } = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080 * 2, 1080 * 2],
  animate: true,
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const cols = 25;
    const rows = 25;
    const numCells = cols * rows;

    const gridw = width * 0.8;
    const gridh = height * 0.8;
    const cellw = gridw / cols;
    const cellh = gridh / rows;
    const margx = (width - gridw) / 2;
    const margy = (width - gridh) / 2;

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cellw;
      const y = row * cellh;
      const w = cellw * 0.8;
      const h = cellh * 0.8;

      const n = noise2D(x + frame * 10, y, 0.0001);
      const angle = n * Math.PI;
      const scale = math.mapRange(n, -1, 1, 0.1, 30);

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw / 2, cellh / 2);
      context.rotate(angle);

      context.lineWidth = scale;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};

canvasSketch(sketch, settings);
