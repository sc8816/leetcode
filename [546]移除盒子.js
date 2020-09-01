//给出一些不同颜色的盒子，盒子的颜色由数字表示，即不同的数字表示不同的颜色。
//你将经过若干轮操作去去掉盒子，直到所有的盒子都去掉为止。每一轮你可以移除具有相同颜色的连续 k 个盒子（k >= 1），这样一轮之后你将得到 k*k 个积分
//。
//当你将所有盒子都去掉之后，求你能获得的最大积分和。
//
//
//
// 示例：
//
// 输入：boxes = [1,3,2,2,2,3,4,3,1]
//输出：23
//解释：
//[1, 3, 2, 2, 2, 3, 4, 3, 1]
//----> [1, 3, 3, 4, 3, 1] (3*3=9 分)
//----> [1, 3, 3, 3, 1] (1*1=1 分)
//----> [1, 1] (3*3=9 分)
//----> [] (2*2=4 分)
//
//
//
//
// 提示：
//
//
// 1 <= boxes.length <= 100
// 1 <= boxes[i] <= 100
//
// Related Topics 深度优先搜索 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} boxes
 * @return {number}
 */
var removeBoxes = function (boxes) {
    //dp[i][j][k]表示box 【i】前面还有k个与box【i】相同颜色的盒子
    //dp[i][j][k] = (k+1)*(k+1)+dp[i+1][j][0]
    //dp[i][j][k] = Math.max(dp[i][j][k], dp[i+1][m-1][0]+dp[m][j][k+1])
    let n = boxes.length
    let dp = []
    for (let i = 0; i <= n; i++) {
        dp[i] = []
        for (let j = 0; j <= n; j++) {
            dp[i][j] = []
            for (let k = 0; k <= n; k++) {
                if (i == j && k <= i) {
                    dp[i][j][k] = (k + 1) * (k + 1)
                } else dp[i][j][k] = 0
            }
        }
    }

    for (let t = 1; t <= n; t++) {
        for (let j = 1; j < n; j++) {
            let i = j - t
            for (let k = 0; k <= i; k++) {
                dp[i][j][k] = dp[i + 1][j][0] + (k + 1) * (k + 1)
                for (let m = i + 1; m <= j; m++) {
                    if (boxes[m] == boxes[i]) {
                        dp[i][j][k] = Math.max(dp[i][j][k], dp[i + 1][m - 1][0] + dp[m][j][k + 1])
                    }
                }
            }
        }
    }

    return n == 0 ? 0 : dp[0][n - 1][0]
};
//leetcode submit region end(Prohibit modification and deletion)
