//给定一个未排序的整数数组，找到最长递增子序列的个数。
//
// 示例 1:
//
//
//输入: [1,3,5,4,7]
//输出: 2
//解释: 有两个最长递增子序列，分别是 [1, 3, 4, 7] 和[1, 3, 5, 7]。
//
//
// 示例 2:
//
//
//输入: [2,2,2,2,2]
//输出: 5
//解释: 最长递增子序列的长度是1，并且存在5个子序列的长度为1，因此输出5。
//
//
// 注意: 给定的数组长度不超过 2000 并且结果一定是32位有符号整数。
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumberOfLIS = function (nums) {
    //dp[i]表示在索引i的最大递增子序列长度
    //count[i] 表示在索引i最长子序列的长度
    let n = nums.length
    if (n == 0 || n == 1) return n
    let dp = Array(n).fill(1)
    let res = 0
    let max = 1
    dp[0] = 1
    let count = Array(n).fill(1)
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                if (dp[j] + 1 > dp[i]) {
                    dp[i] = dp[j] + 1
                    count[i] = count[j]
                } else if (dp[j] + 1 == dp[i]) {
                    count[i] += count[j]
                }
                max = Math.max(dp[i], max)
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (dp[i] == max) {
            res += count[i]
        }
    }

    return res
};
//leetcode submit region end(Prohibit modification and deletion)
