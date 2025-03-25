/*
404. Sum of Left Leaves

Given the root of a binary tree, return the sum of all left leaves.

A leaf is a node with no children. A left leaf is a leaf that is the left child of another node.



Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: 24
Explanation: There are two left leaves in the binary tree, with values 9 and 15 respectively.
Example 2:

Input: root = [1]
Output: 0


Constraints:

The number of nodes in the tree is in the range [1, 1000].
-1000 <= Node.val <= 1000
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
var sumOfLeftLeaves = function(root) {
  if (!root) return 0

  let sum = 0
  const stack = [root]
  const isLefts = [false]

  while (stack.length) {
    const node = stack.pop()
    const isLeft = isLefts.pop()

    if (isLeft) {
      if (!node.left && !node.right) sum += node.val
    }

    if (node.right) {
      stack.push(node.right)
      isLefts.push(false)
    }
    if (node.left) {
      stack.push(node.left)
      isLefts.push(true)
    }
  }

  return sum
};

// or:

/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
  if (!root) return 0

  let sum = 0
  const stack = [root]

  while (stack.length) {
    const node = stack.pop()

    if (node.left) {
      if (!node.left.left && !node.left.right) {
        sum += node.left.val
      } else {
        stack.push(node.left)
      }
    }

    if (node.right) {
      stack.push(node.right)
    }
  }

  return sum
};

// or:

/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
  if (!root) return 0
  const stack = [root]
  let sum = 0

  while (stack.length) {
    const node = stack.pop()
    if (node.left && !node.left.left && !node.left.right) {
      sum += node.left.val
    }
    node.left && stack.push(node.left)
    node.right && stack.push(node.right)
  }

  return sum
};

// or:

/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
  if (!root) return 0

  let sum = 0

  function dfs(node) {
    if (!node) return

    if (node.left && !node.left.left && !node.left.right) {
      sum += node.left.val
    }

    dfs(node.left)
    dfs(node.right)
  }

  dfs(root)

  return sum
};

// or:

/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
  if (!root) return 0

  let sum = 0

  function dfs(node, isLeft) {
    if (!node) return
    if (isLeft && !node.left && !node.right) {
      sum += node.val
      return
    }

    dfs(node.left, true)
    dfs(node.right, false)
  }

  dfs(root, false)

  return sum
};

// or:

/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumOfLeftLeaves = function(root) {
  if (!root) return 0
  let leftLeafVal = 0
  if (root.left && !root.left.left && !root.left.right) {
    leftLeafVal = root.left.val
  }
  return leftLeafVal + sumOfLeftLeaves(root.left) + sumOfLeftLeaves(root.right)
};
