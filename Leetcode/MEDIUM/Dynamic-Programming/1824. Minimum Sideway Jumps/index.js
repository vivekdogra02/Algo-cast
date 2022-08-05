/**
 * 1824. Minimum Sideway Jumps
 * There is a 3 lane road of length n that consists of n + 1 points labeled from 0 to n. 
 * A frog starts at point 0 in the second lane and wants to jump to point n. 
 * However, there could be obstacles along the way.

You are given an array obstacles of length n + 1 where each obstacles[i] (ranging from 0 to 3)
 describes an obstacle on the lane obstacles[i] at point i. If obstacles[i] == 0, 
 there are no obstacles at point i. There will be at most one obstacle in the 3 lanes at each point.

For example, if obstacles[2] == 1, then there is an obstacle on lane 1 at point 2.
The frog can only travel from point i to point i + 1 on the same lane 
if there is not an obstacle on the lane at point i + 1. To avoid obstacles, 
the frog can also perform a side jump to jump to another lane (even if they are not adjacent)
 at the same point if there is no obstacle on the new lane.

For example, the frog can jump from lane 3 at point 3 to lane 1 at point 3.
Return the minimum number of side jumps the frog needs to reach any lane at point n starting 
from lane 2 at point 0.

Note: There will be no obstacles on points 0 and n.
Example 1:
Input: obstacles = [0,1,2,3,0]
Output: 2 
Explanation: The optimal solution is shown by the arrows above. There are 2 side jumps (red arrows).
Note that the frog can jump over obstacles only when making side jumps (as shown at point 2).

Example 2:
Input: obstacles = [0,1,1,3,3,0]
Output: 0
Explanation: There are no obstacles on lane 2. No side jumps are required.

Example 3:
Input: obstacles = [0,2,1,0,3,0]
Output: 2
Explanation: The optimal solution is shown by the arrows above. There are 2 side jumps.
Constraints:

obstacles.length == n + 1
1 <= n <= 5 * 105
0 <= obstacles[i] <= 3
obstacles[0] == obstacles[n] == 0
 */

/**
 * Solution 1 - Recursion
 *
 */
function solveRec(obs, currLane, currPos) {
  // base case
  let n = obs.length - 1;
  // if current is at end return 0
  if (currPos === n) return 0;

  // Go Straight
  if (obs[currPos + 1] !== currLane) {
    return solveRec(obs, currLane, currPos + 1);
  } else {
    // Side way jump
    // traverse in the lane
    let ans = Number.MAX_VALUE;
    for (let lane = 1; lane <= 3; lane++) {
      // if curr lane is not equal to lane and there is not obstancle in sideway
      if (currLane !== lane && obs[currPos] !== lane) {
        const sideWay = 1 + solveRec(obs, lane, currPos);
        ans = Math.min(ans, sideWay);
      }
    }
    return ans;
  }
}

function minSideWays(obs) {
  return solveRec(obs, 2, 0);
}

/**
 * Solution 2 - Top down (Recursion + memo)
 * In top down, you are going from (2,0) to these number
 *   *       |------------------> (1,n)
 * (2,0) |------------------> (2,n)
 *       |------------------> (3,n)
 */

function solveMem(obs, currLane, currPos, dp) {
  // base case
  let n = obs.length - 1;
  // if current is at end return 0

  if (currPos === n) return 0;

  if (dp[currLane][currPos] !== -1) return dp[currLane][currPos];
  // Go Straight
  if (obs[currPos + 1] !== currLane) {
    return solveMem(obs, currLane, currPos + 1, dp);
  } else {
    // Side way jump
    // traverse in the lane
    let ans = Number.MAX_VALUE;
    for (let lane = 1; lane <= 3; lane++) {
      // if curr lane is not equal to lane and there is not obstancle in sideway
      if (currLane !== lane && obs[currPos] !== lane) {
        const sideWay = 1 + solveMem(obs, lane, currPos, dp);
        ans = Math.min(ans, sideWay);
      }
      dp[currLane][currPos] = ans;
    }
    return dp[currLane][currPos];
  }
}

function minSideWays(obs) {
  let row = 4;
  let col = obs.length;
  let dp = new Array(row).fill(-1).map(() => Array(col).fill(-1));
  return solveMem(obs, 2, 0, dp);
}

/**
 * Solution 3 - Bottom up (Tabulation)
 * T- O(3*3*n)
 * S - O(N)
 */

var minSideJumps = function (obs) {
  return solveTab(obs);
};

