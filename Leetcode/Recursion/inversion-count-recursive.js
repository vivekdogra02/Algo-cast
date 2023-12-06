/**
 * Count Inversions in an array | Set 1 (Using Merge Sort)
 * 
 * Inversion Count for an array indicates – how far (or close) the array is from being sorted. If the array is already sorted, then the inversion count is 0, but if the array is sorted in the reverse order, the inversion count is the maximum. 

Formally speaking, two elements a[i] and a[j] form an inversion if a[i] > a[j] and i < j

Example: 

Input: arr[] = {8, 4, 2, 1}
Output: 6

Explanation: Given array has six inversions:
(8, 4), (4, 2), (8, 2), (8, 1), (4, 1), (2, 1).


Input: arr[] = {3, 1, 2}
Output: 2

Explanation: Given array has two inversions:
(3, 1), (3, 2) 
 */

// Approach 1
/**METHOD 1 (Simple)  

Approach: Traverse through the array, and for every index,
find the number of smaller elements on its right side of the array. This can be done using a nested loop. Sum up the counts for all index in the array and print the sum.
Algorithm: 
    1.Traverse through the array from start to end
    2.For every element, find the count of elements smaller than the current number up to that index using another loop.
    3. Sum up the count of inversion for every index.
    4. Print the count of inversions.
 * 
 */
/**
 * Complexity Analysis: 
    Time Complexity: O(n^2), Two nested loops are needed to traverse the array from start to end, so the Time complexity is O(n^2)
    Space Complexity:O(1), No extra space is required.
 */

function getInvCount(arr) {
    let inv_count = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) inv_count++
        }
    }

    return inv_count;
}

// Approach 2 (merge sort)

/**
 * METHOD 2(Enhance Merge Sort) 

Approach: 
Suppose the number of inversions in the left half and right half of the array (let be inv1 and inv2); 
what kinds of inversions are not accounted for in Inv1 + Inv2? 
The answer is – the inversions that need to be counted during the merge step. 
Therefore, to get the total number of inversions that needs to be added are the number of inversions in the left subarray,
 right subarray, and merge().

 How to get the number of inversions in merge()? 
In merge process, let i is used for indexing left sub-array and j for right sub-array. 
At any step in merge(), if a[i] is greater than a[j], then there are (mid – i) inversions.
 because left and right subarrays are sorted, 
so all the remaining elements in left-subarray (a[i+1], a[i+2] … a[mid]) will be greater than a[j]
 */

/**
 * 
 * Algorithm: 
    1. The idea is similar to merge sort, divide the array into two equal or 
    almost equal halves in each step until the base case is reached.

    2. Create a function merge that counts the number of inversions when two halves of the array are merged, 
    create two indices i and j, i is the index for the first half, and j is an index of the second half. 
    if a[i] is greater than a[j], then there are (mid – i) inversions. because left and right subarrays are sorted, 
    so all the remaining elements in left-subarray (a[i+1], a[i+2] … a[mid]) will be greater than a[j].

    3. Create a recursive function to divide the array into halves and find the answer 
    by summing the number of inversions is the first half, 
    the number of inversion in the second half and the number of inversions by merging the two.

    4.The base case of recursion is when there is only one element in the given half.
    5. Print the answer
 */


function mergeSort(arr, left, right) {
    // Keeps track of the inversion count at a
    // particular node of the recursion tree
    let count = 0;
    if (left < right) {
        let mid = Math.floor((left + right) / 2);

        // Total inversion count = left subarray count
        // + right subarray count + merge count

        // left subarray count
        count += mergeSort(arr, left, mid)

        // right subarray count
        count += mergeSort(arr, mid + 1, right);

        // merge count
        count += mergeSortAndCount(arr, left, mid, right)

    }
    console.log('count is ', count)
    return count;
}

// Function to count the number of inversions
// during the merge process
function mergeSortAndCount(arr, l, m, r) {

    let left = [];
    for (let i = l; i < m + 1; i++) {
        left.push(arr[i]);

    }

    // Right subarray
    let right = [];
    for (let i = m + 1; i < r + 1; i++) {
        right.push(arr[i]);
    }
    let i = 0, j = 0, k = l, swaps = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) {
            arr[k++] = left[i++];
        }
        else {
            arr[k++] = right[j++];
            swaps += (m + 1) - (l + i);
        }
    }
    while (i < left.length) {
        arr[k++] = left[i++];
    }
    while (j < right.length) {
        arr[k++] = right[j++];
    }
    return swaps;
}

let arr = new Array(1, 20, 6, 4, 5);
mergeSort(arr, 0, arr.length - 1)