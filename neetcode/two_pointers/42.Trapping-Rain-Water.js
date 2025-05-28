/*
42. Trapping Rain Water

Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.



Example 1:


Input: height = [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
Explanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.
Example 2:

Input: height = [4,2,0,3,2,5]
Output: 9


Constraints:

n == height.length
1 <= n <= 2 * 104
0 <= height[i] <= 105
*/

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  const maxLeft = Array(height.length).fill(0)
  const maxRight = Array(height.length).fill(0)
  const minSide = Array(height.length)
  const res = Array(height.length)

  let curMaxLeft = 0
  for (let i = 1; i < height.length; i++) {
    curMaxLeft = Math.max(curMaxLeft, height[i - 1])
    maxLeft[i] = curMaxLeft
  }

  let curMaxRight = 0
  for (let i = height.length - 2; i >= 0; i--) {
    curMaxRight = Math.max(curMaxRight, height[i + 1])
    maxRight[i] = curMaxRight
  }

  for (let i = 0; i < height.length; i++) {
    minSide[i] = Math.min(maxLeft[i], maxRight[i])
    res[i] = minSide[i] - height[i] >= 0 ? minSide[i] - height[i] : 0
  }

  return res.reduce((prev, cur) => prev + cur)
};

// or:

/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  let res = 0
  let l = 0
  let r = height.length - 1
  let leftMax = height[l]
  let rightMax = height[r]

  while (l < r) {
    if (leftMax < rightMax) {
      l++
      leftMax = Math.max(leftMax, height[l])
      res += leftMax - height[l]
    } else {
      r--
      rightMax = Math.max(rightMax, height[r])
      res += rightMax - height[r]
    }
  }

  return res
};
