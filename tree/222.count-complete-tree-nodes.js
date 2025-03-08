/*
222. Count Complete Tree Nodes

Given the root of a complete binary tree, return the number of the nodes in the tree.

According to Wikipedia, every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

Design an algorithm that runs in less than O(n) time complexity.



Example 1:


Input: root = [1,2,3,4,5,6]
Output: 6
Example 2:

Input: root = []
Output: 0
Example 3:

Input: root = [1]
Output: 1


Constraints:

The number of nodes in the tree is in the range [0, 5 * 104].
0 <= Node.val <= 5 * 104
The tree is guaranteed to be complete.
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function(root) {
  if (!root) return 0

  const leftDepth = getDepth(root.left)
  const rightDepth = getDepth(root.right)

  if (leftDepth === rightDepth) {
    // 1 + (2 ** leftDepth - 1) => 2 ** leftDepth => 1 << leftDepth
    return (1 << leftDepth) + countNodes(root.right)
  } else {
    return countNodes(root.left) + (1 << rightDepth)
  }
};

// function getDepth(node) {
//   if (!node) return 0
//   return 1 + getDepth(node.left)
// }
function getDepth(node) {
  let depth = 0
  while (node) {
    depth++
    node = node.left
  }
  return depth
}

/*
时间复杂度分析
计算左右子树深度：
每次递归调用 getDepth 的时间复杂度为 O(log ⁡n)，因为完全二叉树的高度为 log n（通过不断遍历左子树计算深度）。

递归过程：

当左子树深度等于右子树深度时，说明左子树是满二叉树，直接计算其节点数为 2 ** leftDepth（即 1 << leftDepth），然后递归处理右子树。

当左子树深度大于右子树深度时，说明右子树是满二叉树，直接计算其节点数为 2 ** rightDepth（即 1 << rightDepth），然后递归处理左子树。

每次递归仅处理左或右子树中的一个，递归深度为树的高度 O(log n)。每次递归需两次 getDepth 操作，每次操作耗时 O(log n)，因此总时间复杂度为：O(log n) × O(log n) = O((log n) ** 2)
⁡
空间复杂度分析
递归栈深度：
递归深度为树的高度 O(log n)，因此空间复杂度为 O(log n)。
*/
