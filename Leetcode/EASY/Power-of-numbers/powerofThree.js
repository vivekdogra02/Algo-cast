/**
 * Given an integer n, return true if it is a power of three. Otherwise, return false.

An integer n is a power of three, if there exists an integer x such that n == 3x.
Example 1:

Input: n = 27
Output: true
Example 2:

Input: n = 0
Output: false
Example 3:

Input: n = 9
Output: true
 */

//Solution 1
var isPowerOfThree = function (n) {

    if (n === 3 || n === 1) return true;
    if (n === 0 || n < 3) return false;
    while (n > 3) {
        n = n / 3;
        if (n % 3 !== 0) return false;
    }
    return true;

};

// Solution 2
var isPowerOfThree = function (n) {
    if (n < 1) {
        return false;
    }
    while (n % 3 === 0) {
        n = n / 3;
    }
    return n === 1;
}

// Solution 4

var isPowerOfThree = function (n) {
    return Math.log10(n) / Math.log10(3) % 1 === 0
};


// Using recursion

var isPowerOfThree = function (n) {
    if (n === 0) {
        return false;
    } else if (n === 1) {
        return true;
    } else if (n % 3 !== 0) {
        return false;
    }
    return isPowerOfTwo(n / 3);

};

// Solution 5
var isPowerOfThree = function (n) {
    if (n < 1) return false;
    if (n == 1) return true;
    if (n > 1) return isPowerOfThree(n / 3);
};


// solution 6

var isPowerOfThree = function (n) {
    let result = false;
    if (n === 1) {
        return true;
    }
    while (n > 3) {
        n = n / 3;
    }
    if (n === 3) {
        result = true;
    }
    return result;
};