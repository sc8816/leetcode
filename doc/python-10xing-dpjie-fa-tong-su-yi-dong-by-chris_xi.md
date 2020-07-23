DP，两个值分别记录删除过一次和没删除过的，以该位置为结尾的子数组最大和。A为删除过一次的，B为没删除过的。时间复杂度O(N)，空间复杂度O(1) 易得，
- A[i] = max(A[i-1]+arr[i], 0, B[i-1]）其中A[i-1]+arr[i]表示之前删除过一次，加入目前的数组元素，0代表不要之前的子数组，且删除当前的数组元素（即子数组全部清空），B[i-1]代表加上之前没删除过的子数组，且删除当前的数组元素。
- B[i] = max(B[i-1]+arr[i], arr[i])   该部分与子数组最大和一样

```python
class Solution:
    def maximumSum(self, arr: List[int]) -> int:
        A, B, ans = 0, arr[0], arr[0]
        for i in range(1, len(arr)): 
            n = arr[i]
            A = max(A+n, B)  # 更新删除过一次的当前最大值，先排除清空子数组的情况
            B = max(B+n, n)
            ans = max(ans, A, B)  # 记录全局最大值
            A = max(A, 0)     # 由于一定要保证至少有一个元素，因此在记录全局最大值后再考虑这一情况
        return ans
```