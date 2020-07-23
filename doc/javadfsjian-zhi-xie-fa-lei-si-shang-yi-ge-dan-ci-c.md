上一题官方题解[单词拆分--官方解答](https://leetcode-cn.com/problems/word-break/solution/dan-ci-chai-fen-by-leetcode/)

**主要的不同点**：
上一题"单词拆分"的官方题解，方法2记忆化回溯，用`Boolean[] memo`的`meno[start]`来标识用start作为起始下标的子串能否在接下去的DFS递归调用中完成原字符串的完全匹配。
而我这里用`boolean[] cantBreak`的`cantBreak[start]`标识以start作为下标的子串**不能**在接下去的DFS完成字符串匹配。(主要是boolean[]默认初始值false，懒得自己赋值)。

而StringBuilder暂存DFS递归调用途中遇到的子串，没什么需要特地说明的。

提交记录（6ms，95.99%，40.6MB）
```java
class Solution {
    List<String> res = new LinkedList<>();

    public List<String> wordBreak(String s, List<String> wordDict) {
        dfs(s,0,s.length(),new HashSet<>(wordDict),new boolean[s.length()],new StringBuilder());
        return res;
    }

    public void dfs(String s,int start,int length,HashSet<String> wordDict,boolean[] cantBreak,StringBuilder sb){
        int resCurLen = res.size(); // 记录res结果的长度，如果这次DFS调用后，res多了一个String，说明这次cantBreak[start] = false,注意，这里是can't，不是can。
        if(start==length){
            sb.deleteCharAt(sb.length()-1);// 去掉最后一个空格
            res.add(sb.toString());
            sb.append(" "); // 补上最后一个空格，因为回溯会删掉这个空格。
        }else{
            if(!cantBreak[start]){ // cantBreak标记不能匹配的下标。也就是DFS过了，某个start开头的字符串接下去没法匹配完
                String subString;
                for(int end = start+1;end<=length;++end){
                    subString = s.substring(start,end);
                    if(wordDict.contains(subString)){
                        int curLen = sb.length();
                        int appendLen = subString.length()+1;// +1 是因为每个子串后面要加个空格" "，占用一个字符位置
                        sb.append(subString).append(" ");
                        dfs(s,end,length,wordDict,cantBreak,sb);
                        sb.delete(curLen,curLen+appendLen); // 还原现场，删掉这次匹配的子串和空格，接着下次DFS
                    }
                }
            }
            cantBreak[start] = res.size() <= resCurLen;// 这里其实是!(res.size()>resCurLen),只不过我这里cantBreak标记的是 start位置接下去“不能”完全匹配原字符串，所以写成这样。
        }
    }
}
```
