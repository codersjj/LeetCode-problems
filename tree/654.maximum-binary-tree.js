/*
654. Maximum Binary Tree

You are given an integer array nums with no duplicates. A maximum binary tree can be built recursively from nums using the following algorithm:

Create a root node whose value is the maximum value in nums.
Recursively build the left subtree on the subarray prefix to the left of the maximum value.
Recursively build the right subtree on the subarray suffix to the right of the maximum value.
Return the maximum binary tree built from nums.



Example 1:


Input: nums = [3,2,1,6,0,5]
Output: [6,3,5,null,2,0,null,null,1]
Explanation: The recursive calls are as follow:
- The largest value in [3,2,1,6,0,5] is 6. Left prefix is [3,2,1] and right suffix is [0,5].
    - The largest value in [3,2,1] is 3. Left prefix is [] and right suffix is [2,1].
        - Empty array, so no child.
        - The largest value in [2,1] is 2. Left prefix is [] and right suffix is [1].
            - Empty array, so no child.
            - Only one element, so child is a node with value 1.
    - The largest value in [0,5] is 5. Left prefix is [0] and right suffix is [].
        - Only one element, so child is a node with value 0.
        - Empty array, so no child.
Example 2:


Input: nums = [3,2,1]
Output: [3,null,2,null,1]


Constraints:

1 <= nums.length <= 1000
0 <= nums[i] <= 1000
All integers in nums are unique.
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function(nums) {
  if (!nums.length) return null
  if (nums.length === 1) return new TreeNode(nums[0])

  let max = nums[0]
  let maxPos = 0
  nums.forEach((num, index) => {
    if (num > max) {
      max = num
      maxPos = index
    }
  })

  const root = new TreeNode(max)

  root.left = constructMaximumBinaryTree(nums.slice(0, maxPos))
  root.right = constructMaximumBinaryTree(nums.slice(maxPos + 1))

  return root
};

// or:

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function(nums) {
  if (!nums.length) return null

  let max = Math.max(...nums)
  let maxPos = nums.indexOf(max)

  const root = new TreeNode(max)

  root.left = constructMaximumBinaryTree(nums.slice(0, maxPos))
  root.right = constructMaximumBinaryTree(nums.slice(maxPos + 1))

  return root
};

// or:

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function(nums) {
  if (!nums.length) return null

  function dfs(arr, start, end) {
    if (start > end) return null

    let max = arr[start]
    let maxPos = start
    for (let i = start; i <= end; i++) {
      if (arr[i] > max) {
        max = arr[i]
        maxPos = i
      }
    }

    const node = new TreeNode(max)
    node.left = dfs(arr, start, maxPos - 1)
    node.right = dfs(arr, maxPos + 1, end)

    return node
  }

  return dfs(nums, 0, nums.length - 1)
};

// or:
// stack solution
// Time complexity: O(n)

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var constructMaximumBinaryTree = function(nums) {
  if (!nums.length) return null
  const stack = []

  for (let i = 0; i < nums.length; i++) {
    const curNode = new TreeNode(nums[i])

    while (stack.length && stack.at(-1).val < nums[i]) {
      curNode.left = stack.pop()
    }

    if (stack.length) {
      stack.at(-1).right = curNode
    }

    stack.push(curNode)
  }

  let res = null
  while (stack.length) {
    res = stack.pop()
  }

  return res
};
