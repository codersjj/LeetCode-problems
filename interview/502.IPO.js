/*
502. IPO

Suppose LeetCode will start its IPO soon. In order to sell a good price of its shares to Venture Capital, LeetCode would like to work on some projects to increase its capital before the IPO. Since it has limited resources, it can only finish at most k distinct projects before the IPO. Help LeetCode design the best way to maximize its total capital after finishing at most k distinct projects.

You are given n projects where the ith project has a pure profit profits[i] and a minimum capital of capital[i] is needed to start it.

Initially, you have w capital. When you finish a project, you will obtain its pure profit and the profit will be added to your total capital.

Pick a list of at most k distinct projects from given projects to maximize your final capital, and return the final maximized capital.

The answer is guaranteed to fit in a 32-bit signed integer.



Example 1:

Input: k = 2, w = 0, profits = [1,2,3], capital = [0,1,1]
Output: 4
Explanation: Since your initial capital is 0, you can only start the project indexed 0.
After finishing it you will obtain profit 1 and your capital becomes 1.
With capital 1, you can either start the project indexed 1 or the project indexed 2.
Since you can choose at most 2 projects, you need to finish the project indexed 2 to get the maximum capital.
Therefore, output the final maximized capital, which is 0 + 1 + 3 = 4.
Example 2:

Input: k = 3, w = 0, profits = [1,2,3], capital = [0,1,2]
Output: 6


Constraints:

1 <= k <= 105
0 <= w <= 109
n == profits.length
n == capital.length
1 <= n <= 105
0 <= profits[i] <= 104
0 <= capital[i] <= 109
*/

/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
var findMaximizedCapital = function(k, w, profits, capital) {
  const minHeap = new Heap((a, b) => a[0] - b[0]) // Array<Array<capital, profit>>
  const maxHeap = new Heap((a, b) => b - a) // Array<profit>

  for (let i = 0; i < capital.length; i++) {
    minHeap.add([capital[i], profits[i]])
  }

  let currentCapital = w
  for (let i = 0; i < k; i++) {
    while (minHeap.size() && minHeap.peek()[0] <= currentCapital) {
      const [c, p] = minHeap.pop()
      maxHeap.add(p)
    }

    if (!maxHeap.size()) {
      break
    }

    currentCapital += maxHeap.pop()
  }

  return currentCapital
};

class Heap {
  constructor(compareFn) {
    this.heap = []
    this.compareFn = compareFn
  }

  add(item) {
    this.heap.push(item)
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

  peek() {
    return this.heap[0]
  }

  size() {
    return this.heap.length
  }

  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index)
      if (this.isHighPriority(index, parentIndex)) {
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

      if (this.hasRightChild(index) && this.isHighPriority(rightChildIndex, leftChildIndex)) {
        higherPriorityChildIndex = rightChildIndex
      }

      if (this.isHighPriority(higherPriorityChildIndex, index)) {
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
    return index * 2 + 1
  }

  getRightChildIndex(index) {
    return index * 2 + 2
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2)
  }

  isHighPriority(index1, index2) {
    return this.compareFn(this.heap[index1], this.heap[index2]) < 0
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
  }
}

// or:

/**
 * @param {number} k
 * @param {number} w
 * @param {number[]} profits
 * @param {number[]} capital
 * @return {number}
 */
var findMaximizedCapital = function(k, w, profits, capital) {
  const arr = capital
    .map((item, i) => [item, profits[i]])
    .sort((a, b) => a[0] - b[0])
  const maxHeap = new Heap((a, b) => b - a) // Array<profit>

  let currentCapital = w
  let cur = 0
  for (let i = 0; i < k; i++) {
    while (cur < arr.length && arr[cur][0] <= currentCapital) {
      maxHeap.add(arr[cur][1])
      cur++
    }

    if (!maxHeap.size()) {
      break
    }

    currentCapital += maxHeap.pop()
  }

  return currentCapital
};
