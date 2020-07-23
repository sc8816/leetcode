### 解题思路
一、分析问题， 假设我们能知道从数组1中取x个数， 从数组2中取y个数， 我们就可以直接拼接这两个数组，得到所组成的最大数；
二、问题就被分解成2个部分：1、如果我们需要从数组中取x个数，怎么取才能让取到的x个数组成最大的数；2、对两个确定的数组，怎么组合成一个最大的数，这个问题比较简单，不过要注意数值相等时的情况.
三、对于分解出来的问题1：如果我们需要从数组中取x个数，怎么取才能让取到的x个数组成最大的数
我们采用贪心算法进行求解，令f(i) 表示取i个数时， 这些数字的下标组成的列表，首位再加上-1和length的边界，
f(0) = [-1, length]
f(1) = [-1, index(max), length]
f(2)怎么求呢，在f(1)的基础上，我们先看 index(max)到length 这个区间还有数字没，有则取这个区间中的最大的数，并将坐标插入index(max)之后， 若没有， 我们再看 -1 到 index(max) 这个区间还有数字没， 有则取这个区间中的最大的数， 并将坐标插入-1 之后；
使用同样的递推方式， 我们就可以通过f(i-1) 来 计算 f (i)

### 代码

```python
class Solution(object):
    def maxNumber(self, nums1, nums2, k):
        """
        :type nums1: List[int]
        :type nums2: List[int]
        :type k: int
        :rtype: List[int]
        """
        length1 = len(nums1)
        length2 = len(nums2)
        n1_max_select_cnt = min(length1, k) # 从num1中最多能取多少个数
        n2_max_select_cnt = min(length2, k) # 从num2中最多能取多少个数
        n1_select_list = self.maxKNumber(nums1, n1_max_select_cnt) 
        n2_select_list = self.maxKNumber(nums2, n2_max_select_cnt)
        
        max_number = 0
        res = []
        #迭代计算从num1中取0到n1_max_select_cnt个数时，能组成的最大数
        for i in range(n1_max_select_cnt + 1):
            if k - i > n2_max_select_cnt:
                continue
            cur,l = self.concatNumber(n1_select_list[i], n2_select_list[k - i])
            if cur > max_number:
                max_number = cur
                res = l
        return res        
    
    #拼接两个数组，形成最大的数    
    def concatNumber(self, nums1, nums2):
        length1 = len(nums1)
        length2 = len(nums2)
        i, j = 0, 0
        num = 0
        l = []
        while i < length1 and j < length2:
            if nums1[i] > nums2[j]:
                num = num * 10 + nums1[i]
                l.append(nums1[i])
                i += 1
            elif nums1[i] < nums2[j]:
                num = num * 10 + nums2[j]
                l.append(nums2[j])
                j += 1
            else:# 当前两个数相等时，要迭代考虑其后面的数的大小情况 ，在这里WA了好多次
                i1 = i + 1
                j1 = j + 1
                while i1 < length1 and j1 < length2 and nums1[i1] == nums2[j1]:
                    i1 += 1
                    j1 += 1
                if i1 < length1 and j1 < length2:
                    if nums1[i1] > nums2[j1]:
                        num = num * 10 + nums1[i]
                        l.append(nums1[i])
                        i += 1
                    else:
                        num = num * 10 + nums2[j]
                        l.append(nums2[j])
                        j += 1
                elif i1 == length1:
                    num = num * 10 + nums2[j]
                    l.append(nums2[j])
                    j += 1
                else:
                    num = num * 10 + nums1[i]
                    l.append(nums1[i])
                    i += 1
        while i < length1:
            num = num * 10 + nums1[i]
            l.append(nums1[i])
            i += 1
        while j < length2:
            num = num * 10 + nums2[j]
            l.append(nums2[j])
            j += 1
        return num, l
    
    #返回从数组中选取1，2，...，k个数，需要选取的最大的数组， 返回值为二维数组
    def maxKNumber(self, num, k):
        length = len(num)
        str_num = ''.join(str(i) for i in num)
        t = [[] for i in range(k + 1)] # t(i) 表示取i个数时，这些数字的下标组成的列表，首尾再加上-1和length的边界
        t[0] = [-1, length] # 初始值
        for i in range(1, k + 1):
            j = len(t[i - 1]) - 2
            while j >= 0:
                if t[i - 1][j + 1] - t[i - 1][j] > 1: # 从后向前找区间
                    select_num = max(num[t[i - 1][j] + 1: t[i - 1][j + 1]]) #区间最大数
                    select_num_index = t[i - 1][j] + 1 + str_num[t[i - 1][j] + 1: t[i - 1][j + 1]].find(str(select_num)) # 区间最大数的下表
                    t[i] = [x for x in t[i - 1]] 
                    t[i].insert(j + 1, select_num_index) # 更新t[i]
                    break
                else:
                    j -= 1
        res = [t[i][1:-1] for i in range(k + 1)] #res 去掉t的首尾边界，并将值转化为数组值
        for i in range(k + 1):
            for j in range(len(res[i])):
                res[i][j] = num[res[i][j]]
        return res
```