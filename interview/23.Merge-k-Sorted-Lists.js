/*
23. Merge k Sorted Lists

You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.



Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6
Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
Output: []


Constraints:

k == lists.length
0 <= k <= 104
0 <= lists[i].length <= 500
-104 <= lists[i][j] <= 104
lists[i] is sorted in ascending order.
The sum of lists[i].length will not exceed 104.
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  if (!lists || !lists.length) return null

  while (lists.length > 1) {
    const mergedList = []

    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i]
      const l2 = lists[i + 1] ?? null
      mergedList.push(mergeList(l1, l2))
    }

    lists = mergedList
  }

  return lists[0]
};

function mergeList(l1, l2) {
  const dummy = new ListNode()
  let curr = dummy

  while (l1 && l2) {
    if (l1.val < l2.val) {
      curr.next = l1
      l1 = l1.next
    } else {
      curr.next = l2
      l2 = l2.next
    }
    curr = curr.next
  }

  if (l1) curr.next = l1
  if (l2) curr.next = l2

  return dummy.next
}
