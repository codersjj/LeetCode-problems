/*
18. 4Sum

Given an array nums of n integers, return an array of all the unique quadruplets [nums[a], nums[b], nums[c], nums[d]] such that:

0 <= a, b, c, d < n
a, b, c, and d are distinct.
nums[a] + nums[b] + nums[c] + nums[d] == target
You may return the answer in any order.



Example 1:

Input: nums = [1,0,-1,0,-2,2], target = 0
Output: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
Example 2:

Input: nums = [2,2,2,2,2], target = 8
Output: [[2,2,2,2]]


Constraints:

1 <= nums.length <= 200
-109 <= nums[i] <= 109
-109 <= target <= 109
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[][]}
 */
var fourSum = function(nums, target) {
  nums.sort((a, b) => a - b)
  const res = []
  const quad = []

  function kSum(k, start, target) {
    if (k !== 2) {
      for (let i = start; i < nums.length - k + 1; i++) {
        if (i > start && nums[i - 1] === nums[i]) {
          continue
        }
        quad.push(nums[i])
        kSum(k - 1, i + 1, target - nums[i])
        quad.pop()
      }
      return
    }

    // base case, two sum II
    let left = start
    let right = nums.length - 1
    while (left < right) {
      const twoSum = nums[left] + nums[right]
      if (twoSum < target) {
        left++
      } else if (twoSum > target) {
        right--
      } else {
        res.push([...quad, nums[left], nums[right]])
        left++
        while (left < right && nums[left - 1] === nums[left]) {
          left++
        }
      }
    }
  }

  kSum(4, 0, target)

  return res
};
