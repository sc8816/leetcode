### 解题思路
此处撰写解题思路
 [image.png](https://pic.leetcode-cn.com/b25f3a03baaad8e196321a5373f340fd47a05de6cda42e725d5d227a951e150e-image.png)

【分析】这个题和Decode Ways相比只是多了个`*`，Decode Ways中的状态转移方程为`dp[i] = dp[i-1]+dp[i-2]`。这个题依然是从最后一步出发，看翻译最后一个字母和翻译最后两个字母：

- 情况一：翻译最后一个字母：
  - `S[i-1] = '0'`：不能翻译成字母
  - `S[i-1] = '1'...'9'`，可以翻译成字母，共`dp[i-1]`种方式
  - `S[i-1] = '*'`，可以翻译成字母，共 `9 * dp[i-1] `种方式

- 情况二：翻译最后两个字母
  - `S[i-2] = '0'`：不能翻译成字母，01、02，翻译不了
  - `S[i-2] = '1'`
    - `S[i-1] = '0'...'9'`，可以翻译，共`dp[i-2]`种方式
    - `S[i-1] = '*'`，可以翻译，共 `9 * dp[i-2] `种方式
  - `S[i-2] = '2'`
    - `S[i-1] = '0'...'6'`，可以翻译，共`dp[i-2]`种方式
    - `S[i-1] = '7'...'9'`，不能翻译
    - `S[i-1] = '*'`，可以翻译，共`6 * dp[i-2]`种方式（21-26）
  - `S[i-2] = '3'...'9'`，不能翻译
  - `S[i-2] = '*'`
    - `S[i-1] = '0'...'6'`，可以翻译，共`2 * dp[i-2]`种方式
    - `S[i-1] = '7'...'9'`，可以翻译，共`dp[i-2]`种方式
    - `S[i-1] = '*'`，可以翻译，共`15 * dp[i-2]`种方式（11-19，9种，21-26，6种）

- 结果 = 情况一 + 情况二

【注意点】数组开long。

时间复杂度O(N)，空间复杂度O(N)，可以用滚动数组降为O(1 )

### 代码

```java
class Solution {
    public int numDecodings(String s) {
        char[] chs = s.toCharArray();
        int n = s.length();
        long MOD = 1000000007;
        long[] dp = new long[n + 1];
        //空串解码成空串也算一种
        dp[0] = 1;

        long c = 0;

        for (int i = 1; i <= n; i++) {
            dp[i] = 0;

            //获得最后一个字符有多少种解密方式
            c = getCnt(chs[i - 1]);
            dp[i] += c * dp[i - 1];

            //获取最后两个字符有多少种解密方式
            if (i >= 2) {
                c = getCnt2(chs[i - 2], chs[i - 1]);
                dp[i] += c * dp[i - 2];
            }

            dp[i] = dp[i] % MOD;
        }
        return (int) dp[n];
    }

    private long getCnt(char c) {
        if (c == '0') {
            return 0;
        }
        if (c == '*') {
            return 9;
        }
        //'1' - '9'
        return 1;
    }

    // c2 倒数第二个，c1 最后一个
    private long getCnt2(char c2, char c1) {
        if (c2 == '0' || (c2 >= '3' && c2 <= '9')) {
            return 0;
        }
        if (c2 == '1') {
            if (c1 >= '0' && c1 <= '9') {
                return 1;
            }
            if (c1 == '*') {
                return 9;
            }
        }
        if (c2 == '2') {
            if (c1 >= '0' && c1 <= '6') {
                return 1;
            }
            if (c1 >= '7' && c1 <= '9') {
                return 0;
            }
            if (c1 == '*') {
                return 6;
            }
        }
        //c2 = *
        if (c1 >= '0' && c1 <= '6') {
            return 2;
        }
        if (c1 >= '7' && c1 <= '9') {
            return 1;
        }
        return 15;
    }
}
```