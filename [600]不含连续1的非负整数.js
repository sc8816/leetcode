//给定一个正整数 n，找出小于或等于 n 的非负整数中，其二进制表示不包含 连续的1 的个数。
//
// 示例 1:
//
// 输入: 5
//输出: 5
//解释:
//下面是带有相应二进制表示的非负整数<= 5：
//0 : 0
//1 : 1
//2 : 10
//3 : 11
//4 : 100
//5 : 101
//其中，只有整数3违反规则（有两个连续的1），其他5个满足规则。
//
// 说明: 1 <= n <= 109
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} num
 * @return {number}
 */
var findIntegers = function(num) {
    let dp = new Array()
    let sum = 0
    let binary = Number(num).toString(2)
    let N = binary.length
    dp[0] = 1
    dp[1] = 2
    for (let i = 2; i < 32; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    //dp[i]表示的是存在i位二进制，不存在连续1的组成
    //遍历2进制数，如果当前位为1，就把当前位置当成0 计算 减去当前位后面能有多少种结果
    //如果出现两个连续的1 终止计算
    //1010 分成0-111以及 1000-1010
    for (let i = 0, k = N; i < N; i++, k--) {
        if (binary[i] == '1') {
            sum += dp[k-1]
            if(i>0 && binary[i-1]=='1'){
                return sum
            }
        }
    }
    sum++
    return sum
}

console.log(findIntegers(15))
//leetcode submit region end(Prohibit modification and deletion)
