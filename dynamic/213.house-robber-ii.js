/*
213. House Robber II

You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one. Meanwhile, adjacent houses have a security system connected, and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array nums representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.



Example 1:

Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.
Example 2:

Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.
Example 3:

Input: nums = [1,2,3]
Output: 3


Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 1000
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  // [2, 3, 2] => [2, 3] + [3, 2] => Math.max(198 house robber, 198 house robber)
  if (nums.length < 2) return nums[0]

  function helper(nums) {
    if (nums.length < 2) return nums[0]

    const dp = Array(nums.length)

    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])

    for (let i = 2; i < nums.length; i++) {
      dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
    }

    return dp[dp.length - 1]
  }

  return Math.max(helper(nums.slice(0, -1)), helper(nums.slice(1)))
};

// or:

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  // [2, 3, 2] => [2, 3] + [3, 2] => Math.max(198 house robber, 198 house robber)
  if (nums.length < 2) return nums[0]

  function helper(nums) {
    let rob1 = 0
    let rob2 = 0

    // [rob1, rob2, num1, num2, ...]
    for (const num of nums) {
      const newRob = Math.max(rob1 + num, rob2)
      rob1 = rob2
      rob2 = newRob
    }

    return rob2
  }

  return Math.max(helper(nums.slice(0, -1)), helper(nums.slice(1)))
};

// or:

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function(nums) {
  function helper(nums) {
    let rob1 = 0
    let rob2 = 0

    // [rob1, rob2, num1, num2, ...]
    for (const num of nums) {
      const newRob = Math.max(rob1 + num, rob2)
      rob1 = rob2
      rob2 = newRob
    }

    return rob2
  }

  return Math.max(nums[0], helper(nums.slice(0, -1)), helper(nums.slice(1)))
};
