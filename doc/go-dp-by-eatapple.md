### 解题思路
此处撰写解题思路

### 代码

```golang
func findIntegers(num int) int {
	var dp = make([]int, 32)
	dp[0], dp[1] = 1, 2
	for i := 2; i < len(dp); i++ {
		dp[i] = dp[i-1] + dp[i-2]
	}

	prevOne, breaked := false, false
	numLen := int(math.Log2(float64(num)))
	var k, ans int
	for k = numLen; k >= 0; k-- {
		n := 1 << k
		if num&n != 0 {
			ans += dp[k]
			if prevOne {
				breaked = true
				break
			}
		}
		prevOne = num&n != 0
	}
	if !breaked {
		ans++
	}
	return ans
}

```