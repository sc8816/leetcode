//给你三个整数 n、m 和 k 。下图描述的算法用于找出正整数数组中最大的元素。
//
//
//
// 请你生成一个具有下述属性的数组 arr ：
//
//
// arr 中有 n 个整数。
// 1 <= arr[i] <= m 其中 (0 <= i < n) 。
// 将上面提到的算法应用于 arr ，search_cost 的值等于 k 。
//
//
// 返回上述条件下生成数组 arr 的 方法数 ，由于答案可能会很大，所以 必须 对 10^9 + 7 取余。
//
//
//
// 示例 1：
//
// 输入：n = 2, m = 3, k = 1
//输出：6
//解释：可能的数组分别为 [1, 1], [2, 1], [2, 2], [3, 1], [3, 2] [3, 3]
//
//
// 示例 2：
//
// 输入：n = 5, m = 2, k = 3
//输出：0
//解释：没有数组可以满足上述条件
//
//
// 示例 3：
//
// 输入：n = 9, m = 1, k = 1
//输出：1
//解释：可能的数组只有 [1, 1, 1, 1, 1, 1, 1, 1, 1]
//
//
// 示例 4：
//
// 输入：n = 50, m = 100, k = 25
//输出：34549172
//解释：不要忘了对 1000000007 取余
//
//
// 示例 5：
//
// 输入：n = 37, m = 17, k = 7
//输出：418930126
//
//
//
//
// 提示：
//
//
// 1 <= n <= 50
// 1 <= m <= 100
// 0 <= k <= n
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @param {number} m
 * @param {number} k
 * @return {number}
 */
var numOfArrays = function(N, M, K) {
    //dp[i][j][k]表示数组长度为i，最大值为j，搜寻值为k的数组个数
    /*
    1.最后一个是最大值 dp[i][j][k] = dp[i-1][j-1][q] (q=0,1,...k−1)
    2.最后不是最大值 dp[i][j][k] = dp[i-1][j][k] * (k+1)
    1+2 为所求
     */

    let dp = []
    for (let i = 0; i <= N; i++) {
        dp[i] = []
        for (let j = 0; j <= M; j++) {
            dp[i][j] = []
            for (let k = 0; k <= K; k++) {
                dp[i][j][k] = 0
            }
        }
    }
    // let dp = new Array(N+1).fill(new Array(M+1).fill(new Array(K+1).fill(0)))
    // console.log(dp)
    let MOD = Math.pow(10, 9) + 7
    let res = 0
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= M; j++) {
            for (let k = 1; k <= K; k++) {
                if (i == 1 && k == 1) {
                    dp[1][j][1] = 1
                    continue
                }
                dp[i][j][k] += j * dp[i - 1][j][k] % MOD
                for (let m = 1; m < j; m++) {
                    dp[i][j][k] += dp[i - 1][m][k - 1]
                    dp[i][j][k] %= MOD
                }
            }
        }
    }
    // console.log(dp)
    for (let i = 1; i <= M; i++) res = (res + dp[N][i][K]) % MOD
    return res
}
//leetcode submit region end(Prohibit modification and deletion)
