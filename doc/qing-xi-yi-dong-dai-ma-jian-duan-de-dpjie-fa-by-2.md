代码分两块：
1、先求出dp，dp[i][j]为[i][j]位置的值及左上矩形的和；
2、求解左上角与右下角所围成的矩阵的和；


```
class NumMatrix {
public:
    NumMatrix(vector<vector<int>>& matrix) {
        if (matrix.size() == 0)
            return ;
        rows = matrix.size();
        cols = matrix[0].size();
        dp = vector<vector<int>>(rows+1,vector<int>(cols + 1));
        for (int i = 1;i < rows + 1;i++){
            for (int j = 1;j < cols + 1;j++){
                dp[i][j] = dp[i][j-1] + dp [i-1][j] - dp[i-1][j-1] + matrix[i-1][j-1];
            }
        }
    }
    
    int sumRegion(int row1, int col1, int row2, int col2) {
        return dp[row2+1][col2+1] - dp[row2+1][col1] - dp[row1][col2+1] + dp[row1][col1];
    }

private:
    int rows,cols; 
    vector<vector<int>>dp;
};
```
