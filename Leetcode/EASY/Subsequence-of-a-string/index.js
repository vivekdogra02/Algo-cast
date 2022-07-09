/**
 * 392. Is Subsequence
 * Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original 
string by deleting some (can be none) of the characters 
without disturbing the relative positions of the remaining characters. 
(i.e., "ace" is a subsequence of "abcde" while "aec" is not)

Example 1:
Input: s = "abc", t = "ahbgdc"
Output: true
Example 2:

Input: s = "axc", t = "ahbgdc"
Output: false
 
 * 
 */

// Brute force algo
// Solution 1

function isSubsequence(s, t) {
  let result = "";

  for (let i = 0; i < s.length; i++) {
    for (let j = 0; j < t.length; j++) {
      if (s[i] === t[j]) {
        result += s[i];
        t = t.slice(j + 1);
        break;
      }
    }
  }
  if (result === s) return true;
  return false;
}

// Solution 2

function isSubsequence(s, t) {
  let count = 0;
  let result = "";

  for (let char of t) {
    if (char === s[count]) {
      result += char;
      count++;
    }
  }

  return s === result;
}

// Solution 3
var isSubsequence = function (s, t) {
  let i = 0,
    j = 0;

  while (j < t.length) {
    if (s[i] === t[j]) i++;
    j++;
  }
  return i === s.length;
};

// Solution 4
var isSubsequence = function (s, t) {
  var point = 0;
  if (s.length == 0) {
    return true;
  }
  for (var i = 0; i < t.length; i++) {
    if (s[point] == t[i]) {
      point = point + 1;
    }

    if (point == s.length) {
      return true;
    }
  }
  return false;
};

// Solution 5
var isSubsequence = function (s, t) {
  let tArray = t.split("");
  for (let x in s) {
    let c = t.indexOf(s[x]);
    if (c < 0) {
      return false;
    }
    t = t.slice(c + 1);
  }
  return true;
};

// Solution 6
// T = O(n) s = o(1)
function isSubsequence(s, t) {
  let count = 0;

  for (let i = 0; i < t.length; i++) {
    if (count < s.length && s[count] === t[i]) count++;
  }
  return s.length === count;
}
