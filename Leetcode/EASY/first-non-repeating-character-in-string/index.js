/**
 * 387. First Unique Character in a String
Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.
Example 1:

Input: s = "leetcode"
Output: 0
Example 2:

Input: s = "loveleetcode"
Output: 2
Example 3:

Input: s = "aabb"
Output: -1
 */

// Solution 1
function firstUniqChar(s) {
    let hash = {};
    for (let i = 0; i < s.length; i++) {
        hash[s[i]] = hash[s[i]] ? hash[s[i]] + 1 : 1;
    }
    for (let key in hash) {
        if (hash[key] === 1) return s.indexOf(key)
    }
    return -1;
}

// Solution 2 -- 99 % faster
var firstUniqChar = function (s) {
    for (let i = 0; i < s.length; i++) {
        if (s.indexOf(s[i]) === i && s.lastIndexOf(s[i]) === i)
            return i;
    }
    return -1;
};

// Solution 3

var firstUniqChar = function (s) {
    let index = -1
    let arr = [...s]
    arr.some((cur, i) => {
        if (i === s.indexOf(cur) && i === s.lastIndexOf(cur)) {
            index = i
            return true;
        }
    })
    return index
};

// Solution 4

const firstUniqChar = function (s) {
    const set = new Set();
    const rep = new Set();
    for (let i = 0; i < s.length; i++) {
        if (set.has(s[i])) {
            rep.add(s[i]);
        } else {
            set.add(s[i]);
        }
    }
    for (let i = 0; i < s.length; i++) {
        if (!rep.has(s[i])) {
            return i;
        }
    }
    return -1;
};

// Solution 5

var firstUniqChar = function (s) {
    let arr = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        arr[s.charCodeAt(i) - 97]++
    }
    for (let i = 0; i < s.length; i++) {
        if (arr[s.charCodeAt(i) - 97] === 1)
            return i;
    }
    return -1;
    console.log(arr)
};