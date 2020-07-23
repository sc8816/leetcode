### 解题思路
可以转化成01背包问题
题目也可以转化成：有一堆石头，分成两堆，如何分才能使两堆石头之间的重量差距最小

### 代码

```cpp
class Solution {
public:
    int lastStoneWeightII(vector<int>& stones) {
        int stonenums = stones.size();
        int sum = 0, bagsize;
        for (int& stone : stones) sum += stone;
        bagsize = sum / 2;

        int dp[stonenums + 1][bagsize + 1];
        memset(dp, 0, sizeof(int) * (stonenums + 1) * (bagsize + 1));

        
        for (int i = 1; i < stonenums + 1; ++i) {
            for (int j = 1; j < bagsize + 1; ++j) {
                if (stones[i - 1] > j) 
                    dp[i][j] = dp[i - 1][j];
                else 
                    dp[i][j] = max(dp[i - 1][j], dp[i - 1][j - stones[i - 1]] + stones[i - 1]);
            }
        }

        return sum - 2 * dp[stonenums][bagsize];
    }
};
```