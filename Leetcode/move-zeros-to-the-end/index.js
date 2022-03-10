/**
 * Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.

Note that you must do this in-place without making a copy of the array.

 

Example 1:

Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]
Example 2:

Input: nums = [0]
Output: [0]
 

Constraints:

1 <= nums.length <= 104
-231 <= nums[i] <= 231 - 1
 * 
 */

// Solution 1

function moveZeros(nums) {
    let count = 0;
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] !== 0) {
            nums[count++] = nums[i];
        }
    }

    while(count < nums.length) {
        nums[count++] = 0;
    }

    return nums;
}

// Solution 2

var moveZeroes = function(nums) {
    let lastNonZero = 0
    
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[lastNonZero] = nums[i]
            lastNonZero++
        }
    }
      
      for (let i = lastNonZero; i < nums.length; i++ ) {
          nums[i] = 0
      }
  };

  // Solution 3
  var moveZeroes = function(nums) {
    let count=0;
    for(let i=0; i<nums.length; i++){
      if(nums[i]===0) count++;
    }
    if(count===0) return nums;
    else{
      let i=0;
      while(count>0){
        if(nums[i]===0){
          nums.splice(i,1);
          nums.push(0);
          count--;
        }else{
          i++;
        }
      }
    }
};

// Solution 4

var moveZeroes = function(nums) {
    let j = 0
    for (let i =0; i<nums.length;i++) {
        if (nums[i] !== 0 ) {
            [nums[j], nums[i]] = [nums[i], nums[j]]
            j++
        }
    }
    return nums
};

// Solution 5

var moveZeroes = function(nums) {
    const stable = [...nums];
    
    for(let i = stable.length - 1; i > -1; i--){
        if(stable[i] === 0){
            nums.splice(i,1);
            nums.push(0);
        }
    }
};