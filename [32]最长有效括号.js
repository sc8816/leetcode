//给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。
//
// 示例 1:
//
// 输入: "(()"
//输出: 2
//解释: 最长有效括号子串为 "()"
//
//
// 示例 2:
//
// 输入: ")()())"
//输出: 4
//解释: 最长有效括号子串为 "()()"
//
// Related Topics 字符串 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function(s) {
    if (s.length == 0) return 0
    let res = 0
    let dp = new Array(s.length + 1).fill(0)
    for (let i = 1; i < s.length; i++) {
        if (s[i] == ')') {
            if (s[i - 1] == '(') {
                dp[i] = 2 + ((i - 2) >= 0 ? dp[i - 2] : 0)
                // if (i - 2 >= 0) {
                //     dp[i] = dp[i] + dp[i - 2];
                // }
            } else if (dp[i - 1] > 0) {
                if ((i - dp[i - 1] - 1) >= 0 && s[i - dp[i - 1] - 1] == '(') {
                    dp[i] = dp[i - 1] + 2
                    if ((i - dp[i - 1] - 2) >= 0) {
                        dp[i] = dp[i] + dp[i - dp[i - 1] - 2]
                    }
                }
            }
        }
        res = Math.max(res, dp[i])
    }
    return res
}

var longestValidParentheses = function(s) {
    //dp[i]表示前i+1个元素中以s[i]结尾的有效括号数
    if (s.length = 0 || s.length == 1) return 0
    let n = s.length
    let dp = new Array(n + 1).fill(0)
    let res = 0
    for (let i = 1; i < n; i++) {
        if (s[i] == ')') {
            if (s[i - 1] == '(') {
                dp[i] = 2 + (i - 2 >= 0 ? dp[i - 2] : 0)
            } else if (dp[i - 1] > 0) { //如果上一个不是左括号， 同时存在以s[i-1]的右括号结尾的有效括号数
                let lst = i - dp[i - 1] - 1
                if (lst >= 0 && dp[lst] == '(') {
                    dp[i] = dp[i - 1] + 2 //说明在有效括号i-1前面存在左括号与i形成有效括号
                    //我们还需要加上在lst-1位置上面有效括号数
                    if (lst - 1 >= 0) {
                        dp[i] += dp[lst - 1]
                    }
                }
            }
        }

        res = Math.max(res, dp[i])
    }

    return res
}
// console.log(longestValidParentheses('(())()'))
//leetcode submit region end(Prohibit modification and deletion)
