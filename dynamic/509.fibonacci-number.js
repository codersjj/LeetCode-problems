/*
509. Fibonacci Number

The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1. That is,

F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.
Given n, calculate F(n).



Example 1:

Input: n = 2
Output: 1
Explanation: F(2) = F(1) + F(0) = 1 + 0 = 1.
Example 2:

Input: n = 3
Output: 2
Explanation: F(3) = F(2) + F(1) = 1 + 1 = 2.
Example 3:

Input: n = 4
Output: 3
Explanation: F(4) = F(3) + F(2) = 2 + 1 = 3.


Constraints:

0 <= n <= 30
*/

/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
  if (n <= 1) return n
  return fib(n - 1) + fib(n - 2)
};

// or:

/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
  const helper = (n, memo) => {
    if (n in memo) return memo[n]
    if (n <= 1) return n

    memo[n] = helper(n - 1, memo) + helper(n - 2, memo)

    return memo[n]
  }

  return helper(n, {})
};

// or:

/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
  const dp = Array(n + 1)
  dp[0] = 0
  dp[1] = 1
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
};

// or:

/**
 * @param {number} n
 * @return {number}
 */
var fib = function(n) {
  if (n === 0) return 0
  if (n === 1) return 1

  let prev = 0
  let cur = 1

  for (let i = 2; i <= n; i++) {
    const num = prev + cur
    prev = cur
    cur = num
  }

  return cur
};
