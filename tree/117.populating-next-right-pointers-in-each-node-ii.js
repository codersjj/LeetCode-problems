/*
117. Populating Next Right Pointers in Each Node II

Given a binary tree

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.



Example 1:


Input: root = [1,2,3,4,5,null,7]
Output: [1,#,2,3,#,4,5,7,#]
Explanation: Given the above binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.
Example 2:

Input: root = []
Output: []


Constraints:

The number of nodes in the tree is in the range [0, 6000].
-100 <= Node.val <= 100


Follow-up:

You may only use constant extra space.
The recursive approach is fine. You may assume implicit stack space does not count as extra space for this problem.
*/

/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

// /**
//  * @param {_Node} root
//  * @return {_Node}
//  */
// var connect = function(root) {
//   if (!root) return null

//   const queue = [root]

//   while (queue.length) {
//     let levelSize = queue.length
//     let dummy = new _Node()
//     while (levelSize) {
//       const node = queue.shift()
//       dummy.next = node
//       dummy = dummy.next

//       if (node.left) queue.push(node.left)
//       if (node.right) queue.push(node.right)

//       levelSize--
//     }
//   }

//   return root
// };

// or:

/**
 * @param {_Node} root
 * @return {_Node}
 */
var connect = function(root) {
  if (!root) return null
  const queue = [root]

  while (queue.length) {
    let levelSize = queue.length
    let prev = null

    while (levelSize--) {
      const node = queue.shift()
      if (prev) prev.next = node
      prev = node

      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
  }

  return root
};

/**
 * @param {_Node} root
 * @return {_Node}
 */
var connect = function(root) {
  let leftmost = root

  while (leftmost) {
    let cur = leftmost
    leftmost = null
    let prev = null

    while (cur) {
      if (cur.left) {
        if (!leftmost) leftmost = cur.left
        if (prev) prev.next = cur.left
        prev = cur.left
      }

      if (cur.right) {
        if (!leftmost) leftmost = cur.right
        if (prev) prev.next = cur.right
        prev = cur.right
      }

      cur = cur.next
    }
  }

  return root
};
