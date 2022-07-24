/**
 * 90. Subsets II
 * Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.
Example 1:

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
Example 2:

Input: nums = [0]
Output: [[],[0]]
 

Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
 */

// Solution 1

function subset2(nums) {
  // global value to hold ans
  let result = [];

  // Sort nums (so that it will align accordingly)
  nums.sort((a, b) => a - b);

  // DFS - T - O(2N . N) note- 2 to the power of N
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

  // Filter out the result which are duplicate - liner operation
  let hash = {};
  for (let el in result) {
    if (hash[el]) continue;
    hash[el] = el;
  }

  return Object.values(hash);
}

// Solution 2
var subsetsWithDup = function (nums) {
  let res = [];
  function backTrack(arr, curr) {
    res.push([...curr]);

    for (let i = 0; i < arr.length; i++) {
      if (i == 0 || arr[i] != arr[i - 1]) {
        curr.push(arr[i]);
        backTrack(arr.slice(i + 1), curr);
        curr.pop();
      }
    }
  }

  nums.sort((a, b) => {
    return a - b;
  });

  backTrack(nums, []);

  return res;
};

// Solution 3
var subsetsWithDup = function (nums) {
  //results array
  const results = [];

  nums.sort((a, b) => a - b);
  //helper function args(start = 0, sub = [])
  const helper = (start = 0, sub = []) => {
    //push sub to results array
    results.push([...sub]);

    //for loop to go through nums array
    for (let i = start; i < nums.length; i++) {
      if (i !== start && nums[i] === nums[i - 1]) continue;
      //add element at i to sub
      sub.push(nums[i]);
      //call helper with start incremented, new subarray
      helper(i + 1, sub);
      //sub.pop
      sub.pop();
    }
  };
  helper();
  //filter out duplicates

  return results;
};

// Solution 4
var subsetsWithDup = function (nums) {
  let res = [];
  nums.sort((a, b) => a - b);
  backtrack(res, [], nums, 0);
  return res;
};

function backtrack(res, sub, nums, start) {
  res.push(sub);

  for (let i = start; i < nums.length; i++) {
    if (i != start && nums[i] == nums[i - 1]) continue;
    let nextAry = Array.from(sub);
    nextAry.push(nums[i]);
    backtrack(res, nextAry, nums, i + 1);
  }
}

// Solution 5
var subsetsWithDup = function (nums) {
  nums.sort();
  let res = [[]];
  let seen = {};
  for (let n of nums) {
    let resLength = res.length;
    for (let i = 0; i < resLength; i++) {
      let newArr = res[i].length ? [...res[i]] : [];
      newArr.push(n);
      let hash = newArr.join(".");
      if (!seen[hash]) {
        res.push(newArr);
        seen[hash] = true;
      }
    }
  }
  return res;
};

// Solution 6
var dfs = function (res, path, ns, ind) {
  // base
  if (ind >= ns.length) {
    return;
  }

  // i = ind
  for (let i = ind; i < ns.length; ++i) {
    if (i > ind && ns[i - 1] === ns[i]) continue;

    // ele
    const ele = ns[i];

    // copy
    const path1 = path.slice(0);

    // res
    res.push(path1);

    // path has ele
    path1.push(ele);

    // dfs
    dfs(res, path1, ns, i + 1);
  } // el
};

var subsetsWithDup = function (ns) {
  // res
  const res = [];
  // path
  const path = [];
  // ind
  const ind = 0;
  // sort
  ns.sort((a, b) => a - b);

  // []
  res.unshift([]);

  // dfs
  dfs(res, path, ns, ind);

  return res;
};

// Solution 7
var subsetsWithDup = function (nums) {
  const sets = [[]];
  nums.sort((a, b) => a - b);

  let lastAddedCount = 0,
    prev = null;
  for (const num of nums) {
    const newSets = [];
    const setsToAdd =
      num !== prev ? sets : sets.slice(sets.length - lastAddedCount);

    for (const set of setsToAdd) {
      newSets.push([...set, num]);
    }

    sets.push(...newSets);
    lastAddedCount = newSets.length;
    prev = num;
  }

  return sets;
};

// Solution 8
var subsetsWithDup = function (nums) {
  let res = [];
  nums.sort();
  const backtrack = (nums, curr, i) => {
    res.push([...curr]);
    for (let j = i; j < nums.length; j++) {
      if (j > i && nums[j] === nums[j - 1]) continue;
      curr.push(nums[j]);
      backtrack(nums, curr, j + 1);
      curr.pop();
    }
  };
  backtrack(nums, [], 0);
  return res;
};

// Solution 9
var subsetsWithDup = function (nums) {
  //[1, 2, 2, 2, 3, 3] ---
  //[1: 1, 2: 3, 3: 2]
  //[] [1], append 1, 2, or 3 2s; [], [2], [2,2], [2, 2, 2] [1], [1, 2], [1,2,2,2]//
  //append 0, 1, or 2 3s.

  //preprocess nums
  let freq = {};
  nums.forEach((i) => {
    freq[i] = freq[i] ? freq[i] + 1 : 1;
  });
  //now iterate over freq
  let res = [[]];
  for (let d in freq) {
    let next = [];
    res.forEach((s) => {
      for (let i = 0; i <= freq[d]; i++) {
        //add s to new
        next.push(s);
        //copy
        let c = [...s];
        //concatenate s with d
        c.push(d);
        //reassign
        s = c;
      }
    });
    res = next;
  }
  return res;
};

//Solution 10
var subsetsWithDup = function (nums) {
  nums = nums.sort((a, b) => a - b);
  let result = [[]];

  function travel(index, path) {
    // console.log("index,path", index, path)
    for (let i = index; i < nums.length; i++) {
      if (i > index && nums[i] === nums[i - 1]) continue;
      let npath = [...path, nums[i]];
      result.push(npath);
      travel(i + 1, npath);
    }
  }

  travel(0, []);
  return result;
};
