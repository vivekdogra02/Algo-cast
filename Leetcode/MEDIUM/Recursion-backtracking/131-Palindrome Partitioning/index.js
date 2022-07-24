/**
 * 131. Palindrome Partitioning
Given a string s, partition s such that every substring of the partition is a palindrome. 
Return all possible palindrome partitioning of s.

A palindrome string is a string that reads the same backward as forward.
Example 1:

Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
Example 2:

Input: s = "a"
Output: [["a"]]
 */

// Solution 1
function isPalindrome(s, start, end) {
  while (start <= end) {
    if (s[start] !== s[end]) return false;
    start++;
    end--;
  }
  return true;
}

function partition(s) {
  // global result
  let result = [];

  const dfs = (i, s, slate) => {
    // base case
    if (i === s.length) {
      result.push(slate.slice());
      return;
    }

    // dfs recursive call

    for (let j = i; j < s.length; j++) {
      if (isPalindrome(s, i, j)) {
        // push to slate
        slate.push(s.slice(i, j + 1));
        dfs(j + 1, s, slate);
        slate.pop();
      }
    }
  };

  dfs(0, s, []);
  return result;
}

// Solution 2
var partition = function (s) {
  let partitions = [],
    n = s.length;

  let partition = [];
  let backtrack = (i) => {
    if (i >= n) {
      partitions.push(Array.from(partition));
      return;
    }

    for (let j = i; j < n; j++) {
      if (isPalindrome(s, i, j)) {
        partition.push(s.substring(i, j + 1));
        backtrack(j + 1);
        partition.pop();
      }
    }
  };

  // start partitioning
  backtrack(0);

  return partitions;
};

var isPalindrome = (s, i, j) => {
  while (i < j) {
    if (s[i] !== s[j]) {
      return false;
    }

    i += 1;
    j -= 1;
  }

  return true;
};

// Solution 3
var partition = function (s) {
  let ret = [];
  let isPal = (str) => {
    let i = 0;
    let j = str.length - 1;
    while (i <= j) {
      if (str[i] !== str[j]) {
        return false;
      }
      i++;
      j--;
    }
    return true;
  };
  let mp = new Map();
  let dfs = (ind = 0, cur = []) => {
    if (ind === s.length) {
      ret.push(cur.slice());
    }
    for (let i = ind; i < s.length; i++) {
      let sub = s.slice(ind, i + 1);
      mp.has(sub) ? mp.get(sub) : mp.set(sub, isPal(sub));
      if (mp.get(sub)) {
        cur.push(sub);
        dfs(i + 1, cur);
        cur.pop();
      }
    }
  };
  dfs();
  return ret;
};

// Solution 4
var partition = function (s) {
  const result = [];
  const memo = new Map();
  recurse(s, 0, [], result, memo);

  return result;
};

var recurse = function (s, start, temp, result, memo) {
  if (start >= s.length) {
    result.push([...temp]);
    return;
  }
  for (let i = start; i < s.length; i++) {
    if (isPalindrome(s, start, i)) {
      temp.push(s.substring(start, i + 1));
      recurse(s, i + 1, temp, result, memo);
      temp.pop();
    }
  }
};
