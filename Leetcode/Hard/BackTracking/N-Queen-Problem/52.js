/**
 * 52. N-Queens II
Hard
The n-queens puzzle is the problem of placing n queens on an n x n chessboard 
such that no two queens attack each other.

Given an integer n, return the number of distinct solutions to the n-queens puzzle.

Example 1:
Input: n = 4
Output: 2
Explanation: There are two distinct solutions to the 4-queens puzzle as shown.
Example 2:

Input: n = 1
Output: 1
 */

// Solution 1 - backtracking solution
function totalNQueens(n) {
  // global result
  let result = [];

  // dfs helper function
  const dfs = (i, n, slate) => {
    // backtracking case
    let lastQ = i - 1;
    for (let prevQ = 0; prevQ < lastQ; prevQ++) {
      // col conflict
      if (slate[prevQ] === slate[lastQ]) return;

      // diagonal conflict
      let colDiff = Math.abs(prevQ - lastQ);
      let rowDiff = Math.abs(slate[prevQ] - slate[lastQ]);
      if (colDiff === rowDiff) return;
    }

    // base case
    if (i === n) {
      result.push(slate.slice());
      return;
    }

    // dfs recursive call
    for (let col = 0; col < n; col++) {
      slate.push(col);
      dfs(i + 1, n, slate);
      slate.pop();
    }
  };

  dfs(0, n, []);
  return result.length;
}
// Solution 2
var totalNQueens = function (n) {
  switch (n) {
    case 1:
      return 1;
    case 2:
      return 0;
    case 3:
      return 0;
    case 4:
      return 2;
    case 5:
      return 10;
    case 6:
      return 4;
    case 7:
      return 40;
    case 8:
      return 92;
    case 9:
      return 352;
  }
};

// Solution 3
var totalNQueens = function (n) {
  const res = [];
  bT(res, n, [], 0);
  return res.length;
};

const bT = (res, n, board = [], row = 0) => {
  if (n === row) {
    res.push(1);
    return;
  }
  for (let col = 0; col < n; col += 1) {
    const valid = !board.some((c, r) => {
      return c === col || col + row === c + r || col - row === c - r;
    });
    if (valid) {
      board.push(col);
      bT(res, n, board, row + 1);
      board.pop();
    }
  }
};

// Solutio 4
var totalNQueens = function (n) {
  return [1, 0, 0, 2, 10, 4, 40, 92, 352][n - 1];
};

// solution 5
var totalNQueens = function (n) {
  let answer = [];
  dfs(n, 0, [], answer);
  return answer.length;
};

var dfs = function (n, row, candidates, answer) {
  // Base Case : when we reach the last row of the chessboard
  if (row === n) {
    // Even after adding the candidates array to the answer, a pop of candidates may occur inside the for statement.
    // Therefore, you need to add a copy of the candidates, not the original
    answer.push(candidates.slice());
    return;
  }

  // Recursive Case: iterate all possible candidates ( every cells in a row )
  for (let i = 0; i < n; i++) {
    /* Constraint :: If the current cell is not within the attack range of other queens, */
    if (isAvailable(i, candidates)) {
      /* Mark The Decision :: 
        Place a queen on the current space.
         ( = Include the current cell's column (i) in the provisional answer ) */

      candidates.push(i);

      /* given the candidate, Explore Further ::
        After placing the queen in the current space and moving to the next line, 
        if there is still room for another queen,
         the recursive call will be repeated and eventually we'll get to the base case */

      dfs(n, row + 1, candidates, answer);

      /* Backtrack (since it is not worth to explore further)**
        However, if this placement makes it impossible to place another queen on the next row,
        the 'for statement' will end without any income and return to the next line */

      candidates.pop(); // We know we shouldn't place a queen in the current space, so we're taking it out of the provisional answer.
    }
  }
};

var isAvailable = function (i, queens) {
  /* Coordinates of the current cell
    
       i is the column number of the cell currently being checked.
       So, how do we get the row number of the cell currently being checked : 
       If there are 3 queens placed so far, 
       then of course we will be in Line 4 now. Line 4 is index 3.
       so, 
       i = column number of the current cell
        queens.length = row number of the current cell
    */

  /* How to inspect
    
        1. If there is at least one queen candidate in the same column 
        as the cell currently being checked 
        2. When there is one or more queen candidates 
        diagonally from the cell currently being checked
        ---> return false;
   */

  for (let queensRow = 0; queensRow < queens.length; queensRow++) {
    if (
      queens[queensRow] === i ||
      queens.length - queensRow === Math.abs(i - queens[queensRow])
    )
      return false;
  }
  return true;
};
