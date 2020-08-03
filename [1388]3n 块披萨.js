//给你一个披萨，它由 3n 块不同大小的部分组成，现在你和你的朋友们需要按照如下规则来分披萨：
//
//
// 你挑选 任意 一块披萨。
// Alice 将会挑选你所选择的披萨逆时针方向的下一块披萨。
// Bob 将会挑选你所选择的披萨顺时针方向的下一块披萨。
// 重复上述过程直到没有披萨剩下。
//
//
// 每一块披萨的大小按顺时针方向由循环数组 slices 表示。
//
// 请你返回你可以获得的披萨大小总和的最大值。
//
//
//
// 示例 1：
//
//
//
// 输入：slices = [1,2,3,4,5,6]
//输出：10
//解释：选择大小为 4 的披萨，Alice 和 Bob 分别挑选大小为 3 和 5 的披萨。然后你选择大小为 6 的披萨，Alice 和 Bob 分别挑选大小
//为 2 和 1 的披萨。你获得的披萨总大小为 4 + 6 = 10 。
//
//
// 示例 2：
//
//
//
// 输入：slices = [8,9,8,6,1,1]
//输出：16
//解释：两轮都选大小为 8 的披萨。如果你选择大小为 9 的披萨，你的朋友们就会选择大小为 8 的披萨，这种情况下你的总和不是最大的。
//
//
// 示例 3：
//
// 输入：slices = [4,1,2,5,8,3,1,9,7]
//输出：21
//
//
// 示例 4：
//
// 输入：slices = [3,1,2]
//输出：3
//
//
//
//
// 提示：
//
//
// 1 <= slices.length <= 500
// slices.length % 3 == 0
// 1 <= slices[i] <= 1000
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} slices
 * @return {number}
 */
var maxSizeSlices = function(slices) {
    //dp[i][j]表示前i个披萨中选择了j个不连续的披萨总和为最大
    //我们在选择的过程中首尾不能同时选，我们分别去除首和尾进行选择，比较两者的最大值
    let calc = (list) => {
        let n = list.length
        let m = (n + 1) / 3
        let dp = Array.from(new Array(n + 1), () => new Array(m + 1).fill(0))

        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= m; j++) {
                dp[i][j] = Math.max(dp[i - 1][j], (i - 2 >= 0 ? dp[i - 2][j - 1] : 0) + list[i - 1]) //不能选择相邻的所以是i-2
            }
        }

        return dp[n][m]
    }

    let s1 = [...slices]
    let s2 = [...slices]
    s1.pop()
    s2.shift()
    let r1 = calc(s1)
    let r2 = calc(s2)
    return Math.max(r1, r2)
}
//leetcode submit region end(Prohibit modification and deletion)
