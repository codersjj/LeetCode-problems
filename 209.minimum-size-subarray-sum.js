/*
Given an array of positive integers nums and a positive integer target, return the minimal length of a subarray whose sum is greater than or equal to target. If there is no such subarray, return 0 instead.


Example 1:

Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.

Example 2:

Input: target = 4, nums = [1,4,4]
Output: 1

Example 3:

Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0

Constraints:

1 <= target <= 109
1 <= nums.length <= 105
1 <= nums[i] <= 104

Follow up: If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log(n)).
*/

// /**
//  * @param {number} target
//  * @param {number[]} nums
//  * @return {number}
//  */
// var minSubArrayLen = function(target, nums) {
//   const n = nums.length
//   let minLen = Infinity
//   for (let i = 0; i < n; i++) {
//     let sum = 0
//     for (let j = i; j < n; j++) {
//       sum += nums[j]
//       if (sum >= target) {
//         minLen = Math.min(minLen, j - i + 1)
//         break
//       }
//     }
//   }
//   return minLen === Infinity ? 0 : minLen
// };

/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
  const n = nums.length
  let start = 0
  let sum = 0
  let minLen = Infinity
  for (let end = 0; end < n; end++) {
    sum += nums[end]
    while (sum >= target) {
      minLen = Math.min(minLen, end - start + 1)
      sum -= nums[start]
      start++
    }
  }

  return minLen === Infinity ? 0 : minLen
};
