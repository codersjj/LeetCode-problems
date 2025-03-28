/*
150. Evaluate Reverse Polish Notation

You are given an array of strings tokens that represents an arithmetic expression in a Reverse Polish Notation.

Evaluate the expression. Return an integer that represents the value of the expression.

Note that:

The valid operators are '+', '-', '*', and '/'.
Each operand may be an integer or another expression.
The division between two integers always truncates toward zero.
There will not be any division by zero.
The input represents a valid arithmetic expression in a reverse polish notation.
The answer and all the intermediate calculations can be represented in a 32-bit integer.


Example 1:

Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
Example 2:

Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
Example 3:

Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22


Constraints:

1 <= tokens.length <= 104
tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].
*/

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
  const operators = ['+', '-', '*', '/']
  const stack = []
  let res = 0

  for (const t of tokens) {
    if (operators.includes(t)) {
      const secondOperand = stack.pop()
      const firstOperand = stack.pop()
      res = calc(firstOperand, secondOperand, t)
      stack.push(res)
    } else {
      stack.push(+t)
    }
  }

  function calc(x, y, operator) {
    let res = 0

    switch (operator) {
      case '+':
        res = x + y
        break
      case '-':
        res = x - y
        break
      case '*':
        res = x * y
        break
      case '/':
        // res = x / y > 0 ? Math.floor(x / y) : Math.ceil(x / y)
        // res = Math.trunc(x / y)
        // Bitwise operations convert their operands to 32-bit integers
        // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc#using_bitwise_no-ops_to_truncate_numbers
        res = (x / y) | 0
        break
    }

    return res
  }

  return stack[0]
};

// or:

/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function(tokens) {
  const stack = []

  for (let t of tokens) {
    if (Number.isInteger(+t)) {
      stack.push(+t)
      continue
    }

    const secondOperand = stack.pop()
    const firstOperand = stack.pop()

    if (t === '+') {
      stack.push(firstOperand + secondOperand)
    } else if (t === '-') {
      stack.push(firstOperand - secondOperand)
    } else if (t === '*') {
      stack.push(firstOperand * secondOperand)
    } else if (t === '/') {
      stack.push((firstOperand / secondOperand) | 0)
    }
  }

  return stack.pop()
};
