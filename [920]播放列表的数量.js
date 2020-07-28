//你的音乐播放器里有 N 首不同的歌，在旅途中，你的旅伴想要听 L 首歌（不一定不同，即，允许歌曲重复）。请你为她按如下规则创建一个播放列表：
//
//
// 每首歌至少播放一次。
// 一首歌只有在其他 K 首歌播放完之后才能再次播放。
//
//
// 返回可以满足要求的播放列表的数量。由于答案可能非常大，请返回它模 10^9 + 7 的结果。
//
//
//
// 示例 1：
//
// 输入：N = 3, L = 3, K = 1
//输出：6
//解释：有 6 种可能的播放列表。[1, 2, 3]，[1, 3, 2]，[2, 1, 3]，[2, 3, 1]，[3, 1, 2]，[3, 2, 1].
//
//
// 示例 2：
//
// 输入：N = 2, L = 3, K = 0
//输出：6
//解释：有 6 种可能的播放列表。[1, 1, 2]，[1, 2, 1]，[2, 1, 1]，[2, 2, 1]，[2, 1, 2]，[1, 2, 2]
//
//
// 示例 3：
//
// 输入：N = 2, L = 3, K = 1
//输出：2
//解释：有 2 种可能的播放列表。[1, 2, 1]，[2, 1, 2]
//
//
//
//
// 提示：
//
//
// 0 <= K < N <= L <= 100
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} N
 * @param {number} L
 * @param {number} K
 * @return {number}
 */
var numMusicPlaylists = function(N, L, K) {
    //dp[i][j]表示播放列表为i选出j手符合条件歌曲数量
    // dp[i][j] = dp[i - 1][j - 1] * (N - i) + dp[i][j-1] * Math.max(i - K, 0)\
    let MOD = Math.pow(10, 9) + 7
    let dp = Array.from(new Array(N + 1), () => new Array(L + 1).fill(0))
    dp[0][0] = 1
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= L; j++) {
            //最后一首不重复
            dp[i][j] += dp[i - 1][j - 1] * (N - i + 1) //表示从i-1首歌曲中选出j-1手，最后一首的选择为n-i，因为从1开始的所以加1
            // 最后一首是重复的歌曲
            dp[i][j] += dp[i][j-1] * Math.max(i-K, 0) //表示从前面i首歌曲中选出j-1首，已选择的i首中由于k首中不重复所以i-k
            dp[i][j] %= MOD
        }
    }

    return dp[N][L]
}
//leetcode submit region end(Prohibit modification and deletion)
