//亚历克斯和李用几堆石子在做游戏。偶数堆石子排成一行，每堆都有正整数颗石子 piles[i] 。
//
// 游戏以谁手中的石子最多来决出胜负。石子的总数是奇数，所以没有平局。
//
// 亚历克斯和李轮流进行，亚历克斯先开始。 每回合，玩家从行的开始或结束处取走整堆石头。 这种情况一直持续到没有更多的石子堆为止，此时手中石子最多的玩家获胜。
//
//
// 假设亚历克斯和李都发挥出最佳水平，当亚历克斯赢得比赛时返回 true ，当李赢得比赛时返回 false 。
//
//
//
// 示例：
//
// 输入：[5,3,4,5]
//输出：true
//解释：
//亚历克斯先开始，只能拿前 5 颗或后 5 颗石子 。
//假设他取了前 5 颗，这一行就变成了 [3,4,5] 。
//如果李拿走前 3 颗，那么剩下的是 [4,5]，亚历克斯拿走后 5 颗赢得 10 分。
//如果李拿走后 5 颗，那么剩下的是 [3,4]，亚历克斯拿走后 4 颗赢得 9 分。
//这表明，取前 5 颗石子对亚历克斯来说是一个胜利的举动，所以我们返回 true 。
//
//
//
//
// 提示：
//
//
// 2 <= piles.length <= 500
// piles.length 是偶数。
// 1 <= piles[i] <= 500
// sum(piles) 是奇数。
//
// Related Topics 极小化极大 数学 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} piles
 * @return {boolean}
 */

class Pair {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

// var stoneGame = function (piles) {
//     //dp[i][j].x 表示亚历克斯先选能拿到的石头个数
//     //dp[i][j].y 表示亚历克斯后选能拿到的石头个数
//     let n = piles.length
//     let dp = []
//     for (let i = 0; i < n; i++) {
//         dp[i] = []
//         for (let j = 0; j < n; j++) {
//             dp[i][j] = new Pair(0, 0)
//         }
//     }
//
//     for (let i = 0; i < n; i++) {
//         dp[i][i].x = piles[i]
//         dp[i][i].y = 0
//     }
//
//     for (let i = n - 2; i >= 0; i--) {
//         for (let j = i + 1; j < n; j++) {
//             let l = piles[i] + dp[i + 1][j].y
//             let r = piles[j] + dp[i][j - 1].y
//             if (l > r) {
//                 dp[i][j].x = l
//                 dp[i][j].y = dp[i + 1][j].x
//             } else {
//                 dp[i][j].x = r
//                 dp[i][j].y = dp[i][j - 1].x
//             }
//         }
//     }
//     return dp[0][n - 1].x - dp[0][n - 1].y > 0
// };

var stoneGame = function (piles) {
    //dp[i][j] 表示先手能获得的相对分数
    let n = piles.length
    let dp = []
    for (let i = 0; i < n; i++) {
        dp[i] = []
        for (let j = 0; j < n; j++) {
            dp[i][j] = 0
        }
    }

    for (let i = 0; i < n; i++) {
        dp[i][i] = piles[i]
    }

    for (let i = n - 2; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            dp[i][j] = Math.max(piles[i] - dp[i + 1][j], piles[j] - dp[i][j - 1])
        }
    }
    return dp[0][n - 1] > 0
};
//leetcode submit region end(Prohibit modification and deletion)
