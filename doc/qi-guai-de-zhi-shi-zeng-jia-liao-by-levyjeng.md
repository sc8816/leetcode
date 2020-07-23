### 解题思路
完全没把握,就交了,结果对了

### 代码

```java
class Solution {
   	public int findMinMoves(int[] nums) {

		int sum = 0;
		int max = 0;
		int temp = 0;
		boolean pos = true;
		for (int x : nums) {
			sum += x;
		}
		if (sum % nums.length == 0) {
			sum /= nums.length;
		} else {
			return -1;
		}

		for (int i = 0; i < nums.length; i++) {
			nums[i] -= sum;
		}
		for (int x : nums) {
			temp += x;
			max = Math.max(temp, max);
			max = Math.max(-temp, max);
		}

		return max;
	}
}
```