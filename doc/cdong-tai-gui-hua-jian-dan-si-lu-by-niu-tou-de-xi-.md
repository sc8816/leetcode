# 解体思路：
由于昨天刚刷了下931.降路径最小和。感觉这道理题和931思路基本不变仅仅是因为约束条件改变所以稍微做了一下变动，大致思路是以dp[i][j]最为终点从上一层中选取最小值放入当前位置（注意要不同列得条件）
举个例子：A[[1,2,3],[4,5,6]]，如果只看第一层，dp[0][0:col(2)]均是A[0][0:col(2)]本身，所以直接考虑第二层，dp[1][0] = min(dp[1 - 1][0:2]) + A[1][0],（满足不同列且上一层最小，即。2+4）同理dp[1][1] = 1 + 5; dp[1][3] = 1 + 6;dp[[1,2,3],[6,6,7]] 即最后一层最小值即是本题答案，所以动状态转移方程为
**dp[i][j] = min(dp[i][0:col]) + A[i][j];**
犹豫思路931没啥区别，直接copy代码在多加一层循环寻找上一层得最小值就直接A了，所以代码直接是优化了空间复杂度的。如果还是不太明白可以看看我931得题解(我实在不知道链接怎么放，尴尬)
```
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& arr) {
        int row = arr.size();
        int col = arr[0].size();
        vector<int> dp(col + 2);
        vector<int> temp(col + 2, INT_MAX-100000);
        for(int i = 1; i <= row; i++){
            for(int j = 1; j <= col; j++){
                int min_num = INT_MAX;
                for(int k = 1; k <= col; k++){
                    if(k == j) continue;
                    else min_num = min(min_num, dp[k]);
                }
                temp[j] = min_num + arr[i-1][j-1];
            }
            dp = temp;
        }
        int ans = INT_MAX;
        for(int i = 1; i <= col; i++){
            if(dp[i] < ans) ans = dp[i];
        }
        return ans;
    }
};
```
在考虑优化时间复杂度，这题与931不同的地方是要知道上一层最小的值且满足相邻行元素不同列，所以不难想到我们不需要每次都便利一遍上一层的最小值，而是运用两个变量纪录上一层最小和第二小的值，和最小值的下标这个时候状体转移方程就是
**当前下标j == 上一层最小值小标（即上层最小值与当前下标同列） dp[i][j] = 第二小值 + arr[i][j];
否则 dp[i][j]  = 最小值 + arr[i][j]**更新dp[i][j] 后记录当前i行的最小值和第二小值，这样时间复杂度为O(N^2)空间复杂度O(N);
```
class Solution {
public:
    int minFallingPathSum(vector<vector<int>>& arr) {
        int row = arr.size();
        int col = arr[0].size();
        vector<int> dp(col);
        int first_num = 0;
        int second_num = 0;
        int first_index = 0;
        for(int i = 0; i < row; i++){
            int first_temp = INT_MAX;
            int second_temp = INT_MAX;
            int temp_index = 0;
            for(int j = 0; j < col; j++){
                if(j == first_index) dp[j] = second_num + arr[i][j];
                else dp[j] = first_num + arr[i][j];
                if(first_temp > dp[j]){
                    second_temp = first_temp;
                    first_temp = dp[j];
                    temp_index = j;
                }
                else if(second_temp > dp[j]) second_temp = dp[j];
            }
            first_num = first_temp;
            second_num = second_temp;
            first_index = temp_index;
        }
        int ans = INT_MAX;
        for(int i = 0; i < col; i++){
            if(dp[i] < ans) ans = dp[i];
        }
        return ans;
    }
};
```
这道理感觉和931思路太像了，感觉没多大变动，不过优化时间复杂度到O(N^2)很多细节还是要注意，我当时就因为一些细节调试了1个小时，太菜了，仅作分享。