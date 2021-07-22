const colorCircle = document.querySelectorAll('.color-circle');
const clearCanvas = document.querySelector('#clear-canvas');
const downloadBtn = document.querySelector('#download-btn');
const undoBtn = document.querySelector('#btn-undo');
const redoBtn = document.querySelector('#btn-redo');
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

let penSize = 10;
let isDrawing;
let x;
let y;


// TO START DRAWING
canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    x = event.offsetX;
    y = event.offsetY;
});


// TO STOP DRAWING
canvas.addEventListener('mouseup', () => {
    isDrawing = false;
    x = undefined;
    y = undefined;
});


// TO SHOW THE DRAWINGS

c.fillStyle = 'hotpink';
c.strokeStyle = c.fillStyle;

const drawLine = (x1, y1, x2, y2) => {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = c.fillStyle;
    c.lineWidth = penSize * 2;
    c.stroke();
};

const draw = (x2, y2) => {
    if (isDrawing) {
        c.beginPath();
        c.arc(x2, y2, penSize, 0, Math.PI * 2);
        c.closePath();
        c.fill();
        // draw line
        drawLine(x, y, x2, y2);
    }

    x = x2;
    y = y2;
};

canvas.addEventListener('mousemove', (event) => {
    draw(event.offsetX, event.offsetY);
});


// TO CLEAR CANVAS

clearCanvas.addEventListener('click', () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
});


// TO SELECT A COLOR

const removeActiveCircleColor = () => {
    colorCircle.forEach((circle) => {
        circle.classList.remove('selected');
    });
};

const selectColor = (element) => {
    removeActiveCircleColor();
    c.fillStyle = element.getAttribute('data-color');
    element.classList.add('selected');
};

const favColor = (element) => {
    removeActiveCircleColor();
    c.fillStyle = element.value;
};


// TO CHANGE THE PEN SIZE

const penSizeChange = (pensize) => {
    penSize = pensize
};


// TO DOWNLOAD THE PAINT

downloadBtn.addEventListener('click', (event) => event.target.href = canvas.toDataURL());
