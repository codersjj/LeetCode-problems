/*
583. Delete Operation for Two Strings

Given two strings word1 and word2, return the minimum number of steps required to make word1 and word2 the same.

In one step, you can delete exactly one character in either string.



Example 1:

Input: word1 = "sea", word2 = "eat"
Output: 2
Explanation: You need one step to make "sea" to "ea" and another step to make "eat" to "ea".
Example 2:

Input: word1 = "leetcode", word2 = "etco"
Output: 4


Constraints:

1 <= word1.length, word2.length <= 500
word1 and word2 consist of only lowercase English letters.
*/

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function(word1, word2) {
  // based on the longest common subsequence (LCS) problem
  // the minimum number of steps to make two strings the same is the sum of the lengths of both strings minus twice the length of their LCS
  // because the LCS is the part that doesn't need to be deleted
  // so we need to find the length of the LCS first
  // then we can calculate the minimum number of steps

  const dp = Array.from({ length: word1.length + 1 }, () => Array(word2.length + 1).fill(0))
  // or:
  // const dp = Array(word1.length + 1).fill().map(() => Array(word2.length + 1).fill(0))

  for (let i = 1; i <= word1.length; i++) {
    for (let j = 1; j <= word2.length; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  const longestCommonLen = dp[word1.length][word2.length]

  return (word1.length - longestCommonLen) + (word2.length - longestCommonLen)
};
