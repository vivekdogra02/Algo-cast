/**
 * 322. Coin Change
 * You are given an integer array coins representing coins of different denominations 
 * and an integer amount representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. 
If that amount of money cannot be made up by any combination of the coins, return -1.

You may assume that you have an infinite number of each kind of coin.
Example 1:

Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1
Example 2:

Input: coins = [2], amount = 3
Output: -1
Example 3:

Input: coins = [1], amount = 0
Output: 0
 

Constraints:

1 <= coins.length <= 12
1 <= coins[i] <= 231 - 1
0 <= amount <= 104
 */

// Solution - 1 (Recursion)  T= O(2n) S-O(x)

function coinChange(nums, x) {
  // nums = coins
  // x = target
  let ans = solveRec(nums, x);
  if (ans === Number.MAX_VALUE) return -1;
  return ans;
}

function solveRec(nums, x) {
  // base case
  if (x === 0) return 0;
  if (x < 0) return Number.MAX_VALUE;
  let min;
  for (let i = 0; i < nums.length; i++) {
    let ans = solveRec(nums, x - nums[i]);

    if (ans !== Number.MAX_VALUE) {
      min = Math.min(min, 1 + ans);
    }
  }

  return min;
}

// ------------------------------------------------------------------------------

/**
 * Solution 2 - Recursion  + memoization (top down apporach)  Dyanamic Programming
 * T - O(x * N)  where n: no. of coins x:target
 * space - O(N) + O(N)
 */

function coinChange(nums, x) {
  // nums = coins
  // x = target
  // 1.  Initialize an array dp with max value and pass to the recursive function
  let dp = new Array(x + 1).fill(Number.MAX_VALUE);
  let ans = solveMem(nums, x, dp);
  if (ans === Number.MAX_VALUE) return -1;
  return ans;
}

function solveMem(nums, x, dp) {
  // base case
  if (x === 0) return 0;
  if (x < 0) return Number.MAX_VALUE;
  let min = Number.MAX_VALUE;

  // Step 2
  if (dp[x] !== Number.MAX_VALUE) {
    return dp[x];
  }

  for (let i = 0; i < nums.length; i++) {
    let ans = solveMem(nums, x - nums[i], dp);

    if (ans !== Number.MAX_VALUE) {
      min = Math.min(min, 1 + ans);
    }
  }
  // Step 3 == add min to the dp array
  dp[x] = min;

  return min;
}

// ------------------------------------------------------------------------------

/**
 * Solution 3- Tabulation (Bottom up apporach)  Dyanamic Programming
 * T - O(x * N)  where n: no. of coins x:target
 * space - O(N)
 */

function coinChange(coins, x) {
  // nums = coins
  // x = target
  // 1.  Initialize an array dp with max value
  let dp = new Array(x + 1).fill(Number.MAX_VALUE);

  // base case
  dp[0] = 0;

  for (let coin of coins) {
    for (let i = 0; i < dp.length; i++) {
      if (i >= coin) {
        let idx = i - coin;
        let potetialAmt = 1 + dp[idx];
        dp[i] = Math.min(dp[i], potetialAmt);
      }
    }
  }

  return dp[dp.length - 1] === Number.MAX_VALUE ? -1 : dp[dp.length - 1];
}
