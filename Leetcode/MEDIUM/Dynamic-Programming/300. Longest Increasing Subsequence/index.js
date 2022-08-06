/**
 * 300. Longest Increasing Subsequence

Given an integer array nums, return the length of the longest strictly increasing subsequence.

A subsequence is a sequence that can be derived from an array by deleting some 
or no elements without changing the order of the remaining elements. 
For example, [3,6,2,7] is a subsequence of the array [0,3,1,6,2,2,7].

Example 1:
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.

Example 2:
Input: nums = [0,1,0,3,2,3]
Output: 4

Example 3:
Input: nums = [7,7,7,7,7,7,7]
Output: 1

Constraints:
1 <= nums.length <= 2500
-104 <= nums[i] <= 104

Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?
 */

/**
 * Solution 1 - Recursion
 * T - O(2N)
 *
 */
var lengthOfLIS = function (nums) {
  let n = nums.length;
  const curr = 0;
  const prev = -1;
  return solveRec(n, nums, curr, prev);
};

function solveRec(n, nums, curr, prev) {
  // base case
  if (curr === n) return 0;

  let inc = 0;
  if (prev === -1 || nums[curr] > nums[prev]) {
    //  update curr - curr +1  and prev = curr
    inc = 1 + solveRec(n, nums, curr + 1, curr);
  }

  // increment curr -> curr + 1 and prev remains same
  let exc = 0 + solveRec(n, nums, curr + 1, prev);

  return Math.max(inc, exc);
}

/**
 * Solution 2 - Recursion + Memo (Top down)
 * need 2D dp as we are changing curr = curr +1
 *                                prev = curr
 * T - O(N2)
 * S - O(N2)
 */
var lengthOfLIS = function (nums) {
  let n = nums.length;
  const curr = 0;
  const prev = -1;
  /**
   * We need to create n size of array (rows) as the current index goes form 0 to n-1
   * and also the columns we need n+1 size of array(column) as the prev index goes from -1 to n-1
   * So it should be n+1 for columns and n for rows
   */
  let dp = new Array(n).fill(-1).map(() => Array(n + 1).fill(-1));
  return solveMem(n, nums, curr, prev, dp);
};

function solveMem(n, nums, curr, prev, dp) {
  // base case
  if (curr === n) return 0;
  if (dp[curr][prev + 1] !== -1) return dp[curr][prev + 1];
  let inc = 0;
  if (prev === -1 || nums[curr] > nums[prev]) {
    //  update curr - curr +1  and prev = curr
    inc = 1 + solveMem(n, nums, curr + 1, curr, dp);
  }

  // increment curr -> curr + 1 and prev remains same
  let exc = 0 + solveMem(n, nums, curr + 1, prev, dp);

  return (dp[curr][prev + 1] = Math.max(inc, exc));
}

/**
 * Solution 3 - Tabulation Bottom up
 * need 2D dp as we are changing curr = curr +1
 *                                prev = curr
 * T - O(N2)
 * S - O(N2)
 */
var lengthOfLIS = function (nums) {
  let n = nums.length;
  const curr = 0;
  const prev = -1;

  return solveTab(n, nums);
};

function solveTab(n, nums) {
  let dp = new Array(n + 1).fill(0).map(() => Array(n + 1).fill(0));
  // base case (Already set in dp array)

  for (let curr = n - 1; curr >= 0; curr--) {
    for (let prev = curr - 1; prev >= -1; prev--) {
      let inc = 0;
      if (prev === -1 || nums[curr] > nums[prev]) {
        //  update curr - curr +1  and prev = curr
        inc = 1 + dp[curr + 1][curr + 1];
      }

      // increment curr -> curr + 1 and prev remains same
      let exc = 0 + dp[curr + 1][prev + 1];

      dp[curr][prev + 1] = Math.max(inc, exc);
    }
  }
  return dp[0][0];
}

/**
 * Solution 4 - Space optimization
 * T- O(n2)
 * S- O(n)
 * we dont need to have 2D array Dp as
 *                                                      (next row)(next col)
 *                                                      dp[curr+1][curr+1]
 *            dp[curr][prev+1]    --------->
 *                                                      dp[curr+1][prev+1](next row)(same col)
 */

function solveSpaceOpt(nums) {
  let n = nums.length;
  let currRow = new Array(n + 1).fill(0);
  let nextRow = new Array(n + 1).fill(0);
  // base case (Already set in dp array)

  for (let curr = n - 1; curr >= 0; curr--) {
    for (let prev = curr - 1; prev >= -1; prev--) {
      let inc = 0;
      if (prev === -1 || nums[curr] > nums[prev]) {
        //  update curr - curr +1  and prev = curr
        inc = 1 + nextRow[curr + 1];
      }

      // increment curr -> curr + 1 and prev remains same
      let exc = 0 + nextRow[prev + 1];

      currRow[prev + 1] = Math.max(inc, exc);
    }
    nextRow = currRow;
  }
  return nextRow[0];
}

/**
 * Solution - Dp with binary search
 * Time - O(n2)
 * space - O(nlogn)
 */

function dpWithBinary(nums) {
  let n = nums.length;
  let ans = [];
  ans.push(nums[0]);

  for (let i = 1; i < n; i++) {
    let curr = nums[i];

    // if curr is larger than the last element of ans arry
    if (curr > ans[ans.length - 1]) {
      ans.push(curr);
    } else {
      const index = binarySearch(curr, ans);
      ans[index] = curr;
    }
  }
  return ans.length;
}

function binarySearch(curr, subsequence) {
  let left = 0;
  let right = subsequence.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (subsequence[mid] === curr) return mid;
    if (subsequence[mid] < curr) left = mid + 1;
    else right = mid - 1;
  }
  return left;
}
