/*
99. Recover Binary Search Tree

You are given the root of a binary search tree (BST), where the values of exactly two nodes of the tree were swapped by mistake. Recover the tree without changing its structure.



Example 1:


Input: root = [1,3,null,null,2]
Output: [3,1,null,null,2]
Explanation: 3 cannot be a left child of 1 because 3 > 1. Swapping 1 and 3 makes the BST valid.
Example 2:


Input: root = [3,1,4,null,null,2]
Output: [2,1,4,null,null,3]
Explanation: 2 cannot be in the right subtree of 3 because 2 < 3. Swapping 2 and 3 makes the BST valid.


Constraints:

The number of nodes in the tree is in the range [2, 1000].
-231 <= Node.val <= 231 - 1


Follow up: A solution using O(n) space is pretty straight-forward. Could you devise a constant O(1) space solution?
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function(root) {
  // 1     2     3     4     5
  // 1     3     2     4     5
  //     first second

  // 1     2     3     4     5
  // 1     4     3     2     5
  //     first       second

  let first = null
  let second = null
  const arr = []

  function inorder(node) {
    if (!node) return
    inorder(node.left)
    arr.push(node)
    inorder(node.right)
  }

  inorder(root)

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].val > arr[i + 1].val) {
      if (!first) first = arr[i]
      second = arr[i + 1]
    }
  }

  [first.val, second.val] = [second.val, first.val]
};

// or:

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function(root) {
  // 1     2     3     4     5
  // 1     3     2     4     5
  //     first second

  // 1     2     3     4     5
  // 1     4     3     2     5
  //     first       second

  let first = null
  let second = null
  let prev = null

  function inorder(node) {
    if (!node) return
    inorder(node.left)

    if (prev && prev.val > node.val) {
      if (!first) first = prev
      second = node
    }
    prev = node

    inorder(node.right)
  }

  inorder(root)

  ;[first.val, second.val] = [second.val, first.val]
};

// or:

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function(root) {
  // 1     2     3     4     5
  // 1     3     2     4     5
  //     first second

  // 1     2     3     4     5
  // 1     4     3     2     5
  //     first       second

  let first = null
  let second = null
  let prev = null
  const stack = []
  let cur = root

  while (cur || stack.length) {
    while (cur) {
      stack.push(cur)
      cur = cur.left
    }

    cur = stack.pop()
    if (prev && prev.val > cur.val) {
      if (!first) first = prev
      second = cur
    }
    prev = cur

    cur = cur.right
  }

  [first.val, second.val] = [second.val, first.val]
};

// or:

/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function(root) {
  // 1     2     3     4     5
  // 1     3     2     4     5
  //     first second

  // 1     2     3     4     5
  // 1     4     3     2     5
  //     first       second

  let first = null
  let second = null
  let prev = null
  const stack = []
  let cur = root

  while (cur || stack.length) {
    if (cur) {
      stack.push(cur)
      cur = cur.left
    } else {
      cur = stack.pop()
      if (prev && prev.val > cur.val) {
        if (!first) first = prev
        second = cur
      }
      prev = cur

      cur = cur.right
    }
  }

  [first.val, second.val] = [second.val, first.val]
};
