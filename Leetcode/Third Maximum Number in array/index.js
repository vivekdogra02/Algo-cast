/**
 * Given an integer array nums, return the third distinct maximum number in this array. If the third maximum does not exist, return the maximum number.

 

Example 1:

Input: nums = [3,2,1]
Output: 1
Explanation:
The first distinct maximum is 3.
The second distinct maximum is 2.
The third distinct maximum is 1.
Example 2:

Input: nums = [1,2]
Output: 2
Explanation:
The first distinct maximum is 2.
The second distinct maximum is 1.
The third distinct maximum does not exist, so the maximum (2) is returned instead.
Example 3:

Input: nums = [2,2,3,1]
Output: 1
Explanation:
The first distinct maximum is 3.
The second distinct maximum is 2 (both 2's are counted together since they have the same value).
The third distinct maximum is 1.
 */

// Solution 1

var thirdMax = function(nums) {
    nums.sort((a,b) => a-b);
    console.log('sorted ,', nums)
    
    let dup = [];
    
    nums.map(n => {
        if(dup.indexOf(n) === -1) dup.push(n);
    });
    
    if(dup.length >= 3) {
        return dup[dup.length - 3]
    } else {
       return dup.pop()
    }
};

// Solution 2

var thirdMax = function(nums) {
    let mySet = new Set(nums)
  
    const max = Math.max(...mySet)
    if (mySet.size < 3) return max
  
    mySet.delete(max)
    const secondMax = Math.max(...mySet)
    mySet.delete(secondMax)
    return Math.max(...mySet)
  
  }

  // Solution 3

  