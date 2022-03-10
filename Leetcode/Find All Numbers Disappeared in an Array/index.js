/**
 * Find All Numbers Disappeared in an Array
 * 
 * Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.

 

Example 1:

Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]
Example 2:

Input: nums = [1,1]
Output: [2]
 */

// solution 1

var findDisappearedNumbers = function(nums) {
 
    
    for(let i=0; i<nums.length; i++) {
        let j = Math.abs(nums[i]) - 1;
        
        nums[j] = Math.abs(nums[j]) * -1;
    }
    
    let result = [];
    
    for(let i=0; i<nums.length; i++) {
        if(nums[i] > 0) {
            result.push(i + 1);
        }
    }
    
    return result;
    
};

// Solution 2

var findDisappearedNumbers = function(nums) {
    let numList = {};
    let missingNumbers = [];

    for(let i = 0; i < nums.length;i++) {
        if(!numList[nums[i]]) {
            numList[nums[i]] = 1;
        }
    }

    for(let i = 1; i <= nums.length;i++) {
        if(!numList[i]) {
            missingNumbers.push(i);
        }
    }

    return missingNumbers;
};

// Solution 3

var findDisappearedNumbers = function(nums) {
    let answer = [];
    s = new Set(nums)
    
    for (let i = 1; i <= nums.length; i++){
        if (!s.has(i)){
            answer.push(i);
        }
    }
    
    return answer;
    
};

// Solution 4

var findDisappearedNumbers = function(nums) {
    const set = new Set();
    for (let i = 0; i < nums.length; i++) {
      set.add(i + 1);
    }
    for (const num of nums) {
      set.delete(num);
    }
    return [...set];
  };

  // Solution 5
  var findDisappearedNumbers = function(nums) {
    const p = new Array(nums.length+1);
    const result = [];
    for(let i = 0 ; i < nums.length; i++ ){
        if(!p[nums[i]]){
            p[nums[i]] = true;
        }
    }
    for(let i =1; i<p.length;i++){
        if(!p[i])
            result.push(i);
    }
    return result;
};

// Solution 6

var findDisappearedNumbers = function(nums) {
    let missing = [];
    for(let i = 0; i <= nums.length; i++) {
        let val = Math.abs(nums[i]) - 1;
            if (nums[val] > 0) {
                nums[val] = -nums[val];
            }        
    }
    for(let i = 0; i <= nums.length; i++) {
        if(nums[i] > 0) {
            missing.push(i + 1)
        }       
    }
    return missing; 
};