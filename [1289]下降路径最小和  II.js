//给你一个整数方阵 arr ，定义「非零偏移下降路径」为：从 arr 数组中的每一行选择一个数字，且按顺序选出来的数字中，相邻数字不在原数组的同一列。
//
// 请你返回非零偏移下降路径数字和的最小值。
//
//
//
// 示例 1：
//
//
//输入：arr = [[1,2,3],[4,5,6],[7,8,9]]
//输出：13
//解释：
//所有非零偏移下降路径包括：
//[1,5,9], [1,5,7], [1,6,7], [1,6,8],
//[2,4,8], [2,4,9], [2,6,7], [2,6,8],
//[3,4,8], [3,4,9], [3,5,7], [3,5,9]
//下降路径中数字和最小的是 [1,5,7] ，所以答案是 13 。
//
//
//
//
// 提示：
//
//
// 1 <= arr.length == arr[i].length <= 200
// -99 <= arr[i][j] <= 99
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[][]} arr
 * @return {number}
 */
var minFallingPathSum = function(arr) {
    //dfs超时
    // let res = Infinity
    // let N = arr.length
    // let dfs = (i, j, sum, arr) => {
    //     sum += arr[i][j]
    //     if (i + 1 == N) {
    //         res = Math.min(res, sum)
    //         return
    //     }
    //     for (let y = 0; y < N; y++) {
    //         if (y != j) {
    //             dfs(i + 1, y, sum, arr)
    //         }
    //     }
    // }
    //
    // for (let j = 0; j < N; j++) {
    //     dfs(0, j, 0, arr)
    // }
    //
    // return res

    let res = Infinity
    let N = arr.length
    let dp = Array.from(new Array(N), () => new Array(N).fill(Infinity))
    for (let j = 0; j < N; j++) dp[0][j] = arr[0][j]
    for (let i = 1; i < N; i++) {
        for (let j = 0; j < N; j++) {
            for (let k = 0; k < N; k++) {
                if (k == j) continue
                else dp[i][j] = Math.min(dp[i - 1][k] + arr[i][j], dp[i][j])
            }
            if (i == N - 1) res = Math.min(res, dp[i][j])
        }
    }

    return res
}
//leetcode submit region end(Prohibit modification and deletion)
