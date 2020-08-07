//给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
//
// 示例 1：
//
// 输入: "babad"
//输出: "bab"
//注意: "aba" 也是一个有效答案。
//
//
// 示例 2：
//
// 输入: "cbbd"
//输出: "bb"
//
// Related Topics 字符串 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    //dp[i][j]表示下标i-j是否是回文子串
    let N = s.length
    if (N == 0 || N == 1) return s
    let dp = Array.from(new Array(N), () => new Array(N).fill(false))
    let maxLen = 1
    let start = 0
    for (let j = 0; j < N; j++) {
        for (let i = 0; i <= j; i++) {
            if (j - i < 2) dp[i][j] = s[i] == s[j]
            else {
                dp[i][j] = s[i] == s[j] && dp[i + 1][j - 1]
            }
            if (dp[i][j] && j - i + 1 > maxLen) {
                maxLen = j - i + 1
                start = i
            }
        }
    }

    return s.substr(start, maxLen)

    //
}
//leetcode submit region end(Prohibit modification and deletion)
