### 解题思路
受[@fireswu](/u/fireswu/)的题解启发，详细写写个人做这道题的感受，如有其它高见，请留言讨论。

首先说下个人的思路，一开始我一看这个题，联想到的是如果只有多米诺，也就是只有`XX`这种块块，那就是一个斐波那契数列，
用`dp[i] = dp[i-1] + dp[i-2]`很好解。

引入了另一种`L`型托米诺，如果只有托米诺，那就是 `dp[i] = 2*dp[i-3]`，应该也是可以的出来结果的，关键是怎么组合，`n = 3`的情况也很好画，总共5种
 [1593253051(1).png](https://pic.leetcode-cn.com/e7f7989c5a506037ca2b9ddedec1a6cc089a058c4be4c3ed1b32c401cd0ea382-1593253051\(1\).png)

最开始，`n = 4`的情况我是按照上面的图进行递推的
 [1593253387(1).png](https://pic.leetcode-cn.com/329c08b618ccd53ead924504210b323e03022da5ec8738f859f432cf6a5ce5d8-1593253387\(1\).png)

然后就陷入了无限的自我怀疑，为什么答案应该是`11`，直到我看到了[@todd-6](/u/todd-6/)在[@fireswu](/u/fireswu/)下的回复，瞬间感觉自己被小学五年级智力题戏耍了
 [1593253637(1).png](https://pic.leetcode-cn.com/f6d2c2910094a6fb5485329e0ccee81b67d7a9b55d589150fc3d9b8fde682021-1593253637\(1\).png)

但是最痛苦的是，图画出来了，思路没了，下面放上大佬的公式，逆向解释一下这道题。

从题目，很容易得出 2 个 dp 数组， dp 表示 2n 的平铺次数， dp2 表示 2n+1 的平铺次数
dp[i] = dp[i-1] + dp[i-2] + 2dp2[i-2] (因为 dp2 多出的一块可以是上或下，所以需要乘2),
dp2[i] = dp[i-1] + dp2[i-1]。

首先，`dp[i]`代表第`i`列的填充方法，根据我们前面提到过的，如果只考虑用`XX`这种块块，在第`i`列如何填充需要看`i-1`和`i-2`列，如下图
 [1593254792(1).png](https://pic.leetcode-cn.com/60d867bfd850782e89d78015271b8deb1d4f7ee635fddee2db79d8efd93b236c-1593254792\(1\).png)

`dp[i]`就代表刚刚好让第`i`列铺满的方法总数

`dp2[i]`代表什么呢，从我个人理解，它代表让第`i`列有一个缺口的铺法，`dp2[i-1]`到`dp2[i]`之间的转化是这样的
 [1593255087(1).png](https://pic.leetcode-cn.com/7fb2817e84ffd6497e0ea7a3f29ca6d85951e576e708213441e4d14eb7eedc16-1593255087\(1\).png)

由于`L`型托米诺的存在，`dp2[i]`也能从`dp[i-1]`转化来
 [1593255211(1).png](https://pic.leetcode-cn.com/a6aa53f76d0b2444bc3d9863b1a3f643f9588a9c84ece9a9b17edd456969ac69-1593255211\(1\).png)

这里可能有一些绕，可以想象一下，只要把`dp[i-1]`那里的`XX`块换成`L`型块，那么能够通过多少种方法得到`dp[i-1]`，就能通过多少种方法得到`dp2[i]`。

所以根据上方的这么多种情况，要得到刚好铺满第`i`列的状态，它的上一状态可能情况如下
 [1593255685(1).png](https://pic.leetcode-cn.com/3951fb521ffce37daac00ce6b08a013cabdac377fb4d428cfd7cc80504e47e8c-1593255685\(1\).png)

由于后两种情况是对称的，所以直接乘2就好，下面就是推导公式。

由以上公式可推导。
dp[i]
=  dp[i-1] + dp[i-2] + 2dp2[i-2]
=  dp[i-1] + dp[i-2] + 2(dp[i-3] + dp2[i-3])
= 2dp[i-1] + dp[i-2] + 2(dp[i-3] + dp2[i-3]) - dp[i-1]
= 2dp[i-1] + dp[i-2] + 2(dp[i-3] + dp2[i-3]) - dp[i-2] - dp[i-3] - 2dp2[i-3]
= 2dp[i-1] + 2(dp[i-3] + dp2[i-3]) - 2dp2[i-3] - dp[i-3]
= 2dp[i-1] + 2(dp[i-3] + dp2[i-3]) - 2dp2[i-3] - dp[i-3]
= 2dp[i-1] + 2(dp[i-3] + dp2[i-3]) - 2dp2[i-3] - dp[i-3] （重要的地方写三遍？）
= 2dp[i-1] + dp[i-3]


所以最终的转移公式为 dp[n] = 2*dp[n-1] + dp[n-3]



### 代码
代码来自[@ccnuacmhdu](/u/ccnuacmhdu/)
```java
class Solution {
    private int mod = 1000000007;
    public int numTilings(int N) {
        int[] dp = new int[N+3];
        dp[0] = 1;
        dp[1] = 1;
        dp[2] = 2;
        dp[3] = 5;
        for(int i = 4; i <= N; i++){
            dp[i] = (2*(dp[i-1] % mod) % mod + dp[i-3] % mod) % mod;
        }
        return dp[N];
    }
}
```