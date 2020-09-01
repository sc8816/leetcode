//给定一个 m × n 的网格和一个球。球的起始坐标为 (i,j) ，你可以将球移到相邻的单元格内，或者往上、下、左、右四个方向上移动使球穿过网格边界。但是，
//你最多可以移动 N 次。找出可以将球移出边界的路径数量。答案可能非常大，返回 结果 mod 109 + 7 的值。
//
//
//
// 示例 1：
//
// 输入: m = 2, n = 2, N = 2, i = 0, j = 0
//输出: 6
//解释:
//
//
//
// 示例 2：
//
// 输入: m = 1, n = 3, N = 3, i = 0, j = 1
//输出: 12
//解释:
//
//
//
//
//
// 说明:
//
//
// 球一旦出界，就不能再被移动回网格内。
// 网格的长度和高度在 [1,50] 的范围内。
// N 在 [0,50] 的范围内。
// Related Topics 深度优先搜索 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} m
 * @param {number} n
 * @param {number} N
 * @param {number} i
 * @param {number} j
 * @return {number}
 */
var findPaths = function (m, n, N, i, j) {
    let MOD = Math.pow(10, 9) + 7
    let memo = new Map()
    let dfs = (i, j, k) => {
        if (k < 0) return 0
        if (i < 0 || i >= m || j < 0 || j >= n) return 1
        let key = `${i}-${j}-${k}`
        if (memo.has(key)) return memo.get(key)
        let res = 0
        res += dfs(i - 1, j, k - 1)
        res += dfs(i + 1, j, k - 1)
        res += dfs(i, j - 1, k - 1)
        res += dfs(i, j + 1, k - 1)
        res %= MOD
        memo.set(key, res)

        return res
    }

    return dfs(i, j, N)
};
//leetcode submit region end(Prohibit modification and deletion)
