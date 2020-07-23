#### 解题思路
先读懂题目
关于**字符串 A 从 B 获得** ：

> 如果我们可以从字符串 B 中删除某些字符使其变为 A，则称字符串 A 可以从字符串 B 获得。
> 例如，根据定义，`"abc"` 可以从 `“abdbec”` 获得，但不能从` “acbbe”` 获得。 

关于字符串的**生成规则**（Repeat）：

> 将 n 个字符串 s 连接在一起组成字符串 R，记作`R = [s,n]`。
> 例如，`R ["abc",3]=“abcabcabc”`。

最后是**题目要求**：

> 现在给你两个非空字符串  Sa 和 Sb（每个最多 100 个字符长）和两个整数 0 ≤ Na ≤ 10⁶ 和 1 ≤ Nb ≤ 10⁶。
> 现在考虑字符串 Ra 和 Rb，其中 `Ra=[Sa,Na]` 、`Rb=[Sb,Nb]` 。
> 现在我们希望构造一个字符串 `Rc=[Rb, M]` ，同时又要保证 Rc 能够从 Ra 获得。
> 请你找出 M 最大取值是多少 。



以题目样例来说： 

> `Ra = ["acb", 4]` ，其实就是 `Sa = "acb", Ra = "acbacbacbacb", Na = 4`；
> 而 `Rb = ["ab", 2]`，其实就是 `Sb = "ab", Rb = "abab", Nb = 2`；
> Rb 重复 M 次后，仍然能够 **从 Ra 中获得**，求 M 的**最大取值**。
> 可以看到 `"abab"` 最多重复 2 次，超过就无法从 `"acbacbacbacb"` 中获得了。

这样拆分重组之后，应该能比之前容易读懂一点了。



#### 寻找循环段落

这题其实思路也蛮简单的，其实就是尽可能的找出循环来减少遍历的次数。

我们以官方题解的示例数据为例：

> Ra = ["abaacdbac", 100]   
> Rb = ["adcbd", 4]


 [image.png](https://pic.leetcode-cn.com/260a3685a9e5496adf6096c3c63fb3284a1403daff76e6d9156f4c298ab00b89-image.png)


先画简单的图来示意一下，能够注意到的是，似乎在开头这部分，并没有出现循环。

那么我们再多来几段试试看：

 [image.png](https://pic.leetcode-cn.com/d6fd9a49f2c453ae3b63da0e4d6f6d35c42b84c64b66f4646ea223b47b8315d1-image.png)


从图中可以看到，随着 Rb 的不断重复，首字母 a 的位置变的稳定了起来，看起来也比较有规律了，但是好像和 Rb 对的不是很齐的样子，不太好算啊。

这时我们可以换另一个思路来『上色』，按下面这种黄绿的方式来分组。

 [image.png](https://pic.leetcode-cn.com/711121a82d6424271c92ca647354741dfa3cd578a13c228b34113fdc25810195-image.png)


先抛开前面的 `adc` 三个字母不管，我们以两个 Sa 为一组来看，循环的部分就规整了很多。

 [image.png](https://pic.leetcode-cn.com/3b30962f225ea3b1a1cdce939a11c19da05fc579a47c5d4a40661e6907c5bc95-image.png)


如上图所示，前面有前导的 `abc` 三个字母占了点位置，末尾有我也不知道是什么样子的结尾部分；

但是可以肯定的是，中间的部分肯定是 `bdadc` 的不断循环，同时每个循环占用了 2 个 Sa 的长度。



接下来的工作，就是把这些循环的部分优化掉了。

其实根据上图我们可以看到，当我们遍历到第一次出现循环的时候，计算出有多少个循环，直接跳到 End 的位置做收尾工作就好了。

 [image.png](https://pic.leetcode-cn.com/611fd0ff5db9b752554bd0253316a6e4613ac07279c4fab2f02415f6543931b7-image.png)


#### 解答

基本上按照上面的思路按部就班的写代码就好了，计算的时候稍微留意一下 Rb 的下标还在自增。

```Go []
func getMaxRepetitions(s1 string, n1 int, s2 string, n2 int) int {
	len1, len2 := len(s1), len(s2)
	index1, index2 := 0, 0 // 注意此处直接使用 Ra Rb 的下标，不取模

	if len1 == 0 || len2 == 0 || len1*n1 < len2*n2 {
		return 0
	}

	map1, map2 := make(map[int]int), make(map[int]int)
	ans := 0 // 注意，此处存储的是 Ra 中 Sb 的个数，而非 Ra 中 Rb 的个数

	for index1/len1 < n1 { // 遍历整个 Ra
		if index1%len1 == len1-1 { //在 Sa 末尾
			if val, ok := map1[index2%len2]; ok { // 出现了循环，进行快进
				cycleLen := index1/len1 - val/len1                 // 每个循环占多少个 Sa
				cycleNum := (n1 - 1 - index1/len1) / cycleLen      // 还有多少个循环
				cycleS2Num := index2/len2 - map2[index2%len2]/len2 // 每个循环含有多少个 Sb

				index1 += cycleNum * cycleLen * len1 // 将 Ra 快进到相应的位置
				ans += cycleNum * cycleS2Num         // 把快进部分的答案数量加上
			} else { // 第一次，注意存储的是未取模的
				map1[index2%len2] = index1
				map2[index2%len2] = index2
			}

		}

		if s1[index1%len1] == s2[index2%len2] {
			if index2%len2 == len2-1 {
				ans += 1
			}
			index2 += 1
		}
		index1 += 1
	}
	return ans / n2
}
```



0ms 2MB ，性能还不错。

 [image.png](https://pic.leetcode-cn.com/b56151d719f626d9dfbdb1d161f889865c27b8c541ce5a0cb364e7530ad4cc87-image.png)
