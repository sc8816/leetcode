//我们给出 S，一个源于 {'D', 'I'} 的长度为 n 的字符串 。（这些字母代表 “减少” 和 “增加”。）
//有效排列 是对整数 {0, 1, ..., n} 的一个排列 P[0], P[1], ..., P[n]，使得对所有的 i：
//
//
// 如果 S[i] == 'D'，那么 P[i] > P[i+1]，以及；
// 如果 S[i] == 'I'，那么 P[i] < P[i+1]。
//
//
// 有多少个有效排列？因为答案可能很大，所以请返回你的答案模 10^9 + 7.
//
//
//
// 示例：
//
// 输入："DID"
//输出：5
//解释：
//(0, 1, 2, 3) 的五个有效排列是：
//(1, 0, 3, 2)
//(2, 0, 3, 1)
//(2, 1, 3, 0)
//(3, 0, 2, 1)
//(3, 1, 2, 0)
//
//
//
//
// 提示：
//
//
// 1 <= S.length <= 200
// S 仅由集合 {'D', 'I'} 中的字符组成。
//
//
//
// Related Topics 分治算法 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} S
 * @return {number}
 */
var numPermsDISequence = function(S) {
    //dp[i][j]表示0-i中最后一个元素是j的个数
    //如果当前元素S[i-1]=='D'下一个元素必须小于j
    //否则下一个元素必须大于j
    let N = S.length
    let MOD = Math.pow(10, 9) + 7
    let dp = Array.from(new Array(N + 1), () => new Array(N + 1).fill(0))
    dp[0][0] = 1
    for (let i = 1; i <= N; i++) {
        for (let j = 0; j <= i; j++) {
            if (S[i - 1] == 'D') {
                //查找j上一个元素k，跟上一步的状态有关系
                for (let k = j; k < i; k++) {
                    dp[i][j] += dp[i - 1][k]
                    dp[i][j] %= MOD
                }
            } else {
                for (let k = 0; k < j; k++) {
                    dp[i][j] += dp[i - 1][k]
                    dp[i][j] %= MOD
                }
            }

        }
    }
    let res = 0
    for (let i = 0; i <= N; i++) {
        res = (res + dp[N][i]) % MOD
    }
    return res
}
//leetcode submit region end(Prohibit modification and deletion)
