// Solution 1
function reverseInt(n) {
 const reversed = n.toString().split('').reverse().join('');
 return parseInt(reversed) * Math.sign(n); 
}

console.log(reverseInt(-12))

module.exports = reverseInt;