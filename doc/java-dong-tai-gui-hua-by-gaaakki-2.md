使用一个一维数组dp，dp[i]代表走到位置i处所需要的最小步数。因为先向前走forword步再向后走back步与先向后走back步再向前走forword步最后到达的位置相同，所以可以假设永远保持第一步是向前走的。第一步有三种情况：
* 第一种是刚好走forword步后到达了目标位置i，则dp[i] = forword。
* 第二种情况是向前走forword步后到达了位置i后面，这时需要再往回走，再加上回头的那一步，此时dp[i] = Math.min(dp[i], forword + 1 + dp[j - i]);（注意这里的上限是走到2 * i处）
* 第三种情况是向前走forword步后未到达位置i处就需要返回，此时在保证返回的步数back < forword的条件下遍历back，此时dp[i] = Math.min(dp[i], forword + 1 + back + 1 + dp[i - j + k])。
得到转移方程后递归i，最后dp[target]即为所求值。
```
class Solution {
    public int racecar(int target) {
        int[] dp = new int[target + 1];
        for (int i = 1;i <= target; i++){
            dp[i] = Integer.MAX_VALUE;
            for (int forword = 1;(1 << forword) - 1 < 2 * i; forword++) {
                int j = (1 << forword) - 1;
                if(j == i) 
                    dp[i] = forword;
                else if (j > i)
                    dp[i] = Math.min(dp[i], forword + 1 + dp[j - i]);
                else
                    for(int back = 0; back < forword; back++) {
                        int k = (1 << back) - 1;
                        dp[i] =Math.min(dp[i], forword + 1 + back + 1 + dp[i - j + k]);
                    }
            }
        }
        return dp[target];
    }
}
```