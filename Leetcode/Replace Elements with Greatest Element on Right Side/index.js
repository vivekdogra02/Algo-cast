/**
 * 
 * Given an array arr, replace every element in that array with the greatest element among the elements to its right, and replace the last element with -1.

After doing so, return the array.

Example 1:

Input: arr = [17,18,5,4,6,1]
Output: [18,6,6,6,1,-1]
Explanation: 
- index 0 --> the greatest element to the right of index 0 is index 1 (18).
- index 1 --> the greatest element to the right of index 1 is index 4 (6).
- index 2 --> the greatest element to the right of index 2 is index 4 (6).
- index 3 --> the greatest element to the right of index 3 is index 4 (6).
- index 4 --> the greatest element to the right of index 4 is index 5 (1).
- index 5 --> there are no elements to the right of index 5, so we put -1.
Example 2:

Input: arr = [400]
Output: [-1]
Explanation: There are no elements to the right of index 0.
 

Constraints:

1 <= arr.length <= 104
1 <= arr[i] <= 105
 */

// solution 1

function replaceElements(arr) {
    
    let max = -1;
     for(var i=0; i<arr.length; i++) {
 
         if(arr.length - 1  == i)  {
              arr[arr.length -1] = -1;
         } else {
             var sliceArr = arr.slice(i+1, arr.length);
         max = Math.max(...sliceArr)
         arr[i] = max;
         }  
     }
     return arr;
 };

 // Solution 2

 var replaceElements = function(arr) {
    let max = 0
    
    for (let i = arr.length-1; i >= 0; i--) {
        const originalVal = arr[i]
        arr[i] = max
        max = Math.max(max, originalVal)
    }
    
    arr[arr.length-1] = -1
    return arr
};

// Solution 3

var replaceElements = function(arr) {
    let prev = -1
    for(let i=arr.length-1; i>=0;i--){
      const temp = arr[i]
      arr[i] = prev
      if(temp > prev){
        prev = temp
      }
    }
    return arr
  };


 // Solution 4
 var replaceElements = function(arr) {
    let cur = arr[arr.length-1];
    arr[arr.length-1] = -1;
    
    for(let i = arr.length-2; i >=0; i--) {
        if(arr[i] <= cur) {
            arr[i] = cur;
        }
        else {
            const temp = cur;
            cur = arr[i];
            arr[i] = temp;
        }
    }
    
    return arr;
};

// Solution 5

var replaceElements = function(arr) {
    
    let max = arr[arr.length-1];
    let prev = arr[arr.length-1];
    arr[arr.length-1]= -1;
    
    for(let i= arr.length-2; i>=0; i--){
        prev = arr[i];
        arr[i] = max;
        max = Math.max(max, prev);
    }
    
    return arr;
};