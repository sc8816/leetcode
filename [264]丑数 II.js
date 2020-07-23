//编写一个程序，找出第 n 个丑数。
//
// 丑数就是质因数只包含 2, 3, 5 的正整数。
//
// 示例:
//
// 输入: n = 10
//输出: 12
//解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。
//
// 说明:
//
//
// 1 是丑数。
// n 不超过1690。
//
// Related Topics 堆 数学 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @return {number}
 */
var nthUglyNumber = function(n) {
    let p1 =0,p2=0, p3=0;
    let res = [1]
    while (n>1){
      let temp = Math.min(res[p1]*2, res[p2]*3, res[p3]*5)
      res.push(temp)
      if(temp===res[p1]*2) p1++
      if(temp===res[p2]*3) p2++
      if(temp===res[p3]*5) p3++
      n--
    }
    return res.pop()
};
//leetcode submit region end(Prohibit modification and deletion)
