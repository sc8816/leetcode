//
//
// 二指输入法定制键盘在 XY 平面上的布局如上图所示，其中每个大写英文字母都位于某个坐标处，例如字母 A 位于坐标 (0,0)，字母 B 位于坐标 (0,1
//)，字母 P 位于坐标 (2,3) 且字母 Z 位于坐标 (4,1)。
//
// 给你一个待输入字符串 word，请你计算并返回在仅使用两根手指的情况下，键入该字符串需要的最小移动总距离。坐标 (x1,y1) 和 (x2,y2) 之间的
//距离是 |x1 - x2| + |y1 - y2|。
//
// 注意，两根手指的起始位置是零代价的，不计入移动总距离。你的两根手指的起始位置也不必从首字母或者前两个字母开始。
//
//
//
// 示例 1：
//
// 输入：word = "CAKE"
//输出：3
//解释：
//使用两根手指输入 "CAKE" 的最佳方案之一是：
//手指 1 在字母 'C' 上 -> 移动距离 = 0
//手指 1 在字母 'A' 上 -> 移动距离 = 从字母 'C' 到字母 'A' 的距离 = 2
//手指 2 在字母 'K' 上 -> 移动距离 = 0
//手指 2 在字母 'E' 上 -> 移动距离 = 从字母 'K' 到字母 'E' 的距离  = 1
//总距离 = 3
//
//
// 示例 2：
//
// 输入：word = "HAPPY"
//输出：6
//解释：
//使用两根手指输入 "HAPPY" 的最佳方案之一是：
//手指 1 在字母 'H' 上 -> 移动距离 = 0
//手指 1 在字母 'A' 上 -> 移动距离 = 从字母 'H' 到字母 'A' 的距离 = 2
//手指 2 在字母 'P' 上 -> 移动距离 = 0
//手指 2 在字母 'P' 上 -> 移动距离 = 从字母 'P' 到字母 'P' 的距离 = 0
//手指 1 在字母 'Y' 上 -> 移动距离 = 从字母 'A' 到字母 'Y' 的距离 = 4
//总距离 = 6
//
//
// 示例 3：
//
// 输入：word = "NEW"
//输出：3
//
//
// 示例 4：
//
// 输入：word = "YEAR"
//输出：7
//
//
//
//
// 提示：
//
//
// 2 <= word.length <= 300
// 每个 word[i] 都是一个大写英文字母。
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} word
 * @return {number}
 */
var minimumDistance = function (word) {
    //dp[i][j][k] 表示走到下标i位置，左手位置为j,右手位置为k
    let helper = (i, j) => {
        let x = Math.floor(i / 6)
        let y = i % 6
        let x1 = Math.floor(j / 6)
        let y1 = j % 6
        return Math.abs(x - x1) + Math.abs(y - y1)
    }

    let dp = []
    let n = word.length
    for (let i = 0; i <= n; i++) {
        dp[i] = []
        for (let j = 0; j < 26; j++) {
            dp[i][j] = []
            for (let k = 0; k < 26; k++) {
                if (i == 0) dp[i][j][k] = 0
                else dp[i][j][k] = Infinity
            }
        }
    }
    let ans = Infinity
    for (let i = 1; i <= n; i++) {
        let v = word[i - 1].charCodeAt() - 'A'.charCodeAt()
        for (let j = 0; j < 26; j++) {
            for (let k = 0; k < 26; k++) {
                if(dp[i-1][j][k]!=Infinity) {
                    dp[i][v][k] = Math.min(dp[i][v][k], dp[i-1][j][k] + helper(j, v)) //移动左手
                    dp[i][j][v] = Math.min(dp[i][j][v], dp[i-1][j][k] + helper(k, v)) //移动右手
                }
                if(i==n){
                    ans = Math.min(ans, dp[i][v][k], dp[i][j][v])
                }
            }
        }
    }

    return ans
};
//leetcode submit region end(Prohibit modification and deletion)
