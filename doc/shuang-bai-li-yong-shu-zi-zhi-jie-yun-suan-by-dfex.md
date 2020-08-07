从低位到高位逐渐运算。叠加2出现的次数
```
class Solution {
    public int numberOf2sInRange(int n) {
        int res=0;
        int i=1;
        while(n/i!=0){
            long high=n/(i*10);
            long cur=(n/i)%10;
            long low=n-n/i*i;
            if(cur<2){
                res+=high*i;
            }else if(cur==2){
                res+=high*i+low+1;
            }else{
                res+=high*i+i;
            }
            i*=10;
        }
        return res;
    }
}
```
