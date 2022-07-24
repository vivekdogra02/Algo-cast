/**
 * You are given an integer array nums and an integer target.
You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer
 in nums and then concatenate all the integers.

For example, if nums = [2, 1], you can add a '+' before 2 and a '-' 
before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.

Example 1:

Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
Example 2:

Input: nums = [1], target = 1
Output: 1
 */

// Solution 1

function findTargetSumWays(nums, target) {
  // global result
  let result = 0;

  // dfs recursive function
  const dfs = (i, nums, target, sum) => {
    // base case
    if (i === nums.length) {
      if (sum === target) {
        result++;
      }
      return;
    }

    // call dfs
    // include positive
    sum += nums[i];
    dfs(i + 1, nums, target, sum);
    sum -= nums[i];

    // include negative
    sum -= nums[i];
    dfs(i + 1, nums, target, sum);
    sum += nums[i];
  };

  dfs(0, nums, target, 0);
  return result;
}

// solution 2 -- efficient solution
function findTargetSumWays(nums, target) {
  let sum = nums.reduce((a, b) => a + b);
  // base case
  if (sum < Math.abs(target) || (sum + target) % 2 != 0) return 0;

  const half = (target + sum) / 2;
  let dp = new Array(half + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < nums.length; i++) {
    for (let j = half; j >= nums[i]; j--) {
      dp[j] += dp[j - nums[i]];
    }
  }

  return dp[half];
}

/*
Soln 1: Brute force recursion
Try to put '+' and '-' at every location in nums array 
and keep track of how many combinations lead to target sum. 
TC: O(2^N)
SC: O(N)

Soln 2: 2D DP
Lets say we know number of times "count" a possible sum is possible out of the first i numbers
 exclusive so not including nums[i].
Therefore sum + nums[i] and sum - nums[i] is also possible "count" number of times
dp[i][sum + nums[i]] = dp[i - 1][sum] and dp[i][sum - nums[i]] = dp[i - 1][sum]
Sum can range from -total to total, so add an offset of total to the sum indices 
to map all sums to a positive range 
TC: O(N * T) where N is length of nums and T is target for iterating through dp
SC: O(N * T) for 2d dp array

Soln 3: 1D DP
Notice that for current row in dp, only need values from prev row. 
So save space using 1D array.
Make a 1D array "next" of same size as dp since it is not safe to mutate dp 
while iteration in progress. Then replace dp with "next" 
TC: O(N * T)
SC: O(T) 
*/

var findTargetSumWays = function (nums, target) {
  let n = nums.length;
  let total = nums.reduce((a, c) => a + c);
  // edge case where target is unreachable
  if (Math.abs(target) > total) {
    return 0;
  }

  let dp = Array(2 * total + 1).fill(0);
  dp[0 + total] = 1;
  for (let i = 1; i <= n; i++) {
    let next = Array(2 * total + 1).fill(0);

    for (let s = -total; s <= total; s++) {
      if (dp[s + total] > 0) {
        next[s + total - nums[i - 1]] += dp[s + total];
        next[s + total + nums[i - 1]] += dp[s + total];
      }
    }
    dp = next;
  }
  return dp[target + total];
};

var findTargetSumWays2D = function (nums, target) {
  let n = nums.length;
  let total = nums.reduce((a, c) => a + c);
  // edge case where target is unreachable
  if (Math.abs(target) > total) {
    return 0;
  }
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(2 * total + 1).fill(0));

  // we can make a sum 0 with the empty set
  dp[0][0 + total] = 1;

  for (let i = 1; i <= n; i++) {
    for (let s = -total; s <= total; s++) {
      if (dp[i - 1][s + total] > 0) {
        dp[i][s + total + nums[i - 1]] += dp[i - 1][s + total];
        dp[i][s + total - nums[i - 1]] += dp[i - 1][s + total];
      }
    }
  }
  return dp[n][target + total];
};

// Solution 4
var findTargetSumWays = function (nums, target) {
  const dp = new Map();

  function helper(idx, tgt) {
    if (tgt === 0 && idx === nums.length) return 1;
    if (idx === nums.length) return 0;

    const key = `${idx}-${tgt}`;
    if (dp.has(key)) return dp.get(key);

    let tmpWays = 0;
    tmpWays += helper(idx + 1, tgt - nums[idx]);
    tmpWays += helper(idx + 1, tgt + nums[idx]);
    dp.set(key, tmpWays);
    return tmpWays;
  }
  return helper(0, target);
};
