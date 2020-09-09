//有 N 堆石头排成一排，第 i 堆中有 stones[i] 块石头。
//
// 每次移动（move）需要将连续的 K 堆石头合并为一堆，而这个移动的成本为这 K 堆石头的总数。
//
// 找出把所有石头合并成一堆的最低成本。如果不可能，返回 -1 。
//
//
//
// 示例 1：
//
// 输入：stones = [3,2,4,1], K = 2
//输出：20
//解释：
//从 [3, 2, 4, 1] 开始。
//合并 [3, 2]，成本为 5，剩下 [5, 4, 1]。
//合并 [4, 1]，成本为 5，剩下 [5, 5]。
//合并 [5, 5]，成本为 10，剩下 [10]。
//总成本 20，这是可能的最小值。
//
//
// 示例 2：
//
// 输入：stones = [3,2,4,1], K = 3
//输出：-1
//解释：任何合并操作后，都会剩下 2 堆，我们无法再进行合并。所以这项任务是不可能完成的。.
//
//
// 示例 3：
//
// 输入：stones = [3,5,1,2,6], K = 3
//输出：25
//解释：
//从 [3, 5, 1, 2, 6] 开始。
//合并 [5, 1, 2]，成本为 8，剩下 [3, 8, 6]。
//合并 [3, 8, 6]，成本为 17，剩下 [17]。
//总成本 25，这是可能的最小值。
//
//
//
//
// 提示：
//
//
// 1 <= stones.length <= 30
// 2 <= K <= 30
// 1 <= stones[i] <= 100
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} stones
 * @param {number} K
 * @return {number}
 */
var mergeStones = function (stones, K) {
    //dp[i][j][k]表示区间i-j形成k堆最小的移动成本
    //dp[0][N-1][1]为所求
    //dp[i][j][1] = sum(i, j) + dp[i][j][K] 要把i-j合成一堆必须最后是K堆 再加上它们之间的和
    //dp[i][j][k] = min(dp[i][m][1]+dp[m+1][j][k-1], dp[i][j][k])

    let preSum = []
    preSum[0] = stones[0]
    let N = stones.length
    if ((N - 1) % (K - 1) != 0) return -1
    for (let i = 1; i < N; i++) {
        preSum[i] = preSum[i - 1] + stones[i]
    }
    let dp = []
    for (let i = 0; i < N; i++) {
        dp[i] = new Array()
        for (let j = 0; j < N; j++) {
            dp[i][j] = new Array()
            for (let k = 0; k <= K; k++) {
                if (i == j) dp[i][j][k] = 0 //初始化如果只有一个元素肯定是不能构成直接等于0
                else dp[i][j][k] = Infinity
            }
        }
    }
    let getSum = (i, j) => {
        return i == 0 ? preSum[j] : preSum[j] - preSum[i - 1]
    }

    for (let len = 1; len <= N; len++) {
        for (let i = 0; i < N - len + 1; i++) {
            let j = i + len - 1
            for (let k = 2; k <= K; k++) {
                for (let m = i; m < j; m = m + K - 1) {
                    dp[i][j][k] = Math.min(dp[i][j][k], dp[i][m][1] + dp[m + 1][j][k - 1])
                    dp[i][j][1] = dp[i][j][k] + getSum(i, j)
                }
            }
        }
    }

    return dp[0][N - 1][1]
}
//leetcode submit region end(Prohibit modification and deletion)
