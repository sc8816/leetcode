//在一个由 0 和 1 组成的二维矩阵内，找到只包含 1 的最大正方形，并返回其面积。
//
// 示例:
//
// 输入:
//
//1 0 1 0 0
//1 0 1 1 1
//1 1 1 1 1
//1 0 0 1 0
//
//输出: 4
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
    let m = matrix.length
    if (m < 1) return 0
    let n = matrix[0].length
    let res = 0
    let dp = Array.from(new Array(m + 1), ()=> new Array(n + 1).fill(0))
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if(matrix[i-1][j-1]==1){
                dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1
                res = Math.max(res, dp[i][j])
            }
        }
    }

    return res * res
};
//leetcode submit region end(Prohibit modification and deletion)
