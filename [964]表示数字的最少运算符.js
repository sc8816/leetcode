//给定一个正整数 x，我们将会写出一个形如 x (op1) x (op2) x (op3) x ... 的表达式，其中每个运算符 op1，op2，… 可以是加
//、减、乘、除（+，-，*，或是 /）之一。例如，对于 x = 3，我们可以写出表达式 3 * 3 / 3 + 3 - 3，该式的值为 3 。
//
// 在写这样的表达式时，我们需要遵守下面的惯例：
//
//
// 除运算符（/）返回有理数。
// 任何地方都没有括号。
// 我们使用通常的操作顺序：乘法和除法发生在加法和减法之前。
// 不允许使用一元否定运算符（-）。例如，“x - x” 是一个有效的表达式，因为它只使用减法，但是 “-x + x” 不是，因为它使用了否定运算符。
//
//
// 我们希望编写一个能使表达式等于给定的目标值 target 且运算符最少的表达式。返回所用运算符的最少数量。
//
//
//
// 示例 1：
//
// 输入：x = 3, target = 19
//输出：5
//解释：3 * 3 + 3 * 3 + 3 / 3 。表达式包含 5 个运算符。
//
//
// 示例 2：
//
// 输入：x = 5, target = 501
//输出：8
//解释：5 * 5 * 5 * 5 - 5 * 5 * 5 + 5 / 5 。表达式包含 8 个运算符。
//
//
// 示例 3：
//
// 输入：x = 100, target = 100000000
//输出：3
//解释：100 * 100 * 100 * 100 。表达式包含 3 个运算符。
//
//
//
// 提示：
//
//
// 2 <= x <= 100
// 1 <= target <= 2 * 10^8
//
//
//
// Related Topics 数学 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} x
 * @param {number} target
 * @return {number}
 */
var leastOpsExpressTarget = function(x, target) {
    //返回对数
    let log = (x, y) => {
        let count = 0
        while (y / x >= 1) {
            count++
            y /= x
        }
        return count
    }
    let map = new Map()
    let dfs = (cur) => {
        // console.log(cur)
        if (map.get(cur)) return map.get(cur)
        if (cur == 0) return 0
        //判断做减法还是加法
        //加法的话每一个1需要两个符号-1
        //减法的话需要1 + 2*(x-cur) -1
        if (cur < x) {
            return Math.min(2 * cur - 1, (x - cur) * 2)
        }
        let p = log(x, cur)
        let sums = x ** p
        //正好是指数的话直接返回
        if (sums == cur) {
            map.set(cur, p - 1)
            return p - 1
        }
        //计算相差多少个数再加上前面相乘的
        let ans = dfs(cur - sums) + p
        //再乘一个x，计算多出来的数需要多少
        if (sums * x - cur < cur) {
            ans = Math.min(ans, p + 1 + dfs(sums * x - cur))
        }
        map.set(cur, ans)
        return ans
    }

    return dfs(target)
}
//leetcode submit region end(Prohibit modification and deletion)
