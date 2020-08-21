//在 "100 game" 这个游戏中，两名玩家轮流选择从 1 到 10 的任意整数，累计整数和，先使得累计整数和达到 100 的玩家，即为胜者。
//
// 如果我们将游戏规则改为 “玩家不能重复使用整数” 呢？
//
// 例如，两个玩家可以轮流从公共整数池中抽取从 1 到 15 的整数（不放回），直到累计整数和 >= 100。
//
// 给定一个整数 maxChoosableInteger （整数池中可选择的最大数）和另一个整数 desiredTotal（累计和），判断先出手的玩家是否能稳
//赢（假设两位玩家游戏时都表现最佳）？
//
// 你可以假设 maxChoosableInteger 不会大于 20， desiredTotal 不会大于 300。
//
// 示例：
//
// 输入：
//maxChoosableInteger = 10
//desiredTotal = 11
//
//输出：
//false
//
//解释：
//无论第一个玩家选择哪个整数，他都会失败。
//第一个玩家可以选择从 1 到 10 的整数。
//如果第一个玩家选择 1，那么第二个玩家只能选择从 2 到 10 的整数。
//第二个玩家可以通过选择整数 10（那么累积和为 11 >= desiredTotal），从而取得胜利.
//同样地，第一个玩家选择任意其他整数，第二个玩家都会赢。
//
// Related Topics 极小化极大 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number} maxChoosableInteger
 * @param {number} desiredTotal
 * @return {boolean}
 */
var canIWin = function (maxChoosableInteger, desiredTotal) {
    //状压dp
    //因为maxChoosableInteger不超过20， 我们定义一个20位的二进制数，分别表示每个数字是否被使用
    //如果我们的最大值直接大于目标值直接返回true
    //如果总和小于目标值返回false
    if (maxChoosableInteger >= desiredTotal) return true
    if (maxChoosableInteger * (maxChoosableInteger + 1) / 2 < desiredTotal) {
        return false;
    }
    let dp = new Array(1 << maxChoosableInteger)

    let dfs = (total, dp, state) => {
        if(total<=0) return false
        if(dp[state]!=null) return dp[state]

        for(let i=maxChoosableInteger; i>=1; i--){
            if((state>>i & 1)==0 && !dfs(total-i, dp, (1<<i)|state)){
                return dp[state] = true
            }
        }

        return dp[state] = false
    }

    return dfs(desiredTotal, dp, 0)
};
//leetcode submit region end(Prohibit modification and deletion)
