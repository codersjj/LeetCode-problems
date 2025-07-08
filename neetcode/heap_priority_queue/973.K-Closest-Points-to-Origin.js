/*
973. K Closest Points to Origin

Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).



Example 1:


Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].
Example 2:

Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
Explanation: The answer [[-2,4],[3,3]] would also be accepted.


Constraints:

1 <= k <= points.length <= 104
-104 <= xi, yi <= 104
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
    return this.compareFn(this.heap[index1][1], this.heap[index2][1]) < 0
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
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
  const maxHeap = new Heap((a, b) => b - a)

  points.forEach(([x, y]) => maxHeap.push([[x, y], x ** 2 + y ** 2]))

  while (maxHeap.size() > k) {
    maxHeap.pop()
  }

  const res = []

  while (maxHeap.size()) {
    res.push(maxHeap.pop()[0])
  }

  return res
};

// or:

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function(points, k) {
  const maxHeap = new Heap((a, b) => b - a)

  points.forEach(([x, y]) => {
    maxHeap.push([[x, y], x ** 2 + y ** 2])

    if (maxHeap.size() > k) {
      maxHeap.pop()
    }
  })

  const res = []

  while (maxHeap.size()) {
    res.push(maxHeap.pop()[0])
  }

  return res
};
