//给定三个字符串 s1, s2, s3, 验证 s3 是否是由 s1 和 s2 交错组成的。
//
// 示例 1:
//
// 输入: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
//输出: true
//
//
// 示例 2:
//
// 输入: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
//输出: false
// Related Topics 字符串 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function(s1, s2, s3) {
    //dp[i][j]表示s1前i个元素和s2j个元素能不能组成s3前（i+j）个元素的交错字符串
    //dp[i][j] = (dp[i-1][j] && s1[i] == s3[i+j-1]) || (dp[i][j-1] && s2[j] == s3[i+j-1])
    if (s1.length + s2.length !== s3.length) return false
    let m = s1.length
    let n = s2.length
    if (m == 0 || n == 0) return s1 == s3 || s2 == s3
    let dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(0))
    dp[0][0] = 1

    for (let i = 0; i <= m; i++) {
        for (let j = 0; j <= n; j++) {
            if (i == 0) {
                if (dp[0][j - 1] && s2[j - 1] == s3[j - 1]) {
                    dp[0][j] = 1
                }
            } else if (j == 0) {
                if (dp[i - 1][0] && s1[i - 1] == s3[i - 1]) {
                    dp[i][0] = 1
                }
            } else {
                if ((dp[i - 1][j] == 1 && s1[i - 1] == s3[i + j - 1]) || (dp[i][j - 1] == 1 && s2[j - 1] == s3[i + j - 1])) {
                    dp[i][j] = 1
                }
            }
        }
    }
    // console.log(dp)
    return dp[m][n] == 1
}
//leetcode submit region end(Prohibit modification and deletion)
