/*
295. Find Median from Data Stream

The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

For example, for arr = [2,3,4], the median is 3.
For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
Implement the MedianFinder class:

MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.


Example 1:

Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]

Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0


Constraints:

-105 <= num <= 105
There will be at least one element in the data structure before calling findMedian.
At most 5 * 104 calls will be made to addNum and findMedian.


Follow up:

If all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
If 99% of all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
*/

var MedianFinder = function() {
  this.arr = []
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  let left = 0
  let right = this.arr.length

  while (left < right) {
    const mid = left + ((right - left) >> 1)
    if (this.arr[mid] < num) {
      left = mid + 1
    } else {
      right = mid
    }
  }

  this.arr.splice(left, 0, num)
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  if (!this.arr.length) return 0

  const len = this.arr.length
  let median = this.arr[0]
  if (len % 2 === 1) {
    medianIndex = (len - 1) / 2
    median = this.arr[medianIndex]
  } else {
    const secondIndex = len / 2
    const firstIndex = secondIndex - 1
    median = (this.arr[firstIndex] + this.arr[secondIndex]) / 2
  }

  return median
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

// or:

var MedianFinder = function() {
  this.small = new Heap((a, b) => b - a) // max heap
  this.large = new Heap((a, b) => a - b) // min heap
};

/**
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
  this.small.add(num)

  // make sure every num in small is <= every num in large
  if (
    this.small.size() && this.large.size() &&
    this.small.peek() > this.large.peek()
  ) {
    const val = this.small.pop()
    this.large.add(val)
  }

  // uneven size?
  if (this.small.size() > this.large.size() + 1) {
    const val = this.small.pop()
    this.large.add(val)
  }

  if (this.large.size() > this.small.size() + 1) {
    const val = this.large.pop()
    this.small.add(val)
  }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
  const smallHeapSize = this.small.size()
  const largeHeapSize = this.large.size()
  if (smallHeapSize === largeHeapSize) {
    return (this.small.peek() + this.large.peek()) / 2
  } else if (smallHeapSize > largeHeapSize) {
    return this.small.peek()
  } else if (smallHeapSize < largeHeapSize) {
    return this.large.peek()
  }
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */

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
    const top = this.heap[0]
    const last = this.heap.pop()
    if (this.size()) {
      this.heap[0] = last
      this.heapifyDown(0)
    }

    return top
  }

  peek() {
    return this.heap[0]
  }

  heapifyUp(index) {
    while (index) {
      const parent = this.parent(index)
      if (!this.isHigherPriority(index, parent)) break
      this.swap(index, parent)
      index = parent
    }
  }

  heapifyDown(index) {
    while (this.hasLeftChild(index)) {
      const leftChild = this.leftChild(index)
      const rightChild = this.rightChild(index)
      let higherPriorityChild = leftChild
      if (this.hasRightChild(index) && this.isHigherPriority(rightChild, leftChild)) {
        higherPriorityChild = rightChild
      }
      if (!this.isHigherPriority(higherPriorityChild, index)) break
      this.swap(index, higherPriorityChild)
      index = higherPriorityChild
    }
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
  }

  isHigherPriority(index1, index2) {
    return this.compareFn(this.heap[index1], this.heap[index2]) < 0
  }

  parent(childIndex) {
    return Math.floor((childIndex - 1) / 2)
  }

  leftChild(parentIndex) {
    return 2 * parentIndex + 1
  }

  rightChild(parentIndex) {
    return 2 * parentIndex + 2
  }

  hasLeftChild(index) {
    return this.leftChild(index) < this.size()
  }

  hasRightChild(index) {
    return this.rightChild(index) < this.size()
  }

  size() {
    return this.heap.length
  }
}
