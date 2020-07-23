#### 解题思路
1. 动态规划：在这一环节我们要做的工作是判断给定的字符串能否被拆分，并用map记录所有存在的路径（这里的路径如`[i] -> [j]`指的是`s[i]～s[j]`这一部分子串存在给定的字典中）。
动态规划的主要思路可以参考139题的官方题解[139.单词拆分](https://leetcode-cn.com/problems/word-break/solution/dan-ci-chai-fen-by-leetcode/)，并引入了一些优化策略：首先获得字典中单词的最短和最长长度，每次都在这个范围内搜索合法的子串。另外要注意与上题不同的一点：在判断出有合法的子串存在时并不是立刻跳出循环，而是继续循环搜索并记录所有的合法子串（路径）。 

2. 回溯法，如果上一步判断该字符串有合法的拆分方案，便根据记录好的路径进行搜索和回溯，获得所有拆分方案。
#### 一些细节
- `dp[i]`的含义是给定字符串的前`i`个字符能否拆分，即`dp[i]`对应的实际上是`[0,i-1]`这一部分的子串，所以每当`dp[j] && se.count(s.substr(j,i - j)`为真时，我们需要构建的路径为`[j,i-1]`。

- 在深度搜索中，如果我们添加到`path`中的某个子串为`[i,j]`所以下一个为开始搜索的位置应该为`j+1`。

#### 代码
```
class Solution {
public:
    unordered_multimap<int,int> mp;
    vector<string> res;
    string path;
    vector<string> wordBreak(string s, vector<string>& wordDict) {
        unordered_set<string> se(wordDict.begin(),wordDict.end());        
        int maxlen = 0,minlen = INT_MAX;
        for(auto word : wordDict){
            maxlen = max(maxlen,(int)word.size());
            minlen = min(minlen,(int)word.size());
        }
        int n = s.size();
        vector<bool> dp(n + 1,false);
        dp[0] = true;
        for(int i = minlen; i <= n; i++){
            for(int j = max(i - maxlen,0); j <= i - minlen; j++){
                if(dp[j] && se.count(s.substr(j,i - j))){
                    dp[i] = true;
                    mp.insert(make_pair(j,i - 1));
                }
            }
        }
        if(dp[n]){
            dfs(0,n,s);
        }
        return res;
    }

    void dfs(int index,int len,string& s){
        if(index == len){
            res.emplace_back(path.substr(1,path.size())); //去除首个位置的空格
        }else{
            auto pl = mp.equal_range(index);
            for(auto iter = pl.first; iter != pl.second; iter++){
                int next = iter -> second;
                string old = path;
                path += " ";
                path += s.substr(index,next - index + 1);
                dfs(next + 1,len,s);
                path = old;
            }
        }
        return;
    }
};
```
