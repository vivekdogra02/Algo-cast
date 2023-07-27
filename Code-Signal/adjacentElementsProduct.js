/**
 * Given an array of integers, find the pair of adjacent elements that has the largest product and return that product.

Example

For inputArray = [3, 6, -2, -5, 7, 3], the output should be
solution(inputArray) = 21.

7 and 3 produce the largest product.
 */

/** Solution 1*/

function eleProduct(arr) {
  return Math.max(...arr.slice(0, -1).map((x, i) => x * arr[i + 1]));
}

/** Solution 2 */
