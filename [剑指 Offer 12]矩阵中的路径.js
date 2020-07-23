//请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一格开始，每一步可以在矩阵中向左、右、上、下移动一格。如果
//一条路径经过了矩阵的某一格，那么该路径不能再次进入该格子。例如，在下面的3×4的矩阵中包含一条字符串“bfce”的路径（路径中的字母用加粗标出）。
//
// [["a","b","c","e"],
//["s","f","c","s"],
//["a","d","e","e"]]
//
// 但矩阵中不包含字符串“abfb”的路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入这个格子。
//
//
//
// 示例 1：
//
// 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "A
//BCCED"
//输出：true
//
//
// 示例 2：
//
// 输入：board = [["a","b"],["c","d"]], word = "abcd"
//输出：false
//
//
// 提示：
//
//
// 1 <= board.length <= 200
// 1 <= board[i].length <= 200
//
//
// 注意：本题与主站 79 题相同：https://leetcode-cn.com/problems/word-search/
// Related Topics 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    let flag = false
    let m = board.length
    let n = board[0].length
    let vis = Array.from(new Array(m), () => new Array(n).fill(false))
    let dir = [{ x: -1, y: 0 }, { x: 1, y: 0 }, { x: 0, y: -1 }, { x: 0, y: 1 }]
    let dfs = (board, str, vis, word, x, y, dir) => {
        //截至条件
        if (flag) return //当前已经找到了
        if (word.indexOf(str) !== 0) return //当前路劲不合
        if (str == word) {
            flag = true
            return
        }

        //候选节点，四个方位
        for (let d of dir) {
            let x1 = x + d.x
            let y1 = y + d.y
            //候选条件
            if (x1 >= m || x1 < 0 || y1 >= n || y1 < 0) continue
            // console.log(x, y, x1, y1)
            if (!vis[x1][y1]) {
                vis[x1][y1] = true
                dfs(board, str + board[x1][y1], vis, word, x1, y1, dir)
                vis[x1][y1] = false
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (board[i][j] == word[0]) {
                vis[i][j] = true
                dfs(board, board[i][j], vis, word, i, j, dir)
                vis[i][j] = false
            }
        }
    }

    return flag
}
//leetcode submit region end(Prohibit modification and deletion)
