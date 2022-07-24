/**
 * 17. Letter Combinations of a Phone Number
Given a string containing digits from 2-9 inclusive, 
return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Example 2:

Input: digits = ""
Output: []
Example 3:

Input: digits = "2"
Output: ["a","b","c"]
0 <= digits.length <= 4
digits[i] is a digit in the range ['2', '9'].
 */

// Solution 1

function letterCombinations(digits) {
  if (digits.length === 0) return [];

  const mapping = [
    "",
    "",
    "abc",
    "def",
    "ghi",
    "jkl",
    "mno",
    "pqrs",
    "tuv",
    "wxyz",
  ];
  let result = [];

  function combine(current, index) {
    if (digits.length === index) {
      result.push(current);
      return;
    }

    for (let x of mapping[digits[index]]) {
      combine(current + x, index + 1);
    }
  }
  combine("", 0);
  return result;
}

// Solution 2
function letterCombination(digits) {
  if (digits.length === 0) return [];
  let numMap = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };

  let result = [];
  comboHelper(digits, 0, [], result, numMap);

  return result;
}

function comboHelper(digits, index, output, result, numMap) {
  if (index === digits.length) {
    result.push(output.join(""));
  }

  let digit = digits[index];

  if (digit in numMap) {
    for (let i = 0; i < numMap[digit].length; i++) {
      let letter = numMap[digit][i];
      output.push(letter);

      comboHelper(digits, index + 1, output, result, numMap);
      output.pop();
    }
  }
}

// Solution 3
var letterCombinations = function (digits) {
  if (!digits) return [];

  const result = [];
  const mapping = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const dfs = (index, current) => {
    if (current.length === digits.length) {
      return result.push(current);
    }

    for (const char of mapping[digits[index]]) {
      dfs(index + 1, current + char);
    }
  };

  dfs(0, "");
  return result;
};

// Solution 4
var letterCombinations = function (digits) {
  let numbers = {
    2: ["a", "b", "c"],
    3: ["d", "e", "f"],
    4: ["g", "h", "i"],
    5: ["j", "k", "l"],
    6: ["m", "n", "o"],
    7: ["p", "q", "r", "s"],
    8: ["t", "u", "v"],
    9: ["w", "x", "y", "z"],
  };
  // base cases
  if (digits.length === 0) return [];
  if (digits.length === 1) return numbers[digits];

  let res = [];

  const dfs = (s, index) => {
    // backtracking base case
    if (index === digits.length) {
      res.push(s);
      return;
    }
    for (let i = 0; i < numbers[digits[index]].length; i++) {
      dfs(s + numbers[digits[index]][i], index + 1);
    }
  };
  dfs("", 0);
  return res;
};
