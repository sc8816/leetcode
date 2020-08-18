//给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
//
// 设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
//
// 注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
//
// 示例 1:
//
// 输入: [3,3,5,0,0,3,1,4]
//输出: 6
//解释: 在第 4 天（股票价格 = 0）的时候买入，在第 6 天（股票价格 = 3）的时候卖出，这笔交易所能获得利润 = 3-0 = 3 。
//     随后，在第 7 天（股票价格 = 1）的时候买入，在第 8 天 （股票价格 = 4）的时候卖出，这笔交易所能获得利润 = 4-1 = 3 。
//
// 示例 2:
//
// 输入: [1,2,3,4,5]
//输出: 4
//解释: 在第 1 天（股票价格 = 1）的时候买入，在第 5 天 （股票价格 = 5）的时候卖出, 这笔交易所能获得利润 = 5-1 = 4 。  
//     注意你不能在第 1 天和第 2 天接连购买股票，之后再将它们卖出。  
//     因为这样属于同时参与了多笔交易，你必须在再次购买前出售掉之前的股票。
//
//
// 示例 3:
//
// 输入: [7,6,4,3,1]
//输出: 0
//解释: 在这个情况下, 没有交易完成, 所以最大利润为 0。
// Related Topics 数组 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    //DP[i][0][k]表示在第i天不持有股票时完成了k次交易获得的最大利润
    //DP[i][1][k]表示在第i天持有股票时完成了k次交易获得的最大利润
    if(prices.length==0) return 0
    let dp = []
    let n = prices.length
    for (let i = 0; i <= n; i++) {
        dp[i] = []
        for (let j = 0; j < 2; j++) {
            dp[i][j] = []
            for (let k = 0; k <= 2; k++) {
                dp[i][j][k] = 0
            }
        }
    }
    dp[0][0][1] = 0
    dp[0][0][2] = 0
    dp[0][1][1] = -prices[0]
    dp[0][1][2] = -prices[0]

    for (let i = 1; i < n; i++) {
        for(let k=1; k<=2; k++){
            dp[i][0][k] = Math.max(dp[i-1][1][k] + prices[i], dp[i-1][0][k])
            dp[i][1][k] = Math.max(dp[i-1][0][k-1] - prices[i], dp[i-1][1][k])
        }
    }
    console.log(dp, dp[n-1][0][2])
    return dp[n-1][0][2]
    // console.log(dp, dp[n-1][0][2])
};
//leetcode submit region end(Prohibit modification and deletion)
