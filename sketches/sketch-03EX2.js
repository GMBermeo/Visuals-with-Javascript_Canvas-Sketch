const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080, 1080],
  animate: true,
  fps: 60,
  duration: 5,
  playbackRate: "throttle",
  loop: true,
};

const sketch = ({ width, height }) => {
  //First array for radius, second for startAngle, last for endAngle
  const arcRanges = [
    [0.5, 1.5],
    [1, -8],
    [1, 5],
  ];
  const arcArray = [];
  const numOfArcs = 50;
  const cx = width * 0.5;
  const cy = height * 0.5;
  const radius = width * 0.3;
  const colorArray = [
    "#2DF0D6",
    "#F090C4",
    "#F60C4C",
    "#1FB4FF",
    "#c8c8cd",
    "#292E3D",
  ];

  for (let i = 0; i < numOfArcs; i++) {
    const x = width * 0.5;
    const y = width * 0.5;
    const radius = width * 0.3 * random.range(arcRanges[0][0], arcRanges[0][1]);
    const startAngle = math.degToRad(random.range(0, 360));
    const endAngle = startAngle + math.degToRad(random.range(30, 40));
    const lineWidth = random.range(5, 10);

    arcArray.push(new Arc(x, y, radius, startAngle, endAngle, lineWidth));
  }
  let clock = new Clock(cx, cy, 40, radius, height * 0.1);
  let colorTracker = new ColorTracker(colorArray);

  return ({ context, width, height, playhead }) => {
    let colors = colorTracker.colorUpdate(playhead);
    context.fillStyle = colors[0];
    context.fillRect(0, 0, width, height);
    context.fillStyle = colors[1];

    arcArray.forEach((arc) => {
      arc.update(playhead);
      arc.draw(context);
    });
    clock.draw(context, width, height, playhead);
  };
};

canvasSketch(sketch, settings);

class ColorTracker {
  constructor(colorArray) {
    this.colorArray = colorArray;
    this.frameColors = [random.pick(colorArray), random.pick(colorArray)];

    while (this.frameColors[0] === this.frameColors[1]) {
      this.frameColors[0] = random.pick(colorArray);
    }

    this.scheduledChanges = settings.duration;
    this.fraction = 1 / this.scheduledChanges;
    this.currentFraction = 0;
  }

  colorUpdate(playhead) {
    if (this.currentFraction > 0.8 && playhead < this.fraction) {
      this.currentFraction = 0;
    }

    if (playhead > this.currentFraction) {
      let newColors = [this.frameColors[0], this.frameColors[1]];

      while (
        newColors[0] === this.frameColors[0] ||
        newColors[1] === this.frameColors[1] ||
        newColors[0] === newColors[1]
      ) {
        newColors[0] = random.pick(this.colorArray);
        newColors[1] = random.pick(this.colorArray);
      }
      this.currentFraction = this.currentFraction + this.fraction;
      this.frameColors = newColors;
      return newColors;
    } else {
      return this.frameColors;
    }
  }
}

class Arc {
  constructor(x, y, radius, startAngle, endAngle, lineWidth) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.lineWidth = lineWidth;
    this.speedMod = random.range(0.5, 5);
  }

  draw(context) {
    context.lineWidth = this.lineWidth;

    context.beginPath();
    context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    context.stroke();
  }

  update() {
    this.startAngle =
      this.startAngle +
      ((2 * Math.PI) / settings.duration / settings.fps) * this.speedMod;
    this.endAngle =
      this.endAngle +
      ((2 * Math.PI) / settings.duration / settings.fps) * this.speedMod;
  }
}

class Clock {
  constructor(x, y, slices, radius, height) {
    this.x = x;
    this.y = y;
    this.slices = slices;
    this.radius = radius;
    this.valuesToUse = this.generateClock(height);
  }

  generateClock(h) {
    let randomValues = [[], [], [], []];
    for (let i = 0; i < this.slices; i++) {
      randomValues[0].push(random.range(0.5, 2));
      randomValues[1].push(random.range(1, 2));
      randomValues[2].push(random.range(-h * 0.2, -h * 0.25));
      randomValues[3].push(
        random.pick([random.range(-1, -0.5), random.range(0.5, 1)])
      );
    }
    return randomValues;
  }

  draw(context, width, height, playhead) {
    const w = width * 0.007;
    const h = height * 0.05;
    for (let i = 0; i < this.slices; i++) {
      const currentSlice = math.degToRad(360 / this.slices);
      const angle = currentSlice * i + 2 * Math.PI * playhead;

      let currentX = this.x + this.radius * Math.sin(angle);
      let currentY = this.y + this.radius * Math.cos(angle);

      context.save();
      context.translate(currentX, currentY);
      context.rotate(-angle);
      context.scale(this.valuesToUse[0][i], this.valuesToUse[1][i]);

      context.beginPath();
      context.rect(
        -w * 0.5,
        this.valuesToUse[2][i] *
          this.valuesToUse[3][i] *
          Math.sin(4 * Math.PI * playhead),
        w,
        h
      );
      context.fill();
      context.restore();
    }
  }
}

