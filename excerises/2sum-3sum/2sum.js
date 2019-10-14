/* 
Two Sum 

Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
*/

const twoSum = function(nums, target) {
   const comp = {};
   for(let i=0; i<nums.length; i++){
       if(comp[nums[i] ]>=0){
           return [ comp[nums[i] ] , i]
       }
       comp[target-nums[i]] = i
   }
};

// or
var twoSum = function(nums, target) {
   let m = new Map();
    let index = 0;
    
    for(let n of nums) {
        if(m.has(n)) {
            return [m.get(n), index];
        }else {
            m.set(target - n, index)
        }
        index++;
    }
};