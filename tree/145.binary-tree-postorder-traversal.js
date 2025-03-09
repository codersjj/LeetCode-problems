/*
145. Binary Tree Postorder Traversal

Given the root of a binary tree, return the postorder traversal of its nodes' values.



Example 1:

Input: root = [1,null,2,3]

Output: [3,2,1]

Explanation:



Example 2:

Input: root = [1,2,3,4,5,null,8,null,null,6,7,9]

Output: [4,6,7,5,2,9,8,3,1]

Explanation:



Example 3:

Input: root = []

Output: []

Example 4:

Input: root = [1]

Output: [1]



Constraints:

The number of the nodes in the tree is in the range [0, 100].
-100 <= Node.val <= 100


Follow up: Recursive solution is trivial, could you do it iteratively?
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
var postorderTraversal = function(root) {
  const res =  []

  function dfs(node) {
    if (!node) return
    dfs(node.left)
    dfs(node.right)
    res.push(node.val)
  }

  dfs(root)

  return res
};

// or:

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  let res = []

  function dfs(node) {
    if (!node) return
    res.unshift(node.val)
    dfs(node.right)
    dfs(node.left)
  }

  dfs(root)

  return res
};

// or:

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  let res = []

  function dfs(node) {
    if (!node) return
    res.push(node.val)
    dfs(node.right)
    dfs(node.left)
  }

  dfs(root)

  return res.reverse()
};

// or:

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  if (!root) return []
  const res = []
  const stack = [root]

  while (stack.length) {
    const node = stack.pop()
    res.unshift(node.val)
    if (node.left) stack.push(node.left)
    if (node.right) stack.push(node.right)
  }

  return res
};

// or:

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  if (!root) return []
  const res = []
  const stack = [root]

  while (stack.length) {
    const node = stack.pop()
    res.push(node.val)
    if (node.left) stack.push(node.left)
    if (node.right) stack.push(node.right)
  }

  return res.reverse()
};

// or:

/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function(root) {
  // if (!root) return []
  const res = []
  const stack = [root]
  const visit = [false]

  while (stack.length) {
    const cur = stack.pop()
    const v = visit.pop()
    if (cur) {
      if (v) {
        res.push(cur.val)
      } else {
        stack.push(cur)
        visit.push(true)
        stack.push(cur.right)
        visit.push(false)
        stack.push(cur.left)
        visit.push(false)
      }
    }
  }

  return res
};
