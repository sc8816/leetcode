//这里有 d 个一样的骰子，每个骰子上都有 f 个面，分别标号为 1, 2, ..., f。
//
// 我们约定：掷骰子的得到总点数为各骰子面朝上的数字的总和。
//
// 如果需要掷出的总点数为 target，请你计算出有多少种不同的组合情况（所有的组合情况总共有 f^d 种），模 10^9 + 7 后返回。
//
//
//
// 示例 1：
//
// 输入：d = 1, f = 6, target = 3
//输出：1
//
//
// 示例 2：
//
// 输入：d = 2, f = 6, target = 7
//输出：6
//
//
// 示例 3：
//
// 输入：d = 2, f = 5, target = 10
//输出：1
//
//
// 示例 4：
//
// 输入：d = 1, f = 2, target = 3
//输出：0
//
//
// 示例 5：
//
// 输入：d = 30, f = 30, target = 500
//输出：222616187
//
//
//
// 提示：
//
//
// 1 <= d, f <= 30
// 1 <= target <= 1000
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} d
 * @param {number} f
 * @param {number} target
 * @return {number}
 */
var numRollsToTarget = function (d, f, target) {
    let mod = Math.pow(10, 9) + 7
    let dp = Array.from(new Array(d + 1), () => new Array(target + 1).fill(0))
    for (let i = 1; i <= f; i++) dp[1][i] = 1

    for (let i = 2; i <= d; i++) {
        for (let k = 1; k <= f; k++) {
            for (let j = 1; j <= f * d; j++) {
                if (j < k) continue
                dp[i][j] = (dp[i][j] + dp[i - 1][j - k]) % mod
            }
        }
    }

    return dp[d][target] % mod
};
//leetcode submit region end(Prohibit modification and deletion)
