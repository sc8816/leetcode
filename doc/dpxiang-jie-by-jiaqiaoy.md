刚开始看这题确实有点无从下手，但是可以从题目找出一个基本的思路：
首先：每次移动一定是向正方向移动一定距离，再向反方向移动一定距离，此过程重复多次直到到达终点，
为什么一定是先向正方向移动先呢？我们考虑第一次，显然假设我们向前n次，向后移动m次和先向后移动m次再向前移动n次是一样的
所以我们第一步可以先向前再向后，而之后我们就必须向前了，向前之后又必须向后了。

有了这个特征剩下就很好做了：
假设我们目的地为i，向前移动cnt1次，向后移动cnt2次 那么令j=(1<<cnt1)-1,k=(1<<cnt2)-1;
令dp[i]表示从0开始，初速度为1，到i的最小指令数目
无非3种情况：
1：i==j-k 刚好到i dp[i]=min{dp[i],cnt1+cnt2+1+dp[0]}
2: i>j-k 就是移到了i的前面 dp[i]=min{dp[i],cnt1+1+cnt2+1+dp[i-(j-k)]}
3: i<j 到了i的后面 dp[i]=min{dp[i],cnt1+1+dp[j-i]} 这里之所以没有看k是因为如果我往回走了k步，那初速度就不是1了 不能转移了
```
class Solution {
    int maxn=10000+5;
    int[] dp=new int[maxn];
    public int racecar(int target) {
        dp[0]=0;
        for (int i=1;i<=target;i++) dp[i]=maxn;
        for (int i=1;i<=target;i++){
            for (int cnt1=1;(1<<cnt1)-1<2*i;cnt1++){
                int j=(1<<cnt1)-1;
                if (j==i) dp[i]=Math.min(dp[i],cnt1);
                for (int cnt2=0;cnt2<cnt1;cnt2++){
                    int k=(1<<cnt2)-1;
                    if (i<(j-k)) continue;
                    if (i==j-k)
                        dp[i]=Math.min(dp[i],cnt1+cnt2+1+dp[i-(j-k)]);
                    else
                        dp[i]=Math.min(dp[i],cnt1+1+cnt2+1+dp[i-(j-k)]);

                }
                if (j>i)
                dp[i]=Math.min(dp[i],cnt1+1+dp[j-i]);
            }
        }
        return dp[target];
    }

}
```
