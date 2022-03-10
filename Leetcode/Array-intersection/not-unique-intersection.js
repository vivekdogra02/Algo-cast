/**
 * 350. Intersection of Two Arrays II
Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays and you may return the result in any order.

 

Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]
Example 2:

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
Explanation: [9,4] is also accepted.
 * 
 */

// Solution 1
var intersect = function (nums1, nums2) {
    const hash = {};
    const result = [];
    for (let i = 0; i < nums1.length; i++) {
        hash[nums1[i]] = hash[nums1[i]] ? hash[nums1[i]] + 1 : 1;
    }
    for (let y of nums2) {
        if (hash[y] > 0) {
            result.push(y);
            hash[y]--;
        }

    }
    return result;

};

// Solution 2
var intersect = function (nums1, nums2) {
    let map = new Map()
    nums1.forEach((temp) => {
        if (!map.has(temp)) {
            map.set(temp, 1)
        } else {
            map.set(temp, map.get(temp) + 1)
        }
    })

    let result = []

    nums2.forEach((temp) => {
        if (map.has(temp) && map.get(temp) > 0) {
            result.push(temp)
            map.set(temp, map.get(temp) - 1)
        }
    })

    return result
};

// Solution 3
var intersect = function (nums1, nums2) {
    const intersection = [];

    nums1.forEach((num1) => {
        const matchingIndex = nums2.indexOf(num1);

        if (matchingIndex >= 0) {
            intersection.push(num1);

            nums2.splice(matchingIndex, 1);
        }
    });

    return intersection;
};

// Solution 4

var intersect = function (nums1, nums2) {
    let intersect = []
    for (let i = 0; i < nums1.length; i++) {
        for (let j = 0; j < nums2.length; j++) {
            if (nums1[i] === nums2[j]) {
                intersect.push(nums2[j])
                delete nums2[j]
                break;
            }
        }
    }
    return intersect
}

// Solution 5
var intersect = function (nums1, nums2) {
    const result = []

    for (const nums of nums1) {
        if (!nums2.length) break;
        if (nums2.includes(nums)) {
            result.push(nums)
            nums2.splice(nums2.indexOf(nums), 1)
        }
    }

    return result
};

// Solution 6

var intersect = function (nums1, nums2) {
    const hash = {};
    for (let i = 0; i < nums1.length; i++) {
        hash[nums1[i]] = hash[nums1[i]] ? hash[nums1[i]] + 1 : 1;
    }

    return nums2.filter(num => {
        if (hash[num] !== undefined && hash[num] > 0) {
            hash[num] = hash[num] - 1;
            return true;
        } else {
            return false;
        }
    });
};