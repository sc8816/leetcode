//给出一个由无重复的正整数组成的集合，找出其中最大的整除子集，
// 子集中任意一对 (Si，Sj) 都要满足：Si % Sj = 0 或 Sj % Si = 0。
//
//
// 如果有多个目标子集，返回其中任何一个均可。
//
//
//
// 示例 1:
//
// 输入: [1,2,3]
//输出: [1,2] (当然, [1,3] 也正确)
//
//
// 示例 2:
//
// 输入: [1,2,4,8]
//输出: [1,2,4,8]
//
// Related Topics 数学 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var largestDivisibleSubset = function (nums) {
    //dp[i]表示第i个数最大子集数
    nums.sort((a, b) => a - b)
    let n = nums.length
    let dp = new Array(n + 1).fill(1)
    let max = 1
    let index = 0
    let res = []
    for (let i = 1; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] % nums[j] == 0) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
            if (dp[i] > max) {
                index = i
                max = dp[i]
            }
        }
    }
    for (let i = index; i >= 0; i--) {
        if (nums[index] % nums[i] == 0 && dp[i] == max) {
            res.unshift(nums[i])
            index = i
            max--
        }
    }

    return res
};
//leetcode submit region end(Prohibit modification and deletion)
