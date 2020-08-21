//给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
//
// 设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。
//
// 注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
//
// 示例 1:
//
// 输入: [2,4,1], k = 2
//输出: 2
//解释: 在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
//
//
// 示例 2:
//
// 输入: [3,2,6,5,0,3], k = 2
//输出: 7
//解释: 在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4 。
//     随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3
//。
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (k, prices) {
    //dp[i][j][0]表示在第i天不持有股票经历了j次交易获得的最大利润
    //dp[i][j][1]表示在第j天持有股票经历了j次交易获得的最大利润
    if(k>prices.length/2){
        let dp=0;
        for(let i=0;i<prices.length;i++){
            if(prices[i+1]>prices[i]){
                dp=dp+prices[i+1]-prices[i];
            }
        }
        return dp;
    }
    //买入时候，我们交易次数减一
    let n = prices.length
    let dp = []
    for (let i = 0; i < n; i++) {
        dp[i] = []
        for (let j = 0; j <= k; j++) {
            dp[i][j] = []
            for (let m = 0; m < 2; m++) {
                dp[i][j][m] = 0
                if (i == 0 && m == 1) {
                    dp[i][j][1] = -prices[0]
                }
            }
        }
    }
    let res = 0
    for (let i = 1; i < n; i++) {
        for (let j = 1; j <= k; j++) {
            dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i])
            dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i])
            res = Math.max(res, dp[i][j][0])
        }
    }

    return res
};
//leetcode submit region end(Prohibit modification and deletion)
