**解读题意**：


+ `S = [s, n]` 是一种题目规定的记号，即 `["abc", 3] = "abcabcabc"`。这一点应该不难明白，这里 `s` （小写）表示一个循环拼接的的字符串的最小单元，而大写的 `S` 表示循环拼接以后的字符串；
+ 从 `s2` 中删除某些字符使其变为 `s1`，则称字符串 `s1` 可以从字符串 `s2` 获得。**从什么什么获得，可以理解为是什么什么的「子序列」**，子序列的特点是「是子集」、「相对顺序不变」、「不一定连续」；
+ `S1 = [s1, n1]`，`S2 = [s2, n2]`，这里 `S1` 和 `S2` 都是有最小循环单元的循环字符串，题目让我们找出一个可以满足使 `[S2, M]` 从 `S1` 获得的最大整数 `M`，意思是：让 `S2` 继续循环起来，问最多可以循环几次，使得 `[S2, M]` 依然是 `S1` 的子序列。


注意：题目中的描述小写 `s` 和大写 `S` 要注意区分，否则会比较难理解题目意思，小写 `s` 表示是循环字符的生成单元。

**分析**：


以下三点很关键：

1. 我们先分析最小循环单元 `s1` 和 `s2`，**如果 `s2` 中存在 `s1` 没有出现的字符，那么不论 `S2` 循环几次，都不可能是 `S1` 的子序列，此时返回 `0`**；

说明：这一步其实可以作为特判，这里在代码实现的时候忽略。

2. 如果 `s2` 恰好是 `s1` 的子序列，例如题目给的示例：

```
输入：
s1 = "acb", n1 = 4
s2 = "ab", n2 = 2

返回：
2
```

