//给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
//
// '.' 匹配任意单个字符
//'*' 匹配零个或多个前面的那一个元素
//
//
// 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
//
// 说明:
//
//
// s 可能为空，且只包含从 a-z 的小写字母。
// p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
//
//
// 示例 1:
//
// 输入:
//s = "aa"
//p = "a"
//输出: false
//解释: "a" 无法匹配 "aa" 整个字符串。
//
//
// 示例 2:
//
// 输入:
//s = "aa"
//p = "a*"
//输出: true
//解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
//
//
// 示例 3:
//
// 输入:
//s = "ab"
//p = ".*"
//输出: true
//解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
//
//
// 示例 4:
//
// 输入:
//s = "aab"
//p = "c*a*b"
//输出: true
//解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
//
//
// 示例 5:
//
// 输入:
//s = "mississippi"
//p = "mis*is*p*."
//输出: false
// Related Topics 字符串 动态规划 回溯算法


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
var isMatch = function(s, p) {
    //dp[i][j]表示s前i个字符能否匹配p前j个字符
    //预处理
    s = ' ' + s
    p = ' ' + p
    let m = s.length
    let n = p.length
    let dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(false))
    dp[0][0] = true
    //预处理， 我们需要找出匹配前面0个字符的串
    for (let j = 1; j <= n; j++) {
        if (p[j - 1] == '*') dp[0][j] = dp[0][j - 2]
    }
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (s[i - 1] == p[j - 1] || p[j - 1] == '.') {
                dp[i][j] = dp[i - 1][j - 1]
            } else if (p[j - 1] == '*') {
                if (p[j - 2] != s[i - 1] && p[j - 2] != '.') {
                    dp[i][j] = dp[i][j - 2] //p的字符匹配不上就让他消失，即匹配0个
                } else {
                    //匹配0个我们就让p字符的前一个进行消失，就时dp[i][j-2]
                    //匹配1个的情况我们就直接把当前p【j-1】的*号去掉就是比较dp[i][j-1]
                    //匹配多个的情况就是我们在s中存在多个s[i-1], 我们去掉一个s[i-1]对结果并无影响即我们可以直接求dp[i-1][j]
                    dp[i][j] = dp[i][j - 2] || dp[i - 1][j] || dp[i][j - 1]
                }
            }
        }
    }

    return dp[m][n]
}
//leetcode submit region end(Prohibit modification and deletion)
