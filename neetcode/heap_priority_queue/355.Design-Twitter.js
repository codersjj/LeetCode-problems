/*
355. Design Twitter

Design a simplified version of Twitter where users can post tweets, follow/unfollow another user, and is able to see the 10 most recent tweets in the user's news feed.

Implement the Twitter class:

Twitter() Initializes your twitter object.
void postTweet(int userId, int tweetId) Composes a new tweet with ID tweetId by the user userId. Each call to this function will be made with a unique tweetId.
List<Integer> getNewsFeed(int userId) Retrieves the 10 most recent tweet IDs in the user's news feed. Each item in the news feed must be posted by users who the user followed or by the user themself. Tweets must be ordered from most recent to least recent.
void follow(int followerId, int followeeId) The user with ID followerId started following the user with ID followeeId.
void unfollow(int followerId, int followeeId) The user with ID followerId started unfollowing the user with ID followeeId.


Example 1:

Input
["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"]
[[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]
Output
[null, null, [5], null, null, [6, 5], null, [5]]

Explanation
Twitter twitter = new Twitter();
twitter.postTweet(1, 5); // User 1 posts a new tweet (id = 5).
twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5]. return [5]
twitter.follow(1, 2);    // User 1 follows user 2.
twitter.postTweet(2, 6); // User 2 posts a new tweet (id = 6).
twitter.getNewsFeed(1);  // User 1's news feed should return a list with 2 tweet ids -> [6, 5]. Tweet id 6 should precede tweet id 5 because it is posted after tweet id 5.
twitter.unfollow(1, 2);  // User 1 unfollows user 2.
twitter.getNewsFeed(1);  // User 1's news feed should return a list with 1 tweet id -> [5], since user 1 is no longer following user 2.


Constraints:

1 <= userId, followerId, followeeId <= 500
0 <= tweetId <= 104
All the tweets have unique IDs.
At most 3 * 104 calls will be made to postTweet, getNewsFeed, follow, and unfollow.
A user cannot follow himself.
*/

var Twitter = function() {
  this.tweets = new Map() // Map<userId, Array<{ tweetId: number, time: number }>>
  this.following = new Map() // Map<userId, Set<followeeId>>
  this.time = 0
};

/**
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
  if (!this.tweets.has(userId)) {
    this.tweets.set(userId, [])
  }
  this.tweets.get(userId).push({ tweetId, time: this.time++ })
};

/**
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
  const allTweets = []

  // Include user's own tweets
  if (this.tweets.has(userId)) {
    allTweets.push(...this.tweets.get(userId))
  }

  // Include followees' tweets
  const followees = this.following.get(userId) || new Set()
  followees.forEach(followeeId => {
    if (this.tweets.has(followeeId)) {
      allTweets.push(...this.tweets.get(followeeId))
    }
  })

  // Sort by time (descending) and pick top 10
  allTweets.sort((a, b) => b.time - a.time)
  return allTweets.slice(0, 10).map(tweet => tweet.tweetId)
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
  if (!this.following.has(followerId)) {
    this.following.set(followerId, new Set())
  }
  this.following.get(followerId).add(followeeId)
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
  if (this.following.has(followerId)) {
    this.following.get(followerId).delete(followeeId)
  }
};

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */

// or: using a priority queue

var Twitter = function() {
  this.tweets = new Map() // Map<userId, Array<{ tweetId: number, time: number }>>
  this.following = new Map() // Map<userId, Set<followeeId>>
  this.time = 0
};

/**
 * @param {number} userId
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
  if (!this.tweets.has(userId)) {
    this.tweets.set(userId, [])
  }
  this.tweets.get(userId).push({ tweetId, time: this.time++ })
};

/**
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
  const res = []
  const maxHeap = new Heap((a, b) => b - a)
  const allTweets = []

  if (this.tweets.has(userId)) {
    const userTweets = this.tweets.get(userId)
    allTweets.push(...userTweets.slice(-10))
  }

  const followees = this.following.get(userId) || new Set()
  followees.forEach(followeeId => {
    if (this.tweets.has(followeeId)) {
      const followeeTweets = this.tweets.get(followeeId)
      allTweets.push(...followeeTweets.slice(-10))
    }
  })

  for (const tweet of allTweets) {
    maxHeap.push(tweet)
  }

  while (maxHeap.size() && res.length < 10) {
    const tweet = maxHeap.pop()
    res.push(tweet.tweetId)
  }

  return res
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
  if (!this.following.has(followerId)) {
    this.following.set(followerId, new Set())
  }
  this.following.get(followerId).add(followeeId)
};

/**
 * @param {number} followerId
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
  if (this.following.has(followerId)) {
    this.following.get(followerId).delete(followeeId)
  }
};

class Heap {
  constructor(compareFn) {
    this.compareFn = compareFn
    this.heap = []
  }

  push(val) {
    this.heap.push(val)
    this.heapifyUp(this.heap.length - 1)
  }

  pop() {
    const top = this.heap[0]
    const last = this.heap.pop()
    if (this.heap.length) {
      this.heap[0] = last
      this.heapifyDown(0)
    }

    return top
  }

  peek() {
    return this.heap[0]
  }

  heapifyUp(index) {
    while (index > 0) {
      const parentIndex = this.getParentIndex(index)
      if (this.isHigherPriority(index, parentIndex)) {
        this.swap(index, parentIndex)
        index = parentIndex
      } else {
        break
      }
    }
  }

  heapifyDown(index) {
    while (this.hasLeftChild(index)) {
      const leftChildIndex = this.getLeftChildIndex(index)
      const rightChildIndex = this.getRightChildIndex(index)
      let higherPriorityChildIndex = leftChildIndex
      if (this.hasRightChild(index) && this.isHigherPriority(rightChildIndex, leftChildIndex)) {
        higherPriorityChildIndex = rightChildIndex
      }
      if (this.isHigherPriority(higherPriorityChildIndex, index)) {
        this.swap(index, higherPriorityChildIndex)
        index = higherPriorityChildIndex
      } else {
        break
      }
    }
  }

  getParentIndex(index) {
    return Math.floor((index - 1) / 2)
  }

  getLeftChildIndex(index) {
    return 2 * index + 1
  }

  getRightChildIndex(index) {
    return 2 * index + 2
  }

  isHigherPriority(index1, index2) {
    return this.compareFn(this.heap[index1].time, this.heap[index2].time) < 0
  }

  swap(index1, index2) {
    [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
  }

  size() {
    return this.heap.length
  }

  hasLeftChild(index) {
    return this.getLeftChildIndex(index) < this.size()
  }

  hasRightChild(index) {
    return this.getRightChildIndex(index) < this.size()
  }
}

/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
