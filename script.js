// Create the Sudoku board dynamically
const board = document.getElementById("sudoku-board");

for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
        const cell = document.createElement("input");
        cell.type = "text";
        cell.maxLength = "1";
        cell.dataset.row = i;
        cell.dataset.col = j;
        board.appendChild(cell);
    }
}

// Sudoku Solver Logic
function solveSudoku(board) {
    function solve() {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === '.') {
                    for (let num = 1; num <= 9; num++) {
                        const char = String(num);
                        if (isValid(board, r, c, char)) {
                            board[r][c] = char;
                            if (solve()) return true;
                            board[r][c] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    function isValid(board, row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (
                board[row][i] === num ||
                board[i][col] === num ||
                board[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + (i % 3)] === num
            ) {
                return false;
            }
        }
        return true;
    }

    solve();
}

// Event Listeners for Buttons
document.getElementById("solve-button").addEventListener("click", () => {
    const grid = Array.from({ length: 9 }, () => Array(9).fill('.'));
    const inputs = document.querySelectorAll("#sudoku-board input");

    inputs.forEach((input) => {
        const row = input.dataset.row;
        const col = input.dataset.col;
        const value = input.value;
        grid[row][col] = value || '.';
    });

    solveSudoku(grid);

    inputs.forEach((input) => {
        const row = input.dataset.row;
        const col = input.dataset.col;
        input.value = grid[row][col] !== '.' ? grid[row][col] : '';
    });
});

document.getElementById("reset-button").addEventListener("click", () => {
    document.querySelectorAll("#sudoku-board input").forEach((input) => (input.value = ""));
});
