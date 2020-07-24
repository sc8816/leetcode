//你将获得 K 个鸡蛋，并可以使用一栋从 1 到 N 共有 N 层楼的建筑。
//
// 每个蛋的功能都是一样的，如果一个蛋碎了，你就不能再把它掉下去。
//
// 你知道存在楼层 F ，满足 0 <= F <= N 任何从高于 F 的楼层落下的鸡蛋都会碎，从 F 楼层或比它低的楼层落下的鸡蛋都不会破。
//
// 每次移动，你可以取一个鸡蛋（如果你有完整的鸡蛋）并把它从任一楼层 X 扔下（满足 1 <= X <= N）。
//
// 你的目标是确切地知道 F 的值是多少。
//
// 无论 F 的初始值如何，你确定 F 的值的最小移动次数是多少？
//
//
//
//
//
//
// 示例 1：
//
// 输入：K = 1, N = 2
//输出：2
//解释：
//鸡蛋从 1 楼掉落。如果它碎了，我们肯定知道 F = 0 。
//否则，鸡蛋从 2 楼掉落。如果它碎了，我们肯定知道 F = 1 。
//如果它没碎，那么我们肯定知道 F = 2 。
//因此，在最坏的情况下我们需要移动 2 次以确定 F 是多少。
//
//
// 示例 2：
//
// 输入：K = 2, N = 6
//输出：3
//
//
// 示例 3：
//
// 输入：K = 3, N = 14
//输出：4
//
//
//
//
// 提示：
//
//
// 1 <= K <= 100
// 1 <= N <= 10000
//
// Related Topics 数学 二分查找 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} K
 * @param {number} N
 * @return {number}
 */
var superEggDrop = function(K, N) {
    // dp[i][j]表示i层楼k个鸡蛋确定F的最小次数
    if (N == 1) return 1
    if (K == 1) return N
    let dp = Array.from(new Array(N + 1), () => new Array(K + 1).fill(0))
    for (let i = 1; i <= N; i++) dp[i][1] = i
    for (let k = 1; k <= K; k++) dp[1][k] = 1
    //
    // // js 超时
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= K; j++) {
            for (let k = 1; k <= i; k++) {
                if (dp[i][j] == 0) dp[i][j] = Infinity
                dp[i][j] = Math.min(dp[i][j], Math.max(dp[k - 1][j - 1], dp[i - k][j]) + 1)
            }
        }
    }
    // for (let i = 2; i <= N; i++) {
    //     for (let j = 2; j <= K; j++) {
    //         let start = 1, end = i, mid
    //         let res = Infinity
    //         while (start <= end) {
    //             mid = start + Math.floor(end - start)
    //             if (dp[mid - 1][j - 1] == dp [i - mid][j]) {
    //                 res = Math.min(res, dp[mid - 1][j - 1] + 1)
    //                 break
    //             } else if (dp[mid - 1][j - 1] > dp[i - mid][j]) {
    //                 end = mid - 1
    //                 res = Math.min(res, dp[mid - 1][j - 1] + 1)
    //             } else {
    //                 start = mid + 1
    //                 res = Math.min(res, dp[i - mid][j] + 1)
    //             }
    //         }
    //         dp[i][j] = res
    //     }
    // }
    /*
    dp[i][j]表示j个鸡蛋尝试i次能确定的最高楼层
     */
    // for (let i = 1; i <= N; i++) {
    //     for (let j = 1; j <= K; j++) {
    //         dp[i][j] = dp[i - 1][j] + dp[i - 1][j - 1] + 1
    //         if (dp[i][j] >= N) return i
    //     }
    // }
    //
    // return N

    return dp[N][K]
}
//leetcode submit region end(Prohibit modification and deletion)
