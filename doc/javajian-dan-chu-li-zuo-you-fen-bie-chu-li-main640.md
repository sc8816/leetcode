### 解题思路
java简单处理，左右分别处理。

### 代码

```java
class Solution {
    public String solveEquation(String equation) { 
        String ret = null;
        try {
            String[] split = equation.split("=");
            String left = split[0];
            String right = split[1];
            int[] leftRet = splitVar(left);
            int[] rightRet = splitVar(right);
            int xNum = leftRet[0] - rightRet[0];
            int constNum = rightRet[1] - leftRet[1];
            if (xNum != 0) {
                return "x=" + constNum / xNum;
            }
            if (constNum == 0) {
                return "Infinite solutions";
            }
            return "No solution";
        } catch (Exception ex) {
            ret =  "No solution";
        }
        return ret;
    }

    int[] splitVar(String str) {
        String[] split = str.replace("-", "+-").split("\\+");
        int sumX = 0;
        int sumS = 0;
        for (int i = 0; i < split.length; i++) {
            if (split[i].equals("x")) {
                sumX++;
            } else if (split[i].equals("-x")) {
                sumX--;
            } else if (split[i].contains("x")) {
                sumX += Integer.valueOf(split[i].substring(0, split[i].length() - 1));
            } else if (!split[i].equals("")) {
                sumS += Integer.valueOf(split[i]);
            } else {
                continue;
            }
        }
        return new int[]{sumX, sumS};
    }
}
```