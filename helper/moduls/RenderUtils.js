export function renderCircle(currentRow, currentCol, cellSize) {
    const circle = document.querySelector('.circle');
    circle.style.top = `${currentRow * cellSize}px`;
    circle.style.left = `${currentCol * cellSize}px`;
}