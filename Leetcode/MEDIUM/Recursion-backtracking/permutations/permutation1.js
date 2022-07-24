/**
 * 46. Permutations
 * 
 * Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.

Example 1:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
Example 2:

Input: nums = [0,1]
Output: [[0,1],[1,0]]
Example 3:

Input: nums = [1]
Output: [[1]]
 

Constraints:

1 <= nums.length <= 6
-10 <= nums[i] <= 10
All the integers of nums are unique.
 */

// Solution 1

function permute(nums) {
  let result = [];

  const dfs = (nums, i) => {
    if (i === nums.length) {
      result.push(nums.slice());
      return;
    }
    for (let j = i; j < nums.length; j++) {
      // swap i and j position
      swap(nums, i, j);
      // recursive dfs
      dfs(nums, i + 1);
      swap(nums, i, j);
    }
  };

  dfs([], 0);
  return result;
}

function swap(arr, first, second) {
  let temp = arr[first];
  arr[first] = arr[second];
  arr[second] = temp;
}

// Solution 2
let permute = function (numbers) {
  let results = [];

  let recursive = (result) => {
    // []

    if (result.length === numbers.length) {
      // 3 === 3
      results.push(result.slice()); // [[1,2,3]]
      return;
    }

    for (let i = 0; i < numbers.length; i++) {
      // [1,2,3];

      if (!result.includes(numbers[i])) {
        result.push(numbers[i]); // [1, 2, 3]
        recursive(result);
        result.pop();
      }
    }
  };
  recursive([]);

  return results;
};

// Solution 3
var permute = function (nums) {
  const outputs = [];
  /**
   * The goal is break down the problem by finding permutations in subarrays.
   * So we will maintain a subarray of fixed elements and a subarray for
   * exploring permutations.
   *
   *                  [1], [2, 3]    [1, 2], [3]    [1, 2, 3]
   * [], [1, 2, 3] -> [2], [1, 3] -> [1, 3], [2] -> [1, 3, 2]
   *                  [3], [1, 2]    [2, 1], [1]    [2, 1, 3]
   *                                 [2, 3], [1]    [2, 3, 1]
   *                                 [3, 1], [2]    [3, 1, 2]
   *                                 [3, 2], [1]    [3, 2, 1]
   */
  function permutations(curr, rest) {
    if (rest.length === 0) {
      outputs.push(curr);
      return;
    }

    for (let i = 0; i < rest.length; i++) {
      permutations(
        [...curr, rest[i]],
        [...rest.slice(0, i), ...rest.slice(i + 1)]
      );
    }
  }
  permutations([], nums);
  return outputs;
};

// Solution 4
var permute = function (nums) {
  const perms = [];
  if (nums.length === 1) {
    return [nums];
  }

  const smallerPerms = permute(nums.slice(1));
  const firstValue = nums[0];

  for (let i = 0; i < smallerPerms.length; i++) {
    const smallerPerm = smallerPerms[i];
    for (let j = 0; j <= smallerPerm.length; j++) {
      const prefix = smallerPerm.slice(0, j);
      const suffix = smallerPerm.slice(j);
      perms.push(prefix.concat([firstValue], suffix));
    }
  }
  return perms;
};
