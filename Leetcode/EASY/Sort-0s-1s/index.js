/**
 * Sort an array of 0s and 1s
Problem Statement: Given an array of length N consisting of only 0s and 1s in random order. Modify the array to segregate 0s on the left and 1s on the right side of the array.

Note: (instead of 0s and 1s we can  also be given with an array of any 2 random integers)

Examples:

Example 1:
Input: N = 5, arr[ ] = {1,0,1,1,0}
Output: {0,0,1,1,1}

Example 2:
Input: N  = 5 , arr[ ] = {1,0,0,0,1}
Output: {0,0,0,1,1}
 */

// solution 1
/**
 * Approach:

We will traverse the entire array and count the number of 0s , 
Once we get the number of zeroes , we can easily the count of 1s as arr.size(_) – count_of_0s
Now we will simply fill the array , first we will fill it with 0s till the count_of_0s , then we will fill the 1s
 */

/**
 * Time Complexity: O(n) 

Space Complexity: O(1)
 */

function sortArr(arr) {
  let n = arr.length;

  let count = 0;

  for (let i = 0; i < n; i++) {
    if (arr[i] === 0) count++;
  }

  for (let i = 0; i < count; i++) {
    arr[i] = 0;
  }

  for (let i = count; i < n; i++) {
    arr[i] = 1;
  }

  return arr;
}

// Solution 2
/**
Approach: Two pointer approach

Take 2 pointers say s  and e ,one at the beginning and the other at the end of the array
Let s point at the beginning of the array and e at the end .
Now we want to put all the 1s in the right side of the array , once we do this all 0s will automatically be on the left side of the array
So we compare the elements at s , arr[s] =1 then this should be at the right side of the array , so we swap this with element present at e 
After swapping , now we know that element at index e will surely be 1 , so now we can decrement e . 
Else if theres a 0 then we will increment i 
 */

/**
 * Time Complexity: O(n) 
Space Complexity: O(1)
 */

function sortTwoPointerArr(arr) {
  let start = 0;
  let end = arr.length - 1;
  let temp;

  while (start < end) {
    if (arr[start] == 1) {
      temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;

      end--;
    } else {
      start++;
    }
  }
  return arr;
}
