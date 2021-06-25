//给定一个二叉树，原地将它展开为一个单链表。
//
//
//
// 例如，给定二叉树
//
//     1
//   / \
//  2   5
// / \   \
//3   4   6
//
// 将其展开为：
//
// 1
// \
//  2
//   \
//    3
//     \
//      4
//       \
//        5
//         \
//          6
// Related Topics 树 深度优先搜索
// 👍 624 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {
    // let pre = null
    // let dfs = (root) => {
    //     if(root==null) return
    //     dfs(root.right)
    //     dfs(root.left)
    //     root.right = pre
    //     root.left = null
    //     pre = root
    // }
    // dfs(root)
    let p = null
    let bfs = (root) => {
        if(root==null) return
        let stack = [root]
        while (stack.length){
            let cur = stack.pop()
            if(p) {
                p.right = cur
                p.left = null
            }
            cur.right && stack.push(cur.right)
            cur.left && stack.push(cur.left)
            p = cur
        }
    }

    bfs(root)
};
//leetcode submit region end(Prohibit modification and deletion)
