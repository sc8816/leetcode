//给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
//
// 说明：每次只能向下或者向右移动一步。
//
// 示例:
//
// 输入:
//[
//  [1,3,1],
//  [1,5,1],
//  [4,2,1]
//]
//输出: 7
//解释: 因为路径 1→3→1→1→1 的总和最小。
//
// Related Topics 数组 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
    //dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
    let row = grid[0].length
    let col = grid.length
    for(let i=1; i<row; i++){
        grid[0][i]+=grid[0][i-1]
    }
    for(let j=1; j<col; j++){
        grid[j][0]+=grid[j-1][0]
    }
    for(let i=1; i<col; i++){
        for(let j=1; j<row; j++){
            grid[i][j] = Math.min(grid[i-1][j], grid[i][j-1])+grid[i][j]
        }
    }
    return grid[col-1][row-1]
};
//leetcode submit region end(Prohibit modification and deletion)
