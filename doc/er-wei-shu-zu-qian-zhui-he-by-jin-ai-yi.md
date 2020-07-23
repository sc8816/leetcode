### 解题思路
 [QQ截图20200517214305.png](https://pic.leetcode-cn.com/2fc5d2c096b9fd366244390fcab899b89e0f7e37aa502125507dc81b4320cd2f-QQ%E6%88%AA%E5%9B%BE20200517214305.png)

二维数组前缀和问题，做完这个题可以去做下https://leetcode-cn.com/problems/maximum-side-length-of-a-square-with-sum-less-than-or-equal-to-threshold/ 练练手，是前缀和+二分的题

前缀和网上很多教程，贴一个自己觉得讲的不错的：
https://blog.csdn.net/qq_34990731/article/details/82807870
知道个意思就行了，公式老长的，真要用到了还得自己推
### 代码

```java
class Solution {
    public int[][] matrixBlockSum(int[][] mat, int K) {

     int m=mat.length;
        int n=mat[0].length;
        int [][] res=new int[m][n];
        int [][] S=new int[m][n];//前缀和矩阵
        //先求前缀和矩阵
        S[0][0]=mat[0][0];
        for(int i=1;i<m;i++) S[i][0]=S[i-1][0]+mat[i][0];
        for(int j=1;j<n;j++) S[0][j]=S[0][j-1]+mat[0][j];
        for(int i=1;i<m;i++){
            for(int j=1;j<n;j++){
                S[i][j]=S[i-1][j]+S[i][j-1]-S[i-1][j-1]+mat[i][j];
            }
        }
        for(int i=0;i<m;i++){
            for(int j=0;j<n;j++){
                res[i][j]=sub_sum_mat(i-K<0?0:i-K,j-K<0?0:j-K,i+K>=m?m-1:i+K,j+K>=n?n-1:j+K,S);
            }
        }
        return res;

    }
    public int sub_sum_mat(int x1,int y1,int x2,int y2,int[][] S){
        return S[x2][y2]-(x1-1<0?0:S[x1-1][y2])-(y1-1<0?0:S[x2][y1-1])+(x1-1<0||y1-1<0?0:S[x1-1][y1-1]);
    }
}
```