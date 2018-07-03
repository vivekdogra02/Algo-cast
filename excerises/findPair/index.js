
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

//Hashing technique
// O(n) time complexity
// O(n) auxiliary space
function findPair2(arr, sum) {
    let dict = {};
    for(let a in arr) {
        if(dict[sum - arr[a]]){
            console.log('Pair found at', dict[sum - arr[a]],  'and ', a);
            return;
        }
        dict[arr[a]] = a;
    }
    console.log('No Pair found')
}