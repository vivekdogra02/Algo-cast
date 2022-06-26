/**
 *  A phrase is a palindrome if it reads the same forward and backward
 * Given a string s, return true if it is a palindrome, or false otherwise.
 *   s = "raceacar"
 * Output: false
    Explanation: "raceacar" is not a palindrome.

    Input: s =abba
    output - true
    it is a palindrome

 */


// Solution 

function checkPalidrome(s, i, j) {
    // Base case
    if (i > j) return true;

    // It is not a palindrome condition
    if (s[i] !== s[j]) return false;

    else {
        checkPalidrome(s, i + 1, j - 1)
    }
}

checkPalidrome('abba', 0, len)