const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1080 * 5, 1080 * 5],
};

let manager, image;

let emptySpaces = 0.5;
let fontSize = 3;
let fontFamily = "monospace";

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

      const value = (r + g + b) / 3;

      const glyph = getGlyph(r);

      // console.log("Teste Math.random(): " + Math.random());
      let randomChances = Math.random();
      let calculatedFontSize = cell * fontSize * (cols / 10);

      if (randomChances < 0.01) {
        context.font = `${
          calculatedFontSize * random.range(3, 7)
        }px ${fontFamily}`;
        console.log("🟩 if 0.01");
        // console.log(
        //   "🟩 if 0.01 grande " +
        //     Math.floor(cell * fontSize * random.range(5, 8))
        // );
      } else if (randomChances < 0.1) {
        context.font = `${
          calculatedFontSize * random.range(1, 2)
        }px ${fontFamily}`;
        console.log("🟨 if 0.1");
        // console.log(
        //   "🟨 if 0.5 menor " + Math.floor(cell * fontSize * random.range(1, 2))
        // );
      } else {
        context.font = `${
          calculatedFontSize / random.range(1, 8)
        }px ${fontFamily}`;
        console.log("🟥 else");
        // console.log(
        //   "🟥 else " + Math.floor((cell * fontSize) / random.range(1, 8))
        // );
      }

      //   (cell * fontSize) / random.range(0.5, 8)
      // }px ${fontFamily}`;
      // if (Math.random() < 0.00001)
      //   context.font = `${
      //     cell * fontSize * random.range(5, 10)
      //   }px ${fontFamily}`;
      // console.log("if 0.00001 grande" + cell * fontSize * random.range(5, 10));
      // if (Math.random() < 0.01)
      //   context.font = `${
      //     cell * fontSize * random.range(1, 2)
      //   }px ${fontFamily}`;
      // console.log("if 0.01 menor " + cell * fontSize * random.range(1, 2));

      context.fillStyle = `rgba(${r}, ${g}, ${b}, ${value / 255})`;

      context.save();
      context.translate(x, y);
      context.translate(cell * 0.5, cell * 0.5);

      // context.fillRect(0, 0, cell, cell);

      context.fillText(glyph, 0, 0);

      context.restore();
    }

    // context.drawImage(typeCanvas, 0, 0);
  };
};

const getGlyph = (v) => {
  const symbols = ".|-_=~:;,`^#-|_-".split("");
  const katakanas =
    "アイウエオカカカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン".split(
      ""
    );
  const kanjis =
    "⼀⼁⼂⼃⼄⺃⼅⼆⼇⼈⺅𠆢⼉⼊⼋⼌⼍⼎⼏⺇⼐⼑⺉⼒⼓⼔⼕⼖⼗⼘⼙⼚⼛⼜⼠⼡⼢⼣⼤⼥⼦⼧⼨⼩⺌⺐⼫⼬⼭⼮川⼯⼰⼱⼲⺓⼴⼵⼶⼷⼸⼹⺕⺔⼺⼻⺾⻌⻖⺍⺖⺘⺡⺨⼼⺗⼽⼾⼿⽀⽁⺙⽂⽃⽄⽅⽆⽇⽈⽉⺝⽊⽋⽌⽍⽎⽏⽐⽑⽒⽓⽔⽕⺣⽖⺤爫⽗⽘⽙⽚⽜⽝⺭㓁⺹⽞⽟⽡⽢⽣⽤⽥⽦⺪⽧⽨⽩⽪⽫⽬⽭⽮⽯⽰⽱⽲⽳⽴氺⺫𦉰⻂⺛⽵⺮⽶⽷⽸⽹⽺⺷羽⽻⽼⽽⽾⽿⾀⾁⾂⾃⾄⾅⾆⾇⾈⾉⾊⾋⾌⾍⾎⾏⾐⾑⻃⽠⾒⾓⾔⾕⾖⾗⾘⾙⾚⾛⾜⻊⾝⾞⾟⾠⾡⾢⾣⾤⾥⾂⻨⾦⻑⾨⾩⾪⾫⾬⻗⾭⻘⾮⻟⻫⾯⾰⾲⾳⾴⾵⾶⾷⾸⾹⾺⾻⾼⾽⾾⾿⿀⿁⾱⿂⿃⿄⿅⿆⿇⻩黒⻲⿈⿉⿊⿋⻭⿌⿍⿎⿏⿐⿑⿒⿓⿔⿕".split(
      ""
    );
  // if (v < 50) return "|";
  // if (v < 100) return "-";
  if (Math.random() >= emptySpaces) return "";
  if (Math.random() <= 0.01) return random.pick(kanjis);
  return random.pick(katakanas);
  // if (Math.random() >= 0.1) return "-";
  // if (Math.random() >= 0.005) return random.pick(symbols);
  // if (Math.random() >= 0.5) return "-";
  // if (v < 210) return "=";
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
  // const url = "neon-avatar-abstract-500.jpg";
  const url = "avatar3.jpg";
  // const url = ("https://picsum.photos/200");
  image = await loadMeSomeImage(url);
  manager = await canvasSketch(sketch, settings);
};

