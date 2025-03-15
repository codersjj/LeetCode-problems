/*
515. Find Largest Value in Each Tree Row

Given the root of a binary tree, return an array of the largest value in each row of the tree (0-indexed).



Example 1:


Input: root = [1,3,2,5,3,null,9]
Output: [1,3,9]
Example 2:

Input: root = [1,2,3]
Output: [1,3]


Constraints:

The number of nodes in the tree will be in the range [0, 104].
-231 <= Node.val <= 231 - 1
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
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function(root) {
  if (!root) return []
  const res = []
  const queue = [root]

  while (queue.length) {
    let levelSize = queue.length
    let curLevelLargestVal = -Infinity
    while (levelSize--) {
      const node = queue.shift()
      if (node.val > curLevelLargestVal) {
        curLevelLargestVal = node.val
      }
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    res.push(curLevelLargestVal)
  }

  return res
};

// or:

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var largestValues = function(root) {
  if (!root) return []
  const res = []
  const queue = [root]

  while (queue.length) {
    let levelSize = queue.length
    let rowMax = queue[0].val
    while (levelSize--) {
      const node = queue.shift()
      rowMax = Math.max(rowMax, node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    res.push(rowMax)
  }

  return res
};
