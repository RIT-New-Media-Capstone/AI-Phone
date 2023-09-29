let isDrawing = false;
let mousePos = { x: undefined, y: undefined };
let timeofLine = 0;
let timeOfPoint = 0;
let startofLine;

let drawing = [];
//[line[[mouseX][mouseY][time]]]

let height;
let width;

const init = () => {
    // Canvas
    const canvas = document.querySelector('#myCanvas');
    const ctx = canvas.getContext('2d');
    const submitDrawingbtn = document.querySelector('#submit-drawing');
    width = canvas.width;
    height = canvas.height;

    // New line started
    canvas.addEventListener("mousedown", (e) => {
        x = mousePos.x;
        y = mousePos.y;
        isDrawing = true;
        startofLine = e.timeStamp;
        drawing.push([[], [], []]);//new line in drawing
    });

    // Line drawn
    canvas.addEventListener('mousemove', (e) => {
        mousePos = getMousePos(canvas, e);
        if (isDrawing) {
            drawLine(ctx, x, y, mousePos.x, mousePos.y);
            x = mousePos.x;
            y = mousePos.y;
            addToArray(x,y, timeOfPoint, e);

        }
    });

    // Line ended
    canvas.addEventListener("mouseup", (e) => {
        isDrawing = false;
        addToArray(x,y, timeofLine, e);

    });

    // Submit drawing
    submitDrawingbtn.addEventListener("click", function(){
        submitDrawing(ctx, width, height, drawing);
    }, false);

    mousePos.x = 0;
    mousePos.y = 0;
}

// formats drawing data
const addToArray = (x, y,time, e) => {
    timeofLine = e.timeStamp - startofLine;
    drawing[drawing.length - 1][0].push(x);
    drawing[drawing.length - 1][1].push(y);
    drawing[drawing.length - 1][2].push(time);
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
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
};

const submitDrawing = (context) => {
    //send drawing to AI
    //clear drawingArray
    //clear cavas
    console.log(drawing);
    drawing = [];
    context.clearRect(0, 0, width, height);
    console.log("Sending Drawing( not really)");
    console.log(drawing);

};

window.onload = () => {
    init();
};
