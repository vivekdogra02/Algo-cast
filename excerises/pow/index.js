/* 

Implement pow(x, n), which calculates x raised to the power n (xn).

Example 1:

Input: 2.00000, 10
Output: 1024.00000
Example 2:

Input: 2.10000, 3
Output: 9.26100
Example 3:

Input: 2.00000, -2
Output: 0.25000
Explanation: 2-2 = 1/22 = 1/4 = 0.25
Note:

-100.0 < x < 100.0
n is a 32-bit signed integer, within the range [−231, 231 − 1]

*/

var myPow = function (x, n) {
  if (n === 0) return 1;
  if (n === 1) return x;
  if (x === 0) return 0;

  if (n > 0) {
    return (n % 2 === 1 ? x : 1) * myPow(x * x, Math.floor(n / 2));
  } else {
    return myPow(1 / x, -n);
  }
};


// Solution 2

myPow = function (x, n) {
  if (n == 0) return 1;
  if (n < 0) {
    n = -n;
    x = 1 / x;
  }
  return n % 2 == 0 ? myPow(x * x, Math.floor(n / 2)) : x * myPow(x * x, Math.floor(n / 2));
}

// Solution 3

var myPow = function (x, n) {

  const helper = (x, n) => {
    if (n === 0) return 1;
    if (x === 0) return 0;

    let result = helper(x, Math.floor(n / 2));

    result = result * result;
    if (n % 2 === 0) {
      return result;
    } else {
      result = result * x;
      return result;
    }

  }

  let result = helper(x, Math.abs(n));

  if (n > 0) {
    return result;
  } else {
    return 1 / result;
  }
  // if (n < 0) {
  //   return 1 / result;
  // } else {
  //   return result;
  // }
};