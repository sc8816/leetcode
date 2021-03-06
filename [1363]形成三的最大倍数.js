//给你一个整数数组 digits，你可以通过按任意顺序连接其中某些数字来形成 3 的倍数，请你返回所能得到的最大的 3 的倍数。
//
// 由于答案可能不在整数数据类型范围内，请以字符串形式返回答案。
//
// 如果无法得到答案，请返回一个空字符串。
//
//
//
// 示例 1：
//
// 输入：digits = [8,1,9]
//输出："981"
//
//
// 示例 2：
//
// 输入：digits = [8,6,7,1,0]
//输出："8760"
//
//
// 示例 3：
//
// 输入：digits = [1]
//输出：""
//
//
// 示例 4：
//
// 输入：digits = [0,0,0,0,0,0]
//输出："0"
//
//
//
//
// 提示：
//
//
// 1 <= digits.length <= 10^4
// 0 <= digits[i] <= 9
// 返回的结果不应包含不必要的前导零。
//
// Related Topics 数学 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} digits
 * @return {string}
 */
var largestMultipleOfThree = function (digits) {
    let count = Array(10).fill(0)
    let sum = 0
    let ans = ''
    for (let d of digits) {
        count[d]++
        sum += d
    }
    let del = (i) => {
        while (i <= 9) {
            if (count[i]) {
                count[i]--
                return 1
            }
            i += 3
        }
        return 0
    }

    if (sum % 3 == 1) {
        if (!del(1)) del(2) && del(2)
    } else if (sum % 3 == 2) {
        if (!del(2)) del(1) && del(1)
    }

    for (let i = 9; i >= 0; i--) {
        while (count[i]--) {
            ans += i
        }
    }
    if (ans[0] == 0) return '0'
    if (ans == '') return ''
    return ans
};
//leetcode submit region end(Prohibit modification and deletion)
