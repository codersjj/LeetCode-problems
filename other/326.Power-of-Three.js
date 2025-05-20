/*
326. Power of Three

Given an integer n, return true if it is a power of three. Otherwise, return false.

An integer n is a power of three, if there exists an integer x such that n == 3x.



Example 1:

Input: n = 27
Output: true
Explanation: 27 = 33
Example 2:

Input: n = 0
Output: false
Explanation: There is no x where 3x = 0.
Example 3:

Input: n = -1
Output: false
Explanation: There is no x where 3x = (-1).


Constraints:

-231 <= n <= 231 - 1


Follow up: Could you solve it without loops/recursion?
*/

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function(n) {
  while (n >= 3) {
    if (n % 3 !== 0) return false
    n /= 3
  }

  return n === 1
};

// or:

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function(n) {
  if (n <= 0) return false

  while (n % 3 === 0) {
    n /= 3
  }

  return n === 1
};

// or:

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function(n) {
  // if n is less than or equal to 0, return false
  // return whether the log of n divided by the log of 3 is an integer

  if (n <= 0) return false

  const log3 = Math.log(n) / Math.log(3)
  return Math.abs(log3 - Math.round(log3)) < 1e-10
};

// or:

/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function(n) {
  // 3 ** 19 < 2 ** 31 - 1
  // 3 ** 20 > 2 ** 31 - 1
  // The largest power of three within the 32-bit integer range is 3^19 = 1162261467. If n is a positive divisor of this number, it must be a power of three.
  return n > 0 && 3 ** 19 % n === 0
};
