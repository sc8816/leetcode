### 解题思路
先在board中找到word的头部，再深度优先搜索，找到一条满足的路径直接返回true如果board遍历完都没有满足的路径就返回false
### 代码
```java []
class Solution {
    boolean res=false;
    int row,col;
    public boolean exist(char[][] board, String word) {
        if(word.length()==0)return res;
        char []words=word.toCharArray();
        row=board.length;
        col=board[0].length;
        if(row*col<words.length)return res;
        for(int i=0;i<row&&res==false;i++){//遍历board，res为true时可以直接返回了。
            for(int j=0;j<col;j++){
                if(words[0]==board[i][j]){
                    dfs(board,words,i,j,0);
                }
            }
        }
        return res;
    }
    private void dfs(char[][] board, char[] word,int i,int j,int index){
        if(res||board[i][j]!=word[index])return;//找到满足的路径或路径不正确
        if(word.length-1==index){//找到满足的路径
            res=true;
            return;
        }
        char temp= board[i][j]; 
        board[i][j]='#';//标记路径
        if(i+1<row&&board[i+1][j]!='#')dfs(board,word,i+1,j,index+1);//下
        if(i>0&&board[i-1][j]!='#')dfs(board,word,i-1,j,index+1);//上
        if(j+1<col&&board[i][j+1]!='#')dfs(board,word,i,j+1,index+1);//右
        if(j>0&&board[i][j-1]!='#')dfs(board,word,i,j-1,index+1);//左
        board[i][j]=temp;//撤销选择
    }
}
```
```cpp []
class Solution {
public:
    bool res=false;
    int row,col,len;
    bool exist(vector<vector<char>>& board, string word) {
        ios::sync_with_stdio(false); 
        col=board[0].size();
        row=board.size();
        len=word.size();
        if(len==0||col*row<len)return res;
        for(int i=0;i<row&&res!=true;i++){//遍历board，res为true时可以直接返回了。
            for(int j=0;j<col;j++){
                if(word[0]==board[i][j]){
                    dfs(board,word,i,j,0);
                }
            }
        }
        return res;
    }
private:
    void dfs(vector<vector<char>>& board, string& word,int i,int j,int index){
        if(res||board[i][j]!=word[index])return;//找到满足的路径或路径不正确
        if(len-1==index){//找到满足的路径
            res=true;
            return;
        }
        char temp= board[i][j]; 
        board[i][j]='#';//标记路径
        if(i+1<row&&board[i+1][j]!='#')dfs(board,word,i+1,j,index+1);//下
        if(i>0&&board[i-1][j]!='#')dfs(board,word,i-1,j,index+1);//上
        if(j+1<col&&board[i][j+1]!='#')dfs(board,word,i,j+1,index+1);//右
        if(j>0&&board[i][j-1]!='#')dfs(board,word,i,j-1,index+1);//左
        board[i][j]=temp;//撤销选择
    }
};
```

