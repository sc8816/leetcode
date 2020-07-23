### 解题思路

动态规划

    heights[i][j]代表[i，j]的高度
    heights[i][j] = matrix[i][j]=='1'? heights[i-1][j] + 1:0

    dp[i][j][k] 代表以[i,j]为右下角，高度为k可以组成的面积
    dp[i][j][k] = dp[i][j-1][k] + k  

### 代码

```cpp
class Solution {
public:
	int maximalRectangle(vector<vector<char>>& matrix) {
		int n = matrix.size();
		int m = 0;
		if (n > 0) { m = matrix[0].size(); }
		vector<vector<int>> heights(n + 1,vector<int>(m + 1,0));
		vector<vector<vector<int>>> dp(n + 1,vector<vector<int>>(m + 1, vector<int>(n + 1, 0)));
		int ans = 0;
		for (int i = 1; i <= n; i++) {
			for (int j = 1; j <= m; j++) {
				if (matrix[i-1][j-1] == '0') { continue; }
				heights[i][j] = heights[i-1][j] + 1;
				for (int k = 1; k <= heights[i][j]; k++) {
					dp[i][j][k] = dp[i][j-1][k] + k;
					ans = max(ans, dp[i][j][k]);
				}
			}
		}
		return ans;
	}
};
```