//给你一个由小写字母组成的字符串 s，和一个整数 k。
//
// 请你按下面的要求分割字符串：
//
//
// 首先，你可以将 s 中的部分字符修改为其他的小写英文字母。
// 接着，你需要把 s 分割成 k 个非空且不相交的子串，并且每个子串都是回文串。
//
//
// 请返回以这种方式分割字符串所需修改的最少字符数。
//
//
//
// 示例 1：
//
// 输入：s = "abc", k = 2
//输出：1
//解释：你可以把字符串分割成 "ab" 和 "c"，并修改 "ab" 中的 1 个字符，将它变成回文串。
//
//
// 示例 2：
//
// 输入：s = "aabbc", k = 3
//输出：0
//解释：你可以把字符串分割成 "aa"、"bb" 和 "c"，它们都是回文串。
//
// 示例 3：
//
// 输入：s = "leetcode", k = 8
//输出：0
//
//
//
//
// 提示：
//
//
// 1 <= k <= s.length <= 100
// s 中只含有小写英文字母。
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var palindromePartition = function(s, k) {
    //dp[i][j]表示将前面的i个元素分成j份 所需修改的最小次数
    //dp[i][j] = min(dp[i][j], dp[k][j-1]+ cost(k+1, j, s))

    let cost = (start, end, str) => {
        let count = 0
        while (start < end) {
            if (str[start++] !== str[end--]) {
                count++
            }
        }
        return count
    }

    let n = s.length
    let dp = Array.from(new Array(n + 1), () => new Array(k + 1).fill(Infinity))
    dp[0][0] = 0
    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= Math.min(i, k); j++) {
            if (j == 1) dp[i][j] = cost(0, i - 1, s)
            else {
                for (let m = j - 1; m < i; m++) {
                    dp[i][j] = Math.min(dp[i][j], dp[m][j - 1] + cost(m, i - 1, s))
                }
            }
        }
    }

    return dp[n][k]
}
//leetcode submit region end(Prohibit modification and deletion)
