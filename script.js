
const SIDE_LENGTH = 720;

function colorSquareBlack (event) {
    event.target.style["background-color"] = "black";
}

function getRandomRgbValue () {
    return Math.floor(Math.random() * 255) + 1;
}

function colorSquareRgb (event) {
    const color = `rgb(${getRandomRgbValue()}, ${getRandomRgbValue()}, ${getRandomRgbValue()})`
    event.target.style["background-color"] = color;
}

function colorSquare (event) {
    let currentOpacity = parseFloat(event.target.style.opacity) || 0;
    if (currentOpacity < 1) {
        currentOpacity = Math.min(currentOpacity + 0.1, 1);
        event.target.style.opacity = currentOpacity;
    }
    if (randomizeState) {
        colorSquareRgb(event);
    } else {
        colorSquareBlack(event);
    }
}

function makeGridDivs (numberOfSquares) {
    const grid = document.querySelector(".grid");
    const squareSide = SIDE_LENGTH / numberOfSquares;
    const totalSquares = numberOfSquares * numberOfSquares;
    for (let i = 0; i < totalSquares; i ++) {
        const square = document.createElement("div");
        square.setAttribute("style", `width: ${squareSide}px; height: ${squareSide}px; opacity: 0.1;`);
        square.classList.add("square");
        grid.appendChild(square);
        square.addEventListener("mouseover", colorSquare);
    }
}

function addSquares (toBeAdded, numberOfSquares) {
    const squareSide = SIDE_LENGTH / numberOfSquares;

    const grid = document.querySelector(".grid");

    const squares = grid.querySelectorAll("div");
    squares.forEach((square) => {
        square.style["width"] = `${squareSide}px`;
        square.style["height"] = `${squareSide}px`;
        square.style.removeProperty("background-color");
        square.style.opacity = 0.1;
        square.classList.toggle("square", toggleState);
    });

    for (let i = 0; i < toBeAdded; i++) {
        const newSquare = document.createElement("div");
        newSquare.setAttribute("style", `width: ${squareSide}px; height: ${squareSide}px; opacity: 0.1;`);
        newSquare.classList.toggle("square", toggleState);
        grid.appendChild(newSquare);
        newSquare.addEventListener("mouseover", colorSquare);
    }
}

function removeSquares (toBeRemoved, numberOfSquares) {
    const squareSide = SIDE_LENGTH / numberOfSquares;

    const grid = document.querySelector(".grid");
    for (let i = 0; i < toBeRemoved; i++) {
        grid.removeChild(grid.lastChild);
    }

    const squares = grid.querySelectorAll("div");
    squares.forEach((square) => {
        square.style["width"] = `${squareSide}px`;
        square.style["height"] = `${squareSide}px`;
        square.style.removeProperty("background-color");
        square.style.opacity = 0.1;
        square.classList.toggle("square", toggleState);
    });
}

function getNumberOfSquares () {
    const squareInput = document.querySelector(".square-input");
    const requestedNumberOfSquares = parseInt(squareInput.value);
    if (isNaN(requestedNumberOfSquares)) {
        alert("Please enter a valid number.");
    }
    else if (requestedNumberOfSquares < 1 || requestedNumberOfSquares > 100) {
        alert("Enter a number between 1 to 100.");
    } else {
        return requestedNumberOfSquares;
    }
}

function changeGridDivs () {
    const requestedNumberOfSquares = getNumberOfSquares();
    const totalSquares = requestedNumberOfSquares * requestedNumberOfSquares;

    if (requestedNumberOfSquares === numberOfSquares) return;

    if (requestedNumberOfSquares > numberOfSquares) {
        const toBeAded = totalSquares - (numberOfSquares * numberOfSquares);
        addSquares(toBeAded, requestedNumberOfSquares);
    } else {
        const toBeRemoved = (numberOfSquares * numberOfSquares) - totalSquares;
        removeSquares(toBeRemoved, requestedNumberOfSquares);
    }
    numberOfSquares = requestedNumberOfSquares;
}

function toggleGrid () {
    if (toggleState === true) {
        toggleState = false;
    } else {
        toggleState = true;
    }
    const squares = document.querySelectorAll(".grid div");
    squares.forEach((square) => {
        square.classList.toggle("square");
    });
}


let numberOfSquares = 16;
let randomizeState = false;
let toggleState = true;

makeGridDivs(numberOfSquares);

const squareButton = document.querySelector(".square-button");
squareButton.addEventListener("click", changeGridDivs);


const toggleButton = document.querySelector(".toggle-button");
toggleButton.addEventListener("click", toggleGrid);


const randomizeButton = document.querySelector(".randomize-button");
randomizeButton.addEventListener("click", () => {
    if (randomizeState === true) {
        randomizeState = false;
    } else {
        randomizeState = true;
    }
    const randomizeButtonState = document.querySelector(".randomize-color span");
    if (randomizeState) {
        randomizeButtonState.textContent = "Derandomize";
    } else {
        randomizeButtonState.textContent = "Randomize";
    }
});


const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", () => {
    const squares = document.querySelectorAll(".grid div");
    squares.forEach((square) => {
        square.style.removeProperty("background-color");
        square.style.opacity = 0.1;
    });
});