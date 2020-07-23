### 解题思路
方法一：记忆化回溯法
1,每个子问题都是相同的，可以使用数组保存每个子串在回溯过程中的匹配的结果

### 代码

```c
/**
 * Note: The returned array must be malloced, assume caller calls free().
 */

//方法一：记忆化回溯法
//1,每个子问题都是相同的，可以使用数组保存每个子串在回溯过程中的匹配的结果

#define     VALID        1
#define     INVALID     -1
#define     MAX_NUM     100

//函数一：回溯函数
bool backTrackWordBreak(char * s, int iPos, char ** wordDict, int wordDictSize, int* pRetBuf, char** pRet, int* pColSize, int* pRetSize){
    int     i       = 0;
    int     iLen    = 0;

    //1,结束条件
    if(NULL == s) return false;
    if(INVALID == pRetBuf[iPos]) return false;      //当前字符串不能匹配
//    if(VALID == pRetBuf[iPos]) return true;       //匹配为了得到解，还需要继续进行，可以优化，需要额外保存结果

    if(s[iPos] == '\0')
    {
        //得到一个解，并为下一个解做准备
        pRet[(*pRetSize)][pColSize[(*pRetSize)] - 1] = '\0';
        *pRetSize += 1;

        pRet[(*pRetSize)] = (char*)malloc(sizeof(char) * (2 * strlen(s)));
        if(NULL == pRet[(*pRetSize)]) return false;
        memset(pRet[(*pRetSize)], 0x00, sizeof(char) * (2 * strlen(s)));

        memcpy(pRet[(*pRetSize)], pRet[(*pRetSize) - 1], sizeof(char) * (2 * strlen(s)));
        pColSize[(*pRetSize)] = pColSize[(*pRetSize) - 1];
        return true;
    }

    if(NULL == pRet[(*pRetSize)])
    {
        //为当前解申请空间
        pRet[(*pRetSize)] = (char*)malloc(sizeof(char) * (2 * strlen(s)));
        if(NULL == pRet[(*pRetSize)]) return false;
        memset(pRet[(*pRetSize)], 0x00, sizeof(char) * (2 * strlen(s)));
    }

    for(i = 0; i < wordDictSize; i++)
    {
        iLen = strlen(wordDict[i]);
        if((s[iPos] == wordDict[i][0]) &&           //增加首字符匹配，提高效率
            (iLen <= strlen(&s[iPos])) &&           //增加长度判断，防错处理
            (0 == memcmp(&s[iPos], &wordDict[i][0], sizeof(char) * iLen)))
        {
            //拷贝单词，增加空格处理
            memcpy(&pRet[(*pRetSize)][pColSize[(*pRetSize)]], wordDict[i], sizeof(char) * iLen);
            pColSize[(*pRetSize)] += iLen;
            pRet[(*pRetSize)][pColSize[(*pRetSize)]] = ' ';
            pColSize[(*pRetSize)] += 1;

            if(true == backTrackWordBreak(s, iPos + iLen, wordDict, wordDictSize, pRetBuf, pRet, pColSize, pRetSize))
            {
                pRetBuf[iPos] = VALID;              //记录当前位置的匹配结果
//                return true;                      //得到解仍然需要继续匹配
            }

            //回溯处理
            pColSize[(*pRetSize)] -= iLen + 1;
        }
    }

    if(pRetBuf[iPos] != VALID)
    {
        pRetBuf[iPos] = INVALID;                    //记录当前位置的匹配结果
        return  false;
    }
    else
    {
        return true;
    }
}

//主函数
char ** wordBreak(char * s, char ** wordDict, int wordDictSize, int* returnSize){
    int     iLen        = strlen(s);
    bool    bRet        = false;
    int*    pRetBuf     = NULL;

    char**  pRet        = NULL;
    int*    pColSize    = NULL;
    int     iRetSize    = 0;

    if(NULL == s) return false;
    if((NULL == wordDict) || (0 == wordDictSize)) return false;

    pRet = (char**)malloc(sizeof(char*) * MAX_NUM);
    if(NULL == pRet) return false;
    memset(pRet, 0x00, sizeof(char*) * MAX_NUM);
    pColSize = (int*)malloc(sizeof(int) * MAX_NUM);
    if(NULL == pColSize) return false;
    memset(pColSize, 0x00, sizeof(int) * MAX_NUM);

    pRetBuf = (int*)malloc(sizeof(int) * (iLen + 1));
    if(NULL == pRetBuf) return false;
    memset(pRetBuf, 0x00, sizeof(int) * (iLen + 1));

    bRet = backTrackWordBreak(s, 0, wordDict, wordDictSize, pRetBuf, pRet, pColSize, &iRetSize);

    free(pRetBuf);
    pRetBuf = NULL;
    free(pColSize);
    pColSize = NULL;

    *returnSize = iRetSize;
    return pRet;
}
```