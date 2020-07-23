```
class Solution {
    int[][] dp;
    public int findIntegers(int num) {
        char[] ch = Integer.toBinaryString(num).toCharArray();
        dp = new int[ch.length][2];
        return dfs(0, true, 0, ch);
    }

    public int dfs(int index, boolean flag, int prev, char[] ch) {
        if(index == ch.length) 
            return 1;
        if(!flag && dp[index][prev] != 0)
            return dp[index][prev];
        
        int res = 0;
        int r = flag ? ch[index] - '0' : 1;
        for(int i = 0; i <= r; i++)
        {
            if(prev == 1 && i == 1)
                continue;
            res += dfs(index + 1, (ch[index] - '0') == i && flag, i, ch);
        }
        if(!flag)
            dp[index][prev] = res;
        return res;
    }
}
```
