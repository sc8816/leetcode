### 这里给出两种常见解法

- 对于这道题, 一个非常常见的解法是排序后贪心, 大家可以参考这题[POJ-2376](https://vjudge.net/problem/POJ-2376), 做法基本就是一样的. 它的思路很简单: 按照先左端点后右端点的排序规则之后, 尽量的向后贪心(当然与前面的有交叉). 时间复杂度是: 排序O(N * logN) + 贪心O(N).

```
class Solution {
public:
    static const int N = 1e2 + 5;
    int len;
    // 贪心
    struct Node {
        int start, end;
        bool operator<(const Node &rhs) const {
            if (start == rhs.start) return end < rhs.end;
            return start < rhs.start;
        }
    }A[N];

    int videoStitching(vector<vector<int>>& clips, int T) {
        for (int i = 0; i < clips.size(); ++i) {
            A[i + 1].start = clips[i][0];
            A[i + 1].end = clips[i][1];
        }
        len = clips.size();
        std::sort(A + 1, A + 1 + len);
        int R = 0, tmp_R = 0, cnt = 0;
        for (int i = 1; i <= len; ++i) {
            if (A[i].start <= R) {
                tmp_R = std::max(tmp_R, A[i].end);
            } else {
                if (A[i].start > tmp_R) break;
                ++cnt;
                R = tmp_R;
                --i;
            }
            if (R >= T) break;
        }
        // 考虑结尾处
        if (tmp_R > R) ++cnt, R = tmp_R;
        if (R >= T) return cnt;
        else return -1;
    }
};
```

- 第二种少见的做法是dp(因为复杂度较高大家都写第一种, 所以少见), 但是在数据范围可以过的前提下, dp写起来更简单, 代码也更短. 看到时间序列, 很容易想到, 定义dp[i]为覆盖前i个时间段, 所需要的最少的数目. 转移也很常见, 枚举每个可能的片段. 时间复杂度O(N ^ 2)

```
class Solution {
public:
    static const int N = 1e2 + 5;
    // dp[i]表示覆盖[0, i]这个片段过称, 最少需要的数目
    int dp[N];

    int videoStitching(vector<vector<int>>& clips, int T) {
        std::memset(dp, 0x3f3f3f3f, sizeof dp);
        // 递推的起点
        dp[0] = 0;
        for (int i = 1; i <= T; ++i) {
            // 转移, 枚举每一种可能的情况
            for (int k = 0; k < clips.size(); ++k) {
                if (clips[k][0] <= i && clips[k][1] >= i)
                    dp[i] = std::min(dp[i], dp[clips[k][0]] + 1);
            }
        }
        if (dp[T] >= 1e9) return -1;
        else return dp[T];
    }
};
```

- 多说一点, 这类dp非常常见, 类似的如以前i个物品的最大值, 前i个元素且以第i个元素结尾的最大值, 等等..., 其实都是一样的, 通过多刷题, 多思考, 多总结, 这类dp的解法都是非常显然的. 

- 还有为什么有人觉得很多题(不单指这道题)非常简单, 是他们口中的傻逼题, 套路题. 因为对于绝大部分的编程高手来说, 他们都见过/写过类似的题目上十上百遍了. 

- 还有为什么大家常说量变引起质变, 因为对于绝大部分非天才选手来说, 如果不能做到举一反三, 那么做到举三反一, 举十反一, 也是可以成长为非常非常牛逼的编程高手.

- 最后说一点题外话, 绝大部分的编程高手都不会怎么详细写题解, 因为写出一篇详细的题解所需要耗的时间通常是解出一道题的4, 5倍或许还要多的时间, 所以绝大部分他们都不愿意花费这些时间(~~有这时间还不如多刷几道题呢~~), 所以如果大家看到好的题解尽量点赞捧场, 算是给予写详细题解人的激励吧, 或许这样更多的编程高手愿意分享他们的解法, 思路, 心得等. (ps本人并不是什么编程高手, 纯属有感而发)

- ~~最后, 不要脸的打个自己github上的广告, 欢迎star, 感谢捧场lol~~.
[Algorithm-challenger](https://github.com/OFShare/Algorithm-challenger)
[经典的几道贪心题](https://github.com/OFShare/Algorithm-challenger/blob/master/%E8%B4%AA%E5%BF%83/README.md)
[dp专题系统学习, 难度基本从易到难再到易](https://github.com/OFShare/Algorithm-challenger/blob/master/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92/README.md), 里面dp题的难度可能并非严格从易到难的, 后续可能会按难度重新排序一下, 或者按照各类dp, 如区间dp, 数位dp这些分一下类, 但是看的人以及反馈的人实属太少了, 没有什么更新的动力, 所以一直被搁浅了. 但我一直是想做好这件事的哈哈哈lol