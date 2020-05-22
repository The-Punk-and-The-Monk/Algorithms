class Solution:
    def knapsack(self, W, N, weights, values):
        dp = [0] *(W+1)
        for i in range(1, N+1):
            cur_w, cur_v = weights[i-1], values[i-1]
            for j in range(W, 0, -1):
                if j > cur_w:
                    dp[j] = max(dp[j], dp[j-cur_w]+cur_v)
        return dp[-1]