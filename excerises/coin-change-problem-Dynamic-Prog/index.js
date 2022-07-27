// You are given coins of different denominations and a total amount of money.
//Write a function to compute the number of combinations that make up that amount.
// Example amout = 12 coins = [1,2,5]  o/P = 13

/**
 * Dynamic programming - Tabulation method
 */
function change(amount, coins) {
  let dp = new Array(amount + 1).fill(Number.MAX_VALUE);
  dp[0] = 0;

  for (let coin of coins) {
    for (let i = 0; i < dp.length; i++) {
      if (i >= coin) {
        let idx = i - coin;
        let potentialAmt = 1 + dp[idx];
        dp[i] = Math.min(dp[i], potentialAmt);
      }
    }
  }
  return dp[dp.length] === Number.MAX_VALUE ? -1 : dp[dp.length];
}

// Through recursion  O/P = 3
let coins = [1, 2];
let amount = 4;
function changeRecursion(amount, currentCoin) {
  if (amount === 0) return 1;
  if (amount < 0) return 0;

  let combos = 0;
  for (let i = currentCoin; i < coins.length; i++) {
    combos += changeRecursion(amount - coins[i], i);
  } // current coin
  return combos;
}
