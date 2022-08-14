/**
 * 416. Partition Equal Subset Sum
 * Given a non-empty array nums containing only positive integers, 
 * find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.

Example 1:

Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].

Example 2:
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
 
Constraints:

1 <= nums.length <= 200
1 <= nums[i] <= 100
 */

/**
 * Solution 1- Recursion
 */

function solveRec(index, n, arr, target) {
  // base case
  if (index >= n) return false;
  if (target < 0) return false;
  if (target === 0) return true;
  const inc = solveRec(index + 1, n, arr, target - arr[index]);
  const exc = solveRec(index + 1, n, arr, target);

  return inc || exc;
}
var canPartition = function (nums) {
  let total = 0;
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    total += nums[i];
  }

  if (total % 2 !== 0) return false;

  const target = total / 2;
  return solveRec(0, n, nums, target);
};

/**
 * Solution 2- Recursion + memo (Top down approach)
 * index   --- >  0  ----------> N
 * target --- > total/2 --------> 0
 */

function solveMem(index, n, arr, target, dp) {
  // base case
  if (index >= n) return false;
  if (target < 0) return false;
  if (target === 0) return true;
  if (dp[index][target] !== -1) return dp[index][target];
  const inc = solveMem(index + 1, n, arr, target - arr[index], dp);
  const exc = solveMem(index + 1, n, arr, target, dp);

  return (dp[index][target] = inc || exc);
}
var canPartition = function (nums) {
  let total = 0;
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    total += nums[i];
  }

  if (total % 2 !== 0) return false;

  const target = total / 2;

  let dp = new Array(n).fill(-1).map(() => Array(target + 1).fill(-1));
  return solveMem(0, n, nums, target, dp);
};

/**
 * Solution 3- Tabulation (Bottom up approach) -- reverse of topdown
 *  index   --- >  0  <---------- N
 * target --- > total/2 <-------- 0
 *
 * T - O(Sum * N)
 * S - O(N + target)
 */

function solveTab(n, arr, total) {
  let dp = new Array(n + 1).fill(0).map(() => Array(total + 1).fill(0));

  // base case
  for (let i = 0; i <= n; i++) {
    // if (target === 0) return true;
    dp[i][0] = true;
  }
  for (let index = n - 1; index >= 0; index--) {
    for (let target = 0; target <= total / 2; target++) {
      let inc = 0;
      if (target - arr[index] >= 0) {
        inc = dp[index + 1][target - arr[index]];
      }
      const exc = dp[index + 1][target];
      dp[index][target] = inc || exc;
    }
  }
  return dp[0][total / 2];
}
var canPartition = function (nums) {
  let total = 0;
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    total += nums[i];
  }

  if (total % 2 !== 0) return false;

  return solveTab(n, nums, total);
};

/**
 * Solution 4 - space optimization ---
 *
 * We dont need 2D dp array as it will required curr and next row
 *                                             (next row)(any column)
 *                      ------------------>  dp[index+1][target-arr[i]]
 *  dp[index][target]  depends
 * (curr Row )(col)
 *                      ------------------>  dp[index+1][target]
 *                                            (next row )(column)
 */

function solveSpaceOpt(n, arr, total) {
  let curr = new Array(total + 1).fill(0);
  let next = new Array(total + 1).fill(0);
  // base case
  curr[0] = true;
  next[0] = true;
  for (let index = n - 1; index >= 0; index--) {
    for (let target = 0; target <= total / 2; target++) {
      let inc = 0;
      if (target - arr[index] >= 0) {
        inc = next[target - arr[index]];
      }
      const exc = next[target];
      curr[target] = inc || exc;
    }
    next = curr;
  }
  return next[total / 2];
}
var canPartition = function (nums) {
  let total = 0;
  let n = nums.length;
  for (let i = 0; i < n; i++) {
    total += nums[i];
  }

  if (total % 2 !== 0) return false;

  return solveSpaceOpt(n, nums, total);
};

/**
 * Solution - 5 (Memoization)
 */

var canPartition = function (nums) {
  const total = nums.reduce((curr, acc) => curr + acc, 0);
  if (total % 2) {
    return false;
  }

  const memo = {};
  const partition = (idx, sum, remaining) => {
    if (idx === nums.length || sum > remaining) {
      return sum === remaining;
    }

    if (memo[sum] !== undefined) {
      return memo[sum];
    }

    return (memo[sum] =
      partition(idx + 1, sum + nums[idx], remaining - nums[idx]) ||
      partition(idx + 1, sum, remaining));
  };

  return partition(0, 0, total);
};

/**
 * solution 6
 */
var canPartition = function (nums) {
  var totalSum = nums[0];

  for (var i = 1; i < nums.length; i++) {
    totalSum += nums[i];
  }

  if (totalSum % 2 > 0) return false;

  var subSetSum = totalSum / 2;

  var dp = Array(subSetSum + 1).fill(false);
  dp[0] = true;

  for (var i = 0; i < nums.length; i++) {
    for (var j = subSetSum; j > nums[i] - 1; j--) {
      dp[j] = dp[j] || dp[j - nums[i]];
    }
  }

  return dp[subSetSum];
};
