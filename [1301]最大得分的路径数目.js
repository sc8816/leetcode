//给你一个正方形字符数组 board ，你从数组最右下方的字符 'S' 出发。
//
// 你的目标是到达数组最左上角的字符 'E' ，数组剩余的部分为数字字符 1, 2, ..., 9 或者障碍 'X'。在每一步移动中，你可以向上、向左或者左上
//方移动，可以移动的前提是到达的格子没有障碍。
//
// 一条路径的 「得分」 定义为：路径上所有数字的和。
//
// 请你返回一个列表，包含两个整数：第一个整数是 「得分」 的最大值，第二个整数是得到最大得分的方案数，请把结果对 10^9 + 7 取余。
//
// 如果没有任何路径可以到达终点，请返回 [0, 0] 。
//
//
//
// 示例 1：
//
//
//输入：board = ["E23","2X2","12S"]
//输出：[7,1]
//
//
// 示例 2：
//
//
//输入：board = ["E12","1X1","21S"]
//输出：[4,2]
//
//
// 示例 3：
//
//
//输入：board = ["E11","XXX","11S"]
//输出：[0,0]
//
//
//
//
// 提示：
//
//
// 2 <= board.length == board[i].length <= 100
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string[]} board
 * @return {number[]}
 */
var pathsWithMaxScore = function(board) {
    let M = board.length
    let MOD = Math.pow(10, 9) + 7
    let N = board[0].length
    let dpScore = Array.from(new Array(M + 1), () => new Array(N + 1).fill(0))
    let dpPath = Array.from(new Array(M + 1), () => new Array(N + 1).fill(0))
    //从右下往上走
    dpPath[M - 1][N - 1] = 1

    for (let i = M - 1; i >= 0; i--) {
        for (let j = N - 1; j >= 0; j--) {
            //只要存在一条路径能够到达该点
            if (board[i][j] != 'X' && (dpPath[i + 1][j] != 0 || dpPath[i + 1][j + 1] != 0 || dpPath[i][j + 1] != 0)) {
                let maxScore = Math.max(dpScore[i + 1][j], dpScore[i][j + 1], dpScore[i + 1][j + 1])
                if (board[i][j] != 'E') dpScore[i][j] = maxScore + (board[i][j] - '0') //当前未到达起点
                else dpScore[i][j] = maxScore //到达起点的时候
                if (maxScore == dpScore[i + 1][j]) dpPath[i][j] = (dpPath[i][j] + dpPath[i + 1][j]) % MOD
                if (maxScore == dpScore[i + 1][j + 1]) dpPath[i][j] = (dpPath[i][j] + dpPath[i + 1][j + 1]) % MOD
                if (maxScore == dpScore[i][j + 1]) dpPath[i][j] = (dpPath[i][j] + dpPath[i][j + 1]) % MOD
            }
        }
    }
    return [dpScore[0][0], dpPath[0][0]]
}
//leetcode submit region end(Prohibit modification and deletion)
