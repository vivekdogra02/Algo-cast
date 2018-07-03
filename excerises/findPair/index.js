
// O(nlog(n)) solution using sorting
// Auxiliary space O(1)
function findPair(arr, sum) {
    // Sort the array in ascending order
    arr.sort();
   // maintain two indices pointing to end-points of the array
   var low = 0;
    var high = arr.length -1;
    // reduce search space arr[low ... high] at each iteration of the loop
    // loop till low is less than high
    while (low < high){
        // sum found 
        if(arr[low] + arr[high] === sum) {
            console.log('Pair found', low, high);
            return;
        }
        if(arr[low] + arr[high] < sum) {
            low++;
        } else {
            high--;
        }
    } 
    console.log('No pair found');
}
