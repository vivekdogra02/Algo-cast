/* 
Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string "".

Example 1:

Input: ["flower","flow","flight"]
Output: "fl"
Example 2:

Input: ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
Note:

*/


/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function(strs) {
   if(strs.length){
          var arr= strs.concat().sort(),
           a1= arr[0], a2= arr[arr.length-1], L= a1.length, i= 0;
      while(i< L && a1.charAt(i)=== a2.charAt(i)) i++;
       return a1.substring(0,i);
   } else {
         return "";
   }
};