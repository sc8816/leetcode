//给定一个字符串 S，找出 S 中不同的非空回文子序列个数，并返回该数字与 10^9 + 7 的模。
//
// 通过从 S 中删除 0 个或多个字符来获得子序列。
//
// 如果一个字符序列与它反转后的字符序列一致，那么它是回文字符序列。
//
// 如果对于某个 i，A_i != B_i，那么 A_1, A_2, ... 和 B_1, B_2, ... 这两个字符序列是不同的。
//
//
//
// 示例 1：
//
// 输入：
//S = 'bccb'
//输出：6
//解释：
//6 个不同的非空回文子字符序列分别为：'b', 'c', 'bb', 'cc', 'bcb', 'bccb'。
//注意：'bcb' 虽然出现两次但仅计数一次。
//
//
// 示例 2：
//
// 输入：
//S = 'abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba'
//输出：104860361
//解释：
//共有 3104860382 个不同的非空回文子序列，对 10^9 + 7 取模为 104860361。
//
//
//
//
// 提示：
//
//
// 字符串 S 的长度将在[1, 1000]范围内。
// 每个字符 S[i] 将会是集合 {'a', 'b', 'c', 'd'} 中的某一个。
//
//
//
// Related Topics 字符串 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} S
 * @return {number}
 */
var countPalindromicSubsequences = function(S) {
    //区间dp
    let N = S.length
    if (N == 0 || N == 1) return N
    let MOD = Math.pow(10, 9) + 7
    let dp = Array.from(new Array(N + 1), () => new Array(N + 1).fill(0))

    for (let i = N - 1; i >= 0; i--) {
        dp[i][i] = 1
        for (let j = i + 1; j < N; j++) {
            if (S[i] !== S[j]) {
                dp[i][j] = dp[i + 1][j] + dp[i][j - 1] - dp[i + 1][j - 1]
            } else {
                dp[i][j] = dp[i + 1][j - 1] * 2
                let l = i + 1, r = j - 1
                while (l<=r && S[l] != S[i]) l++
                while (l<=r && S[r] != S[j]) r--
                if(l>r) dp[i][j] += 2
                else if(l==r) dp[i][j] += 1
                else dp[i][j] -= dp[l+1][r-1]
            }
            dp[i][j] = (dp[i][j] + MOD) % MOD
        }
    }

    return dp[0][N-1]
}
//leetcode submit region end(Prohibit modification and deletion)
