import { gerarCorAleatoria, gerarCorMaterial } from "../CoresUtil.js";
const canvasSketch = require("canvas-sketch");
const math = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

// console.log(gerarCorAleatoria());
// console.log(gerarCorMaterial());
// console.log(gerarCorMaterial("900"));

const settings = {
  dimensions: [1920 * 2, 1920 * 2],
  animate: false,
};

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
