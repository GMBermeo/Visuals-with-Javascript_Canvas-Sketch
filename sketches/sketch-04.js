const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util");
const math = require("canvas-sketch-util/math");
const { noise2D, noise3D } = require("canvas-sketch-util/random");
const Tweakpane = require("tweakpane");

const settings = {
  dimensions: [1080 * 2, 1080 * 2],
  animate: true,
};

const params = {
  cols: 10,
  rows: 10,
  scaleMin: 0.1,
  scaleMax: 30,
  freq: 0.001,
  amp: 0.5,
  frame: 0,
  animate: true,
  lineCap: "butt",
};

const sketch = () => {
  return ({ context, width, height, frame }) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const cols = params.cols;
    const rows = params.rows;
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

      const f = params.animate ? frame : params.frame;
      // const n = noise2D(x + frame * 10, y, params.freq);
      const n = noise3D(x, y, f * 10, params.freq);

      const angle = n * Math.PI * params.amp;
      const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

      context.save();
      context.translate(x, y);
      context.translate(margx, margy);
      context.translate(cellw / 2, cellh / 2);
      context.rotate(angle);

      context.lineWidth = scale;
      context.lineCap = params.lineCap;

      context.beginPath();
      context.moveTo(w * -0.5, 0);
      context.lineTo(w * 0.5, 0);
      context.stroke();

      context.restore();
    }
  };
};
const createPane = () => {
  const pane = new Tweakpane.Pane();
  let folder;

  folder = pane.addFolder({ title: "Grid" });
  folder.addInput(params, "lineCap", {
    options: { butt: "butt", round: "round", square: "square" },
  });
  folder.addInput(params, "cols", { min: 5, max: 50, step: 1 });
  folder.addInput(params, "rows", { min: 5, max: 50, step: 1 });
  folder.addInput(params, "scaleMin", { min: 0.1, max: 100 });
  folder.addInput(params, "scaleMax", { min: 1, max: 100 });

  folder = pane.addFolder({ title: "Noise" });
  folder.addInput(params, "freq", { min: -0.01, max: 0.01 });
  folder.addInput(params, "amp", { min: 0, max: 0.5 });
  folder.addInput(params, "frame", { min: 1, max: 999 });
  folder.addInput(params, "animate");
};
createPane();
canvasSketch(sketch, settings);
