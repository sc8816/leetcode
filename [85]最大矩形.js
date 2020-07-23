//给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
//
// 示例:
//
// 输入:
//[
//  ["1","0","1","0","0"],
//  ["1","0","1","1","1"],
//  ["1","1","1","1","1"],
//  ["1","0","0","1","0"]
//]
//输出: 6
// Related Topics 栈 数组 哈希表 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalRectangle = function(matrix) {
    let m = matrix.length
    if (m == 0) return 0
    let n = matrix[0].length
    let res = 0
    if (n == 0) return 0
    let w = Array.from(new Array(m), () => Array(n).fill(0))

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (matrix[i][j] == 1) {
                if (j == 0) w[i][j] = 1
                else w[i][j] = w[i][j - 1] + 1
            } else w[i][j] = 0
            let minW = w[i][j] //记录的是当前行连续出现1的次数
            for (let up = i; up >= 0; up--) {
                let h = i - up + 1
                minW = Math.min(w[up][j], minW)//当前最小的宽度就是当前高度为h的矩形
                res = Math.max(res, minW * h)
            }
        }
    }
    return res
}
//leetcode submit region end(Prohibit modification and deletion)
