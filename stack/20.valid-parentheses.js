/*
20. Valid Parentheses

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.
Every close bracket has a corresponding open bracket of the same type.


Example 1:

Input: s = "()"

Output: true

Example 2:

Input: s = "()[]{}"

Output: true

Example 3:

Input: s = "(]"

Output: false

Example 4:

Input: s = "([])"

Output: true



Constraints:

1 <= s.length <= 104
s consists of parentheses only '()[]{}'.
*/

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  const stack = []
  const closeToOpen = {
    ')': '(',
    '}': '{',
    ']': '['
  }

  for (const c of s) {
    if (c in closeToOpen) {
      if (stack.at(-1) === closeToOpen[c]) {
        stack.pop()
      } else {
        return false
      }
    } else {
      stack.push(c)
    }
  }

  return stack.length === 0
};
