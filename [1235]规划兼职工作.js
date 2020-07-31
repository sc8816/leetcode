//你打算利用空闲时间来做兼职工作赚些零花钱。
//
// 这里有 n 份兼职工作，每份工作预计从 startTime[i] 开始到 endTime[i] 结束，报酬为 profit[i]。
//
// 给你一份兼职工作表，包含开始时间 startTime，结束时间 endTime 和预计报酬 profit 三个数组，请你计算并返回可以获得的最大报酬。
//
// 注意，时间上出现重叠的 2 份工作不能同时进行。
//
// 如果你选择的工作在时间 X 结束，那么你可以立刻进行在时间 X 开始的下一份工作。
//
//
//
// 示例 1：
//
//
//
// 输入：startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
//输出：120
//解释：
//我们选出第 1 份和第 4 份工作，
//时间范围是 [1-3]+[3-6]，共获得报酬 120 = 50 + 70。
//
//
// 示例 2：
//
//
//
// 输入：startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60
//]
//输出：150
//解释：
//我们选择第 1，4，5 份工作。
//共获得报酬 150 = 20 + 70 + 60。
//
//
// 示例 3：
//
//
//
// 输入：startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]
//输出：6
//
//
//
//
// 提示：
//
//
// 1 <= startTime.length == endTime.length == profit.length <= 5 * 10^4
// 1 <= startTime[i] < endTime[i] <= 10^9
// 1 <= profit[i] <= 10^4
//
// Related Topics 排序 二分查找 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} startTime
 * @param {number[]} endTime
 * @param {number[]} profit
 * @return {number}
 */
var jobScheduling = function(startTime, endTime, profit) {
    let job = []
    for (let i = 0; i < profit.length; i++) {
        job.push({
            startTime: startTime[i],
            endTime: endTime[i],
            profit: profit[i]
        })
    }
    job.sort((a, b) => a.endTime - b.endTime)
    let dp = [0]
    let N = profit.length
    //记录前面能获得的最大收益
    let pre = []
    //所以我们在查找的过程中只要逆序查找正好找到了这个点我们直接加上当前在该点获得的最大收益然后break不需要再往前进行查找
    for (let i = 1; i <= N; i++) {
        for (let j = i - 1; j >= 1; j--) {
            if (job[i - 1].startTime >= job[j - 1].endTime) {
                pre[i] = j
                break
            }
        }
    }
    //查找dp
    // console.log(pre)
    for (let i = 1; i <= N; i++) {
        dp[i] = Math.max(dp[i - 1], job[i - 1].profit + (pre[i] ? dp[pre[i]] : 0))
    }

    return dp[N]
    // console.log(dp)
}
//leetcode submit region end(Prohibit modification and deletion)
