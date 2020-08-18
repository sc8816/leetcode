//给定一个整数 n，求以 1 ... n 为节点组成的二叉搜索树有多少种？
//
// 示例:
//
// 输入: 3
//输出: 5
//解释:
//给定 n = 3, 一共有 5 种不同结构的二叉搜索树:
//
//   1         3     3      2      1
//    \       /     /      / \      \
//     3     2     1      1   3      2
//    /     /       \                 \
//   2     1         2                 3
// Related Topics 树 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @return {number}
 */
var numTrees = function(n) {
    let dp = new Array(n + 1).fill(0)
    dp[0] = 1
    dp[1] = 1
    // dp[i] 表示以i为根节点能够组成的二叉树的个数
    //以i节点为根节点则 f(i) = f(i-1)* f(n-i)
    //g(i) = f(0) + ...+ f(n)
    // dp[i] += dp[j - 1] * dp[i - j - 1]

    for (let i = 2; i <= n; i++) {
        for (let j = 0; j < i; j++) {
            dp[i] += dp[j] * dp[i - j - 1]
        }
    }

    return dp[n]
}
//leetcode submit region end(Prohibit modification and deletion)
