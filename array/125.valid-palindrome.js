/*
A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string s, return true if it is a palindrome, or false otherwise.


Example 1:

Input: s = "A man, a plan, a canal: Panama"
Output: true
Explanation: "amanaplanacanalpanama" is a palindrome.
Example 2:

Input: s = "race a car"
Output: false
Explanation: "raceacar" is not a palindrome.
Example 3:

Input: s = " "
Output: true
Explanation: s is an empty string "" after removing non-alphanumeric characters.
Since an empty string reads the same forward and backward, it is a palindrome.


Constraints:

1 <= s.length <= 2 * 105
s consists only of printable ASCII characters.
*/

// /**
//  * @param {string} s
//  * @return {boolean}
//  */
// var isPalindrome = function(s) {
//   const stack = []
//   const tokens = s.split('')
//   tokens.forEach(token => {
//     if (/[a-zA-Z0-9]/.test(token)) {
//       stack.push(token.toLowerCase())
//     }
//   })
//   forwardStr = stack.join('')
//   backwardStr = stack.reverse().join('')
//   return forwardStr === backwardStr
// };

// /**
//  * @param {string} s
//  * @return {boolean}
//  */
// var isPalindrome = function(s) {
//   const str = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
//   const backwardStr = str.split('').reverse().join('')
//   return str === backwardStr
// };

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  const str = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
  let left = 0
  let right = str.length - 1
  while (left < right) {
    if (str[left] !== str[right]) return false
    left++
    right--
  }
  return true
};

/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
  function isAlphanumeric(c) {
    const charCode = c.charCodeAt(0)
    return (
      (charCode >= 48 && charCode <= 57) ||
      (charCode >= 65 && charCode <= 90) ||
      (charCode >= 97 && charCode <= 122)
    )
  }

  let left = 0
  let right = s.length - 1
  while (left < right) {
    while (left < right && !isAlphanumeric(s[left])) {
      left++
    }
    while (left < right && !isAlphanumeric(s[right])) {
      right--
    }

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false
    }
    left++
    right--
  }

  return true
};