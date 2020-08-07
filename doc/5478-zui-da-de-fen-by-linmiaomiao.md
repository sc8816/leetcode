### 解题思路
一道很明显的dp题，只不过我们dp的顺序是数字从小到大进行。其中`dp[i][j]`代表到达numsi第j个位置的最大数字和。我们首先将所有数字进行排序（这里我让所有数字加入set中来排序），并且可以用哈希（unordered_map）的数据结构记录数字分别在nums1和nums2的位置。然后我们从小到大遍历数字p，若p在nums1和nums2中均存在，且位置为i，j（下标从1开始）,则`dp[1][i] = dp[2][j] = max(dp[1][i-1],dp[2][j-1]) + p `,否则若p只在一个数组中存在，则`dp[1][i] = dp[1][i-1] + p ` 或者 `dp[2][j] = dp[2][j-1] + p `,最后取`max(dp[1][n],dp[2][m])`作为最终答案。记得 % 1e9 + 7。显然时间复杂度为`O(klogk)`,`k = max(n,m)`。当然可以采用双指针法，可以把复杂度优化到`O(k)`。
### 代码

```cpp
const int N = 1e5 + 10;
#define pb push_back
#define LL long long
class Solution {
public:
    LL dp[3][N];
    int maxSum(vector<int>& nums1, vector<int>& nums2) {
        set<int> ord;
        int n = nums1.size(),m = nums2.size();
        unordered_map<int,int> pos[3];
        for(int i=0;i<n;i++) ord.insert(nums1[i]),pos[1][nums1[i]] = i;
        for(int i=0;i<m;i++) ord.insert(nums2[i]),pos[2][nums2[i]] = i;
        dp[1][0] = dp[2][0] = 0;
        for(auto p : ord){
            if(pos[2].find(p) != pos[2].end() && pos[1].find(p) != pos[1].end()){
                dp[2][pos[2][p] + 1] = dp[1][pos[1][p] + 1] = max(dp[1][pos[1][p]],dp[2][pos[2][p]]) + p;
            }else if(pos[1].find(p) != pos[1].end()){
                dp[1][pos[1][p] + 1] = dp[1][pos[1][p]] + p;
            }else if(pos[2].find(p) != pos[2].end()){
                dp[2][pos[2][p] + 1] = dp[2][pos[2][p]] + p;
            }
        }
        return max(dp[1][n],dp[2][m]) % 1000000007;
    }
};
```
改成双指针版本后：
### 代码

```cpp
const int N = 1e5 + 10;
#define LL long long
class Solution {
public:
    int maxSum(vector<int>& nums1, vector<int>& nums2) {
        int n = nums1.size(),m = nums2.size();
        LL ans1 = 0, ans2 = 0;
        int x = 0,y = 0;
        while(x < n && y < m){
            if(nums1[x] == nums2[y])  ans1 = ans2 = max(ans1,ans2) + nums1[x], x ++, y ++;
            else if(nums1[x] < nums2[y])  ans1 += nums1[x], x ++;
            else if(nums2[y] < nums1[x])  ans2 += nums2[y], y ++;
        }
        while(x < n)  ans1 += nums1[x], x ++;
        while(y < m)  ans2 += nums2[y], y ++;
        return max(ans1,ans2) % 1000000007;
    }
};
```