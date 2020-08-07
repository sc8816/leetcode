//你有两个 有序 且数组内元素互不相同的数组 nums1 和 nums2 。
//
// 一条 合法路径 定义如下：
//
//
// 选择数组 nums1 或者 nums2 开始遍历（从下标 0 处开始）。
// 从左到右遍历当前数组。
// 如果你遇到了 nums1 和 nums2 中都存在的值，那么你可以切换路径到另一个数组对应数字处继续遍历（但在合法路径中重复数字只会被统计一次）。
//
//
// 得分定义为合法路径中不同数字的和。
//
// 请你返回所有可能合法路径中的最大得分。
//
// 由于答案可能很大，请你将它对 10^9 + 7 取余后返回。
//
//
//
// 示例 1：
//
//
//
// 输入：nums1 = [2,4,5,8,10], nums2 = [4,6,8,9]
//输出：30
//解释：合法路径包括：
//[2,4,5,8,10], [2,4,5,8,9], [2,4,6,8,9], [2,4,6,8,10],（从 nums1 开始遍历）
//[4,6,8,9], [4,5,8,10], [4,5,8,9], [4,6,8,10]  （从 nums2 开始遍历）
//最大得分为上图中的绿色路径 [2,4,6,8,10] 。
//
//
// 示例 2：
//
// 输入：nums1 = [1,3,5,7,9], nums2 = [3,5,100]
//输出：109
//解释：最大得分由路径 [1,3,5,100] 得到。
//
//
// 示例 3：
//
// 输入：nums1 = [1,2,3,4,5], nums2 = [6,7,8,9,10]
//输出：40
//解释：nums1 和 nums2 之间无相同数字。
//最大得分由路径 [6,7,8,9,10] 得到。
//
//
// 示例 4：
//
// 输入：nums1 = [1,4,5,8,9,11,19], nums2 = [2,3,4,11,12]
//输出：61
//
//
//
//
// 提示：
//
//
// 1 <= nums1.length <= 10^5
// 1 <= nums2.length <= 10^5
// 1 <= nums1[i], nums2[i] <= 10^7
// nums1 和 nums2 都是严格递增的数组。
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxSum = function(nums1, nums2) {
    //dp[1][i]表示遍历到数组1 下标为i-1时候最大的和
    //dp[2][i]表示遍历到数组2，下标为i-1时候最大的和
    //分别记录下每个数字对应的index，我们遍历到该数字时我们判断当前数字是否存在两个数组中
    //分别比较 dp[1][index], dp[2][index]
    // let map1 = new Map(), map2 = new Map()
    // const MOD = Math.pow(10, 9) + 7
    // let n = nums1.length
    // let m = nums2.length
    // let set = [...new Set([...nums1, ...nums2])].sort((a, b) => a - b)
    // let dp = Array.from(new Array(3), () => new Array(n + m).fill(0))
    // for (let i = 0; i < n; i++) map1.set(nums1[i], i)
    // for (let i = 0; i < m; i++) map2.set(nums2[i], i)
    // dp[1][0] = dp[2][0] = 0
    // for (let num of set) {
    //     if (map1.has(num) && map2.has(num)) {
    //         dp[1][map1.get(num) + 1] = dp[2][map2.get(num) + 1] = Math.max(dp[1][map1.get(num)], dp[2][map2.get(num)]) + num
    //     } else if (map1.has(num)) {
    //         dp[1][map1.get(num) + 1] = dp[1][map1.get(num)] + num
    //     } else if (map2.has(num)) {
    //         dp[2][map2.get(num) + 1] = dp[2][map2.get(num)] + num
    //     }
    // }
    // return Math.max(dp[1][n], dp[2][m]) % MOD

    /*
    * 双指针
     */
    const MOD = Math.pow(10, 9) + 7
    let n = nums1.length
    let m = nums2.length
    let ans1 = 0, ans2 = 0
    let x = 0, y = 0
    while (x < n && y < m) {
        if (nums1[x] == nums2[y]) ans1 = ans2 = Math.max(ans1, ans2) + nums2[y], x++, y++
        else if (nums1[x] > nums2[y]) ans2 = ans2 + nums2[y], y++
        else if (nums1[x] < nums2[y]) ans1 = ans1 + nums1[x], x++
    }

    while (x < n) ans1 = ans1 + nums1[x], x++
    while (y < m) ans2 = ans2 + nums2[y], y++

    return Math.max(ans1, ans2) % MOD
    // console.log(dp, dp[1][n], dp[2][m])
}
//leetcode submit region end(Prohibit modification and deletion)
