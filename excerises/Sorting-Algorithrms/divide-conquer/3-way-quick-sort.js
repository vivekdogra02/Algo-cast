/**
 * In simple QuickSort algorithm, we select an element as pivot, 
 * partition the array around a pivot and recur for subarrays on the left and right of the pivot. 
 * Consider an array which has many redundant elements. 
 * For example, {1, 4, 2, 4, 2, 4, 1, 2, 4, 1, 2, 2, 2, 2, 4, 1, 4, 4, 4}. 
 * If 4 is picked as a pivot in Simple Quick Sort, we fix only one 4 and recursively process remaining occurrences.
 * The idea of 3 way Quick Sort is to process all occurrences of the pivot and is based on Dutch National Flag algorithm. 

In 3 Way QuickSort, an array arr[l..r] is divided in 3 parts:
a) arr[l..i] elements less than pivot.
b) arr[i+1..j-1] elements equal to pivot.
c) arr[j..r] elements greater than pivot.
 * 
 */

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// 3-way partition based quick sort
function quickSort(arr, low, high) {

    // Base case
    if (low >= high) return;
    let i = low;
    let j = high;

    // Note that i and j are passed
    partition(arr, low, high, i, j);

    // Recur
    quickSort(arr, low, i);
    quickSort(arr, j, high)

    console.log('arr  -- ', arr)
}

//It uses Dutch National Flag Algorithm
function partition(arr, low, high, i, j) {
    // To handle 2 elements
    if (high - low <= 1) {
        if (arr[high] < arr[low]) {
            swap(arr, high, low);
        }
        i = low;
        j = high;
        return;

    }

    let mid = low;
    let pivot = arr[high];

    while (mid <= high) {
        if (arr[mid] < pivot) {
            swap(arr, low++, mid++);
        } else if (arr[mid] === pivot) {
            mid++;
        } else {
            swap(arr, mid, high--);
        }
    }

    // update i and j
    i = low - 1;
    j = mid // or high
}

let a = [24, 18, 38, 43, 14, 40, 1, 54];

quickSort(a, 0, a.length - 1)
