/**
 * 42. Trapping Rain Water
Given n non-negative integers representing an elevation map where the width of each bar is 1, 
compute how much water it can trap after raining.

 Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9
 

Constraints:

n == height.length
1 <= n <= 2 * 104
0 <= height[i] <= 105
 */
/**
 * Brute force solution
 * T = O(n2)
 * S = O(1)
 */

var trap = function (height) {
  let totalWater = 0;

  for (let p = 0; p < height.length; p++) {
    let maxLeft = 0;
    let maxRight = 0;
    let leftP = p;
    let rightP = p;

    while (leftP >= 0) {
      maxLeft = Math.max(maxLeft, height[leftP]);
      leftP--;
    }

    while (rightP < height.length) {
      maxRight = Math.max(maxRight, height[rightP]);
      rightP++;
    }

    const currentWater = Math.min(maxLeft, maxRight) - height[p];
    if (currentWater >= 0) {
      totalWater += currentWater;
    }
  }

  return totalWater;
};

// Optimized solution
// T- O(N)
// S - O(1)
/**
 * 1. Identify the pointer with the lesser value;
 * 2. In this pointer value greater than or equal to max on that side
 *   - yes = update max on that side
 *   - no  = get water for pointer value , add to total
 *
 * 3.  Move pointer inwards
 * 4. Repeat for other pointer.
 *
 */

function getTrappedWater(height) {
  let left = 0,
    right = height.length - 1,
    maxLeft = 0,
    maxRight = 0,
    total = 0;

  while (left < right) {
    // Step 1
    if (height[left] <= height[right]) {
      // step 2
      if (height[left] >= maxLeft) {
        maxLeft = height[left];
      } else {
        total += maxLeft - height[left];
      }
      // step 3
      left++;
    } else {
      // Step 4
      if (height[right] >= maxRight) {
        maxRight = height[right];
      } else {
        total += maxRight - height[right];
      }
      right--;
    }
  }

  return total;
}

// Solution 3

var trap = function (height) {
  let left = [];
  let right = [];
  let n = height.length;

  left[0] = height[0];
  right[n - 1] = height[n - 1];

  for (let i = 1; i < n; i++) left[i] = Math.max(left[i - 1], height[i]);
  for (let i = n - 2; i >= 0; i--) right[i] = Math.max(right[i + 1], height[i]);
  let ans = 0;
  for (let i = 0; i < n; i++) ans += Math.min(left[i], right[i]) - height[i];

  return ans;
};

// solution 4
/**
 * 
Solution using prefix and postfix alogrithm
Time complexity O(n)
Space complexity O(n)
 * @returns 
 */

var trap = function (height) {
  const len = height.length;

  const prefixMax = new Array(len);
  const postfixMax = new Array(len);

  for (let i = 0; i < len; i++) {
    if (i === 0) prefixMax[i] = height[i];
    else prefixMax[i] = Math.max(prefixMax[i - 1], height[i]);
  }

  for (let i = len - 1; i >= 0; i--) {
    if (i === len - 1) postfixMax[i] = height[i];
    else postfixMax[i] = Math.max(postfixMax[i + 1], height[i]);
  }

  let trapWater = 0;

  for (let i = len - 1; i >= 0; i--) {
    const min = Math.min(postfixMax[i], prefixMax[i]);
    const diff = min - height[i];
    if (diff > 0) {
      trapWater += diff;
    }
  }

  return trapWater;
};
