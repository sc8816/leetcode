//给定一个非负整数数组，a1, a2, ..., an, 和一个目标数，S。现在你有两个符号 + 和 -。对于数组中的任意一个整数，你都可以从 + 或 -中选
//择一个符号添加在前面。
//
// 返回可以使最终数组和为目标数 S 的所有添加符号的方法数。
//
//
//
// 示例：
//
// 输入：nums: [1, 1, 1, 1, 1], S: 3
//输出：5
//解释：
//
//-1+1+1+1+1 = 3
//+1-1+1+1+1 = 3
//+1+1-1+1+1 = 3
//+1+1+1-1+1 = 3
//+1+1+1+1-1 = 3
//
//一共有5种方法让最终目标和为3。
//
//
//
//
// 提示：
//
//
// 数组非空，且长度不会超过 20 。
// 初始的数组的和不会超过 1000 。
// 保证返回的最终结果能被 32 位整数存下。
//
// Related Topics 深度优先搜索 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @param {number} S
 * @return {number}
 */
var findTargetSumWays = function (nums, S) {
    //暴力求解
    // console.log(nums, S)
    // let count = 0
    // let dfs = (dep, sum) => {
    //     if (dep == nums.length) {
    //         if (sum == S) {
    //             count++
    //         }
    //         return
    //     }
    //     dfs(dep + 1, sum + nums[dep])
    //     dfs(dep + 1, sum - nums[dep])
    // }
    //
    // dfs(0, 0)
    // return count

    //动态规划
    //可能目标值为负数，我们给结果加上一个sum
    //dp[i][j]表示前i个数组成和为j的可能个数
    let n = nums.length
    let sum = nums.reduce((a, b) => a + b)
    if (sum < S) return 0
    let dp = Array.from(new Array(n + 1), () => new Array(2 * sum + 1).fill(0))
    if (nums[0] == 0) {
        dp[0][sum] = 2
    } else {
        dp[0][sum + nums[0]] = 1
        dp[0][sum - nums[0]] = 1
    }

    for (let i = 1; i < n; i++) {
        for (let j = 0; j <= 2 * sum; j++) {
            let add = (j + nums[i]) <= 2 * sum ? nums[i] + j : 0
            let sub = (j - nums[i]) >= 0 ? j - nums[i] : 0
            dp[i][j] = dp[i - 1][add] + dp[i - 1][sub]
        }
    }

    return dp[n - 1][sum + S]
};
//leetcode submit region end(Prohibit modification and deletion)
