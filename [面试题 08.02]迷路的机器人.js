//设想有个机器人坐在一个网格的左上角，网格 r 行 c 列。机器人只能向下或向右移动，但不能走到一些被禁止的网格（有障碍物）。设计一种算法，寻找机器人从左上角
//移动到右下角的路径。
//
//
//
// 网格中的障碍物和空位置分别用 1 和 0 来表示。
//
// 返回一条可行的路径，路径由经过的网格的行号和列号组成。左上角为 0 行 0 列。如果没有可行的路径，返回空数组。
//
// 示例 1:
//
// 输入:
//[
//  [0,0,0],
//  [0,1,0],
//  [0,0,0]
//]
//输出: [[0,0],[0,1],[0,2],[1,2],[2,2]]
//解释:
//输入中标粗的位置即为输出表示的路径，即
//0行0列（左上角） -> 0行1列 -> 0行2列 -> 1行2列 -> 2行2列（右下角）
//
// 说明：r 和 c 的值均不超过 100。
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[][]} obstacleGrid
 * @return {number[][]}
 */
var pathWithObstacles = function(grid) {
    let m = grid.length
    let n = grid[0].length
    let res = []
    if (grid[m - 1][n - 1] == 1 || grid[0][0] == 1 || m == 0 || n == 0) return res
    let dp = Array.from(new Array(m), () => new Array(n).fill(false))
    dp[0][0] = true
    //初始化
    for (let i = 1; i < m; i++) {
        if (grid[i][0] == 1) {
            dp[i][0] = false
        } else {
            dp[i][0] = dp[i - 1][0]
        }
    }

    for (let j = 1; j < n; j++) {
        if (grid[0][j] == 1) {
            dp[0][j] = false
        } else {
            dp[0][j] = dp[0][j - 1]
        }
    }

    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            if (grid[i][j] == 0) {
                dp[i][j] = dp[i - 1][j] || dp[i][j - 1]
            }
        }
    }

    if (!dp[m - 1][n - 1]) return res

    let x = m - 1, y = n - 1
    while (x !== 0 || y !== 0) {
        res.unshift([x, y])
        if (x > 0 && dp[x - 1][y]) {
            x--
        } else if (y > 0 && dp[x][y - 1]) {
            y--
        }
    }
    res.unshift([0, 0])
    console.log(dp)
    return res
}
//leetcode submit region end(Prohibit modification and deletion)
