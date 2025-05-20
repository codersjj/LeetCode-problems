/*
383. Ransom Note

Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.



Example 1:

Input: ransomNote = "a", magazine = "b"
Output: false
Example 2:

Input: ransomNote = "aa", magazine = "ab"
Output: false
Example 3:

Input: ransomNote = "aa", magazine = "aab"
Output: true


Constraints:

1 <= ransomNote.length, magazine.length <= 105
ransomNote and magazine consist of lowercase English letters.
*/

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
  const magazineMap = new Map()
  for (const l of magazine) {
    magazineMap.set(l, (magazineMap.get(l) ?? 0) + 1)
  }

  for (const letter of ransomNote) {
    if (!magazineMap.has(letter)) return false
    const newCount = magazineMap.get(letter) - 1
    magazineMap.set(letter, newCount)
    if (!newCount) magazineMap.delete(letter)
  }

  return true
};

// or:

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
  const count = Array(26).fill(0)
  const base = 'a'.charCodeAt(0)

  for (const l of magazine) {
    count[l.charCodeAt(0) - base]++
  }

  for (const l of ransomNote) {
    count[l.charCodeAt(0) - base]--
  }

  return count.every(c => c >= 0)
};

// or:

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
var canConstruct = function(ransomNote, magazine) {
  const count = Array(26).fill(0)
  const base = 'a'.charCodeAt(0)

  for (const l of magazine) {
    count[l.charCodeAt(0) - base]++
  }

  for (const l of ransomNote) {
    if (--count[l.charCodeAt(0) - base] < 0) return false
  }

  return true
};
