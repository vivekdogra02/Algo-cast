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

// Recursive solutions for
function capitalize (array) {
    if (array.length === 1) {
      return [array[0].toUpperCase()];
    }
    let res = capitalize(array.slice(0, -1));
    res.push(array.slice(array.length-1)[0].toUpperCase());
    return res;
   
  }
console.log(capitalize('hi ther you not !dk'))
module.exports = capitalize;