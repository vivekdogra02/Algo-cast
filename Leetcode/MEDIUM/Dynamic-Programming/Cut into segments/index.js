/**
 * Cut the rod into segments
 * you are given an integer 'N' as the length of the rod
 * You need to determine the max number of segments you can make of this rod provided that
 * each segment should be a length of X, Y, Z
 */

// Solution 1 - Recursion

function solveRec(n, x, y, z) {
  // base case
  if (n < 0) return Number.MIN_VALUE;
  if (n === 0) return 0;

  let a = solveRec(n - x, x, y, z) + 1;
  let b = solveRec(n - y, x, y, z) + 1;
  let c = solveRec(n - z, x, y, z) + 1;

  let ans = Math.max(a, Math.max(b, c));
  return ans;
}
function cutSegments(n, x, y, z) {
  let ans = solveRec(n, x, y, z);
  if (ans < Number.MIN_VALUE) return 0;
  return ans;
}

/**
 * Solution 2 - DP (Recursion + Memoization) - Top down approach
 *  T - O(N)
 * S = O(N) + O(N)
 */
function solveMem(n, x, y, z, dp) {
  // base case
  if (n < 0) return Number.MIN_VALUE;
  if (n === 0) return 0;

  if (dp[n] !== -1) {
    return dp[n];
  }
  let a = solveMem(n - x, x, y, z, dp) + 1;
  let b = solveMem(n - y, x, y, z, dp) + 1;
  let c = solveMem(n - z, x, y, z, dp) + 1;

  dp[n] = Math.max(a, Math.max(b, c));
  return dp[n];
}
function cutSegments(n, x, y, z) {
  let dp = new Array(n + 1).fill(-1);

  let ans = solveMem(n, x, y, z, dp);
  if (ans < 0) return 0;
  return ans;
}
/**
 * Solution 3 - DP (Tabulation) - Bottom up approach
 * T - O(N)
 * Sp - O(N)
 */

function cutSegments(n, x, y, z) {
  let dp = new Array(n + 1).fill(Number.MIN_VALUE);

  dp[0] = 0;

  for (let i = 1; i <= n; i++) {
    if (i - x >= 0) dp[i] = Math.max(dp[i], dp[i - x] + 1);
    if (i - y >= 0) dp[i] = Math.max(dp[i], dp[i - y] + 1);
    if (i - z >= 0) dp[i] = Math.max(dp[i], dp[i - z] + 1);
  }

  if (dp[n] < 0) return 0;
  else return dp[n];
}
/**
 * Solution 4 space optimization
 * as dp is dependent on three things
 * dp[i-x] , dp[i-y], dp[i-z] but we are not aware of x, y and z exactly, so
 * space optimization is not possible due to this
 * Worst case is that if we have multiple data points, and dp[i- anydatapoint], so we cannt determine
 * what all possible x, y, z combination are possible.
 */
