/*
40. Combination Sum II

Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.



Example 1:

Input: candidates = [10,1,2,7,6,1,5], target = 8
Output:
[
[1,1,6],
[1,2,5],
[1,7],
[2,6]
]
Example 2:

Input: candidates = [2,5,2,1,2], target = 5
Output:
[
[1,2,2],
[5]
]


Constraints:

1 <= candidates.length <= 100
1 <= candidates[i] <= 50
1 <= target <= 30
*/

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function(candidates, target) {
  const res = []
  const comb = []

  candidates.sort()

  function dfs(i, sum) {
    if (sum === target) {
      res.push([...comb])
      return
    }
    if (i === candidates.length || sum > target) {
      return
    }

    // include candidates[i]
    comb.push(candidates[i])
    dfs(i + 1, sum + candidates[i])
    comb.pop()

    // skip candidates[i]
    while (i < candidates.length && candidates[i] === candidates[i + 1]) {
      i++
    }
    dfs(i + 1, sum)
  }

  dfs(0, 0)

  return res
};
