//给你一个整数数组 arr 和一个整数值 target 。
//
// 请你在 arr 中找 两个互不重叠的子数组 且它们的和都等于 target 。可能会有多种方案，请你返回满足要求的两个子数组长度和的 最小值 。
//
// 请返回满足要求的最小长度和，如果无法找到这样的两个子数组，请返回 -1 。
//
//
//
// 示例 1：
//
// 输入：arr = [3,2,2,4,3], target = 3
//输出：2
//解释：只有两个子数组和为 3 （[3] 和 [3]）。它们的长度和为 2 。
//
//
// 示例 2：
//
// 输入：arr = [7,3,4,7], target = 7
//输出：2
//解释：尽管我们有 3 个互不重叠的子数组和为 7 （[7], [3,4] 和 [7]），但我们会选择第一个和第三个子数组，因为它们的长度和 2 是最小值。
//
//
// 示例 3：
//
// 输入：arr = [4,3,2,6,2,3,4], target = 6
//输出：-1
//解释：我们只有一个和为 6 的子数组。
//
//
// 示例 4：
//
// 输入：arr = [5,5,4,4,5], target = 3
//输出：-1
//解释：我们无法找到和为 3 的子数组。
//
//
// 示例 5：
//
// 输入：arr = [3,1,1,1,5,1,2,1], target = 3
//输出：3
//解释：注意子数组 [1,2] 和 [2,1] 不能成为一个方案因为它们重叠了。
//
//
//
//
// 提示：
//
//
// 1 <= arr.length <= 10^5
// 1 <= arr[i] <= 1000
// 1 <= target <= 10^8
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} arr
 * @param {number} target
 * @return {number}
 */
var minSumOfLengths = function(arr, target) {
    let sum = 0
    let ans = Infinity
    let dp = new Array(arr.length + 1).fill(Infinity) //存储当前索引之前最短的长度
    let map = new Map().set(0, 0) //存储当前最短长度对应的索引

    for (let i = 1; i <= arr.length; i++) {
        sum += arr[i - 1]
        dp[i] = dp[i - 1]
        let dif = sum - target //前面存在前缀和为dif说明从dif到当前这一段的和为target
        if (map.has(dif)) {
            let index = map.get(dif)
            let len = i - index //当前的长度
            //
            dp[i] = Math.min(dp[i], len)
            ans = Math.min(ans, len + dp[index])//dp[index]表示上一个的长度
        }
        map.set(sum, i)
    }

    return ans == Infinity ? -1 : ans
}
//leetcode submit region end(Prohibit modification and deletion)
