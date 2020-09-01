首先，我们假设n比特组成的数字满足题目要求的个数是dp[n]，可以列举下n分别为0，1，2，3时的满足要求的数字的二进制（看作字符串）：     
n=0，则有0个数字符合，为空“”；      
n=1，则有“0”和“1”；   
n=2，则有“00”，“01”，“10”；   
n=3，则有“100“，”101“，”000“，”001“，”010“；   
当位数为n，我们可以通过在位数为n-2的字符串前面加上”10“（保证它一定满足不包含连续的”1“），以及位数为n-1的字符串前面加上0得到。

也就是：`dp[n] = dp[n-1] + dp[n-2]` ；同时这个满足题目要求的数字最高两位一定是”10“开头。

接下来我们要考虑一个问题，对于数字num，其比特位数是n，它的最高两位只能是”11“或者”10“：
1. 如果是”11“，那么结果就是dp[n]；
2. 如果是”10“，那么结果就是dp[n-1] + 这个数的低(n - 2)位满足要求的数字个数。

实现如下：
```
int fib(int n) {
    if (n <= 0) return 1;
    if (n == 1) return 2;
    int a = 1;
    int b = 2;
    int c = 3;
    int i = n - 2;
    while(i--) {
        a = b;
        b = c;
        c = a + b;
    }
    
    return c;
}

int findIntegers(int num) {
    if (num == 0) return 1;
    if (num == 1) return 2;
    int nbits = 0;
    while(num>>nbits) {
        ++nbits;
    }
    
    if (num>>(nbits - 2) == 3) {
        return fib(nbits);
    } else {
        int mask = (1 << (nbits - 1)) - 1;
        return fib(nbits - 1) + findIntegers(num & mask);
    }
}
```
