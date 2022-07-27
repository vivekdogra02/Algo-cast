/**
 * You are given an integer array cost where cost[i] is the cost of ith step on a staircase.
Once you pay the cost, you can either climb one or two steps.
You can either start from the step with index 0, or the step with index 1.

Return the minimum cost to reach the top of the floor.
Example 1:

Input: cost = [10,15,20]
Output: 15
Explanation: You will start at index 1.
- Pay 15 and climb two steps to reach the top.
The total cost is 15.
Example 2:

Input: cost = [1,100,1,1,1,100,1,1,100,1]
Output: 6
Explanation: You will start at index 0.
- Pay 1 and climb two steps to reach index 2.
- Pay 1 and climb two steps to reach index 4.
- Pay 1 and climb two steps to reach index 6.
- Pay 1 and climb one step to reach index 7.
- Pay 1 and climb two steps to reach index 9.
- Pay 1 and climb one step to reach the top.
The total cost is 6.
 

Constraints:

2 <= cost.length <= 1000
0 <= cost[i] <= 999
 */

// Solution 1 - Brute force Simple solution
var minCostClimbingStairs = function (cost) {
  for (let i = 2; i < cost.length; i++) {
    cost[i] = cost[i] + Math.min(cost[i - 2], cost[i - 1]);
  }
  return Math.min(cost[cost.length - 2], cost[cost.length - 1]);
};

// Solution 2
// With dp
var minCostClimbingStairs = function (cost) {
  // edge cases
  if (cost == null || cost.length <= 1) {
    return 0;
  }
  // initialization
  let dp = new Array(cost.length + 1);
  // base cases
  dp[0] = 0;
  dp[1] = cost[0];
  // iterate over the cost array
  for (let i = 1; i < cost.length; i++) {
    dp[i + 1] = cost[i] + Math.min(dp[i], dp[i - 1]);
  }
  // min cost to visit the top step
  return Math.min(dp[dp.length - 1], dp[dp.length - 2]);
};

// Solution 3
// With dp
var minCostClimbingStairs = function (cost) {
  let dp = new Array(cost.length + 1).fill(0);

  for (let i = 2; i <= cost.length; i++) {
    dp[i] = Math.min(cost[i - 1] + dp[i - 1], cost[i - 2] + dp[i - 2]);
  }
  return dp[cost.length];
};

// Solution 4 - space optimization T-O(N) S-O(1)
// With dp

function solve(n, cost) {
  // space optimization
  /**
   * We know, pattern prev1 = i-2 perv2 = i - 1, keep that in variables and do sum, there will
   * O(1) space required
   */
  let prev1 = cost[1]; // Space optimization
  let prev2 = cost[0]; // space optimization

  for (let i = 2; i < n; i++) {
    let curr = cost[i] + Math.min(prev1, prev2);
    prev2 = prev1; // Space optimization - assign variables to the next
    prev1 = curr; // Space optimization
  }
  return Math.min(prev1, prev2);
}
var minCostClimbingStairs = function (cost) {
  let n = cost.length;
  return solve(n, cost);
};

// Solution 6
var minCostClimbingStairs = function (cost) {
  let pre = cost[0];
  let cur = cost[1];

  for (let i = 2; i <= cost.length; i++) {
    const temp = cur;
    cur = Math.min(pre, cur) + (cost[i] || 0);
    pre = temp;
  }

  return cur;
};

// Solution 7
function minCostClimbingStairs(cost) {
  const n = cost.length;
  let dp = new Array(n + 1).fill(0);
  // tabulation
  dp[0] = 0;
  dp[1] = 1;

  for (let i = 2; i < n; i++) {
    dp[i] = cost[i] + Math.min(dp[i - 2], dp[i - 1]);
  }
  return Math.min(dp[n - 2], dp[n - 1]);
}
