class Solution:
    def findTargetSumWays(self, nums, S):
        if len(nums) < 1:
            return 0
        if S < 0:
            S = -S
        if sum(nums) < S:
            return 0
        dp = [[0] * (S+1) for _ in range(len(nums)+1)]
        for i in range(1, len(nums)+1, 1):
            num = nums[i-1]
            for j in range(0, num):
                dp[i][j] = max(dp[i][j],dp[i-1][j+num]+1)
            for j in range(num, S-num+1):
                dp[i][j] = max(dp[i][j], dp[i-1][j-num]+1, dp[i-1][j+num]+1)
            for j in range(S-num+1, S+1):
                dp[i][j] = max(dp[i][j], dp[i-1][j-num]+1)
        return dp[-1][-1]

if __name__ == '__main__':
    nums = [1000]
    S = 1000
    solution = Solution()
    print(solution.findTargetSumWays(nums,S))