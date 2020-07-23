### 解题思路
- dp[k][dst]表示从src经过k词中转到达dst的最便宜价格，注意src是固定的，所以不需要维护，只需要维护dp[k][dst]
- 注意 fight = [src,dst,price],src,dst,price = fight[0],fight[1],fight[2]
- 递推方程：dp[k][dst] = min(dp[k][dst],dp[k-1][src]]+price)
- 初始条件一：整个二维表格初始化为 float('inf'),表示从src经过k次中转无法到达dst
- 初始条件二：遍历flight，找到出发点为src的航班，标记dp[0][fight[1]]==fight[2],即更新src可直达航班
- 初始条件三：dp[k][src]=0,因为从出发点到出发点不管经过几次中转，都应该认为价格是0

### 代码

```python3
class Solution:
    def findCheapestPrice(self, n: int, flights: List[List[int]], src: int, dst: int, K: int) -> int:
        dp = [[float('inf')]*n  for _ in range(K+1)]
        

        for flight in flights:
            if flight[0]==src:
                dp[0][flight[1]]=flight[2] 
        
        for k in range(0,K+1):
            dp[k][src]=0

        for k in range(1,K+1):
            for flight in flights:
                if dp[k-1][flight[0]] != float('inf'):
                    dp[k][flight[1]] = min(dp[k][flight[1]], dp[k-1][flight[0]]+flight[2])

        
        return dp[K][dst] if dp[K][dst]!=float('inf') else -1
        
```