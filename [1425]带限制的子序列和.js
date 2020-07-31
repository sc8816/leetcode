//给你一个整数数组 nums 和一个整数 k ，请你返回 非空 子序列元素和的最大值，子序列需要满足：子序列中每两个 相邻 的整数 nums[i] 和 num
//s[j] ，它们在原数组中的下标 i 和 j 满足 i < j 且 j - i <= k 。
//
// 数组的子序列定义为：将数组中的若干个数字删除（可以删除 0 个数字），剩下的数字按照原本的顺序排布。
//
//
//
// 示例 1：
//
// 输入：nums = [10,2,-10,5,20], k = 2
//输出：37
//解释：子序列为 [10, 2, 5, 20] 。
//
//
// 示例 2：
//
// 输入：nums = [-1,-2,-3], k = 1
//输出：-1
//解释：子序列必须是非空的，所以我们选择最大的数字。
//
//
// 示例 3：
//
// 输入：nums = [10,-2,-10,-5,20], k = 2
//输出：23
//解释：子序列为 [10, -2, -5, 20] 。
//
//
//
//
// 提示：
//
//
// 1 <= k <= nums.length <= 10^5
// -10^4 <= nums[i] <= 10^4
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var constrainedSubsetSum = function(nums, k) {
    //dp[i]表示以nums[i]结尾的最大元素和
    //dp[i] = max(nums[i], nums[i] + dp[j] + nums[i]) | i>j>=i-k
    //超时
    /*
    const N = nums.length
    let dp = new Array(N)
    dp[0] = nums[0]
    let res = dp[0]
    for (let i = 1; i < N; i++) {
        dp[i] = nums[i]
        for (let j = Math.max(i - k, 0); j < i; j++) {
            dp[i] = Math.max(dp[i], dp[j] + nums[i])
        }
        res = Math.max(res, dp[i])
    }

    return res
     */
    const N = nums.length
    let dp = new Array(N)
    dp[0] = nums[0]
    let stack = [] //维护一个栈，每次存的都是前k个数中最大的
    let res = nums[0]
    stack.push(dp[0])

    for (let i = 1; i < N; i++) { //当窗口大小达到k后
        dp[i] = Math.max(stack[0] + nums[i], nums[i])
        res = Math.max(res, dp[i])
        console.log('1', stack)
        while (stack.length && stack[stack.length - 1] < dp[i]) {
            stack.pop()
        }
        console.log('2', stack)
        stack.push(dp[i])
        if (i >= k && dp[i - k] == stack[0]) stack.shift()
    }
    return res
}
//leetcode submit region end(Prohibit modification and deletion)
