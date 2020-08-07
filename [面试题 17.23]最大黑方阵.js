//给定一个方阵，其中每个单元(像素)非黑即白。设计一个算法，找出 4 条边皆为黑色像素的最大子方阵。
//
// 返回一个数组 [r, c, size] ，其中 r, c 分别代表子方阵左上角的行号和列号，size 是子方阵的边长。若有多个满足条件的子方阵，返回 r
//最小的，若 r 相同，返回 c 最小的子方阵。若无满足条件的子方阵，返回空数组。
//
// 示例 1:
//
// 输入:
//[
//   [1,0,1],
//   [0,0,1],
//   [0,0,1]
//]
//输出: [1,0,2]
//解释: 输入中 0 代表黑色，1 代表白色，标粗的元素即为满足条件的最大子方阵
//
//
// 示例 2:
//
// 输入:
//[
//   [0,1,1],
//   [1,0,1],
//   [1,1,0]
//]
//输出: [0,0,1]
//
//
// 提示：
//
//
// matrix.length == matrix[0].length <= 200
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var findSquare = function(matrix) {
    let row = matrix.length
    let col = matrix[0].length
    if (row == 0) return []
    let preRowSum = Array.from(new Array(row + 1), () => new Array(col + 1).fill(0))
    let preColSum = Array.from(new Array(row + 1), () => new Array(col + 1).fill(0))
    for (let i = row - 1; i >= 0; i--) {
        for (let j = col - 1; j >= 0; j--) {
            if (matrix[i][j] == 0) {
                preColSum[i][j] = 1 + preColSum[i + 1][j]
                preRowSum[i][j] = 1 + preRowSum[i][j + 1]
            }
        }
    }
    let res = []
    for (let i = 0; i < row; i++) {
        for (let j = 0; j < col; j++) {
            if (matrix[i][j] == 0) {
                maxSize = Math.min(preRowSum[i][j], preColSum[i][j])
                let curSize = res.length ? res[2] : 0
                for (let size = maxSize; size > curSize; size--) {
                    if (preColSum[i][j + size - 1] >= size && preRowSum[i + size - 1][j] >= size) { //在已知两条边确定了最大的正方行后判断另外两条边最大的长度
                        res = [i, j, size]
                        break
                    }
                }
            }
        }
    }

    return res
}
//leetcode submit region end(Prohibit modification and deletion)
