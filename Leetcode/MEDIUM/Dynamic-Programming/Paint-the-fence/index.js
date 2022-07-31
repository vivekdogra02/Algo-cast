/**
 *
 */

/**
 * Solution 1 - Recursion
 * T- o(2n)
 * s - O(2n)
 */

function solveRec(n, k) {
  // base case
  if (n === 1) return k;
  if (n === 2) return k + k * (k - 1);

  let ans = solveRec(n - 2, k) * (k - 1) + solveRec(n - 1, k) * (k - 1);
  return ans;
}

function paintTheFence(n, k) {
  return solveRec(n, k);
}

/**
 * Solution 2 - Top down (recursion + memo)
 *  T- o(n)
 * s - O(n) + O(N)
 */
function solveMem(n, k, dp) {
  // base case
  if (n === 1) return k;
  if (n === 2) return k + k * (k - 1);

  if (dp[n] !== -1) {
    return dp[n];
  }
  dp[n] = solveRec(n - 2, k, dp) * (k - 1) + solveRec(n - 1, k, dp) * (k - 1);
  return dp[n];
}

function paintTheFence(n, k) {
  let dp = new Array(n + 1).fill(-1);
  return solveMem(n, k, dp);
}

/**
 * Solution 3 - Bottom up (Tabulation)
 * T- o(n)
 * s - O(n)
 */

function paintTheFence(n, k) {
  let dp = new Array(n + 1).fill(-1);

  dp[1] = k;
  dp[2] = k + k * (k - 1);

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 2] * (k - 1) + dp[i - 1] * (k - 1);
  }

  return dp[n];
}

/**
 * Solution 4 - space optimization as dp[i] is dependent on dp[i-2] and dp[i-1] so
 * we can store these in prev2, and prev1 and use the variable for constant time
 * T - O(N)
 * S-O(1)
 */

function paintTheFence(n, k) {
  let prev2 = k;
  let prev1 = k + k * (k - 1);

  for (let i = 3; i <= n; i++) {
    let ans = prev2 * (k - 1) + prev1 * (k - 1);
    prev2 = prev1;
    prev1 = ans;
  }
  return prev1;
}