// // Tentativa 2
// const sketch = ({ context, width, height }) => {
//   const agents = [];
//   const cx = width * 0.5;
//   const cy = height * 0.5;

//   let x = width * 0.5;
//   let y = height * 0.5;

//   const w = width * 0.01;
//   const h = height * 0.1;

//   const num = 30;
//   const radius = width * 0.3;

//   for (let i = 0; i < num; i++) {
//     const slice = math.degToRad(360 / num);
//     const angle = slice * i;

//     console.log(num, slice, angle);

//     x = cx + radius * Math.sin(angle);
//     y = cy + radius * Math.cos(angle);
//     agents.push(new Agent(x, y, angle, cx, cy, slice, num));
//   }

//   return ({ context, width, height }) => {
//     context.fillStyle = "white";
//     context.fillRect(0, 0, width, height);

//     console.log(agents);

//     agents.forEach((agent) => {
//       // agent.update();
//       agent.draw(context, width, height);
//     });
//   };
// };

// canvasSketch(sketch, settings);

// class Agent {
//   constructor(x, y, cx, cy, angle, scalex, scaley, slice, num) {
//     this.x = x;
//     this.y = y;
//     this.cx = cx;
//     this.cy = cy;
//     this.slice = slice;
//     this.angle = angle;
//     this.scalex = random.range(0.1, 2);
//     this.scaley = random.range(0.2, 0.9);
//   }
//   draw(context, width, height) {
//     const w = width * 0.01;
//     const h = height * 0.1;
//     context.save();

//     context.translate(this.x, this.y);
//     context.rotate(-this.angle);
//     context.scale(this.scalex, this.scaley);

//     context.beginPath();
//     // context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
//     context.rect(
//       random.range(1, -h * 0.5),
//       random.range(1, -h * 0.5),
//       w * 3,
//       h * 1
//     );
//     context.shadowBlur = 50;
//     context.shadowColor = "#00000011";
//     context.fillStyle = "black";
//     context.fill();
//     context.restore();

//     context.save();
//     context.translate(this.cx, this.cy);
//     context.rotate(-this.angle);

//     context.lineWidth = random.range(50, 200);

//     context.beginPath();
//     context.arc(
//       0,
//       0,
//       this.radius * random.range(0.01, 1.5),
//       this.slice * random.range(0, -8),
//       this.slice * random.range(1, 20)
//     );
//     context.shadowBlur = 100;
//     context.shadowColor = "#00000022";
//     context.strokeStyle = "white";

//     context.stroke();

//     context.restore();
//   }
// }

// // Tentativa 1
// const sketch = () => {
//   return ({ context, width, height }) => {
//     const agents = [];

//     context.fillStyle = "white";
//     context.fillRect(0, 0, width, height);

//     const cx = width * 0.5;
//     const cy = height * 0.5;

//     let x = width * 0.5;
//     let y = height * 0.5;

//     const w = width * 0.01;
//     const h = height * 0.1;

//     const num = 30;
//     const radius = width * 0.3;

//     for (let i = 0; i < num; i++) {
//       const slice = math.degToRad(360 / num);
//       const angle = slice * i;
//       x = cx + radius * Math.sin(angle);
//       y = cy + radius * Math.cos(angle);
//       agents.push(
//         new Agent(context, x, y, slice, i, cx, cy, radius, h, w, angle)
//       );
//     }
//     agents.forEach((agent) => {
//       agent.draw(context);
//     });
//     console.log(agents);
//   };
// };

// canvasSketch(sketch, settings);

// class Vector {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }
// }

// class Agent {
//   constructor(x, y) {
//     this.pos = new Vector(x, y);
//     // this.vel = new Vector(random.range(-1, 1), random.range(-1, 1));
//     this.slice;
//     this.angle;
//     this.radius = random.range(4, 12);
//   }

//   draw(context, x, y, slice, cx, cy, radius, h, w, angle) {
//     context.save();

//     context.translate(x, y);
//     context.rotate(-angle);
//     context.scale(random.range(0.1, 2), random.range(0.2, 0.9));

//     context.beginPath();
//     // context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
//     context.rect(
//       random.range(1, -h * 0.5),
//       random.range(1, -h * 0.5),
//       w * 3,
//       h * 1
//     );
//     context.shadowBlur = 50;
//     context.shadowColor = "#00000011";
//     context.fillStyle = "black";
//     context.fill();
//     context.restore();

//     context.save();
//     context.translate(cx, cy);
//     context.rotate(-angle);

//     context.lineWidth = random.range(50, 200);

//     context.beginPath();
//     context.arc(
//       0,
//       0,
//       radius * random.range(0.01, 1.5),
//       slice * random.range(0, -8),
//       slice * random.range(1, 20)
//     );
//     context.shadowBlur = 100;
//     context.shadowColor = "#00000022";
//     context.strokeStyle = "white";

//     context.stroke();

//     context.restore();
//   }
// }

// // console.log("Agent:" + agent);
