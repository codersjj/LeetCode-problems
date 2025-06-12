/*
19. Remove Nth Node From End of List

Given the head of a linked list, remove the nth node from the end of the list and return its head.


Example 1:


Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]
Example 2:

Input: head = [1], n = 1
Output: []
Example 3:

Input: head = [1,2], n = 1
Output: [1]


Constraints:

The number of nodes in the list is sz.
1 <= sz <= 30
0 <= Node.val <= 100
1 <= n <= sz


Follow up: Could you do this in one pass?
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
//  * @param {number} n
//  * @return {ListNode}
//  */
// var removeNthFromEnd = function(head, n) {
//   // 获取链表长度
//   let len = 1
//   let curr = head
//   while (curr.next) {
//     len++
//     curr = curr.next
//   }

//   // 遍历链表，找到指定位置的节点，并移除
//   curr = head
//   const targetPos = len - n
//   if (targetPos === 0) {
//     return head.next
//   }
//   let pos = 0
//   while (pos !== targetPos - 1) {
//     curr = curr.next
//     pos++
//   }
//   curr.next = curr.next.next
//   return head
// };

/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let fast = head
  let slow = head
  for (let i = 0; i < n; i++) {
    fast = fast.next
  }
  if (!fast) {
    return head.next
  }
  while (fast.next) {
    fast = fast.next
    slow = slow.next
  }
  slow.next = slow.next.next
  return head
};

// see: https://leetcode.com/problems/remove-nth-node-from-end-of-list/solutions/1164542/js-python-java-c-easy-two-pointer-solution-w-explanation/

// or:

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  const dummy = new ListNode(0, head)
  let left = dummy
  let right = head

  while (n && right) {
    right = right.next
    n--
  }

  while (right) {
    left = left.next
    right = right.next
  }

  left.next = left.next.next

  return dummy.next
};
