//给定一个非负整数 n，计算各位数字都不同的数字 x 的个数，其中 0 ≤ x < 10n 。
//
// 示例:
//
// 输入: 2
//输出: 91
//解释: 答案应为除去 11,22,33,44,55,66,77,88,99 外，在 [0,100) 区间内的所有数字。
//
// Related Topics 数学 动态规划 回溯算法


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} n
 * @return {number}
 */


//各位数字都不同。
  //来详解一下
  //dp[i]=dp[i-1]+(dp[i-1]-dp[i-2])*(10-(i-1));
  //加上dp[i-1]没什么可说的，加上之前的数字
  //dp[i-1]-dp[i-2]的意思是我们上一次较上上一次多出来的各位不重复的数字。以n=3为例，n=2已经计算了0-99之间不重复的数字了，
  // 我们需要判断的是100-999之间不重复的数字，那也就只能用10-99之间的不重复的数去组成三位数，而不能使用0-9之间的不重复的数，
  // 因为他们也组成不了3位数。而10-99之间不重复的数等于dp[2]-dp[1]。
  //当i=2时，说明之前选取的数字只有
  //1位，那么我们只要与这一位不重复即可，所以其实有9(10-1)种情况（比如1，后面可以跟0,2,3,4,5,6,7,8,9）。
  //当i=3时，说明之前选取的数字有2位，那么我们需要与2位不重复，所以剩余的
  //有8（10-2）种（比如12，后面可以跟0,3,4,5,6,7,8,9）
var countNumbersWithUniqueDigits = function(n) {
  if(n==0) return 1
  let first = 10
  let second = 9*9
  for(let i=2; i<=n; i++){
    first += second
    second*=(10-i)
  }
  return first
};
//leetcode submit region end(Prohibit modification and deletion)
