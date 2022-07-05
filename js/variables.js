var timeout = null;
var rows = 20;
var cols = 50;
var grid;

const pathfinderState = {
    null: "null",
    started: 'started',
    creatingMaze: 'creatingMaze',
    resettingWalls: 'resettingWalls',
    needsReset: 'needsReset',
}
var currentPathfinderState = "null";
var creatingMaze = currentPathfinderState === "creatingMaze";
var running = currentPathfinderState === "started";
var needsReset = currentPathfinderState === "needsReset";
var _null = currentPathfinderState === "null";
var resettingWalls = currentPathfinderState === "resettingWalls";

const pathfinderOptions = {
    null: '',
    AStar: 'AStar',
    Dijkstra: 'Dijkstra',
}
var selectedPathfinder = "null";

const resetNodes = document.querySelector('.reset-nodes');
const start = document.querySelector('.startBtn');
const resetWalls = document.querySelector('.reset-walls');
const createMaze = document.querySelector('.create-maze');
const dropdwon = document.querySelector('.dropdown');