//给你一个整数 n，请你帮忙统计一下我们可以按下述规则形成多少个长度为 n 的字符串：
//
//
// 字符串中的每个字符都应当是小写元音字母（'a', 'e', 'i', 'o', 'u'）
// 每个元音 'a' 后面都只能跟着 'e'
// 每个元音 'e' 后面只能跟着 'a' 或者是 'i'
// 每个元音 'i' 后面 不能 再跟着另一个 'i'
// 每个元音 'o' 后面只能跟着 'i' 或者是 'u'
// 每个元音 'u' 后面只能跟着 'a'
//
//
// 由于答案可能会很大，所以请你返回 模 10^9 + 7 之后的结果。
//
//
//
// 示例 1：
//
// 输入：n = 1
//输出：5
//解释：所有可能的字符串分别是："a", "e", "i" , "o" 和 "u"。
//
//
// 示例 2：
//
// 输入：n = 2
//输出：10
//解释：所有可能的字符串分别是："ae", "ea", "ei", "ia", "ie", "io", "iu", "oi", "ou" 和 "ua"。
//
//
// 示例 3：
//
// 输入：n = 5
//输出：68
//
//
//
// 提示：
//
//
// 1 <= n <= 2 * 10^4
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @return {number}
 */
var countVowelPermutation = function(n) {
    //dp[i][0] 第i个字母为a的数目
    //dp[i][1] 第i个字母为e的数目
    //dp[i][2] 第i个字母为i的数目
    //dp[i][3] 第i个字母为o的数目
    //dp[i][4] 第i个字母为u的数目
    let dp = Array.from(new Array(n + 1), () => new Array(5))
    const MOD = Math.pow(10, 9) + 7
    for (let i = 0; i < 5; i++) dp[1][i] = 1

    for (let i = 2; i <= n; i++) {
        dp[i][0] = (dp[i - 1][1] + dp[i - 1][2] + dp[i - 1][4]) % MOD
        dp[i][1] = (dp[i - 1][0] + dp[i - 1][2]) % MOD
        dp[i][2] = (dp[i - 1][1] + dp[i - 1][3]) % MOD
        dp[i][3] = dp[i - 1][2]
        dp[i][4] = (dp[i - 1][2] + dp[i - 1][3]) % MOD
    }
    let res = 0
    for (let i = 0; i < 5; i++) res = (res + dp[n][i]) % MOD
    return res
}
//leetcode submit region end(Prohibit modification and deletion)
