/**
 * Given a fixed-length integer array arr, duplicate each occurrence of zero,
 *  shifting the remaining elements to the right.

Note that elements beyond the length of the original array are not written. 
Do the above modifications to the input array in place and do not return anything.
Example 1:

Input: arr = [1,0,2,3,0,4,5,0]
Output: [1,0,0,2,3,0,0,4]
Explanation: After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]
Example 2:

Input: arr = [1,2,3]
Output: [1,2,3]
Explanation: After calling your function, the input array is modified to: [1,2,3]
 * 
 */
// Solution 1
var duplicateZeros = function(arr) {
    
    let temp = [];
    for(let i=0 ;i <arr.length; i++) {
        if(arr[i] === 0) {
            temp.push(0);
            temp.push(0);
        }else  {
            temp.push(arr[i])
        }
    }
    
    for(let i=0; i<arr.length; i++) {
        arr[i] = temp[i]
    }
    return arr;
};

// Solution2
const duplicateZeros = (numbers) => {
    const result = numbers
      .flatMap(number => number === 0 ? [number, number] : number)
      .slice(0, numbers.length);
  
    numbers.length = 0;
  
    Object.assign(numbers, result);
  };

  // Solution 3 -- Easy one
  var duplicateZeros = function(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 0) {
        arr.splice(i, 0, 0); // insert 0 at index i, delete nothing
        i++; // increment i, so that the new 0 that was inserted is skipped
        arr.pop(); // remove last element to maintain the same length
      }
    }
  };

  // Solution 4

  var duplicateZeros = function(arr) {
    for(let i=0;i<arr.length;i++){
      const curr = arr[i]
      if(curr === 0){      
        for(let j = arr.length-1; j>i+1; j--){
          arr[j] = arr[j-1]
        }
        if(i+1 < arr.length)
          arr[++i] = 0
      }    
    }
    return arr
  };

  // Solution 5
  var duplicateZeros = function(arr) {
    const rounds = arr.length
    for(let i = 0; i < rounds; i++) {
        if (arr[i] === 0) {
            arr.splice(i, 0, 0)
            i++
        }
    }
    arr.length = rounds
};

// Solution 6
var duplicateZeros = function(arr) {
    const arrLength = arr.length;
    for(let i = 0; i < arrLength; i++){
        if(arr[i] === 0){
            arr.splice(i+1,0,0);
            i++;
        }
    }
    arr.splice(arrLength,arr.length);
    
};