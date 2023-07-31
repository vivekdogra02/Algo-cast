/**
 * Write a function that takes a string, s, as an input and determines whether or not it is a palindrome.
 */

// Solution 1 (Two pointers)
/**
 * T - O(N), However, our algo will run, n/2 times since two pointer are traversing toward each other;
 * S - O(1),since we use constant space to store two indexes.
 */

function validPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}
