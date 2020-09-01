//给定一个正整数 n，返回长度为 n 的所有可被视为可奖励的出勤记录的数量。 答案可能非常大，你只需返回结果mod 109 + 7的值。
//
// 学生出勤记录是只包含以下三个字符的字符串：
//
//
// 'A' : Absent，缺勤
// 'L' : Late，迟到
// 'P' : Present，到场
//
//
// 如果记录不包含多于一个'A'（缺勤）或超过两个连续的'L'（迟到），则该记录被视为可奖励的。
//
// 示例 1:
//
//
//输入: n = 2
//输出: 8
//解释：
//有8个长度为2的记录将被视为可奖励：
//"PP" , "AP", "PA", "LP", "PL", "AL", "LA", "LL"
//只有"AA"不会被视为可奖励，因为缺勤次数超过一次。
//
// 注意：n 的值不会超过100000。
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @return {number}
 */
var checkRecord = function (n) {
    // 在第i天的时候，他与前面有几个连续的L，以及前面的A个数有关系
    // 定义状态 dp[i][j][k]表示前面i个数中有j个A，k个连续的l
    let dp = []
    const MOD = Math.pow(10, 9) + 7
    for (let i = 0; i <= n; i++) {
        dp[i] = []
        for (let j = 0; j <= 1; j++) {
            dp[i][j] = []
            for (let k = 0; k <= 2; k++) {
                dp[i][j][k] = 0
            }
        }
    }
    dp[1][0][0] = 1
    dp[1][1][0] = 1
    dp[1][0][1] = 1

    for (let i = 2; i <= n; i++) {
        dp[i][0][0] = (dp[i - 1][0][0] + dp[i - 1][0][1] + dp[i - 1][0][2]) % MOD
        dp[i][0][1] = dp[i - 1][0][0]
        dp[i][0][2] = (dp[i - 1][0][1] + dp[i-1][0][2]) % MOD
        dp[i][1][0] = (dp[i - 1][1][0] + dp[i - 1][0][0] + dp[i - 1][0][1] + dp[i - 1][0][2] + dp[i - 1][1][1] + dp[i - 1][1][2]) % MOD
        dp[i][1][1] = (dp[i - 1][1][0]) % MOD
        dp[i][1][2] = (dp[i - 1][1][1]) % MOD
    }

    return (dp[n][0][0] + dp[n][0][1] + dp[n][0][2] + dp[n][1][0] + dp[n][1][1] + dp[n][1][2]) % MOD
};
//leetcode submit region end(Prohibit modification and deletion)
