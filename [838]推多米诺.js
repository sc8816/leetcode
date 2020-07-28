//一行中有 N 张多米诺骨牌，我们将每张多米诺骨牌垂直竖立。
//
// 在开始时，我们同时把一些多米诺骨牌向左或向右推。
//
//
//
// 每过一秒，倒向左边的多米诺骨牌会推动其左侧相邻的多米诺骨牌。
//
// 同样地，倒向右边的多米诺骨牌也会推动竖立在其右侧的相邻多米诺骨牌。
//
// 如果同时有多米诺骨牌落在一张垂直竖立的多米诺骨牌的两边，由于受力平衡， 该骨牌仍然保持不变。
//
// 就这个问题而言，我们会认为正在下降的多米诺骨牌不会对其它正在下降或已经下降的多米诺骨牌施加额外的力。
//
// 给定表示初始状态的字符串 "S" 。如果第 i 张多米诺骨牌被推向左边，则 S[i] = 'L'；如果第 i 张多米诺骨牌被推向右边，则 S[i] = '
//R'；如果第 i 张多米诺骨牌没有被推动，则 S[i] = '.'。
//
// 返回表示最终状态的字符串。
//
// 示例 1：
//
// 输入：".L.R...LR..L.."
//输出："LL.RR.LLRRLL.."
//
// 示例 2：
//
// 输入："RR.L"
//输出："RR.L"
//说明：第一张多米诺骨牌没有给第二张施加额外的力。
//
// 提示：
//
//
// 0 <= N <= 10^5
// 表示多米诺骨牌状态的字符串只含有 'L'，'R'; 以及 '.';
//
// Related Topics 双指针 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} dominoes
 * @return {string}
 */
var pushDominoes = function(dominoes) {
    let N = dominoes.length
    let dp = new Array(N).fill(0)
    //dp[i]==0表示当前位置为. dp[i]==1表示当前位置为R,dp[i]==-1表示为L
    for (let i = 0; i < N; i++) {
        if (dominoes[i] == 'R') dp[i] = 1
        if (dominoes[i] == 'L') dp[i] = -1
    }
    for (let i = 0; i < N; i++) {
        //当前位置是R同时后面元素为.
        if (dp[i] > 0 && i + 1 < N && dp[i + 1] == 0) {
            dp[i + 1] = dp[i] + 1 //加1是为了记录当前遍历到L元素时候判断两边的相对距离
            continue
        }
        let j = i
        //当前位置为L（同时左边元素是.或者前一个元素离左边的元素更近我们需要进行位置扭正）
        while (dp[j] < 0 && j - 1 >= 0 && (dp[j - 1] == 0 || dp[j] + dp[j - 1] > 0)) {
            //两边相对距离一样，状态不扭转，置为0
            if (dp[j - 1] + dp[j] == 1) {
                dp[j - 1] = 0
                break
            } else {
                dp[j - 1] = dp[j] - 1
            }
            j--
        }
    }
    let res = ''
    for (let state of dp) {
        if (state > 0) res += 'R'
        else if (state < 0) res += 'L'
        else res += '.'
    }

    return res
}
//leetcode submit region end(Prohibit modification and deletion)
