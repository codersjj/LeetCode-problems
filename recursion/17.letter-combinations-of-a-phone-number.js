/*
17. Letter Combinations of a Phone Number

Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.

A mapping of digits to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.




Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Example 2:

Input: digits = ""
Output: []
Example 3:

Input: digits = "2"
Output: ["a","b","c"]


Constraints:

0 <= digits.length <= 4
digits[i] is a digit in the range ['2', '9'].

*/

// /**
//  * @param {string} digits
//  * @return {string[]}
//  */
// var letterCombinations = function(digits) {
//   if (!digits) return []

//   const letterArr = ['abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']

//   const res = []
//   let combination = ''

//   function backtrack(i) {
//       const digit = digits[i]
//       if (i >= digits.length) {
//           res.push(combination.slice())
//           return
//       }
//       const letters = letterArr[digit - 2]
//       const len = letters.length
//       for (let j = 0; j < len; j++) {
//           combination += letters[j]
//           backtrack(i + 1)
//           combination = combination.slice(0, -1)
//       }
//   }

//   backtrack(0)

//   return res
// };

/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  let res = []
  const digitToChar = {
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
  }

  function backtrack(i, curStr) {
    if (curStr.length === digits.length) {
      res.push(curStr)
      return
    }

    const chars = digitToChar[digits[i]]
    // for (let j = 0; j < chars.length; j++) {
    //   backtrack(i + 1, curStr + chars[j])
    // }
    for (let c of chars) {
      backtrack(i + 1, curStr + c)
    }
  }

  if (digits) {
    backtrack(0, '')
  }

  return res
};
