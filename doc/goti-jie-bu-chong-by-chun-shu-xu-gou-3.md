一维数组DP，dp[k]表示以第k列元素结尾的符合字典序排列的最多有多少列
举个例子：
[babca]
[bbazb]
dp[0]=1，因为A中所有字符串的第0列为:
[b]
[b]
符合字典序
dp[1]=1，因为此时有
[ba]
[bb]
不符合字典序
于是以第1列元素结尾的符合字典序排列的只有
[a]
[b]

这样对于每个dp[k]，暴力的往回搜索，找到符合条件的i（k列的所有元素都大于相应位置的i列的所有元素），然后更新mx值，暴力搜索完所有i，最大的mx值就是dp[k]

```golang
func minDeletionSize(A []string) int {
	dp:=make([]int,len(A[0]))
	dp[0]=1
	res:=1
	for k:=1;k<len(dp);k++{
		//暴力的方式往回搜索（某种意义上的贪心原则）
		//这里也许可以考虑使用优先队列（完全意义上的贪心原则），存储当前dp中最大的列下标，顺着列下标往回搜索
		mx:=1
		for j:=k-1;j>=0;j--{
			//对于明确了小于当前mx的dp列，可以直接忽略
			//这算是一种优化，但我觉得优先队列会更高效
			if dp[j]<=mx-1{
				continue
			}
			flag:=0
			for _,v:=range A{
				if v[k]<v[j]{
					flag=1
					break
				}
			}
			if flag==0&&1+dp[j]>mx{
				mx=1+dp[j]
			}
		}
		dp[k]=mx
		if mx>res{
			res=mx
		}
	}
	return len(A[0])-res
}
```
ps：在注释里提到的优先队列写法，我实现过了，效率反而不如当前这个，因为一方面测试用例不多，第二方面，维护一个优先队列需要开销
