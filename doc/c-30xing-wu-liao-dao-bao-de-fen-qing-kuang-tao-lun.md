踩比赞多的题还是少做一点
```cpp
class Solution {
public:
    int numDecodings(string &s) {
        string ns = "#" + s;
        int n = s.size();
        if (!n) return 0;
        long long dp[n + 1] = {1}, MOD = 1e9 + 7;
        for (int i = 1; i <= n; ++i) {
            if (ns[i - 1] == '*') {
                if (ns[i] == '*') {
                    dp[i] = 9 * dp[i - 1] + 15 * dp[i - 2];
                } else if (ns[i] == '0') {
                    dp[i] = dp[i - 2] * 2;
                } else {
                    dp[i] = dp[i - 1] + dp[i - 2] + (ns[i] < '7' ? dp[i - 2] : 0);
                }
            } else if (ns[i] == '*') { // left is not *
                dp[i] = 9 * dp[i - 1];
                if (ns[i - 1] == '1') {
                    dp[i] += dp[i - 2] * 9;
                } else if (ns[i - 1] == '2') {
                    dp[i] += dp[i - 2] * 6;
                } 
            } else if (ns[i - 1] == '1' || ns[i - 1] == '2' && ns[i] <= '6') { // neither are *
                dp[i] = (ns[i] != '0' ? dp[i - 1] : 0) + dp[i - 2];
            } else {
                if (ns[i] == '0') return 0;
                dp[i] = dp[i - 1];
            }
            dp[i] %= MOD;
        }
        return dp[n];
    }
};
```