/*
121. Best Time to Buy and Sell Stock

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
*/

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let res = 0
  let minPrice = prices[0]

  for (let i = 1; i < prices.length; i++) {
    minPrice = Math.min(minPrice, prices[i])
    res = Math.max(res, prices[i] - minPrice)
  }

  return res
};

// or:

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let profit = 0
  let pos = -prices[0]

  for (let i = 1; i < prices.length; i++) {
    pos = Math.max(pos, -prices[i])
    profit = Math.max(profit, pos + prices[i])
  }

  return profit
};

// or:

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let max = 0

  let left = 0 // buy
  let right = 1 // sell

  while (right < prices.length) {
    if (prices[left] < prices[right]) {
      const profit = prices[right] - prices[left]
      max = Math.max(max, profit)
    } else {
      left = right
    }
    right++
  }

  return max
};

// or:

/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  let left = 0
  let max = 0

  for (let right = 1; right < prices.length; right++) {
    if (prices[left] < prices[right]) {
      max = Math.max(max, prices[right] - prices[left])
    } else {
      left = right
    }
  }

  return max
};
