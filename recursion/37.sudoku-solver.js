/*
37. Sudoku Solver

Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy all of the following rules:

Each of the digits 1-9 must occur exactly once in each row.
Each of the digits 1-9 must occur exactly once in each column.
Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.
The '.' character indicates empty cells.



Example 1:


Input: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
Output: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]
Explanation: The input board is shown above and the only valid solution is shown below:




Constraints:

board.length == 9
board[i].length == 9
board[i][j] is a digit or '.'.
It is guaranteed that the input board has only one solution.
*/

const EMPTY = '.'

/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solveSudoku = function(board) {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

  const emptyCellPositions = getEmptyCellPositions(board)

  function dfs(i) {
    if (i >= emptyCellPositions.length) {
      return true
    }
    const { row, col } = emptyCellPositions[i]
    for (let j = 0; j < digits.length; j++) {
      const digit = digits[j]
      if (isValid(digit, board, row, col)) {
        board[row][col] = digit
        if (dfs(i + 1)) {
          return true
        }
        // backtrack
        board[row][col] = EMPTY
      }
    }

    return false
  }

  dfs(0)

  return board
};

function isValid(number, board, row, col) {
  const length = board.length

  // 1. check row and col
  for (let i = 0; i < length; i++) {
    if (board[row][i] === number || board[i][col] === number) {
      return false
    }
  }

  // 2. check sub-box
  const rowStart = Math.floor(row / 3) * 3
  const colStart = Math.floor(col / 3) * 3
  for (let i = rowStart; i < rowStart + 3; i++) {
    for (let j = colStart; j < colStart + 3; j++) {
      if (board[i][j] === number) {
        return false
      }
    }
  }

  return true
}

function getEmptyCellPositions(board) {
  const emptyCellPositions = []
  const len = board.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      if (board[i][j] === EMPTY) {
        emptyCellPositions.push({ row: i, col: j })
      }
    }
  }

  return emptyCellPositions
}


// test
// const input = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
// solveSudoku(input)
// console.log(input)
