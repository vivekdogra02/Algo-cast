/**
 * 
 * 6. Valid Sudoku
Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.

Example 1:

Input: board = 
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
Example 2:

Input: board = 
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. 
Since there are two 8's in the top left 3x3 sub-box, it is invalid.

Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit 1-9 or '.'.
 */

// Solution 1 - Brute force
function isValidSudoku(board) {

    // Check rows
    for (let i = 0; i < board.length; i++) {
        const set = new Set(); // For duplicates
        for (let j = 0; j < board[i].length; j++) {
            const cell = board[i][j];
            if (cell === '.') continue;
            if (set.has(cell)) return false;
            set.add(cell)
        }
    }

    // Check columns
    for (let i = 0; i < board.length; i++) {
        const set = new Set(); // For duplicates
        for (let j = 0; j < board[i].length; j++) {
            const cell = board[j][i];  // For columns
            if (cell === '.') continue;
            if (set.has(cell)) return false;
            set.add(cell)
        }
    }


    // check for sub boxes --  3 * 3 
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const set = new Set(); // For duplicates
            // Check for innner rows and columns for each subbox individually
            for (let k = 0; k < 3; k++) {
                for (let l = 0; l < 3; l++) {
                    const cell = board[i * 3 + k][j * 3 + l];
                    if (cell === '.') continue;
                    if (set.has(cell)) return false;
                    set.add(cell);
                }
            }
        }
    }
    return true;
}
// ---------------------------------------------------------------------------------------------------------------------
// Solution 2 Efficient method single for loop

function isValidSudoku(board) {
    // We need set for every row, column and subbox (to check for having duplicates)
    let rows = [], columns = [], boxes = [];

    for (let i = 0; i < board.length; i++) {
        rows.push(new Set())
        columns.push(new Set())
        boxes.push(new Set())
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            const cell = board[i][j];
            if (cell === '.') continue;
            const boxNum = 3 * Math.floor(i / 3) + Math.floor(j / 3);
            if (rows[i].has(cell) || columns[j].has(cell) || boxes[boxNum].has(cell)) return false;
            rows[i].add(cell);
            columns[j].add(cell);
            boxes[boxNum].add(cell);
        }
    }
    return true;
}
// ---------------------------------------------------------------------------------------------------------------------

// Solution 3
var isValidSudoku = function (board) {

    // row check
    // for (let i = 0; i < 9; i++) {
    //     if (hasDuplicate(board[i])) {return false;}
    // }

    //column check
    for (let i = 0; i < 9; i++) {
        if (hasDuplicate(board[i])) { return false; }
        let col = [];
        for (let j = 0; j < 9; j++) {
            col.push(board[j][i])
        }
        // console.log(col);
        if (hasDuplicate(col)) { return false; }
    }

    //square check
    let square = [];
    for (let i = 0, j = 0; i < 9;) {
        square = square.concat(board[i].slice(j, j + 3));
        if (i === 2 || i === 5 || i === 8) {
            // console.log(square);
            if (hasDuplicate(square)) { return false; }
            square = [];
            if (i === 8) { i = 0; j += 3; continue; }
            if (j === 9) { break; }
        }
        i++;
    }
    return true;
};
const hasDuplicate = (arr) => {
    let lookup = {};
    let result = false;
    if (arr.length !== 9) { return; }
    arr.filter(el => el !== ".").forEach(el => {
        if (lookup[el] !== undefined) {
            result = true;
        } else {
            lookup[el] = true;
        }
    })
    return result;
}
// ---------------------------------------------------------------------------------------------------------------------
// Solution 4

var isValidSudoku = function (board) {
    const obj = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
    const col = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
    const row = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cur = board[i][j];
            if (cur !== '.') {
                const k = Math.floor(j / 3) + Math.floor(i / 3) * 3;
                if (obj[k][cur] || col[i][cur] || row[j][cur]) return false;
                obj[k][cur] = col[i][cur] = row[j][cur] = true;
            }
        }
    }

    return true;
};

// ---------------------------------------------------------------------------------------------------------------------
var isValidSudoku = function (board) {
    const seen = new Set();
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const number = board[row][col];
            if (number !== '.') {
                const rowString = `${number} at row ${row}`;
                const colString = `${number} at col ${col}`;
                const boxString = `${number} at box ${Math.floor(row / 3)}, ${Math.floor(col / 3)}`;

                if (seen.has(rowString) || seen.has(colString) || seen.has(boxString))
                    return false;

                seen.add(rowString);
                seen.add(colString);
                seen.add(boxString);
            }
        }
    }
    return true;
};



//

var searchMatrix = function (matrix, target) {

    let found = false;
    const len = matrix.length;
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            const first = matrix[i][j]
            const last = matrix[i][len];
            if (first.length === 1) {
                if (first === target) {
                    return found = true;
                }
                return found = false;
            } else {
                if (target >= first && target <= last) {
                    for (let k = 0; k < matrix[i].length; k++) {
                        if (matrix[i][k] === target) {
                            found = true;
                            return found;
                        }
                    }
                    if (!found) return found;
                }
                break;
            }
        }
    }
    return found;
};