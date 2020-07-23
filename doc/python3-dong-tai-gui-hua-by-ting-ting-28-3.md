### 解题思路
和139题单词拆分思路一样。

### 代码

```python3
class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> List[str]:
        tmp = set("".join(wordDict))
        if any([i not in tmp for i in s]):
            return []
        dp = [[""], [s[0]]*(s[0] in wordDict)]
        for i in range(1, len(s)):
            dp.append(sum([[f"{k} {s[j: i+1]}" if k else s[j: i+1] for k in dp[j]] for j in range(i+1) if s[j: i+1] in wordDict and dp[j]], []))
        return dp[-1]
```