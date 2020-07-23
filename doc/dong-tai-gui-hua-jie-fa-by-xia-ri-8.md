思路：
dp[i][0]：s2的第i个字符开始与s1的第1个字符比较，记录单次在s1的长度比较下，s2完结比较的次数
dp[i][1]：s2的第i个字符开始与s1的第1个字符比较，记录单次在s1的长度比较下，下一轮开始比较的s2的字符位置

s1在n1次长度中出现s2的次数sum的计算方式：
begin = 0,sum = 0;
for(int i = 0 ; i < n1; i++){
   sum += dp[begin][0];
   begin = dp[begin][1];
}

n1个s1出现n2个s2的次数为：sum/s2;

源代码
```
class Solution {
public:
    int getMaxRepetitions(string s1, int n1, string s2, int n2) {

        //动态规划，求s2,从第一个开始到第n个开始，分别能走多少圈，结尾是哪个
        int result = 0;

        if(n1 == 0 || n2 == 0){
            return result;
        }
        int s1Length = s1.size();
        int s2Length = s2.size();

       int dp[s2Length][2];//第i个字符开始和s1匹配，是s2能在单次s1的长度中出现的次数，以及下一次匹配s2开始的字符
       int begin,tmpResult;
       //计算dp的值
       for(int i = 0 ; i < s2Length; i++){
           begin = i,tmpResult = 0;
           for(int j = 0 ; j < s1Length; j++){
               if(s1[j] == s2[begin]){
                   begin++;
               }
               if(begin == s2Length){
                   begin = 0;
                   tmpResult++;
               }
           }
           dp[i][0] = tmpResult;
           dp[i][1] = begin;
       }

       result = 0;
       begin = 0;
       //计算s2出现的总次数
       for(int i = 0 ; i < n1; i++){
           result += dp[begin][0];
           begin = dp[begin][1];
       }
       result = result/n2;

        return result;

    }


};
```
