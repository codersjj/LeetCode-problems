/*
53. Maximum Subarray

Given an integer array nums, find the subarray with the largest sum, and return its sum.

Subarray
A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:

Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
Example 2:

Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
Example 3:

Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.


Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104


Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  const dp = Array(nums.length)
  dp[0] = nums[0]
  let max = nums[0]

  for (let i = 1; i < nums.length; i++) {
    // dp[i] = nums[i] + (dp[i-1] > 0 ? dp[i-1] : 0)
    dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
    max = Math.max(max, dp[i])
  }

  return max
};

// or:

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let max = nums[0]
  let curMax = nums[0]

  for (let i = 1; i < nums.length; i++) {
    curMax = Math.max(curMax + nums[i], nums[i])
    max = Math.max(max, curMax)
  }

  return max
};

// or:

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
  let max = nums[0]
  let curSum = 0

  for (const n of nums) {
    if (curSum < 0) {
      curSum = 0
    }

    curSum += n
    max = Math.max(max, curSum)
  }

  return max
};
