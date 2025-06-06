/*
4. Median of Two Sorted Arrays

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).



Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.


Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  const total = nums1.length + nums2.length
  const half = Math.trunc(total / 2)

  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1]
  }

  let l = 0
  let r = nums1.length - 1
  while (true) {
    let i = l + ((r - l) >> 1) // Last index of nums1's left partition
    let j = half - i - 2 // Last index of nums2's left partition, Formula: j = half - (i+1) - 1 = half - i - 2, where (i+1) is count of elements from nums1 in left half

    const maxLeftNums1 = i >= 0 ? nums1[i] : -Infinity
    const minRightNums1 = i + 1 < nums1.length ? nums1[i + 1] : Infinity
    const maxLeftNums2 = j >= 0 ? nums2[j] : -Infinity
    const minRightNums2 = j + 1 < nums2.length ? nums2[j + 1] : Infinity

    if (maxLeftNums1 <= minRightNums2 && maxLeftNums2 <= minRightNums1) {
      // odd
      if (total % 2) {
        return Math.min(minRightNums1, minRightNums2)
      } else {
        return (Math.max(maxLeftNums1, maxLeftNums2) + Math.min(minRightNums1, minRightNums2)) / 2
      }
    } else if (maxLeftNums1 > minRightNums2) {
      r = i - 1
    } else {
      l = i + 1
    }
  }
};
