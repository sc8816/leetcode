//字典 wordList 中从单词 beginWord 和 endWord 的 转换序列 是一个按下述规格形成的序列：
//
//
// 序列中第一个单词是 beginWord 。
// 序列中最后一个单词是 endWord 。
// 每次转换只能改变一个字母。
// 转换过程中的中间单词必须是字典 wordList 中的单词。
//
//
// 给你两个单词 beginWord 和 endWord 和一个字典 wordList ，找到从 beginWord 到 endWord 的 最短转换序列 中
//的 单词数目 。如果不存在这样的转换序列，返回 0。
//
//
// 示例 1：
//
//
//输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","lo
//g","cog"]
//输出：5
//解释：一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog", 返回它的长度 5。
//
//
// 示例 2：
//
//
//输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","lo
//g"]
//输出：0
//解释：endWord "cog" 不在字典中，所以无法进行转换。
//
//
//
// 提示：
//
//
// 1 <= beginWord.length <= 10
// endWord.length == beginWord.length
// 1 <= wordList.length <= 5000
// wordList[i].length == beginWord.length
// beginWord、endWord 和 wordList[i] 由小写英文字母组成
// beginWord != endWord
// wordList 中的所有字符串 互不相同
//
// Related Topics 广度优先搜索 哈希表 字符串
// 👍 782 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
function ladderLength(beginWord: string, endWord: string, wordList: string[]): number {
    // @ts-ignore
    let wordset = new Set(wordList)
    if(!wordset.has(endWord)) return 0
    let alphabet : Array<string> = [] //得到一个a到z的字母list
    for(let i =97; i<=122; i++){
        alphabet.push(String.fromCharCode(i))
    }

    //拿到所有能够一步转换得到同时存在于wordList里面的单词
    const getNextTransformList = (word: string): string[] => {
        let res : Array<string> = []
        let arr = Array.from(word)
        for(let i=0; i<arr.length; i++) {
            let curW = word[i]
            for(let w of alphabet) {
                if(w===curW) continue
                arr[i] = w
                let str = arr.join('')
                if(wordset.has(str)){
                    res.push(str)
                }
                arr[i] = curW
            }
        }
        return res
    }

    let quenue = [beginWord]
    let step = 0
    let visited = new Set().add(beginWord)
    while(quenue.length) {
        step++
        let helper = []
        for(let word of quenue) {
            for(let nextWord of getNextTransformList(word)) {
                if(!visited.has(nextWord) && wordset.has(nextWord)){
                    if(nextWord===endWord) return step+1
                    visited.add(nextWord)
                    helper.push(nextWord)
                }
            }
        }
        quenue = helper
    }
    return 0
};
//leetcode submit region end(Prohibit modification and deletion)
