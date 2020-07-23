//给定一个整数数组 nums 和一个正整数 k，找出是否有可能把这个数组分成 k 个非空子集，其总和都相等。
//
// 示例 1：
//
// 输入： nums = [4, 3, 2, 3, 5, 2, 1], k = 4
//输出： True
//说明： 有可能将其分成 4 个子集（5），（1,4），（2,3），（2,3）等于总和。
//
//
//
// 提示：
//
//
// 1 <= k <= len(nums) <= 16
// 0 < nums[i] < 10000
//
// Related Topics 递归 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var canPartitionKSubsets = function(nums, k) {
    let sum = 0, max = 0
    for (let num of nums) {
        sum += num
        max = Math.max(max, num)
    }
    if (sum % k !== 0 || max > sum / k) return false
    let vis = new Array(nums.length).fill(false)
    let dfs = (k, cur, target, vis, nums, index) => {
        //截止条件
        if (k == 0) return true
        //当前已经凑好进入下一个
        if (cur == target) return dfs(k - 1, 0, target, vis, nums, 0)
        //候选节点
        for (let i = index; i < nums.length; i++) {
            if (!vis[i] && cur + nums[i] <= target) {
                vis[i] = true
                if(dfs(k, cur+nums[i], target, vis, nums, i+1)){
                    return true
                }
                vis[i] = false
            }
        }

        return false
    }

    return dfs(k, 0, sum / k, vis, nums, 0)
}
//leetcode submit region end(Prohibit modification and deletion)
