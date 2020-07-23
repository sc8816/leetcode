- #### 分析
- #### s[i] != s[j]: 
```
count("bc") = count("b") + count("c") - count("") = 1 + 1 - 0 = 2
count("bcc") = count("bc") + count("cc") - count("c") = 2 + 2 - 1 = 3
count("ab") = count("a") + count("b") - count("") = 1 + 1 - 0 = 2
count("abc") = count("ab") + count("bc") - count("b") = 2 + 2 - 1 = 3
count("abcc") = count("abc") + count("bcc") - count("bc") = 3 + 3 - 2 = 4
count("abccb") = count("abcc") + count("bccb") - count("bcc") = 4 + 6 - 3 = 7
```
- #### s[i] == s[j]:
```
count("cbc") = 2 * count("b") + 2 = 4
count("bcab") = 2 * count("ca") + 2 = 6
```
```
count("bcbcb") = 2 * count("cbc") + 1 = 2 * 4 + 1 = 9
count("bbcabb") = 2 * count("bcab") - count("ca") = 10
```
- #### 转移方程
```
if s[i] != s[j]:
    dp[i][j] = dp[i + 1][j] + dp[i][j-1] - dp[i + 1][j - 1]
```
```
if s[i] == s[j]:
    dp[i][j] = dp[i+1][j-1] * 2 + 1  # 中间这个数就是两端的数 类似 “bcbcb”
             = dp[i+1][j-1] * 2 + 2 # 中间有两个数类似 “bcab”
             = dp[i+1][j-1] * 2 - dp[l + 1][r - 1]
```
- #### 状态转移
```
因为dp[i][j]的状态和dp[i+1][j],dp[i][j-1],dp[i+1][j-1]有关，所以，i采用从下到上的方式，j采用从右到左的方式遍历。类似lcs。
```


- #### 代码

```
class Solution:
    def countPalindromicSubsequences(self, S: str) -> int:
        n = len(S)
        #M = 1e9 +7
        dp = [[0] * n for _ in range(n)]
        for i in range(n):
            dp[i][i] = 1
        for size in range(2, n + 1):
            for i in range(n - size + 1):  # n-size +1  逆序遍历
                j = i + size - 1
                if S[i] != S[j]:
                    dp[i][j] = dp[i + 1][j] + dp[i][j-1] - dp[i + 1][j - 1]
                else:
                    dp[i][j] = dp[i+1][j-1] * 2  #小区间一分 外面套的大区间又有一份 所以*2
                    l, r = i + 1, j - 1
                    while l <= r and S[l] != S[i]: l += 1
                    while l <= r and S[r] != S[i]: r -= 1
                    if l > r: 
                        dp[i][j] += 2
                    elif l == r: 
                        dp[i][j] += 1
                    else: 
                        dp[i][j] -= dp[l + 1][r - 1]
                    
                dp[i][j] %= 1000000007
        return dp[0][-1]
```




