### 解题思路
HashMap<Long, Integer>[] dp。 dp[i] 表示在第i个位置拥有的所有公差，及每个公差能组成数列数量。
int ret 表示总数量
对于A[i]与前面A[i-k]形成的所有公差，去dp[i-k]中找对应的公差，如果存在则直接加上ret。然后dp[i]中记录该公差拥有的等差数列数量（注意+1 因为 A[i-k] A[i] 可为后面的单个值形成一个数列）。
### 代码

```java
class Solution {
    public int numberOfArithmeticSlices(int[] A) {
        if (A == null || A.length < 3) {
            return 0;
        }

        int ret = 0;
        HashMap<Long, Integer>[] dp = new HashMap[A.length];
        dp[0] = new HashMap<>();
        for (int i = 1; i < A.length; i++) {
            HashMap<Long, Integer> resMap = new HashMap<>();
            for (int k = i - 1; k >= 0; k--) {
                long res = (long) A[i] - A[k];
                if (dp[k].get(res) == null) {
                    Integer count = resMap.get(res);
                    if (count == null) {
                        count = 1;
                    } else {
                        count++;
                    }
                    resMap.put(res, count);
                } else {
                    int count = dp[k].get(res);
                    ret += count;
                    // 如果之前已经存在该公差，则当前直接加上
                    Integer exist = resMap.get(res);
                    if (exist == null) {
                        resMap.put(res, count + 1);
                    } else {
                        exist += count + 1;
                        resMap.put(res, exist);
                    }

                }
            }
            dp[i] = resMap;
        }
        return ret;
    }
}
```