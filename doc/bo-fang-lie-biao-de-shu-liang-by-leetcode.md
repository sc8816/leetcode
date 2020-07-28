
#### 方法 1：动态规划

**想法**

令 `dp[i][j]` 为播放列表长度为 `i` 包含恰好 `j` 首不同歌曲的数量。我们需要计算 `dp[L][N]`，看上去可以通过 `dp` 来解决。

**算法**

考虑 `dp[i][j]`。最后一首歌，我们可以播放没有播放过的歌也可以是播放过的。如果未播放过的，那么就是 `dp[i-1][j-1] * (N-j)` 种选择方法。如果不是，那么就是选择之前的一首歌，`dp[i-1][j] * max(j-K, 0)`（`j` 首歌，最近的 `K` 首不可以播放）。

```Java []
class Solution {
    public int numMusicPlaylists(int N, int L, int K) {
        int MOD = 1_000_000_007;

        long[][] dp = new long[L+1][N+1];
        dp[0][0] = 1;
        for (int i = 1; i <= L; ++i)
            for (int j = 1; j <= N; ++j) {
                dp[i][j] += dp[i-1][j-1] * (N-j+1);
                dp[i][j] += dp[i-1][j] * Math.max(j-K, 0);
                dp[i][j] %= MOD;
            }

        return (int) dp[L][N];
    }
}
```

```Python []
from functools import lru_cache

class Solution:
    def numMusicPlaylists(self, N, L, K):
        @lru_cache(None)
        def dp(i, j):
            if i == 0:
                return +(j == 0)
            ans = dp(i-1, j-1) * (N-j+1)
            ans += dp(i-1, j) * max(j-K, 0)
            return ans % (10**9+7)

        return dp(L, N)
```

**复杂度分析**

* 时间复杂度：*O(NL)*。
* 空间复杂度：*O(NL)*。（然而，我们可以只存储最后一列的 `dp` 数组来优化空间，这样只需要 *O(L)* 的空间复杂度。）


#### 方法 2：分类 + 动态规划

（注意：这个方法相当具有挑战性，但是在模拟这种列表时是一个常见的结论）

**想法**

