/*
347. Top K Frequent Elements

Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.



Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Example 2:

Input: nums = [1], k = 1
Output: [1]


Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.


Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var topKFrequent = function(nums, k) {
  const numCountMap = new Map()
  const freq = Array(nums.length + 1)

  for (const num of nums) {
    numCountMap.set(num, (numCountMap.get(num) ?? 0) + 1)
  }
  for (const [num, count] of numCountMap.entries()) {
    if (!freq[count]) freq[count] = []
    freq[count].push(num)
  }

  const res = []
  for (let i = freq.length - 1; i >= 0; i--) {
    if (!freq[i]) continue
    for (const num of freq[i]) {
      res.push(num)
      if (res.length === k) return res
    }
  }
};


