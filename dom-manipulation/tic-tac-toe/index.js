let currentplayer = 1;
const BOARD_WIDTH = 3;
let boardState = generateEmptyBoardState();
let numberOfmoveDone = 0;

const h3 = document.getElementById('game-heading');
const board = document.querySelectorAll('.game-square');
const restartButton = document.getElementById('restart-button');

restartButton.addEventListener('click', restartGame);

Array.from(board).forEach((element, index) => {
    element.addEventListener("click", () => {
        let row = Math.floor(index / BOARD_WIDTH);
        let col = index % BOARD_WIDTH;
        makeMove(element, row, col);
    });
});

function makeMove(ele, row, col) {
    if (boardState[row][col] !== null) return; // Prevent overwriting moves

    ele.textContent = currentplayer === 1 ? "X" : "O";
    ele.classList.add("disabled");
    ele.setAttribute("disabled", "true"); // Prevent clicking again
    numberOfmoveDone++;

    boardState[row][col] = currentplayer;

    if (didPlayerWin(currentplayer)) {
        h3.textContent = `Player ${currentplayer} Won!`;
        endGame();
    } else if (numberOfmoveDone >= BOARD_WIDTH * BOARD_WIDTH) {
        h3.textContent = "Tie Game!";
        endGame();
    } else {
        currentplayer = 3 - currentplayer; // Toggle between 1 and 2
        setCurrentPlayer();
    }
}

function setCurrentPlayer() {
    h3.textContent = `Player ${currentplayer}'s Turn`;
}

function didPlayerWin(currentplayer) {
    const rows = [0, 1, 2];

    const wonHorizontal = rows.some(row => (
        boardState[row][0] === currentplayer &&
        boardState[row][1] === currentplayer &&
        boardState[row][2] === currentplayer
    ));

    const cols = [0, 1, 2];

    const wonVertical = cols.some(col => (
        boardState[0][col] === currentplayer &&
        boardState[1][col] === currentplayer &&
        boardState[2][col] === currentplayer
    ));

    const wonDiagonal1 = (
        boardState[0][0] === currentplayer &&
        boardState[1][1] === currentplayer &&
        boardState[2][2] === currentplayer
    );

    const wonDiagonal2 = (
        boardState[0][2] === currentplayer &&
        boardState[1][1] === currentplayer &&
        boardState[2][0] === currentplayer
    );

    return wonHorizontal || wonVertical || wonDiagonal1 || wonDiagonal2;
}

function endGame() {
    restartButton.style.display = 'block';
    board.forEach(gameSquare => {
        gameSquare.classList.add("disabled");
        gameSquare.setAttribute("disabled", "true");
    });
}

function restartGame() {
    boardState = generateEmptyBoardState();
    currentplayer = 1;
    numberOfmoveDone = 0;
    setCurrentPlayer();

    board.forEach(gameSquare => {
        gameSquare.textContent = '';
        gameSquare.classList.remove("disabled");
        gameSquare.removeAttribute("disabled"); // Re-enable squares
    });

    restartButton.style.display = 'none';
}

function generateEmptyBoardState() {
    return Array.from({ length: BOARD_WIDTH }, () => Array(BOARD_WIDTH).fill(null));
}
