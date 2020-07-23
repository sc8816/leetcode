### 思路:

动态规划

 `dp[i][j]` 代表 `T` 前 `i` 字符串可以由 `S`  `j` 字符串组成最多个数.

所以动态方程:

当 `S[j] == T[i]` , ` dp[i][j] = dp[i-1][j-1] + dp[i][j-1]`;

当 `S[j] != T[i]` , ` dp[i][j] = dp[i][j-1]`

举个例子,如示例的

 [1561970400084.png](https://pic.leetcode-cn.com/a3a1d30700be05cad2e60666f20ab261e7a04b85ed88b854dd1d8cb484909983-1561970400084.png)
{:align=center}

对于第一行, `T` 为空,因为空集是所有字符串子集, 所以我们第一行都是 `1` 

对于第一列,  `S` 为空,这样组成 `T` 个数当然为 0` 了

至于下面如何进行,大家可以通过动态方程,自行模拟一下!

### 代码:

```python [1]
class Solution:
    def numDistinct(self, s: str, t: str) -> int:
        n1 = len(s)
        n2 = len(t)
        dp = [[0] * (n1 + 1) for _ in range(n2 + 1)]
        for j in range(n1 + 1):
            dp[0][j] = 1
        for i in range(1, n2 + 1):
            for j in range(1, n1 + 1):
                if t[i - 1] == s[j - 1]:
                    dp[i][j] = dp[i - 1][j - 1]  + dp[i][j - 1]
                else:
                    dp[i][j] = dp[i][j - 1]
        #print(dp)
        return dp[-1][-1]
```


 
```java [1]
class Solution {
    public int numDistinct(String s, String t) {
        int[][] dp = new int[t.length() + 1][s.length() + 1];
        for (int j = 0; j < s.length() + 1; j++) dp[0][j] = 1;
        for (int i = 1; i < t.length() + 1; i++) {
            for (int j = 1; j < s.length() + 1; j++) {
                if (t.charAt(i - 1) == s.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1] + dp[i][j - 1];
                else dp[i][j] = dp[i][j - 1];
            }
        }
        return dp[t.length()][s.length()];
    }
}
```

