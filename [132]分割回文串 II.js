//给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。
//
// 返回符合要求的最少分割次数。
//
// 示例:
//
// 输入: "aab"
//输出: 1
//解释: 进行一次分割就可将 s 分割成 ["aa","b"] 这样两个回文子串。
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @return {number}
 */
var minCut = function(s) {
    // dp[i]表示切割到下标为i的字符最少需要切割次数
    //dp[i] = if(s[0-i]是回文){
    //   dp[i] = 0
    // }
    // else {
    // Math.min(dp[i], dp[j]+1) && j<i && s[0-j]是回文
    // }
    let checkPalindrome = (str, start, end) => {
        while (start < end) {
            if (str[start] !== s[end]) return false
            start++
            end--
        }
        return true
    }
    let m = s.length
    if (m == 0 || m == 1) return 0
    let res = m
    let dp = new Array(m)
    for (let i = 0; i < m; i++) dp[i] = i

    for (let i = 1; i < m; i++) {
        if (checkPalindrome(s, 0, i)) dp[i] = 0
        else {
            for (let j = 0; j < i; j++) {
                if (checkPalindrome(s, j + 1, i)) {
                    dp[i] = Math.min(dp[i], dp[j]+1)
                }
            }
        }
    }

    return dp[m-1]
}
//leetcode submit region end(Prohibit modification and deletion)
