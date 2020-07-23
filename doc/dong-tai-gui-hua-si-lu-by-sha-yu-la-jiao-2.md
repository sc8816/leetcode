### 解题思路
【分析】依旧是从最后一步来考虑，假设最后一步跳了长度L，到达了a[n-1]，最后一步肯定是从a~i~跳过来的，a[i] = a[n-1] - L ，所以只需要考虑能否跳到a[i]，由于最后一步跳了L，那么倒数第二步跳的范围是L-1、L、L+1
 [image.png](https://pic.leetcode-cn.com/a8087aeda8d92a1e03a2b35133ea0a89bb24524d0a278a4220509ed526b7f1a8-image.png)
【状态】`dp[i][j]`代表能否最后一跳长度为j跳到a[i]

【转移方程】需要枚举上一块石头a[k]是谁，a[k]=a[i] - j

- `dp[i][j] = dp[k][j-1] || dp[k][j] || dp[k][j+1]`

【初始条件与边界情况】

- 只有一块石头输出true
- 石头0和石头1的距离不是1，输出false，因为第一步跳的距离是1
- 第一步跳跃距离必须是1：`dp[1][1] = true,dp[1][2] = .. =dp[1][n-1] = false`
- 为什么是n-1？因为第一步跳跃距离1，N块石头，最多跳N-1步（共2块石头，跳一步），最大一步距离N-1。

【答案】如果f[N-1] [1], f[N-1] [2], ..., f[N-1] [N-1]中有任何一个是true，答案是true，否则是false。时间复杂度O(N^2^)，空间复杂度O(N^2^)，不能用滚动数组优化，因为f[i] [j] 有可能依赖之前任何一个情况。

【优化】利用哈希表。实际上如果把每一种状态存下来，会发现基本上都是false，很少有true，这里采用只存true。如果已知`dp[k][j] = true`，也就是跳距离j、能够到达石头a[k]，那么下一条就能到达石头a[k]+j-1、a[k]+j、a[k]+j+1（如果有石头的话）。用一个集合Si保存能跳到石头a[i]的可能最后一条跳，如图。这样答案就变成S[n-1]是不是空，只要非空，就能跳得到。
 [image.png](https://pic.leetcode-cn.com/223c7e5a4c55f841f198bd8505397cdbaf763a709cd548e0c2bf6ea0023e820a-image.png)


### 代码

```java
class Solution {
    public boolean canCross(int[] A) {
        int n = A.length;

        //每一块石头作为下标
        HashMap<Integer, HashSet<Integer>> dp = new HashMap<>();
        int i, j;

        //初始化
        for (i = 0; i < n; i++) {
            dp.put(A[i], new HashSet<>());
        }
        //一开始就在初始位置
        dp.get(A[0]).add(0);

        //看每一块石头
        for (i = 0; i < n; i++) {
             //获取这块石头对应的Si
            HashSet<Integer> Si = dp.get(A[i]);
            //k = previous jump
            for (Integer k : Si) {
                //j = current jump
                for (j = k - 1; j <= k + 1; j++) {
                    //只能往右跳
                    if (j <= 0) {
                        continue;
                    }
                    //如果有这块石头，需要更新
                    if (dp.containsKey(A[i] + j)) {
                        dp.get(A[i] + j).add(j);
                    }
                }
            }
        }
        return !dp.get(A[n - 1]).isEmpty();
    }
}
```