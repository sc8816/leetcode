### 解题思路
博弈问题的难点在于如何用DP表示两个玩家都足够聪明，即两个玩家每一步都获取最优解。
当只有两个数时，就很容易模拟两个玩家足够聪明，选大的数即可。
### 基本博弈DP模板
最基本的博弈DP模板。
dp[i][j].fir 表示nums[i]到nums[j]之间 先手拿到的最大分数。
dp[i][j].sec 表示nums[i]到nums[j]之间 后手拿到的最大分数。
这样就能轻松的得到递推公式。
dp[i][j].fir = max(nums[i]+dp[i+1][j].sec, nums[j]+dp[i][j-1].sec);
// 先手选左边，获得nums[i]的分数，并得到dp[i+1][j]的后手的分数。
// 先手选右边，获得nums[j]的分数，并得到dp[i][j-1]的后手的分数。
dp[i][j].sec = dp[i+1][j].fir or dp[i][j-1].fir;
// 当前位置后手，即成为对应的先手

 [TIM图片20200603100001.png](https://pic.leetcode-cn.com/d5fa1c0fce2a0e607fdec6e0bb4e8f7c9bbcfb743959c743b0dc67b5399d49dd-TIM%E5%9B%BE%E7%89%8720200603100001.png)
如图当nums[3,9,1,2]时的递推图

### 代码

```cpp
class Solution {
public:
    bool PredictTheWinner(vector<int>& nums) {
        vector<vector<pair<int,int>>> dp(nums.size(),vector<pair<int,int>>(nums.size(),pair<int,int>(0,0)));
        for(int i =0;i<nums.size();++i)
            dp[i][i].first = nums[i];

        for(int i =nums.size()-2;i>=0; --i)//根据递推的关系，确认循环方向
            for(int j=i+1;j<nums.size();++j){
                int left = nums[i]+dp[i+1][j].second;
                int right= nums[j]+dp[i][j-1].second;
                if(left>right){
                    dp[i][j].first = left;
                    dp[i][j].second = dp[i+1][j].first;
                }
                else{
                    dp[i][j].first = right;
                    dp[i][j].second = dp[i][j-1].first;
                }
            }
        return dp[0][nums.size()-1].first>=dp[0][nums.size()-1].second;
    }
};
```
复杂度 o(n^2)  o(2*n^2)
### 空间优化
根据递推公式，可以明确的得知空间的依赖性。
dp[i][j] 只与 dp[i+1][j]和dp[i][j-1] 有关。 所以可以空间重用。
直接修改代码，空间复杂度从 o(2n^2) 降到 o(2n)

二维dp来实现的情况下，如果循环方向正确（不影响数据依赖），则直接将代码中dp[i][j]的[i]去掉即可。
### 代码

```cpp
class Solution {
public:
    bool PredictTheWinner(vector<int>& nums) {
        vector<pair<int,int>> dp(nums.size(),pair<int,int>(0,0));
        for(int i =0;i<nums.size();++i)
            dp[i].first = nums[i];
        for(int i =nums.size()-2;i>=0; --i)
            for(int j=i+1;j<nums.size();++j){
                int left = nums[i]+dp[j].second;
                int right= nums[j]+dp[j-1].second;
                if(left>right){
                    dp[j].second = dp[j].first;
                    dp[j].first = left;
                }
                else{
                    dp[j].second = dp[j-1].first;
                    dp[j].first = right;
                }
            }
        return dp[nums.size()-1].first>=dp[nums.size()-1].second;
    }
};
```
### 空间再优化
博弈问题可以用先手和后手表示，能更明确思路。
也可以用另一种方式表示dp，降低多余的复杂度。
dp[i][j]表示 i-j 之间先手胜后手的分数。 直接将先手后手整合在一起。
有递推公式
dp[i][j] = max(nums[i]-dp[i+1][j],nums[j]-dp[i][j-1])
//选择了左边，获得nums[i]的分数，减去dp[i+1][j]的先手领先。就是当前位的先手领先。
//选择了右边，获得nums[j]的分数，减去dp[i][j-1]的先手领先。就是当前位的先手领先。
如 [1,5,2]时  dp[2][2] = 2  dp[1][1]= 5
dp[1][2] = max(5-dp[2][2], 2-dp[1][1]) = 3 // 表示先手可以领先后手2分

根据递推公式 可以直接将dp 从 o(n^2) 空间复杂度再降到 o(n)

### 代码

```cpp
class Solution {
public:
    bool PredictTheWinner(vector<int>& nums) {
        vector<int> dp=nums;
        for(int i =nums.size()-2;i>=0; --i)
            for(int j=i+1;j<nums.size();++j){
               dp[j] = max(nums[i]-dp[j],nums[j]- dp[j-1]);
            }
        return dp.back()>=0;
    }
};
```
 [2.png](https://pic.leetcode-cn.com/12b0c91610151ac9b262d6839fe06071563b11cdf0e607152b7a9c3b98d0b58f-2.png)
