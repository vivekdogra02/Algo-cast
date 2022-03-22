/**
 * Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.

Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
Example 2:

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Explanation: [4,9] is also accepted.
 * 
 */

// Solution 1

var intersection = function (nums1, nums2) {
    let hash = {};

    let result = [];

    for (let i = 0; i < nums1.length; i++) {
        hash[nums1[i]] = hash[nums1[i]] ? hash[nums1[i]] + 1 : 1;
    }

    for (let x of nums2) {
        if (hash[x] > 0) {
            result.push(x);
            hash[x] = 0;
        }
    }
    return result;
};


// Solution 2

var intersection = function (nums1, nums2) {


    if (nums1.length >= nums2.length) {
        var filteredArray = [];
        filteredArray = nums1.filter(value => nums2.includes(value));
    }

    else {
        var filteredArray = [];
        filteredArray = nums2.filter(value => nums1.includes(value));
    }

    result = filteredArray.filter((value, index) => filteredArray.indexOf(value) == index);
    return result;
    // brute force
    /*
    var result = [];
    if(nums1.length > nums2.length){
        for(let i = 0; i < nums1.length; i++){
            for (let j = 0; j < nums2.length; j++){
                
                if(nums1[i] == nums2[j] && !result.includes(nums2[j])){
                    result.push(nums2[j]);
                }
            }
        }
    }
    else{
         for(let i = 0; i < nums2.length; i++){
            for (let j = 0; j < nums1.length; j++){
                if(nums2[i] == nums1[j] && !result.includes(nums1[j])){
                    result.push(nums1[j]);
                }
            }
         }
    }
    
    return result;
    */

};


// Solution 3

var intersection = function (nums1, nums2) {
    let result = [];
    let map = {};

    nums1 = [...new Set(nums1)];
    nums2 = [...new Set(nums2)];

    for (let item of nums1) {
        if (item in map) {
            map[item] += 1;
        } else {
            map[item] = 0;
        }
    }

    for (let item of nums2) {
        if (item in map) {
            map[item] += 1;
        } else {
            map[item] = 0;
        }
    }

    for (let key in map) {
        if (map[key] !== 0) {
            result.push(key);
        }
    }

    return result;
}


// Solution 4

var intersection = function (nums1, nums2) {
    let obj = {}
    let output = []
    for (let i = 0; i < nums1.length; i++) {
        obj[nums1[i]] = true
    }

    for (let i = 0; i < nums2.length; i++) {
        if (obj[nums2[i]]) {
            output.push(nums2[i])
            obj[nums2[i]] = false
        }
    }

    return output
};

// Solution 5

var intersection = function (nums1, nums2) {
    const set1 = new Set(nums1);
    const set2 = new Set();
    for (const num of nums2) {
        set1.has(num) && set2.add(num);
    }
    return Array.from(set2);
};

// Solution 6
var intersection = function (nums1, nums2) {

    const set1 = new Set(nums1);
    const set2 = new Set(nums2);

    return [...set1].filter(v => set2.has(v));

};