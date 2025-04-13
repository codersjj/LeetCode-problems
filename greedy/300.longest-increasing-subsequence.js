/*
300. Longest Increasing Subsequence

Given an integer array nums, return the length of the longest strictly increasing subsequence.



Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4
Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1


Constraints:

1 <= nums.length <= 2500
-104 <= nums[i] <= 104


Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?
*/

// Approach 1: Dynamic Programming
// Time Complexity: O(n^2)
// Space Complexity: O(n)
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  const dp = new Array(nums.length).fill(1)
  let maxLength = 1

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
    maxLength = Math.max(maxLength, dp[i])
  }

  return maxLength
};

// or:

/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  const dp = Array(nums.length).fill(1)

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }

  return Math.max(...dp)
};

// Approach 2: Greedy + Binary Search
// Time Complexity: O(n log(n))
// Space Complexity: O(n)
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function(nums) {
  // Initialize an empty array to store the longest increasing subsequence
  // dp[i] will be the smallest tail of all increasing subsequences of length i+1
  const dp = []

  for (const num of nums) {
    // Use binary search to find the insertion point for num in dp
    // [left, right)
    let left = 0
    let right = dp.length

    while (left < right) {
      const mid = Math.floor((left + right) / 2)
      if (dp[mid] < num) {
        left = mid + 1
      } else {
        right = mid
      }
    }

    // 自动处理替换/追加
    dp[left] = num
  }

  return dp.length
};
