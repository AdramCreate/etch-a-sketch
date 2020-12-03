let squaresPerSide = 16;

const mainGridContainerElement = document.getElementById('main-grid');
const clearGridButtonElement = document.getElementById('clear-button');
const resizeGridButtonElement = document.getElementById('resize-button');

const squareClass = 'square';
const squareHoveredClass = 'square-hovered';

const GRID_SIZE = 500;

//create a 16x16 grid of square divs
function startGrid() {
    for (let i = 0; i < squaresPerSide; i++) {
        const newRow = getRow();
        for (let j = 0; j < squaresPerSide; j++) {
            const newSquare = getSquare();
            newRow.appendChild(newSquare);
        }
        mainGridContainerElement.appendChild(newRow);
    }
}

function getRow() {
    const newRow = document.createElement('div');

    newRow.classList.add('grid-row');
    return newRow;
}

function getSquare() {
    const newSquare = document.createElement('div');
    const squareSize = GRID_SIZE / squaresPerSide;

    newSquare.classList.add(squareClass);
    newSquare.style.height = squareSize + 'px';
    newSquare.style.width = squareSize + 'px';
    newSquare.addEventListener('mouseenter', function (e) {
        setHoverClass(e);
    });
    return newSquare;
}

function setHoverClass(e) {
    const currentTarget = e.target;
    currentTarget.classList.add(squareHoveredClass);
}

//for all divs with class square-hovered, remove class to return div to original color; this essentially "clears" the grid
function clearGrid() {
    const squareHoveredDivElementsList = document.querySelectorAll(
        '.' + squareHoveredClass
    );

    squareHoveredDivElementsList.forEach((element) => {
        element.classList.remove(squareHoveredClass);
    });
}

function startResizeGridPrompt() {
    const promptInput = window.prompt(
        'Enter a number between 1 and 100 to be the new grid size.'
    );

    if (promptInput === null) {
        return;
    }

    handleResizeGridPromptInput(promptInput);
}

function handleResizeGridPromptInput(promptInput) {
    const newSquaresPerSide = Number(promptInput);

    if (
        Number.isNaN(newSquaresPerSide) ||
        !(newSquaresPerSide >= 1 && newSquaresPerSide <= 100)
    ) {
        alertInvalidResizeGridPromptInput();
    } else {
        resizeGrid(newSquaresPerSide);
    }
}

function alertInvalidResizeGridPromptInput() {
    window.alert(
        'Invalid input detected. Input must be a number that is between 1 and 100.'
    );
    startResizeGridPrompt();
}

function resizeGrid(newSquaresPerSide) {
    squaresPerSide = newSquaresPerSide;
    mainGridContainerElement.innerHTML = '';
    clearGrid();
    startGrid();
}

clearGridButtonElement.addEventListener('click', clearGrid);
resizeGridButtonElement.addEventListener('click', startResizeGridPrompt);

startGrid();
