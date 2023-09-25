


import { saveData, loadData } from './moduls/DataUtils.mjs';
import { renderCircle } from './moduls/renderUtils.js';

let currentRow = 0;
let currentCol = 0;
const cellSize = 50;

// Set the spaceBarPressed flag to true
let spaceBarPressed = false;

const currentPosPlayer = loadPlayerPos();
currentRow = currentPosPlayer ? currentPosPlayer.posY : 0;
currentCol = currentPosPlayer ? currentPosPlayer.posX : 0;

function initializeGrid() {
  const container = document.getElementById('container');
  const resetButton = document.getElementById('resetButton');
  
  const containerWidth = container.offsetWidth;
  const containerHeight = container.offsetHeight;

  const maxNumCols = 10;
  const maxNumRows = 10;

  const actualNumCols = Math.min(Math.floor(containerWidth / cellSize), maxNumCols);
  const actualNumRows = Math.min(Math.floor(containerHeight / cellSize), maxNumRows);

  const map = loadMapData();
  

  if (map) {
    renderCells(container, map);
  } else {
    resetGrid(container, actualNumRows, actualNumCols);
  }

  renderCircle(currentRow, currentCol, cellSize)

  resetButton.addEventListener('click', function() {
    resetGrid(container, actualNumRows, actualNumCols);
    renderCircle(currentRow, currentCol, cellSize)
  });

  // Add keyboard event listener
  document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Move circle based on arrow keys
    let newRow = currentRow;
    let newCol = currentCol;

    // Add a variable to track the counter
    let counter = 0;


    // Add a variable to store the counter element
    const counterElement = document.getElementById('counter');

    // Add a variable to store the circle element
    const circleElement = document.querySelector('.circle');

    // Add a variable to store the timeout ID
    let timeoutId;

    // Check if the space bar is pressed and the circle is not already in a timeout
    if (key === ' ' && !spaceBarPressed) {
      // Disable circle interaction
      circleElement.style.pointerEvents = 'none';

      // Increment the counter
      counter++;

      // Update the counter element
      counterElement.textContent = counter;

      // Set the spaceBarPressed flag to true
      let spaceBarPressed = true;  

      // Clear the previous timeout if any
      clearTimeout(timeoutId);

      // Set a timeout to re-enable circle interaction after 2 seconds
      timeoutId = setTimeout(function() {
        circleElement.style.pointerEvents = 'auto';
        spaceBarPressed = false;
      }, 1000);
    }

    if (key === 'ArrowUp' && currentRow > 0 && !spaceBarPressed) {
      newRow--;
    } else if (key === 'ArrowDown' && currentRow < actualNumRows - 1 && !spaceBarPressed) {
      newRow++;
    } else if (key === 'ArrowLeft' && currentCol > 0 && !spaceBarPressed) {
      newCol--;
    } else if (key === 'ArrowRight' && currentCol < actualNumCols - 1 && !spaceBarPressed) {
      newCol++;
    }

    // Check if the new square is blocked
    const newSquareType = map[newRow][newCol];
    if (!isSquareBlocked(newSquareType)) {
      currentRow = newRow;
      currentCol = newCol;
    }

    // Update circle position
    renderCircle(currentRow, currentCol, cellSize)

    savePlayerPos(currentCol, currentRow);
  });
}

function resetGrid(container, numRows, numCols) {
  const squares = [
    { type: 'square', weight: 10 },
    { type: 'square2', weight: 50 },
    { type: 'square3', weight: 100 }
  ];
  const randomSquares = getRandomSquares(squares, numRows * numCols);

  const map = createMap(randomSquares, numRows, numCols);
  renderCells(container, map);

  saveMapData(map);
}

function renderCells(container, map) {
  container.innerHTML = '';
  const cellElements = [];

  

  for (const row of map) {
    for (const squareType of row) {
      const cell = document.createElement('div');
      cell.classList.add('cell', squareType);
      container.appendChild(cell);
      cellElements.push(squareType);
    }
  }

  const circle = document.createElement('div');
  circle.classList.add('circle');
  container.appendChild(circle);
  circle.style.top = `${currentRow * cellSize}px`;
  circle.style.left = `${currentCol * cellSize}px`;

  return cellElements;
}

function createMap(squareTypes, numRows, numCols) {
  const map = [];

  for (let row = 0; row < numRows; row++) {
    const rowArray = [];
    for (let col = 0; col < numCols; col++) {
      const cellIndex = row * numCols + col;
      const squareType = squareTypes[cellIndex % squareTypes.length];
      rowArray.push(squareType);
    }
    map.push(rowArray);
  }

  return map;
}

function getRandomSquares(squares, num) {
  // Calculate the total weight
  const totalWeight = squares.reduce((sum, square) => sum + square.weight, 0);

  const randomSquares = [];
  for (let i = 0; i < num; i++) {
    // Generate a random number within the range of the total weight
    const randomNumber = Math.random() * totalWeight;

    // Iterate through the squares and select a type based on the random number
    let selectedType;
    let cumulativeWeight = 0;

    for (const square of squares) {
      cumulativeWeight += square.weight;

      if (randomNumber <= cumulativeWeight) {
        selectedType = square.type;
        break;
      }
    }
    const randomSquare = selectedType;
    randomSquares.push(randomSquare);
  }
  return randomSquares;
}

function saveMapData(map) {
  saveData('mapData', map);
}

function loadMapData() {
  return loadData('mapData');
}

function savePlayerPos(posX, posY) {
  const posData = { posX, posY };
  saveData('posData', posData);
}

function loadPlayerPos() {
  return loadData('posData');
}


function isSquareBlocked(squareType) {
  const blockedSquareTypes = ['square']; // Define the blocked square types here

  return blockedSquareTypes.includes(squareType);
}

// Initialize the grid when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeGrid);