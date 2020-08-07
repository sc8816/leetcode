//有个马戏团正在设计叠罗汉的表演节目，一个人要站在另一人的肩膀上。出于实际和美观的考虑，在上面的人要比下面的人矮一点且轻一点。已知马戏团每个人的身高和体重，请
//编写代码计算叠罗汉最多能叠几个人。
//
// 示例：
//
// 输入：height = [65,70,56,75,60,68] weight = [100,150,90,190,95,110]
//输出：6
//解释：从上往下数，叠罗汉最多能叠 6 层：(56,90), (60,95), (65,100), (68,110), (70,150), (75,190)
//
//
// 提示：
//
//
// height.length == weight.length <= 10000
//
// Related Topics 排序 二分查找 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} height
 * @param {number[]} weight
 * @return {number}
 */
var bestSeqAtIndex = function(height, weight) {
    let person = []
    let n = height.length
    for (let i = 0; i < n; i++) {
        person.push({
            height: height[i],
            weight: weight[i]
        })
    }
    person.sort((a, b) => {
        if (a.height == b.height) return b.weight - a.weight
        return a.height - b.height
    })

    let res = 0
    let dp = []
    for (let p of person) {
        let w = p.weight
        let h = p.height
        let i = 0
        let j = res
        while (j > i) {
            let mid = (i + j) >> 1
            if (dp[mid] < w) {
                i = mid + 1
            } else {
                j = mid
            }
        }
        dp[i] = w
        if (j == res) res++
    }

    return res
}
//leetcode submit region end(Prohibit modification and deletion)
