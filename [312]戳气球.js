//有 n 个气球，编号为0 到 n-1，每个气球上都标有一个数字，这些数字存在数组 nums 中。
//
// 现在要求你戳破所有的气球。如果你戳破气球 i ，就可以获得 nums[left] * nums[i] * nums[right] 个硬币。 这里的 lef
//t 和 right 代表和 i 相邻的两个气球的序号。注意当你戳破了气球 i 后，气球 left 和气球 right 就变成了相邻的气球。
//
// 求所能获得硬币的最大数量。
//
// 说明:
//
//
// 你可以假设 nums[-1] = nums[n] = 1，但注意它们不是真实存在的所以并不能被戳破。
// 0 ≤ n ≤ 500, 0 ≤ nums[i] ≤ 100
//
//
// 示例:
//
// 输入: [3,1,5,8]
//输出: 167
//解释: nums = [3,1,5,8] --> [3,5,8] -->   [3,8]   -->  [8]  --> []
//     coins =  3*1*5      +  3*5*8    +  1*3*8      + 1*8*1   = 167
//
// Related Topics 分治算法 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
    //dp[i][j]表示戳破区间i-j之间（除了）的所有气球能够获得的最大金币
    nums = [1, ...nums, 1]
    let n = nums.length
    let dp = Array.from(new Array(n + 2), new Array(n + 2).fill(0))

    for (let i = n; i >= 0; i--) {
        for (let j = i + 1; j < n + 2; j++) {
            for (let k = i + 1; k < j; k++) {
                dp[i][j] = Math.max(dp[i][j], nums[i] * nums[j] * nums[k] + dp[i][k] + dp[k][j])
            }
        }
    }
    
    return dp[0][n+1]
};
//leetcode submit region end(Prohibit modification and deletion)
