/*
47. Permutations II

Given a collection of numbers, nums, that might contain duplicates, return all possible unique permutations in any order.



Example 1:

Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]
Example 2:

Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]


Constraints:

1 <= nums.length <= 8
-10 <= nums[i] <= 10
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function(nums) {
  const res = []
  const perm = []

  const numCountMap = new Map()
  nums.forEach(num => {
    numCountMap.set(num, (numCountMap.get(num) ?? 0) + 1)
  })
  // const numCountMap = {}
  // nums.forEach(num => {
  //   numCountMap[num] = (numCountMap[num] ?? 0) + 1
  // })

  function dfs() {
    if (perm.length === nums.length) {
      res.push([...perm])
      return
    }

    for (const [num, count] of numCountMap) {
      if (count) {
        perm.push(num)
        numCountMap.set(num, count - 1)

        dfs()

        numCountMap.set(num, count) // 重新设置回原来的值
        perm.pop()
      }
    }

    // for (const num in numCountMap) {
    //   if (numCountMap[num]) {
    //     perm.push(+num)
    //     numCountMap[num] -= 1

    //     dfs()

    //     numCountMap[num] += 1
    //     perm.pop()
    //   }
    // }
  }

  dfs()

  return res
};

const nums = [1,1,2]
const res = permuteUnique(nums)
console.log(res)
