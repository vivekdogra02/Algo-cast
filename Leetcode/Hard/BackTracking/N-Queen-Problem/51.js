/**
 * 51. N-Queens
Hard

The n-queens puzzle is the problem of placing n queens on an n x n chessboard 
such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. 
You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens' placement, 
where 'Q' and '.' both indicate a queen and an empty space, respectively.
Example 1:


Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
Example 2:

Input: n = 1
Output: [["Q"]]
 
 */

// Solution 1 - backtracking solution

function formatBoard(board) {
  let result = [];
  for (let col = 0; col < board.length; col++) {
    let newRow = new Array(board.length).fill(".");
    newRow[board[col]] = "Q";
    result.push(newRow.join(""));
  }
  return result;
}
function solveNQueens(n) {
  // global result
  let result = [];

  // DFS Helper function
  const dfs = (i, n, slate) => {
    // backtracking case
    let lastQ = i - 1;

    for (let prevQ = 0; prevQ < lastQ; prevQ++) {
      // col conflict
      if (slate[prevQ] === slate[lastQ]) return;

      // diagonal conflice
      let colDiff = Math.abs(prevQ - lastQ);
      let rowDiff = Math.abs(slate[prevQ] - slate[lastQ]);
      if (colDiff === rowDiff) return;
    }

    // base case
    if (i === n) {
      return result.push(slate.slice());
    }

    // dfs recursive call
    for (let col = 0; col < n; col++) {
      slate.push(col);
      dfs(i + 1, n, slate);
      slate.pop();
    }
  };

  dfs(0, n, []);

  return result.map((board) => formatBoard(board));
}

// Solution 2
var isSafe = function (row, col, mat, m) {
  let dupRow = row;
  let dupCol = col;
  while (row >= 0 && col >= 0) {
    if (mat[row][col] === "Q") return false;
    row--;
    col--;
  }
  col = dupCol;
  row = dupRow;
  while (col >= 0) {
    if (mat[row][col] === "Q") return false;
    col--;
  }
  row = dupRow;
  col = dupCol;
  while (row < m && col >= 0) {
    if (mat[row][col] === "Q") return false;
    row++;
    col--;
  }
  return true;
};
// recursive function for valid board generation
var rec = function (col, matrix, dp, n) {
  if (col === n) {
    //returning the answer in the required format by converting 3D matrix to 2D matrix of string
    dp.push([...matrix].map((row) => row.join("")));
    return;
  }
  // looping over each element of row for each column to find best fit for queen
  for (let row = 0; row < n; row++) {
    if (isSafe(row, col, matrix, n)) {
      matrix[row][col] = "Q";
      rec(col + 1, matrix, dp, n);
      matrix[row][col] = ".";
    }
  }
};
var solveNQueens = function (n) {
  // Declare the board for chess
  let board = [];
  // Declare the ans array where answer needs to be stored
  let ans = [];
  //  loop over board array to create 2D chess board and fill with "." initially
  for (let i = 0; i < n; i++) {
    board[i] = Array(n).fill(".");
  }

  // call the recursive function
  rec(0, board, ans, n);
  return ans;
};

// Solution 3
var solveNQueens = function (n) {
  const board = Array(n)
    .fill(null)
    .map((_) => Array(n).fill("."));
  const result = [];

  const backtrack = (cur, row, cols, posDiag, negDiag) => {
    if (row >= n) {
      result.push([...cur.map((m) => m.join(""))]);
      return;
    }

    for (let col = 0; col < n; col += 1) {
      const posDiagCur = row + col;
      const negDiagCur = row - col;

      if (cols.has(col) || posDiag.has(posDiagCur) || negDiag.has(negDiagCur))
        continue;

      cols.add(col);
      posDiag.add(posDiagCur);
      negDiag.add(negDiagCur);

      cur[row][col] = "Q";

      backtrack(cur, row + 1, cols, posDiag, negDiag);

      cols.delete(col);
      posDiag.delete(posDiagCur);
      negDiag.delete(negDiagCur);

      cur[row][col] = ".";
    }
  };

  backtrack(board, 0, new Set(), new Set(), new Set());

  return result;
};

// Solution 5

// time O(n!) | space O(n^n)
var solveNQueens = function (n) {
  let res = [];

  function backtrack(board, r) {
    if (r === n) {
      // - 1 to account for adding a Q that takes up a space
      res.push(board.map((c) => ".".repeat(c) + "Q" + ".".repeat(n - c - 1)));
      return;
    }

    for (let c = 0; c < n; c++) {
      // bc is the current element
      // br is the index of the element bc
      //
      // bc === c | checks row and col
      // bc === c - r + br | checks lower diagonal
      // bc === c + r - br | checks upper diagonal
      if (
        !board.some(
          (bc, br) => bc === c || bc === c - r + br || bc === c + r - br
        )
      ) {
        backtrack(board.concat(c), r + 1);
      }
    }
  }

  backtrack([], 0);

  return res;
};
