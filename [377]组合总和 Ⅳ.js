//给定一个由正整数组成且不存在重复数字的数组，找出和为给定目标正整数的组合的个数。
//
// 示例:
//
//
//nums = [1, 2, 3]
//target = 4
//
//所有可能的组合为：
//(1, 1, 1, 1)
//(1, 1, 2)
//(1, 2, 1)
//(1, 3)
//(2, 1, 1)
//(2, 2)
//(3, 1)
//
//请注意，顺序不同的序列被视作不同的组合。
//
//因此输出为 7。
//
//
// 进阶：
//如果给定的数组中含有负数会怎么样？
//问题会产生什么变化？
//我们需要在题目中添加什么限制来允许负数的出现？
//
// 致谢：
//特别感谢 @pbrother 添加此问题并创建所有测试用例。
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
    let n = nums.length
    let dp = new Array(target + 1).fill(0)
    dp[0] = 1
    
    for (let i = 1; i <= target; i++) {
        for (let num of nums) {
          if(i-num>=0) dp[i] += dp[i-num]
        }
    }
    return dp[target]
}
//leetcode submit region end(Prohibit modification and deletion)
