/**
 * 1691. Maximum Height by Stacking Cuboids
 * Given n cuboids where the dimensions of the ith cuboid is 
 * cuboids[i] = [widthi, lengthi, heighti] (0-indexed). 
 * Choose a subset of cuboids and place them on each other.
 * You can place cuboid i on cuboid j if widthi <= widthj and lengthi <= lengthj and heighti <= heightj. 
 * You can rearrange any cuboid's dimensions by rotating it to put it on another cuboid.
 * 
    Return the maximum height of the stacked cuboids.
Input: cuboids = [[50,45,20],[95,37,53],[45,23,12]]
Output: 190
Explanation:
Cuboid 1 is placed on the bottom with the 53x37 side facing down with height 95.
Cuboid 0 is placed next with the 45x20 side facing down with height 50.
Cuboid 2 is placed next with the 23x12 side facing down with height 45.
The total height is 95 + 50 + 45 = 190.

Example 2:
Input: cuboids = [[38,25,45],[76,35,3]]
Output: 76
Explanation:
You can't place any of the cuboids on the other.
We choose cuboid 1 and rotate it so that the 35x3 side is facing down and its height is 76.

Example 3:
Input: cuboids = [[7,11,17],[7,17,11],[11,7,17],[11,17,7],[17,7,11],[17,11,7]]
Output: 102
Explanation:
After rearranging the cuboids, you can see that all cuboids have the same dimension.
You can place the 11x7 side down on all cuboids so their heights are 17.
The maximum height of stacked cuboids is 6 * 17 = 102.
 

Constraints:

n == cuboids.length
1 <= n <= 100
1 <= widthi, lengthi, heighti <= 100
 */
/**---------------------------------------------------------------------------------------- */

/**
 * Solution 1- optimal solution using LIS
 *
 * Runtime: 74 ms, faster than 100.00% of JavaScript online submissions
 * for Maximum Height by Stacking Cuboids .
 *
 * Memory Usage: 44.9 MB, less than 75.00% of JavaScript online submissions for Maximum Height
 * by Stacking Cuboids .
 */

function check(base, newBox) {
  if (base[0] >= newBox[0] && base[1] >= newBox[1] && base[2] >= newBox[2])
    return true;
  return false;
}
function solveSpaceOpt(nums) {
  let n = nums.length;
  let currRow = new Array(n + 1).fill(0);
  let nextRow = new Array(n + 1).fill(0);
  // base case (Already set in dp array)

  for (let curr = n - 1; curr >= 0; curr--) {
    for (let prev = curr - 1; prev >= -1; prev--) {
      let inc = 0;
      if (prev === -1 || check(nums[curr], nums[prev])) {
        // update height (nums[2])
        inc = nums[curr][2] + nextRow[curr + 1];
      }

      // increment curr -> curr + 1 and prev remains same
      let exc = 0 + nextRow[prev + 1];

      currRow[prev + 1] = Math.max(inc, exc);
    }
    nextRow = currRow;
  }
  return nextRow[0];
}
var maxHeight = function (cuboids) {
  //Step 1- sort all dimension for every cuboid
  for (let i = 0; i < n; i++) {
    cuboids[i].sort((a, b) => a - b);
  }

  // Step 2 - Sort all cuboids basis on width or length
  cuboids.sort((a, b) =>
    a[0] - b[0] ? a[0] - b[0] : a[1] - b[1] ? a[1] - b[1] : a[2] - b[2]
  );

  // Step 3: Use LIS logic
  return solveSpaceOpt(cuboids);
};

/**---------------------------------------------------------------------------------------- */

//Solution 2 - DP Top down approach

var maxHeight = function (cuboids) {
  const n = cuboids.length;
  const dp = [];

  for (let i = 0; i <= n; i++) {
    dp.push(new Array(n + 1).fill(0));
  }
  for (let i = 0; i < n; i++) {
    cuboids[i].sort((a, b) => a - b);
  }

  cuboids.sort((a, b) =>
    a[0] - b[0] ? a[0] - b[0] : a[1] - b[1] ? a[1] - b[1] : a[2] - b[2]
  );

  return solveTab(cuboids, dp);
};

const canInsert = (base, toInsert) => {
  return (
    base[0] <= toInsert[0] && base[1] <= toInsert[1] && base[2] <= toInsert[2]
  );
};

const solve = (cuboids, index, prev, dp) => {
  if (index == cuboids.length) return 0;

  if (dp[index][prev + 1] !== -1) return dp[index][prev + 1];

  let take = 0;
  if (prev == -1 || (prev !== -1 && canInsert(cuboids[prev], cuboids[index]))) {
    take = cuboids[index][2] + solve(cuboids, index + 1, index, dp);
  }

  const notTake = solve(cuboids, index + 1, prev, dp);
  dp[index][prev + 1] = Math.max(take, notTake);

  return dp[index][prev + 1];
};

