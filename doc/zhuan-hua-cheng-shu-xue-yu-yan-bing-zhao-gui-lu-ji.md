### 规律！规律！规律！

记住了数学永远是关于找规律和运用规律的逻辑学科（其实所有东西都是这样）。本题让我们找到数字*n*之前数字2出现的数量。

为了方便书写，我们就认为这个题目是要我们求一个函数 *g(n) = 在[1, n]中所有整数中2出现的数量, n ∈ [1, 10^9)*

首当其冲的难点就是 *g(n)* 和*n*之间并没有非常明显的直接联系。首先可以排除的思路就是用2的倍数来解决问题，因为数字含有2并不代表被2整除。

同时可以发现的是 *g(n)* 和*n*的位数仿佛有很强的关联性，因为显然的，*g(25)* 并不是特别简单，但如果问两位数中所有2的出现的数量，问题就简单许多。具体请看下面的推导。

设函数 *f(m)* 表示m位数字中2出现频率的总和。那么显然的

 [image.png](https://pic.leetcode-cn.com/4fceb1230d53437ce5f8c9550019ee37ecd4d5a2caecc66e877696bcfcc53dd0-image.png)

对于这个公式可以这么理解，现在要求3位数中所有2的出现频率，即 *f(3)*，也就是以 两位数, 100, 200, 300...900 中出现2的频率的总和。

那么这些百位数中可以分成两种情况，以2开头，即200，不以2开头，比如100。不以2开头的3位数中含2数量就是*f(2)*，以2开头的三位数中含2的数量则为*f(2)+100*
总和来看就是上面的公式。

想到这里，我的反应是可不可以把这道题目，即 *g(n)* 转化成求“m位数中所有的2的出现数量”（因为很多数学leetcode题目都可以这么转化解决）

这道题目是可以的，上面那个公式也给我们一种以位数化整为零的解决路线。那么这道题我们应该也可以通过n中每一位的数字，分别求出该位数上所有2出现过的数量。

所以针对n中每一位上面的数字a_k，k为位数，我们可以分成三种情况

**case 1: a_k > 2**

该位数出现数量 =  [image.png](https://pic.leetcode-cn.com/9fa957502c8b4ee4e183af51c918524954ec0ec3fbe4d926ca1184916269ebad-image.png)

**case 2: a_k == 2**

该位数出现数量 =  [image.png](https://pic.leetcode-cn.com/d5001460160a4a4bbd5586da21dae418c266b62053ca7f011ea97c047c0b8037-image.png)

但由于还要考虑2对于后续数字的影响
我们必须加上 [image.png](https://pic.leetcode-cn.com/787f726e515303537aae45df3dfc1b97ccc54049843d79da6b0f99554c7f0d4a-image.png)

**case 3: a_k < 2**

该位数出现数量 =  [image.png](https://pic.leetcode-cn.com/c05aeb8f001d15ea8a2161f1510626f3cc11aafb7a3e14aad71dd566978266db-image.png)

**总结**
 
 [image.png](https://pic.leetcode-cn.com/4dc15e34382af0dea582e6dd327fe9ec0290d7a33a8664aeaa96a75b8aeffcd8-image.png)

### 代码

```python3
class Solution:

    def numberOf2sInRange(self, n: int) -> int:
        
        f_lst, str_num, ans = [0], str(n), 0
        m = len(str_num)
        
        def f(n):
            if n < len(f_lst):
                return f_lst[n]
            else:
                for i in range(len(f_lst), n + 1):
                    f_lst.append(10 * f_lst[i - 1] + 10 ** (i - 1))
                return f_lst[n]
            
        for k in reversed(range(1, m + 1)):
            a_k = int(str_num[m - k])
            if a_k > 2:
                ans += a_k * f(k - 1) + 10 ** (k - 1)
            elif a_k < 2:
                ans += a_k * f(k - 1)
            else:
                ans += 2 * f(k - 1) + (n % (10 ** (k - 1))) + 1
                
        return ans
```