/**
 * 377. Combination Sum IV
 * Given an array of distinct integers nums and a target integer target,
 *  return the number of possible combinations that add up to target.

The test cases are generated so that the answer can fit in a 32-bit integer.
Example 1

Input: nums = [1,2,3], target = 4
Output: 7
Explanation:
The possible combination ways are:
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
Note that different sequences are counted as different combinations.
Example 2:

Input: nums = [9], target = 3
Output: 0
Constraints:

1 <= nums.length <= 200
1 <= nums[i] <= 1000
All the elements of nums are unique.
1 <= target <= 1000
Follow up: What if negative numbers are allowed in the given array? How does 
 it change the problem? What limitation we need to add to the question to allow negative numbers?
 */

/**
 * Solution 1 - Recursion
 * T - O(2N)
 * S - O(2N)
 */

function solve(nums, tar) {
  // base case
  if (tar < 0) return 0;
  if (tar === 0) return 1;

  let ans = 0;

  for (let i = 0; i < nums.length; i++) {
    ans += solve(nums, tar - nums[i]);
  }
  return ans;
}
function combinationSum(nums, target) {
  return solve(nums, target);
}

/**
 * Solution 2
 * Top down approach (recursion + memo)
 * T - O(T)
 */

function solveMem(nums, tar, dp) {
  // base case
  if (tar < 0) return 0;
  if (tar === 0) return 1;
  if (dp[tar] !== -1) return dp[tar];
  let ans = 0;

  for (let i = 0; i < nums.length; i++) {
    ans += solveMem(nums, tar - nums[i]);
  }
  dp[tar] = ans;
  return dp[tar];
}
function combinationSum(nums, target) {
  let dp = new Array(target + 1).fill(-1);
  return solveMem(nums, target, dp);
}

/**
 * Solution 3
 * Bottom up approach (Tabulation)
 * T - O(N * M)
 * S - O(N * M)
 */

function solveTab(nums, tar) {
  // base case
  let n = nums.length;
  let dp = new Array(tar + 1).fill(0);
  dp[0] = 1;
  // traversing from 1 to target
  for (let i = 1; i <= tar; i++) {
    // traversing on nums
    for (let j = 0; j < n; j++) {
      if (i - nums[j] >= 0) {
        dp[i] += dp[i - nums[j]];
      }
    }
  }
  return dp[tar];
}
