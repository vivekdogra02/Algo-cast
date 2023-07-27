/* 
Given a string, find the length of the longest substring without repeating characters.

Example 1:

Input: "abcabcbb"
Output: 3 
Explanation: The answer is "abc", with the length of 3. 
Example 2:

Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. 
             Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

*/


function longestSubstring(s) {
   let maxLen = 0;
   let currentSubstring = "";

   for (let i = 0; i < s.length; i++) {
      let c = s.charAt(i);
      let ci = currentSubstring.indexOf(c);

      if(ci !== -1) {
         currentSubstring = currentSubstring.substring(ci + 1);
      }
      currentSubstring += c;
      if(currentSubstring.length > maxLen) {
         maxLen = currentSubstring.length;
      }
   }
   return maxLen;
}

// Solution 2

var lengthOfLongestSubstring = function(s) {
   if (!s) return 0
   if (s.length === 1) return 1

   let i = 0, j = 1, len = 0
   while (j < s.length) {
       const idx = s.indexOf(s[j], i)
       if (idx < j) { 
           i = idx + 1
       }

       j++

       if (j - i > len) {
           len = j - i
       }
   }

   return len
};

// Solution 3

var lengthOfLongestSubstrings = function(s) {
   var subString = '';
   var maxLength = 0;
   for( let i=0;i<s.length;i++){
   if(subString.indexOf(s[i]) < 0)
   
   {
   subString += s[i];
   }else{
   subString = subString.substr(subString.indexOf(s[i]) + 1, subString.length) + s[i];
   }
   
       maxLength = Math.max(maxLength, subString.length);
   }
   return maxLength;
   };
   
   /**
    * Using Sliding window approach
    */
   
   function longestSubstring(s) {
      
      if(s.length < 2) return s.length;
      
      let left=0, longest = 0;
      let seen ={};
      
      for (let right = 0; right < s.length; right++) {
         const current = s[right];
         const prevSeen = seen[current];
         
         if(prevSeen >= left) {
            left = prevSeen + 1;
         }
         seen[current] = right; // index 
         longest = Math.max(longest, right -left + 1);
      }
      return longest;
   }