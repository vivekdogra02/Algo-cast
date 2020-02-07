/* 
A character in UTF8 can be from 1 to 4 bytes long, subjected to the following rules:

For 1-byte character, the first bit is a 0, followed by its unicode code.
For n-bytes character, the first n-bits are all one's, the n+1 bit is 0, followed by n-1 bytes with most significant 2 bits being 10.
This is how the UTF-8 encoding would work:

   Char. number range  |        UTF-8 octet sequence
      (hexadecimal)    |              (binary)
   --------------------+---------------------------------------------
   0000 0000-0000 007F | 0xxxxxxx
   0000 0080-0000 07FF | 110xxxxx 10xxxxxx
   0000 0800-0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
   0001 0000-0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
Given an array of integers representing the data, return whether it is a valid utf-8 encoding.

Note:
The input is an array of integers. Only the least significant 8 bits of each integer is used to store the data. This means each integer represents only 1 byte of data.

Example 1:

data = [197, 130, 1], which represents the octet sequence: 11000101 10000010 00000001.

Return true.
It is a valid utf-8 encoding for a 2-bytes character followed by a 1-byte character.
Example 2:

data = [235, 140, 4], which represented the octet sequence: 11101011 10001100 00000100.

Return false.
The first 3 bits are all one's and the 4th bit is 0 means it is a 3-bytes character.
The next byte is a continuation byte which starts with 10 and that's correct.
But the second continuation byte does not start with 10, so it is invalid.

*/

// Solution 1
const validUtf8 = data => /^(0|21|311|4111)+$/.test(data.map(n => n < 128 ? 0 : n < 192 ? 1 : n < 224 ? 2 : n < 240 ? 3 : n < 248 ? 4 : -1).join(""));


// Solution 2

const validUtf8 = data => {
   const transform = n => {
       if(n < 128) return 0;
       else if(n < 192) return 1;
       else if(n < 224) return 2;
       else if(n < 240) return 3;
       else if(n < 248) return 4;
       else return -1;
   };
   return /^(0|21|311|4111)+$/.test(data.map(transform).join(""));
};

// Solution 3

var validUtf8 = function(data) {
   if (!data.length) {
     return false;
   }
   for (let i = 0; i < data.length; ) {
     if (data[i] >= 0b100000000) {
       return false;
     }
     const nBytes = getNBytes(data[i]);
     if (nBytes < 0) {
       return false;
     }
     for (let j = 1; j < nBytes; j++) {
       if (i + j > data.length || (data[i + j] & 0b11000000) !== 0b10000000) {
         return false;
       }
     }
     i += nBytes;
   }
   return true;
 };
 
 function getNBytes(n) {
   if ((n & 0b10000000) === 0) {
     return 1;
   }
   if ((n & 0b11100000) === 0b11000000) {
     return 2;
   }
   if ((n & 0b11110000) === 0b11100000) {
     return 3;
   }
   if ((n & 0b11111000) === 0b11110000) {
     return 4;
   }
   return -1;
 }
 