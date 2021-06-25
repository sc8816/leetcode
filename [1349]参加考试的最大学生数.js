//给你一个 m * n 的矩阵 seats 表示教室中的座位分布。如果座位是坏的（不可用），就用 '#' 表示；否则，用 '.' 表示。
//
// 学生可以看到左侧、右侧、左上、右上这四个方向上紧邻他的学生的答卷，但是看不到直接坐在他前面或者后面的学生的答卷。请你计算并返回该考场可以容纳的一起参加考试
//且无法作弊的最大学生人数。
//
// 学生必须坐在状况良好的座位上。
//
//
//
// 示例 1：
//
//
//
// 输入：seats = [["#",".","#","#",".","#"],
//              [".","#","#","#","#","."],
//              ["#",".","#","#",".","#"]]
//输出：4
//解释：教师可以让 4 个学生坐在可用的座位上，这样他们就无法在考试中作弊。
//
//
// 示例 2：
//
// 输入：seats = [[".","#"],
//              ["#","#"],
//              ["#","."],
//              ["#","#"],
//              [".","#"]]
//输出：3
//解释：让所有学生坐在可用的座位上。
//
//
// 示例 3：
//
// 输入：seats = [["#",".",".",".","#"],
//              [".","#",".","#","."],
//              [".",".","#",".","."],
//              [".","#",".","#","."],
//              ["#",".",".",".","#"]]
//输出：10
//解释：让学生坐在第 1、3 和 5 列的可用座位上。
//
//
//
//
// 提示：
//
//
// seats 只包含字符 '.' 和'#'
// m == seats.length
// n == seats[i].length
// 1 <= m <= 8
// 1 <= n <= 8
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {character[][]} seats
 * @return {number}
 */
var maxStudents = function (seats) {
    let m = seats.length
    let n = seats[0].length
    let dp = Array.from(new Array(m), () => new Array(1 << n).fill(0))
    let ans = 0
    //判断当前状态是否有效
    let valid = (k, pos) => {
        let i = 0
        while (k) {
            let a = k % 2
            //当前已选择，并且当前座位不可选
            if (a == 1 && seats[pos][i] == '#') return false
            k >>= 1
            i++
        }
        return true
    }
    //判断当前是否选择了相邻的
    let ok = (pos) => {
        let pre = 0
        while (pos) {
            let a = pos % 2
            if (a == 1 && pre == 1) return false //两个相邻的1
            if (a == 1) pre = 1
            else pre = 0
            pos >>= 1
        }
        return true
    }

    //计算当前状态选择的数量
    let count = (pos) => {
        let res = 0
        while (pos) {
            let a = pos % 2
            if (a == 1) res++
            pos >>= 1
        }
        return res
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < (1 << n); j++) {
            if (!valid(j, i) || !ok(j)) continue
            let num = count(j)
            if (i == 0) dp[i][j] = num
            else {
                for (let k = 0; k < 1 << n; k++) {
                    if (ok(j | k)) {
                        dp[i][j] = Math.max(dp[i][j], dp[i - 1][k] + num)
                    }
                }
            }
            ans = Math.max(ans, dp[i][j])
        }
    }
    return ans
};
//leetcode submit region end(Prohibit modification and deletion)
