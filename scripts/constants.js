const custom_green = "#408C7D";
const theme_color = "#BB9CC0";
const custom_white = "#F8F4E3";
const custom_black = "#1E3050";
const custom_pivot = "#1DF3FD";
const custom_blue = "#67729D";
const custom_yellow = "#ffdf00";
const custom_orange = "#cc7722";
const custom_alert_color = "#ff4545";

// from pathfinding visualization
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
const startImg = "static/image/start.svg";
const endImg = "static/image/goal.svg";

const activeColor = "#ff304f";
const discoveredColor = "#98FB98";
const visitedColor = "#EDC8FE";
const wallColor = "#343837";

const weightBorder = "#02066F";
const defaultBorder = "#247AFD";
const defaultColor = "#f5f5f5";

const pathColor = "#01F9C6";
const pathLineColor = "#ff304f";
let interrupt = false;
let isInProgress = false;
