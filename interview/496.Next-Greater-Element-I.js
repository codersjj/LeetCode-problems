/*
496. Next Greater Element I

The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.

You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.

For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1.

Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.



Example 1:

Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
- 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
- 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
Example 2:

Input: nums1 = [2,4], nums2 = [1,2,3,4]
Output: [3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 2 is underlined in nums2 = [1,2,3,4]. The next greater element is 3.
- 4 is underlined in nums2 = [1,2,3,4]. There is no next greater element, so the answer is -1.


Constraints:

1 <= nums1.length <= nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 104
All integers in nums1 and nums2 are unique.
All the integers of nums1 also appear in nums2.


Follow up: Could you find an O(nums1.length + nums2.length) solution?
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
  const res= []

  for (const num1 of nums1) {
    const indexInNums2 = nums2.findIndex(item => item === num1)
    let isExist = false
    for (let i = indexInNums2 + 1; i < nums2.length; i++) {
      if (nums2[i] > num1) {
        res.push(nums2[i])
        isExist = true
        break
      }
    }
    if (!isExist) res.push(-1)
  }

  return res
};

// or:

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
  const stack = []
  const map = new Map()
  const res = []

  for (let i = nums2.length - 1; i >= 0; i--) {
    const curNum = nums2[i]

    if (!stack.length) {
      stack.push(curNum)
      map.set(curNum, -1)
      continue
    }

    if (curNum < stack.at(-1)) {
      map.set(curNum, stack.at(-1))
      stack.push(curNum)
      continue
    }

    while (stack.length && curNum > stack.at(-1)) {
      stack.pop()
    }

    if (stack.length) {
      map.set(curNum, stack.at(-1))
    } else {
      map.set(curNum, -1)
    }
    stack.push(curNum)
  }

  nums1.forEach(num => {
    res.push(map.get(num))
  })

  return res
};

// or:

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
  const stack = []
  const map = new Map()

  for (let i = nums2.length - 1; i >= 0; i--) {
    const curNum = nums2[i]

    if (!stack.length) {
      stack.push(curNum)
      map.set(curNum, -1)
      continue
    }

    if (curNum < stack.at(-1)) {
      map.set(curNum, stack.at(-1))
      stack.push(curNum)
      continue
    }

    while (stack.length && curNum > stack.at(-1)) {
      stack.pop()
    }

    if (stack.length) {
      map.set(curNum, stack.at(-1))
    } else {
      map.set(curNum, -1)
    }
    stack.push(curNum)
  }

  return nums1.map(num => map.get(num))
};

// or:
// stack + map solution
// Time complexity: O(n + m), where n is the length of nums1 and m is the length of nums2

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var nextGreaterElement = function(nums1, nums2) {
  const stack = []
  const map = new Map() // Map<num2, nextGreaterElement>

  for (const num of nums2) {
    while (stack.length && num > stack.at(-1)) {
      // the next greater element for the last element in the stack is current num
      map.set(stack.pop(), num)
    }
    stack.push(num)
  }

  // set all remaining elements in the stack to -1
  // because they don't have a next greater element
  stack.forEach(num => map.set(num, -1))

  return nums1.map(num => map.get(num))
};
