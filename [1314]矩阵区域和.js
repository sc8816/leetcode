//给你一个 m * n 的矩阵 mat 和一个整数 K ，请你返回一个矩阵 answer ，其中每个 answer[i][j] 是所有满足下述条件的元素 ma
//t[r][c] 的和：
//
//
// i - K <= r <= i + K, j - K <= c <= j + K
// (r, c) 在矩阵内。
//
//
//
//
// 示例 1：
//
// 输入：mat = [[1,2,3],[4,5,6],[7,8,9]], K = 1
//输出：[[12,21,16],[27,45,33],[24,39,28]]
//
//
// 示例 2：
//
// 输入：mat = [[1,2,3],[4,5,6],[7,8,9]], K = 2
//输出：[[45,45,45],[45,45,45],[45,45,45]]
//
//
//
//
// 提示：
//
//
// m == mat.length
// n == mat[i].length
// 1 <= m, n, K <= 100
// 1 <= mat[i][j] <= 100
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[][]} mat
 * @param {number} K
 * @return {number[][]}
 */
var matrixBlockSum = function(mat, K) {
    let m = mat.length
    let n = mat[0].length
    let res = Array.from(new Array(m), () => new Array(n).fill(0))
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            let x = i - K <= 0 ? 0 : i - K
            let y = j - K <= 0 ? 0 : j - K
            for (let a = x; a <= i + K && a < m; a++) {
                for (let b = y; b <= j + K && b < n; b++) {
                    res[i][j] += mat[a][b]
                }
            }
        }
    }
    // console.log(res)
    return res
}
//leetcode submit region end(Prohibit modification and deletion)
