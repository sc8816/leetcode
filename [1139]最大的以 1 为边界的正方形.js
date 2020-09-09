//给你一个由若干 0 和 1 组成的二维网格 grid，请你找出边界全部由 1 组成的最大 正方形 子网格，并返回该子网格中的元素数量。如果不存在，则返回 0
//。
//
//
//
// 示例 1：
//
// 输入：grid = [[1,1,1],[1,0,1],[1,1,1]]
//输出：9
//
//
// 示例 2：
//
// 输入：grid = [[1,1,0,0]]
//输出：1
//
//
//
//
// 提示：
//
//
// 1 <= grid.length <= 100
// 1 <= grid[0].length <= 100
// grid[i][j] 为 0 或 1
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[][]} grid
 * @return {number}
 */
var largest1BorderedSquare = function (grid) {
    //dp[i][j][0] 表示在[i, j] 为横向位置1的个数
    //dp[i][j][1] 表示[i, j] 纵向1的个数
    let m = grid.length
    let n = grid[0].length
    let res = 0
    let dp = []
    for (let i = 0; i <= m; i++) {
        dp[i] = []
        for (let j = 0; j <= n; j++) {
            dp[i][j] = []
            for (let k = 0; k < 2; k++) {
                dp[i][j][k] = 0
            }
        }
    }

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (grid[i - 1][j - 1] == 0) continue
            dp[i][j][0] = dp[i - 1][j][0] + 1
            dp[i][j][1] = dp[i][j - 1][1] + 1
            let min = Math.min(dp[i][j][0], dp[i][j][1])
            for (let k = 0; k < min; k++) {
                if (dp[i - k][j][1] >= k + 1 && dp[i][j - k][0] >= k + 1) {
                    res = Math.max(res, k + 1)
                }
            }
        }
    }

    return res * res
};
//leetcode submit region end(Prohibit modification and deletion)
