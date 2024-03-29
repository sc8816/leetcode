//给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回
// 0。
//
//
//
// 示例：
//
// 输入：s = 7, nums = [2,3,1,2,4,3]
//输出：2
//解释：子数组 [4,3] 是该条件下的长度最小的子数组。
//
//
//
//
// 进阶：
//
//
// 如果你已经完成了 O(n) 时间复杂度的解法, 请尝试 O(n log n) 时间复杂度的解法。
//
// Related Topics 数组 双指针 二分查找
// 👍 497 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (s, nums) {
    let j = 0
    let len = 0
    let sum = 0
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i]
        while (sum >= s) {
            len = len == 0 ? i - j + 1 : Math.min(len, i - j + 1)
            sum -= nums[j++]
        }
    }

    return len
};
//leetcode submit region end(Prohibit modification and deletion)
