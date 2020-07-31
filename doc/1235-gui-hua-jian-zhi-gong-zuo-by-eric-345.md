### 解题思路


### 代码

```cpp
class Solution {
public:

    struct Job
    {
        int start_time;
        int end_time;
        int profit;

        Job(int start_time = 0, int end_time = 0, int profit = 0) : start_time(start_time), end_time(end_time), profit(profit) {}
    };


    //等于 或 小于且最近
    int equal_or_less_closest(const vector<Job>& jobs, int begin, int end, int start_time)
    {
        int index = -1;

        while (begin <= end)
        {
            int mid = begin + (end - begin) / 2;

            if (jobs.at(mid).end_time < start_time)
            {
                index = mid;
                begin = mid + 1;
            }
            else if (jobs.at(mid).end_time > start_time)
            {
                end = mid - 1;
            }
            else
            {
                return mid;
            }
        }

        return index;
    }

    int jobScheduling(vector<int>& startTime, vector<int>& endTime, vector<int>& profit) {

        //将startTime、endTime、profit数组用一个对象数组表示
        vector<Job> jobs(startTime.size());
        for (int i = 0; i < jobs.size(); ++i)
        {
            jobs.at(i) = Job(startTime.at(i), endTime.at(i), profit.at(i));
        }

        stable_sort(jobs.begin(), jobs.end(), [](const Job& l, const Job& r) {
            return l.end_time < r.end_time;
        });

        vector<int> dp(startTime.size()); //dp[i] 从第一个任务到完成当前工作的最大报酬
        int i = 0;
        for (; i < dp.size(); ++i)
        {
            //上一个最近可做工作 该工作的结束时间 <= 当前工作的起始时间
            int prev = equal_or_less_closest(jobs, 0, i - 1, jobs.at(i).start_time); //可能为-1
            if (prev == -1)
            {
                dp.at(i) = i >= 1 ? max(dp.at(i - 1), jobs.at(i).profit) : jobs.at(i).profit;
            }
            else
            {
                dp.at(i) = max(jobs.at(i).profit + dp.at(prev), dp.at(i - 1));
            }
        }

        return dp[jobs.size() - 1];
    }
};

```