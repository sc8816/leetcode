//给定正整数 N，返回小于等于 N 且具有至少 1 位重复数字的正整数的个数。
//
//
//
// 示例 1：
//
// 输入：20
//输出：1
//解释：具有至少 1 位重复数字的正数（<= 20）只有 11 。
//
//
// 示例 2：
//
// 输入：100
//输出：10
//解释：具有至少 1 位重复数字的正数（<= 100）有 11，22，33，44，55，66，77，88，99 和 100 。
//
//
// 示例 3：
//
// 输入：1000
//输出：262
//
//
//
//
// 提示：
//
//
// 1 <= N <= 10^9
//
// Related Topics 数学 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} N
 * @return {number}
 */
var numDupDigitsAtMostN = function(N) {
    let fact = (n) => {
        if (n == 1 || n == 0) {
            return 1
        }
        return n * fact(n - 1)
    }
    let A = (m, n) => {
        return fact(m) / fact(m - n)
    }
    //找到所有不重复的数字
    let helper = (n) => {
        let used = new Array(10).fill(0)
        let total = 0
        let digits = Array()
        while (n > 0) {
            digits.push(n % 10)
            n = Math.floor(n / 10)
        }
        let k = digits.length
        //计算首位为0的情况
        //为9 + 9*8 + 9 * 8 * 7 +。。。9*8...*1
        //i表示位数
        for (let i = k - 1; i >= 1; i--) {
            //从九位数中选出i-1位数
            total += 9 * A(9, i - 1)
        }

        //计算首位不为0的个数
        for (let i = k - 1; i >= 0; i--) {
            let cur = digits[i]
            //首位不为0
            for (let j = (i == k - 1) ? 1 : 0; j < cur; j++) {
                //前面如果已经选择了这个数我们不能再次选择
                if (used[j]) continue
                //当前我们在该位置上选择的数字小于原来的数时，后面的数字不需要管大小，就是未选择的数（10-当前已经选择完的几位数）的全排列
                total += A(10 - (k - i), i)
            }
            used[cur]++
            if (used[cur] > 1) break
            if (i == 0) total += 1
        }
        return total
    }
    return N - helper(N)
}
//leetcode submit region end(Prohibit modification and deletion)
