/*
49. Group Anagrams

Given an array of strings strs, group the anagrams together. You can return the answer in any order.



Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]

Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Explanation:

There is no string in strs that can be rearranged to form "bat".
The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.
Example 2:

Input: strs = [""]

Output: [[""]]

Example 3:

Input: strs = ["a"]

Output: [["a"]]



Constraints:

1 <= strs.length <= 104
0 <= strs[i].length <= 100
strs[i] consists of lowercase English letters.
*/

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  if (strs.length === 1) return [[...strs]]

  const isAnagram = (str1, str2) => {
    if (str1.length !== str2.length) return false

    const freq = Array(26).fill(0)
    const base = 'a'.charCodeAt(0)

    for (let i = 0; i < str1.length; i++) {
      freq[str1.charCodeAt(i) - base]++
      freq[str2.charCodeAt(i) - base]--
    }

    return freq.every(c => c === 0)
  }

  const res = [[strs[0]]]

  for (let i = 1; i < strs.length; i++) {
    const cur = strs[i]
    const index = res.findIndex(group => isAnagram(group[0], cur))
    if (index === -1) {
      res.push([cur])
    } else {
      res[index].push(cur)
    }
  }

  return res
};

// or:

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const map = {}

  for (const str of strs) {
    const key = [...str].sort().join('')
    if (!map[key]) {
      map[key] = []
    }
    map[key].push(str)
  }

  return Object.values(map)
};

// or:

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const map = new Map()

  for (const str of strs) {
    const key = [...str].sort().join('')
    if (!map.has(key)) {
      map.set(key, [])
    }
    map.get(key).push(str)
  }

  return [...map.values()]
};

// or:

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  const map = new Map()

  for (const str of strs) {
    const count = Array(26).fill(0)
    for (const c of str) {
      count[c.charCodeAt(0) - 'a'.charCodeAt(0)]++
    }

    const key = count.join('#')

    if (!map.has(key)) {
      map.set(key, [])
    }
    map.get(key).push(str)
  }

  return [...map.values()]
};
