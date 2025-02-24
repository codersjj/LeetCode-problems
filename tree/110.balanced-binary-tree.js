/*
110. Balanced Binary Tree

Given a binary tree, determine if it is height-balanced.



Example 1:


Input: root = [3,9,20,null,null,15,7]
Output: true
Example 2:


Input: root = [1,2,2,3,3,null,null,4,4]
Output: false
Example 3:

Input: root = []
Output: true


Constraints:

The number of nodes in the tree is in the range [0, 5000].
-104 <= Node.val <= 104
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
 * @return {boolean}
 */
var isBalanced = function(root) {
  function dfs(root) {
    if (!root) return [true, 0]

    const left = dfs(root.left)
    const right = dfs(root.right)

    const balanced = left[0] && right[0] && (Math.abs(left[1] - right[1]) <= 1)
    const height = 1 + Math.max(left[1], right[1])

    return [balanced, height]
  }

  return dfs(root)[0]
};
