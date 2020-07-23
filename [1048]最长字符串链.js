//给出一个单词列表，其中每个单词都由小写英文字母组成。
//
// 如果我们可以在 word1 的任何地方添加一个字母使其变成 word2，那么我们认为 word1 是 word2 的前身。例如，"abc" 是 "abac
//" 的前身。
//
// 词链是单词 [word_1, word_2, ..., word_k] 组成的序列，k >= 1，其中 word_1 是 word_2 的前身，word_
//2 是 word_3 的前身，依此类推。
//
// 从给定单词列表 words 中选择单词组成词链，返回词链的最长可能长度。
//
//
// 示例：
//
// 输入：["a","b","ba","bca","bda","bdca"]
//输出：4
//解释：最长单词链之一为 "a","ba","bda","bdca"。
//
//
//
//
// 提示：
//
//
// 1 <= words.length <= 1000
// 1 <= words[i].length <= 16
// words[i] 仅由小写英文字母组成。
//
//
//
// Related Topics 哈希表 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string[]} words
 * @return {number}
 */
var longestStrChain = function(words) {
    let isPre = (s, t) => {
        let a = s.length, b = t.length
        if (a + 1 != b) return false
        let i = 0, j = 0
        while (i < a && j < b) {
            if (s[i] == t[j]) i++
            j++
        }
        return i == a
    }
    let max = 1
    words.sort((a, b) => a.length - b.length)
    let dp = new Array(words.length + 1).fill(1)
    for (let i = 0; i < words.length; i++) {
        let a = words[i]
        for (let j = i + 1; j < words.length; j++) {
            let b = words[j]
            console.log(a, b)
            if (isPre(a, b)) {
                dp[j] = Math.max(dp[j], dp[i] + 1)
                max = Math.max(dp[j], max)
            }
        }
    }
    // console.log(dp)
    return max
}
//leetcode submit region end(Prohibit modification and deletion)
