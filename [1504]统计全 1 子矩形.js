//给你一个只包含 0 和 1 的 rows * columns 矩阵 mat ，请你返回有多少个 子矩形 的元素全部都是 1 。
//
//
//
// 示例 1：
//
//
//输入：mat = [[1,0,1],
//            [1,1,0],
//            [1,1,0]]
//输出：13
//解释：
//有 6 个 1x1 的矩形。
//有 2 个 1x2 的矩形。
//有 3 个 2x1 的矩形。
//有 1 个 2x2 的矩形。
//有 1 个 3x1 的矩形。
//矩形数目总共 = 6 + 2 + 3 + 1 + 1 = 13 。
//
//
// 示例 2：
//
//
//输入：mat = [[0,1,1,0],
//            [0,1,1,1],
//            [1,1,1,0]]
//输出：24
//解释：
//有 8 个 1x1 的子矩形。
//有 5 个 1x2 的子矩形。
//有 2 个 1x3 的子矩形。
//有 4 个 2x1 的子矩形。
//有 2 个 2x2 的子矩形。
//有 2 个 3x1 的子矩形。
//有 1 个 3x2 的子矩形。
//矩形数目总共 = 8 + 5 + 2 + 4 + 2 + 2 + 1 = 24 。
//
//
// 示例 3：
//
//
//输入：mat = [[1,1,1,1,1,1]]
//输出：21
//
//
// 示例 4：
//
//
//输入：mat = [[1,0,1],[0,1,0],[1,0,1]]
//输出：5
//
//
//
//
// 提示：
//
//
// 1 <= rows <= 150
// 1 <= columns <= 150
// 0 <= mat[i][j] <= 1
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[][]} mat
 * @return {number}
 */
var numSubmat = function(mat) {
    let m = mat.length
    let n = mat[0].length
    let res = 0
    let dp = Array.from(new Array(m + 1), () => new Array(n + 1).fill(0))
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            //当前点作为右下点分别往上，往左查找
            if (mat[i - 1][j - 1]) {
                //往左边查找
                dp[i][j] = dp[i][j-1] + 1
                res += dp[i][j]
                //往上查找
                let min = dp[i][j]
                for (let k = i-1; k >= 0; k--) {
                    min = Math.min(dp[k][j], min)
                    res += min
                }
            }
        }
    }

    return res
}
//leetcode submit region end(Prohibit modification and deletion)
