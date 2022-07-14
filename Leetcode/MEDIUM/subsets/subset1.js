/**
 * Given an integer array nums of unique elements, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.

Example 1:

Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
 */

// Solution 1
function subSets(nums) {
  let result = [];

  dfs([], 0);
  function dfs(current, index) {
    result.push(current);
    for (let i = index; i < nums.length; i++) {
      dfs(current.concat(nums[i]), i + 1);
    }
  }

  return result;
}

// Solution 2
var subsets = function (nums) {
  const result = [];
  const temp = [];

  const helper = (index) => {
    if (index > nums.length - 1) {
      result.push([...temp]);
      return;
    }

    temp.push(nums[index]);
    helper(index + 1);
    temp.pop();
    helper(index + 1);
  };

  helper(0);
  return result;
};

// Solution 3

var subsets = function (nums) {
  let result = [];
  let temp = [];
  const backtrack = (index = 0) => {
    result.push([...temp]);

    for (let i = index; i < nums.length; i++) {
      temp.push(nums[i]);
      backtrack(i + 1);
      temp.pop();
    }
  };

  backtrack();
  return result;
};

// Solution 4
var subsets = function (nums) {
  let sets = [];
  function createSubset(curr = [], index = 0) {
    if (index === nums.length) {
      sets.push(curr);
      return;
    }
    createSubset(curr.slice(), index + 1);
    createSubset(curr.slice().concat([nums[index]]), index + 1);
  }
  createSubset();
  return sets;
};

// Solution 5
var subsets = function (nums) {
  let subsets = [[]];

  for (let i = 0; i < nums.length; i++) {
    let currentElement = nums[i];
    let len = subsets.length;

    for (let j = 0; j < len; j++) {
      let copiedSet = subsets[j].slice(0);
      copiedSet.push(currentElement);
      subsets.push(copiedSet);
    }
  }
  return subsets;
};

// Solution 6

function subsets(nums) {
  // global result;
  let result = [];

  // DFS
  const dfs = (i, nums, slate) => {
    // base case
    if (i === nums.length) {
      result.push(slate.slice());
      return;
    }

    // Exclude
    dfs(i + 1, nums, slate);

    // Include
    slate.push(nums[i]);
    dfs(i + 1, nums, slate);
    slate.pop();
  };

  dfs(0, nums, []);
  return result;
}
