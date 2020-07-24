### 解题思路


### 代码
```java []
class Solution {
    public int subarrayBitwiseORs(int[] arr) {
        Set<Integer> set = new HashSet<>();
        for (int i = 0; i < arr.length; i++) {
            set.add(arr[i]);
            for (int j = i - 1; j >= 0; j--) {
                if ((arr[i] | arr[j]) == arr[j]) {
                    // arr[j]的置位位置包含了arr[i]的置位位置，
                    // 那么已经无需考虑arr[i]的加入与否
                    break;
                }
                // 求值的同时保留积累状态
                arr[j] |= arr[i];
                set.add(arr[j]);
            }
        }
        return set.size();
    }
}
```

```golang []
func subarrayBitwiseORs(arr []int) int {
	set := map[int]int{}
	for i, x := range arr[:] {
		set[x] = 0
		for j := i-1; j >= 0; j-- {
			if (x | arr[j]) == arr[j] {
				break
			}
			arr[j] |= x
			set[arr[j]] = 0
		}
	}
	return len(set)
}
```