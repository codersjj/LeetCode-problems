/*
77. Combinations

Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].

You may return the answer in any order.



Example 1:

Input: n = 4, k = 2
Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
Explanation: There are 4 choose 2 = 6 total combinations.
Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.
Example 2:

Input: n = 1, k = 1
Output: [[1]]
Explanation: There is 1 choose 1 = 1 total combination.


Constraints:

1 <= n <= 20
1 <= k <= n
*/

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  const res = []
  let combination = []

  function backtrack(start) {
    if (combination.length === k) {
      res.push([...combination])
      return
    }

    for (let j = start; j < n + 1; j++) {
      combination.push(j)
      backtrack(j + 1)
      combination.pop()
    }
  }

  backtrack(1)

  return res
};

// or:

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
var combine = function(n, k) {
  const res = []
  const comb = []

  function dfs(i) {
    if (comb.length === k) {
      res.push([...comb])
      return
    }

    for (let j = i; j <= n - (k - comb.length) + 1; j++) {
      comb.push(j)
      dfs(j + 1)
      comb.pop()
    }
  }

  dfs(1)

  return res
};
