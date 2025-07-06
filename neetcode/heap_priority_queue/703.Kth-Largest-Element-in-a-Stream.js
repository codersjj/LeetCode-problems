/*
703. Kth Largest Element in a Stream

You are part of a university admissions office and need to keep track of the kth highest test score from applicants in real-time. This helps to determine cut-off marks for interviews and admissions dynamically as new applicants submit their scores.

You are tasked to implement a class which, for a given integer k, maintains a stream of test scores and continuously returns the kth highest test score after a new score has been submitted. More specifically, we are looking for the kth highest score in the sorted list of all scores.

Implement the KthLargest class:

KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of test scores nums.
int add(int val) Adds a new test score val to the stream and returns the element representing the kth largest element in the pool of test scores so far.


Example 1:

Input:
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]

Output: [null, 4, 5, 5, 8, 8]

Explanation:

KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3); // return 4
kthLargest.add(5); // return 5
kthLargest.add(10); // return 5
kthLargest.add(9); // return 8
kthLargest.add(4); // return 8

Example 2:

Input:
["KthLargest", "add", "add", "add", "add"]
[[4, [7, 7, 7, 7, 8, 3]], [2], [10], [9], [9]]

Output: [null, 7, 7, 7, 8]

Explanation:

KthLargest kthLargest = new KthLargest(4, [7, 7, 7, 7, 8, 3]);
kthLargest.add(2); // return 7
kthLargest.add(10); // return 7
kthLargest.add(9); // return 7
kthLargest.add(9); // return 8


Constraints:

0 <= nums.length <= 104
1 <= k <= nums.length + 1
-104 <= nums[i] <= 104
-104 <= val <= 104
At most 104 calls will be made to add.
*/

class Heap {
  constructor(compareFn) {
    this.compareFn = compareFn
    this.heap = []
  }

  push(val) {
    this.heap.push(val)
    this.heapifyUp(this.heap.length - 1)
  }

  pop() {
    const top = this.heap[0]
    const last = this.heap.pop()
    if (this.heap.length) {
      this.heap[0] = last
      this.heapifyDown(0)
    }

    return top
  }

  peek() {
    return this.heap[0]
  }

  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index)
      if (this.isHigherPriority(index, parentIndex)) {
        this.swap(index, parentIndex)
        index = parentIndex
      } else {
        break
      }
    }
  }

  heapifyDown(index) {
    while (this.hasLeftChild(index)) {
      const leftChildIndex = this.getLeftChildIndex(index)
      const rightChildIndex = this.getRightChildIndex(index)
      let higherPriorityChildIndex = leftChildIndex
      if (this.hasRightChild(index) && this.isHigherPriority(rightChildIndex, leftChildIndex)) {
        higherPriorityChildIndex = rightChildIndex
      }
      if (this.isHigherPriority(higherPriorityChildIndex, index)) {
        this.swap(index, higherPriorityChildIndex)
        index = higherPriorityChildIndex
      } else {
        break
      }
    }
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2)
  }

  getLeftChildIndex(index) {
    return 2 * index + 1
  }

  getRightChildIndex(index) {
    return 2 * index + 2
  }

  isHigherPriority(index1, index2) {
    return this.compareFn(this.heap[index1], this.heap[index2]) < 0
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
  }

  size() {
    return this.heap.length
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.size()
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.size()
  }
}

/**
 * @param {number} k
 * @param {number[]} nums
 */
var KthLargest = function(k, nums) {
  this.k = k
  this.minHeap = new Heap((a, b) => a - b)

  nums.forEach(num => this.minHeap.push(num))

  while (this.minHeap.size() > k) {
    this.minHeap.pop()
  }
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function(val) {
  this.minHeap.push(val)

  if (this.minHeap.size() > this.k) {
    this.minHeap.pop()
  }

  return this.minHeap.peek()
};

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
