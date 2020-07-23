#### 方法一： 暴力 【通过】

最简单直白的方法就是考虑每一对元素（之间至少隔着一个元素），对两个元素之间的所有元素来判断是不是等差数列。接下来，只需遍历每个元素来检查相邻元素之间的差值是不是都是相等的就可以了。对于每个满足等差数列的区间，增加 *count* 来记录等差数列的总数。

```Java []
public class Solution {
    public int numberOfArithmeticSlices(int[] A) {
        int count = 0;
        for (int s = 0; s < A.length - 2; s++) {
            int d = A[s + 1] - A[s];
            for (int e = s + 2; e < A.length; e++) {
                int i = 0;
                for (i = s + 1; i <= e; i++)
                    if (A[i] - A[i - 1] != d)
                        break;
                if (i > e)
                    count++;
            }
        }
        return count;
    }
}
```

**复杂度分析**

* 时间复杂度： *O(n^3)*
对于每一对元素，都需要遍历它们之间的所有元素。其中 *n* 为数组 *A* 的大小。

* 空间复杂度： *O(1)*
只需额外开辟常数个空间。

#### 方法二 优雅的暴力 【通过】

**算法**

在上一个方法中，我们考虑每一对元素和它们对应的区间，然后遍历这一段区间来检查相邻元素之间的差值是不是都是相等的。通过简单地观察，可以发现这个方法其实是可以优化的。

如果当前在处理一个区间 *(s,e)*，其中 *A[s]*（区间头）和 *A[e]* （区间尾），我们需要检查这个区间内所有相邻元素的差值是不是都相等。现在，把这个区间扩大一点，变成从 *s* 到 *e+1*，我们就需要再一次对于区间 *s:e* 中的所有元素做一遍等差判断，然后再额外判断 *A[e+1]* 和 *A[e]* 的差值是不是跟之前的相等。其实是可以不用重复的判断区间 *s:e* 的，只需要判断最后一对元素的差值是不是跟之前区间中的差值相等就可以了。（固定 *s*，不断增加 *e*)。

需要注意的是，一旦当前区间不满足等差数列了，那就不需要继续判断了。

```Java []
public class Solution {
    public int numberOfArithmeticSlices(int[] A) {
        int count = 0;
        for (int s = 0; s < A.length - 2; s++) {
            int d = A[s + 1] - A[s];
            for (int e = s + 2; e < A.length; e++) {
                if (A[e] - A[e - 1] == d)
                    count++;
                else
                    break;
            }
        }
        return count;
    }
}
```

**复杂度分析**

* 时间复杂度： *O(n^2)*
算法有两层循环

* 空间复杂度： *O(1)*
只需额外开辟常数个空间。

#### 方法三 递归 【通过】

**算法**

通过上一个方法我们归纳出来一个规律，如果区间 *(i, j)* 是等差数列，那么当 *A[j+1]* 和 *A[j]* 的差值和之前的差值相等的情况下，区间 *(i,j+1)* 也构成一个等差数列。此外，如果区间 *(i,j)* 就不是一个等差数列，那么之后再向右拓展也不可能是一个等差数列了。

根据这个规律，我们可以设计一个递归算法。首先，定义变量 *sum* 来记录数组 *A* 中所有等差数列的个数。接着，定义一个递归方法 `slice(A,i)` 来求在区间 *(k,i)* 中，而不在区间 *(k,j)* 中等差数列的个数，其中 *j < i*。每次递归也都会更新 *sum* 值。

现在，假设我们知道了 *slice(A,i-1)* 的值为 *x*，同时这个区间内元素用 *[a_0,a_1,a_2,...a_(i-1)]* 来表示。如果这个区间本身就是一个等差数列，这么这里面所有相邻元素之间的差值都是相等的。现在要加入一个新的元素 *a_i* 将区间拓展成 *(0,i)*，如果拓展之后的区间还是一个等差数列，那么一定存在 *a_i-a_(i-1)=a_(i-1)-a_(i-2)*。因此每加入一个新元素，就会多出 *ap* 个等差序列。其中新增等差数列的区间为 *(0,i), (1,i), ... (i-2,i)*，这些区间总数为 *x+1*。这是因为除了区间 *(0,i)* 以外，其余的区间如 *(1,i), (2,i),...(i-2,i)* 这些都可以对应到之前的区间 *(0,i-1), (1,i-1),...(i-3,i-1)* 上去，其值为 *x*。

因此，每次调用 `slices`，如果第 *i个* 元素与前一个元素的差值正好等于之前的差值，我们直接就可以算出新增的等差数组的个数 *ap*，同时可以更新 *sum*。但是，如果新元素跟前一个元素的差值不等于之前的差值，也就不会增加等差数列的个数。

```Java []
public class Solution {
    int sum = 0;
    public int numberOfArithmeticSlices(int[] A) {
        slices(A, A.length - 1);
        return sum;
    }
    public int slices(int[] A, int i) {
        if (i < 2)
            return 0;
        int ap = 0;
        if (A[i] - A[i - 1] == A[i - 1] - A[i - 2]) {
            ap = 1 + slices(A, i - 1);
            sum += ap;
        } else
            slices(A, i - 1);
        return ap;
    }
}
```

