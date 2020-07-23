//把字符串 s 看作是“abcdefghijklmnopqrstuvwxyz”的无限环绕字符串，所以 s 看起来是这样的："...zabcdefghijklm
//nopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcd....".
//
// 现在我们有了另一个字符串 p 。你需要的是找出 s 中有多少个唯一的 p 的非空子串，尤其是当你的输入是字符串 p ，你需要输出字符串 s 中 p 的不同
//的非空子串的数目。
//
// 注意: p 仅由小写的英文字母组成，p 的大小可能超过 10000。
//
//
//
// 示例 1:
//
//
//输入: "a"
//输出: 1
//解释: 字符串 S 中只有一个"a"子字符。
//
//
//
//
// 示例 2:
//
//
//输入: "cac"
//输出: 2
//解释: 字符串 S 中的字符串“cac”只有两个子串“a”、“c”。.
//
//
//
//
// 示例 3:
//
//
//输入: "zab"
//输出: 6
//解释: 在字符串 S 中有六个子串“z”、“a”、“b”、“za”、“ab”、“zab”。.
//
//
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} p
 * @return {number}
 */
var findSubstringInWraproundString = function(p) {
    let isContinue = (s, s1) => {
        if (s == 'z') return s1 == 'a'
        return s1.charCodeAt() - s.charCodeAt() == 1
    }

    let dp = new Array(26).fill(0)
    let k = 0
    for (let i = 0; i < p.length; i++) {
        if (i > 0 && isContinue(p[i - 1], p[i])) {
            k++
        }else{
            k=1
        }
        dp[p[i].charCodeAt()-'a'.charCodeAt()] = Math.max(dp[p[i].charCodeAt()-'a'.charCodeAt()], k)
    }
    
    return dp.reduce((a, b)=> a+b)
    
}
//leetcode submit region end(Prohibit modification and deletion)
