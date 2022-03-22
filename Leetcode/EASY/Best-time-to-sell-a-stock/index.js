/**
 * 121. Best Time to Buy and Sell Stock
You are given an array prices where prices[i] is the price of a given stock on the ith day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.


Example 1:

Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell.
Example 2:

Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.

Constraints:

1 <= prices.length <= 105
0 <= prices[i] <= 104
 * 
 */


// Solution 1

function maxProfit(prices) {
    let maxProfit = 0;
    let minPrice = prices[0];

    for (let sell = 1; i < prices.length; i++) {
        let sellPrice = prices[sell];
        let profit = sellPrice - minPrice;
        maxProfit = Math.max(maxProfit, profit);

        if (sellPrice < minPrice) {
            minPrice = sellPrice;
        }
    }
    return maxProfit;
}

// Solution 2   // brute force algorithm

function maxProfit(prices) {
    let maxProfit = 0;
    for (let buy = 0; buy < prices.length; buy++) {
        for (let sell = buy + 1; sell < prices.length; sell++) {
            let profit = prices[sell] - prices[buy];
            maxProfit = Math.max(maxProfit, profit);
        }
    }
    return maxProfit;
}

// Solution 3 
var maxProfit = function (prices) {
    if (prices.length <= 1) return 0;
    let min = Infinity;
    let profit = 0;
    for (let i = 0; i < prices.length; i++) {
        min = Math.min(min, prices[i]);
        profit = Math.max(profit, prices[i] - min)
    }
    return profit;
};

// Solution 4 
var maxProfit = function (prices) {
    let min = Number.MAX_VALUE;
    let maxProfit = 0;
    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < min) {
            min = prices[i];
        } else if (prices[i] - min > maxProfit) {
            maxProfit = prices[i] - min;
        }
    }
    return maxProfit;
};

// Solution 5
var maxProfit = function(prices) {
    let profit = 0;
    let lowest = prices[0];
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < lowest) {
            lowest = prices[i];
        } else {
            profit = Math.max(profit, prices[i] - lowest);
        }
    }
    return profit;
};
