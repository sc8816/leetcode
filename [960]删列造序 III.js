//给定由 N 个小写字母字符串组成的数组 A，其中每个字符串长度相等。
//
// 选取一个删除索引序列，对于 A 中的每个字符串，删除对应每个索引处的字符。
//
// 比如，有 A = ["babca","bbazb"]，删除索引序列 {0, 1, 4}，删除后 A 为["bc","az"]。
//
// 假设，我们选择了一组删除索引 D，那么在执行删除操作之后，最终得到的数组的行中的每个元素都是按字典序排列的。
//
// 清楚起见，A[0] 是按字典序排列的（即，A[0][0] <= A[0][1] <= ... <= A[0][A[0].length - 1]），A[1]
// 是按字典序排列的（即，A[1][0] <= A[1][1] <= ... <= A[1][A[1].length - 1]），依此类推。
//
// 请你返回 D.length 的最小可能值。
//
//
//
// 示例 1：
//
// 输入：["babca","bbazb"]
//输出：3
//解释：
//删除 0、1 和 4 这三列后，最终得到的数组是 A = ["bc", "az"]。
//这两行是分别按字典序排列的（即，A[0][0] <= A[0][1] 且 A[1][0] <= A[1][1]）。
//注意，A[0] > A[1] —— 数组 A 不一定是按字典序排列的。
//
//
// 示例 2：
//
// 输入：["edcba"]
//输出：4
//解释：如果删除的列少于 4 列，则剩下的行都不会按字典序排列。
//
//
// 示例 3：
//
// 输入：["ghi","def","abc"]
//输出：0
//解释：所有行都已按字典序排列。
//
//
//
//
// 提示：
//
//
// 1 <= A.length <= 100
// 1 <= A[i].length <= 100
//
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string[]} A
 * @return {number}
 */
var minDeletionSize = function(A) {
    let dp = new Array(A[0].length).fill(1)
    let max = 1 //当前应该保留的长度

    for (let i = 1; i < A[0].length; i++) {
        for (let j = 0; j < i; j++) {
            for (let k = 0; k < A.length; k++) {
                if (A[k][j] > A[k][i]) break //当前只要存在一个元素不满足，到下一个循环
                else if (k == A.length-1) { //只有当所有的元素都满足A[k][j] <= A[k][i]时才进行
                    dp[i] = Math.max(dp[i], dp[j] + 1) //当前保留的长度加1
                    max = Math.max(dp[i], max)
                }
            }
        }
    }

    return A[0].length - max
}
//leetcode submit region end(Prohibit modification and deletion)
