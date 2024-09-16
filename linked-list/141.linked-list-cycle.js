/*
Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

Example 1:


Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
Example 2:


Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
Example 3:


Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.


Constraints:

The number of the nodes in the list is in the range [0, 104].
-105 <= Node.val <= 105
pos is -1 or a valid index in the linked-list.


Follow up: Can you solve it using O(1) (i.e. constant) memory?
*/

/**
 * Definition for singly-linked list.
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}

// /**
//  * @param {ListNode} head
//  * @return {boolean}
//  */
// var hasCycle = function(head) {
//   if (!head) return false
//   const nodeArr = [head]
//   // 遍历链表
//   let currNode = head
//   while (currNode.next) {
//     if (nodeArr.includes(currNode.next)) {
//       return true
//     }
//     nodeArr.push(currNode.next)
//     currNode = currNode.next
//   }

//   return false
// }


// const linkedList = new ListNode(1)
// linkedList.next = new ListNode(2)
// linkedList.next.next = linkedList

// /**
//  * @param {ListNode} head
//  * @return {boolean}
//  */
// var hasCycle = function(head) {
//   const visitedNodes = new Set()
//   let currentNode = head
//   while (currentNode) {
//     if (visitedNodes.has(currentNode)) {
//       return true
//     }
//     visitedNodes.add(currentNode)
//     currentNode = currentNode.next
//   }
//   return false
// }

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
  let slow = head
  let fast = head
  while (fast && fast.next) {
    // slow pointer moves one step at a time
    slow = slow.next
    // fast pointer moves two steps at a time
    fast = fast.next.next
    // the fast and slow pointers meet, indicating a cycle
    if (slow === fast) {
      return true
    }
  }
  // the fast pointer reaches the end of the linked list, indicating that there is no cycle
  return false
}

// hasCycle(linkedList)