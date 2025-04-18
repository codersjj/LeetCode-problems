/*
116. Populating Next Right Pointers in Each Node

You are given a perfect binary tree where all leaves are on the same level, and every parent has two children. The binary tree has the following definition:

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.



Example 1:


Input: root = [1,2,3,4,5,6,7]
Output: [1,#,2,3,#,4,5,6,7,#]
Explanation: Given the above perfect binary tree (Figure A), your function should populate each next pointer to point to its next right node, just like in Figure B. The serialized output is in level order as connected by the next pointers, with '#' signifying the end of each level.
Example 2:

Input: root = []
Output: []


Constraints:

The number of nodes in the tree is in the range [0, 212 - 1].
-1000 <= Node.val <= 1000


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
//     const levelSize = queue.length
//     let prevNode = null
//     for (let i = 0; i < levelSize; i++) {
//       const node = queue.shift()
//       if (prevNode) {
//         prevNode.next = node
//       }
//       prevNode = node

//       if (node.left) queue.push(node.left)
//       if (node.right) queue.push(node.right)
//     }
//   }

//   return root
// };

/**
 * @param {_Node} root
 * @return {_Node}
 */
var connect = function(root) {
  let cur = root
  let nxt = root ? root.left : null

  while (cur && nxt) {
    cur.left.next = cur.right
    if (cur.next) {
      cur.right.next = cur.next.left
    }

    cur = cur.next
    if (!cur) {
      cur = nxt
      nxt = cur.left
    }
  }

  return root
};

// or:

/**
 * @param {_Node} root
 * @return {_Node}
 */
var connect = function(root) {
  if (!root) return null
  let cur = root
  let nxt = root.left

  while (cur && nxt) {
    while (cur) {
      cur.left.next = cur.right
      if (cur.next) {
        cur.right.next = cur.next.left
      }
      cur = cur.next
    }

    cur = nxt
    nxt = nxt.left
  }

  return root
};
