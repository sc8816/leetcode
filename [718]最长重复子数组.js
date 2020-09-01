//给两个整数数组 A 和 B ，返回两个数组中公共的、长度最长的子数组的长度。
//
//
//
// 示例：
//
// 输入：
//A: [1,2,3,2,1]
//B: [3,2,1,4,7]
//输出：3
//解释：
//长度最长的公共子数组是 [3, 2, 1] 。
//
//
//
//
// 提示：
//
//
// 1 <= len(A), len(B) <= 1000
// 0 <= A[i], B[i] < 100
//
// Related Topics 数组 哈希表 二分查找 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 */
var findLength = function (A, B) {
    //dp[i][j]表示以A[i]和B[j]结尾最长的公共子序列
    let res = 0
    let m = A.length
    let n = B.length
    let dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(0))
    dp[0][0] = 0
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (A[i - 1] == B[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1
            }
            res = Math.max(res, dp[i][j])
        }
    }

    return res
};
//leetcode submit region end(Prohibit modification and deletion)
