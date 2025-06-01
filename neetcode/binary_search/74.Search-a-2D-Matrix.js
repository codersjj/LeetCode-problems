/*
74. Search a 2D Matrix

You are given an m x n integer matrix matrix with the following two properties:

Each row is sorted in non-decreasing order.
The first integer of each row is greater than the last integer of the previous row.
Given an integer target, return true if target is in matrix or false otherwise.

You must write a solution in O(log(m * n)) time complexity.



Example 1:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
Example 2:


Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false


Constraints:

m == matrix.length
n == matrix[i].length
1 <= m, n <= 100
-104 <= matrix[i][j], target <= 104
*/

/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
  const m = matrix.length
  const n = matrix[0].length
  let rowTop = 0
  let rowBottom = m - 1
  let targetRow = -1

  while (rowTop <= rowBottom) {
    const mid = rowTop + ((rowBottom - rowTop) >> 1)
    if (target < matrix[mid][0]) {
      rowBottom = mid - 1
    } else if (target > matrix[mid][n - 1]) {
      rowTop = mid + 1
    } else { // matrix[mid][0] <= target && target <= matrix[mid][n - 1]
      targetRow = mid
      break
    }
  }

  if (targetRow === -1) {
    return false
  }

  let left = 0
  let right = n - 1
  const curRow = matrix[targetRow]
  while (left <= right) {
    const mid = left + ((right - left) >> 1)
    if (curRow[mid] < target) {
      left = mid + 1
    } else if (curRow[mid] > target) {
      right = mid - 1
    } else {
      return true
    }
  }

  return false
};
