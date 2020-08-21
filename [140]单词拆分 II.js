//给定一个非空字符串 s 和一个包含非空单词列表的字典 wordDict，在字符串中增加空格来构建一个句子，使得句子中所有的单词都在词典中。返回所有这些可能的
//句子。
//
// 说明：
//
//
// 分隔时可以重复使用字典中的单词。
// 你可以假设字典中没有重复的单词。
//
//
// 示例 1：
//
// 输入:
//s = "catsanddog"
//wordDict = ["cat", "cats", "and", "sand", "dog"]
//输出:
//[
//  "cats and dog",
//  "cat sand dog"
//]
//
//
// 示例 2：
//
// 输入:
//s = "pineapplepenapple"
//wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
//输出:
//[
//  "pine apple pen apple",
//  "pineapple pen apple",
//  "pine applepen apple"
//]
//解释: 注意你可以重复使用字典中的单词。
//
//
// 示例 3：
//
// 输入:
//s = "catsandog"
//wordDict = ["cats", "dog", "sand", "and", "cat"]
//输出:
//[]
//
// Related Topics 动态规划 回溯算法


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
// var wordBreak = function(s, wordDict) {
//     let map = new Map()
//     let helper = (s, wordDict, start) => {
//         let res = []
//         if (start == s.length) {
//             res.push('')
//             return res
//         }
//         if (map.has(start)) return map.get(start)
//         for (let end = start + 1; end <= s.length; end++) {
//             let str = s.substring(start, end)
//             if (wordDict.indexOf(str) == -1) continue
//             let list = map.has(end) ? map.get(end) : helper(s, wordDict, end)
//             for (let l of list) {
//                 let temp = str + (l == '' ? '' : ' ') + l
//                 res.push(temp)
//             }
//         }
//         map.set(start, res)
//         return res
//     }
//
//     return helper(s, wordDict, 0)
// }

var wordBreak = function (s, wordDict) {
    //dp[i]表示的是前i个字符能够由字典中单词组成的句子列表
    let m = s.length
    let dp = new Array(m + 1)
    dp[0] = ['']

    for (let i = 1; i <= m; i++) {
        let list = []
        for (let j = 0; j < i; j++) {
            let str = s.substring(j, i)
            // console.log(str)
            if (dp[j].length > 0 && wordDict.indexOf(str) !== -1) {
                for (let l of dp[j]) {
                    list.push(l + (l == '' ? '' : ' ') + str)
                }
            }
            dp[i] = list
            // console.log(dp[i])
        }
    }

    // console.log(dp)
    return dp[m]
    // let m = s.length
    // let dp = new Array(m + 1)
    // dp[0] = ['']
    // for (let i = 1; i <= m; i++) {
    //     for (let j = 0; j < i; j++) {
    //         dp[i] = []
    //         let str = s.substring(j, i)
    //         if (dp[j].length > 0 && wordDict.indexOf(str) !== -1) {
    //             for (let w of dp[j]) {
    //                 dp[i].push(w + (w == '' ? '' : ' ') + str)
    //             }
    //         }
    //     }
    // }
    //
    // return dp[m]
}


//leetcode submit region end(Prohibit modification and deletion)
