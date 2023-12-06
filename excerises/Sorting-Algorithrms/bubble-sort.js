// least efficient algo
// Bubble sort - more comparision and it is most simplest

// Time complexity - nested loops O(N^2) 
// Space complexity - O(1)

function BubbleSort(array) {
    const length = array.length;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            if (array[j] > array[j + 1]) {
                // swap numbers
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}

// Efficient Solution - this will not compare the last element as it will the greatest of all elements
// and we dont have to do that

function BubbleSort(array) {
    const length = array.length;
    for (let i = length; i > 0; i--) {
        for (let j = 0; j < i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // swap numbers
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
            }
        }
    }
    return array;
}

/**
 *  Most efficient way of implementation - with nearly sorted arrays.
 * If we have not swap the last time in the whole array 
 * and reach out to the end, we actually dont need to work 
 * on the leftover array elements becoz if last time, there is no swapping happens means its already sorted.
 * 
 * Only best case - O(2N) - as it requires only 2 iteration
 */
function BubbleSort(array) {
    const length = array.length;
    var noSwaps = false;
    for (let i = length; i > 0; i--) {
        noSwaps = true;
        for (let j = 0; j < i - 1; j++) {
            if (array[j] > array[j + 1]) {
                // swap numbers
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                noSwaps = false;
            }
        }
        if (noSwaps) break;
    }
    return array;
}

function BubbleSort(n) {
    let noSwaps = false;

    for (let i = 0; i < n; i++) {
        noSwaps = true;

        for (let j = 0; j < n - i; j++) {
            if (n[j] > n[j + 1]) {
                // swap numbers
                let tmp = n[j];
                n[j] = n[j + 1];
                n[j + 1] = tmp
                noSwaps = false;
            }
        }
        if (noSwaps) break;
    }
    return n;
}