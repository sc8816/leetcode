 [image.png](https://pic.leetcode-cn.com/9d1352ea7ea38228050f6e37ba79d32f5811d34a92dfcb9a0f92fc24d387c3a3-image.png)

### 解题思路
类似最长递增子序列问题,leetcode里面有这类题型,这里就是O(N^2)的题解的变型,dp[i]表示以第i个字符结尾所能达到的最长字典序子序列,但是这里的针对对象不是单个字符串,而是多个字符串

### 代码

```java
class Solution {
   	public int minDeletionSize(String[] ss) {
		int[] dp = new int[ss[0].length()];
		int max = 0;
		Arrays.fill(dp, 1);
		for (int i = 1; i < dp.length; i++) {
			j:
			for (int j = 0; j < i; j++) {
				for (String s : ss) {
					if (s.charAt(i) < s.charAt(j)) {
						continue j;
					}
				}
				dp[i] = Math.max(dp[i], dp[j] + 1);
			}
			max = Math.max(max, dp[i]);
		}
		return dp.length - max;
	}
}
```