start();
// ⼀⼁⼂⼃⼄⺃⼅⼆⼇⼈⺅𠆢⼉⼊⼋⼌⼍⼎⼏⺇⼐⼑⺉⼒⼓⼔⼕⼖⼗⼘⼙⼚⼛⼜⼠⼡⼢⼣⼤⼥⼦⼧⼨⼩⺌⺐⼫⼬⼭⼮川⼯⼰⼱⼲⺓⼴⼵⼶⼷⼸⼹⺕⺔⼺⼻⺾⻌⻖⺍⺖⺘⺡⺨⼼⺗⼽⼾⼿⽀⽁⺙⽂⽃⽄⽅⽆⽇⽈⽉⺝⽊⽋⽌⽍⽎⽏⽐⽑⽒⽓⽔⽕⺣⽖⺤爫⽗⽘⽙⽚⽜⽝⺭㓁⺹⽞⽟⽡⽢⽣⽤⽥⽦⺪⽧⽨⽩⽪⽫⽬⽭⽮⽯⽰⽱⽲⽳⽴氺⺫𦉰⻂⺛⽵⺮⽶⽷⽸⽹⽺⺷羽⽻⽼⽽⽾⽿⾀⾁⾂⾃⾄⾅⾆⾇⾈⾉⾊⾋⾌⾍⾎⾏⾐⾑⻃⽠⾒⾓⾔⾕⾖⾗⾘⾙⾚⾛⾜⻊⾝⾞⾟⾠⾡⾢⾣⾤⾥⾂⻨⾦⻑⾨⾩⾪⾫⾬⻗⾭⻘⾮⻟⻫⾯⾰⾲⾳⾴⾵⾶⾷⾸⾹⾺⾻⾼⾽⾾⾿⿀⿁⾱⿂⿃⿄⿅⿆⿇⻩黒⻲⿈⿉⿊⿋⻭⿌⿍⿎⿏⿐⿑⿒⿓⿔⿕
// アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン
// const canvasSketch = require("canvas-sketch");
// const random = require("canvas-sketch-util/random");

// const settings = {
//   dimensions: [2048, 2048],
// };
// let manager;

// let text = "DTI";
// let fontSize = 1200;
// let fontFamily = "serif";

// const typeCanvas = document.createElement("canvas");
// const typeContext = typeCanvas.getContext("2d");

// const sketch = ({ context, width, height }) => {
//   const cell = 20;
//   const cols = Math.floor(width / cell);
//   const rows = Math.floor(height / cell);
//   const numCells = cols * rows;

//   typeCanvas.width = cols;
//   typeCanvas.height = rows;

//   return ({ context, width, height }) => {
//     typeContext.fillStyle = "black";
//     typeContext.fillRect(0, 0, width, height);

//     fontSize = cols * 0.5;

//     typeContext.fillStyle = "white";
//     typeContext.font = `${fontSize}px ${fontFamily}`;
//     typeContext.textBaseline = "top";

//     const metrics = typeContext.measureText(text);
//     const mx = metrics.actualBoundingBoxLeft * -1;
//     const my = metrics.actualBoundingBoxAscent * -1;
//     const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
//     const mh = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxDescent;

//     const tx = (cols - mw) / 2 - mx;
//     const ty = (rows - mh) / 2 - my;

//     typeContext.save();
//     typeContext.translate(tx, ty);

//     typeContext.beginPath();
//     typeContext.rect(mx, my, mw, mh);
//     typeContext.stroke();

//     typeContext.fillText(text, 0, 0);
//     typeContext.restore();

//     const typeData = typeContext.getImageData(0, 0, cols, rows).data;

//     //Gradiente azul
//     var grd = context.createLinearGradient(0, 90, width, height);
//     grd.addColorStop(0, "#0d47a1");
//     grd.addColorStop(1, "#0e4ead");

//     // Fundo
//     context.fillStyle = grd;
//     context.fillRect(0, 0, width, height);

//     context.textBaseline = "middle";
//     context.textAlign = "center";

//     // context.drawImage(typeCanvas, 0, 0);

//     for (let i = 0; i < numCells; i++) {
//       const col = i % cols;
//       const row = Math.floor(i / cols);

//       const x = col * cell;
//       const y = row * cell;

//       const r = typeData[i * 4 + 0];
//       const g = typeData[i * 4 + 1];
//       const b = typeData[i * 4 + 2];
//       const a = typeData[i * 4 + 3];

//       const glyph = getGlyph(r);

//       context.font = `${cell * (3 * Math.random())}px ${fontFamily}`;

//       if (Math.random() < 0.1) {
//         context.font = `${cell * 5}px ${fontFamily}`;
//       }

//       // context.fillStyle = `rgb(${r},${g},${b},${a})`;
//       context.fillStyle = "white";

//       context.save();
//       context.translate(x, y);
//       context.translate(cell / 2, cell / 2);
//       // context.fillRect(0, 0, cell, cell);

//       //   // círculos
//       // context.beginPath();
//       // context.arc(0, 0, cell / 2, 0, Math.PI * 2);
//       // context.fill();

//       context.fillText(glyph, 0, 0);

//       context.restore();
//     }
//   };
// };
// const getGlyph = (v) => {
//   if (v < 50) return "";
//   // if (v < 100) return ".";
//   // if (v < 150) return "-";
//   // if (v < 200) return "+";
//   if (v > 230 && v < 245) {
//     if (Math.random() < 0.1) {
//       return "caranguejo";
//     }
//   }
//   if (v > 240 && v < 250)
//     if (Math.random() < 0.1) {
//       return "curitibano";
//     }
//   // if (v < 255) return "points";

//   const katakanas = "_=/|˜.DTIdt i".split("");

//   return random.pick(katakanas);
// };

// const onKeyUp = (e) => {
//   text = e.key.toUpperCase();
//   manager.render();
// };

// document.addEventListener("keyup", onKeyUp);

// const start = async () => {
//   manager = await canvasSketch(sketch, settings);
// };
// start();
