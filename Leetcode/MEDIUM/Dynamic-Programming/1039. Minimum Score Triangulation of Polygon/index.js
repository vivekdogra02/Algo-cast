/**
 * 1039. Minimum Score Triangulation of Polygon
Medium

You have a convex n-sided polygon where each vertex has an integer value. 
You are given an integer array values where values[i] 
is the value of the ith vertex (i.e., clockwise order).

You will triangulate the polygon into n - 2 triangles.
 For each triangle, the value of that triangle is the product of the values of its vertices,
  and the total score of the triangulation is 
  the sum of these values over all n - 2 triangles in the triangulation.

Return the smallest possible total score 
that you can achieve with some triangulation of the polygon.

Example 1:
Input: values = [1,2,3]
Output: 6
Explanation: The polygon is already triangulated, and the score of the only triangle is 6.

Example 2:
Input: values = [3,7,4,5]
Output: 144
Explanation: There are two triangulations, 
with possible scores: 3*7*5 + 4*5*7 = 245, or 3*4*5 + 3*4*7 = 144.
The minimum score is 144.

Example 3:
Input: values = [1,3,1,4,1,5]
Output: 13
Explanation: The minimum score triangulation has score 1*1*3 + 1*1*4 + 1*1*5 + 1*1*1 = 13.
 
Constraints:

n == values.length
3 <= n <= 50
1 <= values[i] <= 100
 */

/**
 * Solution 1 - Recursion
 * T -  O(2N)
 */

// Recursion

function solveRec(value, i, j) {
  // base case

  if (i + 1 === j) return 0;
  let ans = Number.MAX_VALUE;
  for (let k = i + 1; k < j; k++) {
    ans = Math.min(
      ans,
      value[i] * value[j] * value[k] +
        solveRec(value, i, k) +
        solveRec(value, k, j)
    );
  }
  return ans;
}
var minScoreTriangulation = function (values) {
  let n = values.length;
  return solveRec(values, 0, n - 1);
};

/**
 * Solution 2 - Top down (Recursion + memo)
 * T -  O(N)
 * S -  O(N2)
 */

function solveMem(value, i, j, dp) {
  // base case
  if (i + 1 === j) return 0;
  if (dp[i][j] !== -1) return dp[i][j];
  let ans = Number.MAX_VALUE;
  for (let k = i + 1; k < j; k++) {
    ans = Math.min(
      ans,
      value[i] * value[j] * value[k] +
        solveMem(value, i, k, dp) +
        solveMem(value, k, j, dp)
    );
  }
  dp[i][j] = ans;
  return dp[i][j];
}
var minScoreTriangulation = function (values) {
  let n = values.length;
  let dp = new Array(n).fill(-1).map(() => Array(n).fill(-1));
  return solveMem(values, 0, n - 1, dp);
};

/**
 * Solution 3 - Bottom up (Tabulation)
 * T- O(N3)
 * S - O(N2)
 */

function solveTab(value) {
  // base case
  let n = value.length;
  let dp = new Array(n).fill(0).map(() => Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 2; j < n; j++) {
      let ans = Number.MAX_VALUE;
      for (let k = i + 1; k < j; k++) {
        ans = Math.min(
          ans,
          value[i] * value[j] * value[k] + dp[i][k] + dp[k][j]
        );
      }
      dp[i][j] = ans;
    }
  }

  return dp[0][n - 1];
}
var minScoreTriangulation = function (values) {
  let n = values.length;
  return solveTab(values);
};
