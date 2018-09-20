
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
// finding the number of pair, name, index in that array
function findPair2(arr, sum) {
    let dict = {};
    let count = 0;
    for(let a in arr) {
        if(dict[sum - arr[a]]){
            d = dict[sum - arr[a]];
            // pair found at index
            console.log('Pair found at', d,  'and ', a);
            // pair values
            console.log('pair -', arr[d], ' - ',arr[a]);
            // counter
            count ++;
        }
        dict[arr[a]] = a;
    }
    console.log(count);
    if(!count)
    console.log('No Pair found')
}

//Given a list of numbers and a number k, return whether any two numbers from the list add up to k.

// For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.

function findP(arr, sum) {
    let dict = {};
    for(let a in arr) {
        if(dict[sum- arr[a]]) {
            return true;
        }
        dict[arr[a]] = a;
    }
    return false;   
}

// Solution 4
var findPair = (list, k) => {
    for(let i=0; i < list.length; i++){
      for(let j=0; j < list.length; j++){
        if(list[i] + list[j] === k)
          return true;
      }
    }
    return false;
  }