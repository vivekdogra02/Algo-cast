/**
 * Largest square area in a matrix
 * Given a matrix of m * n, find out the maximum size square submatrix with all 1s.
 * eg : - m =2 n =2
 * mat = [[1,1], [1,1]]  --- output -> 2 as max sub matrix is 2
 *
 * eg: m = 2, n=2
 * mat= [[0,0], [0,0]] --> output -> 0 as there is no 1s present
 */

/**
 * Solution 1 - Recursion
 * T - O(2N)
 * S - O(2N)
 */
function solveRec(i, j, mat, maxi) {
  // base case
  if (i >= mat.length || j >= mat[0].length) return 0;

  let right = solveRec(i, j + 1, mat, maxi);
  let diagonal = solveRec(i + 1, j + 1, mat, maxi);
  let down = solveRec(i + 1, j, mat, maxi);

  if (mat[i][j] === 1) {
    let ans = 1 + Math.min(right, Math.min(diagonal, down));
    maxi = Math.max(maxi, ans);
    return ans;
  } else {
    return 0;
  }
}
function maxSquare(n, m, mat) {
  let maxi = 0;
  maxi = solveRec(n, m, mat, maxi);
  return maxi;
}

/**
 * Solution 2 - recursion + memo (Top down)
 * T - O(m * n)
 * S - O(m * n)
 */

function solveMem(i, j, mat, maxi, dp) {
  // base case
  if (i >= mat.length || j >= mat[0].length) return 0;
  if (dp[i][j] !== -1) return dp[i][j];
  let right = solveMem(i, j + 1, mat, maxi, dp);
  let diagonal = solveMem(i + 1, j + 1, mat, maxi, dp);
  let down = solveMem(i + 1, j, mat, maxi, dp);

  if (mat[i][j] === 1) {
    dp[i][j] = 1 + Math.min(right, Math.min(diagonal, down));
    maxi = Math.max(maxi, dp[i][j]);
    return dp[i][j];
  } else {
    return dp[i][j];
  }
}
function maxSquare(n, m, mat) {
  let maxi = 0;
  let dp = new Array(n).fill(-1).map(() => Array(m).fill(-1));
  maxi = solveMem(0, 0, mat, maxi, dp);
  return maxi;
}

/**
 * Solution 3 - Bottom up (tabulation)
 * T - O(m * n)
 * S - O(m * n)
 */

function solveTab(mat, maxi) {
  // step 1
  let row = mat.length;
  let col = mat[0].length;
  let dp = new Array(row + 1).fill(0).map(() => Array(col + 1).fill(0));

  for (let i = row - 1; i >= 0; i--) {
    for (let j = col - 1; j >= 0; j--) {
      let right = dp[i][j + 1];
      let diagonal = dp[i + 1][j + 1];
      let down = dp[i + 1][j];
      if (mat[i][j] === 1) {
        dp[i][j] = 1 + Math.min(right, Math.min(diagonal, down));
        maxi = Math.max(maxi, dp[i][j]);
      } else {
        dp[i][j] = 0;
      }
    }
  }
  return dp[0][0];
}

function maxSquare(n, m, mat) {
  let maxi = 0;
  maxi = solveTab(mat, maxi);
  return maxi;
}

/**
 * Solution 4 - Space optimization
 * T - O()
 * S-  O(M)
 * in this one
 *                                  1. dp[i][j+1] -> same row next col (Same row)
 * dp[i][j] --> depends on 3 things 2. dp[i+1][j+1] --> next row next col (Next Row)
 * current row                      3. dp[i+1][j]  -> next row same col   (Next row)
 *
 * which means we can solve it using two rows only current row and next row,
 * eg: -> if we have two rows, one is curr, other is next ,,, it can be solve in O(M) space complexity
 */

function solveSpaceOpt(mat, maxi) {
  // step 1
  let row = mat.length;
  let col = mat[0].length;
  let curr = new Array(col + 1).fill(0);
  let next = new Array(col + 1).fill(0);

  for (let i = row - 1; i >= 0; i--) {
    for (let j = col - 1; j >= 0; j--) {
      let right = curr[j + 1];
      let diagonal = next[j + 1];
      let down = next[j];
      if (mat[i][j] === 1) {
        curr[j] = 1 + Math.min(right, Math.min(diagonal, down));
        maxi = Math.max(maxi, curr[j]);
      } else {
        curr[j] = 0;
      }
    }
    next = curr;
  }
  return next[0];
}

function maxSquare(n, m, mat) {
  let maxi = 0;
  maxi = solveSpaceOpt(mat, maxi);
  return maxi;
}

/**
 * Solution - 5
 * using dp -bottom up
 */

var maximalSquare = function (matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const dp = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(0));
  let max = 0;

  if (rows === 0) return 0;

  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      if (matrix[i - 1][j - 1] == "1") {
        // take diagonal from matrix because dp starts with 0, therefore, dp and matrix don't match up with number of rows and cols
        dp[i][j] =
          1 + Math.min(dp[i - 1][j], Math.min(dp[i][j - 1], dp[i - 1][j - 1]));
        // get min value from up, down, and diagonal and add 1 to it
        if (max < dp[i][j]) max = dp[i][j];
      }
    }
  }
  return max * max;
};

/**
 * Solution 6
 */

var maximalSquare = function (matrix) {
  const rows = matrix.length,
    cols = matrix[0].length;

  if (!rows || !cols) return 0;

  let res = 0;
  let maxSqs = [...matrix];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (matrix[row][col] === "0") {
        maxSqs[row][col] = 0;
      } else {
        maxSqs[row][col] = getMinWithinBounds(row, col, maxSqs) + 1;
        res = Math.max(res, maxSqs[row][col]);
      }
    }
  }

  return res * res;
};

function getMinWithinBounds(row, col, matrix) {
  if (row === 0 || col === 0) {
    return 0;
  }

  return parseInt(
    Math.min(
      matrix[row - 1][col - 1],
      matrix[row - 1][col],
      matrix[row][col - 1]
    )
  );
}
