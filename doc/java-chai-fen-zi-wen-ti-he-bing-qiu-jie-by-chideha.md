大致思路：
- 假设最终结果有count个数（介于0～k之间）字在nums1中，那么有（k-count）个数字在nums2中，最外层循环遍历0到count的情况。不一定从0开始，若nums2个数不足k个，则从（k-nums2.length）开始。同样，不一定在count结束，若nums1个数不足k个，则在nums1.length结束。
- 分别从nums1、nums2取最大子序列。可以借助栈来获取最大子序列，注意只有当数组剩余元素多余栈中剩余空间时，才能将栈中较小的元素出栈。
- 合并两个子序列组成一个序列。可以借助双指针从头递进比较序列元素大小，注意比较时不能仅比较当前索引出元素，需按大数比较。
- 比较合并后序列的大小是否大于已缓存的答案序列的大小，取大的作为答案序列。

```
class Solution {
    public int[] maxNumber(int[] nums1, int[] nums2, int k) {
        int m = nums1.length;
        int n = nums2.length;
        int[] ans = new int[k];
        int len = Math.min(k, m);
        for (int i=Math.max(0, k-n); i<=len; i++) {
            int[] sub1 = maxKArray(nums1, i);
            int[] sub2 = maxKArray(nums2, k-i);
            int[] array = combineArray(sub1, sub2, k);
            for (int j=0; j<k; j++) {
                if (array[j] == ans[j]) continue;
                if (array[j] > ans[j])  ans = array;
                break;
            }
        }
        return ans;
    }
    
    public int[] maxKArray(int[] nums, int k) {
        if (k == 0) return new int[0];
        
        int[] res = new int[k];
        int cursor = -1;
        for (int i=0; i<nums.length; i++) {
            while (cursor>=0 && nums[i]>res[cursor] && nums.length-i>k-cursor-1) {
                cursor--;
            }
            if (cursor < k-1)
                res[++cursor] = nums[i];
        }
        return res;
    }
    
    public int[] combineArray(int[] nums1, int[] nums2, int k) {
        int[] res = new int[k];
        int i = 0;
        int i1 = 0;
        int i2 = 0;
        while (i1 < nums1.length && i2 < nums2.length)
            res[i++] = deepCompare(nums1, nums2, i1, i2)? nums1[i1++] : nums2[i2++];
        while (i1 < nums1.length)
            res[i++] = nums1[i1++];
        while (i2 < nums2.length)
            res[i++] = nums2[i2++];
        return res;
    }

    public boolean deepCompare(int[] nums1, int[] nums2, int i1, int i2) {
        while (i1 < nums1.length && i2 < nums2.length) {
            if (nums1[i1] == nums2[i2]) {
                i1++;
                i2++;
                continue;
            }
            return nums1[i1] > nums2[i2];
        }
        return i1 < nums1.length;
    }
}


```
