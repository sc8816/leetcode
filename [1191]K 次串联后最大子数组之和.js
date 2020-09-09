//给你一个整数数组 arr 和一个整数 k。
//
// 首先，我们要对该数组进行修改，即把原数组 arr 重复 k 次。
//
//
// 举个例子，如果 arr = [1, 2] 且 k = 3，那么修改后的数组就是 [1, 2, 1, 2, 1, 2]。
//
//
// 然后，请你返回修改后的数组中的最大的子数组之和。
//
// 注意，子数组长度可以是 0，在这种情况下它的总和也是 0。
//
// 由于 结果可能会很大，所以需要 模（mod） 10^9 + 7 后再返回。
//
//
//
// 示例 1：
//
// 输入：arr = [1,2], k = 3
//输出：9
//
//
// 示例 2：
//
// 输入：arr = [1,-2,1], k = 5
//输出：2
//
//
// 示例 3：
//
// 输入：arr = [-1,-2], k = 7
//输出：0
//
//
//
//
// 提示：
//
//
// 1 <= arr.length <= 10^5
// 1 <= k <= 10^5
// -10^4 <= arr[i] <= 10^4
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var kConcatenationMaxSum = function (arr, k) {
    let left = 0, right = 0
    let toLeft = 0, toRight = 0
    let max = 0, mod = Math.pow(10, 9) + 7

    for (let i = 0, j = arr.length - 1, curMax = 0; i < arr.length; i++, j--) {
        toRight += arr[i]
        toLeft += arr[j]
        curMax = Math.max(0, curMax + arr[i])
        max = Math.max(max, curMax)
        left = Math.max(left, toLeft)
        right = Math.max(right, toRight)
    }

    if (k == 1) return max % mod
    else if (toRight <= 0) return Math.max(left + right, max) % mod
    else return Math.max(toRight * (k - 2) + left + right, max) % mod
};
//leetcode submit region end(Prohibit modification and deletion)