由于一个 `s2` 一定会对应一个 `s1`，因此 `S2 = [s2, n2]` 最多可以循环的次数就是 `n1 / n2`（下取整）。  

 [image.png](https://pic.leetcode-cn.com/0af4c150fa2a09f687da2e9efe1ad538960c383569e9c2c3cfb779140e98c763-image.png)



3、最一般的情况是，`s2` 中出现的字符，一定在 `s1` 中出现，但是顺序是乱的。例如下面这种情况：

```java
public static void main(String[] args) {
    String s1 = "abcde";
    int n1 = 5;

    // abcde abcde abcde abcde abcde
    //   c   a   e   c   a   e

    String s2 = "cae";
    int n2 = 1;

    Solution solution = new Solution();
    int res = solution.getMaxRepetitions(s1, n1, s2, n2);
    System.out.println(res);
}
```

正是由于 `s2` 中出现的字符，一定在 `s1` 中出现，因此 `s1` 每循环出现一次，一定至少可以匹配 `s2` 中的一个字符。

因此，从直观上说：只要 `s1` 出现的次数够多，一定可以包含下 `S2` （注意这里是大写）。

### 方法一：暴力解法

思路：可以直接把 `S1` 和 `S2` 生成出来，可以使用双指针。

+ 看遍历完 `S1`（注意这里大写）以后，`s2`（注意这是小写）循环了几次，这里记为 `loopTimesOnS2`；
+ 由于题目问使得 `[S2, M]` 是 `S1` 的子序列的的最大整数 `M` 是多少，又由于 `S2 = [s2, n2]`（注意看清大小写），这个 `M` 就等于  `loopTimesOnS2 / n2`。

提示：先理解这个代码，才便于理解后面的优化算法。

**参考代码 1**：

```Java []
public class Solution {

    // 如果我们可以从 `s2` 中删除某些字符使其变为 `s1`，我们称字符串 `s1` 可以从字符串 `s2` 获得

    // 例如：`s1 = "abc"`，`s2 = "abdbec"`，即 s1 是 s2 的子序列（是子集、顺序要求一致、不必连续）
    // 大小写问题
    // S1 = acbacbacbacb
    // 题目问 S2 = abab
    // abababab
    // s1、s2、S1、S2

    public int getMaxRepetitions(String s1, int n1, String s2, int n2) {
        int len1 = s1.length();
        int len2 = s2.length();

        char[] charArray1 = s1.toCharArray();
        char[] charArray2 = s2.toCharArray();

        int index2 = 0;
        // s2 循环了几次
        int loopTimesOnS2 = 0;

        for (int i = 0; i < n1; i++) {
            for (int index1 = 0; index1 < len1; index1++) {
                if (charArray1[index1] == charArray2[index2]) {
                    index2++;

                    // 如果 index2 遍历到末尾，循环计数器加 1，index2 重置到开头
                    if (index2 == len2) {
                        index2 = 0;
                        loopTimesOnS2++;
                    }
                }
            }
        }
        return loopTimesOnS2 / n2;
    }

    public static void main(String[] args) {
        String s1 = "aceb";
        int n1 = 7;

        // aceb aceb aceb aceb aceb aceb aceb
        //    b   e  a  b   e  a  b   e  a  b ea

        // 因为顺序不同，会出现「交叉循环」的现象，只要 s1 足够长，一定可以把 s2 覆盖
        String s2 = "bea"; // 相当于给 s2 调整了一个顺序

        // 每一次一定可以找到一个

        int n2 = 1;

        Solution solution = new Solution();
        int res = solution.getMaxRepetitions(s1, n1, s2, n2);
        System.out.println(res);
    }
}
```


说明：

+ 我觉得这个问题理解到这里就可以了。后面的部分需要通过观察找到一些「循环」出现的东西，然后再用数学方法归纳性质；
+ 这里优化的解法还可能用到「倍增」的技巧，这是竞赛的内容，已经不在我能解释的范围内了。

「动态规划」方法的[题解](https://www.cnblogs.com/heisenberg-/p/6663587.html)，有空再研究。


### 方法二：观察出现循环的部分

+ 这里 [官方题解](https://leetcode-cn.com/problems/count-the-repetitions/solution/tong-ji-zhong-fu-ge-shu-by-leetcode-solution/) 的说法是：找出循环节。我尽力解释一下循环节的意思。这里需要参考几篇题解的图。

参考题解：


+ [找循环做优化，0ms 2MB 跑双百](https://leetcode-cn.com/problems/count-the-repetitions/solution/zhao-xun-huan-zuo-you-hua-0ms-2mb-pao-shuang-bai-b/)
+ [一看就能懂的计数法，有图有真相](https://leetcode-cn.com/problems/count-the-repetitions/solution/yi-kan-jiu-neng-dong-de-ji-shu-fa-you-tu-you-zhen-/)


请读者根据上面两篇题解的示意图理解以下事实：

+ 由于 `s2` 的字母出现的顺序在 `s1` 中是乱序的，因此在循环匹配的时候，会出现「交错匹配」的现象：

1. 本身 `s1` 和 `s2` 就是循环多次出现的；
2. 在上一轮 `s2` 还没匹配完，`s1` 又开始下一轮匹配的时候，只要 `s1` 和 `s2` 循环次数够多，一定会出现一种特殊的「循环现象」 ，官方题解解释为「抽屉原理」。我个人不是很明白，我是通过具体例子（还有上面两篇题解的图去）理解的。


说明：图片来自 [一看就能懂的计数法，有图有真相](https://leetcode-cn.com/problems/count-the-repetitions/solution/yi-kan-jiu-neng-dong-de-ji-shu-fa-you-tu-you-zhen-/)。



 [image.png](https://pic.leetcode-cn.com/39250e079d2bc2df930dd19e1f3930acaf4a6ee195a3de331754c0ad7efa696b-image.png)


例如下面的例子：`s2 = "bea"`，但是产生「循环现象」的字符串 `eab`（观察下面代码的注释），注意：**它是 `s2` 的一个「旋转字符数组」**。

+ 循环到 `aceb` 的时候，先找到 `e`，接着再下一轮找 `ab`，这样的过程是反复进行的。

```java
public static void main(String[] args) {
    String s1 = "aceb";
    int n1 = 7;

    // aceb aceb aceb aceb aceb aceb aceb
    //    b   e  a  b   e  a  b   e  a  b ea

    // 因为顺序不同，会出现「交叉循环」的现象，只要 s1 足够长，一定可以把 s2 覆盖
    String s2 = "bea"; // 相当于给 s2 调整了一个顺序

    // 每一次一定可以找到一个

    int n2 = 1;

    Solution solution = new Solution();
    int res = solution.getMaxRepetitions(s1, n1, s2, n2);
    System.out.println(res);
}
```


因此，在遍历的时候，我们就需要想办法观测出这种「循环现象」，这里需要引入两个变量，可以理解为「空间换时间」。

+ `next[i]` ：表示进行 `s1` 循环了 `i` 次以后（刚刚好在循环以后的那个时间点，`i` 从 `0` 开始），在 `s2` 上遍历到的下标（这里是上一次匹配完的下一个下标，注意结合代码理解）；
+ `times[i]`：表示进行 `s1` 循环了 `i` 次以后（刚刚好在循环以后的那个时间点，`i` 从 `0` 开始），在 `s2` 上已经循环了几次（依然是结合代码理解）；

什么时候观测到循环节呢？

+ 一定是在 `s1` 至少已经遍历完一次以后，因此 `i > 0`；
+ 当前 `index2` 指向的下标恰好等于，`s1` 第 1 次循环完成以后的下标，即 `next[0]`。

这个时候，发现了循环节，根据「循环交错」现象（注意看上面两篇题解的图），就可以直接计算整体的 `loopTimesOnS2`，来自三个部分：

+ 交错前面的部分；
+ 中间「循环节」出现的部分；
+ 交错后面的部分；


比较容易理解的代码是题解 [找循环做优化，0ms 2MB 跑双百](https://leetcode-cn.com/problems/count-the-repetitions/solution/zhao-xun-huan-zuo-you-hua-0ms-2mb-pao-shuang-bai-b/) 给出的代码，建议多看一看，很好理解。

在这一版代码的基础上，我结合了题解 [一个注释工](https://leetcode-cn.com/problems/count-the-repetitions/solution/yi-ge-zhu-shi-gong-by-yayakoblessing/) 做了一些修改。

**参考代码 2**：

理解下面的代码需要结合上面两篇题解的图，和变量的准确含义，并且考虑到加 1 和 减 1 的边界条件。


```Java []
public class Solution4 {

    public int getMaxRepetitions(String s1, int n1, String s2, int n2) {

        int len1 = s1.length();
        int len2 = s2.length();
        // 特判
        if (len1 == 0 || len2 == 0 || n1 == 0 || n2 == 0) {
            return 0;
        }
        char[] chars1 = s1.toCharArray();
        char[] chars2 = s2.toCharArray();

        // 记录下一个要匹配的 s2 中字符的下标
        int index2 = 0;

        // 记录 s2 循环的次数，loopTimesOnS2 是 index2 的函数
        int loopTimesOnS2 = 0;

        // 当 s1 循环了 i 次以后，s2 循环了几次
        int[] times = new int[n1];
        // 当 s1 循环了 i 次以后，s2 下一个字符匹配的下标（上一个字符匹配完以后 index2++，所以这里是下一个）
        int[] next = new int[n1];

        // 暴力解法的优化，一边遍历，一边找循环节，找到就直接计算出结果
        for (int i = 0; i < n1; i++) {

            // 指针 index1 在 s1 上循环游走
            for (int index1 = 0; index1 < len1; index1++) {

                // 如果匹配到 s2 中字符的字符
                if (chars1[index1] == chars2[index2]) {
                    index2++;
                }

                // 匹配完一个 s2，计数器 + 1，重置 s2 下标
                if (index2 == len2) {
                    // 循环扫描，因此 index2 重置为 0
                    index2 = 0;
                    loopTimesOnS2++;
                }
            }

            // 记录了 s1 遍历了 i 次（从 0 开始）以后，s2 已经完整地遍历了多少次
            times[i] = loopTimesOnS2;
            // 记录了 s1 遍历了 i 次（从 0 开始）以后，s2 上 index2 的位置（由于匹配完成以后执行了 index2++ ，此时 index2 指向下一个要匹配的字符）
            next[i] = index2;

            // 循环节一定是在：s1 至少循环了一次以后
            // s2 即将匹配的字符的下标恰好等于 s1 刚刚循环完一次以后 s2 即将要匹配的下标，就是 index2 == next[0] 这行代码的含义

            // 下面的代码如果不好理解的话，一定要结合 next、times、i、n1 的定义

            if (i > 0 && index2 == next[0]) {
                // 说明出现了循环节，直接计算结果，来自 3 个部分
                // 第 1 部分：开头
                int headCount = times[0];

                // 第 2 部分：中间循环部分
                // 这里难理解的话，一定要结合定义，看图理解，
                // (n1 - 1)，要减去 1 个，因为从 s1 已经循环了一次开始，才出现的循环节
                // (n1 - 1) / i 表示剩下的部分有多少个红色大括号段（见图）
                // times[i] - times[0] 表示：每个循环节里出现了几个 s2
                // ((n1 - 1) / i) * (times[i] - times[0]) 就表示中间那部分里面 s2 出现的次数
                int circulateCount = ((n1 - 1) / i) * (times[i] - times[0]);

                // 第 3 部分：结尾部分
                // (n1 - 1) % i 相对于 (n1 - 1) / i 而言，就是不能整除的部分
                // 减去 times[0] 是因为计算 times[i] 的时候计算的是前缀和，headCount 这部分已经计算过了，要把它删掉（写成两部分的和也可以）
                int endCount = times[(n1 - 1) % i] - times[0];

                // 总结：一下子计算出 loopTimesOnS2，是这个解法优化的地方
                return (headCount + circulateCount + endCount) / n2;
            }
        }
        // 走到这里，没有发现循环节，依据定义计算，n1 - 1 是最后一次遍历 s1 的下标
        return times[n1 - 1] / n2;
    }


    public static void main(String[] args) {
        String s1 = "abcde";
        int n1 = 5;

        // abcde abcde abcde abcde abcde
        //   c   a   e   c   a   e

        String s2 = "cae";
        int n2 = 1;

        Solution solution = new Solution();
        int res = solution.getMaxRepetitions(s1, n1, s2, n2);
        System.out.println(res);
    }
}
```



