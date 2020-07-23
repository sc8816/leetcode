//给定数组 nums 由正整数组成，找到三个互不重叠的子数组的最大和。
//
// 每个子数组的长度为k，我们要使这3*k个项的和最大化。
//
// 返回每个区间起始索引的列表（索引从 0 开始）。如果有多个结果，返回字典序最小的一个。
//
// 示例:
//
//
//输入: [1,2,1,2,6,7,5,1], 2
//输出: [0, 3, 5]
//解释: 子数组 [1, 2], [2, 6], [7, 5] 对应的起始索引为 [0, 3, 5]。
//我们也可以取 [2, 1], 但是结果 [1, 3, 5] 在字典序上更大。
//
//
// 注意:
//
//
// nums.length的范围在[1, 20000]之间。
// nums[i]的范围在[1, 65535]之间。
// k的范围在[1, floor(nums.length / 3)]之间。
//
// Related Topics 数组 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSumOfThreeSubarrays = function(nums, k) {
    //dp[i][j] 表示前i个元素构成第j个数组的最大和
    //选第i个， 不选第i个
    //dp[i][j] = Math.max(dp[i-1][j], dp[i-k][j-1] + sum(i-k+1, i))
    if (k < 1 || 3 * k > nums.length) return []
    let N = nums.length
    let limit = 3
    let sum = []
    let res = []
    let s = 0
    for (let i = 0; i < k; i++) {
        s += nums[i]
    }
    sum[k - 1] = s
    for (let i = k; i < N; i++) {
        s += nums[i] - nums[i - k]
        sum[i] = s
    }
    let dp = Array.from(new Array(N), () => new Array(4).fill(0))
    let path = Array.from(new Array(N), () => new Array(4).fill(0))
    dp[k - 1][1] = sum[k - 1]
    path[k - 1][1] = k - 1

    for (let i = k; i < N; i++) {
        for (let j = 1; j < 4; j++) {
            dp[i][j] = dp[i - 1][j]
            path[i][j] = path[i - 1][j]
            if(dp[i - k][j - 1] + sum[i] > dp[i][j]){
                path[i][j] = i
                dp[i][j] = dp[i - k][j - 1] + sum[i]
            }
        }
    }
    // console.log(path)
    let idx = path[N - 1][3]
    console.log(idx)
    res.push(idx - k + 1)
    for (let i = 2; i > 0; i--) {
        idx = path[idx - k][i]
        res.unshift(idx-k+1)
    }
    return res
}
//leetcode submit region end(Prohibit modification and deletion)
