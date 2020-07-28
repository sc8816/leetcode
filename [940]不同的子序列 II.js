//给定一个字符串 S，计算 S 的不同非空子序列的个数。
//
// 因为结果可能很大，所以返回答案模 10^9 + 7.
//
//
//
// 示例 1：
//
// 输入："abc"
//输出：7
//解释：7 个不同的子序列分别是 "a", "b", "c", "ab", "ac", "bc", 以及 "abc"。
//
//
// 示例 2：
//
// 输入："aba"
//输出：6
//解释：6 个不同的子序列分别是 "a", "b", "ab", "ba", "aa" 以及 "aba"。
//
//
// 示例 3：
//
// 输入："aaa"
//输出：3
//解释：3 个不同的子序列分别是 "a", "aa" 以及 "aaa"。
//
//
//
//
//
//
// 提示：
//
//
// S 只包含小写字母。
// 1 <= S.length <= 2000
//
//
//
//
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} S
 * @return {number}
 */
var distinctSubseqII = function(S) {
    //dp[i]表示0-i下标中子序列的个数
    //last 记录上一次出现该元素的下标
    let last = []
    const MOD = Math.pow(10, 9) + 7
    let dp = new Array(S.length).fill(0)
    dp[0] = 1
    for (let i = 0; i < S.length; i++) {
        let code = S[i].charCodeAt() - 'a'.charCodeAt()
        dp[i + 1] = 2 * dp[i]
        if (last[code] >= 0) {
            dp[i + 1] -= dp[last[code]]
        }
        dp[i + 1] = (dp[i + 1] + MOD) % MOD
        last[code] = i
    }
    //去除空字符串
    dp[S.length]--

    return dp[S.length]
}
//leetcode submit region end(Prohibit modification and deletion)
