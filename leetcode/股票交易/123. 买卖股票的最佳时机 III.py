class Solution:
    def maxProfit(self, prices) -> int:
        if len(prices) < 2:
            return 0
        minus_inf = float('-inf')
        dp = [[[0,minus_inf],[0,0], [0, 0]] for _ in range(len(prices) + 1)]
        dp[0][0][1] = minus_inf
        dp[0][1][1] = minus_inf
        dp[0][2][1] = minus_inf
        for i in range(1, len(prices) + 1):
            cur = prices[i-1]
            for k in [1, 2]:
                dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + cur)
                dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - cur)
        return max(dp[-1][1][0],dp[-1][2][0])


if __name__ == '__main__':
    prices = [3,3,5,0,0,3,1,4]
    solution = Solution()
    print(solution.maxProfit(prices))