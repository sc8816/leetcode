//给出两个字符串 str1 和 str2，返回同时以 str1 和 str2 作为子序列的最短字符串。如果答案不止一个，则可以返回满足条件的任意一个答案。
//
// （如果从字符串 T 中删除一些字符（也可能不删除，并且选出的这些字符可以位于 T 中的 任意位置），可以得到字符串 S，那么 S 就是 T 的子序列）
//
//
//
// 示例：
//
// 输入：str1 = "abac", str2 = "cab"
//输出："cabac"
//解释：
//str1 = "abac" 是 "cabac" 的一个子串，因为我们可以删去 "cabac" 的第一个 "c"得到 "abac"。
//str2 = "cab" 是 "cabac" 的一个子串，因为我们可以删去 "cabac" 末尾的 "ac" 得到 "cab"。
//最终我们给出的答案是满足上述属性的最短字符串。
//
//
//
//
// 提示：
//
//
// 1 <= str1.length, str2.length <= 1000
// str1 和 str2 都由小写英文字母组成。
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var shortestCommonSupersequence = function(str1, str2) {
    //先求最长公共子序列lcs
    let m = str1.length
    let n = str2.length
    let dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(0))
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] == str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            } else {
                //取较大的
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
            }
        }
    }
    let lcs = ''
    let i = m
    let j = n
    //反推公共子串
    while (i > 0 && j > 0) {
        if (str1[i - 1] == str2[j - 1]) {
            lcs += str1[i - 1]
            i--
            j--
        } else {
            //dp[i - 1][j] > dp[i][j - 1]说明我们从字符串1中移除一个元素比从字符j中移除一个元素公共子串更大
            //说明下一个字符存在字符串2里面
            dp[i - 1][j] > dp[i][j - 1] ? i-- : j--
        }
    }

    lcs = lcs.split('').reverse().join('')
    i = 0
    j = 0
    let res = ''
    for (let s of lcs) {
        while (s != str1[i]) res += str1[i++]
        while (s != str2[j]) res += str2[j++]
        res += str1[i]
        i++
        j++
    }
    //可能存在遍历完公共字串的时候，i、j未到达结尾处
    res += str1.slice(i) + str2.slice(j)
    return res
}
//leetcode submit region end(Prohibit modification and deletion)
