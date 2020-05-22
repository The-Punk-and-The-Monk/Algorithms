from typing import List

class Solution:
    def partition(self, s: str) -> List[List[str]]:
        if s == '':
            return []
        ans, comb = [], []
        n = len(s)
        dp = [[False] * n for _ in range(n)]
        for i in range(n):
            i_1, j_1, tmp_1 = self.kuosan(s, i, i)
            i_2, j_2, tmp_2 = self.kuosan(s, i, i + 1)
            if tmp_1 != 0:
                dp[i_1 + 1][j_1 - 1] = True
            if tmp_2 != 0:
                dp[i_2 + 1][j_2 - 1] = True
            dp[i][i] = True
        for i in range(1, len(s) + 1):
            self.backtrack(s, comb, 0, i, ans, dp)
        return ans

    def backtrack(self, s, comb, start, k, ans, dp):
        if k == 1:
            if dp[start][len(s) - 1]:
                ans.append(comb + [s[start:]])
        else:
            for i in range(start, len(s)-1):
                if dp[start][i]:
                    self.backtrack(s, comb + [s[start:i + 1]], i + 1, k - 1, ans, dp)

    def kuosan(self, s, i, j):
        while i >= 0 and j < len(s) and s[i] == s[j]:
            i -= 1
            j += 1
        return i, j, j - i - 1


if __name__ == '__main__':
    s = 'abbab'
    solution = Solution()
    print(solution.partition(s))