/*
257. Binary Tree Paths

Given the root of a binary tree, return all root-to-leaf paths in any order.

A leaf is a node with no children.



Example 1:


Input: root = [1,2,3,null,5]
Output: ["1->2->5","1->3"]
Example 2:

Input: root = [1]
Output: ["1"]


Constraints:

The number of nodes in the tree is in the range [1, 100].
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
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  const paths = []
  let path = ''

  function dfs(node) {
    if (!node) return

    let originalLen = path.length
    path += node.val

    if (!node.left && !node.right) {
      paths.push(path)
      path = path.slice(0, originalLen)
      return
    }

    path += '->'
    dfs(node.left)
    dfs(node.right)
    path = path.slice(0, originalLen)
  }

  dfs(root)

  return paths
};

// or:

/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  const paths = []

  function dfs(node, curPath) {
    if (!node) return

    curPath += node.val

    if (!node.left && !node.right) {
      paths.push(curPath)
      return
    }

    dfs(node.left, curPath + '->')
    dfs(node.right, curPath + '->')
  }

  dfs(root, '')

  return paths
};

// or:

/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
  const res = []

  function dfs(node, curPath) {
    if (!node) return null
    if (!node.left && !node.right) {
      res.push(curPath + node.val)
      return
    }
    dfs(node.left, curPath + node.val + '->')
    dfs(node.right, curPath + node.val + '->')
  }

  dfs(root, '')

  return res
};
