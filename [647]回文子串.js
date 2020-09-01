//给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
//
// 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。
//
//
//
// 示例 1：
//
// 输入："abc"
//输出：3
//解释：三个回文子串: "a", "b", "c"
//
//
// 示例 2：
//
// 输入："aaa"
//输出：6
//解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
//
//
//
// 提示：
//
//
// 输入的字符串长度不会超过 1000 。
//
// Related Topics 字符串 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @return {number}
 */
var countSubstrings = function (s) {
    // dp[i][j]表示区间i-j是否是回文串
    let n = s.length
    let dp = Array.from(new Array(n + 1), () => new Array(n + 1).fill(false))
    let res = 0
    for (let i = n - 1; i >=0; i--) {
        dp[i][i] = true
        res++
        for (let j = i + 1; j < n; j++) {
            if (s[i] == s[j]) {
                if (j - i == 1) dp[i][j] = true
                else dp[i][j] = dp[i + 1][j - 1]
            } else {
                dp[i][j] = false
            }
            if (dp[i][j]) res++
        }
    }
    return res
};
//leetcode submit region end(Prohibit modification and deletion)
