/*
242. Valid Anagram

Given two strings s and t, return true if t is an anagram of s, and false otherwise.



Example 1:

Input: s = "anagram", t = "nagaram"

Output: true

Example 2:

Input: s = "rat", t = "car"

Output: false



Constraints:

1 <= s.length, t.length <= 5 * 104
s and t consist of lowercase English letters.


Follow up: What if the inputs contain Unicode characters? How would you adapt your solution to such a case?
*/

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  const map = new Map()

  for (const l of s) {
    if (!map.has(l)) {
      map.set(l, 0)
    }
    map.set(l, map.get(l) + 1)
  }

  for (const l of t) {
    if (!map.has(l)) return false
    map.set(l, map.get(l) - 1)
    if (map.get(l) === 0) map.delete(l)
  }

  return map.size === 0
};

// or:

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false

  const freq = Array(26).fill(0)

  for (let i = 0; i < s.length; i++) {
    freq[s.charCodeAt(i) - 'a'.charCodeAt(0)] += 1
    freq[t.charCodeAt(i) - 'a'.charCodeAt(0)] -= 1
  }

  return freq.every(c => c === 0)
};

// or:

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false

  const charCount = {}

  for (const char of s) {
    charCount[char] = (charCount[char] ?? 0) + 1
  }

  for (const char of t) {
    if (!charCount[char]) return false
    charCount[char]--
  }

  return Object.values(charCount).every(c => c === 0)
};

// or:

/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false

  const map = new Map()

  for (const l of s) {
    if (!map.has(l)) {
      map.set(l, 0)
    }
    map.set(l, map.get(l) + 1)
  }

  for (const l of t) {
    if (!map.has(l)) return false
    map.set(l, map.get(l) - 1)
    if (map.get(l) === 0) map.delete(l)
  }

  return map.size === 0
};
