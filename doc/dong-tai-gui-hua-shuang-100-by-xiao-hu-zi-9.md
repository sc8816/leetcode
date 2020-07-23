### 解题思路
比较典型的动态规划解决，难点在于构建dp数组，并赋予含义
假设s1长度为m s2长度为n s3长度为l，当然首先l==m+n需要满足

1.如果s1和s2交错构成s3，那么dp[m][n]=1,**表示s1的前m个元素和s2的前n个元素可以构成l的前(m+n)个元素**

2.dp[m][n]可以由dp[m-1][n]或者dp[m][n-1]获得：
dp[m-1][n] 表示当s1的前m-1个元素和s2的前n个元素可以构成l的前(m+n-1)个元素 + 条件s1[m-1]==s3[m+n-1]
dp[m][n-1] 表示当s1的前m个元素和s2的前n-1个元素可以构成l的前(m+n-1)个元素 + 条件s2[n-1]==s3[m+n-1]

3.这样dp数组的构建形式有了，只需要完成初始化即可

附上样例数据生成的dp
```
1 0 0 0 0 0 
1 0 0 0 0 0 
1 1 1 1 1 0 
0 1 1 0 1 0 
0 0 1 1 1 1 
0 0 0 1 0 1 
```

这道题最大的启发是刚写了一个归并排序的代码，所以对**s1和s2已经使用的长度和==s3已经使用的长度**比较敏感，也对解题有了很大的帮助
 [image.png](https://pic.leetcode-cn.com/61f06b4397f9dd16277b71ec26b6e362e584ab90ec53b8b1fcc4556a331cc182-image.png)
为数不多的双百，纪念一下~
### 代码

```cpp
class Solution{
public:
    bool isInterleave(string s1,string s2,string s3){
        int m = s1.size();
        int n = s2.size();
        int l = s3.size();
        if(m+n!=l) return false;
        if(m==0||n==0){
            return s1==s3||s2==s3;
        }
        int dp[m+1][n+1];
        memset(dp, 0, sizeof(dp)); //赋值出现错误(m+1)*(n+1)
        dp[0][0] = 1;
        for(int i=1;i<m+1;i++){
            if(dp[i-1][0]==1&&s1[i-1]==s3[i-1]){
                dp[i][0] = 1;
            }
        }
        for(int j=1;j<n+1;j++){
            if(dp[0][j-1]==1&&s2[j-1]==s3[j-1]){
                dp[0][j] = 1;
            }
        }
        for(int i=1;i<m+1;i++){
            for(int j=1;j<n+1;j++){
                if((dp[i][j-1]==1&&s2[j-1]==s3[i+j-1])||(dp[i-1][j]==1&&s1[i-1]==s3[i+j-1])){
                    dp[i][j]=1;
                }
            }
        }
        return dp[m][n];
    }
};

```
附上一开始写的超时的代码
```
class Solution {
public:
    bool isInterleave(string s1, string s2, string s3) {
        int m = s1.length();
        int n = s2.length();
        int l = s3.length();
        stack<int> st;
        if(m+n!=l) return false;
        int i=0,j=0;
        while (i<=m && j<=n) {
            if(i<m && s1[i]==s3[i+j]){
                if(j<n && s2[j]==s3[i+j]){
                    st.push(i);
                    st.push(j);
                }
                i++;
            }
            else if(j<n && s2[j]==s3[i+j]){
                j++;
            }
            else{
                if(i==m && j==n) break;
                if(!st.empty()){
                    j = st.top();
                    st.pop();
                    i = st.top();
                    st.pop();
                    j++;
                }
                else return false;
            }
        }
        return true;
    }
};

```