const solveTab = (cuboids, dp) => {
  const n = cuboids.length;

  for (let index = n - 1; index >= 0; index--) {
    for (let prev = index - 1; prev >= -1; prev--) {
      let take = 0;
      if (
        prev == -1 ||
        (prev !== -1 && canInsert(cuboids[prev], cuboids[index]))
      ) {
        take = cuboids[index][2] + dp[index + 1][index + 1];
      }

      const notTake = dp[index + 1][prev + 1];
      dp[index][prev + 1] = Math.max(take, notTake);
    }
  }

  return dp[0][0];
};
/**---------------------------------------------------------------------------------------- */
/**
 * Solution 3 - best solution 
 *  First, we need to sort each box in C by their dimensions, then sort C itself.
 *  When sorting C, we want to want to sort in order of smallest to longest dimension. 
 * So if the smallest dimension of two boxes is the same, compare the next larger dimension, 
 * and if those are the same, compare the largest dimensions.

Next, we'll iterate through the boxes (b = C[j]) and set the intial "best" value for 
the height of the stack (dp[j]) as just the height of the box (b[2]). 
After that, we can just check each previous box (a = C[i]) and see if it will fit atop b.
If it does, we can update dp[j] if the height of that previous stack (dp[i]) plus the 
height of b (b[2]) is greater than than the current value of dp[j]. 
By the end of the inner for loop, we will have found the best possible value for dp[j] and 
can iterate to the next j value.
 
 Once all values in our DP array are complete, we can simply return whichever value is the highest.
 
 
 Code:
 */

var maxHeight = function (C) {
  let len = C.length,
    dp = new Array(len);
  for (let i = 0; i < len; i++) C[i].sort((a, b) => a - b); // Sort each box's dimensions, small to large
  C.sort(([a, b, c], [d, e, f]) => (a - d ? a - d : b - e ? b - e : c - f)); // Sort all boxes by dimensions, small to large
  for (let j = 0, b = C[0]; j < len; b = C[++j]) {
    // Iterate through the boxes
    dp[j] = b[2]; // Store the box height as the initial best value
    for (
      let i = 0, a = C[0];
      i < j;
      a = C[++i] // Then check each previous stack of boxes
    )
      if (a[0] <= b[0] && a[1] <= b[1] && a[2] <= b[2])
        // To see which ones can fit on the current box
        dp[j] = Math.max(dp[j] || b[2], dp[i] + b[2]); // And set the best value for the current box
  }
  return Math.max(...dp); // Return the best possible stack
};

/** ------------------------------------------------------------------------------------------ */

/**
 * Solution 4 = DP Top down (recursion + memo)
 */
var maxHeight = function (cubs) {
  cubs = cubs.map((cub) => cub.sort((a, b) => b - a));
  cubs.sort((a, b) =>
    b[0] - a[0] ? b[0] - a[0] : b[1] - a[1] ? b[1] - a[1] : b[2] - a[2]
  );
  let memo = {};
  cubs[-1] = [0];
  return dfs(-1);

  function dfs(base) {
    const key = base;
    if (memo[key] !== undefined) {
      return memo[key];
    }

    let max = 0;
    for (let i = base + 1; i < cubs.length; i++) {
      if (base === -1 || canFit(cubs[i], cubs[base])) {
        max = Math.max(dfs(i), max);
      }
    }

    memo[key] = max + cubs[base][0];
    return memo[key];
  }

  // can fit a on top of b?
  function canFit(a, b) {
    return a[0] <= b[0] && a[1] <= b[1] && a[2] <= b[2];
  }
};

/** ----------------------------------------------------------------------------------------- */

var maxHeight = function (cuboids) {
  let dp = Array(cuboids.length).fill(0),
    max = 0;

  for (let i = 0; i < cuboids.length; i++) cuboids[i].sort((b, a) => a - b);

  cuboids.sort((b, a) =>
    b[0] === a[0] ? (b[1] === a[1] ? b[2] - a[2] : b[1] - a[1]) : b[0] - a[0]
  );

  for (let i = 0; i < cuboids.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      if (cuboids[i].every((each, idx) => each >= cuboids[j][idx])) {
        dp[i] = Math.max(dp[i], dp[j]);
      }
    }
    dp[i] += cuboids[i][0];
    max = Math.max(max, dp[i]);
  }
  return max;
};
/** ----------------------------------------------------------------------------------------- */
