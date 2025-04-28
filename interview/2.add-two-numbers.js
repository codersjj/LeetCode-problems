/*
2. Add Two Numbers

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.



Example 1:


Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.
Example 2:

Input: l1 = [0], l2 = [0]
Output: [0]
Example 3:

Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]


Constraints:

The number of nodes in each linked list is in the range [1, 100].
0 <= Node.val <= 9
It is guaranteed that the list represents a number that does not have leading zeros.
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  const dummy = new ListNode()
  let cur = dummy
  let isNextAddOne = false
  while (l1 && l2) {
    let sum = l1.val + l2.val
    if (isNextAddOne) {
      sum += 1
    }
    if (sum >= 10) {
      cur.next = new ListNode(sum % 10)
      isNextAddOne = true
    } else {
      cur.next = new ListNode(sum)
      isNextAddOne = false
    }

    l1 = l1.next
    l2 = l2.next
    cur = cur.next
  }

  while (l1) {
    let sum = l1.val
    if (isNextAddOne) {
      sum++
    }
    if (sum >= 10) {
      cur.next = new ListNode(sum % 10)
      isNextAddOne = true
    } else {
      cur.next = new ListNode(sum)
      isNextAddOne = false
    }
    l1 = l1.next
    cur = cur.next
  }

  while (l2) {
    let sum = l2.val
    if (isNextAddOne) {
      sum++
    }
    if (sum >= 10) {
      cur.next = new ListNode(sum % 10)
      isNextAddOne = true
    } else {
      cur.next = new ListNode(sum)
      isNextAddOne = false
    }
    l2 = l2.next
    cur = cur.next
  }

  if (isNextAddOne) {
    cur.next = new ListNode(1)
  }

  return dummy.next
};

// or:

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  const dummy = new ListNode()
  let cur = dummy
  let carry = 0

  while (l1 || l2) {
    const v1 = l1 ? l1.val : 0
    const v2 = l2 ? l2.val : 0

    let sum = v1 + v2 + carry
    if (sum >= 10) {
      cur.next = new ListNode(sum % 10)
      carry = 1
    } else {
      cur.next = new ListNode(sum)
      carry = 0
    }

    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
    cur = cur.next
  }

  if (carry) {
    cur.next = new ListNode(1)
  }

  return dummy.next
};

// or:

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  const dummy = new ListNode()
  let cur = dummy
  let carry = 0

  while (l1 || l2) {
    const v1 = l1 ? l1.val : 0
    const v2 = l2 ? l2.val : 0

    let sum = v1 + v2 + carry
    carry = sum >= 10 ? 1 : 0
    sum = sum % 10
    cur.next = new ListNode(sum)

    // update ptrs
    cur = cur.next
    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
  }

  if (carry) {
    cur.next = new ListNode(1)
  }

  return dummy.next
};

// or:

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  const dummy = new ListNode()
  let cur = dummy
  let carry = 0

  while (l1 || l2 || carry) {
    const v1 = l1 ? l1.val : 0
    const v2 = l2 ? l2.val : 0

    let sum = v1 + v2 + carry
    carry = sum >= 10 ? 1 : 0
    sum = sum % 10
    cur.next = new ListNode(sum)

    // update ptrs
    cur = cur.next
    if (l1) l1 = l1.next
    if (l2) l2 = l2.next
  }

  return dummy.next
};
