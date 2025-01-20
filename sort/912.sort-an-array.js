/*
912. Sort an Array

Given an array of integers nums, sort the array in ascending order and return it.

You must solve the problem without using any built-in functions in O(nlog(n)) time complexity and with the smallest space complexity possible.



Example 1:

Input: nums = [5,2,3,1]
Output: [1,2,3,5]
Explanation: After sorting the array, the positions of some numbers are not changed (for example, 2 and 3), while the positions of other numbers are changed (for example, 1 and 5).
Example 2:

Input: nums = [5,1,1,2,0,0]
Output: [0,0,1,1,2,5]
Explanation: Note that the values of nums are not necessairly unique.


Constraints:

1 <= nums.length <= 5 * 104
-5 * 104 <= nums[i] <= 5 * 104
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortArray = function(nums) {
  function mergeSort(arr, l, r) {
    if (l === r) {
      return arr
    }

    const m = Math.floor((l + r) / 2)
    mergeSort(arr, l, m)
    mergeSort(arr, m + 1, r)
    merge(arr, l, m, r)

    return arr
  }

  function merge(arr, l, m, r) {
    const leftArr = arr.slice(l, m + 1)
    const rightArr = arr.slice(m + 1, r + 1)

    let i = l
    let j = 0
    let k = 0

    while (j < leftArr.length && k < rightArr.length) {
      if (leftArr[j] <= rightArr[k]) {
        arr[i] = leftArr[j]
        j++
      } else {
        arr[i] = rightArr[k]
        k++
      }
      i++
    }

    while (j < leftArr.length) {
      arr[i] = leftArr[j]
      j++
      i++
    }

    while (k < rightArr.length) {
      arr[i] = rightArr[k]
      k++
      i++
    }
  }

  return mergeSort(nums, 0, nums.length - 1)
};