function solveTab(obs, currLane, currPos) {
  let row = 4;
  let col = obs.length;
  let dp = new Array(row)
    .fill(Number.MAX_VALUE)
    .map(() => Array(col).fill(Number.MAX_VALUE));
  // base case
  let n = obs.length - 1;
  /**
   * you need to move from bottom to top which means
   * (1,n) ------------------>
   * (2,n) ------------------>    (2,0)
   * (3,n) ------------------>
   */

  // base case
  dp[0][n] = 0;
  dp[1][n] = 0;
  dp[2][n] = 0;
  dp[3][n] = 0;

  for (let currPos = n - 1; currPos >= 0; currPos--) {
    for (let currLane = 1; currLane <= 3; currLane++) {
      if (obs[currPos + 1] !== currLane) {
        dp[currLane][currPos] = dp[currLane][currPos + 1];
      } else {
        let ans = Number.MAX_VALUE;
        for (let lane = 1; lane <= 3; lane++) {
          // if curr lane is not equal to lane and there is not obstancle in sideway
          if (currLane !== lane && obs[currPos] !== lane) {
            const sideWay = 1 + dp[lane][currPos + 1];
            ans = Math.min(ans, sideWay);
          }
          dp[currLane][currPos] = ans;
        }
      }
    }
  }
  return Math.min(dp[2][0], Math.min(1 + dp[1][0], 1 + dp[3][0]));
}

/**
 * Solution -4 Space optimization
 *                                  -----> depends --> dp[currLane][currPos + 1](same lane next pos)
 *          dp[currLane][currPos]
 *                                  -----> depends --> dp[i][currPos + 1] (diff lane next pos)
 *
 * we need only to two column (instead of 2d array)
 *  T- O(3*3*n)
 *  S - O(1)
 */

function solveSpaceOpt(obs) {
  const n = obs.length - 1;
  let curr = new Array(4).fill(Number.MAX_VALUE);
  let next = new Array(4).fill(Number.MAX_VALUE);
  // base case
  next[0] = 0;
  next[1] = 0;
  next[2] = 0;
  next[3] = 0;

  for (let currPos = n - 1; currPos >= 0; currPos--) {
    for (let currLane = 1; currLane <= 3; currLane++) {
      if (obs[currPos + 1] !== currLane) {
        curr[currLane] = next[currLane];
      } else {
        let ans = Number.MAX_VALUE;
        for (let lane = 1; lane <= 3; lane++) {
          // if curr lane is not equal to lane and there is not obstancle in sideway
          if (currLane !== lane && obs[currPos] !== lane) {
            const sideWay = 1 + next[lane];
            ans = Math.min(ans, sideWay);
          }
          curr[currLane] = ans;
        }
      }
    }
    next = curr;
  }
  return Math.min(next[2], Math.min(1 + next[1], 1 + next[3]));
}

/**
 * Solution 5 - Another dp solve
 */

let minSideJumps = function (obstacle) {
  let dp = [1, 0, 1];
  barrier = obstacle;
  let n = barrier.length;
  for (let j = 0; j < n; j++) {
    // If there is a barrier, then
    // add very large value
    let val = barrier[j];
    if (val > 0) {
      dp[val - 1] = 1e6;
    }

    for (let i = 0; i < 3; i++) {
      // Add the minimum value to
      // move forward with or
      // without crossing barrier
      if (val != i + 1) {
        dp[i] = Math.min(dp[i], Math.min(dp[(i + 1) % 3], dp[(i + 2) % 3]) + 1);
      }
    }
  }

  // Return the minimum value of
  // dp[0], dp[1] and dp[2]
  return Math.min(dp[0], Math.min(dp[1], dp[2]));
};

/**
 * Solution 6
 */

function minSideJumps(obstacles) {
  const dp = ["not used", 1, 0, 1];

  //
  for (let a of obstacles) {
    // If there's an obstacle in some lane at the point I'm in, set that path to Infinity
    if (a > 0) {
      dp[a] = Infinity;
    }

    //
    for (let i = 1; i <= 3; i++) {
      if (a !== i) {
        dp[i] = Math.min(
          dp[i],
          Math.min(dp[(i % 3) + 1], dp[((i + 1) % 3) + 1]) + 1
        );
      }
    }
  }

  return Math.min(dp[1], Math.min(dp[2], dp[3]));
}

/**
 * Solution 7
 */

var minSideJumps = function (obstacles) {
  const dp = [1, 0, 1];
  for (const obs of obstacles) {
    if (obs) {
      dp[obs - 1] = Infinity;
    }
    for (let i = 0; i < 3; i += 1) {
      if (i + 1 !== obs) {
        dp[i] = Math.min(dp[i], Math.min(dp[(i + 1) % 3], dp[(i + 2) % 3]) + 1);
      }
    }
  }
  return Math.min(...dp);
};
