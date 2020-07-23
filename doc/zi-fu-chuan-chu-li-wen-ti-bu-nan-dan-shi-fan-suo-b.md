输入：x+5-3+x=6-x-2+3x
1、将-替换为+-
替换之后为：x+5+-3+x=6+-x+-2+3x
2、将x替换为1x（只替换没有数字前缀的x）
替换之后为：1x+5+-3+1x=6+-1x+-2+3x
3、使用=号分割字符串
分割之后：
左边：1x+5+-3+1x
右边：6+-1x+-2+3x
4、对分割后的字符串使用+再做分割（注意要用正则表达式\\+）
分割之后：
左边：1x 5 -3 1x
右边：6 -1x -2 3x
5、两个List分别把x的系数和常数的系数加进去，注意左右处理区别
6、分别计算和之后，输出，注意判断特殊情况，无解和无限解的情况

上代码：
```
public String solveEquation(String equation) {
        //System.out.println(equation);
        StringBuffer buffer = new StringBuffer();
        for (int i = 0; i < equation.length(); i++) {
            if (equation.charAt(i) == 'x') {
                if (i == 0) {
                    buffer.append(1);
                } else if (!isNumber(equation.charAt(i - 1))) {
                    buffer.append(1);
                }
            }
            buffer.append(equation.charAt(i));
        }
        //System.out.println(buffer.toString());
        String toResolveStr = buffer.toString().replace("-", "+-");
        //System.out.println(toResolveStr);
        String[] input = toResolveStr.split("=");
        List<Integer> varible = new ArrayList<>();
        List<Integer> constant = new ArrayList<>();
        for (String left : input[0].split("\\+")) {
            if (left.contains("x")) {
                varible.add(Integer.parseInt(left.substring(0, left.length() - 1)));
            } else {
                if (left != null && !left.equals("")) {
                    //System.out.println("left="+left);
                    constant.add(Integer.parseInt(left) * (-1));
                }
            }
        }
        for (String right : input[1].split("\\+")) {
            if (right.contains("x")) {
                varible.add(Integer.parseInt(right.substring(0, right.length() - 1)) * (-1));
            } else {
                if (right != null && !right.equals("")) {
                    constant.add(Integer.parseInt(right));
                }
            }
        }
        int sumVarible = 0;
        int sumConstant = 0;
        for (int i : varible) {
            sumVarible = sumVarible + i;
        }
        for (int i : constant) {
            sumConstant = sumConstant + i;
        }
        // System.out.println("sumV:"+sumVarible+",sumC:"+sumConstant);
        if (sumVarible == 0 && sumConstant == 0) {
            return "Infinite solutions";
        }
        if (sumVarible == 0) {
            return "No solution";
        }
        double result = sumConstant / sumVarible;
        return "x=" + (int) result;
    }

    private boolean isNumber(char ch) {
        if (ch - '0' >= 0 && ch - '0' <= 9) {
            return true;
        }
        return false;
    }
```
