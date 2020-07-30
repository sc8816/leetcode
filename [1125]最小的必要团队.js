//作为项目经理，你规划了一份需求的技能清单 req_skills，并打算从备选人员名单 people 中选出些人组成一个「必要团队」（ 编号为 i 的备选人员
// people[i] 含有一份该备选人员掌握的技能列表）。
//
// 所谓「必要团队」，就是在这个团队中，对于所需求的技能列表 req_skills 中列出的每项技能，团队中至少有一名成员已经掌握。
//
// 我们可以用每个人的编号来表示团队中的成员：例如，团队 team = [0, 1, 3] 表示掌握技能分别为 people[0]，people[1]，和 p
//eople[3] 的备选人员。
//
// 请你返回 任一 规模最小的必要团队，团队成员用人员编号表示。你可以按任意顺序返回答案，本题保证答案存在。
//
//
//
// 示例 1：
//
// 输入：req_skills = ["java","nodejs","reactjs"], people = [["java"],["nodejs"],["
//nodejs","reactjs"]]
//输出：[0,2]
//
//
// 示例 2：
//
// 输入：req_skills = ["algorithms","math","java","reactjs","csharp","aws"], people
// = [["algorithms","math","java"],["algorithms","math","reactjs"],["java","csharp
//","aws"],["reactjs","csharp"],["csharp","math"],["aws","java"]]
//输出：[1,2]
//
//
//
//
// 提示：
//
//
// 1 <= req_skills.length <= 16
// 1 <= people.length <= 60
// 1 <= people[i].length, req_skills[i].length, people[i][j].length <= 16
// req_skills 和 people[i] 中的元素分别各不相同
// req_skills[i][j], people[i][j][k] 都由小写英文字母组成
// 本题保证「必要团队」一定存在
//
// Related Topics 位运算 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string[]} req_skills
 * @param {string[][]} people
 * @return {number[]}
 */
var smallestSufficientTeam = function(req_skills, people) {
    //压状dp，每一个技能给定一个状态位
    let n = req_skills.length
    let m = people.length
    let map = new Map()
    for (let i = 0; i < n; i++) {
        map.set(req_skills[i], i)
    }

    let dp = new Array(1 << n).fill(-1)
    let ans = []
    ans[0] = []
    dp[0] = 0
    for (let i = 0; i < m; i++) {
        let idx = 0

        // 计算当前备选人员的技能，将技能数组转换为二进制数字
        // 注意people[i]表示第i个人的技能数组，其数组中每个技能需要找到在req_skills对应位置
        // 如果人员i的技能不满足req_skills，则idx为0
        for (const s of people[i]) {
            if (map.has(s)) { //直接判断get时0可能不会进入判断需要判断不等于undifine
                idx = idx | (1 << map.get(s))
            }
        }

        for (let j = 0; j < (1 << n); j++) {
            if (dp[j] >= 0) {
                let state = j | idx
                if (dp[state] == -1 || dp[state] > dp[j] + 1) { //判断有没有新的1加入不管哪个位置加入1都符合dp[state] > dp[j] + 1
                    dp[state] = dp[j] + 1
                    ans[state] = ans[j].slice(0)
                    ans[state].push(i)
                }
            }
        }
    }

    return ans[(1 << n) - 1]
}
//leetcode submit region end(Prohibit modification and deletion)