由于我们只关心播放次数至少一次的歌，我们记录每首歌第一次播放的时刻 ![x=(x_1,x_2,\cdots) ](./p__x_=__x_1,_x_2,_cdots__.png) 。例如，我们有 5 首歌 `abcde`，播放列表为 `abacabdcbaeacbd`，那么 *x = (1, 2, 4, 7, 11)* 就是第一首歌出现的时刻。方便起见，我们让 *x_{N+1} = L+1*。我们的策略就是计算满足 *x* 的播放列表个数 ![\#_x ](./p__#_x_.png) ，最后结果是 ![\sum\#_x ](./p__sum_#_x_.png) 。

直接计算，

![\#_x=N*(N-1)*\cdots*(N-K+1)1^{x_{K+1}-x_K-1}*(N-K+2)2^{x_{K+2}-x_{K+1}}*\cdots ](./p___#_x_=_N_*__N-1__*_cdots_*__N-K+1__1^{x_{K+1}_-_x_K_-_1}_*__N-K+2___2^{x_{K+2}_-_x_{K+1}}_*_cdots__.png) 

![\Rightarrow\#_x=N!\prod_{j=1}^{N-K+1}j^{x_{K+j}-x_{K+j-1}-1} ](./p___Rightarrow_#_x_=_N!_prod_{j=1}^{N-K+1}_j^{x_{K+j}_-_x_{K+j-1}_-_1}__.png) 

令 ![\delta_i=x_{K+i}-x_{K+i-1}-1 ](./p__delta_i_=_x_{K+i}_-_x_{K+i-1}_-_1_.png) ，所以 ![\sum\delta_i=L-N ](./p__sum_delta_i_=_L-N_.png) 。所以最后结果是（*S = L-N, P = N-K+1*）：

![N!\Big(\sum\limits_{\delta:\sum\limits_{0\leqi\leqP}\delta_i=S}\prod\limits_{j=1}^Pj^{\delta_j}\Big) ](./p___N!_Big_sumlimits_{delta_:_sumlimits_{0_leq_i_leq_P}_delta_i_=_S}_prodlimits_{j=1}^P_j^{delta_j}_Big___.png) 

方便起见,将这个结果记录为 ![\langleS,P\rangle ](./p__langle_S,_Prangle_.png) 。

**算法**

我们可以通过数学方法迭代计算 ![\langleS,P\rangle ](./p__langle_S,_Prangle_.png)  的值，通过提出因子 ![P^{\delta_P} ](./p__P^{delta_P}_.png) 。

![\langleS,P\rangle=\sum_{\delta_P=0}^SP^{\delta_P}\sum_{\sum\limits_{0\leqi<P}\delta_i=S-\delta_P}\prod\limits_{j=1}^{P-1}j^{\delta_j} ](./p___langle_S,_Prangle_=_sum_{delta_P_=_0}^S_P^{delta_P}_sum_{sumlimits_{0leq_i___P}_delta_i_=_S_-_delta_P}_prodlimits_{j=1}^{P-1}_j^{delta_j}__.png) 

![\Rightarrow\langleS,P\rangle=\sum_{\delta_P=0}^SP^{\delta_P}\langleS-\delta_P,P-1\rangle ](./p___Rightarrow_langle_S,_Prangle_=_sum_{delta_P_=_0}^S_P^{delta_P}_langle_S_-_delta_P,_P-1rangle__.png) 

所以可以写成代数形式：

![\langleS,P\rangle=P\langleS-1,P-1\rangle+\langleS,P-1\rangle ](./p___langle_S,_P_rangle_=_P_langle_S-1,_P-1_rangle_+_langle_S,_P-1_rangle__.png) 

通过这个迭代，我们可以通过类似方法 1 使用动态规划算法。最后的结果是 ![N!\langleL-N,N-K+1\rangle ](./p__N!_langle_L-N,_N-K+1_rangle_.png) 。

```Java []
class Solution {
    public int numMusicPlaylists(int N, int L, int K) {
        int MOD = 1_000_000_007;

        // dp[S] at time P = <S, P> as discussed in article
        long[] dp = new long[L-N+1];
        Arrays.fill(dp, 1);
        for (int p = 2; p <= N-K; ++p)
            for (int i = 1; i <= L-N; ++i) {
                dp[i] += dp[i-1] * p;
                dp[i] %= MOD;
            }

        // Multiply by N!
        long ans = dp[L-N];
        for (int k = 2; k <= N; ++k)
            ans = ans * k % MOD;
        return (int) ans;
    }
}
```

```Python []
class Solution(object):
    def numMusicPlaylists(self, N, L, K):
        # dp[S] at time P = <S, P> as discussed in article
        dp = [1] * (L-N+1)
        for p in xrange(2, N-K+1):
            for i in xrange(1, L-N+1):
                dp[i] += dp[i-1] * p

        # Multiply by N!
        ans = dp[-1]
        for k in xrange(2, N+1):
            ans *= k
        return ans % (10**9 + 7)
```

**复杂度分析**

* 时间复杂度：*O(NL)*。
* 空间复杂度：*O(L)*。

#### 方法 3：生成函数

（注意：这个解法非常难，同时不推荐在面试中使用，但为了题解的完整性实现于此。）

**分析**

按照方法 2 的术语，我们希望快速计算 ![\langleS,P\rangle ](./p__langle_S,_P_rangle_.png) 。我们使用生成函数。

对于一个固定的 *P*，考虑函数：

![f(x)=(1^0x^0+1^1x^1+1^2x^2+1^3x^3+\cdots)*(2^0x^0+2^1x^1+2^2x^2+2^3x^3+\cdots) ](./p___f_x__=__1^0x^0_+_1^1x^1_+_1^2x^2_+_1^3x^3_+_cdots__*__2^0x^0_+_2^1x^1_+_2^2x^2_+_2^3x^3_+_cdots___.png) 
![\cdots*(P^0x^0+P^1x^1+P^2x^2+P^3x^3+\cdots) ](./p___cdots_*__P^0x^0_+_P^1x^1_+_P^2x^2_+_P^3x^3_+_cdots___.png) 

![\Leftrightarrowf(x)=\prod_{k=1}^{P}(\sum_{j\geq0}k^jx^j)=\prod_{k=1}^P\frac{1}{1-kx} ](./p___Leftrightarrow_f_x__=_prod_{k=1}^{P}__sum_{j_geq_0}_k^j_x^j__=_prod_{k=1}^P_frac{1}{1-kx}__.png) 

*f* 中 *x^S* 的系数（记为 *[x^S]f*）就是 ![\langleS,P\rangle ](./p__langle_S,_P_rangle_.png) 。

根据中国剩余定理，这个乘积可以写成一个部分分数的形式：

![\prod_{k=1}^P\frac{1}{1-kx}=\sum_{k=1}^P\frac{A_k}{1-kx} ](./p___prod_{k=1}^P_frac{1}{1-kx}_=_sum_{k=1}^P_frac{A_k}{1-kx}__.png) 

对于一些有理系数 *A_k*。我们也可以通过清除分母并对 ![1\leqm\leqP ](./p__1_leq_m_leq_P_.png)  设 *x = 1/m*，根据每个给定的 *m*，所有的元素项除了第 *m* 项会消失，有：

![A_m=\frac{1}{\prod_{1\leqj\leqP\&j\neqm}1-j/m}=\prod_{j\neqm}\frac{m}{m-j} ](./p___A_m_=_frac{1}{prod_{1_leq_j_leq_P_&_j_neq_m}_1_-_j_m}_=_prod_{j_neq_m}_frac{m}{m-j}__.png) 

由于 ![\sum_{j\geq0}(kx)^j=\frac{1}{1-kx} ](./p__sum_{j_geq_0}__kx_^j_=_frac{1}{1-kx}_.png) ，所以合在一起有：

![\[x^S\]f=\sum_{k=1}^PA_k*k^S ](./p____x^S_f_=_sum_{k=1}^P_A_k_*_k^S__.png) 

所以最终结果为

![\text{answer}=N!\sum_{k=1}^{N-K}k^{L-N}\prod_{1\leqj\leqN-K\&j\neqk}\frac{k}{k-j} ](./p___text{answer}_=_N!_sum_{k=1}^{N-K}_k^{L-N}_prod_{1_leq_j_leq_N-K_&_j_neq_k}_frac{k}{k-j}__.png) 

![\Rightarrow\text{answer}=N!\sum_kk^{L-K-1}\prod_{j\neqk}\frac{1}{k-j} ](./p___Rightarrow_text{answer}_=_N!_sum_k_k^{L-K-1}_prod_{j_neq_k}_frac{1}{k-j}__.png) 

我们只需要一个快速的方法计算 ![C_k=\prod_{j\neqk}\frac{1}{k-j} ](./p__C_k_=_prod_{j_neq_k}_frac{1}{k-j}_.png) ，事实上，

![C_{k+1}=C_k*\frac{k-(N-K)}{k} ](./p___C_{k+1}_=_C_k_*_frac{k_-__N-K_}{k}__.png) 

所以我们就有了所有计算的表达式。


```Python []
class Solution(object):
    def numMusicPlaylists(self, N, L, K):
        MOD = 10**9 + 7
        def inv(x):
            return pow(x, MOD-2, MOD)

        C = 1
        for x in xrange(1, N-K):
            C *= -x
            C %= MOD
        C = inv(C)

        ans = 0
        for k in xrange(1, N-K+1):
            ans += pow(k, L-K-1, MOD) * C
            C = C * (k - (N-K)) % MOD * inv(k) % MOD

        for k in xrange(1, N+1):
            ans = ans * k % MOD
        return ans
```

**复杂度分析**

* 时间复杂度：![O(N\logL) ](./p__O_N_log_L__.png) 。
* 空间复杂度：*O(1)*。