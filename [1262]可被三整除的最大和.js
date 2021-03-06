//给你一个整数数组 nums，请你找出并返回能被三整除的元素最大和。
//
//
//
//
//
//
// 示例 1：
//
// 输入：nums = [3,6,5,1,8]
//输出：18
//解释：选出数字 3, 6, 1 和 8，它们的和是 18（可被 3 整除的最大和）。
//
// 示例 2：
//
// 输入：nums = [4]
//输出：0
//解释：4 不能被 3 整除，所以无法选出数字，返回 0。
//
//
// 示例 3：
//
// 输入：nums = [1,2,3,4,4]
//输出：12
//解释：选出数字 1, 3, 4 以及 4，它们的和是 12（可被 3 整除的最大和）。
//
//
//
//
// 提示：
//
//
// 1 <= nums.length <= 4 * 10^4
// 1 <= nums[i] <= 10^4
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSumDivThree = function (nums) {
    let dp = [0, -Infinity, -Infinity]
    for (let num of nums) {
        let [p1, p2, p3] = dp
        if (num % 3 == 0) {
            dp[0] += num
            dp[1] += num
            dp[2] += num
        } else if (num % 3 == 1) {
            dp[0] = Math.max(p1, p3 + num)
            dp[1] = Math.max(p2, p1 + num)
            dp[2] = Math.max(p3, p2 + num)
        } else if (num % 3 == 2) {
            dp[0] = Math.max(p1, p2 + num)
            dp[1] = Math.max(p2, p3 + num)
            dp[2] = Math.max(p3, p1 + num)
        }
    }

    return dp[0]
};
//leetcode submit region end(Prohibit modification and deletion)
