//国际象棋中的骑士可以按下图所示进行移动：
//
// .
//
//
//这一次，我们将 “骑士” 放在电话拨号盘的任意数字键（如上图所示）上，接下来，骑士将会跳 N-1 步。每一步必须是从一个数字键跳到另一个数字键。
//
// 每当它落在一个键上（包括骑士的初始位置），都会拨出键所对应的数字，总共按下 N 位数字。
//
// 你能用这种方式拨出多少个不同的号码？
//
// 因为答案可能很大，所以输出答案模 10^9 + 7。
//
//
//
//
//
//
// 示例 1：
//
// 输入：1
//输出：10
//
//
// 示例 2：
//
// 输入：2
//输出：20
//
//
// 示例 3：
//
// 输入：3
//输出：46
//
//
//
//
// 提示：
//
//
// 1 <= N <= 5000
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @return {number}
 */
var knightDialer = function (n) {
    //记录来源
    //dp[i][j]表示第i次拨号 值为j
    const MOD = Math.pow(10, 9) + 7
    let res = 0
    let path = [[4, 6], [6, 8], [7, 9], [4, 8], [0, 3, 9], [], [0, 1, 7], [2, 6], [1, 3], [2, 4]]
    let dp = Array.from(new Array(n + 1), () => new Array(10).fill(0))
    for (let i = 0; i < 10; i++) dp[0][i] = 1

    for (let i = 1; i < n; i++) {
        for (let j = 0; j < 10; j++) {
            for (let k of path[j]) {
                dp[i][j] = (dp[i][j] + dp[i - 1][k]) % MOD
            }
        }
    }

    for(let i=0; i<10; i++) res += dp[n-1][i]

    return res % MOD
};
//leetcode submit region end(Prohibit modification and deletion)
