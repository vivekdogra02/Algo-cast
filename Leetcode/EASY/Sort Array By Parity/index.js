/**
 * Sort Array By Parity

Solution
Given an integer array nums, move all the even integers at the beginning of the array followed by all the odd integers.

Return any array that satisfies this condition.

 

Example 1:

Input: nums = [3,1,2,4]
Output: [2,4,3,1]
Explanation: The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.
Example 2:

Input: nums = [0]
Output: [0]
 */

// Solution 1

var sortArrayByParity = function(nums) {
    
   
    if(nums.length === 1) return nums;
    
    for(let i =0; i <nums.length; i++) {
        if(nums[i] % 2 === 0) {
            const temp = nums[i];
            nums.splice(i, 1);
            nums.unshift(temp)
        }
    }
    return nums;
};

// solution 2

var sortArrayByParity = function(nums) {
    let odd = []
    let even = []
    nums.forEach(num => {
        if(num % 2 === 0) {
            even.push(num)
        } else {
            odd.push(num)
        }
    })
    return even.concat(odd)
};

// Solution 3
var sortArrayByParity = function(nums) {
    let index = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] % 2 === 0) {
            let temp = nums[index];
            nums[index] = nums[i]
            nums[i] = temp;
            index++;
        }
    }
    return nums;
    
};

// Solution 4

var sortArrayByParity = function(nums) {
    let even = nums.filter(number => {
        return number % 2 == 0
    })
    let odd = nums.filter(number => {
        return number % 2 !== 0
    })
    
    return even.concat(odd)
};

// Solution 5
const sortArrayByParity = function(nums) {
    // even first then odd
    const even = [];
    const odd = [];
  
    for (const num of nums) {
      if (num % 2 === 0) {
        even.push(num);
      } else {
        odd.push(num);
      }
    }
  
    return [...even, ...odd];
  };

  ///Solution 6

  var sortArrayByParity = function(nums) {
    const odds = nums.filter(x => x%2==1);
    nums = nums.filter(x => x%2==0);
    return nums.concat(odds);
};