//给定一个字符串 s1，我们可以把它递归地分割成两个非空子字符串，从而将其表示为二叉树。
//
// 下图是字符串 s1 = "great" 的一种可能的表示形式。
//
//     great
//   /    \
//  gr    eat
// / \    /  \
//g   r  e   at
//           / \
//          a   t
//
//
// 在扰乱这个字符串的过程中，我们可以挑选任何一个非叶节点，然后交换它的两个子节点。
//
// 例如，如果我们挑选非叶节点 "gr" ，交换它的两个子节点，将会产生扰乱字符串 "rgeat" 。
//
//     rgeat
//   /    \
//  rg    eat
// / \    /  \
//r   g  e   at
//           / \
//          a   t
//
//
// 我们将 "rgeat” 称作 "great" 的一个扰乱字符串。
//
// 同样地，如果我们继续交换节点 "eat" 和 "at" 的子节点，将会产生另一个新的扰乱字符串 "rgtae" 。
//
//     rgtae
//   /    \
//  rg    tae
// / \    /  \
//r   g  ta  e
//       / \
//      t   a
//
//
// 我们将 "rgtae” 称作 "great" 的一个扰乱字符串。
//
// 给出两个长度相等的字符串 s1 和 s2，判断 s2 是否是 s1 的扰乱字符串。
//
// 示例 1:
//
// 输入: s1 = "great", s2 = "rgeat"
//输出: true
//
//
// 示例 2:
//
// 输入: s1 = "abcde", s2 = "caebd"
//输出: false
// Related Topics 字符串 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var isScramble = function(s1, s2) {
    //dp[i][j][k]表示从s1[i]，s2[j]开始长度为k是否为扰乱字符串
    if (s1.length != s2.length) return false
    let m = s1.length
    let dp = []
    for (let i = 0; i < m; i++) {
        dp[i] = Array()
        for (let j = 0; j < m; j++) {
            dp[i][j] = Array()
            for (let k = 0; k <= m; k++) {
                dp[i][j][k] = false
                if (k == 1) dp[i][j][k] = s1[i] === s2[j]
            }
        }
    }

    for (let k = 2; k <= m; k++) { //整体的长度
        for (let i = 0; i < m-k+1; i++) {
            for (let j = 0; j < m-k+1; j++) {
                for (let l = 1; l < k; l++) { //我们切割的长度
                    if (dp[i][j][l] && dp[i + l][j + l][k - l]) {
                        dp[i][j][k] = true
                        break
                    }
                    if(dp[i][j+k-l][l] && dp[i+l][j][k-l]){
                        dp[i][j][k] = true
                        break
                    }
                }
            }
        }
    }
    return dp[0][0][m]
}
//leetcode submit region end(Prohibit modification and deletion)
