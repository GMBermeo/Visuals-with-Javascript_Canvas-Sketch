const canvasSketch = require("canvas-sketch");

const settings = {
  dimensions: [1920 * 2, 1920 * 2],
};

const matrix = 5;
const gap = matrix * 50;

const cols = matrix;
const rows = matrix;

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    // TASK (linha 33)
    // Invert the colors of the sketch. Use black for the background and white for the outlines.
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    context.lineWidth = width * 0.005;

    // let gap = width * 0.03;

    const marginx = width * 0.05;
    const marginy = height * 0.05;
    const off = width * 0.02;
    let w = (width * 0.9) / cols - gap;
    let h = (height * 0.9) / rows - gap;
    let x, y;

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        x = marginx + (w + gap) * i;
        y = marginy + (h + gap) * j;

        context.beginPath();
        context.rect(x, y, w, h);
        // context.strokeStyle = "black";
        context.fillStyle = "black";
        context.fill();
        // context.stroke();
        // context.shadowBlur = 200;
        // context.shadowColor = "#00000022";

        // if (Math.random() > 0.5) {
        //   context.beginPath();
        //   context.rect(x + off / 2, y + off / 2, w - off, h - off);
        //   // context.strokeStyle = "red";
        //   context.fill();
        //   context.stroke();
        // }
      }
    }
  };
};

canvasSketch(sketch, settings);
