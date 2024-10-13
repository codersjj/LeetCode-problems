/*
Given the head of a linked list and an integer val, remove all the nodes of the linked list that has Node.val == val, and return the new head.


Example 1:


Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]
Example 2:

Input: head = [], val = 1
Output: []
Example 3:

Input: head = [7,7,7,7], val = 7
Output: []


Constraints:

The number of nodes in the list is in the range [0, 104].
1 <= Node.val <= 50
0 <= val <= 50
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
    this.val = (val===undefined ? 0 : val)
    this.next = (next===undefined ? null : next)
}
// /**
//  * @param {ListNode} head
//  * @param {number} val
//  * @return {ListNode}
//  */
// var removeElements = function(head, val) {
//   const dummy = new ListNode(-1, head)
//   // 遍历链表，同时删除符合条件的节点
//   let prev = dummy
//   let curr = dummy.next
//   while (curr) {
//     if (curr.val === val) {
//       prev.next = curr.next
//     } else {
//       prev = curr
//     }
//     curr = curr.next
//   }

//   return dummy.next
// };

/**
 * @param {ListNode} head
 * @param {number} val
 * @return {ListNode}
 */
var removeElements = function(head, val) {
  const dummy = new ListNode()
  dummy.next = head
  let curr = dummy
  while (curr.next) {
    if (curr.next.val === val) {
      curr.next = curr.next.next
    } else {
      curr = curr.next
    }
  }
  return dummy.next
};

const node1 = new ListNode(7)
const node2 = new ListNode(7, node1)
const node3 = new ListNode(7, node2)
const linkedList = new ListNode(7, node3)
const res = removeElements(linkedList, 7)
console.log(res)