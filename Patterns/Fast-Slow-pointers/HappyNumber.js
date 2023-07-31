/**
 * Write an algorithm to determine if a number n is a happy number.
We use the following process to check if a given number is a happy number:

Starting with the given number n, replace the number with the sum of the squares of its digits.
Repeat the process until:
The number equals 
which will depict that the given number 
n is a happy number.It enters a cycle, which will depict that the given number n is not a happy number.
Return TRUE if �n is a happy number, and FALSE if not.

*/
/**
 * Solution 1 - Brute force ( but we have used hashmap to store the sum, )
 * Time complexity - O(logn)
 * space = O(logn)
 * While this approach works well for small numbers,
 * we might have to perform several computations for larger numbers to get the required result.
 *  So, it might get infeasible for such cases.
 *
 *
 */
function sumOfSquaredDigits(number) {
  let totalSum = 0;
  while (number > 0) {
    let temp = Math.floor(number / 10),
      digit = number % 10;
    number = temp;
    totalSum += digit ** 2;
  }
  return totalSum;
}

function isHappyNumber(n) {
  // Replace this placeholder return statement with your code
  let hash = {};
  while (true) {
    if (!hash[n]) {
      hash[n] = sumOfSquaredDigits(n);
      n = sumOfSquaredDigits(n);
    }
    if (hash[n] === 1) return true;
    if (hash[n]) return false;
  }
}

function main() {
  console.log("Is happy number", isHappyNumber(4));
}

// ----------------------------------------------------------------
// solution 2 (Fast and slow pointer)
/**
 * Optimal approach using Fast and Slow Pointers pattern#
 * If we use the fast and slow pointers approach here,
 * the fast pointer would eventually reach 1, in which case we will return TRUE.
 * Otherwise, it would meet the slow pointer,
 * which would mean that the two pointers are in an endless loop, and we can return FALSE
 *
 * T - O(logn)
 * s - O(1)
 */

function isHappyNumber(n) {
  // Helper function that calculates the sum of squared digits.
  function sumOfSquaredDigits(number) {
    let totalSum = 0;
    while (number > 0) {
      let temp = Math.floor(number / 10),
        digit = number % 10;
      number = temp;
      totalSum += digit ** 2;
    }
    return totalSum;
  }

  let slowPointer = n;
  let fastPointer = sumOfSquaredDigits(n);

  while (fastPointer !== 1 && slowPointer !== fastPointer) {
    slowPointer = sumOfSquaredDigits(slowPointer);
    fastPointer = sumOfSquaredDigits(sumOfSquaredDigits(fastPointer));
  }

  if (fastPointer == 1) {
    return true;
  }
  return false;
}

// Driver code
function main() {
  inputs = [1, 5, 19, 25, 7];
  for (var i = 0; i < inputs.length; i++) {
    console.log(i + 1 + ".\tInput Number:", inputs[i]);

    var result = isHappyNumber(inputs[i]) ? "True" : "False";

    console.log("\n\tIs it a happy number?", result);
    console.log("-".repeat(100));
  }
}

main();
