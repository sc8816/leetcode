//一只青蛙想要过河。 假定河流被等分为 x 个单元格，并且在每一个单元格内都有可能放有一石子（也有可能没有）。 青蛙可以跳上石头，但是不可以跳入水中。
//
// 给定石子的位置列表（用单元格序号升序表示）， 请判定青蛙能否成功过河（即能否在最后一步跳至最后一个石子上）。 开始时， 青蛙默认已站在第一个石子上，并可以
//假定它第一步只能跳跃一个单位（即只能从单元格1跳至单元格2）。
//
// 如果青蛙上一步跳跃了 k 个单位，那么它接下来的跳跃距离只能选择为 k - 1、k 或 k + 1个单位。 另请注意，青蛙只能向前方（终点的方向）跳跃。
//
//
// 请注意：
//
//
// 石子的数量 ≥ 2 且 < 1100；
// 每一个石子的位置序号都是一个非负整数，且其 < 231；
// 第一个石子的位置永远是0。
//
//
// 示例 1:
//
//
//[0,1,3,5,6,8,12,17]
//
//总共有8个石子。
//第一个石子处于序号为0的单元格的位置, 第二个石子处于序号为1的单元格的位置,
//第三个石子在序号为3的单元格的位置， 以此定义整个数组...
//最后一个石子处于序号为17的单元格的位置。
//
//返回 true。即青蛙可以成功过河，按照如下方案跳跃：
//跳1个单位到第2块石子, 然后跳2个单位到第3块石子, 接着
//跳2个单位到第4块石子, 然后跳3个单位到第6块石子,
//跳4个单位到第7块石子, 最后，跳5个单位到第8个石子（即最后一块石子）。
//
//
// 示例 2:
//
//
//[0,1,2,3,4,8,9,11]
//
//返回 false。青蛙没有办法过河。
//这是因为第5和第6个石子之间的间距太大，没有可选的方案供青蛙跳跃过去。
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} stones
 * @return {boolean}
 */
// var canCross = function(stones) {
//     //dp[i][k]表示是否能从前面的任意石头j跳k步到达i
//     //dp[i][k] = dp[j][k-1] || dp[j][k] || dp[j][k+1]
//     let N = stones.length
//     let dp = Array.from(new Array(N + 1), () => new Array(N + 1).fill(false))
//     dp[0][0] = true
//
//     for (let i = 1; i < N; i++) {
//         for (let j = 0; j < i; j++) {
//             let k = stones[i] - stones[j]
//             if (k < N + 1) {
//                 dp[i][k] = dp[j][k - 1] || dp[j][k] || dp[j][k + 1]
//                 if (i == N - 1 && dp[i][k]) return true
//             }
//         }
//     }
//
//     return false
// }
var canCross = function(stones) {
    //dp[i][j]表示能否从下标j跳到下标i
    let N = stones.length
    if (stones[1] != 1) return false
    let map = new Map()
    for (let i = 0; i < N; i++) map.set(stones[i], i)
    let dp = Array.from(new Array(N + 1), () => new Array(N + 1).fill(false))
    dp[1][0] = true

    for (let i = 1; i < N; i++) {
        for (let j = 0; j < i; j++) {
            if (!dp[i][j]) continue
            let dis = stones[i] - stones[j]
            for (let k = -1; k <= 1; k++) {
                let next = dis + k
                let nextStone = map.get(stones[i] + next)
                if (next > 0 && nextStone>0) {
                    dp[nextStone][i] = true
                }
            }
        }
    }

    for(let i=0; i<N; i++) {
        if(dp[N-1][i]) return true
    }
    return false
}
//leetcode suit region end(Prohibit modification and deletion)
