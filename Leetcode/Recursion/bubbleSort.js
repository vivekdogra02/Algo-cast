/**
 * largest element at the end of the array;
 * 
 */


function BubbleSort(n, len) {

    // base case
    if (len === 0 || len === 1) return

    // Solve one case
    for (let i = 0; i < len - 1; i++) {
        if (n[i] > n[i + 1]) {
            let temp = n[i];
            n[i] = n[i + 1];
            n[i + 1] = temp;
        }
    }

    BubbleSort(n, len - 1)
    return n;
}