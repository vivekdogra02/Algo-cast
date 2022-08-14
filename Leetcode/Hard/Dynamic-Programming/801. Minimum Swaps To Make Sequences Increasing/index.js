/**
 * 801. Minimum Swaps To Make Sequences Increasing
 * 
 * You are given two integer arrays of the same length nums1 and nums2. 
 * In one operation, you are allowed to swap nums1[i] with nums2[i].

For example, if nums1 = [1,2,3,8], and nums2 = [5,6,7,4], you can swap the element at i = 3 to obtain nums1 = [1,2,3,4] 
and nums2 = [5,6,7,8].
Return the minimum number of needed operations to make nums1 and nums2 strictly increasing. 
The test cases are generated so that the given input always makes it possible.

An array arr is strictly increasing if and only if arr[0] < arr[1] < arr[2] < ... < arr[arr.length - 1].
Example 1:

Input: nums1 = [1,3,5,4], nums2 = [1,2,3,7]
Output: 1
Explanation: 
Swap nums1[3] and nums2[3]. Then the sequences are:
nums1 = [1, 3, 5, 7] and nums2 = [1, 2, 3, 4]
which are both strictly increasing.

Example 2:
Input: nums1 = [0,3,5,8,9], nums2 = [2,1,4,6,9]
Output: 1

Constraints:

2 <= nums1.length <= 105
nums2.length == nums1.length
0 <= nums1[i], nums2[i] <= 2 * 105
 */
/**
 * solution 1 - recursion
 *
 */

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

function solveRec(nums1, nums2, index, swapped) {
  // base case
  if (index === nums1.length) return 0;

  let ans = Number.MAX_VALUE;
  let prev1 = nums1[index - 1];
  let prev2 = nums2[index - 1];

  // catch
  if (swapped) {
    let temp = prev1;
    prev1 = prev2;
    prev2 = temp;
  }

  // no-swap
  if (nums1[index] > prev1 && nums2[index] > prev2) {
    ans = solveRec(nums1, nums2, index + 1, 0);
  }

  // swap
  if (nums1[index] > prev2 && nums2[index] > prev1) {
    ans = Math.min(ans, 1 + solveRec(nums1, nums2, index + 1, 1));
  }

  return ans;
}
var minSwap = function (nums1, nums2) {
  let swapped = 0;
  nums1.unshift(-1);
  nums2.unshift(-1);
  return solveRec(nums1, nums2, 1, swapped);
};

/**
 * Solution 2 - recursion + memo (Top down)
 *
 * Index -> 1 ---> n
 * Swapped -> 0 -----> 1
 *
 */

function solveMem(nums1, nums2, index, swapped, dp) {
  // base case
  if (index === nums1.length) return 0;

  if (dp[index][swapped] !== -1) return dp[index][swapped];
  let ans = Number.MAX_VALUE;
  let prev1 = nums1[index - 1];
  let prev2 = nums2[index - 1];

  // catch
  if (swapped) {
    let temp = prev1;
    prev1 = prev2;
    prev2 = temp;
  }

  // no-swap
  if (nums1[index] > prev1 && nums2[index] > prev2) {
    ans = solveMem(nums1, nums2, index + 1, 0, dp);
  }

  // swap
  if (nums1[index] > prev2 && nums2[index] > prev1) {
    ans = Math.min(ans, 1 + solveMem(nums1, nums2, index + 1, 1, dp));
  }
  dp[index][swapped] = ans;
  return dp[index][swapped];
}
var minSwap = function (nums1, nums2) {
  let swapped = 0;
  nums1.unshift(-1);
  nums2.unshift(-1);
  let n = nums1.length;
  let dp = new Array(n + 1).fill(-1).map(() => Array(2).fill(-1));
  return solveMem(nums1, nums2, 1, swapped, dp);
};

/**
 * Solution 3 - Bottom up (Tabulation)
 * Index -> 1 <-- n
 * Swapped -> 0 <---- 1
 *
 * T - O(N)
 * S - O(N)
 */
function solveTab(nums1, nums2) {
  let n = nums1.length;
  let dp = new Array(n + 1).fill(0).map(() => Array(2).fill(0));
  // base case

  for (let index = n - 1; index >= 1; index--) {
    for (let swapped = 1; swapped >= 0; swapped--) {
      let ans = Number.MAX_VALUE;
      let prev1 = nums1[index - 1];
      let prev2 = nums2[index - 1];

      // catch
      if (swapped) {
        let temp = prev1;
        prev1 = prev2;
        prev2 = temp;
      }
      // no-swap
      if (nums1[index] > prev1 && nums2[index] > prev2) {
        ans = dp[index + 1][0];
      }
      // swap
      if (nums1[index] > prev2 && nums2[index] > prev1) {
        ans = Math.min(ans, 1 + dp[index + 1][1]);
      }
      dp[index][swapped] = ans;
    }
  }

  return dp[1][0];
}
var minSwap = function (nums1, nums2) {
  nums1.unshift(-1);
  nums2.unshift(-1);

  return solveTab(nums1, nums2);
};

/**
 * Solution 4 - Space optimization
 * (curr row)(curr col)
 * dp[index][swapped]  --------------> dp[index +1][0] (Next row, col1)
 *                     --------------> dp[index +1][1]  (Next row, col2)
 * we need two integer swap and no swap
 *
 * T - O(N)
 * S- O(1)
 */

function solveSpaceOptimization(nums1, nums2) {
  let n = nums1.length;
  let swap = 0;
  let noSwap = 0;
  let currswap = 0;
  let currnoSwap = 0;
  // base case

  for (let index = n - 1; index >= 1; index--) {
    for (let swapped = 1; swapped >= 0; swapped--) {
      let ans = Number.MAX_VALUE;
      let prev1 = nums1[index - 1];
      let prev2 = nums2[index - 1];

      // catch
      if (swapped) {
        let temp = prev1;
        prev1 = prev2;
        prev2 = temp;
      }
      // no-swap
      if (nums1[index] > prev1 && nums2[index] > prev2) {
        ans = noSwap;
      }
      // swap
      if (nums1[index] > prev2 && nums2[index] > prev1) {
        ans = Math.min(ans, 1 + swap);
      }

      if (swapped) {
        currswap = ans;
      } else {
        currnoSwap = ans;
      }
    }
    swap = currswap;
    noSwap = currnoSwap;
  }

  return Math.min(swap, noSwap);
}
var minSwap = function (nums1, nums2) {
  nums1.unshift(-1);
  nums2.unshift(-1);

  return solveSpaceOptimization(nums1, nums2);
};
