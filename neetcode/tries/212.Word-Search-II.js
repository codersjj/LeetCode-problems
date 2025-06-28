/*
212. Word Search II

Given an m x n board of characters and a list of strings words, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.



Example 1:


Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]
Example 2:


Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []


Constraints:

m == board.length
n == board[i].length
1 <= m, n <= 12
board[i][j] is a lowercase English letter.
1 <= words.length <= 3 * 104
1 <= words[i].length <= 10
words[i] consists of lowercase English letters.
All the strings of words are unique.
*/

class TrieNode {
  constructor() {
    this.children = {}
    this.isEndOfWord = false
  }

  addWord(word) {
    let cur = this

    for (const c of word) {
      if (!cur.children[c]) {
        cur.children[c] = new TrieNode()
      }
      cur = cur.children[c]
    }

    cur.isEndOfWord = true
  }
}

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
  const root = new TrieNode()
  for (const word of words) {
    root.addWord(word)
  }

  const ROWS = board.length
  const COLS = board[0].length
  const res = new Set()
  // const visit = new Set()

  function dfs(r, c, node, word) {
    if (
      r < 0 || c < 0 || r >= ROWS || c >= COLS ||
      board[r][c] === '#' ||
      !node.children[board[r][c]]
    ) {
      return
    }

    const char = board[r][c]
    node = node.children[char]
    word += char
    board[r][c] = '#'
    if (node.isEndOfWord) {
      res.add(word)
    }

    dfs(r - 1, c, node, word)
    dfs(r + 1, c, node, word)
    dfs(r, c - 1, node, word)
    dfs(r, c + 1, node, word)

    board[r][c] = char
  }

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      dfs(i, j, root, '')
    }
  }

  return [...res]
};
