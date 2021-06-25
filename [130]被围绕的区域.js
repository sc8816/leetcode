//给定一个二维的矩阵，包含 'X' 和 'O'（字母 O）。
//
// 找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
//
// 示例:
//
// X X X X
//X O O X
//X X O X
//X O X X
//
//
// 运行你的函数后，矩阵变为：
//
// X X X X
//X X X X
//X X X X
//X O X X
//
//
// 解释:
//
// 被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 任何不在边界上，或不与边界上的 'O' 相连的 'O' 最终都会被
//填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。
// Related Topics 深度优先搜索 广度优先搜索 并查集
// 👍 422 👎 0


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {character[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var solve = function(board) {
    if(board.length==0 || board[0].length==0) return
    let col = board.length
    let row  = board[0].length
    let dfs = (board, x, y) => {
        if(x<0 || y<0 || x>=col || y>=row || board[x][y]!='O') return
        board[x][y] = 'B'
        dfs(board, x - 1, y)
        dfs(board, x + 1, y)
        dfs(board, x, y - 1)
        dfs(board, x, y + 1)
    }

    for(let i=0; i<col; i++){
        dfs(board, i, 0)
        dfs(board, i, row-1)
    }
    for(let i=0; i<row; i++) {
        dfs(board, 0, i)
        dfs(board, col-1, i)
    }

    for(let i=0; i<col; i++) {
        for(let j=0; j<row; j++){
            if(board[i][j]=='O'){
                board[i][j] = 'X'
            }
            if(board[i][j]=='B'){
                board[i][j] = 'O'
            }
        }
    }
};
//leetcode submit region end(Prohibit modification and deletion)
