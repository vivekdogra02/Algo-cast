
//Solution 1
function palindrome(str) {
    const reversed = str.split('').reverse().join('');
    return str === reversed;
}
// Solution 2
function palindrome(str) {
    // use array.every() to check for every char
    return str.split('').every((char, i) => {
        return char === str[str.length - i - 1];
    });
}




// 2nd solution for a number

var isPalindrome = function(x) {
   if(x < 0 || (x % 10 == 0 && x!=0) ) {
       return false; 
   }
   var reverted = 0;
   
   while(x > reverted) {
       reverted = reverted * 10 + x % 10;
       x = parseInt(x/10);
   }
   return x == reverted || x == parseInt(reverted/10);
};

// Recursive solution for
function palindrome(str) {
    if(str.length === 1) return true;
    if(str.length === 2) return str[0] === str[1];

    if(str[0] === str.slice(-1)) return palindrome(str.slice(1,-1));
    return false;
}

console.log(palindrome('rar'));
module.exports = palindrome;