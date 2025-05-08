/*
460. LFU Cache

Design and implement a data structure for a Least Frequently Used (LFU) cache.

Implement the LFUCache class:

LFUCache(int capacity) Initializes the object with the capacity of the data structure.
int get(int key) Gets the value of the key if the key exists in the cache. Otherwise, returns -1.
void put(int key, int value) Update the value of the key if present, or inserts the key if not already present. When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item. For this problem, when there is a tie (i.e., two or more keys with the same frequency), the least recently used key would be invalidated.
To determine the least frequently used key, a use counter is maintained for each key in the cache. The key with the smallest use counter is the least frequently used key.

When a key is first inserted into the cache, its use counter is set to 1 (due to the put operation). The use counter for a key in the cache is incremented either a get or put operation is called on it.

The functions get and put must each run in O(1) average time complexity.



Example 1:

Input
["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, 3, null, -1, 3, 4]

Explanation
// cnt(x) = the use counter for key x
// cache=[] will show the last used order for tiebreakers (leftmost element is  most recent)
LFUCache lfu = new LFUCache(2);
lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
lfu.get(1);      // return 1
                 // cache=[1,2], cnt(2)=1, cnt(1)=2
lfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.
                 // cache=[3,1], cnt(3)=1, cnt(1)=2
lfu.get(2);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,1], cnt(3)=2, cnt(1)=2
lfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.
                 // cache=[4,3], cnt(4)=1, cnt(3)=2
lfu.get(1);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,4], cnt(4)=1, cnt(3)=3
lfu.get(4);      // return 4
                 // cache=[4,3], cnt(4)=2, cnt(3)=3


Constraints:

1 <= capacity <= 104
0 <= key <= 105
0 <= value <= 109
At most 2 * 105 calls will be made to get and put.
*/

/**
 * @param {number} capacity
 */
var LFUCache = function(capacity) {
  this.capacity = capacity
  this.minFreq = 0
  this.keyToValFreq = new Map() // Map<key, { value, freq }>
  this.freqToKeys = new Map() // Map<freq, Set<key>>
};

/**
 * @param {number} key
 * @return {number}
 */
LFUCache.prototype.get = function(key) {
  if (!this.keyToValFreq.has(key)) {
    return -1
  }

  const { value, freq } = this.keyToValFreq.get(key)

  // Remove from current frequency set
  const keysAtFreq = this.freqToKeys.get(freq)
  keysAtFreq.delete(key)

  // If this was the last key at minFreq, increment minFreq
  if (!keysAtFreq.size && freq === this.minFreq) {
    this.minFreq++
  }

  // Increment frequency and add to new freq's set
  const newFreq = freq + 1
  this.keyToValFreq.set(key, { value, freq: newFreq })
  if (!this.freqToKeys.has(newFreq)) {
    this.freqToKeys.set(newFreq, new Set())
  }
  this.freqToKeys.get(newFreq).add(key)

  return value
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LFUCache.prototype.put = function(key, value) {
  if (this.capacity <= 0) return

  if (this.keyToValFreq.has(key)) {
    // Update value and increment frequency (like get)
    const { freq } = this.keyToValFreq.get(key)
    this.keyToValFreq.set(key, { value, freq })
    this.get(key) // This handle the frequency increment
    return
  }

  // If cache is full, evict
  if (this.keyToValFreq.size >= this.capacity) {
    const keysAtMinFreq = this.freqToKeys.get(this.minFreq)
    const keyToEvict = keysAtMinFreq.values().next().value

    keysAtMinFreq.delete(keyToEvict)
    this.keyToValFreq.delete(keyToEvict)
  }

  // Add new key with frequency 1
  this.keyToValFreq.set(key, { value, freq: 1 })
  if (!this.freqToKeys.has(1)) {
    this.freqToKeys.set(1, new Set())
  }
  this.freqToKeys.get(1).add(key)
  this.minFreq = 1
};

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */