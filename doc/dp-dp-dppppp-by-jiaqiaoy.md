首先我们定义dp(i,j,k)表示把数组的i到j这个子数组分成k个部分，每个部分合成为1个块的最小成本
显然我们要求的是dp(1,n,1)

可以这样想 一个i到j的数组 合成一份 一定是先分成k份 再把这k份合起来，也就是加上从i到j的和sum(i,j),而分成k份有很多种分法 显然我们要求最小的那种分法
也就是：
dp(i,j,1)=min{dp(i,j,k)}+sum(i,j)

而要分成k分 就从i到j之间找一个t 把i到t分成k-1份 再把t+1到j合成一份,递归计算两边要合并的值为多少，再加起来
所以我们考虑每个t 看哪一个t使得两边合并的成本再加起来是最小的 就取这个t 
也就是：
dp(i,j,k)=min{dp(i,t,k-1)+dp(t+1,j,1)|t from i to j-1}

合并一下用递推表达式表示就是：
dp(i,j,k)=min{dp(i,t,k-1)+dp(t+1,j,1)|t from i to j-1}
dp(i,j,1)=dp(i,j,k)+sum(i,j)

初始条件是
dp(i,i,1)=0 只有一个的时候是不需要合并的
dp(i,i+k-1,1)=sum(i,i+k-1) 这个很显然
注意如果一开始的n-1一定是要可以整除k-1 不然分不了 其他情况都可以分出来 这个可以自己模拟下就知道了

```
class Solution {
    int inf=Integer.MAX_VALUE/8;
    int n,k,maxn=35;
    int[] sum=new int[maxn];
    Integer[][][] dp=new Integer[maxn][maxn][maxn];

    int dfs(int i,int j,int x){
        if (dp[i][j][x]!=null) return dp[i][j][x];
        if (x<=0) return inf;
        if (x==1){
            if (i==j) return dp[i][j][1]=0;
            if (j==i+k-1) return dp[i][j][1]=sum[j]-sum[i-1];

            return dp[i][j][1]=dfs(i,j,k)+sum[j]-sum[i-1];
        }
        {
            int ans=inf;
            for (int t=i;t<j;t++){
                ans=Math.min(ans,dfs(i,t,x-1)+dfs(t+1,j,1));
            }
            return dp[i][j][x]=ans;
        }
    }
    public int mergeStones(int[] stones, int K) {
        n=stones.length;
        k=K;

        if ((n-1)%(k-1)!=0) return -1;
        for (int i=1;i<=n;i++) {
            sum[i]=sum[i-1]+stones[i-1];
        }
        dfs(1,n,1);

        return dp[1][n][1];
    }
}
```
