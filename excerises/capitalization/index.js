// Examples 
// 'a short sent' -> 'A Short Sent'

// Solution 1
function capitalize(str) {
    const words = [];
    for (let word of str.split(' ')) {
        words.push(word[0].toUpperCase() + word.slice(1));
    }
    return words.join(' ');
}


// Solution 2 
function capitalize(str) {
    let result = str[0].toUpperCase();
    for (let i = 1; i < str.length; i++) {
        if (str[i - 1] === ' ') {
            // find last element to be a space, if yes, then capitalize the char
            result += str[i].toUpperCase();
        } else {
            result += str[i];
        }
    }
    return result;
}
console.log(capitalize('hi ther you not !dk'))
module.exports = capitalize;