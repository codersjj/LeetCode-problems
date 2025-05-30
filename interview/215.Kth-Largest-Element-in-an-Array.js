/*
215. Kth Largest Element in an Array

Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?



Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4


Constraints:

1 <= k <= nums.length <= 105
-104 <= nums[i] <= 104
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  const maxHeap = new Heap((a, b) => b - a, nums)
  let res

  for (let i = 1; i <= k; i++) {
    res = maxHeap.pop()
  }

  return res
};

class Heap {
  constructor(compareFn, arr) {
    this.compareFn = compareFn
    this.heap = []
    this.heapify(arr)
  }

  heapify(arr) {
    arr.forEach(item => this.add(item))
  }

  add(val) {
    this.heap.push(val)
    this.heapifyUp(this.size() - 1)
  }

  pop() {
    const top = this.peek()
    const last = this.heap.pop()
    if (this.size()) {
      this.heap[0] = last
      this.heapifyDown(0)
    }

    return top
  }

  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index)
      const isChildCloser = this.isHigherPriority(index, parentIndex)

      if (!isChildCloser) break

      this.swap(index, parentIndex)
      index = parentIndex
    }
  }

  heapifyDown(index) {
    while (this.hasLeftChild(index)) {
      const leftChildIndex = this.getLeftChildIndex(index)
      const rightChildIndex = this.getRightChildIndex(index)
      let closerChildIndex = leftChildIndex
      const isRightChildCloser = this.isHigherPriority(rightChildIndex, leftChildIndex)
      if (this.hasRightChild(index) && isRightChildCloser) {
        closerChildIndex = rightChildIndex
      }
      const isChildCloser = this.isHigherPriority(closerChildIndex, index)
      if (!isChildCloser) break
      this.swap(index, closerChildIndex)
      index = closerChildIndex
    }
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.size()
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.size()
  }

  isHigherPriority(index1, index2) {
    return this.compareFn(this.heap[index1], this.heap[index2]) < 0
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2
  }

  size() {
    return this.heap.length
  }

  peek() {
    return this.heap[0]
  }
}

// or:

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  const maxHeap = new Heap((a, b) => b - a)
  for (const num of nums) {
    maxHeap.add(num)
  }
  let res = nums[0]
  for (let i = 0; i < k; i++) {
    res = maxHeap.pop()
  }

  return res
};

class Heap {
  constructor(compareFn) {
    this.compareFn = compareFn
    this.heap = []
  }

  size() {
    return this.heap.length
  }

  add(item) {
    this.heap.push(item)
    this.heapifyUp(this.size() - 1)
  }

  peek() {
    return this.heap.at(-1)
  }

  pop() {
    const top = this.heap[0]
    const last = this.heap.pop()
    if (this.size()) {
      this.heap[0] = last
      this.heapifyDown(0)
    }

    return top
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
        this.swap(higherPriorityChildIndex, index)
        index = higherPriorityChildIndex
      } else {
        break
      }
    }
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.size()
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.size()
  }

  getLeftChildIndex(index) {
    return 2 * index + 1
  }

  getRightChildIndex(index) {
    return 2 * index + 2
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2)
  }

  isHigherPriority(idx, idy) {
    return this.compareFn(this.heap[idx], this.heap[idy]) < 0
  }

  swap(idx, idy) {
    [this.heap[idx], this.heap[idy]] = [this.heap[idy], this.heap[idx]]
  }
}

// or:

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  const minHeap = new Heap((a, b) => a - b)

  for (const num of nums) {
    minHeap.add(num)
    if (minHeap.size() > k) {
      minHeap.pop()
    }
  }

  return minHeap.peek()
};

class Heap {
  constructor(compareFn) {
    this.compareFn = compareFn
    this.heap = []
  }

  add(val) {
    this.heap.push(val)
    this.heapifyUp(this.size() - 1)
  }

  pop() {
    const top = this.peek()
    const last = this.heap.pop()
    if (this.size()) {
      this.heap[0] = last
      this.heapifyDown(0)
    }

    return top
  }

  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index)
      const isChildCloser = this.isHigherPriority(index, parentIndex)

      if (!isChildCloser) break

      this.swap(index, parentIndex)
      index = parentIndex
    }
  }

  heapifyDown(index) {
    while (this.hasLeftChild(index)) {
      const leftChildIndex = this.getLeftChildIndex(index)
      const rightChildIndex = this.getRightChildIndex(index)
      let closerChildIndex = leftChildIndex
      const isRightChildCloser = this.isHigherPriority(rightChildIndex, leftChildIndex)
      if (this.hasRightChild(index) && isRightChildCloser) {
        closerChildIndex = rightChildIndex
      }
      const isChildCloser = this.isHigherPriority(closerChildIndex, index)
      if (!isChildCloser) break
      this.swap(index, closerChildIndex)
      index = closerChildIndex
    }
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.size()
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.size()
  }

  isHigherPriority(index1, index2) {
    return this.compareFn(this.heap[index1], this.heap[index2]) < 0
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }

  getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1
  }

  getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2
  }

  size() {
    return this.heap.length
  }

  peek() {
    return this.heap[0]
  }
}