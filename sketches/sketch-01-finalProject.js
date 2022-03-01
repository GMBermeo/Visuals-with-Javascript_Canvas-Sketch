const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1920 * 2, 1920 * 2],
};

const matrix = Math.floor(random.range(3, 10));
// const matrix = 10;
console.log(matrix);
const gap = matrix * Math.floor(random.range(25, 50));
// const gap = 0;

const cols = matrix;
const rows = matrix;

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "white";
    // TASK (linha 33)
    // Invert the colors of the sketch. Use black for the background and white for the outlines.
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);
    // context.lineWidth = width * 0.005;

    // let gap = width * 0.03;

    const marginx = width * 0.05;
    const marginy = height * 0.05;
    // const off = width * 0.02;
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

        context.save();
        context.fillStyle = "red";
        context.fillRect(marginx, marginy, w, h);
        context.beginPath();
        context.rect(x, y, w, h);
        // context.strokeStyle = "black";
        context.fillStyle = "white";
        context.fill();
        context.restore();
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
