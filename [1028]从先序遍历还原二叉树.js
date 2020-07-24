//我们从二叉树的根节点 root 开始进行深度优先搜索。
//
// 在遍历中的每个节点处，我们输出 D 条短划线（其中 D 是该节点的深度），然后输出该节点的值。（如果节点的深度为 D，则其直接子节点的深度为 D + 1。
//根节点的深度为 0）。
//
// 如果节点只有一个子节点，那么保证该子节点为左子节点。
//
// 给出遍历输出 S，还原树并返回其根节点 root。
//
//
//
// 示例 1：
//
//
//
// 输入："1-2--3--4-5--6--7"
//输出：[1,2,5,3,4,6,7]
//
//
// 示例 2：
//
//
//
// 输入："1-2--3---4-5--6---7"
//输出：[1,2,5,3,null,6,null,4,null,7]
//
//
// 示例 3：
//
//
//
// 输入："1-401--349---90--88"
//输出：[1,401,null,349,88,90]
//
//
//
//
// 提示：
//
//
// 原始树中的节点数介于 1 和 1000 之间。
// 每个节点的值介于 1 和 10 ^ 9 之间。
//
// Related Topics 树 深度优先搜索


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {string} S
 * @return {TreeNode}
 */
var recoverFromPreorder = function(S) {
    /*
    *思路
    * 首先我们需要维护一个index判断当前构建到达的位置
    * 我们构建下一个结点的时候直接从index开始，找到不为 ‘-’的值（即数字）start
    * end为当前数字的长度，如果当前的start-index等于我们当前节点的深度的时候我们进行构建树
    * 否则直接返回null
     */
    let index = 0
    let buildTree = (dep, s) => {
        if (s == '') return null
        let start = index
        while (s[start] == '-') start++
        let end = start
        let cur = null
        while (end < s.length && !isNaN(s[end])) end++
        if (start - index == dep) {
            cur = new TreeNode(s.substring(start, end) - '0')
            index = end
            cur.left = buildTree(dep + 1, s)
            cur.right = buildTree(dep + 1, s)
        }
        return cur
    }

    return buildTree(0, S)
}
//leetcode submit region end(Prohibit modification and deletion)
