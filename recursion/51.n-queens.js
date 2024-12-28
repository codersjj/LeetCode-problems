/*
51. N-Queens

The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.

Given an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.

Each solution contains a distinct board configuration of the n-queens' placement, where 'Q' and '.' both indicate a queen and an empty space, respectively.



Example 1:


Input: n = 4
Output: [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above
Example 2:

Input: n = 1
Output: [["Q"]]


Constraints:

1 <= n <= 9
*/

/**
 * @param {number} n
 * @return {string[][]}
 */
var solveNQueens = function(n) {
  const res = []
  const cols = new Set()
  const posDiagonal = new Set()
  const negDiagonal = new Set()
  // const board = Array(n).fill(Array(n).fill('.')) // wrong! board[0] === board[1]
  const board = Array.from({ length: n }, () => Array(n).fill('.'))

  function backtrack(row) {
    if (row === n) {
      // res.push([...board])
      res.push([...board.map(item => item.join(''))])
      return
    }

    for (let col = 0; col < n; col++) {
      if (cols.has(col) || posDiagonal.has(row + col) || negDiagonal.has(row - col)) {
        continue
      }

      cols.add(col)
      posDiagonal.add(row + col)
      negDiagonal.add(row - col)
      board[row][col] = 'Q'

      backtrack(row + 1)

      cols.delete(col)
      posDiagonal.delete(row + col)
      negDiagonal.delete(row - col)
      board[row][col] = '.'
    }
  }

  backtrack(0)

  return res
};