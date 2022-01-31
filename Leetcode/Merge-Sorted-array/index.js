/**
 * Merge Sorted Array

You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, 
and two integers m and n, representing the number of elements in nums1 and nums2 respectively.

Merge nums1 and nums2 into a single array sorted in non-decreasing order.

The final sorted array should not be returned by the function, 
but instead be stored inside the array nums1. 
To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements 
that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.

 
Example 1:

Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]
Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
Example 2:

Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]
Explanation: The arrays we are merging are [1] and [].
The result of the merge is [1].
Example 3:

Input: nums1 = [0], m = 0, nums2 = [1], n = 1
Output: [1]
Explanation: The arrays we are merging are [] and [1].
The result of the merge is [1].
Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.
 
 */

// Solution 1
function merge(nums1, m, nums2, n) {

    const startIndex = nums1.length - n;
    for (let i = startIndex; i < nums1.length; i++) {
        nums1[i] = nums2[i - startIndex];
    }
    nums1.sort((a, b) => a - b);
}

//Solution 2

var merge = function (nums1, m, nums2, n) {
    let first = m - 1;
    let second = n - 1;
    for (let i = first + second + 1; i >= 0; i--) {
        if (nums1[first] >= nums2[second]) {
            nums1[i] = nums1[first]
            first--;
        } else if (second >= 0) {
            nums1[i] = nums2[second]
            second--;
        }
    }
    return nums1;
};

//Solution 3

var merge = function(nums1, m, nums2, n) {
    //09:20 -- 09:30
    // O(N) space and O(N) time
    let lst = []
    let i = 0
    let j = 0
    while (i < m && j < n){
        if (nums1[i] <= nums2[j]){
            lst.push(nums1[i])
            i += 1
        } else{
            lst.push(nums2[j])
            j += 1
        }
    }
    if (i === m){
        lst = lst.concat(nums2.slice(j,))
    } else{
        lst = lst.concat(nums1.slice(i,))
    }
    for (let i = 0; i < n + m; i++){
        nums1[i] = lst[i]
    }
    return nums1;
    
};

///Solution 4

var merge = function(nums1, m, nums2, n) {
    let i = m + n - 1;
    n--;
    m--;
    while(n >= 0 && i >= 0){
        nums1[i] = nums1[m] > nums2[n]? nums1[m--]: nums2[n--];
        i--;
    }
    return nums1;
};

//Solution 5

var merge = function(nums1, m, nums2, n) {
    let p1=m-1;
    let p2=n-1;
      //In for we aredefining the starting pointing of i by giving let i=something;
      for(let i=nums1.length-1;i>=0;i--){
          if(p2<0){
              break
          }
          if(nums1[p1]>nums2[p2]){
              nums1[i]=nums1[p1]
              p1--
             
             }else{
                 nums1[i]=nums2[p2]
                 p2--
             }
          
      }
    return nums1;
      
    };
       
                  