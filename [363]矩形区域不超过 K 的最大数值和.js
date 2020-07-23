//给定一个非空二维矩阵 matrix 和一个整数 k，找到这个矩阵内部不大于 k 的最大矩形和。
//
// 示例:
//
// 输入: matrix = [[1,0,1],[0,-2,3]], k = 2
//输出: 2
//解释: 矩形区域 [[0, 1], [-2, 3]] 的数值和是 2，且 2 是不超过 k 的最大数字（k = 2）。
//
//
// 说明：
//
//
// 矩阵内的矩形区域面积必须大于 0。
// 如果行数远大于列数，你将如何解答呢？
//
// Related Topics 队列 二分查找 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[][]} matrix
 * @param {number} k
 * @return {number}
 */
var maxSumSubmatrix = function(matrix, k) {
    let m = matrix.length
    let n = matrix[0].length
    if (m == 0 || n == 0) return 0
    let res = -Infinity
    
    for (let i1 = 1; i1 <= m; i1++) {
        for (let j1 = 1; j1 <= n; j1++) {
            let dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(0))
            dp[i1][j1] = matrix[i1 - 1][j1 - 1];
            for (let i2 = i1; i2 <= m; i2++) {
                for (let j2 = j1; j2 <= n; j2++) {
                    dp[i2][j2] = dp[i2 - 1][j2] + dp[i2][j2 - 1] - dp[i2 - 1][j2 - 1] + matrix[i2 - 1][j2 - 1];
                    if (dp[i2][j2] <= k && dp[i2][j2] > res) res = dp[i2][j2];
                }
            }
        }
    }

    return res
}
//leetcode submit region end(Prohibit modification and deletion)
