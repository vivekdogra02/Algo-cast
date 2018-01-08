// Return the character that is most commonly used.

//Solution 1
function maxChars(str) {
const dict = {};
let max = 0;
let maxChar = '';
for(let char of str) {
    // if(dict[char]) {
    //     dict[char]++;
    // } else {
    //     dict[char] = 1
    // }

     // OR 
     dict[char] = dict[char] + 1  || 1;
     
    for(let ma in dict) {
        if(dict[ma] > max) {
            max = dict[ma];
            maxChar = max;
        }
    }
    // Maximum common number/character used - 3
    console.log('max-char', maxChar);
}
return dict;
}

console.log(maxChars('Hello there'));
module.exports = maxChars;