/**
 * 1143. Longest Common Subsequence
Medium
Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with some characters (can be none) deleted 
without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

Example 1:
Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.

Example 2:
Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.

Example 3:
Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.

Constraints:

1 <= text1.length, text2.length <= 1000
text1 and text2 consist of only lowercase English characters.
 */

/**
 * Solution 1 - DP
 * @param {*} t1
 * @param {*} t2
 */
function lcs(t1, t2) {
  let dp = new Array(t1.length + 1)
    .fill("")
    .map(() => Array(t2.length + 1).fill(""));

  for (let i = 1; i < dp.length; i++) {
    for (j = 1; j < dp[i].length; j++) {
      if (t1[i - 1] === t2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + t1[i - 1];
      } else {
        let aboveChar = dp[i - 1][j];
        let leftChar = dp[i][j - 1];

        dp[i][j] = aboveChar.length > leftChar.length ? aboveChar : leftChar;
      }
    }
  }

  return dp[dp.length - 1][dp[0].length - 1].length;
}
