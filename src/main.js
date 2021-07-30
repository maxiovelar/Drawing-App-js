const colorCircle = document.querySelectorAll('.color-circle');
const clearCanvas = document.querySelector('#clear-canvas');
const downloadBtn = document.querySelector('#download-btn');
const undoBtn = document.querySelector('#btn-undo');
const redoBtn = document.querySelector('#btn-redo');

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth - 60;
canvas.height = 500;

const context = canvas.getContext('2d');
let startBgColor = 'white';
context.fillStyle = startBgColor;
context.fillRect(0, 0, canvas.width, canvas.height);

let drawColor = 'black';
let penSize = 6;

let isDrawing = false;

let index = -1;
let restoreArray = [];



// TO START DRAWING

// canvas.addEventListener('mousedown', (event) => {
//     if(event.type != 'mouseout') {

//         isDrawing = true;
//         x = event.offsetX;
//         y = event.offsetY;

//     }

// });

const start = (event) => {
    isDrawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft,
                   event.clientY - canvas.offsetTop);
    event.preventDefault();
};



// TO SHOW THE DRAWINGS

// context.fillStyle = 'black';
// context.strokeStyle = context.fillStyle;

// const start = (x1, y1, x2, y2) => {
    
//     context.beginPath();
//     context.moveTo(x1, y1);
//     context.lineTo(x2, y2);
//     context.strokeStyle = context.fillStyle;
//     context.lineWidth = penSize * 2;
//     context.stroke();

// };

// const draw = (x2, y2) => {

//     if (isDrawing) {
       
//         context.beginPath();
//         context.arc(x2, y2, penSize, 0, Math.PI * 2);
//         context.closePath();
//         context.fill();
//         // draw line
//         start(x, y, x2, y2);

//     }

//     x = x2;
//     y = y2;

// };

// canvas.addEventListener('mousemove', (event) => {
//     draw(event.offsetX, event.offsetY);
// });

const draw = (event) => {
    if(isDrawing) {
        context.lineTo(event.clientX - canvas.offsetLeft,
                       event.clientY - canvas.offsetTop);
        context.strokeStyle = drawColor;
        context.lineWidth = penSize;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
    }
    event.preventDefault();
}



// TO STOP DRAWING

// canvas.addEventListener('mouseup', (event) => {
    
//     if(event.type != 'mouseout') {

//         isDrawing = false;
//         x = undefined;
//         y = undefined;
        
//         restoreArray.push(context.getImageData(0, 0, canvas.width, canvas.height));
//         index += 1;
//         undoBtn.classList.remove('disabled');
        
//     };

// });

const stop = (event) => {
    if(isDrawing) {
        context.stroke();
        context.closePath();
        isDrawing = false;

        restoreArray.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
        undoBtn.classList.remove('disabled');
    }
    event.preventDefault();
}


canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('touchend', stop, false);

canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false);
canvas.addEventListener('mouseup', stop, false);
canvas.addEventListener('mouseout', stop, false);




// TO CLEAR CANVAS
const clear = () => {
    context.fillStyle = startBgColor;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
}

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
    drawColor = element.getAttribute('data-color');
    element.classList.add('selected');

};

const favColor = (element) => {

    removeActiveCircleColor();
    drawColor = element.value;

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
        context.putImageData(restoreArray[index], 0, 0);
        undoBtn.classList.remove('disabled');
    
    };

};

undoBtn.addEventListener('click', () => {
    undoLast();
}); 


