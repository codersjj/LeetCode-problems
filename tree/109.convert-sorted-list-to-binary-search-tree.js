/*
109. Convert Sorted List to Binary Search Tree

Given the head of a singly linked list where elements are sorted in ascending order, convert it to a height-balanced binary search tree.



Example 1:


Input: head = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: One possible answer is [0,-3,9,-10,null,5], which represents the shown height balanced BST.
Example 2:

Input: head = []
Output: []


Constraints:

The number of nodes in head is in the range [0, 2 * 104].
-105 <= Node.val <= 105
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
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
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {
  // linked list -> arr
  const sortedArr = []
  let cur = head
  while (cur) {
    sortedArr.push(cur.val)
    cur = cur.next
  }

  // sortedArrToBST
  function sortedArrToBST(arr) {
    function buildBST(arr, left, right) {
      if (left > right) {
        return null
      }

      const mid = left + ((right - left) >> 1)
      const node = new TreeNode(arr[mid])
      node.left = buildBST(arr, left, mid - 1)
      node.right = buildBST(arr, mid + 1, right)

      return node
    }

    return buildBST(arr, 0, arr.length - 1)
  }

  return sortedArrToBST(sortedArr)
};
