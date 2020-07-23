//在一个大小在 (0, 0) 到 (N-1, N-1) 的2D网格 grid 中，除了在 mines 中给出的单元为 0，其他每个单元都是 1。网格中包含 1
// 的最大的轴对齐加号标志是多少阶？返回加号标志的阶数。如果未找到加号标志，则返回 0。
//
// 一个 k" 阶由 1 组成的“轴对称”加号标志具有中心网格 grid[x][y] = 1 ，以及4个从中心向上、向下、向左、向右延伸，长度为 k-1，由
//1 组成的臂。下面给出 k" 阶“轴对称”加号标志的示例。注意，只有加号标志的所有网格要求为 1，别的网格可能为 0 也可能为 1。
//
//
//
// k 阶轴对称加号标志示例:
//
//
//阶 1:
//000
//010
//000
//
//阶 2:
//00000
//00100
//01110
//00100
//00000
//
//阶 3:
//0000000
//0001000
//0001000
//0111110
//0001000
//0001000
//0000000
//
//
//
//
// 示例 1：
//
//
//输入: N = 5, mines = [[4, 2]]
//输出: 2
//解释:
//
//11111
//11111
//11111
//11111
//11011
//
//在上面的网格中，最大加号标志的阶只能是2。一个标志已在图中标出。
//
//
//
//
// 示例 2：
//
//
//输入: N = 2, mines = []
//输出: 1
//解释:
//
//11
//11
//
//没有 2 阶加号标志，有 1 阶加号标志。
//
//
//
//
// 示例 3：
//
//
//输入: N = 1, mines = [[0, 0]]
//输出: 0
//解释:
//
//0
//
//没有加号标志，返回 0 。
//
//
//
//
// 提示：
//
//
// 整数N 的范围： [1, 500].
// mines 的最大长度为 5000.
// mines[i] 是长度为2的由2个 [0, N-1] 中的数组成.
// (另外,使用 C, C++, 或者 C# 编程将以稍小的时间限制进行判断.)
//
//
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} N
 * @param {number[][]} mines
 * @return {number}
 */
var orderOfLargestPlusSign = function(N, mines) {
    let grid = Array.from(new Array(N), () => new Array(N).fill(1))
    let dp = new Array()
    let res = 0
    /*
    * dp[i][j][0] =
     */

    for (let [x, y] of mines) {
        grid[x][y] = 0
    }

    for (let i = 0; i <= N; i++) {
        dp[i] = new Array()
        for (let j = 0; j <= N; j++) {
            dp[i][j] = new Array()
            for (let k = 0; k < 4; k++) {
                dp[i][j][k] = 0
            }
        }
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (grid[i][j] == 0) continue
            dp[i][j][0] = i == 0 ? 1 : 1 + dp[i - 1][j][0]
            dp[i][j][1] = j == 0 ? 1 : 1 + dp[i][j - 1][1]
        }
    }

    for (let i = N - 1; i >= 0; i--) {
        for (let j = N - 1; j >= 0; j--) {
            if (grid[i][j] == 0) continue
            dp[i][j][2] = i == (N - 1) ? 1 : 1 + dp[i + 1][j][2]
            dp[i][j][3] = j == (N - 1) ? 1 : 1 + dp[i][j + 1][3]
        }
    }

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (grid[i][j] == 0) continue
            res = Math.max(res, Math.min(...dp[i][j]))
        }
    }

    return res
}
//leetcode submit region end(Prohibit modification and deletion)
