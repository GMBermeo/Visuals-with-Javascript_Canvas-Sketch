const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
import { gerarCorAleatoria, gerarCorMaterial } from "../CoresUtil.js";

const settings = {
  dimensions: [1920 * 8, 1920 * 8],
};

const matrix = Math.floor(random.range(3, 10));

console.log(matrix);

const cols = matrix;
const rows = matrix;

const sketch = () => {
  return ({ context, width, height }) => {
    const eightPercent = width * 0.008;
    const thirtyPercent = width * 0.03;

    const gap =
      matrix * Math.floor(random.range(eightPercent / 2, eightPercent));
    context.fillStyle = "#FFF";
    // TASK (linha 33)
    // Invert the colors of the sketch. Use black for the background and white for the outlines.
    // context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    // context.lineWidth = width * 0.005;

    // let gap = width * 0.03;

    const marginx = width * 0.05;
    const marginy = height * 0.05;
    const off = width * 0.02;
    let w = (width * 0.9) / cols - (gap * (cols - 1)) / cols;
    console.log(w);
    let h = (height * 0.9) / rows - (gap * (rows - 1)) / rows;
    let x, y;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        x = marginx + (w + gap) * i;
        y = marginy + (h + gap) * j;
        console.log(marginx, marginy, gap, w);
        console.log("X, Y : " + x, y);

        // context.save();
        context.beginPath();
        context.rect(x, y, w, h);
        if (Math.random() >= 0.5) {
          context.shadowOffsetX = -gap / 10;
          context.shadowOffsetY = -gap / 10;
          context.shadowColor = "white";
          context.shadowBlur = thirtyPercent;
          // context.shadowColor = "#0000001a";
          context.fill();
          context.shadowOffsetX = gap / 10;
          context.shadowOffsetY = gap / 10;
          context.shadowColor = "#00000011";
          context.shadowBlur = thirtyPercent;
          context.fillStyle = "white";
          context.fill();
        } else {
          // context.shadowColor = "#00000011";
          // context.shadowBlur = thirtyPercent / 3;
          context.lineWidth = thirtyPercent / 3;
          context.strokeStyle = "white";
          context.stroke();
        }
        // if (Math.random() > 0.2) {
        //   context.beginPath();
        //   context.rect(
        //     x + w / 4,
        //     y + h / 4,
        //     w / Math.floor(random.range(2, 8)),
        //     h / Math.floor(random.range(2, 8))
        //   );
        //   let corNeon = gerarCorMaterial("A400");
        //   context.shadowColor = corNeon;
        //   context.shadowBlur = 10;
        //   // context.shadowColor = "#0000001a";
        //   context.fillStyle = corNeon;

        //   // context.lineWidth = 50;
        //   // context.strokeStyle = corNeon;
        //   // context.stroke();
        //   context.fill();
        // }
        // context.restore();
      }

      // context.stroke();
    }
  };
};

canvasSketch(sketch, settings);
