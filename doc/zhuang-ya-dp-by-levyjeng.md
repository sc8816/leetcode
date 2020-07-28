### 解题思路

### 代码

```java
class Solution {
   int[][] memo;
	int[][] from;
	String[] ss;

	int merge(String s1, String s2) {
		for (int i = Math.max(0, s1.length() - s2.length()); i < s1.length(); i++) {

			int j = i;
			int k = 0;
			while (s1.charAt(j) == s2.charAt(k)) {
				j++;
				k++;
				if (j == s1.length()) {
					return s2.length() - k;
				}
			}
		}
		return s2.length();
	}

	int dp(int i, int j) {
		if (memo[i][j] != 0) {
			return memo[i][j];
		}
		int temp_j = j - (1 << i);
		int min = 99999;
		for (int k = 0; k < memo.length; k++) {
			if (((1 << k) & temp_j) != 0) {
				min = Math.min(min, merge(ss[k], ss[i]) + dp(k, temp_j));
				if (min == merge(ss[k], ss[i]) + dp(k, temp_j)) {
					from[i][j] = k;
				}
			}
		}
		memo[i][j] = min;
		return min;

	}

	public String shortestSuperstring(String[] ss) {

		int len = ss.length;
		this.ss = ss;
		int[][] dp = new int[len][1 << len];
		int[][] from = new int[len][1 << len];
		this.from = from;
		memo = dp;
		for (int i = 0; i < len; i++) {
			dp[i][1 << i] = ss[i].length();
			from[i][1 << i] = -1;

		}
		String ans = "";
		int pos = -1;
		int temp = 9999;
		for (int i = 0; i < len; i++) {
			dp[i][(1 << len) - 1] = dp(i, (1 << len) - 1);
			if (dp[i][(1 << len) - 1] < temp) {
				pos = i;
				temp = dp[i][(1 << len) - 1];
			}
		}
		temp = (1 << len) - 1;
		while (true) {
			int last = from[pos][temp];
			if (last == -1) {
				ans=ss[pos]+ans;
				break;
			}
			int dis = dp[pos][temp] - dp[last][temp - (1 << pos)];
			ans = ss[pos].substring(ss[pos].length() - dis) + ans;
			temp -= (1 << pos);
			pos = last;
		}


		return ans;
	}
}
```