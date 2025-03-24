/*
115. Distinct Subsequences

Given two strings s and t, return the number of distinct subsequences of s which equals t.

The test cases are generated so that the answer fits on a 32-bit signed integer.



Example 1:

Input: s = "rabbbit", t = "rabbit"
Output: 3
Explanation:
As shown below, there are 3 ways you can generate "rabbit" from s.
rabbbit
rabbbit
rabbbit
Example 2:

Input: s = "babgbag", t = "bag"
Output: 5
Explanation:
As shown below, there are 5 ways you can generate "bag" from s.
babgbag
babgbag
babgbag
babgbag
babgbag


Constraints:

1 <= s.length, t.length <= 1000
s and t consist of English letters.
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function(s, t) {
  /*
    s = 'abb'
    t = 'ab'

          s  ''   a   b   b
          i   0   1   2   3
    t  j

    '' 0      1   1   1   1

    a  1      0  0+1  1   1

    b  2      0   0  0+1 1+1
  */

  const dp = Array.from({ length: s.length + 1 }, () => Array(t.length + 1).fill(0))

  for (let i = 0; i <= s.length; i++) {
    dp[i][0] = 1
  }

  for (let i = 1; i <= s.length; i++) {
    for (let j = 1; j <= t.length; j++) {
      dp[i][j] += dp[i - 1][j]
      if (s[i - 1] === t[j - 1]) {
        dp[i][j] += dp[i - 1][j - 1]
      }
    }
  }

  return dp[s.length][t.length]
};

/*
代码解析

  ​动态规划定义

    dp[i][j] 表示 s 的前 i 个字符的子序列中匹配 t 的前 j 个字符的方式数。

  ​状态转移

    当 s[i-1] == t[j-1] 时，有两种选择：
      匹配当前字符：累加 dp[i-1][j-1]
      不匹配当前字符：累加 dp[i-1][j]
    当字符不匹配时，只能继承不匹配的情况：dp[i][j] = dp[i-1][j]

  ​初始化

    dp[i][0] = 1：空字符串 t 只有一种匹配方式。
    dp[0][j] = 0（j > 0）：空 s 无法匹配非空 t。
*/
