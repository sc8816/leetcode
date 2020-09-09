//给你一个正整数数组 arr，考虑所有满足以下条件的二叉树：
//
//
// 每个节点都有 0 个或是 2 个子节点。
// 数组 arr 中的值与树的中序遍历中每个叶节点的值一一对应。（知识回顾：如果一个节点有 0 个子节点，那么该节点为叶节点。）
// 每个非叶节点的值等于其左子树和右子树中叶节点的最大值的乘积。
//
//
// 在所有这样的二叉树中，返回每个非叶节点的值的最小可能总和。这个和的值是一个 32 位整数。
//
//
//
// 示例：
//
// 输入：arr = [6,2,4]
//输出：32
//解释：
//有两种可能的树，第一种的非叶节点的总和为 36，第二种非叶节点的总和为 32。
//
//    24            24
//   /  \          /  \
//  12   4        6    8
// /  \               / \
//6    2             2   4
//
//
//
// 提示：
//
//
// 2 <= arr.length <= 40
// 1 <= arr[i] <= 15
// 答案保证是一个 32 位带符号整数，即小于 2^31。
//
// Related Topics 栈 树 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} arr
 * @return {number}
 */
var mctFromLeafValues = function (arr) {
    //dp[i][j] 表示区间 i-j中最小的总和
    //我们在区间i-j中应当尽量把大的值放在上面
    //给定一个数组max存取区间中最大值，max[i][j]表示区间i-j中最大值
    let n = arr.length
    let dp = Array.from(new Array(n), () => new Array(n).fill(0))
    let max = Array.from(new Array(n), () => new Array(n).fill(0))

    for (let j = 0; j < n; j++) {
        let maxVal = arr[j]
        for (let i = j; i >= 0; i--) {
            maxVal = Math.max(maxVal, arr[i])
            max[i][j] = maxVal
        }
    }

    for (let j = 0; j < n; j++) {
        for (let i = j; i >= 0; i--) {
            let min = Infinity
            for (let k = i; k < j; k++) {
                min = Math.min(min, dp[i][k] + dp[k + 1][j] + max[i][k] * max[k + 1][j])
                dp[i][j] = min
            }
        }
    }

    return dp[0][n - 1]
};
//leetcode submit region end(Prohibit modification and deletion)
