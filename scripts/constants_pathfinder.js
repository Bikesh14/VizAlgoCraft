const widthRatio = 0.95;
const heightRatio = 0.9;

const fps = 75;
let scale = 25;
let offset = 2.5;

const canvasPathfinder = document.getElementById("canvas-pathfinder");
const context = canvasPathfinder.getContext("2d");

let width, height;
let board;

const randomMazeProbability = 0.32;
const weightValue = 1.5;

// Colors and images
const startImg = "src/img/start.svg";
const endImg = "src/img/goal.svg";

const diagonals = false;

let interrupt = false;
let isInProgress = false;

setSize();
board = new Board();
board.show();
