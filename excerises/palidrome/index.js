
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
console.log(palindrome('rar'));
module.exports = palindrome;