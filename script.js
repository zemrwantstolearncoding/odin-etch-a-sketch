
const SIDE_LENGTH = 720;

function colorSquare(event) {
    event.target.style["background-color"] = "black";
}

function makeGridDivs (numberOfSquares) {
    const grid = document.querySelector(".grid");
    const squareSide = SIDE_LENGTH / numberOfSquares;
    totalSquares = numberOfSquares * numberOfSquares;
    for (let i = 0; i < totalSquares; i ++) {
        const square = document.createElement("div");
        square.setAttribute("style", `width: ${squareSide}px; height: ${squareSide}px;`);
        square.classList.add("square");
        grid.appendChild(square);
        square.addEventListener("mouseover", colorSquare);
    }
}

let numberOfSquares = 16;

makeGridDivs(numberOfSquares);