/*

Longest Palindromic Substring
Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

Example 1:

Input: "babad"
Output: "bab"
Note: "aba" is also a valid answer.
Example 2:

Input: "cbbd"
Output: "bb"
*/

/**
 * @param {string} s
 * @return {string}
 */

var getpalidromeLength = function(s,center, skip=0) {
   let index = skip;
   
   while((center - index >=0) && (center + index < s.length) && s[center + index] === s[center - index]) {
       index +=1;
   }
   return index -1;
}
var longestPalindrome = function(s) {
   // Adding start, end and in b/t @ for manacher algo
   const str = `@${s.split('').join('@')}@`;
       
   let C = 1;
   let R = 0;
   const p = [];
   
   for(let i=1; i< str.length; i++) {
       let skip = 1;
       const endofWindow = C + R;
       if(i < endofWindow) {
           skip = Math.min(p[2 * C - i], (endofWindow - i))
       }
       const palidromelength = getpalidromeLength(str, i , skip);
       p[i] = palidromelength;
       
       const endofNewWindow = i + palidromelength;
       if(endofNewWindow > endofWindow)  {
           C = i;
           R = palidromelength;
       }
   }
       const longest = {
           start: 0, 
           length: 1
       }
       p.forEach((length, index) => {
           if(length > longest.length) {
               longest.start = ((index - length)/2);
               longest.length = length;
           }
       });
       
       return s.substr(longest.start, longest.length);
   }
   
