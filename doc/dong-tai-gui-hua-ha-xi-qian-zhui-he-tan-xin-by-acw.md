### 解题思路

首先，我们可以得到如下几个事实：
1. 如果存在多个以`i`下标结尾的子数组，那么如果选这个子数组的话，那么一定选择最短的那一个。因为如果长的作为答案中的一个数组，那么换成短的话，一定也成立，而且总和最小。(贪心的思想))
2. 如何求以`i`下标结尾的和为target的子数组？可以用哈希表+前缀和的方法。用哈希表记录每个前缀和出现的最后一个位置(因为要求子数组长度的最小值，所以只需要存某个前缀和最大的那个下标)，然后扫描的时候，首先计算到当前位置的前缀和`s`，然后再看`s - target`是否在前面的前缀和出现过。如果出现过，设`s - target`出现的最后一个下标为`j`，则`i - j`就是以`i`结尾的，且子数组和为`target`的个数最少的子数组的长度。(对应代码中的`fuck`和`t`)
3. 如何求两个？当我们得到了以`i`结尾的和为`target`的最短子数组，那么如何求解以`0 - i`这个范围内，和为`target`的两个子数组呢？还是一样的思想。我们知道了以`i`结尾的最短子数组，那么只需要看`j`之前的，和`target`子数组是否存在，以及长度是多少。这样就需要用一个数组来存储以`i`结尾的，前面出现的所有和为`target`的子数组的长度最小值即可。(对应代码中的`m_f`)

[个人博客](http://wangdh15.github.io)

### 代码

```cpp
class Solution {
public:
    int minSumOfLengths(vector<int>& arr, int target) {
        unordered_map<int, int> fuck;   // 记录前缀和出现的最后一个下标
        int t = 0;
        int ans = 2e9;
        vector<int> m_f;   // 记录到每个位置，和为target的最短子数组的长度
        int mi = 0;    
        fuck[0]  = -1;
        for(int i = 0; i < arr.size(); i ++){
            t += arr[i];
            fuck[t] = i;
            // cout << i << " ";
            if(fuck.count(t - target)){
                int l_i = fuck[t - target];
                int ttt = i - l_i;
                if(! mi) mi = ttt;
                else mi = min(mi, ttt);
                m_f.push_back(mi);
                if(l_i != -1 && m_f[l_i] != 0) ans = min(ans, m_f[l_i] + ttt);
            }else{
                m_f.push_back(mi);
            }
        }
        if(ans == 2e9) return -1;
        else return ans;

    }
};
```