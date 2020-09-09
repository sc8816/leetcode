//你是一位施工队的工长，根据设计师的要求准备为一套设计风格独特的房子进行室内装修。
//
// 房子的客厅大小为 n x m，为保持极简的风格，需要使用尽可能少的 正方形 瓷砖来铺盖地面。
//
// 假设正方形瓷砖的规格不限，边长都是整数。
//
// 请你帮设计师计算一下，最少需要用到多少块方形瓷砖？
//
//
//
// 示例 1：
//
//
//
// 输入：n = 2, m = 3
//输出：3
//解释：3 块地砖就可以铺满卧室。
//     2 块 1x1 地砖
//     1 块 2x2 地砖
//
// 示例 2：
//
//
//
// 输入：n = 5, m = 8
//输出：5
//
//
// 示例 3：
//
//
//
// 输入：n = 11, m = 13
//输出：6
//
//
//
//
// 提示：
//
//
// 1 <= n <= 13
// 1 <= m <= 13
//
// Related Topics 动态规划 回溯算法


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @param {number} m
 * @return {number}
 */
// var tilingRectangle = function (n, m) {
//     let vis = new Map()
//     let dfs = (n, m) => {
//         if (m == 0 || n == 0) return 0
//         if (n == m) return 1
//         if (n > m) [m, n] = [n, m]
//         // console.log(m,n)
//         let key = `${m}-${n}`
//         if (vis.has(key)) return vis.get(key)
//         let res = n * m
//         for (let a = 1; a < n; a++) {
//             for (let b = 1; b < m; b++) {
//                 for (let c = 1; c < n; c++) {
//                     for (let d = 1; d < m; d++) {
//                         if ((a - n + c >= 0) && (d - m + b >= 0)) {
//                             res = Math.min(res, dfs(a, m - d) + dfs(b, n - a) + dfs(c, m - b) + dfs(n - c, d) + dfs(a - n + c, d - m + b))
//                         }
//                     }
//                 }
//             }
//         }
//         res = Math.min(res, dfs(n, m - n) + 1)
//         vis.set(key, res)
//         return res
//     }
//
//     return dfs(n, m)
// }
var tilingRectangle = function (n, m) {
    //dp[i][j]表示宽为i 高为j，最少需要多少块瓷砖
    let dp = Array.from(new Array(n + 1), () => new Array(m + 1).fill(Infinity))

    for (let i = 1; i <= n; i++) {
        for (let j = 1; j <= m; j++) {
            if (i == j) {
                dp[i][j] = 1
                continue
            }
            for (let k = 1; k < i; k++) { //横切
                dp[i][j] = Math.min(dp[i][j], dp[k][j] + dp[i - k][j])
            }
            for (let k = 1; k < j; k++) { //竖切
                dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[i][j - k])
            }
            for (let k = 1; k < Math.min(i, j); k++) { //横竖切
                for (let m = 1; m <= k; m++) {
                    if (k - m <= 0 || i - k <= 0 || j - k <= 0 || i - k - m <= 0 || j - k + m <= 0) continue
                    dp[i][j] = Math.min(dp[i][j], 2 + dp[i - k][k - m] + dp[i - k - m][j - k + m] + dp[k + m][j - k])
                }
            }
        }
    }

    return dp[n][m]
}
//leetcode submit region end(Prohibit modification and deletion)
