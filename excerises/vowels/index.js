
// Solution 1 - Print no of vowels in a str
function vowels(str) {
    let count = 0 ;
    const checker = ['a','e','i','o','u'];
    for(let char of str.toLowerCase()) {
        if(checker.includes(char)){
            count ++;
        }
    }
    return count;
}

// Solution 2 - regex
function vowels(str) {
    const matches = str.match(/[aeiou]/gi);
    return matches ? matches.length : 0;
}
module.exports = vowels;