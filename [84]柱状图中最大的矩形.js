//给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
//
// 求在该柱状图中，能够勾勒出来的矩形的最大面积。
//
//
//
//
//
// 以上是柱状图的示例，其中每个柱子的宽度为 1，给定的高度为 [2,1,5,6,2,3]。
//
//
//
//
//
// 图中阴影部分为所能勾勒出的最大矩形面积，其面积为 10 个单位。
//
//
//
// 示例:
//
// 输入: [2,1,5,6,2,3]
//输出: 10
// Related Topics 栈 数组


//leetcode submit region begin(Prohibit modification and deletion)
/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function(heights) {
    if (heights.length == 0) return 0
    if (heights.length == 1) return heights[0]
    let res = 0
    // for (let i = 0; i < heights.length; i++) {
    //     let h = heights[i]
    //     let l = i
    //     let r = i
    //     while (l >= 0 && heights[l-1] >= h) {
    //         l--
    //     }
    //     while (r < heights.length && heights[r+1] >= h) {
    //         r++
    //     }
    //     let w = r-l+1
    //     res = Math.max(res, w*h)
    // }
    heights.push(0)
    heights.unshift(0)
    let stack = [0]
    for (let i = 1; i < heights.length; i++) {
        while (stack.length && heights[i] < heights[stack[stack.length - 1]]) {
            let h = heights[stack.pop()]
            res = Math.max(res, h*(i-stack[stack.length-1]-1))
        }
        stack.push(i)
    }
    return res
}
//leetcode submit region end(Prohibit modification and deletion)
