/**
 * Given an array of integers arr, return true if and only if it is a valid mountain array.

Recall that arr is a mountain array if and only if:

arr.length >= 3
There exists some i with 0 < i < arr.length - 1 such that:
arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
Example 1:

Input: arr = [2,1]
Output: false
Example 2:

Input: arr = [3,5,5]
Output: false
Example 3:

Input: arr = [0,3,2,1]
Output: true
 * 
 */


//solution 1

var validMountainArray = function(arr) {
    if (arr.length < 3) {
    return false;
  }
  let peak = Math.max(...arr);
  let index = arr.indexOf(peak);
  if (peak == arr[arr.length - 1] || peak === arr[0]) {
    return false;
  }
  let arr1 = [...arr.slice(0, index + 1)];
  let arr2 = [...arr.slice(index)];
  for (let i = 1; i < arr1.length; i++) {
    if (arr1[i - 1] >= arr1[i]) {
      return false;
    }
  }

  for (let i = 1; i < arr2.length; i++) {
    if (arr2[i - 1] <= arr2[i]) {
      return false;
    }
  }

  return true;
};

// solution 2
var validMountainArray = function(arr) {
    const max = arr.indexOf(Math.max(...arr))
    const left = arr.slice(0, max)
    const right = arr.slice(max).reverse()
    if (!left.length || right.length <= 1) return false
    return isIncreasing(left) && isIncreasing(right)
};

const isIncreasing = arr => {
    for (let i = 0; i < arr.length; i++){
        if (arr[i] >= arr[i+1]){
            return false
        }          
    }
    return true
}

// Solution 3
var validMountainArray = function(arr) {
    let up = true;
    if (arr[0] > arr[1]) {
        return false;
    }
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] == arr[i+1]) {
            return false;
        } else if ((arr[i] < arr[i + 1]) && !up) {
            return false;
        } else if (arr[i] > arr[i+1]) {
            up = false;
        }
    }
    return arr.length >= 3 && up == false;
};

// Solution 4

var validMountainArray = function(arr) {
    if(arr.length < 3) return false;

    let i = 1;
    const length = arr.length;
    
    while(i < length && arr[i] > arr[i-1]){
        i++;
    }
    
    if(i === 1 || i === length) return false;

    
    while (i < length && arr[i] < arr[i-1]){
        i++;
    }
    
    return i === length;
};

// Solution 5

var validMountainArray = function(arr) {
    if (arr.length < 3) {
        return false;
    }
    var peakIdx = arr.indexOf(Math.max(...arr));
    if (peakIdx === 0 || peakIdx === arr.length - 1) {
        return false;
    }
    for (var i = 0; i < peakIdx; i++) {
        if (arr[i] >= arr[i + 1]) {
            return false;
        }
    }
    for (var i = peakIdx; i < arr.length; i++) {
        if (arr[i] <= arr[i + 1]) {
            return false;
        }
    }
    return true;
};

// Solution 6

var validMountainArray = function(arr) {
    let n = arr.length
    if(n < 3) return false
    let peak;
    
    for(let i=1; i<n; i++){
        if(arr[i-1] == arr[i]) return false
        if(peak==undefined && arr[i-1]>arr[i]) peak = i-1
        if(peak!=undefined && arr[i-1]<arr[i]) return false
    }
    
    return peak > 0
}
