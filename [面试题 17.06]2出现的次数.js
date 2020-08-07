//编写一个方法，计算从 0 到 n (含 n) 中数字 2 出现的次数。
//
// 示例:
//
// 输入: 25
//输出: 9
//解释: (2, 12, 20, 21, 22, 23, 24, 25)(注意 22 应该算作两次)
//
// 提示：
//
//
// n <= 10^9
//
// Related Topics 数学 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @return {number}
 */
var numberOf2sInRange = function(n) {
    let ans = 0
    let m = String(n).split('').reverse().join('')

    for (let i = 1; i <= m.length; i++) {
        //
        let a = Math.floor(n / 10 ** i)
        //前面存在a个 10的i-1次方个
        ans += a * (10 ** (i - 1))
        let digit = m[i - 1] - '0'
        if (digit > 2) {
            ans += 10 ** (i - 1)
        }
        if (digit == 2) {
            ans += n % (10 ** (i - 1)) + 1
        }
    }

    return ans
}
//leetcode submit region end(Prohibit modification and deletion)
