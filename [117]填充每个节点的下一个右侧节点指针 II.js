//给定一个二叉树
//
// struct Node {
//  int val;
//  Node *left;
//  Node *right;
//  Node *next;
//}
//
// 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。
//
// 初始状态下，所有 next 指针都被设置为 NULL。
//
//
//
// 进阶：
//
//
// 你只能使用常量级额外空间。
// 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
//
//
//
//
// 示例：
//
//
//
// 输入：root = [1,2,3,4,5,null,7]
//输出：[1,#,2,3,#,4,5,7,#]
//解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。
//
//
//
// 提示：
//
//
// 树中的节点数小于 6000
// -100 <= node.val <= 100
//
//
//
//
//
//
// Related Topics 树 深度优先搜索


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
    //思路一递归， 判断当前是否存在左右节点，每次我们只需要查找他的下一个节点即可
    //由于下一个节点肯定是会和父节点的next有关
    let getNextNode = (root) => {
        let cur = root.next
        while (cur) {
            if (cur.left) return cur.left
            if (cur.right) return cur.right
            cur = cur.next
        }
        return null
    }

    if (root == null) return root
    if (root.left) {
        if (root.right) root.left.next = root.right
        else root.left.next = getNextNode(root)
    }
    if (root.right) {
        root.right.next = getNextNode(root)
    }

    connect(root.right)
    connect(root.left)
    return root

    //层次遍历
    //层次遍历
    let bfs = (root) => {
        if (root == null) return
        let stack = [root]
        while (stack.length) {
            let temp = []
            let pre = null
            let cur = null
            for (let i = 0; i < stack.length; i++) {
                cur = stack[i]
                if(pre) pre.next = cur
                cur.left && temp.push(cur.left)
                cur.right && temp.push(cur.right)
                pre = cur
            }
            stack = temp
        }
    }
}
//leetcode submit region end(Prohibit modification and deletion)
