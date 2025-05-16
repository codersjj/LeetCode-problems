/*
349. Intersection of Two Arrays

Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.


Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]
Example 2:

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]
Explanation: [4,9] is also accepted.


Constraints:

1 <= nums1.length, nums2.length <= 1000
0 <= nums1[i], nums2[i] <= 1000
*/

// /**
//  * @param {number[]} nums1
//  * @param {number[]} nums2
//  * @return {number[]}
//  */
// var intersection = function(nums1, nums2) {
//   const orderedNums1 = [...nums1].sort((x, y) => x - y)
//   const orderedNums2 = [...nums2].sort((x, y) => x - y)
//   const result = []
//   let i = 0
//   let j = 0
//   while (i < orderedNums1.length && j < orderedNums2.length) {
//     if (orderedNums1[i] === orderedNums2[j] && !result.includes(orderedNums1[i])) {
//       result.push(orderedNums1[i])
//       i++
//       j++
//     } else if (orderedNums1[i] < orderedNums2[j]) {
//       i++
//     } else {
//       j++
//     }
//   }
//   return result
// };

// /**
//  * @param {number[]} nums1
//  * @param {number[]} nums2
//  * @return {number[]}
//  */
// var intersection = function(nums1, nums2) {
//   const getIntersection = (set1, set2) => {
//     const result = []
//     s1.forEach(num => {
//       if (s2.has(num)) {
//         result.push(num)
//       }
//     })
//     return result
//   }

//   const s1 = new Set(nums1)
//   const s2 = new Set(nums2)

//   if (s1.size < s2.size) return getIntersection(s1, s2)
//   else return getIntersection(s2, s1)
// };

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  return [...new Set(nums1.filter(num => nums2.includes(num)))]
};

// or:

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  const res = []
  const set1 = new Set(nums1)
  const set2 = new Set(nums2)

  for (const n of set1) {
    if (set2.has(n)) res.push(n)
  }

  return res
};

// or:

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function(nums1, nums2) {
  const seen = new Set(nums1)
  const res = []

  for (const n of nums2) {
    if (seen.has(n)) {
      res.push(n)
      seen.delete(n)
    }
  }

  return res
};