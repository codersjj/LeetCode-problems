/*
63. Unique Paths II

You are given an m x n integer array grid. There is a robot initially located at the top-left corner (i.e., grid[0][0]). The robot tries to move to the bottom-right corner (i.e., grid[m - 1][n - 1]). The robot can only move either down or right at any point in time.

An obstacle and space are marked as 1 or 0 respectively in grid. A path that the robot takes cannot include any square that is an obstacle.

Return the number of possible unique paths that the robot can take to reach the bottom-right corner.

The testcases are generated so that the answer will be less than or equal to 2 * 109.



Example 1:


Input: obstacleGrid = [[0,0,0],[0,1,0],[0,0,0]]
Output: 2
Explanation: There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
Example 2:


Input: obstacleGrid = [[0,1],[0,0]]
Output: 1


Constraints:

m == obstacleGrid.length
n == obstacleGrid[i].length
1 <= m, n <= 100
obstacleGrid[i][j] is 0 or 1.
*/

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length

  const dp = Array.from({ length: m }, () => Array(n).fill(0))

  // first row
  for (let j = 0; j < n; j++) {
    if (obstacleGrid[0][j] === 1) break;
    dp[0][j] = 1
  }

  // first column
  for (let i = 0; i < m; i++) {
    if (obstacleGrid[i][0] === 1) break;
    dp[i][0] = 1
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      if (obstacleGrid[i][j] === 1) continue
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }

  return dp[m - 1][n - 1]
};

// or:

/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function(obstacleGrid) {
  const m = obstacleGrid.length
  const n = obstacleGrid[0].length

  const dp = Array(m).fill(0)
  dp[0] = 1

  for (let j = 0; j < n; j++) {
    for (let i = 0; i < m; i++) {
      if (obstacleGrid[i][j] === 1) {
        dp[i] = 0
      } else if (i > 0) {
        dp[i] += dp[i - 1]
      }
    }
  }

  return dp[m - 1]
};
