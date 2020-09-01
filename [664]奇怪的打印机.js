//有台奇怪的打印机有以下两个特殊要求：
//
//
// 打印机每次只能打印同一个字符序列。
// 每次可以在任意起始和结束位置打印新字符，并且会覆盖掉原来已有的字符。
//
//
// 给定一个只包含小写英文字母的字符串，你的任务是计算这个打印机打印它需要的最少次数。
//
// 示例 1:
//
//
//输入: "aaabbb"
//输出: 2
//解释: 首先打印 "aaa" 然后打印 "bbb"。
//
//
// 示例 2:
//
//
//输入: "aba"
//输出: 2
//解释: 首先打印 "aaa" 然后在第二个位置打印 "b" 覆盖掉原来的字符 'a'。
//
// 提示: 输入字符串的长度不会超过 100。
// Related Topics 深度优先搜索 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @return {number}
 */
var strangePrinter = function (s) {
    let n = s.length
    if (n == 0 || n == 1) return n
    let dp = Array.from(new Array(n + 1), () => new Array(n + 1).fill(Infinity))
    for (let i = 0; i <= n; i++) dp[i][i] = 1

    for (let i = n - 2; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            dp[i][j] = dp[i + 1][j] + 1
            if (s[i] == s[j]) {
                dp[i][j] = Math.min(dp[i][j], dp[i + 1][j])
            }
            for (let k = i + 1; k < j; k++) {
                if (s[i] == s[k]) {
                    dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j])
                }
            }
        }
    }

    return dp[0][n - 1]
};
//leetcode submit region end(Prohibit modification and deletion)
