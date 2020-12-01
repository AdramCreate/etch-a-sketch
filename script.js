const mainGridContainerElement = document.getElementById('main-grid');
const clearGridButtonElement = document.getElementById('clear-button');

const squareClass = 'square';
const squareHoveredClass = 'square-hovered';

//create a 16x16 grid of square divs
function startGrid() {
    for (let i = 0; i < 16; i++) {
        const newRow = getRow();
        for (let j = 0; j < 16; j++) {
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
    newSquare.classList.add(squareClass);
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

clearGridButtonElement.addEventListener('click', clearGrid);

startGrid();
