/*
Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
- int get(int key) Return the value of the key if the key exists, otherwise return -1.
- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.


Example 1:

Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]

Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4

Constraints:

1 <= capacity <= 3000
0 <= key <= 104
0 <= value <= 105
At most 2 * 105 calls will be made to get and put.
*/

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.map = new Map()
  this.capacity = capacity
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  if (!this.map.has(key)) return -1
  const value = this.map.get(key)
  // 删掉后重新设置，即更新到 map 的最后
  this.map.delete(key)
  this.map.set(key, value)
  return value
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  // 如果有，就先删除
  if (this.map.has(key)) {
    this.map.delete(key)
  }
  // 一旦到达容量上限，就删掉最近最少使用的那个（即 map 中的第一个）
  if (this.map.size === this.capacity) {
    const iterator = this.map.keys()
    const firstKey = iterator.next().value
    this.map.delete(firstKey)
  }
  this.map.set(key, value)
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

// or:

class ListNode {
  constructor(key, val, prev, next) {
    this.key = key
    this.val = val
    this.prev = prev ?? null
    this.next = next ?? null
  }
}

/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.cap = capacity
  this.cache = {} // map key to node
  this.size = 0

  // (dummy) left = LRU
  this.left = new ListNode(0, 0)
  // (dummy) right = most recent used
  this.right = new ListNode(0, 0)

  this.left.next = this.right
  this.right.prev = this.left
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  if (this.cache[key]) {
    // update most recent
    this.remove(this.cache[key])
    this.insert(this.cache[key])

    return this.cache[key].val
  }

  return -1
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
  if (this.cache[key]) {
    this.remove(this.cache[key])
    this.size--
  }
  this.cache[key] = new ListNode(key, value)
  this.insert(this.cache[key])
  this.size++

  if (this.size > this.cap) {
    // remove from the list and delete the LRU from the hashmap
    const lru = this.left.next
    this.remove(lru)
    this.size--
    delete this.cache[lru.key]
  }
};

// remove node from list
LRUCache.prototype.remove = function(node) {
  const prev = node.prev
  const next = node.next
  prev.next = next
  next.prev = prev
}

// insert node at right
LRUCache.prototype.insert = function(node) {
  const prev = this.right.prev
  const next = this.right
  prev.next = node
  node.prev = prev
  node.next = next
  next.prev = node
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
