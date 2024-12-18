/*
131. Palindrome Partitioning

Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.


Example 1:

Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
Example 2:

Input: s = "a"
Output: [["a"]]


Constraints:

1 <= s.length <= 16
s contains only lowercase English letters.
*/

/**
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {
  let res = []
  let part = []

  const dfs = i => {
    const len = s.length
    if (i >= len) {
      res.push([...part])
      return
    }
    for (let j = i; j < len; j++) {
      if (isPalindrome(s, i, j)) {
        part.push(s.slice(i, j + 1))
        dfs(j + 1)
        part.pop()
      }
    }
  }

  function isPalindrome(s, left, right) {
    while (left < right) {
      if (s[left] !== s[right]) {
        return false
      }
      left++
      right--
    }
    return true
  }

  dfs(0)

  return res
};


// const isPalindrome = s => {
//   const len = s.length
//   const reversedLetters = new Array(len)
//   for (let i = 0; i < len; i++) {
//     reversedLetters[len - i - 1] = s[i]
//   }
//   let reversedS = ''
//   for (let j = 0; j < len; j++) {
//     reversedS += reversedLetters[j]
//   }

//   return s === reversedS
// }

// console.log(isPalindrome('aab'))
// console.log(isPalindrome('a'))

// function isPalindrome(s, left, right) {
//   while (left < right) {
//     if (s[left] !== s[right]) {
//       return false
//     }
//     left++
//     right--
//   }
//   return true
// }

// console.log(isPalindrome('aab', 0, 2))
// console.log(isPalindrome('a', 0, 0))