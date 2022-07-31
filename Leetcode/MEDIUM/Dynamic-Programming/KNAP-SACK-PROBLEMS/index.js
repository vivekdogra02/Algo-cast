/**
 * Given the weights and profits of ‘N’ items, we are asked to put these items
 *  in a knapsack that has a capacity ‘C’. The goal is to get the maximum profit 
 * from the items in the knapsack. Each item can only be selected once,
 *  as we don’t have multiple quantities of any item.

Let’s take Merry’s example, who wants to carry some fruits in the knapsack to get maximum profit.
 Here are the weights and profits of the fruits:

Items: { Apple, Orange, Banana, Melon }
Weights: { 2, 3, 1, 4 }
Profits: { 4, 5, 3, 7 }
Knapsack capacity: 5

Let’s try to put different combinations of fruits in the knapsack,
 such that their total weight is not more than 5:

Apple + Orange (total weight 5) => 9 profit
Apple + Banana (total weight 3) => 7 profit
Orange + Banana (total weight 4) => 8 profit
Banana + Melon (total weight 5) => 10 profit

This shows that Banana + Melon is the best combination, 
as it gives us the maximum profit and the total weight does not exceed the capacity.

 */

/**
 * Solution 1 - Recursion
 * T - O(2n) = expo
 * S - O(N)
 */

let solveKnapsack = function (profits, weights, capacity) {
  let n = weights.length;
  return solve(profits, weights, n - 1, capacity);
};

function solve(profits, weights, index, capacity) {
  // base case
  if (index === 0) {
    if (weights[0] <= capacity) {
      return profits[0];
    } else {
      return 0;
    }
  }

  let incl = 0;

  if (weights[index] <= capacity) {
    incl =
      profits[index] +
      solve(profits, weights, index - 1, capacity - weights[index]);
  }
  let exc = solve(profits, weights, index - 1, capacity);

  let ans = Math.max(incl, exc);
  return ans;
}

var profits = [1, 6, 10, 16];
var weights = [1, 2, 3, 5];
console.log(
  `Total knapsack profit: ---> ${solveKnapsack(profits, weights, 7)}`
);
console.log(
  `Total knapsack profit: ---> ${solveKnapsack(profits, weights, 6)}`
);
/**
 * Output
4.97s
Total knapsack profit: ---> 22
Total knapsack profit: ---> 17
 */

/**
 * Solution 2 - Recursion + memo (top down approach)
 * why to take 2d array ?
 * Ans - we are changing two state value
 * 1. index
 * 2. capacity
 * So that is why we need to take 2D array
 */

function solveKnapsack(profits, weights, capacity) {
  let n = weights.length;
  const dp = Array(n)
    .fill(-1)
    .map(() => Array(capacity + 1).fill(-1));
  return solveMem(profits, weights, n - 1, capacity, dp);
}

function solveMem(profits, weights, index, capacity, dp) {
  // base case
  if (index === 0) {
    if (weights[0] <= capacity) {
      return profits[0];
    } else {
      return 0;
    }
  }

  if (dp[index][capacity] !== -1) return dp[index][capacity];

  let incl = 0;

  if (weights[index] <= capacity) {
    incl =
      profits[index] +
      solveMem(profits, weights, index - 1, capacity - weights[index], dp);
  }
  let exc = solveMem(profits, weights, index - 1, capacity, dp);

  dp[index][capacity] = Math.max(incl, exc);
  return dp[index][capacity];
}
/**
 * Solution - 3  (Bottom up approach) - Tabulation
 * T - O(N)
 * S - O(N)
 */

function solveKnapSackTab(profits, weights, capacity) {
  let n = weights.length;

  // step1
  const dp = Array(n)
    .fill(-1)
    .map(() => Array(capacity + 1).fill(-1));

  // step 2
  // analyse  base case

  for (let w = weights[0]; w <= capacity; w++) {
    if (weights[0] <= capacity) {
      dp[0][w] = profits[0];
    } else {
      dp[0][w] = 0;
    }
  }

  for (let i = 1; i < n; i++) {
    for (let w = 0; w <= capacity; w++) {
      let incl = 0;

      if (weights[i] <= w) {
        incl = profits[i] + dp[i - 1][w - weights[i]];
      }
      let exc = dp[i - 1][w];

      dp[i][w] = Math.max(incl, exc);
    }
  }
  return dp[n - 1][capacity];
}

/**
 * Solution 4 - space optimization
 */

function solveKnapSackTab(profits, weights, capacity) {
  let n = weights.length;
  // step1
  let prev = new Array(capacity + 1).fill(0);
  let curr = new Array(capacity + 1).fill(0);

  // step 2
  // analyse  base case

  for (let w = weights[0]; w <= capacity; w++) {
    if (weights[0] <= capacity) {
      prev[w] = profits[0];
    } else {
      prev[w] = 0;
    }
  }

  for (let i = 1; i < n; i++) {
    for (let w = 0; w <= capacity; w++) {
      let incl = 0;

      if (weights[i] <= w) {
        incl = profits[i] + prev[w - weights[i]];
      }
      let exc = prev[w];

      curr[w] = Math.max(incl, exc);
    }
    prev = curr;
  }
  return prev[capacity];
}

/**
 * Solution 5 - can we improve more?
 * can we solve it with a 1D array ?  There is a little catch in this
 * if you traverse Left to right -- it wont be possible as the prev value is updated and if any of the other
 * item is dependent on that value -- u will get the updated ans and it will pollute the ans
 * So if you traverse Right to Left - It will become possible as we have started from very end and there is no
 * case for prev value updation so, it wont pollute your answer and it will work
 *
 */

function solveKnapSackTab(profits, weights, capacity) {
  let n = weights.length;
  // step1
  let curr = new Array(capacity + 1).fill(0);

  // step 2
  // analyse  base case

  for (let w = weights[0]; w <= capacity; w++) {
    if (weights[0] <= capacity) {
      curr[w] = profits[0];
    } else {
      curr[w] = 0;
    }
  }

  for (let i = 1; i < n; i++) {
    for (let w = capacity; w >= 0; w--) {
      let incl = 0;

      if (weights[i] <= w) {
        incl = profits[i] + curr[w - weights[i]];
      }
      let exc = curr[w];

      curr[w] = Math.max(incl, exc);
    }
  }
  return curr[capacity];
}
