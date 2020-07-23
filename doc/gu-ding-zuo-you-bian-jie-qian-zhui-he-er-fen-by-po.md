## 思路

做这道题之前，做一下 [53. 最大子序和](https://leetcode-cn.com/problems/maximum-subarray/) | [题解链接]( https://leetcode-cn.com/problems/maximum-subarray/solution/sumij-sum0j-sum0iqiu-jie-by-powcai/)

对，关键思想就是**前缀和**

我们先把题目转化一下，求矩阵连续行组成面积最大？什么意思呢？就是固定左右边界，只考虑行，在哪两个行之间组成矩形的面积最大。

这样我们就可以通过**前缀和**的方式，我们把每行的总和求得，通过前缀和的找差值最大就能找到最大矩阵了！

那么我们这题说不超过**K**的最大数值和，也就是找到的矩阵尽可能的和接近**K**，有了前缀和数组还能找不到吗？

所以，我们代码如下：

1. 划分左右边界，并求出在此边界下，每行的总和
2. 通过二分法找不超过K的矩阵
当然以行划分也行，为什么要以列为边界，因为题目中说了 如果行数远大于列数呢！

```python
class Solution:
    def maxSumSubmatrix(self, matrix: List[List[int]], k: int) -> int:
        import bisect
        row = len(matrix)
        col = len(matrix[0])
        res = float("-inf")
        for left in range(col):
            # 以left为左边界，每行的总和
            _sum = [0] * row
            for right in range(left, col):
                for j in range(row):
                    _sum[j] += matrix[j][right]
                # 在left，right为边界下的矩阵，求不超过K的最大数值和
                arr = [0]
                cur = 0
                for tmp in _sum:
                    cur += tmp
                    # 二分法
                    loc = bisect.bisect_left(arr, cur - k)
                    if loc < len(arr):res = max(cur - arr[loc], res)
                    # 把累加和加入
                    bisect.insort(arr, cur)
        return res
```

