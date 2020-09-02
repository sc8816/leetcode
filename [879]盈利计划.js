//帮派里有 G 名成员，他们可能犯下各种各样的罪行。
//
// 第 i 种犯罪会产生 profit[i] 的利润，它要求 group[i] 名成员共同参与。
//
// 让我们把这些犯罪的任何子集称为盈利计划，该计划至少产生 P 的利润。
//
// 有多少种方案可以选择？因为答案很大，所以返回它模 10^9 + 7 的值。
//
//
//
// 示例 1：
//
// 输入：G = 5, P = 3, group = [2,2], profit = [2,3]
//输出：2
//解释：
//至少产生 3 的利润，该帮派可以犯下罪 0 和罪 1 ，或仅犯下罪 1 。
//总的来说，有两种方案。
//
//
// 示例 2:
//
// 输入：G = 10, P = 5, group = [2,3,5], profit = [6,7,8]
//输出：7
//解释：
//至少产生 5 的利润，只要他们犯其中一种罪就行，所以该帮派可以犯下任何罪行 。
//有 7 种可能的计划：(0)，(1)，(2)，(0,1)，(0,2)，(1,2)，以及 (0,1,2) 。
//
//
//
//
// 提示：
//
//
// 1 <= G <= 100
// 0 <= P <= 100
// 1 <= group[i] <= 100
// 0 <= profit[i] <= 100
// 1 <= group.length = profit.length <= 100
//
//
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} G
 * @param {number} P
 * @param {number[]} group
 * @param {number[]} profit
 * @return {number}
 */
var profitableSchemes = function(G, P, group, profit) {
    //dp[i][j][k] 表示前i个收益 j个人产生利润最少为k的 计划数
    // let MOD = Math.pow(10, 9) + 7
    // let N = profit.length
    // let dp = []
    // for (let i = 0; i <= N; i++) {
    //     dp[i] = []
    //     for (let j = 0; j <= G; j++) {
    //         dp[i][j] = []
    //         for (let k = 0; k <= P; k++) {
    //             if (k == 0) dp[i][j][k] = 1
    //             else dp[i][j][k] = 0
    //         }
    //     }
    // }
    //
    // for (let i = 1; i <= N; i++) {
    //     let g = group[i - 1]
    //     let p = profit[i - 1]
    //     for (let j = 1; j <= G; j++) {
    //         for (let k = 0; k <= P; k++) {
    //             dp[i][j][k] = dp[i - 1][j][k]
    //             if (j - g >= 0) {
    //                 dp[i][j][k] += dp[i - 1][j - g][Math.max(k - p, 0)]
    //             }
    //             dp[i][j][k] %= MOD
    //         }
    //     }
    // }
    //
    // return dp[N][G][P]

    //二维优化
    let N = profit.length
    let dp = Array.from(new Array(G + 1), () => new Array(P + 1).fill(0))
    for (let i = 0; i <= G; i++) dp[i][0] = 1
    let MOD = Math.pow(10, 9) + 7

    for (let i = 0; i <= N; i++) {
        let g = group[i - 1]
        let p = profit[i - 1]
        for (let j = G; j >= g; j--) {
            for (let k = 0; k <= P; k++) {
                dp[j][k] += dp[j - g][Math.max(0, k - p)]
                dp[j][k] %= MOD
            }
        }
    }

    return dp[G][P]
}
//leetcode submit region end(Prohibit modification and deletion)
