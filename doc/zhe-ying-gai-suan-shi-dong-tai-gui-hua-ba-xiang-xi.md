### 解题思路
 [image.png](https://pic.leetcode-cn.com/3c7374a0766b914d9265b37b8dd6cb79a89f19c3e7d00fcff0759eb221b456cb-image.png)

恐怖的耗时

1.设： sum[x][y] = sum{matrix[x][0], matrix[x][1],...,natrix[x][y-1]};
2.取： line[x] = sum[x][y2] - sum[x][y1];
3.那么x1,y1,x2,y2矩阵和为： sum{ line[x1],line[x1+1],...,line[x2] };
4.取： lineSum[x] = sum{line[0],line[1],...,line[x-1]};
5.最终，该问题转化为求： lineSum[] 中, lineSum[x2] - lineSum[x1] = target的个数（x2>x1）;

注：其中y2对应到代码的endY, y1对应到代码的startY

### 代码

```java
class Solution {
    public int numSubmatrixSumTarget(int[][] matrix, int target) {
        int[][] sum = new int[matrix.length][matrix[0].length+1];
        for(int i = 0; i < matrix.length; ++i){
            for(int j = 0; j < matrix[0].length; ++j){
                sum[i][j+1] = sum[i][j] + matrix[i][j];
            }
        }

        int ans = 0;
        int startY = 0, endY = 1;
        int[] lineSum = new int[sum.length+1];
        while(endY < sum[0].length){
            for(; startY < endY; ++startY){
                for(int i = 1; i < lineSum.length; ++i){
                    lineSum[i] = lineSum[i-1] + sum[i-1][endY] - sum[i-1][startY];
                }
                for(int i = 0; i < lineSum.length - 1; ++i){
                    for(int j = i+1; j < lineSum.length; ++j)
                        if(lineSum[j] - lineSum[i] == target)
                            ++ans;
                }
            }
            ++endY;
            startY = 0;
        }
        return ans;
    }
}
```