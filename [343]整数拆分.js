//给定一个正整数 n，将其拆分为至少两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。
//
// 示例 1:
//
// 输入: 2
//输出: 1
//解释: 2 = 1 + 1, 1 × 1 = 1。
//
// 示例 2:
//
// 输入: 10
//输出: 36
//解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
//
// 说明: 你可以假设 n 不小于 2 且不大于 58。
// Related Topics 数学 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
    let dp = [0, 1, 1]
    for (let i = 3; i <= n; i++) {
        dp[i] = 0
        for (let j = 1; j < i; j++) {
            dp[i] = Math.max(dp[i], Math.max(dp[j], j) * Math.max(i - j, dp[i - j]))
        }
    }

    return dp[n]
};
//leetcode submit region end(Prohibit modification and deletion)
