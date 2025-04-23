/*
148. Sort List

Given the head of a linked list, return the list after sorting it in ascending order.



Example 1:


Input: head = [4,2,1,3]
Output: [1,2,3,4]
Example 2:


Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
Example 3:

Input: head = []
Output: []


Constraints:

The number of nodes in the list is in the range [0, 5 * 104].
-105 <= Node.val <= 105


Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?
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
 * @return {ListNode}
 */
var sortList = function(head) {
  if (!head) return null

  const arr = []

  let cur = head
  while (cur) {
    arr.push(cur.val)
    cur = cur.next
  }

  arr.sort((a, b) => a - b)

  const dummy = new ListNode()
  cur = dummy
  for (const val of arr) {
    cur.next = new ListNode(val)
    cur = cur.next
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
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
  if (!head) return null

  const arr = []

  let cur = head
  while (cur) {
    const next = cur.next
    cur.next = null
    arr.push(cur)
    cur = next
  }

  arr.sort((a, b) => a.val - b.val)

  for (let i = 0; i < arr.length - 1; i++) {
    arr[i].next = arr[i + 1]
  }

  return arr[0]
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
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
  if (!head) return null

  const arr = []

  let cur = head
  while (cur) {
    arr.push(cur)
    cur = cur.next
  }

  arr.sort((a, b) => a.val - b.val)

  for (let i = 0; i < arr.length - 1; i++) {
    arr[i].next = arr[i + 1]
  }

  arr[arr.length - 1].next = null

  return arr[0]
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
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function(head) {
  if (!head || !head.next) return head

  const middle = getMiddle(head)

  let left = head
  let right = middle.next
  middle.next = null

  left = sortList(left)
  right = sortList(right)

  return merge(left, right)
};

const getMiddle = (head) => {
  let slow = head
  let fast = head.next

  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }

  return slow
}

const merge = (left, right) => {
  const dummy = new ListNode()
  let cur = dummy

  while (left && right) {
    if (left.val < right.val) {
      cur.next = left
      left = left.next
    } else {
      cur.next = right
      right = right.next
    }

    cur = cur.next
  }

  if (left) {
    cur.next = left
  } else {
    cur.next = right
  }

  return dummy.next
}

