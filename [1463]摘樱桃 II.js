//给你一个 rows x cols 的矩阵 grid 来表示一块樱桃地。 grid 中每个格子的数字表示你能获得的樱桃数目。
//
// 你有两个机器人帮你收集樱桃，机器人 1 从左上角格子 (0,0) 出发，机器人 2 从右上角格子 (0, cols-1) 出发。
//
// 请你按照如下规则，返回两个机器人能收集的最多樱桃数目：
//
//
// 从格子 (i,j) 出发，机器人可以移动到格子 (i+1, j-1)，(i+1, j) 或者 (i+1, j+1) 。
// 当一个机器人经过某个格子时，它会把该格子内所有的樱桃都摘走，然后这个位置会变成空格子，即没有樱桃的格子。
// 当两个机器人同时到达同一个格子时，它们中只有一个可以摘到樱桃。
// 两个机器人在任意时刻都不能移动到 grid 外面。
// 两个机器人最后都要到达 grid 最底下一行。
//
//
//
//
// 示例 1：
//
//
//
// 输入：grid = [[3,1,1],[2,5,1],[1,5,5],[2,1,1]]
//输出：24
//解释：机器人 1 和机器人 2 的路径在上图中分别用绿色和蓝色表示。
//机器人 1 摘的樱桃数目为 (3 + 2 + 5 + 2) = 12 。
//机器人 2 摘的樱桃数目为 (1 + 5 + 5 + 1) = 12 。
//樱桃总数为： 12 + 12 = 24 。
//
//
// 示例 2：
//
//
//
// 输入：grid = [[1,0,0,0,0,0,1],[2,0,0,0,0,3,0],[2,0,9,0,0,0,0],[0,3,0,5,4,0,0],[1
//,0,2,3,0,0,6]]
//输出：28
//解释：机器人 1 和机器人 2 的路径在上图中分别用绿色和蓝色表示。
//机器人 1 摘的樱桃数目为 (1 + 9 + 5 + 2) = 17 。
//机器人 2 摘的樱桃数目为 (1 + 3 + 4 + 3) = 11 。
//樱桃总数为： 17 + 11 = 28 。
//
//
// 示例 3：
//
// 输入：grid = [[1,0,0,3],[0,0,0,3],[0,0,3,3],[9,0,3,3]]
//输出：22
//
//
// 示例 4：
//
// 输入：grid = [[1,1],[1,1]]
//输出：4
//
//
//
//
// 提示：
//
//
// rows == grid.length
// cols == grid[i].length
// 2 <= rows, cols <= 70
// 0 <= grid[i][j] <= 100
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[][]} grid
 * @return {number}
 */
var cherryPickup = function(grid) {
    //dp[i][j][m]表示当前位置在（i，j），(i, m)最大值
    let row = grid.length
    let col = grid[0].length
    let dir = [-1, , 0, 1]
    let dp = []

    for (let i = 0; i < row; i++) {
        dp[i] = []
        for (let j = 0; j < col; j++) {
            dp[i][j] = []
            for (let m = 0; m < col; m++) {
                dp[i][j][m] = 0
            }
        }
    }
    dp[0][0][col - 1] = grid[0][0] + grid[0][col - 1]
    let res = dp[0][0][col - 1]
    for (let i = 1; i < row; i++) {
        //计算移动范围，如果向下移动了i，则左右移动肯定不超过i
        let limit = Math.min(i, col - 1)
        for (let j = 0; j <= limit; j++) {
            for (let m = col - 1 - limit; m < col; m++) {
                let max = 0
                //判断上一行数据的最大值
                for (let j1 = Math.max(j - 1, 0); j1 < Math.min(j + 2, col); j1++) {
                    for (let m1 = Math.max(m - 1, 0); m1 < Math.min(m + 2, col); m1++) {
                        max = Math.max(max, dp[i - 1][j1][m1])
                    }
                }
                dp[i][j][m] = max + grid[i][j] + grid[i][m]
                if (j == m) dp[i][j][m] -= grid[i][j]
                if (i == row - 1) res = Math.max(res, dp[i][j][m])
            }
        }
    }
    // console.log(dp)
    return res
}
//leetcode submit region end(Prohibit modification and deletion)
