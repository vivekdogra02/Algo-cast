/**
 * 1402. Reducing Dishes
Hard

A chef has collected data on the satisfaction level of his n dishes. 
Chef can cook any dish in 1 unit of time.
Like-time coefficient of a dish is defined as the time taken to cook that 
dish including previous dishes multiplied by its satisfaction level i.e. time[i] * satisfaction[i].
Return the maximum sum of like-time coefficient that the chef can obtain after dishes preparation.
Dishes can be prepared in any order and the chef can discard some dishes to get this maximum value.

Example 1:

Input: satisfaction = [-1,-8,0,5,-9]
Output: 14
Explanation: After Removing the second and last dish, the maximum total like-time coefficient will be equal to (-1*1 + 0*2 + 5*3 = 14).
Each dish is prepared in one unit of time.
Example 2:

Input: satisfaction = [4,3,2]
Output: 20
Explanation: Dishes can be prepared in any order, (2*1 + 3*2 + 4*3 = 20)
Example 3:

Input: satisfaction = [-1,-4,-5]
Output: 0
Explanation: People do not like the dishes. No dish is prepared.
 

Constraints:

n == satisfaction.length
1 <= n <= 500
-1000 <= satisfaction[i] <= 1000
 */

/**
 * Solution 1- Recursion
 * T - (2N)
 * S - O(N)
 */

var maxSatisfaction = function (sat) {
  // sort satisfication
  sat.sort((a, b) => a - b);
  return solveRec(sat, 0, 0);
};

function solveRec(sat, index, time) {
  // base case
  if (index === sat.length) return 0;
  let inc = sat[index] * (time + 1) + solveRec(sat, index + 1, time + 1);
  let exc = 0 + solveRec(sat, index + 1, time);
  return Math.max(inc, exc);
}
/**
 * Solution 2 - Top down (recursion + memo)
 * T- O(N2)
 * S- O(N2)
 * 2D-DP as index is changing and time is also changing
 *                      index     time
 *                        0        0
 *                        |        |   (Top down)
 *                        |        |
 *                        |        |
 *                        |        |
 *                        n        n
 */
var maxSatisfaction = function (sat) {
  // sort satisfication
  sat.sort((a, b) => a - b);
  let n = sat.length;
  let dp = new Array(n + 1).fill(-1).map(() => new Array(n + 1).fill(-1));
  return solveMem(sat, 0, 0, dp);
};

function solveMem(sat, index, time, dp) {
  // base case
  if (index === sat.length) return 0;
  if (dp[index][time] !== -1) return dp[index][time];
  let inc = sat[index] * (time + 1) + solveMem(sat, index + 1, time + 1, dp);
  let exc = 0 + solveMem(sat, index + 1, time, dp);
  return (dp[index][time] = Math.max(inc, exc));
}

/**
 * Solution 3 - Bottom up (Tabulation)
 * T- O(N2)
 * S- O(N2)
 *  * 2D-DP as index is changing and time is also changing
 *          Go from n ---> 0 ( for bottom up approach)
 *                      index     time
 *                        0        0
 *                        |        |   (Bottom up)
 *                        |        |        ^
 *                        |        |        |
 *                        |        |
 *                        n        n
 */
var maxSatisfaction = function (sat) {
  // sort satisfication
  sat.sort((a, b) => a - b);
  return solveTab(sat);
};

function solveTab(sat) {
  let n = sat.length;
  let dp = new Array(n + 1).fill(0).map(() => new Array(n + 1).fill(0));
  // base case is not required as it already initialized with 0
  // if (index === sat.length) return 0;

  // bottom to top
  for (let i = n - 1; i >= 0; i--) {
    // time loop
    for (let time = i; time >= 0; time--) {
      let inc = sat[i] * (time + 1) + dp[i + 1][time + 1];
      let exc = 0 + dp[i + 1][time];
      dp[i][time] = Math.max(inc, exc);
    }
  }
  return dp[0][0];
}

/**
 * Solution -4 Space optimization
 * T - O(N2)
 * S - O(N)
 *    curr  curr
 *    row   col
 * dp[index][time]  ---> dp[index+1][time+1] (next row, next col)
 *                  --> dp[index+1][time]   (next row, curr col)
 * we dont need 2 d array (we only need next row, which means we need curr row and next row)
 */

function solveSpac(sat) {
  sat.sort((a, b) => a - b);
  let n = sat.length;
  let curr = new Array(n + 1).fill(0);
  let next = new Array(n + 1).fill(0);

  // base case is not required as it already initialized with 0
  // if (index === sat.length) return 0;

  // bottom to top
  for (let i = n - 1; i >= 0; i--) {
    // time loop
    for (let time = i; time >= 0; time--) {
      let inc = sat[i] * (time + 1) + next[time + 1];
      let exc = 0 + next[time];
      curr[time] = Math.max(inc, exc);
    }
    next = curr;
  }
  return next[0];
}

/**
 * Simple solution
 */
var maxSatisfaction = function (sat) {
  sat.sort((a, b) => b - a);
  let sum = 0;
  let diff = 0;
  for (const num of sat) {
    diff += num;
    if (diff < 0) {
      break;
    }
    sum += diff;
  }
  return sum;
};

var maxSatisfaction = function (satisfaction) {
  const sortedList = satisfaction.sort((x, y) => y - x);
  let total = 0,
    accu = 0;
  for (const one of sortedList) {
    accu += one;
    if (accu <= 0) {
      return total;
    } else {
      total += accu;
    }
  }
  return total;
};

/**
 * Super fast
 *  Runtime: 59 ms, faster than 98.84% of JavaScript online submissions for Reducing Dishes.
    Memory Usage: 41.7 MB, less than 98.84% of JavaScript online submissions for Reducing Dishes.
 */
var maxSatisfaction = function (arr) {
  arr.sort((a, b) => a - b);
  let max = arr.reduce((a, b, i) => a + b * (i + 1));
  let sum = arr.reduce((a, b) => a + b, 0);
  for (let i = 0; i < arr.length; i++) {
    if (max > max - sum) return max;
    max -= sum;
    sum -= arr[i];
  }
  return 0;
};
