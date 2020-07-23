三个变量滚动更新就是了，分两种情况，当前字符是`*` 和不是 `*`,从第一个字符到现在具有的解码数量=当前字符独立解码+当前字符与前一个字符一起解码的，然后再将当前字符与前一个字符一起解码的分为前一个是1或者是2。 这样分析十分清晰。
```
class Solution {
public:
    #define M 1000000007;
    int numDecodings(string s) {
        int len=s.size();
        if(s[0]=='0') return 0;
        //vector<vector<int>> dp(len,vector<int>(11,0));
        long long a=1,b,c=0;
        if(s[0]!='*') b=1;
        else b=9;
        for(int i=1;i<len;++i){
            if(s[i]!='*'){
                c=0;
                if(s[i]!='0') c=b;
                if(s[i-1]=='1' || s[i-1]=='*') c+=a;
                if(s[i]>='0' && s[i]<='6' && (s[i-1]=='2' || s[i-1]=='*')) c+=a;
            }
            else{
                c=b*9;
                if(s[i-1]=='1' || s[i-1]=='*') c+=a*9;
                if(s[i-1]=='2' || s[i-1]=='*') c+=a*6;
            }
            c%=M;
            a=b;
            b=c;
        }
        if(len==1) return b;
        return c;
    }
};
```
