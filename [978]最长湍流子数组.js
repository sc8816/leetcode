//当 A 的子数组 A[i], A[i+1], ..., A[j] 满足下列条件时，我们称其为湍流子数组：
//
//
// 若 i <= k < j，当 k 为奇数时， A[k] > A[k+1]，且当 k 为偶数时，A[k] < A[k+1]；
// 或 若 i <= k < j，当 k 为偶数时，A[k] > A[k+1] ，且当 k 为奇数时， A[k] < A[k+1]。
//
//
// 也就是说，如果比较符号在子数组中的每个相邻元素对之间翻转，则该子数组是湍流子数组。
//
// 返回 A 的最大湍流子数组的长度。
//
//
//
// 示例 1：
//
// 输入：[9,4,2,10,7,8,8,1,9]
//输出：5
//解释：(A[1] > A[2] < A[3] > A[4] < A[5])
//
//
// 示例 2：
//
// 输入：[4,8,12,16]
//输出：2
//
//
// 示例 3：
//
// 输入：[100]
//输出：1
//
//
//
//
// 提示：
//
//
// 1 <= A.length <= 40000
// 0 <= A[i] <= 10^9
//
// Related Topics 数组 动态规划 Sliding Window


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} A
 * @return {number}
 */
var maxTurbulenceSize = function (A) {
    //dp[i][0]表示在i位置是递减的数列的长度
    //dp[i][1]表示在i位置是递增的序列的长度

    // dp[i][0] = Math.max(dp[j][1] + 1, dp[i][0])
    // dp[i][1] = Math.max(dp[j][0] + 1, dp[j][1])
    let n = A.length
    let dp = new Array(n).fill(1)
    dp[0] = 1
    dp[1] = A[1]!=A[0] ? 2 : 1
    let res = 1
    for (let i = 2; i < n; i++) {
            if ((A[i] > A[i-1] && A[i-1]<A[i-2]) || (A[i]<A[i-1] && A[i-1]>A[i-2])) {
                dp[i] = dp[i-1] + 1
            }else if (A[i]!=A[i-1]){
                dp[i] = 2
            }

            res = Math.max(res, dp[i])
    }

    return res
};
//leetcode submit region end(Prohibit modification and deletion)
