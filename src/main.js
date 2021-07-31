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


// TO GET COORDINATES

const getX = (event) => {
    if (event.pageX == undefined) {
        return event.targetTouches[0].pageX - canvas.offsetLeft;
    } else {return event.pageX - canvas.offsetLeft}
};

const getY = (event) => {
    if (event.pageY == undefined) {
        return event.targetTouches[0].pageY - canvas.offsetTop;
    } else {return event.pageY - canvas.offsetTop}
};



// TO START DRAWING

const start = (event) => {
    isDrawing = true;
    context.beginPath();
    context.moveTo(getX(event), getY(event));
    event.preventDefault();
};



// TO SHOW THE DRAWINGS

const draw = (event) => {
    if(isDrawing) {
        context.lineTo(getX(event), getY(event));
        context.strokeStyle = drawColor;
        context.lineWidth = penSize;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
    }
    event.preventDefault();
}



// TO STOP DRAWING

const stop = (event) => {
    if(isDrawing) {
        context.stroke();
        context.closePath();
        isDrawing = false;
    }

    event.preventDefault();
    restoreArray.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
    undoBtn.classList.remove('disabled');
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
const penSizeChange = (element) => {
    penSize = element;
    console.log(penSize);
};



// TO DOWNLOAD THE PAINT
const downloadPNG = () => {
    downloadBtn.setAttribute('download', 'MyPainting.png');
    downloadBtn.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
}

downloadBtn.addEventListener('click', downloadPNG);


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


