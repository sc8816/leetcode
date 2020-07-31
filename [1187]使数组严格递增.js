//给你两个整数数组 arr1 和 arr2，返回使 arr1 严格递增所需要的最小「操作」数（可能为 0）。
//
// 每一步「操作」中，你可以分别从 arr1 和 arr2 中各选出一个索引，分别为 i 和 j，0 <= i < arr1.length 和 0 <= j
//< arr2.length，然后进行赋值运算 arr1[i] = arr2[j]。
//
// 如果无法让 arr1 严格递增，请返回 -1。
//
//
//
// 示例 1：
//
// 输入：arr1 = [1,5,3,6,7], arr2 = [1,3,2,4]
//输出：1
//解释：用 2 来替换 5，之后 arr1 = [1, 2, 3, 6, 7]。
//
//
// 示例 2：
//
// 输入：arr1 = [1,5,3,6,7], arr2 = [4,3,1]
//输出：2
//解释：用 3 来替换 5，然后用 4 来替换 3，得到 arr1 = [1, 3, 4, 6, 7]。
//
//
// 示例 3：
//
// 输入：arr1 = [1,5,3,6,7], arr2 = [1,6,3,3]
//输出：-1
//解释：无法使 arr1 严格递增。
//
//
//
// 提示：
//
//
// 1 <= arr1.length, arr2.length <= 2000
// 0 <= arr1[i], arr2[i] <= 10^9
//
//
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} arr1
 * @param {number[]} arr2
 * @return {number}
 */
var makeArrayIncreasing = function(arr1, arr2) {
    //dp[i][j]表示前j个元素经过i次操作变成单调递增，第j个元素的最小值
    //1、假设当前arr【j】>dp[i][j-1] 那么dp[i][j] = arr[j]
    //2、我们从arr2中找出第一个比dp[i][j-1]大的元素进行替换
    if (arr1 == null || arr1.length == 0) return -1
    if (arr1.length == 1) return 0
    const N = arr1.length
    let dp = Array.from(new Array(N + 1), () => new Array(N + 1).fill(Infinity))
    dp[0][0] = -Infinity
    arr2.sort((a, b) => a - b)
    //二分法找到第一个比它大的数
    let upperBound = (l, r, value, arr) => {
        while (l <= r) {
            let mid = l + ((r - l) >> 1)
            if (arr[mid] <= value) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }
        if (l >= arr.length || arr[l] <= value) return Infinity
        // console.log(l)

        return arr[l]
    }
    for (let j = 1; j <= N; j++) {
        for (let i = 0; i <= j; i++) {
            if (arr1[j - 1] > dp[i][j - 1]) {
                dp[i][j] = arr1[j - 1]
            }
            if (i > 0) {
                let val = upperBound(0, arr2.length - 1, dp[i - 1][j - 1], arr2)
                // console.log(val)
                if (val != Infinity) {
                    dp[i][j] = Math.min(dp[i][j], val)
                }
            }
            if (j == N && dp[i][j] != Infinity) return i
        }
    }

    return -1
}
//leetcode submit region end(Prohibit modification and deletion)
