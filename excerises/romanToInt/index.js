/*
For example, two is written as II in Roman numeral, just two one's added together. Twelve is written as, XII, which is simply X + II. The number twenty seven is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not IIII. Instead, the number four is written as IV. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as IX. There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9. 
X can be placed before L (50) and C (100) to make 40 and 90. 
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.

*/

// 1st solution
var symbols = {
    
   "I": 1,
   "V": 5,
   "X": 10,
   "L": 50,
   "C": 100,
   "D": 500,
   "M": 1000
}
var romanToInt = function(s) {
  var value =0;
    for(let i = 0; i < s.length; i+=1){
       symbols[s[i]] < symbols[s[i+1]] ? value -= symbols[s[i]]: value += symbols[s[i]]
   }
   return value
};


//  2nd Solution

var romanToInt = function(s) {
   let result = 0;
   let decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
 let roman = ["M", "CM","D","CD","C", "XC", "L", "XL", "X","IX","V","IV","I"];
   for (let i = 0; i <= decimal.length; i++) {
       while(s.indexOf(roman[i]) === 0) {
           result += decimal[i];
           s = s.replace(roman[i], '');
       }
   }
   return result;
};
