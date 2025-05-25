/*
36. Valid Sudoku

Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.
Note:

A Sudoku board (partially filled) could be valid but is not necessarily solvable.
Only the filled cells need to be validated according to the mentioned rules.


Example 1:


Input: board =
[["5","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: true
Example 2:

Input: board =
[["8","3",".",".","7",".",".",".","."]
,["6",".",".","1","9","5",".",".","."]
,[".","9","8",".",".",".",".","6","."]
,["8",".",".",".","6",".",".",".","3"]
,["4",".",".","8",".","3",".",".","1"]
,["7",".",".",".","2",".",".",".","6"]
,[".","6",".",".",".",".","2","8","."]
,[".",".",".","4","1","9",".",".","5"]
,[".",".",".",".","8",".",".","7","9"]]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.


Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit 1-9 or '.'.
*/

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  const ROW = board.length
  const COL = board[0].length

  function isValid(r, c, num) {
    if (num === '.') return true

    for (let i = 0; i < ROW; i++) {
      if (
        (board[i][c] === num && i !== r) ||
        (board[r][i] === num && i !== c)
      ) {
        return false
      }
    }

    const rowStart = Math.floor(r / 3) * 3
    const colStart = Math.floor(c / 3) * 3
    for (let i = rowStart; i < rowStart + 3; i++) {
      for (let j = colStart; j < colStart + 3; j++) {
        if (board[i][j] === num && !(i === r && j === c)) {
          return false
        }
      }
    }

    return true
  }

  for (let r = 0; r < ROW; r++) {
    for (let c = 0; c < COL; c++) {
      if (!isValid(r, c, board[r][c])) {
        return false
      }
    }
  }

  return true
};

// or:

/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function(board) {
  const rows = Array(9).fill().map(() => new Set())
  const cols = Array(9).fill().map(() => new Set())
  const squares = Array(9).fill().map(() => new Set())

  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      const num = board[r][c]
      if (num === '.') continue

      const squareIndex = Math.floor(r / 3) * 3 + Math.floor(c / 3)

      if (
        rows[r].has(num) ||
        cols[c].has(num) ||
        squares[squareIndex].has(num)
      ) {
        return false
      }

      rows[r].add(num)
      cols[c].add(num)
      squares[squareIndex].add(num)
    }
  }

  return true
};
