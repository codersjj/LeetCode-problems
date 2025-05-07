/*
860. Lemonade Change

At a lemonade stand, each lemonade costs $5. Customers are standing in a queue to buy from you and order one at a time (in the order specified by bills). Each customer will only buy one lemonade and pay with either a $5, $10, or $20 bill. You must provide the correct change to each customer so that the net transaction is that the customer pays $5.

Note that you do not have any change in hand at first.

Given an integer array bills where bills[i] is the bill the ith customer pays, return true if you can provide every customer with the correct change, or false otherwise.



Example 1:

Input: bills = [5,5,5,10,20]
Output: true
Explanation:
From the first 3 customers, we collect three $5 bills in order.
From the fourth customer, we collect a $10 bill and give back a $5.
From the fifth customer, we give a $10 bill and a $5 bill.
Since all customers got correct change, we output true.
Example 2:

Input: bills = [5,5,10,10,20]
Output: false
Explanation:
From the first two customers in order, we collect two $5 bills.
For the next two customers in order, we collect a $10 bill and give back a $5 bill.
For the last customer, we can not give the change of $15 back because we only have two $10 bills.
Since not every customer received the correct change, the answer is false.


Constraints:

1 <= bills.length <= 105
bills[i] is either 5, 10, or 20.
*/

/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
  if (bills[0] !== 5) return false

  const changes = {
    5: 1,
    10: 0
  }

  for (let i = 1; i < bills.length; i++) {
    const fiveCounts = changes[5]
    const tenCounts = changes[10]
    if (bills[i] === 5) {
      changes[5] = fiveCounts + 1
    } else if (bills[i] === 10) {
      if (!fiveCounts) return false
      changes[5] = fiveCounts - 1
      changes[10] = tenCounts + 1
    } else if (bills[i] === 20) {
      if (!fiveCounts) return false
      if (!tenCounts && fiveCounts < 3) return false

      if (tenCounts) {
        changes[5] = fiveCounts - 1
        changes[10] = tenCounts - 1
      } else {
        changes[5] = fiveCounts - 3
      }
    }
  }

  return true
};

// or:

/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
  const map = {}

  for (let i = 0; i < bills.length; i++) {
    const bill = bills[i]
    map[bill] = (map[bill] || 0) + 1

    if (bill === 10) {
      if (map[5]) {
        map[5] -= 1
      } else {
        return false
      }
    } else if (bill === 20) {
      if (map[5] && map[10]) {
        map[5] -= 1
        map[10] -= 1
      } else if (map[5] >= 3) {
        map[5] -= 3
      } else {
        return false
      }
    }
  }

  return true
};

// or:

/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
  let five = 0
  let ten = 0

  for (const bill of bills) {
    if (bill === 5) {
      five++
    } else if (bill === 10) {
      ten++
    }

    const change = bill - 5

    if (change === 5) {
      if (five) {
        five--
      } else {
        return false
      }
    } else if (change === 15) {
      if (five && ten) {
        five--
        ten--
      } else if (five >= 3) {
        five -= 3
      } else {
        return false
      }
    }
  }

  return true
};
