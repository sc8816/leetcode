//给出矩阵 matrix 和目标值 target，返回元素总和等于目标值的非空子矩阵的数量。
//
// 子矩阵 x1, y1, x2, y2 是满足 x1 <= x <= x2 且 y1 <= y <= y2 的所有单元 matrix[x][y] 的集合。
//
//
// 如果 (x1, y1, x2, y2) 和 (x1', y1', x2', y2') 两个子矩阵中部分坐标不同（如：x1 != x1'），那么这两个子矩阵
//也不同。
//
//
//
// 示例 1：
//
// 输入：matrix = [[0,1,0],[1,1,1],[0,1,0]], target = 0
//输出：4
//解释：四个只含 0 的 1x1 子矩阵。
//
//
// 示例 2：
//
// 输入：matrix = [[1,-1],[-1,1]], target = 0
//输出：5
//解释：两个 1x2 子矩阵，加上两个 2x1 子矩阵，再加上一个 2x2 子矩阵。
//
//
//
//
// 提示：
//
//
// 1 <= matrix.length <= 300
// 1 <= matrix[0].length <= 300
// -1000 <= matrix[i] <= 1000
// -10^8 <= target <= 10^8
//
// Related Topics 数组 动态规划 Sliding Window


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {number}
 */
var numSubmatrixSumTarget = function(matrix, target) {
    let m = matrix.length
    let n = matrix[0].length
    //dp[i][j]表示从顶点到(i, j)矩阵的和
    let dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(0))
    let res = 0

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            dp[i][j] = dp[i - 1][j] + dp[i][j - 1] + matrix[i - 1][j - 1] - dp[i - 1][j - 1]
        }
    }

    for (let x = 1; x <= m; x++) {
        for (let y = 1; y <= n; y++) {
            for (let i = 1; i <= x; i++) {
                for (let j = 1; j <= y; j++) {
                    let sum = dp[x][y] - dp[i - 1][y] - dp[x][j - 1] + dp[i - 1][j - 1]
                    if (sum == target) res++
                }
            }
        }
    }
    return res
}
//leetcode submit region end(Prohibit modification and deletion)
