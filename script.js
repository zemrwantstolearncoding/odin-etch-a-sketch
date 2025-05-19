
const SIDE_LENGTH = 720;

function colorSquare (event) {
    event.target.style["background-color"] = "black";
}

function makeGridDivs (numberOfSquares) {
    const grid = document.querySelector(".grid");
    const squareSide = SIDE_LENGTH / numberOfSquares;
    const totalSquares = numberOfSquares * numberOfSquares;
    for (let i = 0; i < totalSquares; i ++) {
        const square = document.createElement("div");
        square.setAttribute("style", `width: ${squareSide}px; height: ${squareSide}px;`);
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
        square.style["background-color"] = "white";
    });

    for (let i = 0; i < toBeAdded; i++) {
        const newSquare = document.createElement("div");
        newSquare.setAttribute("style", `width: ${squareSide}px; height: ${squareSide}px;`);
        newSquare.classList.add("square");
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
        square.style["background-color"] = "white";
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

let numberOfSquares = 16;

makeGridDivs(numberOfSquares);

const squareButton = document.querySelector(".square-button");
squareButton.addEventListener("click", changeGridDivs);