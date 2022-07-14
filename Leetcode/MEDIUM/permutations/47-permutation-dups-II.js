/**
 * 47. Permutations II
 * Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.
Example 1:

Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
Example 2:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 

Constraints:

1 <= nums.length <= 8
-10 <= nums[i] <= 10
 */

// Solution 1
function permuteDups(nums) {
  // global result;
  let result = [];

  // dfs helper
  const dfs = (i, nums) => {
    // base case
    if (i === nums.length) {
      result.push(nums.slice());
      return;
    }

    // dfs recursive call
    let hash = {}; // for dups

    for (let j = i; j < nums.length; j++) {
      // For dups
      if (hash[nums[j]]) continue;
      hash[nums[j]] = true[
        // swap
        (nums[i], nums[j])
      ] = [nums[j], nums[i]];
      // call recursive
      dfs(i + 1, nums);
      // re-swap
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
  };

  // first case
  dfs(0, nums);
  return result;
}

// Solution 2
var permuteUnique = function (nums) {
  const res = [];

  nums.sort((a, b) => a - b);

  const generate = (seq) => {
    if (seq.length === nums.length) {
      res.push([...seq]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      const num = nums[i];
      const prev = nums[i - 1];

      if (num === null || num === prev) {
        continue;
      }

      nums[i] = null;
      seq.push(num);
      generate(seq);
      seq.pop();
      nums[i] = num;
    }
  };

  generate([]);

  return res;
};

// Solution 3
var permuteUnique = function (nums) {
  let result = [];

  let freq = frequency(nums);
  let perm = [];

  let backtrack = () => {
    if (perm.length === nums.length) {
      result.push(Array.from(perm));
      return;
    }

    for (let num in freq) {
      if (freq[num] === 0) {
        continue;
      }

      perm.push(num);
      freq[num] -= 1;

      backtrack();

      freq[num] += 1;
      perm.pop();
    }
  };
  backtrack();

  return result;
};

var frequency = function (nums) {
  let freq = {};

  for (let num of nums) {
    if (!(num in freq)) {
      freq[num] = 0;
    }

    freq[num] += 1;
  }

  return freq;
};
