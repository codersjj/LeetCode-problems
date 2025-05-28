/*
92. Reverse Linked List II

Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.



Example 1:


Input: head = [1,2,3,4,5], left = 2, right = 4
Output: [1,4,3,2,5]
Example 2:

Input: head = [5], left = 1, right = 1
Output: [5]


Constraints:

The number of nodes in the list is n.
1 <= n <= 500
-500 <= Node.val <= 500
1 <= left <= right <= n


Follow up: Could you do it in one pass?
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
// /**
//  * @param {ListNode} head
//  * @param {number} left
//  * @param {number} right
//  * @return {ListNode}
//  */
// var reverseBetween = function(head, left, right) {
//   // find the left node
//   let curr = head
//   let pos = 1
//   let prevLeftNode = null
//   while (curr) {
//     if (pos === left) break
//     prevLeftNode = curr
//     curr = curr.next
//     pos++
//   }

//   const leftNode = curr

//   // reverse
//   let prev = null
//   while (curr) {
//     if (pos > right) break

//     const next = curr.next
//     curr.next = prev

//     prev = curr
//     curr = next
//     pos++
//   }

//   if (prevLeftNode) {
//     prevLeftNode.next = prev
//   }
//   if (curr) {
//     leftNode.next = curr
//   }

//   if (left === 1) return prev
//   return head
// };

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
  // 0. Create a dummy node to handle edge case when left is 1
  const dummy = new ListNode(0, head)

  // 1. reach node at position "left"
  let leftPrev = dummy
  let cur = head
  for (let i = 0; i < left - 1; i++) {
    leftPrev = cur
    cur = cur.next
  }

  // now cur = "left", leftPrev = "node before left"
  // 2. reverse from left to right
  let prev = null
  for (let i = 0; i < right - left + 1; i++) {
    const temp = cur.next
    cur.next = prev
    prev = cur
    cur = temp
  }

  // 3. update pointers(Connect the reversed part back to the original list)
  leftPrev.next.next = cur // now curr is node after "right"
  leftPrev.next = prev // now prev is "right"

  // 4. return the new head of the modified list
  return dummy.next
};

// or:

/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function(head, left, right) {
  const dummy = new ListNode()
  dummy.next = head
  let cur = dummy

  let leftPrev = null
  for (let i = 0; i < left; i++) {
    leftPrev = cur
    cur = cur.next
  }

  let prev = null
  for (let i = 0; i < right - left + 1; i++) {
    const next = cur.next
    cur.next = prev
    prev = cur
    cur = next
  }

  leftPrev.next.next = cur
  leftPrev.next = prev

  return dummy.next
};
