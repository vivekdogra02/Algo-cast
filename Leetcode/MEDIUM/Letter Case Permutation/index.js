/**
 * 784. Letter Case Permutation
 * Given a string s, you can transform every letter individually to be lowercase or uppercase to create another string.

Return a list of all possible strings we could create. Return the output in any order.
Example 1:

Input: s = "a1b2"
Output: ["a1b2","a1B2","A1b2","A1B2"]
Example 2:

Input: s = "3z4"
Output: ["3z4","3Z4"]

Constraints:

1 <= s.length <= 12
s consists of lowercase English letters, uppercase English letters, and digits.
 */

// Solution 1

function letterCasePermutation(nums) {
  // 1. create a global result which will contains the exact output
  let result = [];

  // Depth first search

  const dfs = (i, nums, output) => {
    // base case
    if (i === nums.length) {
      // need to push the new copy of the output array
      result.push(output.join(""));
      return;
    }

    // Get the element
    const char = nums[i];

    // check for a Number
    if (Number.isInteger(char)) {
      /**
       * If it is a number we dont need to any uppercase or lowercase
       * just increment the i and pop the output array
       */
      output.push(char);
      dfs(i + 1, nums, output);
      output.pop();
    } else {
      // uppercase  dfs recursive call
      /**
       * Let increment the i and update the char to uppercase,
       * make sure to pop the output array, to swap back to the original array elements
       */
      output.push(char.toUpperCase());
      dfs(i + 1, nums, output);
      output.pop();

      // lowercase dfs recursive call
      /**
       * Same as above , only change is to update the char to lowercase
       */
      output.push(char.toLowerCase());
      dfs(i + 1, nums, output);
      output.pop();
    }
  };

  // first case
  dfs(0, nums, []);

  // returning the result
  return result;
}

// Solution 2
var letterCasePermutation = function (S) {
  S = S.toLowerCase();
  let len = S.length,
    ans = [];
  const dfs = (i, res = "") => {
    if (i < len) {
      dfs(i + 1, res + S[i]);
      if (S[i] >= "a") dfs(i + 1, res + S[i].toUpperCase());
    } else ans.push(res);
  };
  dfs(0);
  return ans;
};

// Solution 3
var letterCasePermutation = function (s) {
  let result = [""];
  for (const c of s) {
    const next = [];
    const possiblities = isNaN(c) ? [c.toLowerCase(), c.toUpperCase()] : [c];
    for (const p of possiblities) {
      next.push(...result.map((a) => `${a}${p}`));
    }
    result = next;
  }
  return result;
};

// Solution 4
const letterCasePermutation = (s) => {
  const results = [];

  dfs = (i, s) => {
    if (i === s.length) {
      results.push(s.join(""));
      return;
    }

    const isNumeric = /\d/.test(s[i]);

    if (isNumeric) {
      dfs(i + 1, s);
    } else {
      s[i] = s[i].toUpperCase();
      dfs(i + 1, s);
      s[i] = s[i].toLowerCase();
      dfs(i + 1, s);
    }
  };

  dfs(0, s.split(""));
  return results;
};

// Solution 5
var letterCasePermutation = function (s) {
  const res = [];
  const arr = s.split("");
  const S = s.toLowerCase();
  const dfs = (i, resStr = "") => {
    const ch = S[i];
    if (resStr.length === S.length) {
      res.push(resStr);
      return;
    }
    dfs(i + 1, resStr + ch);
    if (ch >= "a") {
      dfs(i + 1, resStr + ch.toUpperCase());
    }
  };

  dfs(0);
  return res;
};

// Solution 6
var letterCasePermutation = function (s) {
  let input = s.split("");
  let length = input.length;
  let output = [];

  function helper(arr, res) {
    if (res.length === length) {
      output.push(res.join(""));
      return;
    }

    let l = arr.shift();
    if (isNaN(l)) {
      helper([...arr], [...res, l.toLowerCase()]);
      helper([...arr], [...res, l.toUpperCase()]);
    } else {
      helper([...arr], [...res, l]);
    }
  }

  helper([...input], []);
  return output;
};

//

function letterCase(s) {
  let result = [""];
  for (let c of s) {
    const next = [];
    const possibilities = isNaN(c) ? [c.toLowerCase(), c.toUpperCase()] : c;
    for (let p of possibilities) {
      next.push(...result.map((x) => `${x}${p}`));
    }
    result = next;
  }
  return result;
}