**复杂度分析**

* 时间复杂度： *O(n)*
递归方法最多被调用 *n-2* 次。

* 空间复杂度： *O(n)*
递归树的深度最多为 *n-2*。

#### 方法五： 动态规划 【通过】

**算法**

在上一个方法中，我们开始是从最大区间 *(0,n-1)* 开始的，其中 *n* 为数组 *A* 中元素的个数。我们可以观察到区间 *(0,i)* 中等差数列的个数只和这个区间中的元素有关。因此，这个问题可以用动态规划来解决。

首先创建一个大小为 *n* 的一维数组 *dp*。*dp[i]* 用来存储在区间 *(k,i)*， 而不在区间 *(k,j)* 中等差数列的个数，其中 *j<i*。

与递归方法中后向推导不同，我们前向推导 *dp* 中的值。其余的思路跟上一个方法几乎一样。对于第 *i* 个元素，判断这个元素跟前一个元素的差值是否和等差数列中的差值相等。如果相等，那么新区间中等差数列的个数即为 *1+dp[i-1]*。*sum* 同时也要加上这个值来更新全局的等差数列总数。

下面的动画描述了 *dp* 的推导过程。

  [1000](https://pic.leetcode-cn.com/Figures/413/413_Arithmetic_SlicesSlide1.PNG)  [1000](https://pic.leetcode-cn.com/Figures/413/413_Arithmetic_SlicesSlide2.PNG)  [1000](https://pic.leetcode-cn.com/Figures/413/413_Arithmetic_SlicesSlide3.PNG)  [1000](https://pic.leetcode-cn.com/Figures/413/413_Arithmetic_SlicesSlide4.PNG)  [1000](https://pic.leetcode-cn.com/Figures/413/413_Arithmetic_SlicesSlide5.PNG)  [1000](https://pic.leetcode-cn.com/Figures/413/413_Arithmetic_SlicesSlide6.PNG)  [1000](https://pic.leetcode-cn.com/Figures/413/413_Arithmetic_SlicesSlide7.PNG)  [1000](https://pic.leetcode-cn.com/Figures/413/413_Arithmetic_SlicesSlide8.PNG)  [1000](https://pic.leetcode-cn.com/Figures/413/413_Arithmetic_SlicesSlide9.PNG) 

```Java [solution-4]
public class Solution {
    public int numberOfArithmeticSlices(int[] A) {
        int[] dp = new int[A.length];
        int sum = 0;
        for (int i = 2; i < dp.length; i++) {
            if (A[i] - A[i - 1] == A[i - 1] - A[i - 2]) {
                dp[i] = 1 + dp[i - 1];
                sum += dp[i];
            }
        }
        return sum;
    }
}

```

**复杂度分析**

* 时间复杂度： *O(n)*
只需遍历数组 *A* 一次，其大小为 *n*。

* 空间复杂度： *O(n)* 
一维数组 *dp* 大小为 *n*。

#### 方法五 常数空间动态规划 【通过】

**算法**

在上一个方法中，可以观察到我们其实只需要 *dp[i-1]* 来决定 *dp[i]* 的值。因此，相对于整个 *dp* 数组，我们只需要保存一个最近一个 *dp* 值就可以了。

```Java []
public class Solution {
    public int numberOfArithmeticSlices(int[] A) {
        int dp = 0;
        int sum = 0;
        for (int i = 2; i < A.length; i++) {
            if (A[i] - A[i - 1] == A[i - 1] - A[i - 2]) {
                dp = 1 + dp;
                sum += dp;
            } else
                dp = 0;
        }
        return sum;
    }
}
```

**复杂度分析**

* 时间复杂度： *O(n)*
只需遍历数组 *A* 一次，其大小为 *n*。

* 空间复杂度： *O(1)*
只需常数个额外空间。

#### 方法六 公式计算 【通过】

**算法**

通过 *dp* 方法，我们观察到对于 *k* 个连续且满足等差条件的元素，每次 *sum* 值分别增加 *1, 2, 3, ..., k*。因此，与其每次更新 *sum* 值，只需要用变量 *count* 来记录有多少个满足等差条件的连续元素，之后直接把 *sum* 增加 *count*(count+1)/2* 就可以了。

```Java []
public class Solution {
    public int numberOfArithmeticSlices(int[] A) {
        int count = 0;
        int sum = 0;
        for (int i = 2; i < A.length; i++) {
            if (A[i] - A[i - 1] == A[i - 1] - A[i - 2]) {
                count++;
            } else {
                sum += (count + 1) * (count) / 2;
                count = 0;
            }
        }
        return sum += count * (count + 1) / 2;
    }
}
```

**复杂度分析**

* 时间复杂度： *O(n)*
只需遍历数组 *A* 一次，其大小为 *n*。

* 空间复杂度： *O(1)*
只需额外开辟常数个空间。