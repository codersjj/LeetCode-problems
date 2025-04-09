/*
70. Climbing Stairs

You are climbing a staircase. It takes n steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?



Example 1:

Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
Example 2:

Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step


Constraints:

1 <= n <= 45
*/

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  const dp = Array(n + 1)
  dp[0] = 1
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
var climbStairs = function(n) {
  if (n <= 1) return 1

  let prev = 1
  let cur = 1
  for (let i = 2; i <= n; i++) {
    const temp = prev + cur
    prev = cur
    cur = temp
  }

  return cur
};

// or:

/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
  const dp = Array(n + 1)
  dp[1] = 1
  dp[2] = 2

  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }

  return dp[n]
};
