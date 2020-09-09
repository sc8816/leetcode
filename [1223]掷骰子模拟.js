//有一个骰子模拟器会每次投掷的时候生成一个 1 到 6 的随机数。
//
// 不过我们在使用它时有个约束，就是使得投掷骰子时，连续 掷出数字 i 的次数不能超过 rollMax[i]（i 从 1 开始编号）。
//
// 现在，给你一个整数数组 rollMax 和一个整数 n，请你来计算掷 n 次骰子可得到的不同点数序列的数量。
//
// 假如两个序列中至少存在一个元素不同，就认为这两个序列是不同的。由于答案可能很大，所以请返回 模 10^9 + 7 之后的结果。
//
//
//
// 示例 1：
//
// 输入：n = 2, rollMax = [1,1,2,2,2,3]
//输出：34
//解释：我们掷 2 次骰子，如果没有约束的话，共有 6 * 6 = 36 种可能的组合。但是根据 rollMax 数组，数字 1 和 2 最多连续出现一次，所
//以不会出现序列 (1,1) 和 (2,2)。因此，最终答案是 36-2 = 34。
//
//
// 示例 2：
//
// 输入：n = 2, rollMax = [1,1,1,1,1,1]
//输出：30
//
//
// 示例 3：
//
// 输入：n = 3, rollMax = [1,1,1,2,2,3]
//输出：181
//
//
//
//
// 提示：
//
//
// 1 <= n <= 5000
// rollMax.length == 6
// 1 <= rollMax[i] <= 15
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @param {number[]} rollMax
 * @return {number}
 */
var dieSimulator = function (n, rollMax) {
    //dp[i][j][k]表示投掷i次筛子，点数是j，连续出现了k次
    let mod = Math.pow(10, 9) + 7
    let dp = []
    for (let i = 0; i <= n; i++) {
        dp[i] = []
        for (let j = 1; j <= 6; j++) {
            dp[i][j] = []
            for (let k = 0; k < 16; k++) {
                dp[i][j][k] = 0
                if (i == 0 && k == 1) dp[i][j][k] = 1
            }
        }
    }

    for (let i = 1; i < n; i++) {
        for (let j = 1; j <= 6; j++) { //上一次的点数
            for (let k = 1; k <= 6; k++) { //当前的点数
                for (let t = 1; t <= rollMax[j - 1]; t++) {
                    if (j != k) {
                        dp[i][k][1] += dp[i - 1][j][t]
                        dp[i][k][1] %= mod
                    } else {
                        dp[i][j][t + 1] = dp[i - 1][j][t]
                    }
                }
            }
        }
    }

    let sum = 0

    for (let i = 1; i < 7; i++) {
        for (let k = 1; k <= rollMax[i - 1]; k++) {
            sum = (sum + dp[n - 1][i][k]) % mod
        }
    }
    return sum
};
//leetcode submit region end(Prohibit modification and deletion)
