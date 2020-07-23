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
    for(let i=0; i<=n; i++){
        let remain = i
        while (remain){
            if(remain % 10 == 2) ans++
            remain = Math.floor(remain/10)
        }
    }

    return ans
};

console.log(numberOf2sInRange(559366752))
//leetcode submit region end(Prohibit modification and deletion)
