/*
Given an array of integers, 
find the first missing positive integer in linear time and constant space. 
In other words, find the lowest positive integer that does not exist in the array. 
The array can contain duplicates and negative numbers as well.

For example, the input [3, 4, -1, 1] should give 2. The input [1, 2, 0] should give 3.

You can modify the input array in-place.
*/

//solution 1
function missingPiece(nums) {
    let d = nums.sort((a,b) =>  Math.abs(a) - Math.abs(b))
    .reduce((res, val) => {
        val === res ? res++ : res;
        return res;
    },1);  
    return d; 
}

// Solution 2

function findNumber(values) {
    let result = [];
    for (let i = 0; i < values.length; ++i) {
      if (0 <= values[i]) {
          // storing all positive values here
        result[values[i]] = true;
      }
    }
  
    for (let i = 1; i <= result.length; ++i) {
      if (undefined === result[i]) {
          // missing piece here
        return i;
      }
    }
  
    return 1;
  }

  // Solution 3

  const input1 = [3, 4, -1, 1];
const input2 = [1, 2, 0];

const pb4 = (input) => {
  // Filter out negative elements
  const onlyPositives = input.filter( el => el > 0 );
  let i = 1;
  // Maximum possible value is the highest positive number + 1 
  while(i <= Math.max(...onlyPositives) +1 ){
    if(!onlyPositives.includes(i))
      //Starts at 1, returns whenever an integer is missing
      return i;
    i++;
  }  
}

console.log(pb4(input1));
console.log(pb4(input2));
