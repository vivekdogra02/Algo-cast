/**
 * Write a function called  isSubsequence
 * which takes in two strings and checks whether the characters 
 * in the first string form a subsequence of the characters 
 * in the second string. In other words, 
 * the function should check whether the characters in the first string appear somewhere in the second string, 
 * 
 * eg:-
 * (hello, hello world) - order matters  =  True
 * (sing , sting) - false (order matters)
 */

/**
 * Time complexity - O(n + m)
 * Space Complexity - O(1)
 */

function isSubsequence(s1, s2) {

    let i = 0;
    let j = 0;
    while(j < s2.length) {

        if(s1[i] === s2[j]) i++;
        if(i === s1.length) return true;
        j++;
    }

    return false;

}

/**
 * Recursive but not O(1) space
 */
function isSubsequence(str1, str2) {
    if(str1.length === 0) return true
    if(str2.length === 0) return false
    if(str2[0] === str1[0]) return isSubsequence(str1.slice(1), str2.slice(1))  
    return isSubsequence(str1, str2.slice(1))
  }