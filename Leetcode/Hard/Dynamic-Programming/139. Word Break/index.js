/**
 * 139. Word Break
Medium

Share
Given a string s and a dictionary of strings wordDict, return true 
if s can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

Example 1:
Input: s = "leetcode", wordDict = ["leet","code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".

Example 2:
Input: s = "applepenapple", wordDict = ["apple","pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
Note that you are allowed to reuse a dictionary word.

Example 3:

Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: false
 

Constraints:

1 <= s.length <= 300
1 <= wordDict.length <= 1000
1 <= wordDict[i].length <= 20
s and wordDict[i] consist of only lowercase English letters.
All the strings of wordDict are unique.
 */

// Solution 1 - DP

var wordBreak = function (s, wordDict) {
  let dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 0; i < dp.length; i++) {
    if (dp[i] == false) continue;
    for (let j = i + 1; j < dp.length; j++) {
      const piece = s.slice(i, j);
      if (wordDict.includes(piece)) {
        dp[j] = true;
      }
    }
  }
  return dp[dp.length - 1];
};

// Solution 2

function wordBreak(s, words) {
  let memo = {};
  const res = bfs(0);
  // console.log(memo);
  return res;
  function bfs(i) {
    // console.log(i,s.slice(i));
    if (i in memo) return memo[i];
    if (i == s.length) return (memo[i] = true);
    for (let word of words) {
      // console.log(s.slice(i,i+word.length),word);
      memo[i] = false;
      if (s.slice(i, i + word.length) == word) {
        if (bfs(i + word.length)) {
          memo[i] = true;
          break;
        }
      }
    }
    return memo[i];
  }
}

// Solution 3 - recursion + memo
var wordBreak = function (s, wordDict, memo = {}) {
  if (s in memo) return memo[s];
  if (s === "") return true;

  for (let word of wordDict) {
    //check if some substring is a prefix of another string (i.e, s)
    if (s.indexOf(word) === 0) {
      //get everything after the prefix
      const suffix = s.slice(word.length); //word.length is the length of the prefix
      if (wordBreak(suffix, wordDict, memo) === true) {
        memo[s] = true;
        return true;
      }
    }
  }
  memo[s] = false;
  return false;
};

// Solution 4
var wordBreak = function (s, wordDict) {
  let words = new Set(wordDict);
  let wordLen = new Set(wordDict.map((word) => word.length));
  let starts = new Set([0]);

  for (let start of starts) {
    for (let len of wordLen) {
      if (words.has(s.slice(start, start + len))) {
        starts.add(start + len);
      }
    }
  }

  return starts.has(s.length);
};

// backtracking
var wordBreak = function (s, wordDict) {
  // use memoization to improve efficiency
  const m = {};

  const helper = (ss) => {
    // use memoization
    if (ss in m) {
      return m[ss];
    }
    // base case
    if (ss.length === 0) {
      return true;
    } else {
      for (let k = 0; k < wordDict.length; k++) {
        const w = wordDict[k];
        const sub = ss.substring(0, w.length);
        if (w === sub) {
          const r = helper(ss.substring(w.length));
          if (r) {
            m[ss] = true;
            return true;
          }
        }
      }
      m[ss] = false;
      return false;
    }
  };
  return helper(s);
};

// Solutio 6
var wordBreak = function (s, wordDict) {
  let seed = Array(s.length + 1).fill(false);
  seed[0] = true;
  for (let i = 0; i < seed.length; i++) {
    if (!seed[i]) continue;
    let prefix = s.substring(i);
    for (let j = 0; j < wordDict.length; j++) {
      if (prefix.startsWith(wordDict[j]) && seed[i]) {
        seed[i + wordDict[j].length] = true;
      }
    }
  }
  return seed[s.length];
};

// Solution 7
var wordBreak = function (s, wordDict) {
  const wordSet = new Set(wordDict);
  const memo = new Array(s.length);
  return backtrack(s, 0, wordSet, memo);
};

function backtrack(s, index, wordSet, memo) {
  if (memo[index] !== undefined) {
    return memo[index];
  }
  if (index === s.length) {
    return true;
  }

  for (let i = index; i < s.length; i++) {
    const substr = s.substring(index, i + 1);
    if (wordSet.has(substr)) {
      if (backtrack(s, i + 1, wordSet, memo)) {
        return (memo[index] = true);
      }
    }
  }

  return (memo[index] = false);
}

// Solution 8
var wordBreak = function (s, wordDict) {
  const wordSet = new Set(wordDict);

  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
};

// Solution 9
let wordBreak = function (s, wordDict) {
  let dp = new Array(s.length + 1).fill(false);
  dp[s.length] = true;

  for (let i = s.length - 1; i >= 0; i--) {
    for (let w of wordDict) {
      if (s.length - i >= w.length && s.substring(i, i + w.length) === w) {
        dp[i] = dp[i + w.length];
      }
      if (dp[i]) {
        break;
      }
    }
  }

  return dp[0];
};
