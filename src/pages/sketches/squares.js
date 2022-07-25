let canvas = document.querySelector("canvas");
let context = canvas.getContext("2d");

context.fillStyle = "white";
context.fillRect(100, 100, 400, 400);

context.lineWidth = 2;
context.beginPath();
context.rect(100, 100, 400, 400);
// context.stroke();

context.beginPath();
context.arc(300, 300, 100, 0, Math.PI * 2);
// context.stroke();
let width = 60;
let height = 60;
let gap = 20;
let x, y;

for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 5; j++) {
    x = 100 + (width + gap) * i;
    y = 100 + (height + gap) * j;

    context.beginPath();
    context.rect(x, y, width, height);
    context.stroke();

    if (Math.random() > 0.5) {
      context.beginPath();
      context.rect(x + 8, y + 8, width - 16, height - 16);
      context.stroke();
    }
  }
}

Math.random(); // 0 ... 1

let year = 2042;
let nextYear = year + 1;

let dinner = "pasta";

let sentence = "Tonight, dinner will be " + dinner;

function saySomething(param) {
  console.log(param);
}

saySomething(sentence);

function add(a, b) {
  return a + b;
}

let result = add(5, 7);
console.log(result);

let multiply = (a, b) => {
  return a * b;
};

console.log(multiply(5, 7));

let years = [2040, 2041, 2042];
let menu = ["starter", "main", "dessert", "drinks", "sides"];

// Método for
for (let i = 0; i < menu.length; i++) {
  console.log(menu[i]);
}
// Método forEach
menu.forEach((item) => {
  console.log(item);
});

for (let i = 0; i < 10; i++) {
  years.push(2040 + i);
}

console.log(years);

const gravity = 9.81;
let velocity = 0.0;

// TASK
// Create an array of strings with your favorite bands or artists; write a function called listArtists() which iterates over the items of the array and logs them out to the console.
let bandas = [
  "Slipknot",
  "Fiddy",
  "Ego Kill Talent",
  "Deftones",
  "Linkin Park",
  "Royal Blood",
  "Tool",
  "Fresno",
  "Bjork",
  "Massive Attack",
  "Rage Against the Machine",
  "Fiona Apple",
];

function listArtists() {
  bandas.forEach((item) => {
    console.log(item);
  });
}
listArtists();
