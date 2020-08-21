//如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为摆动序列。第一个差（如果存在的话）可能是正数或负数。少于两个元素的序列也是摆动序列。
//
// 例如， [1,7,4,9,2,5] 是一个摆动序列，因为差值 (6,-3,5,-7,3) 是正负交替出现的。相反, [1,4,7,2,5] 和 [1,7,
//4,5,5] 不是摆动序列，第一个序列是因为它的前两个差值都是正数，第二个序列是因为它的最后一个差值为零。
//
// 给定一个整数序列，返回作为摆动序列的最长子序列的长度。 通过从原始序列中删除一些（也可以不删除）元素来获得子序列，剩下的元素保持其原始顺序。
//
// 示例 1:
//
// 输入: [1,7,4,9,2,5]
//输出: 6
//解释: 整个序列均为摆动序列。
//
//
// 示例 2:
//
// 输入: [1,17,5,10,13,15,10,5,16,8]
//输出: 7
//解释: 这个序列包含几个长度为 7 摆动序列，其中一个可为[1,17,10,13,10,16,8]。
//
// 示例 3:
//
// 输入: [1,2,3,4,5,6,7,8,9]
//输出: 2
//
// 进阶:
//你能否用 O(n) 时间复杂度完成此题?
// Related Topics 贪心算法 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function (nums) {
    //dp[i][0]表示序列后两位是递减的
    //dp[i][1]表示序列后两位是递增的
    if (nums.length == 0) return 0
    if (nums.length <= 2) return nums.length
    let n = nums.length
    let dp = Array.from(new Array(n), () => new Array(2).fill(0))

    for (let i = 1; i < n; i++) {
        if (nums[i] - nums[i - 1] > 0) { //在下标i位置我们要加入num【i】，如果当前大于0， 我们需要在i-1位置最大的递减序列
            dp[i][1] = Math.max(dp[i - 1][0] + 1, dp[i - 1][1])
        } else if (nums[i] - nums[i - 1] < 0) { //在下标i位置我们要加入num【i】，如果当前小于0， 我们需要在i-1位置最大的递增序列
            dp[i][0] = Math.max(dp[i - 1][1] + 1, dp[i - 1][0])
        } else {
            dp[i][1] = dp[i - 1][1]
            dp[i][0] = dp[i - 1][0]
        }
    }

    return Math.max(dp[n - 1][0], dp[n - 1][1]) + 1
};
//leetcode submit region end(Prohibit modification and deletion)
