/*
76. Minimum Window Substring

Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".

The testcases will be generated such that the answer is unique.



Example 1:

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"
Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
Example 2:

Input: s = "a", t = "a"
Output: "a"
Explanation: The entire string s is the minimum window.
Example 3:

Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.


Constraints:

m == s.length
n == t.length
1 <= m, n <= 105
s and t consist of uppercase and lowercase English letters.


Follow up: Could you find an algorithm that runs in O(m + n) time?
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
  if (s.length < t.length) return ''

  const tCharToCount = new Map()
  const window = new Map()
  for (const c of t) {
    tCharToCount.set(c, (tCharToCount.get(c) ?? 0) + 1)
  }

  let need = tCharToCount.size
  let have = 0
  let res = [-1, -1]
  let resLen = Infinity

  let l = 0
  for (let r = 0; r < s.length; r++) {
    const c = s[r]
    window.set(c, (window.get(c) ?? 0) + 1)

    if (tCharToCount.has(c) && tCharToCount.get(c) === window.get(c)) {
      have++
    }

    while (have === need) {
      // update result
      if (r - l + 1 < resLen) {
        res = [l, r]
        resLen = r - l + 1
      }

      // pop from the left of window
      const leftChar = s[l]
      window.set(leftChar, window.get(leftChar) - 1)
      if (tCharToCount.has(leftChar) && window.get(leftChar) < tCharToCount.get(leftChar)) {
        have--
      }
      l++
    }
  }

  return resLen === Infinity ? '' : s.slice(res[0], res[1] + 1)
};

// or:

/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function(s, t) {
  if (s.length < t.length) return ''

  const tCharToCount = {}
  const window = {}
  for (const c of t) {
    tCharToCount[c] = (tCharToCount[c] ?? 0) + 1
  }

  let need = Object.keys(tCharToCount).length
  let have = 0
  let res = [-1, -1]
  let resLen = Infinity

  let l = 0
  for (let r = 0; r < s.length; r++) {
    const c = s[r]
    window[c] = (window[c] ?? 0) + 1

    if (tCharToCount[c] && tCharToCount[c] === window[c]) {
      have++
    }

    while (have === need) {
      // update result
      if (r - l + 1 < resLen) {
        res = [l, r]
        resLen = r - l + 1
      }

      // pop from the left of window
      const leftChar = s[l]
      window[leftChar]--
      if (tCharToCount[leftChar] && window[leftChar] < tCharToCount[leftChar]) {
        have--
      }
      l++
    }
  }

  return resLen === Infinity ? '' : s.slice(res[0], res[1] + 1)
};
