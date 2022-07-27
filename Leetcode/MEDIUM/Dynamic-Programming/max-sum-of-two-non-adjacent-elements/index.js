/**
 * Find Maximum sum of two non-adjacent elements
 *  input - {9,9,8,2}
 * output - 17
 */

// Solution 1 - Recursion
/**
 * T -O(2n)  - exponential
 * S-O(n)
 */
function solveRec(nums, i) {
  // base case
  if (i < 0) return 0;
  if (i === 0) return nums[0];

  let inc = solveRec(nums, i - 2) + nums[i];
  let exc = solveRec(nums, i - 1) + 0;

  return Math.max(inc, exc);
}

function maxSum(nums) {
  let n = nums.length;
  let ans = solveRec(nums, n - 1);
  return ans;
}
/**
 * Solution 2 - Top down approach - Recursion + memo
 * T - O(N)
 * space - O(N) + O(N)
 */
function solveMem(nums, n, dp) {
  // base case
  if (n < 0) return 0;
  if (n === 0) return nums[0];
  // Step 3 - check the value in dp
  if (dp[n] !== Number.MAX_VALUE) {
    return dp[n];
  }

  let inc = solveMem(nums, n - 2, dp) + nums[n];
  let exc = solveMem(nums, n - 1, dp) + 0;

  dp[n] = Math.max(inc, exc); // Step 2 - store the result in dp array
  return dp[n];
}

function maxSum(nums) {
  let n = nums.length;
  let dp = new Array(n + 1).fill(Number.MAX_VALUE); // step 1 - initialize dp array
  let ans = solveMem(nums, n - 1, dp);
  if (ans === Number.MAX_VALUE) return -1;
  return ans;
}
/**
 * Solution 3 - Bottom up approach (Tabulation)
 * T -O(N)
 * Spac - O(N)
 */

function maxSumTabulation(nums) {
  let n = nums.length;
  let dp = new Array(n).fill(0); // step 1 - initialize dp array

  // Step 2 - initiliaze dp[0] = 0th index of nums
  dp[0] = nums[0];
  dp[1] = nums[1];
  for (let i = 2; i < n; i++) {
    let inc = dp[i - 2] + nums[i];
    let exc = dp[i - 1] + 0;
    dp[i] = Math.max(inc, exc);
  }

  return dp[n - 1];
}

/**
 * Solution 4 - Space optimization (We can do the space optimization as we have depend on i-2, and i-1)
 * lets store these in two separate variable prev1, prev2 and do the space optimization
 * T - O(N)
 * S - O(1)
 */

function maxSumSpaceOptimization(nums) {
  let n = nums.length;
  let dp = new Array(n).fill(0);

  // let initialize two variable
  prev1 = nums[1];
  prev2 = nums[0];
  let ans;
  for (let i = 2; i < n; i++) {
    let inc = prev2 + nums[i];
    let exc = prev1 + 0;

    ans = Math.max(inc, exc);
    prev2 = prev1;
    prev1 = ans;
  }
  return ans;
}
