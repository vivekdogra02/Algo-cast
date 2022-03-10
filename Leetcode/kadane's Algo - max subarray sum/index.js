/**
 * Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

A subarray is a contiguous part of an array.

  Kadane's Algorithms

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
Example 2:

Input: nums = [1]
Output: 1
Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23
 */


// Solution 1

function maxSubArraySum(arr) {

    let curr_sum = arr[0];
    let max_sum = arr[0];

    for(let i = 1; i < arr.length; i++) {
        curr_sum = curr_sum + arr[i];
        curr_sum = Math.max(curr_sum, arr[i]);
        max_sum = Math.max(max_sum, curr_sum);
    }

    return max_sum;
}

// Solution 2

var maxSubArray = function(nums) {
    let dp = new Array(nums.length).fill(-Infinity);
    dp[0] = nums[0];
    let max = nums[0];
    for (let i = 1; i < nums.length; i++) {
        dp[i] = nums[i] + (dp[i - 1] > 0 ? dp[i - 1] : 0);
            
    }
    return Math.max(...dp);
};

// solution 3

var maxSubArray = function(nums) {
    let currSum = 0;
    let maxSum = nums[0];
    
    for (let i = 0; i < nums.length; i++) {
        if (currSum < 0) {
            currSum = 0;
        }
        currSum += nums[i];
        maxSum = Math.max(currSum, maxSum)
    }

    return maxSum;
};

// Solution 4

var maxSubArray = function(nums) {
    let dp = [nums[0]];
    let max = nums[0];
    for(let ind = 1 ; ind < nums.length ; ind++) {
      dp[ind] = nums[ind] + (dp[ind-1] > 0 ? dp[ind-1] : 0);
      max = Math.max(max, dp[ind]);
    }
    
    return max;
  };

  // Solution 5
  var maxSubArray = function(nums) {
    if(nums.length == 0) return 0;
    let result = Number.MIN_SAFE_INTEGER;
    let sum = 0;
    for(let i = 0; i < nums.length; i++) {
        sum += nums[i];
        result = Math.max(sum, result);
        sum = sum < 0 ? 0 : sum;
    }
    return result;
};
