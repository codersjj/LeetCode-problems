/*
234. Palindrome Linked List

Given the head of a singly linked list, return true if it is a palindrome or false otherwise.



Example 1:


Input: head = [1,2,2,1]
Output: true
Example 2:


Input: head = [1,2]
Output: false


Constraints:

The number of nodes in the list is in the range [1, 105].
0 <= Node.val <= 9


Follow up: Could you do it in O(n) time and O(1) space?
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
  // 1. find the middle of the list
  let slow = head
  let fast = head
  while (fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }

  // 2. reverse the second half
  let prev = null
  while (slow) {
    let temp = slow.next
    slow.next = prev

    prev = slow
    slow = temp
  }

  // 3. compare both halves
  let left = head
  let right = prev
  while (right) {
    if (left.val !== right.val) {
      return false
    }
    left = left.next
    right = right.next
  }
  return true
};