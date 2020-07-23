### 解题思路
# 确定状态
动态规划一般来讲，目标是求什么则什么即为状态，然后分析当前状态和之前状态的推导关系，进而进行穷举所有状态即可。
本题中使用dp[i][j] 表示第 i 个位置的元素，第 j （交换、不交换）状态时的最小次数。
# 初始状态
第 0 个位置可以交换，也可以不交换，即初始状态为：d[0][0] = 0、dp[0][1] = 1。
# 状态转移方程
根据题目要求一定存在结果，所以在第 i 个位置，只会有以下几种情况：
①．A、B 两个数组对应的位置都是有序、存在交叉
 [交换1.jpg](https://pic.leetcode-cn.com/b82f24d630ae27d2976c5da349e81a8d94692a6ce1dea12f033185b0c31d066a-%E4%BA%A4%E6%8D%A21.jpg)
如上图，A[i-1] < A[i] 、B[i-1] < B[i]，并且 A[i-1] < B[i] 、B[i-1] < A[i]；此时位置 i 可以交换，也可以不交换，并且和上个位置的交换状态无关。
②．A、B 两个数组对应的位置都是有序、不在交叉
 [交换2.jpg](https://pic.leetcode-cn.com/8944b83f89714dfb3054611fca0c432251d3a60ab524c857550cd6bf7201df4d-%E4%BA%A4%E6%8D%A22.jpg)

如上图，A[i-1] < A[i] 、B[i-1] < B[i]，并且  A[i-1] < B[i] 、B[i-1] > A[i]；此时位置 i 若选择不交换，则上个位置也不能交换、若选择交换，则上个位置也必须交换。
③．A、B 两个数组对应的位置有一个存在无序
 [交换3.jpg](https://pic.leetcode-cn.com/8e86415714a78fb6f3c29e8baed83538226d7036cf586ba5b5f4dd929eb8ef6e-%E4%BA%A4%E6%8D%A23.jpg)
如上图，A[i-1] > A[i] 、B[i-1] < B[i]，并且  A[i-1] < B[i] 、B[i-1] < A[i]；此时位置 i 若选择不交换，则上个位置必须交换、若选择交换，并且上个位置不能交换。
# 确认结果
数组末尾位置的状态值就是本题为结果，即 min(dp[A.size()-1][0],dp[A.size()-1][1]);
 [TIM截图20200602154558.png](https://pic.leetcode-cn.com/466f44fcff7b70086085b1737ed11f0c1d953a5a07b3e866b9d4ab5d9c7963dc-TIM%E6%88%AA%E5%9B%BE20200602154558.png)

微信搜索“编程猿来如此”关注公众号
### 代码

```cpp
class Solution {
public:
    int minSwap(vector<int>& A, vector<int>& B) {
        int res = 0;
        vector<vector<int>> dp(A.size(),vector(2,0));
        dp[0][0] = 0;
        dp[0][1] = 1;
        for(int i = 1;i < A.size();i++)
        {
            if(A[i-1]<A[i]&&B[i-1]<B[i]){
                if(A[i-1]<B[i] && B[i-1]<A[i]){//任意交换或者不交换，取最优值
                    dp[i][0] = min(dp[i-1][0],dp[i-1][1]);
                    dp[i][1] = min(dp[i-1][0],dp[i-1][1])+1;
                }else{
                    dp[i][0] = dp[i-1][0];//不交换，则上个位置也不能交换
                    dp[i][1] = dp[i-1][1]+1; //交换，则上个位置也必须交换
                }
            }else{
                dp[i][0] = dp[i-1][1];// 不交换，则上个位置必须交换
                dp[i][1] = dp[i-1][0]+1;// 交换，则上个位置不能交换
            }
        }
        return min(dp[A.size()-1][0],dp[A.size()-1][1]);
    }
};
```