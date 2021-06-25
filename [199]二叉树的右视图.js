//给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
//
// 示例:
//
// 输入: [1,2,3,null,5,null,4]
//输出: [1, 3, 4]
//解释:
//
//   1            <---
// /   \
//2     3         <---
// \     \
//  5     4       <---
//
// Related Topics 树 深度优先搜索 广度优先搜索
// 👍 359 👎 0


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
 * @return {number[]}
 */
var rightSideView = function(root) {
    let res = []
    // let dfs = (root, level) => {
    //     if(root) {
    //         res[level] = root.val
    //         dfs(root.left, level + 1)
    //         dfs(root.right, level + 1 )
    //     }
    // }
    // dfs(root, 0)
    // return res

    let bfs = (root) => {
        if(root==null) return
        let quenue = [root]
        while (quenue.length){
            let temp = []
            for(let i=0; i<quenue.length; i++) {
                let cur = quenue[i]
                cur.left && temp.push(cur.left)
                cur.right && temp.push(cur.right)
                if(i==quenue.length-1) res.push(cur.val)
            }
            quenue = temp
        }
    }
    bfs(root)
    return res
};
//leetcode submit region end(Prohibit modification and deletion)
