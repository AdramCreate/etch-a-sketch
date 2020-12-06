const COLOR_MODES = {
    NORMAL: 'normal',
    RGB: 'rgb',
    BLACK: 'black',
};
const mainGridContainerElement = document.getElementById('main-grid');
const clearGridButtonElement = document.getElementById('clear-button');
const resizeGridButtonElement = document.getElementById('resize-button');
const currentGridSizeHeaderElement = document.getElementById(
    'current-grid-size-header'
);
const currentColorModeHeaderElement = document.getElementById(
    'current-color-mode-header'
);
const normalColorModeButtonElement = document.getElementById(
    'normal-color-mode-button'
);
const rgbColorModeButtonElement = document.getElementById(
    'random-rgb-color-mode-button'
);
const blackColorModeButtonElement = document.getElementById(
    'black-color-mode-button'
);

const squareClass = 'square';
const squareHoveredNormalColorModeClass = 'square-hovered-normal';
const squareHoveredRgbColorModeClass = 'square-hovered-rgb';
const squareHoveredBlackColorModeClass = 'square-hovered-black';

const GRID_SIZE = 500;

let squaresPerSide = 16;
let currentColorMode = COLOR_MODES.NORMAL;

function startGrid() {
    for (let i = 0; i < squaresPerSide; i++) {
        const newRow = getRow();
        for (let j = 0; j < squaresPerSide; j++) {
            const newSquare = getSquare();
            newRow.appendChild(newSquare);
        }
        mainGridContainerElement.appendChild(newRow);
    }
    setCurrentGridSizeInformation();
    setCurrentColorModeInformation();
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
    setElementColorMode(newSquare);
    return newSquare;
}

function setElementColorMode(element) {
    switch (currentColorMode) {
        case COLOR_MODES.RGB:
            element.addEventListener('mouseenter', function (e) {
                setRandomBackgroundColor(e.target);
            });
            break;
        case COLOR_MODES.BLACK:
            element.setAttribute('data-current-brightness', 100);
            element.classList.add(squareHoveredBlackColorModeClass);
            element.addEventListener('mouseenter', function (e) {
                setBlackBackgroundColor(e.target);
            });
            break;
        case COLOR_MODES.NORMAL:
        default:
            element.addEventListener('mouseenter', function (e) {
                setHoverActionForNormalColorMode(e.target);
            });
            break;
    }
}

function setHoverActionForNormalColorMode(element) {
    if (!element.classList.contains(squareHoveredNormalColorModeClass)) {
        element.classList.add(squareHoveredNormalColorModeClass);
    }
}

function clearGrid() {
    mainGridContainerElement.innerHTML = '';
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
    resetGrid();
}

function setCurrentGridSizeInformation() {
    currentGridSizeHeaderElement.textContent = `${squaresPerSide}x${squaresPerSide}`;
}

function setCurrentColorModeInformation() {
    currentColorModeHeaderElement.textContent = currentColorMode;
}

function resetGrid() {
    clearGrid();
    startGrid();
}

function setNewColorModeForGrid(colorMode) {
    currentColorMode = colorMode;
    resetGrid();
}

// Taken from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //Both the min and max are inclusive
}

function setRandomBackgroundColor(element) {
    if (!element.classList.contains(squareHoveredRgbColorModeClass)) {
        const redValue = getRandomInt(0, 255);
        const greenValue = getRandomInt(0, 255);
        const blueValue = getRandomInt(0, 255);

        element.style.backgroundColor = `rgb(${redValue}, ${greenValue}, ${blueValue})`;
        element.classList.add(squareHoveredRgbColorModeClass);
    }
}

function setBlackBackgroundColor(element) {
    const currentElementBrightness = parseInt(
        element.getAttribute('data-current-brightness')
    );

    if (currentElementBrightness > 0) {
        reduceElementBrightness(element);
    }
}

//reduces brightness by 10%; finally after about 10 passes the square should be completely black
function reduceElementBrightness(element) {
    const newElementBrightness =
        parseInt(element.getAttribute('data-current-brightness')) - 10;

    element.style.filter = `brightness(${newElementBrightness}%)`;
    element.setAttribute('data-current-brightness', newElementBrightness);
}

clearGridButtonElement.addEventListener('click', resetGrid);
resizeGridButtonElement.addEventListener('click', startResizeGridPrompt);
normalColorModeButtonElement.addEventListener('click', function () {
    setNewColorModeForGrid(COLOR_MODES.NORMAL);
});
rgbColorModeButtonElement.addEventListener('click', function () {
    setNewColorModeForGrid(COLOR_MODES.RGB);
});
blackColorModeButtonElement.addEventListener('click', function () {
    setNewColorModeForGrid(COLOR_MODES.BLACK);
});

startGrid();
