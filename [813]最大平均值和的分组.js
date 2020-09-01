//我们将给定的数组 A 分成 K 个相邻的非空子数组 ，我们的分数由每个子数组内的平均值的总和构成。计算我们所能得到的最大分数是多少。
//
// 注意我们必须使用 A 数组中的每一个数进行分组，并且分数不一定需要是整数。
//
//
//示例:
//输入:
//A = [9,1,2,3,9]
//K = 3
//输出: 20
//解释:
//A 的最优分组是[9], [1, 2, 3], [9]. 得到的分数是 9 + (1 + 2 + 3) / 3 + 9 = 20.
//我们也可以把 A 分成[9, 1], [2], [3, 9].
//这样的分组得到的分数为 5 + 2 + 6 = 13, 但不是最大值.
//
//
// 说明:
//
//
// 1 <= A.length <= 100.
// 1 <= A[i] <= 10000.
// 1 <= K <= A.length.
// 答案误差在 10^-6 内被视为是正确的。
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var largestSumOfAverages = function(A, K) {
    // dp[i][j]表示将前i个元素分成j个相邻的子数组，最大分数
    let sum = [0]
    let N = A.length
    let dp = Array.from(new Array(N+1), ()=>new Array(K+1).fill(0))
    for(let i=1; i<=N; i++) {
        sum[i] = sum[i-1] + A[i-1]
        dp[i][1] = sum[i]/i
    }

    for(let i=1; i<=N; i++) {
        for(let k=2; k<=K; k++) {
            for(let j=0; j<i; j++){
                dp[i][k] = Math.max(dp[j][k-1] + (sum[i]-sum[j])/(i-j), dp[i][k])
            }
        }
    }

    return dp[N][K]

};
//leetcode submit region end(Prohibit modification and deletion)
