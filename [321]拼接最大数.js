//给定长度分别为 m 和 n 的两个数组，其元素由 0-9 构成，表示两个自然数各位上的数字。现在从这两个数组中选出 k (k <= m + n) 个数字拼接
//成一个新的数，要求从同一个数组中取出的数字保持其在原数组中的相对顺序。
//
// 求满足该条件的最大数。结果返回一个表示该最大数的长度为 k 的数组。
//
// 说明: 请尽可能地优化你算法的时间和空间复杂度。
//
// 示例 1:
//
// 输入:
//nums1 = [3, 4, 6, 5]
//nums2 = [9, 1, 2, 5, 8, 3]
//k = 5
//输出:
//[9, 8, 6, 5, 3]
//
// 示例 2:
//
// 输入:
//nums1 = [6, 7]
//nums2 = [6, 0, 4]
//k = 5
//输出:
//[6, 7, 6, 0, 4]
//
// 示例 3:
//
// 输入:
//nums1 = [3, 9]
//nums2 = [8, 9]
//k = 3
//输出:
//[9, 8, 9]
// Related Topics 贪心算法 动态规划


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k
 * @return {number[]}
 */
var maxNumber = function(nums1, nums2, k) {
    let getMaxNum = (nums, k) => {
        if (k == 0) return []
        let ans = []
        let tmp = nums.length - k
        for (let num of nums) {
            while (ans.length > 0 && num > ans[ans.length - 1] && (tmp--) > 0) {
                ans.pop()
            }
            ans.push(num)
        }
        ans = ans.slice(0, k)
        return ans
    }
    let compare = (i, j, nums1, nums2) => {
        while (i < nums1.length && j < nums2.length && nums1[i] == nums2[j]) {
            i++;
            j++;
        }
        return j == nums2.length || (i < nums1.length && nums1[i] > nums2[j]);
    }
    let formatNum = (nums1, nums2) => {
        let t1 = 0
        let t2 = 0
        let l1 = nums1.length
        let l2 = nums2.length
        let ans = []
        if (l1 == 0 || l2 == 0) return nums1.concat(nums2)
        while (t1 < l1 && t2 < l2) {
            if (compare(t1, t2, nums1, nums2)) {
                ans.push(nums1[t1])
                t1++
            } else {
                ans.push(nums2[t2])
                t2++
            }
        }

        ans = ans.concat(nums2.slice(t2)).concat(nums1.slice(t1))
        return ans
    }

    let res = []
    let n1 = nums1.length
    let n2 = nums2.length
    for (let i = 0; i <= k; i++) {
        const k1 = k - i
        if (i > n1 || k1 > n2) continue
        let v1 = res.join('')
        // console.log(getMaxNum(nums1, i), getMaxNum(nums2, k1))
        let v2 = formatNum(getMaxNum(nums1, i), getMaxNum(nums2, k1)).join('')
        console.log(formatNum(getMaxNum(nums1, i), getMaxNum(nums2, k1)))
        if (v1 < v2) {
            res = formatNum(getMaxNum(nums1, i), getMaxNum(nums2, k1))
        }
    }
    return res
}
//leetcode submit region end(Prohibit modification and deletion)
