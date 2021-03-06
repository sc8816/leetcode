//给定一个字符串 S 和一个字符串 T，计算在 S 的子序列中 T 出现的个数。
//
// 一个字符串的一个子序列是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。（例如，"ACE" 是 "ABCDE" 的一个子序列
//，而 "AEC" 不是）
//
// 题目数据保证答案符合 32 位带符号整数范围。
//
//
//
// 示例 1：
//
// 输入：S = "rabbbit", T = "rabbit"
//输出：3
//解释：
//
//如下图所示, 有 3 种可以从 S 中得到 "rabbit" 的方案。
//(上箭头符号 ^ 表示选取的字母)
//
//rabbbit
//^^^^ ^^
//rabbbit
//^^ ^^^^
//rabbbit
//^^^ ^^^
//
//
// 示例 2：
//
// 输入：S = "babgbag", T = "bag"
//输出：5
//解释：
//
//如下图所示, 有 5 种可以从 S 中得到 "bag" 的方案。
//(上箭头符号 ^ 表示选取的字母)
//
//babgbag
//^^ ^
//babgbag
//^^    ^
//babgbag
//^    ^^
//babgbag
//  ^  ^^
//babgbag
//    ^^^
// Related Topics 字符串 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
var numDistinct = function (s, t) {
    //dp[i][j]表示s前i个元素组成t前j个元素的个数
    //s[i-1]==t[j-1] 我们可以选取该字符 dp[i-1][j-1]
    //不选取该元素 dp[i-1][j]
    //不相等的情况下我们要从前i-1个元素中选取t【j】
    let m = s.length
    let n = t.length
    let dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(0))
    for (let i = 0; i <= m; i++) dp[i][0] = 1
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s[i - 1] == t[j - 1]) {
                dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1]
            } else {
                dp[i][j] = dp[i-1][j]
            }
        }
    }

    return dp[m][n]
};
//leetcode submit region end(Prohibit modification and deletion)
