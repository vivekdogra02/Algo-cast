/**
 * 279. Perfect Squares
Medium
Given an integer n, return the least number of perfect square numbers that sum to n.

A perfect square is an integer that is the square of an integer;
 in other words, it is the product of some integer with itself. 
 For example, 1, 4, 9, and 16 are perfect squares while 3 and 11 are not.

Example 1:

Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4.
Example 2:

Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.
 */
/**
 * Solution 1- Recursion
 */

function solveRec(n) {
  // base case
  if (n === 0) return 0;

  let ans = n;

  for (let i = 1; i * i <= n; i++) {
    let temp = i * i;

    ans = Math.min(ans, 1 + solveRec(n - temp));
  }
  return ans;
}
function numSquares(n) {
  return solveRec(n);
}

/**
 * Solution 2 - Recursion + memo (Top down)
 */

function solveMem(n, dp) {
  // base case
  if (n === 0) return 0;
  if (dp[n] !== -1) {
    return dp[n];
  }
  let ans = n;

  for (let i = 1; i * i <= n; i++) {
    let temp = i * i;

    ans = Math.min(ans, 1 + solveMem(n - temp, dp));
  }
  dp[n] = ans;
  return dp[n];
}
function numSquares(n) {
  let dp = new Array(n + 1).fill(-1);
  return solveMem(n, dp);
}

/**
 * Solution 3 - Bottom up approach (Tabulation)
 */

function solveTab(n, dp) {
  let dp = new Array(n + 1).fill(Number.MAX_VALUE);
  // base case
  dp[0] = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j * j <= n; j++) {
      let temp = j * j;
      if (i - temp >= 0) {
        dp[i] = Math.min(dp[i], dp[i - temp]);
      }
    }
  }
  return dp[n];
}
