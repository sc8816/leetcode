//一条包含字母 A-Z 的消息通过以下的方式进行了编码：
//
// 'A' -> 1
//'B' -> 2
//...
//'Z' -> 26
//
//
// 除了上述的条件以外，现在加密字符串可以包含字符 '*'了，字符'*'可以被当做1到9当中的任意一个数字。
//
// 给定一条包含数字和字符'*'的加密信息，请确定解码方法的总数。
//
// 同时，由于结果值可能会相当的大，所以你应当对109 + 7取模。（翻译者标注：此处取模主要是为了防止溢出）
//
// 示例 1 :
//
// 输入: "*"
//输出: 9
//解释: 加密的信息可以被解密为: "A", "B", "C", "D", "E", "F", "G", "H", "I".
//
//
// 示例 2 :
//
// 输入: "1*"
//输出: 9 + 9 = 18（翻译者标注：这里1*可以分解为1,* 或者当做1*来处理，所以结果是9+9=18）
//
//
// 说明 :
//
//
// 输入的字符串长度范围是 [1, 105]。
// 输入的字符串只会包含字符 '*' 和 数字'0' - '9'。
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {
    let M = Math.pow(10, 9) + 7
    let N = s.length
    if (s == '' || s[0] == '0') return 0
    //dp[i]表示
    let dp = new Array(N + 1).fill(0)
    dp[0] = 1
    dp[1] = s[0] == '0' ? 0 : s[0] == '*' ? 9 : 1
    for (let i = 1; i < N; i++) {
        if (s[i] == '*') {
            dp[i + 1] = 9 * dp[i] // 第i位单独组成一个
            if (s[i - 1] == '1') { //和前面的组成两位数
                dp[i + 1] = (dp[i + 1] + 9 * dp[i - 1]) % M
            } else if (s[i - 1] == '2') {
                dp[i + 1] = (dp[i + 1] + 6 * dp[i - 1]) % M
            } else if (s[i - 1] == '*') {
                dp[i + 1] = (dp[i + 1] + 15 * dp[i - 1]) % M
            }
        } else {
            dp[i + 1] = s[i] == '0' ? 0 : dp[i]
            if (s[i - 1] == '1') {
                dp[i + 1] = (dp[i + 1] + dp[i - 1]) % M
            } else if (s[i - 1] == '2' && s[i] <= 6) {
                dp[i + 1] = (dp[i + 1] + dp[i - 1]) % M
            } else if (s[i - 1] == '*') { //小于6 可以选择1、2，大于6 只能选择1
                dp[i + 1] = (dp[i + 1] + (s[i] <= 6 ? 2 : 1) * dp[i - 1]) % M
            }
        }
    }
    return dp[N]
}
//leetcode submit region end(Prohibit modification and deletion)
