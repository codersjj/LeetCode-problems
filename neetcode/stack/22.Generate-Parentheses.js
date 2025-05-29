/*
22. Generate Parentheses

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.



Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]


Constraints:

1 <= n <= 8
*/

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  const res = []
  const stack = []

  function backtrack(openCount, closeCount) {
    if (openCount === n && closeCount === n) {
      res.push(stack.join(''))
      return
    }

    if (openCount < n) {
      stack.push('(')
      backtrack(openCount + 1, closeCount)
      stack.pop()
    }

    if (openCount > closeCount) {
      stack.push(')')
      backtrack(openCount, closeCount + 1)
      stack.pop()
    }
  }

  backtrack(0, 0)

  return res
};
