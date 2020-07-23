1. 我们设`dp[i]`表示前`i`个元素中存在的连续子数组和为`target`的最小长度。
2. 由于数组中所有的数都为正数，所以我们可以利用hash值来快速查询以索引`i`为结尾且和为`target`的连续子数组是否存在，如果存在则它的长度肯定是唯一的,我们可以利用`hash[sum-target]]`快速的得该连续子数组的最左的起点位置索引`j`，即可快速求出连续子数组的长度.我们用`len(target,i)`代表和为`target`且最右边的终点为索引`i`的连续子数组的长度。则可以得到公式为：
![\begin{array}{l}minSum=min(minSum,len(target,i)+dp\[i-len(target,i)\])\quad(if\quadlen(target,i)>0)\\\\dp\[i\]=min(dp\[i-1\],len(target,i))\quad(if\quadlen(target,i)>0)\\\end{array} ](./p____begin{array}{l}__minSum_=_min_minSum,len_target,i__+_dp_i-len_target,i____quad__if_quad_len_target,i____0______dp_i__=_min_dp_i-1_,len_target,i___quad__if_quad_len_target,i____0____end{array}___.png) 
```c++
class Solution {
public:
    int minSumOfLengths(vector<int>& arr, int target) {
        int n = arr.size();
        int res = n+1;
        unordered_map<int,int> cnt;
        vector<int> dp(n,n+1);
        cnt[0] = -1;
        int sum = 0;
        
        for(int i = 0; i < arr.size(); ++i){
            sum += arr[i];
            cnt[sum] = i;
            if(i > 0) dp[i] = dp[i-1];
            if(cnt.count(sum-target)){
                int prev = cnt[sum-target];
                if(prev >= 0 && dp[prev] <= n){
                    res = min(i - prev + dp[prev],res);
                }
                dp[i] = min(dp[i],i - prev);
            }
        }
        
        if(res > n) return -1;
        return res;
    }
};
```