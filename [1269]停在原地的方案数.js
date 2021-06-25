//有一个长度为 arrLen 的数组，开始有一个指针在索引 0 处。
//
// 每一步操作中，你可以将指针向左或向右移动 1 步，或者停在原地（指针不能被移动到数组范围外）。
//
// 给你两个整数 steps 和 arrLen ，请你计算并返回：在恰好执行 steps 次操作以后，指针仍然指向索引 0 处的方案数。
//
// 由于答案可能会很大，请返回方案数 模 10^9 + 7 后的结果。
//
//
//
// 示例 1：
//
// 输入：steps = 3, arrLen = 2
//输出：4
//解释：3 步后，总共有 4 种不同的方法可以停在索引 0 处。
//向右，向左，不动
//不动，向右，向左
//向右，不动，向左
//不动，不动，不动
//
//
// 示例 2：
//
// 输入：steps = 2, arrLen = 4
//输出：2
//解释：2 步后，总共有 2 种不同的方法可以停在索引 0 处。
//向右，向左
//不动，不动
//
//
// 示例 3：
//
// 输入：steps = 4, arrLen = 2
//输出：8
//
//
//
//
// 提示：
//
//
// 1 <= steps <= 500
// 1 <= arrLen <= 10^6
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} steps
 * @param {number} arrLen
 * @return {number}
 */
// var numWays = function (steps, arrLen) {
//     arrLen = Math.min(arrLen, steps + 1) //由于最多只能走到step 所以我们需要判断当前能达到的最大位置
//     let dp = Array.from(new Array(steps + 1), () => new Array(arrLen).fill(0))
//     // dp[i][j]移动i次位置在j的次数
//     //dp[i][j] = dp[i-1][j-1] + dp[i-1][j+1] + dp[i-1][j]
//     dp[0][0] = 1
//     let MOD = Math.pow(10, 9) + 7
//     for (let j = 1; j < arrLen; j++) dp[0][j] = 0
//     for (let i = 1; i <= steps; i++) {
//         for (let j = 0; j < arrLen; j++) {
//             if (j > i) continue
//             for (let k = -1; k <= 1; k++) {
//                 if (j - k < arrLen && j - k >= 0) {
//                     dp[i][j] = (dp[i][j] + dp[i - 1][j - k]) % MOD
//                 }
//             }
//         }
//     }
//
//     return dp[steps][0] % MOD
// }

var numWays = function (steps, arrLen) {
    arrLen = Math.min(steps, arrLen)
    let dp = Array.from(new Array(steps + 1), () => new Array(arrLen).fill(0))
    for (let j = 1; j < arrLen; j++) dp[0][j] = 0
    dp[0][0] = 1
    let mod = Math.pow(10, 9) + 7
    for (let i = 1; i <= steps; i++) {
        for (let j = 0; j < arrLen; j++) {
            if (j > i) continue
            for (let k = -1; k <= 1; k++) {
                if (j - k < arrLen && j - k >= 0) {
                    dp[i][j] = (dp[i][j] + dp[i - 1][j - k]) % mod
                }
            }
        }
    }

    return dp[steps][0] % mod
}
//leetcode submit region end(Prohibit modification and deletion)
