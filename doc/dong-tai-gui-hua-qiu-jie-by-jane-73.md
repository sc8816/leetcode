### 解题思路
dp[i][2] 令 dp[i][0] 表示到当前机器可以移除的数量   dp[i][1]到当前机器需要增加的数量

### 代码

```java
class Solution {
    public int findMinMoves(int[] machines) {
        if (machines == null || machines.length == 0) {
            return -1;
        }

        int sum = 0;
        for (int i = 0; i < machines.length; i++) {
            sum += machines[i];
        }
        // 无法平均直接返回
        if (sum % machines.length != 0) {
            return -1;      
        }
        // dp[][0]表示当前减去， dp[0][1] 表示当前需要增加
        int[][] dp = new int[machines.length + 1][2];
        int mean = sum / machines.length; 
        int ret = 0;
        for (int i = 1; i <= machines.length; i++) {
            int tmpRet = 0; // 当前需要操作的次数
            // 当前数量大于平均，则需要减去
            if (machines[i - 1] > mean) {
                int res = machines[i - 1] - mean + dp[i - 1][0]; // 前面机器也可能需要移除
                if (dp[i - 1][1] >= res) {   // 前面需要增加的大于当前能给出的
                    tmpRet = dp[i - 1][1];
                    dp[i][0] = 0; // 当前已不能再给出
                    dp[i][1] = dp[i - 1][1] - res; // 当前可能还需要增加
                } else {
                    tmpRet = res;
                    dp[i][0] = res - dp[i - 1][1]; // 当前还能再给出
                    dp[i][1] = 0; // 当前不需要增加
                }
            }
            // 当前数量小于平均值，当前需要增加
            else if (machines[i - 1] < mean) {
                int res = mean - machines[i - 1] + dp[i - 1][1]; // 当前需要增加的总值
                if (dp[i - 1][0] >= res) { // 如果前面能够给出
                    tmpRet = dp[i - 1][0];
                    dp[i][1] = 0;
                    dp[i][0] = dp[i - 1][0] - res;
                } else {
                    dp[i][1] = res - dp[i - 1][0];
                    dp[i][0] = 0;
                    tmpRet = dp[i][1];
                }
            }
            // 如果当前已经是平均值，则不需要操作，经过该机器的操作都被包含了。
            else {
                dp[i][0] = dp[i - 1][0];
                dp[i][1] = dp[i - 1][1];
            }

            ret = Math.max(ret, tmpRet);
        }

        return ret;
    }
}
```