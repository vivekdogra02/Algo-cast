/**
 * 1155. Number of Dice Rolls With Target Sum
 * You have n dice and each die has k faces numbered from 1 to k.

Given three integers n, k, and target, 
return the number of possible ways (out of the kn total ways) 
to roll the dice so the sum of the face-up numbers equals target.
 Since the answer may be too large, return it modulo 109 + 7.
Example 1:
Input: n = 1, k = 6, target = 3
Output: 1
Explanation: You throw one die with 6 faces.
There is only one way to get a sum of 3

Example 2:
Input: n = 2, k = 6, target = 7
Output: 6
Explanation: You throw two dice, each with 6 faces.
There are 6 ways to get a sum of 7: 1+6, 2+5, 3+4, 4+3, 5+2, 6+1.

Example 3:
Input: n = 30, k = 30, target = 500
Output: 222616187
Explanation: The answer must be returned modulo 109 + 7.
Constraints:

1 <= n, k <= 30
1 <= target <= 1000
 */

/**
 * Solution 1 -- Recursion
 */

function solve(dice, faces, target) {
  // base case
  if (target < 0) {
    return 0;
  }
  if (dice === 0 && target !== 0) {
    return 0;
  }
  if (dice !== 0 && target === 0) return 0;
  if (dice === 0 && target === 0) return 1;

  let ans = 0;
  for (let i = 1; i <= faces; i++) {
    ans = ans + solve(dice - 1, faces, target - i);
  }
  return ans;
}
var numRollsToTarget = function (n, k, target) {
  return solve(n, k, target);
};

/**
 * Solution 2 -- Recursion + memo (Top down approach)
 */

function solveMem(dice, faces, target, dp) {
  // base case
  const MOD = BigInt(10) ** BigInt(9) + BigInt(7); // 10^9 + 7.
  if (target < 0) {
    return BigInt(0);
  }
  if (dice === 0 && target !== 0) {
    return BigInt(0);
  }
  if (dice !== 0 && target === 0) return BigInt(0);
  if (dice === 0 && target === 0) return BigInt(1);

  if (dp[dice][target] !== -1) return dp[dice][target];

  let ans = BigInt(0);
  for (let i = 1; i <= faces; i++) {
    ans = ans + solveMem(dice - 1, faces, target - i, dp);
  }
  dp[dice][target] = ans;
  return dp[dice][target] % MOD;
}
var numRollsToTarget = function (n, k, target) {
  let dp = new Array(n + 1).fill(-1).map(() => Array(target + 1).fill(-1));
  return solveMem(n, k, target, dp);
};

/**
 * Solution 3 -- Tabulation (Bottom Up Approach)
 * T - O(N3)
 * S - O(N * T)
 */

function solveTab(d, f, t) {
  let dp = new Array(d + 1).fill(0).map(() => Array(t + 1).fill(0));
  // base case
  const MOD = BigInt(10) ** BigInt(9) + BigInt(7); // 10^9 + 7.
  dp[0][0] = 1;

  for (let dice = 1; dice <= d; dice++) {
    for (let target = 1; target <= t; target++) {
      let ans = BigInt(0);
      for (let i = 1; i <= f; i++) {
        if (target - i >= 0) {
          ans = ans + BigInt(dp[dice - 1][target - i]);
        }
      }
      dp[dice][target] = ans;
    }
  }

  return dp[d][t] % MOD;
}
var numRollsToTarget = function (n, k, target) {
  return solveTab(n, k, target);
};

/**
 * Solution 4 -- Space optimization
 *
 * dp[dice][target]  ----------> dp[dice-1][target - i]
 * we dont need to have 2D Array as we only need two row, curr and prev
 *  T - O(N3)
 * S - O(N)
 */

function solveSpaceOpt(d, f, t) {
  let prev = new Array(d + 1).fill(0);
  let curr = new Array(t + 1).fill(0);

  // base case
  const MOD = BigInt(10) ** BigInt(9) + BigInt(7); // 10^9 + 7.
  prev[0] = 1;

  for (let dice = 1; dice <= d; dice++) {
    for (let target = 1; target <= t; target++) {
      let ans = BigInt(0);
      for (let i = 1; i <= f; i++) {
        if (target - i >= 0) {
          ans = ans + BigInt(prev[target - i]);
        }
      }
      curr[target] = ans;
    }
    prev = curr;
  }

  return prev[t] % MOD;
}
var numRollsToTarget = function (n, k, target) {
  return solveSpaceOpt(n, k, target);
};
