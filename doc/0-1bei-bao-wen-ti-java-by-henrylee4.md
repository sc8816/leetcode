# 思路
本题属于典型的0-1背包问题了，额外增加的就是预处理的过程：将状态进行压缩。稍微复杂一点的就是求所选的物品，这里我们可以采用记录前一个状态(`preState`)和两个状态转换用到的物品(`pre`), 然后从后往前遍历结果就可以了

# 代码
```
// time complexity O(m * 2 ^ n + m * len(s))
class Solution {
    public int[] smallestSufficientTeam(String[] req_skills, List<List<String>> people) {
        int n = req_skills.length, m = people.size();
        Map<String, Integer> map = new HashMap<>();
        for(int i = 0 ; i < n ; i++){
            map.put(req_skills[i], i);
        }
        int[] mask = new int[m];
        for(int i = 0 ; i < m; i++){
            mask[i] = convert(people.get(i), map);
        }
        int[] dp = new int[1 << n];
        Arrays.fill(dp, -1);
        dp[0] = 0;
        int[] preState = new int[1 << n];
        int[] pre = new int[1 << n];
        for(int i = 0; i < m ; i++){
            for(int j = (1 << n) - 1; j >= 0; j--){
                if(dp[j] == -1){
                    continue;
                }
                int state = j | mask[i];
                if(dp[state] == -1 || dp[state] > dp[j] + 1){
                    dp[state] = dp[j] + 1;
                    preState[state] = j;
                    pre[state] = i;
                }
            }
        }
        List<Integer> res = new ArrayList<>();
        int state = (1 << n) - 1;
        while(state != 0){
            res.add(pre[state]);
            state = preState[state];
        }
        int[] array = new int[res.size()];
        for(int i = 0 ; i < res.size() ; i++){
            array[i] = res.get(i);
        }
        return array;
    }

    private int convert(List<String> list, Map<String, Integer> map){
        int res = 0;
        for(String s: list){
            if(map.containsKey(s)){
                res |= 1 << map.get(s);
            }
        }
        return res;
    }
}
```