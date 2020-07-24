//有两种形状的瓷砖：一种是 2x1 的多米诺形，另一种是形如 "L" 的托米诺形。两种形状都可以旋转。
//
//
//XX  <- 多米诺
//
//XX  <- "L" 托米诺
//X
//
//
// 给定 N 的值，有多少种方法可以平铺 2 x N 的面板？返回值 mod 10^9 + 7。
//
// （平铺指的是每个正方形都必须有瓷砖覆盖。两个平铺不同，当且仅当面板上有四个方向上的相邻单元中的两个，使得恰好有一个平铺有一个瓷砖占据两个正方形。）
//
//
//示例:
//输入: 3
//输出: 5
//解释:
//下面列出了五种不同的方法，不同字母代表不同瓷砖：
//XYZ XXZ XYY XXY XYY
//XYZ YYZ XZZ XYY XXY
//
// 提示：
//
//
// N 的范围是 [1, 1000]
//
//
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} N
 * @return {number}
 */
var numTilings = function(N) {
    // dp[i]表示组成完成的2n面板平铺方案
    // dp1[i]表示组成2N+1的面板平铺方案
    //dp[i] = dp[i-1] + dp[i-2] + 2*dp1[i-2]
    //dp1[i] = dp[i-1] + dp1[i-1]
    //把方程1简称成dp1 = ....代入方程式2
    //得到dp[i] = dp[i-3]+ 2dp[i-1]
    let mod = Math.pow(10, 9) + 7
    let dp = []
    dp[0] = 1
    dp[1] = 1
    dp[2] = 2
    dp[3] = 5
    for (let i = 4; i <= N; i++) {
        dp[i] = (dp[i-3] + (2* dp[i-1])%mod)%mod
    }

    return dp[N]
}
//leetcode submit region end(Prohibit modification and deletion)
