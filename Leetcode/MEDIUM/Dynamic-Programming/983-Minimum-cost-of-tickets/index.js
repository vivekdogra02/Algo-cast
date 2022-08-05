/**
 * 983. Minimum Cost For Tickets
Medium
You have planned some train traveling one year in advance. 
The days of the year in which you will travel are given as an integer array days. 
Each day is an integer from 1 to 365.

Train tickets are sold in three different ways:

a 1-day pass is sold for costs[0] dollars,
a 7-day pass is sold for costs[1] dollars, and
a 30-day pass is sold for costs[2] dollars.
The passes allow that many days of consecutive travel.

For example, if we get a 7-day pass on day 2,
 then we can travel for 7 days: 2, 3, 4, 5, 6, 7, and 8.
Return the minimum number of dollars you need to travel every day in the given list of days.

 

Example 1:

Input: days = [1,4,6,7,8,20], costs = [2,7,15]
Output: 11
Explanation: For example, here is one way to buy passes that lets you travel your travel plan:
On day 1, you bought a 1-day pass for costs[0] = $2, which covered day 1.
On day 3, you bought a 7-day pass for costs[1] = $7, which covered days 3, 4, ..., 9.
On day 20, you bought a 1-day pass for costs[0] = $2, which covered day 20.
In total, you spent $11 and covered all the days of your travel.
Example 2:

Input: days = [1,2,3,4,5,6,7,8,9,10,30,31], costs = [2,7,15]
Output: 17
Explanation: For example, here is one way to buy passes that lets you travel your travel plan:
On day 1, you bought a 30-day pass for costs[2] = $15 which covered days 1, 2, ..., 30.
On day 31, you bought a 1-day pass for costs[0] = $2 which covered day 31.
In total, you spent $17 and covered all the days of your travel.

Constraints:

1 <= days.length <= 365
1 <= days[i] <= 365
days is in strictly increasing order.
costs.length == 3
1 <= costs[i] <= 1000
 */

/**
 * Solution 1
 * Recursion = O(2N)
 */

function solveRec(n, days, costs, index) {
  // base case
  if (index >= n) return 0;

  // 1 day pass
  let option1 = costs[0] + solveRec(n, days, costs, index + 1);
  let i;
  // 7 day pass
  for (i = index; i < n && days[i] < days[index] + 7; i++);
  let option2 = costs[1] + solveRec(n, days, costs, i);

  // 30 day pass
  for (i = index; i < n && days[i] < days[index] + 30; i++);
  let option3 = costs[2] + solveRec(n, days, costs, i);

  return Math.min(option1, Math.min(option2, option3));
}
var mincostTickets = function (days, costs) {
  let n = days.length;
  let index = 0;

  return solveRec(n, days, costs, index);
};

/**
 * Solution 2 - Top down approach(Rec + memo)
 * T  - O(1) - it depends on index (days )in a year 365 days are there
 * so  dp[365] - dp will contain at max 365 index which is having O(1)
 *S - O(N)
 */

function solveMem(n, days, costs, index, dp) {
  // base case
  if (index >= n) return 0;

  if (dp[index] !== -1) return dp[index];
  // 1 day pass
  let option1 = costs[0] + solveMem(n, days, costs, index + 1, dp);
  let i;
  // 7 day pass
  for (i = index; i < n && days[i] < days[index] + 7; i++);
  let option2 = costs[1] + solveMem(n, days, costs, i, dp);

  // 30 day pass
  for (i = index; i < n && days[i] < days[index] + 30; i++);
  let option3 = costs[2] + solveMem(n, days, costs, i, dp);

  dp[index] = Math.min(option1, Math.min(option2, option3));
  return dp[index];
}
var mincostTickets = function (days, costs) {
  let n = days.length;
  let index = 0;
  let dp = new Array(n + 1).fill(Number.MAX_VALUE);
  return solveMem(n, days, costs, index, dp);
};

/**
 * Solution 3 -Bottom up (Tabulation)
 * T - O(N) - as we are having a for loop from n-1 to 0
 * s - O(N)
 */

function solveTab(n, days, costs) {
  let dp = new Array(n + 1).fill(Number.MAX_VALUE);
  // base case
  dp[n] = 0;

  for (let k = n - 1; k >= 0; k--) {
    // 1 day pass
    let option1 = costs[0] + dp[k + 1];
    let i;
    // 7 day pass
    for (i = k; i < n && days[i] < days[k] + 7; i++);
    let option2 = costs[1] + dp[i];

    // 30 day pass
    for (i = k; i < n && days[i] < days[k] + 30; i++);
    let option3 = costs[2] + dp[i];

    dp[k] = Math.min(option1, Math.min(option2, option3));
  }
  return dp[0];
}
var mincostTickets = function (days, costs) {
  let n = days.length;

  return solveTab(n, days, costs);
};

/**
 * Solution - 4 - Space optimization
 * can we improve space to O(1) ?  YES
 * you can use queue for constant space
 */
