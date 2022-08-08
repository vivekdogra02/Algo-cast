/**
 * 1388. Pizza With 3n Slices
Hard
There is a pizza with 3n slices of varying size, you and your friends will take slices of pizza 
as follows:

You will pick any pizza slice.
Your friend Alice will pick the next slice in the anti-clockwise direction of your pick.
Your friend Bob will pick the next slice in the clockwise direction of your pick.
Repeat until there are no more slices of pizzas.
Given an integer array slices that represent the sizes of the pizza slices in a clockwise direction, 
return the maximum possible sum of slice sizes that you can pick.

Input: slices = [1,2,3,4,5,6]
Output: 10
Explanation: Pick pizza slice of size 4, Alice and Bob will pick slices with size 3 and 5 respectively.
 Then Pick slices with size 6, 
finally Alice and Bob will pick slice of size 2 and 1 respectively. Total = 4 + 6.

Input: slices = [8,9,8,6,1,1]
Output: 16
Explanation: Pick pizza slice of size 8 in each turn. If you pick slice with size 9
your partners will pick slices of size 8. 

Constraints:
3 * n == slices.length
1 <= slices.length <= 500
1 <= slices[i] <= 1000
 */
/** ---------------------------------------------------------------------------------------------- */

/**
 * Solution -1 Recursion
 *
 */

function solveRec(index, endIndex, slices, n) {
  // base case
  if (n === 0 || index > endIndex) return 0;

  let inc = slices[index] + solveRec(index + 2, endIndex, slices, n - 1);
  let exc = 0 + solveRec(index + 1, endIndex, slices, n);
  return Math.max(inc, exc);
}

var maxSizeSlices = function (slices) {
  let k = slices.length;

  const case1 = solveRec(0, k - 2, slices, k / 3); // Include first index and discard last index
  const case2 = solveRec(1, k - 1, slices, k / 3); // Include last index and discard first index

  return Math.max(case1, case2);
};
/** ---------------------------------------------------------------------------------------------- */

/**
 * Solution - 2 (Recursion + memo) = Top down
 * 2D dp - as two things changes
 * [index] ---
 * [n] ----
 */
function solveMem(index, endIndex, slices, n, dp) {
  // base case
  if (n === 0 || index > endIndex) return 0;

  if (dp[index][n] !== -1) return dp[index][n];
  let inc = slices[index] + solveMem(index + 2, endIndex, slices, n - 1, dp);
  let exc = 0 + solveMem(index + 1, endIndex, slices, n, dp);
  return (dp[index][n] = Math.max(inc, exc));
}

var maxSizeSlices = function (slices) {
  let k = slices.length;
  /** We need to create two dp array as we are calling two recursive call */
  let dp1 = new Array(k).fill(-1).map(() => Array(k).fill(-1));
  const case1 = solveMem(0, k - 2, slices, k / 3, dp1); // Include first index and discard last index

  let dp2 = new Array(k).fill(-1).map(() => Array(k).fill(-1));
  const case2 = solveMem(1, k - 1, slices, k / 3, dp2); // Include last index and discard first index

  return Math.max(case1, case2);
};
/** ---------------------------------------------------------------------------------------------- */

/**
 * Solution - 3 (Tabulation) = Bottom up
 * 2D dp - as two things changes
 * [index] ---
 * [n] ----
 *
 * T - O(n2)
 * S - O(k2)
 */
function solveTab(slices, type) {
  let k = slices.length;
  /** We need to create two dp array as we are calling two recursive call */

  if (type === 1) {
    let dp1 = new Array(k + 2).fill(0).map(() => Array(k + 2).fill(0));
    // loop for case 1
    for (let index = k - 2; index >= 0; index--) {
      for (let n = 1; n <= k / 3; n++) {
        let inc = slices[index] + dp1[index + 2][n - 1];
        let exc = 0 + dp1[index + 1][n];

        dp1[index][n] = Math.max(inc, exc);
      }
    }
    const case1 = dp1[0][k / 3];
    return case1;
  }

  if (type === 2) {
    let dp2 = new Array(k + 2).fill(0).map(() => Array(k + 2).fill(0));
    // loop for case 2
    for (let index = k - 1; index >= 1; index--) {
      for (let n = 1; n <= k / 3; n++) {
        let inc = slices[index] + dp2[index + 2][n - 1];
        let exc = 0 + dp2[index + 1][n];

        dp2[index][n] = Math.max(inc, exc);
      }
    }
    const case2 = dp2[1][k / 3];
    return case2;
  }
}

var maxSizeSlices = function (slices) {
  let k = slices.length;

  const case1 = solveTab(slices, 1); // Include first index and discard last index

  const case2 = solveTab(slices, 2); // Include last index and discard first index

  return Math.max(case1, case2);
};

/** ---------------------------------------------------------------------------------------------- */

/**
 * Can we do space optimization
 *                                     dp[index+2][n-1] (Next Row)
 * dp[index][n]  ->>>>> Depends >>>>>
 *  (prev row )                         dp[index+1][n] (Curr row)
 *  We need 3 rows for space optimization rather than creating 2D - dp
 *  Lets try
 * * T - O(n2)
 * S - O( 6 * K)
 */
function solveSpaceOpt(slices, type) {
  let k = slices.length;
  /** We do not need to create two dp array */
  if (type === 1) {
    // for holding first iteration (first case)
    let curr1 = new Array(k + 2).fill(0);
    let prev1 = new Array(k + 2).fill(0);
    let next1 = new Array(k + 2).fill(0);
    // loop for case 1
    for (let index = k - 2; index >= 0; index--) {
      for (let n = 1; n <= k / 3; n++) {
        let inc = slices[index] + next1[n - 1];
        let exc = 0 + curr1[n];

        prev1[n] = Math.max(inc, exc);
      }
      next1 = curr1;
      curr1 = prev1;
    }
    const case1 = curr1[k / 3];
    return case1;
  }
  if (type === 2) {
    // for holding second iteration (second case)
    let curr2 = new Array(k + 2).fill(0);
    let prev2 = new Array(k + 2).fill(0);
    let next2 = new Array(k + 2).fill(0);

    // loop for case 2
    for (let index = k - 1; index >= 1; index--) {
      for (let n = 1; n <= k / 3; n++) {
        let inc = slices[index] + next2[n - 1];
        let exc = 0 + curr2[n];

        prev2[n] = Math.max(inc, exc);
      }
      next2 = curr2;
      curr2 = prev2;
    }
    const case2 = curr2[k / 3];
    return case2;
  }
}

var maxSizeSlices = function (slices) {
  let k = slices.length;
  const case1 = solveSpaceOpt(slices, 1); // Include first index and discard last index
  const case2 = solveSpaceOpt(slices, 2); // Include last index and discard first index

  return Math.max(case1, case2);
};
