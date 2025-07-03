/*
90. Subsets II

Given an integer array nums that may contain duplicates, return all possible subsets (the power set).

The solution set must not contain duplicate subsets. Return the solution in any order.



Example 1:

Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]
Example 2:

Input: nums = [0]
Output: [[],[0]]


Constraints:

1 <= nums.length <= 10
-10 <= nums[i] <= 10
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
  const res = []
  const subset = []

  nums.sort()

  function dfs(i) {
    if (i === nums.length) {
      res.push([...subset])
      return
    }

    // include nums[i]
    subset.push(nums[i])
    dfs(i + 1)
    subset.pop()

    // not include nums[i]
    while (i + 1 < nums.length && nums[i] === nums[i + 1]) {
      i++
    }
    dfs(i + 1)
  }

  dfs(0)

  return res
};
