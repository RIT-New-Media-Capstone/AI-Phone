import * as firebase from "./firebase.js";
import * as ai from "./ai.js";
// import {loadLayersModel} from '@tensorflow/tfjs';

let isDrawing = false;
let mousePos = { x: undefined, y: undefined };
let timeofLine = 0;
let timeOfPoint = 0;
let startofLine;

//[{x,y}, {}]

let coords = [];

let height;
let width;

let canvas;
let ctx;

let x;
let y;

let roomID;
let playerName;

const init = () => {
    // Canvas
    canvas = document.querySelector('#myCanvas');
    ctx = canvas.getContext('2d');
    const submitDrawingbtn = document.querySelector('#submit-drawing');
    width = canvas.width;
    height = canvas.height;

    roomID = localStorage.getItem("id");
    playerName = localStorage.getItem("playerName");

    document.querySelector('#room-id-display').innerHTML="Room ID: "+roomID;
    document.querySelector('#player-name').innerHTML="Player: " + playerName;


    console.log(roomID);

    // New line started
    canvas.addEventListener("mousedown", (e) => {
        x = mousePos.x;
        y = mousePos.y;
        isDrawing = true;
        startofLine = e.timeStamp;
        recordCoor(e);
    });

    // Line drawn
    canvas.addEventListener('mousemove', (e) => {
        mousePos = getMousePos(canvas, e);
        if (isDrawing) {
            drawLine(ctx, x, y, mousePos.x, mousePos.y);
            x = mousePos.x;
            y = mousePos.y;
            //addToArray(x, y, e);

            recordCoor(e);

        }
    });

    // Line ended
    canvas.addEventListener("mouseup", (e) => {
        isDrawing = false;
        recordCoor(e);
        //addToArray(x, y, e);

    });

    // Submit drawing
    submitDrawingbtn.addEventListener("click", function () {
        submitDrawing(ctx, width, height, coords);
    }, false);

    mousePos.x = 0;
    mousePos.y = 0;


}

// get time at start of line then subtract from time at mouse up
const getMousePos = (canvas, evt) => {
    const rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};

const drawLine = (context, x1, y1, x2, y2) => {
    context.beginPath();
    context.strokeStyle = "rgb(106, 107, 157)";
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
};

const submitDrawing = async (context) => {
    //send drawing to firebase and AI
    //clear drawingArray
    //clear cavas
    const mbb = getMinBox()
    const dpi = window.devicePixelRatio;
    const imgData = context.getImageData(mbb.min.x * dpi, mbb.min.y * dpi, (mbb.max.x - mbb.min.x) * dpi, (mbb.max.y - mbb.min.y) * dpi);
    console.log(imgData)
    // send to Firebase with raw coords
    // Firebase doesn't support imageData type
    let p = await firebase.getGameData(roomID, "players");
    let round = await firebase.getGameData(roomID, "currentRound");
    firebase.addDrawingData(roomID, coords, round, p[0]);

    // send to AI with imgData type
    // send imgData
    let processedImg = ai.preProcess(imgData);
    console.log(ai.pred(processedImg))

    context.clearRect(0, 0, width, height);

    coords = [];


};

const getMinBox = () => {
    let coorX = coords.map((p) => p.x);
    let coorY = coords.map((p) => p.y);

    // Find top left corner
    let min_coords = {
        x: Math.min(...coorX),
        y: Math.min(...coorY)
    };

    // Find right bottom corner
    let max_coords = {
        x: Math.max(...coorX),
        y: Math.max(...coorY)
    };

    return {
        min: min_coords,
        max: max_coords
    };
};

const recordCoor = (event) => {
    // Get current mouse coordinate
    // let pointer = ctx.getPointer(event.e);
    let posX = mousePos.x;
    let posY = mousePos.y;

    // Record the point if within the canvas and the mouse is pressed
    if (posX >= 0 && posY >= 0) {
        coords.push({ x: posX, y: posY });
    }
};


window.onload = () => {
    init();
    ai.grabModel();
};



