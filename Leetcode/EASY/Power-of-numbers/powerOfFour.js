/**
 * 
 * 
 */

// Solution 1

var isPowerOfFour = function (n) {
    return Math.log10(n) / Math.log10(4) % 1 === 0
};

// Solution 2
var isPowerOfFour = function (n) {
    if (n <= 0) {
        return false;
    }
    if (n == 1) {
        return true;
    }
    if (n % 4 == 0) {
        return isPowerOfFour(n / 4);
    } else {
        return false;
    }
};

// Solution 3

var isPowerOfFour = function (n) {
    if (n == 1) { return true }
    if (n == 0 || n % 4 !== 0) { return false }
    else {
        return isPowerOfFour(n / 4)
    }
};

// Solution 4

const isPowerOfFour = (n) => Math.log2(n) % 2 === 0;


// Solution 5

var isPowerOfFour = function (n) {
    if (n == 1 || n == 4) return 1;
    if (n <= 0) return 0;
    return isPowerOfFour(n / 4)
};