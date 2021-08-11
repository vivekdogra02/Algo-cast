/**
 * Write a binary searching algorithm
 * 
 * Time complexity: 
 * 1. worst case and average: O(logN)
 * 2. best: O(1)
 */

function binarySearch(arr, val) {
    let start = 0;
    let end = arr.length - 1;
    let middle = Math.floor((start + end) /2);

    while (arr[middle] !== val && start <= end) {
        if(arr[middle] > val) {
            end = middle - 1
        } else {
            start = middle + 1;
        }
        middle = Math.floor((start+end) / 2);
    }
    if(arr[middle] === val) {
        return middle;
    }
    return -1;
}