//段式回文 其实与 一般回文 类似，只不过是最小的单位是 一段字符 而不是 单个字母。
//
// 举个例子，对于一般回文 "abcba" 是回文，而 "volvo" 不是，但如果我们把 "volvo" 分为 "vo"、"l"、"vo" 三段，则可以认为
// “(vo)(l)(vo)” 是段式回文（分为 3 段）。
//
//
//
// 给你一个字符串 text，在确保它满足段式回文的前提下，请你返回 段 的 最大数量 k。
//
// 如果段的最大数量为 k，那么存在满足以下条件的 a_1, a_2, ..., a_k：
//
//
// 每个 a_i 都是一个非空字符串；
// 将这些字符串首位相连的结果 a_1 + a_2 + ... + a_k 和原始字符串 text 相同；
// 对于所有1 <= i <= k，都有 a_i = a_{k+1 - i}。
//
//
//
//
// 示例 1：
//
// 输入：text = "ghiabcdefhelloadamhelloabcdefghi"
//输出：7
//解释：我们可以把字符串拆分成 "(ghi)(abcdef)(hello)(adam)(hello)(abcdef)(ghi)"。
//
//
// 示例 2：
//
// 输入：text = "merchant"
//输出：1
//解释：我们可以把字符串拆分成 "(merchant)"。
//
//
// 示例 3：
//
// 输入：text = "antaprezatepzapreanta"
//输出：11
//解释：我们可以把字符串拆分成 "(a)(nt)(a)(pre)(za)(tpe)(za)(pre)(a)(nt)(a)"。
//
//
// 示例 4：
//
// 输入：text = "aaa"
//输出：3
//解释：我们可以把字符串拆分成 "(a)(a)(a)"。
//
//
//
//
// 提示：
//
//
// text 仅由小写英文字符组成。
// 1 <= text.length <= 1000
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} text
 * @return {number}
 */
var longestDecomposition = function(text) {
    //dp[i]表示0-i-1中段式回文有多少个
    //如果存在 j-i中这个字符串和后面的字符串一样，那么 dp[i] = dp[j] + 1
    let N = text.length
    let res = 1
    let dp = new Array(N).fill(-1)
    dp[0] = 0
    let left = 0 //记录前面能够构成段式回文的下标，前面的不需要再次查找
    let checkValid = (i, j) => {
        for (let m = j; m < i; m++) {
            if (text[m] != text[N - i + m - j]) return false
        }
        return true
    }
    for (let i = 1; i <= Math.floor(N / 2); i++) {
        for (let j = left; j < i; j++) {
            if (dp[j] == -1) continue //当前j位置不能构成段式回文
            if (!checkValid(i, j)) continue
            dp[i] = dp[j] + 1
            left = i
        }
    }
    // console.log(dp, left)
    return Math.max(res, dp[left] * 2 + (left * 2 < N ? 1 : 0))
}
//leetcode submit region end(Prohibit modification and deletion)
