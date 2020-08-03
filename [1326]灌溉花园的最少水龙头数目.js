//在 x 轴上有一个一维的花园。花园长度为 n，从点 0 开始，到点 n 结束。
//
// 花园里总共有 n + 1 个水龙头，分别位于 [0, 1, ..., n] 。
//
// 给你一个整数 n 和一个长度为 n + 1 的整数数组 ranges ，其中 ranges[i] （下标从 0 开始）表示：如果打开点 i 处的水龙头，可
//以灌溉的区域为 [i - ranges[i], i + ranges[i]] 。
//
// 请你返回可以灌溉整个花园的 最少水龙头数目 。如果花园始终存在无法灌溉到的地方，请你返回 -1 。
//
//
//
// 示例 1：
//
//
//
// 输入：n = 5, ranges = [3,4,1,1,0,0]
//输出：1
//解释：
//点 0 处的水龙头可以灌溉区间 [-3,3]
//点 1 处的水龙头可以灌溉区间 [-3,5]
//点 2 处的水龙头可以灌溉区间 [1,3]
//点 3 处的水龙头可以灌溉区间 [2,4]
//点 4 处的水龙头可以灌溉区间 [4,4]
//点 5 处的水龙头可以灌溉区间 [5,5]
//只需要打开点 1 处的水龙头即可灌溉整个花园 [0,5] 。
//
//
// 示例 2：
//
// 输入：n = 3, ranges = [0,0,0,0]
//输出：-1
//解释：即使打开所有水龙头，你也无法灌溉整个花园。
//
//
// 示例 3：
//
// 输入：n = 7, ranges = [1,2,1,0,2,1,0,1]
//输出：3
//
//
// 示例 4：
//
// 输入：n = 8, ranges = [4,0,0,0,0,0,0,0,4]
//输出：2
//
//
// 示例 5：
//
// 输入：n = 8, ranges = [4,0,0,0,4,0,0,0,4]
//输出：1
//
//
//
//
// 提示：
//
//
// 1 <= n <= 10^4
// ranges.length == n + 1
// 0 <= ranges[i] <= 100
//
// Related Topics 贪心算法 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @param {number[]} ranges
 * @return {number}
 */
var minTaps = function(n, ranges) {
    //dp[i]表示区间0-i灌溉所需要的最少数
    //init

    /*
    **solution 1
     */
    // let list = []
    // for (let i = 0; i < ranges.length; i++) {
    //     list.push({
    //         start: i - ranges[i],
    //         end: i + ranges[i]
    //     })
    // }
    // let m = list.length
    // let dp = new Array(n + 1).fill(Infinity)
    // dp[0] = 0
    //
    // for (let i = 0; i < n; i++) {
    //     dp[i + 1] = Infinity
    //     for (let j = 0; j < m; j++) {
    //         let { start, end } = list[j]
    //         if (start > i || end < i + 1) continue
    //         start = Math.max(start, 0)
    //         if (dp[start] != Infinity) {
    //             dp[i + 1] = Math.min(dp[i + 1], dp[start] + 1)
    //         }
    //     }
    // }
    //
    // return dp[n] != Infinity ? dp[n] : -1

    /*
    *solution 2
     */
    let dp = new Array(n + 1).fill(Infinity)
    dp[0] = 0
    for (let i = 0; i <= n; i++) {
        let left = Math.max(i - ranges[i], 0)
        let right = Math.min(i + ranges[i], n)
        for (let j = left + 1; j <= right; j++) {
            if (dp[left] != Infinity) {
                dp[j] = Math.min(dp[j], dp[left] + 1)
            }
        }
    }

    return dp[n] != Infinity ? dp[n] : -1
}
//leetcode submit region end(Prohibit modification and deletion)
