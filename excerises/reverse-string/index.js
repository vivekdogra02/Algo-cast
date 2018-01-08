
// Solution 1
function reverse(str) {
         return str.split('').reverse().join('');
}

// Solution 2
function reverse(str) {
    let reversed = '';
    for(let char of str) {
        reversed += char;
    }
    return reversed;
}

// Solution 3
function reverse(str) {
    return str.split('').reduce((prev,curr)=>  curr + prev,'')
}
module.exports = reverse;