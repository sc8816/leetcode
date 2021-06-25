//给定一个二叉树，返回所有从根节点到叶子节点的路径。
//
// 说明: 叶子节点是指没有子节点的节点。
//
// 示例:
//
// 输入:
//
//   1
// /   \
//2     3
// \
//  5
//
//输出: ["1->2->5", "1->3"]
//
//解释: 所有根节点到叶子节点的路径为: 1->2->5, 1->3
// Related Topics 树 深度优先搜索
// 👍 403 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {
    let res = []
    let dfs = (root, cur) => {
        cur +=(cur ? '->' : '') + root.val
        if(!root.left && !root.right) {
            res.push(cur)
            return
        }
        root.left && dfs(root.left, cur)
        root.right && dfs(root.right, cur)
    }
    if(root==null) return res
    dfs(root, '')
    return res
};
//leetcode submit region end(Prohibit modification and deletion)
