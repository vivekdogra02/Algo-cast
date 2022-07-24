/**
 * 22. Generate Parentheses
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
 */
// Solution 1

function genParen(n) {
  // global result
  let result = [];

  // dfs helper function

  const dfs = (i, n, slate, oCount, cCount) => {
    // backtracking case
    if (oCount > n) return;
    if (oCount > cCount) return;

    // base case
    if (i === n * 2) {
      result.push(slate.join(""));
      return;
    }

    // Add open paren
    slate.push("(");
    dfs(i + 1, n, slate, oCount + 1, cCount);
    slate.pop();

    // Add close paren
    slate.push(")");
    dfs(i + 1, n, slate, oCount, cCount + 1);
    slate.pop();
  };

  dfs(0, n, [], 0, 0);
  return result;
}

//  Solution 2

function genParen(n) {
  let result = [];
  let str = "";

  const backTrack = (open, closed) => {
    // base case
    if (open === closed && closed === n) {
      result.push(str);
      return;
    }

    let tempStr = str;

    if (open < n) {
      str = tempStr + "(";
      backTrack(open + 1, closed);
    }
    if (open > closed) {
      str = tempStr + ")";
      backTrack(open, closed + 1);
    }
  };

  backTrack(0, 0);
  return result;
}

// solution 3
function generateParenthesis(n) {
  const combinations = [];
  const generateCombinations = (n, c, str, l, r) => {
    if (str.length === n * 2) return c.push(str);

    if (l > r) generateCombinations(n, c, str + ")", l, r + 1);
    if (l < n) generateCombinations(n, c, str + "(", l + 1, r);
  };
  generateCombinations(n, combinations, "", 0, 0);

  return combinations;
}

// solution 4
var generateParenthesis = function (n) {
  let res = [];
  function permute(open, close, cur) {
    if (cur.length === 2 * n) {
      res.push(cur);
      return;
    }
    if (open > 0) {
      permute(open - 1, close + 1, cur + "(");
    }
    if (close > 0) {
      permute(open, close - 1, cur + ")");
    }
  }
  permute(n, 0, "");
  return res;
};

// Solution 5
var generateParenthesis = function (n) {
  const result = [];

  function generate(n, current, opened, closed) {
    if (current.length === n * 2) result.push(current);

    if (opened < n) {
      generate(n, current + "(", opened + 1, closed);
    }

    if (closed < opened) {
      generate(n, current + ")", opened, closed + 1);
    }
  }

  generate(n, "", 0, 0);

  return result;
};
