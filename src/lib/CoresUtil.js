const materialDesignColors = [
  {
    name: "Red",
    700: "#D32F2F",
    900: "#B71C1C",
    A700: "#D50000",
    A400: "#FF1744",
  },
  {
    name: "Blue",
    700: "#1976D2",
    900: "#0D47A1",
    A700: "#2962FF",
    A400: "#2979FF",
  },
  {
    name: "Cyan",
    700: "#0097A7",
    900: "#006064",
    A700: "#00B8D4",
    A400: "#00E5FF",
  },
  {
    name: "Teal",
    700: "#00796B",
    900: "#004D40",
    A700: "#00BFA5",
    A400: "#ADE9B6",
  },
  {
    name: "Green",
    700: "#388E3C",
    900: "#1B5E20",
    A700: "#00C853",
    A400: "#00E676",
  },
  {
    name: "Light Green",
    700: "#689F38",
    900: "#33691E",
    A700: "#64DD17",
    A400: "#76FF03",
  },
  {
    name: "Purple",
    700: "#7B1FA2",
    900: "#4A148C",
    A700: "#AA00FF",
    A400: "#D500F9",
  },
  {
    name: "Yellow",
    700: "#FBC02D",
    900: "#F57F17",
    A700: "#FFD600",
    A400: "#FFEA00",
  },
  {
    name: "Amber",
    700: "#FFA000",
    900: "#FF6F00",
    A700: "#FFAB00",
    A400: "#FFC400",
  },
  {
    name: "Orange",
    700: "#F57C00",
    900: "#E65100",
    A700: "#FF6D00",
    A400: "#FF9D00",
  },
  {
    name: "Deep Orange",
    700: "#E64A19",
    900: "#BF360C",
    A700: "#DD2C00",
    A400: "#FF3D00",
  },
];
const hexes = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
];

//Cor aleatória
export function gerarCorAleatoria() {
  var corAleatoria = "#";
  for (let i = 0; i < 6; i++) {
    let random = Math.floor(Math.random() * hexes.length);
    corAleatoria += hexes[random];
  }
  return corAleatoria;
}

//Cor aleatória Material Design
export function gerarCorMaterial(tom = "A700") {
  let random = Math.floor(Math.random() * materialDesignColors.length);
  return materialDesignColors[random][tom];
}

//Testes (remover export)
// console.log("Gerador de cor aleatória: " + gerarCorAleatoria());
// console.log("Material Design: " + gerarCorMaterial("A700"));
