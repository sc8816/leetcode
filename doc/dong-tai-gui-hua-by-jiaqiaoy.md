很巧妙的一道题 被秀了
可以这样想：从（1，1）到（n，n）一定会经过一个点（i，j） 从（n，n）回到（1,1）一定会经过一个点（k，l）
而进入（i，j）必然是从他上面或者左边进入的 从（k，l）回去一定是从他右边或者下边进去这个点的
所以定义dp(i,j,k,l)表示从（1,1）进入（i,j）再从（i，j）进入（n，n），再从（n，n）回到（k，l）再回到（1,1）能摘到的最大的樱桃数
可以这样转移：
dp(i,j,k,l)=max{dp(i-1,j,k-1,l),dp(i-1,j,k,l-1),dp(i,j-1,k-1,l),dp(i,j-1,k,l-1)}+grid(i,j)+grid(k,l)
但是这样做是O（n^4）超时
可以注意点从（1,1）到（i，j）和从（k，l）到（1,1）的步数是相同的 所以i+j=k+l 这样就不用枚举l了 复杂度降到O（n^3）

```
class Solution {
    public int cherryPickup(int[][] grid) {
        int n=grid.length;
        int[][][] dp=new int[n+1][n+1][n+1];
        for (int i=0;i<=n;i++)
            for (int j=0;j<=n;j++)
                for (int k=0;k<=n;k++)
                    dp[i][j][k]=-1;
        dp[1][1][1]=grid[0][0];
        for (int i=1;i<=n;i++){
            for (int j=1;j<=n;j++){
                for (int k=1;k<=Math.min(i+j,n);k++){
                    int l=i+j-k;
                    if (l>n||l<1) continue;
                    if (grid[i-1][j-1]==-1||grid[k-1][l-1]==-1) continue;

                    int ans=Math.max(
                            Math.max(dp[i-1][j][k-1],dp[i-1][j][k]),
                            Math.max(dp[i][j-1][k-1],dp[i][j-1][k])
                    );
                    if (ans<0) continue;
                    ans=ans+grid[i-1][j-1]+((i==k&&j==l)?0:grid[k-1][l-1]);
                    dp[i][j][k]=ans;
                }
            }
        }
        return dp[n][n][n]<0?0:dp[n][n][n];
    }
}
```
