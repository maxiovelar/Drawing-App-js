const colorCircle = document.querySelectorAll('.color-circle');
const clearCanvas = document.querySelector('#clear-canvas');
const downloadBtn = document.querySelector('#download-btn');
const undoBtn = document.querySelector('#btn-undo');
const redoBtn = document.querySelector('#btn-redo');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let penSize = 6;
let isDrawing;
let x;
let y;

let index = -1;
let restoreArray = [];



// TO START DRAWING
canvas.addEventListener('mousedown', (event) => {
    if(event.type != 'mouseout') {

        isDrawing = true;
        x = event.offsetX;
        y = event.offsetY;

    }

});



// TO SHOW THE DRAWINGS
ctx.fillStyle = 'hotpink';
ctx.strokeStyle = ctx.fillStyle;

const drawLine = (x1, y1, x2, y2) => {
   
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineWidth = penSize * 2;
    ctx.stroke();

};

const draw = (x2, y2) => {

    if (isDrawing) {
       
        ctx.beginPath();
        ctx.arc(x2, y2, penSize, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        // draw line
        drawLine(x, y, x2, y2);

    }

    x = x2;
    y = y2;

};

canvas.addEventListener('mousemove', (event) => {
    draw(event.offsetX, event.offsetY);
});



// TO STOP DRAWING
canvas.addEventListener('mouseup', (event) => {
    
    if(event.type != 'mouseout') {

        isDrawing = false;
        x = undefined;
        y = undefined;
        
        restoreArray.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        undoBtn.classList.remove('disabled');
        
    };

});



// TO CLEAR CANVAS
const clear = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

clearCanvas.addEventListener('click', () => {
    
    clear();
    restoreArray = [];
    index = -1;
    undoBtn.classList.add('disabled');
    
});



// TO SELECT A COLOR
const removeActiveCircleColor = () => {

    colorCircle.forEach((circle) => {
        circle.classList.remove('selected');
    });

};

const selectColor = (element) => {

    removeActiveCircleColor();
    ctx.fillStyle = element.getAttribute('data-color');
    element.classList.add('selected');

};

const favColor = (element) => {

    removeActiveCircleColor();
    ctx.fillStyle = element.value;

};



// TO CHANGE THE PEN SIZE
const penSizeChange = (pensize) => {
    penSize = pensize
};



// TO DOWNLOAD THE PAINT
downloadBtn.addEventListener('click', (event) => event.target.href = canvas.toDataURL());


// TO UNDO
const undoLast = () => {

    if(index <= 0) {
        clear();
        undoBtn.classList.add('disabled');
        
    } else {

        index -= 1;
        ctx.putImageData(restoreArray[index], 0, 0);
        undoBtn.classList.remove('disabled');
    
    };

};

undoBtn.addEventListener('click', () => {
    undoLast();
}); 


