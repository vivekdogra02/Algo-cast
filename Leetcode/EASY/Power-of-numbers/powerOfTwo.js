/**
 * 
 * Power of Two
 * 
 * Given an integer n, return true if it is a power of two. Otherwise, return false.
 * An integer n is a power of two, if there exists an integer x such that n == 2x.
 * Example 1:

Input: n = 1
Output: true
Explanation: 20 = 1
Example 2:

Input: n = 16
Output: true
Explanation: 24 = 16
Example 3:

Input: n = 3
Output: false

Constraints:

-231 <= n <= 231 - 1

 */


// Solution 1
var isPowerOfTwo = function (n) {
    // base case
    if (n === 0) return false;
    if (n === 1) return true;

    if (n % 2 === 1) return false;
    let ans = 1;
    while (ans < n) {
        ans = ans * 2;
    }
    if (ans == n) return true;
    return false;
};

// Solution 2

var isPowerOfTwo = function (n) {
    if (n == 0)
        return false;
    while (n != 1) {
        if (n % 2 != 0)
            return false;
        n = n / 2;
    }
    return true;
};


// Solution 3
var isPowerOfTwo = function (n) {
    return (Math.log10(n) / Math.log10(2)) % 1 == 0
};

// Using recursion

var isPowerOfTwo = function (n) {
    if (n === 0) {
        return false;
    } else if (n === 1) {
        return true;
    } else if (n % 2 !== 0) {
        return false;
    }
    return isPowerOfTwo(n / 2);

};


// Solution 4
var isPowerOfTwo = function (n) {
    if (n === 1 || n === 0)
        return n ? true : false;
    while (n % 2 === 0)
        n /= 2;

    return n === 1;

};

// Solution 5
var isPowerOfTwo = function (n) {
    if (Math.log2(n) % 1 === 0) {
        return true;
    }
    else {
        return false;
    }
};

// Solution 6
var isPowerOfTwo = function (n) {
    return n > 0 && (n & (n - 1)) === 0;
};

// Solution 7
var isPowerOfTwo = function (n) {
    return Number.isInteger(Math.log2(n)) ? true : false
};