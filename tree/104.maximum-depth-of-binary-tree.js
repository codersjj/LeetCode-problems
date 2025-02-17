/*
104. Maximum Depth of Binary Tree

Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.



Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: 3
Example 2:

Input: root = [1,null,2]
Output: 2


Constraints:

The number of nodes in the tree is in the range [0, 104].
-100 <= Node.val <= 100
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
 * @return {number}
 */
var maxDepth = function(root) {
  if (!root) return 0

  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right))
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  // iterative Breadth First Search
  if (!root) return 0
  let depth = 0
  const queue = [root]

  while (queue.length) {
    depth++
    const levelSize = queue.length
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift()
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
  }

  return depth
};

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
  // iterative DFS
  let depth = 0
  const stack = [[root, 1]]

  while (stack.length) {
    const [node, level] = stack.pop()
    if (node) {
      depth = Math.max(depth, level)
      stack.push([node.left, level + 1])
      stack.push([node.right, level + 1])
    }
  }

  return depth
};
