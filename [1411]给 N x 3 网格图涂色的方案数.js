//你有一个 n x 3 的网格图 grid ，你需要用 红，黄，绿 三种颜色之一给每一个格子上色，且确保相邻格子颜色不同（也就是有相同水平边或者垂直边的格子颜
//色不同）。
//
// 给你网格图的行数 n 。
//
// 请你返回给 grid 涂色的方案数。由于答案可能会非常大，请你返回答案对 10^9 + 7 取余的结果。
//
//
//
// 示例 1：
//
// 输入：n = 1
//输出：12
//解释：总共有 12 种可行的方法：
//
//
//
// 示例 2：
//
// 输入：n = 2
//输出：54
//
//
// 示例 3：
//
// 输入：n = 3
//输出：246
//
//
// 示例 4：
//
// 输入：n = 7
//输出：106494
//
//
// 示例 5：
//
// 输入：n = 5000
//输出：30228214
//
//
//
//
// 提示：
//
//
// n == grid.length
// grid[i].length == 3
// 1 <= n <= 5000
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @return {number}
 */
var numOfWays = function(n) {
    //ABA:BAB、BAC、BCB、CAC、CAB
    //ABA：BAB、BCB、BCA、CAB
    if (n == 0) return 0
    if (n == 1) return 12
    let MOD = Math.pow(10, 9) + 7
    let aba = 6, abc = 6
    for (let i = 2; i <= n; i++) {
        [aba, abc] = [(3 * aba + 2 * abc) % MOD, (2 * aba + 2 * abc) % MOD]
    }
    return (aba + abc) % MOD
}
//leetcode submit region end(Prohibit modification and deletion)
