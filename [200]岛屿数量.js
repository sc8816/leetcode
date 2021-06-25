//给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
//
// 岛屿总是被水包围，并且每座岛屿只能由水平方向和/或竖直方向上相邻的陆地连接形成。
//
// 此外，你可以假设该网格的四条边均被水包围。
//
//
//
// 示例 1：
//
//
//输入：grid = [
//  ["1","1","1","1","0"],
//  ["1","1","0","1","0"],
//  ["1","1","0","0","0"],
//  ["0","0","0","0","0"]
//]
//输出：1
//
//
// 示例 2：
//
//
//输入：grid = [
//  ["1","1","0","0","0"],
//  ["1","1","0","0","0"],
//  ["0","0","1","0","0"],
//  ["0","0","0","1","1"]
//]
//输出：3
//
//
//
//
// 提示：
//
//
// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 300
// grid[i][j] 的值为 '0' 或 '1'
//
// Related Topics 深度优先搜索 广度优先搜索 并查集
// 👍 865 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
    if (grid.length == 0 || grid[0].length == 0) return 0
    let visit = Array.from(new Array(grid.length), () => new Array(grid[0].length).fill(false))

    let getNear = (i, j, x, y) => {
        let list = []
        if (i - 1 >= 0) list.push([i - 1, j])
        if (i + 1 < x) list.push([i + 1, j])
        if (j - 1 >= 0) list.push([i, j - 1])
        if (j + 1 < y) list.push([i, j + 1])
        return list
    }

    let dfs = (grid, visit, i, j) => {
        for (let [x, y] of getNear(i, j, grid.length, grid[0].length)) {
            if (grid[x][y] == 1 && !visit[x][y]) {
                visit[x][y] = true
                dfs(grid, visit, x, y)
            }
        }
    }

    let count = 0
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if(grid[i][j]==1 && !visit[i][j]){
                dfs(grid, visit, i, j)
                count++
            }
        }
    }
    return count
};
//leetcode submit region end(Prohibit modification and deletion)
