被坑了，这题的最后结果要的是最大值的余数，不是余数的最大值。
**以后要记住了，看到对 10^9 + 7 取余，二话不说直接定义long，再定义int的话我就是傻逼。**

这题思路上实际就是2个有序数组的合并，只能算easy。


### 代码

```cpp
class Solution {
public:
    int maxSum(vector<int>& nums1, vector<int>& nums2);
};

int Solution::maxSum(vector<int>& nums1, vector<int>& nums2)
{
    int n = nums1.size();
    int m = nums2.size();
    int i = 0,j = 0;
    long sum1 = 0;
    long sum2 = 0;
    long sum = 0;
    
    while(i<n && j<m)
    {
        if(nums1[i] > nums2[j])
        {
            sum1 += nums2[j];
            j++;
        }
        else if(nums1[i] < nums2[j])
        {
            sum2 += nums1[i];
            i++;
        }
        else
        {
            sum += max(sum1,sum2) + nums1[i];
            sum1 = 0;
            sum2 = 0;
            i++;
            j++;
        }
    }
    
    long sum3 = sum + sum2;
    long sum4 = sum + sum1;
    
    if(j == m)
    {
        while(i < n)
        {
            sum3 += nums1[i];
            i++;
        }
    }
    else
    {
        while(j < m)
        {
            sum4 += nums2[j];
            j++;
        }
    }
    sum = max(sum3,sum4);
    return sum % (1000000000 + 7);
}
```