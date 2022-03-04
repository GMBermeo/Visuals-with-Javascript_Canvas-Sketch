const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
};

let manager, image;

let text = "A";
let fontSize = 1200;
let fontFamily = "sans-serif";

const typeCanvas = document.createElement("canvas");
const typeContext = typeCanvas.getContext("2d");

const sketch = ({ context, width, height }) => {
  const cell = 20;
  const cols = Math.floor(width / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;

  typeCanvas.width = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    typeContext.fillStyle = "black";
    typeContext.fillRect(0, 0, cols, rows);

    typeContext.save();
    typeContext.drawImage(image, 0, 0, cols, rows); // draw image
    typeContext.restore();

    const typeData = typeContext.getImageData(0, 0, cols, rows).data;

    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    context.textBaseline = "middle";
    context.textAlign = "center";

    for (let i = 0; i < numCells; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);

      const x = col * cell + random.range(-cell, cell) * 0.5;
      const y = row * cell + random.range(-cell, cell) * 0.5;

      const r = typeData[i * 4 + 0];
      const g = typeData[i * 4 + 1];
      const b = typeData[i * 4 + 2];
      const a = typeData[i * 4 + 3];

      const glyph = getGlyph(r);

      context.font = `${cell * 2}px ${fontFamily}`;
      if (Math.random() < 0.1) context.font = `${cell * 6}px ${fontFamily}`;

      context.fillStyle = "white";

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);

      // context.fillRect(0, 0, cell, cell);

      context.fillText(glyph, 0, 0);

      context.restore();
    }

    context.drawImage(typeCanvas, 0, 0);
  };
};

const getGlyph = (v) => {
  if (v < 50) return "";
  if (v < 100) return "-";
  if (v < 150) return "—";
  if (v < 200) return "=";

  const glyphs =
    "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン".split(
      ""
    );

  return random.pick(glyphs);
};

const onKeyUp = (e) => {
  // text = e.key.toUpperCase();
  // manager.render();
};

// document.addEventListener('keyup', onKeyUp);

const loadMeSomeImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject();
    img.src = url;
  });
};

const start = async () => {
  const url = "neon-avatar-abstract-500.jpg";
  image = await loadMeSomeImage(url);
  manager = await canvasSketch(sketch, settings);
};

start();

// const canvasSketch = require("canvas-sketch");
// const random = require("canvas-sketch-util");
// const math = require("canvas-sketch-util/math");
// const { noise2D, noise3D } = require("canvas-sketch-util/random");
// const Tweakpane = require("tweakpane");

// const settings = {
//   dimensions: [1080 * 9, 1080 * 9],
//   animate: true,
// };

// const params = {
//   cols: 10,
//   rows: 10,
//   scaleMin: 0.1,
//   scaleMax: 30,
//   freq: 0.001,
//   amp: 0.5,
//   frame: 0,
//   speed: 10,
//   animate: false,
//   lineCap: "round",
// };

// const sketch = () => {
//   return ({ context, width, height, frame }) => {
//     context.fillStyle = "white";
//     context.fillRect(0, 0, width, height);

//     const cols = params.cols;
//     const rows = params.rows;
//     const numCells = cols * rows;

//     const gridw = width * 0.8;
//     const gridh = height * 0.8;
//     const cellw = gridw / cols;
//     const cellh = gridh / rows;
//     const margx = (width - gridw) / 2;
//     const margy = (width - gridh) / 2;

//     for (let i = 0; i < numCells; i++) {
//       const col = i % cols;
//       const row = Math.floor(i / cols);

//       const x = col * cellw;
//       const y = row * cellh;
//       const w = cellw * 0.8;
//       const h = cellh * 0.8;

//       const f = params.animate ? frame : params.frame;
//       // const n = noise2D(x + frame * 10, y, params.freq);
//       var avatarMap = new Image(100, 200);
//       avatarMap.src = 'picture.jpg';
//       // const n = noise3D(x, y, f * params.speed, params.freq);
//       const n = avatarMap;

//       const angle = n * Math.PI * params.amp;
//       const scale = math.mapRange(n, -1, 1, params.scaleMin, params.scaleMax);

//       context.save();
//       context.translate(x, y);
//       context.translate(margx, margy);
//       context.translate(cellw / 2, cellh / 2);
//       context.rotate(angle);

//       context.lineWidth = scale;
//       context.lineCap = params.lineCap;

//       context.beginPath();
//       context.moveTo(w * -0.5, 0);
//       context.lineTo(w * 0.5, 0);
//       context.stroke();

//       context.restore();
//     }
//   };
// };
// const createPane = () => {
//   const pane = new Tweakpane.Pane();
//   let folder;

//   folder = pane.addFolder({ title: "Grid" });
//   folder.addInput(params, "lineCap", {
//     options: { butt: "butt", round: "round", square: "square" },
//   });
//   folder.addInput(params, "cols", { min: 5, max: 50, step: 1 });
//   folder.addInput(params, "rows", { min: 5, max: 50, step: 1 });
//   folder.addInput(params, "scaleMin", { min: 0.1, max: 100 });
//   folder.addInput(params, "scaleMax", { min: 1, max: 100 });

//   folder = pane.addFolder({ title: "Noise" });
//   folder.addInput(params, "freq", { min: -0.01, max: 0.01 });
//   folder.addInput(params, "amp", { min: 0, max: 0.5 });
//   folder.addInput(params, "frame", { min: 1, max: 999 });
//   folder.addInput(params, "speed", { min: 10, max: 100 });
//   folder.addInput(params, "animate");
// };
// createPane();
// canvasSketch(sketch, settings);
