**题意**：一个青蛙跳石头，上次跳跃距离如果是d，下次则可以跳d,d-1,d+1的距离(必须保证落在石头上)，问青蛙能不能从第一块石头跳到最后一块石头。

**思路**：青蛙每跳到一个石头上，可以转移到下个石头的方案取决于上次来的距离，所以需要维护一个距离的集合，类似List<Set>的形式，而在这个点上我们可以进行优化，用dp[i][j]表示第i个石头能否跳到第j个石头

**时间复杂度**： O(n^2)

```
class Solution {
public:
    bool canCross(vector<int>& stones) {
        int n = stones.size();
        unordered_map<int,int> mp;
        for(int i = 0; i < n; i++) {
            mp[stones[i]] = i;
        }

        int dp[n+10][n+10];
        memset(dp, 0, sizeof(dp));
        
        if(stones[1] != 1) return false;
        dp[1][0] = 1;

        for(int i = 1; i < n - 1; i++) {
            for(int j = 0; j < i; j++) {
                if(dp[i][j] == 1) {
                    int dis = stones[i] - stones[j];
                    for(int k = -1; k <= 1; k++) {
                        int next = dis + k;
                        if(next > 0 && mp[stones[i] + next] > 0) {
                            dp[mp[stones[i] + next]][i] = 1;
                        } 
                    }
                }
            }
        }

        for(int i = 0; i < n-1; i++) {
            if(dp[n-1][i] == 1) {
                return true;
            }
        }
        return false;
    }
};
```
